import { DEFAULT_CONTEXT_MENU, DEFAULT_TOOLBAR, EMBED_HOSTS } from './helpers/constants.js'
import { cleanHtml, flattenInline } from './helpers/sanitizer.js'
import { clipHtml, cpBack, cpForward, cpLen, exec } from './helpers/utils.js'
import { withPopup } from './mixins/popup.js'
import { withContext } from './mixins/context.js'
import { withToolbar } from './mixins/toolbar.js'
import { withHistory } from './mixins/history.js'
import { withSelection } from './mixins/selection.js'
import { withCommands } from './mixins/commands.js'
import { withPrompt } from './mixins/prompt.js'
import { withFind } from './mixins/find.js'
import { withMedia } from './mixins/media.js'
import { withTables } from './mixins/tables.js'
import { withMenus } from './mixins/menus.js'
import { withView } from './mixins/view.js'
import { withShortcuts } from './mixins/shortcuts.js'
import { withWiring } from './mixins/wiring.js'
import { withYurbaUI } from './mixins/yurbaui.js'

function mix (Base, ...mixins) {
    return mixins.reduce((B, m) => m(B), Base)
}

// YurbaUI last, so its popups override the standalone ones
const mixins = [withPopup, withToolbar, withHistory, withSelection, withCommands, withPrompt, withFind, withMedia, withTables, withMenus, withContext, withView, withShortcuts, withWiring]
if (YE_UI) mixins.push(withYurbaUI)

class YurbaEditor extends mix(HTMLElement, ...mixins) {
    static DEFAULT_TOOLBAR = DEFAULT_TOOLBAR
    static DEFAULT_CONTEXT_MENU = DEFAULT_CONTEXT_MENU
    static EMBED_HOSTS = EMBED_HOSTS

    static create (config = {}) {
        const el = document.createElement('yurba-editor')
        el.initConfig = config
        const field = config.field ? (typeof config.field == 'string' ? document.querySelector(config.field) : config.field) : null
        if (field) field.after(el)
        else if (config.mount) {
            const mount = typeof config.mount == 'string' ? document.querySelector(config.mount) : config.mount
            if (mount) mount.appendChild(el)
        }
        el.setup()
        return el
    }

    static sanitize (html, opts) {
        opts = opts || {}
        return cleanHtml(html, opts.embedHosts || EMBED_HOSTS, opts.strict !== false, { allowData: opts.allowData === true, allowClasses: opts.allowClasses === true })
    }

    connectedCallback () {
        if (this.yeDestroyed) return
        this.setup()
        this.listenGlobal(true)
    }

    // A host may drop the editor without destroy()
    disconnectedCallback () {
        if (!this.yeReady || this.yeDestroyed) return
        this.listenGlobal(false)
        this.hideTableCtx(); this.closeTextMenu(); this.hideFormPop(); this.hideFindPop(); this.deselectImage(); this.closeMenus()
        // The body-level handle would keep a dropped editor alive
        if (this.imgHandle) { this.imgHandle.remove(); this.imgHandle = null }
        if (this.clearLongPress) this.clearLongPress()
        if (this.root.classList.contains('ye--full')) this.toggleFull()
    }

    setup () {
        if (this.yeReady) return
        this.yeReady = true
        const options = this.initConfig || {}

        this.options = options
        this.labels = options.labels || {}
        this.icons = options.icons || {}
        this.embedHosts = options.embedHosts || EMBED_HOSTS
        this.uploadUrl = options.uploadUrl || null
        this.onImageUpload = typeof options.onImageUpload == 'function' ? options.onImageUpload : null
        this.uploadField = options.uploadField || 'file'
        this.uploadHeaders = options.uploadHeaders || {}
        this.maxImageKb = options.maxImageKb || 0
        this.maxChars = options.maxChars || 0
        this.uploadEnabled = !!(this.uploadUrl || this.onImageUpload)
        this.inline = options.inline === true || options.blocks === false
        this.allowData = options.allowData === true
        this.allowClasses = options.allowClasses === true
        this.strict = options.strict === true
        this.glyphClass = options.glyphClass || null
        this.contextMenuEnabled = options.contextMenu !== false
        this.contextMenuItems = Array.isArray(options.contextMenu) ? options.contextMenu : DEFAULT_CONTEXT_MENU
        this.listeners = {}

        this.history = []
        this.histIndex = -1
        this.histTimer = null
        this.restoring = false
        this.HIST_MAX = 200

        const field = options.field ? (typeof options.field == 'string' ? document.querySelector(options.field) : options.field) : null
        this.input = field

        const initial = options.value != null ? options.value : (field ? field.value : this.innerHTML)
        const showToolbar = options.toolbar !== false
        this.showToolbar = showToolbar
        const showFooter = options.footer !== false
        const toolbar = Array.isArray(options.toolbar) ? options.toolbar : DEFAULT_TOOLBAR

        this.classList.add('ye')
        if (this.inline) this.classList.add('ye--inline')
        if (!showToolbar) this.classList.add('ye--no-toolbar')
        if (!showFooter) this.classList.add('ye--no-foot')
        this.innerHTML =
            (showToolbar ? this.buildToolbar(toolbar) : '') +
            '<div class="ye-body"><div class="ye-area" contenteditable="true" role="textbox" aria-multiline="true"></div>' +
            '<textarea class="ye-source-view" spellcheck="false" hidden></textarea></div>' +
            (showFooter ? '<div class="ye-foot"><a class="ye-brand" href="https://dev.yurba.one" target="_blank" rel="noopener noreferrer">YurbaEditor</a><span class="ye-count" data-ye-count></span></div>' : '') +
            (this.uploadEnabled ? '<input type="file" class="ye-file-input" accept="image/*" multiple hidden>' : '')

        if (field) field.style.display = 'none'

        this.root = this
        this.toolbar = this.querySelector('.ye-toolbar')
        this.area = this.querySelector('.ye-area')
        this.sourceView = this.querySelector('.ye-source-view')
        this.fileInput = this.querySelector('.ye-file-input')

        this.menuPops = []
        this.querySelectorAll('[data-ye-menu]').forEach(menu => {
            const pop = menu.querySelector('.ye-menu__pop')
            if (pop) { menu._pop = pop; this.menuPops.push(pop) }
        })

        this.area.style.minHeight = (options.minHeight || 160) + 'px'
        if (options.height) this.area.style.maxHeight = options.height + 'px'
        this.area.dataset.placeholder = options.placeholder || this.t('Start writing…')
        this.area.setAttribute('aria-label', options.label || this.area.dataset.placeholder)

        try {
            exec('styleWithCSS', 'false')
            exec('defaultParagraphSeparator', 'p')
        } catch (e) {}

        this.area.innerHTML = this.clean(initial)
        this.wire()
        this.sync()
        this.updateStates()
        this.recordState()
    }

    t (text) {
        return (this.labels && this.labels[text]) || text
    }

    clean (html, strict, opts) {
        const cleaned = cleanHtml(html, this.embedHosts, strict || this.strict, { allowData: this.allowData, allowClasses: this.allowClasses, glyphClass: this.glyphClass, ...opts })
        return this.inline ? flattenInline(cleaned, this.glyphClass) : cleaned
    }

    isGlyph (img) {
        return !!this.glyphClass && img.classList.contains(this.glyphClass)
    }

    getHTML () {
        let clone
        if (this.root.classList.contains('ye--source')) {
            clone = document.implementation.createHTMLDocument('').createElement('div')
            clone.innerHTML = this.sourceView.value
        } else {
            clone = this.area.cloneNode(true)
        }
        const sel = clone.querySelectorAll('.ye-img--sel')
        for (let i = 0; i < sel.length; i++) {
            sel[i].classList.remove('ye-img--sel')
            if (sel[i].classList.length == 0) sel[i].removeAttribute('class')
        }
        let html = this.clean(clone.innerHTML)
        if (clone.textContent.trim() == '' && clone.querySelector('img, iframe, hr, table') == null) html = ''
        return html
    }

    setHTML (html) {
        this.deselectImage()
        this.area.innerHTML = this.clean(html)
        if (this.root.classList.contains('ye--source')) {
            this.sourceView.value = this.area.innerHTML
            this.sourceView.dispatchEvent(new Event('input'))
        }
        this.sync()
        return this
    }

    getText () { return this.area.textContent }

    focus () { this.area.focus(); return this }

    on (event, callback) {
        (this.listeners[event] = this.listeners[event] || []).push(callback)
        return this
    }

    emit (event, payload) {
        (this.listeners[event] || []).forEach(cb => cb(payload))
        this.dispatchEvent(new CustomEvent('yurba-editor.' + event, { detail: payload }))
    }

    destroy () {
        if (!this.yeReady) { this.yeDestroyed = true; this.remove(); return }
        if (this.histTimer) { clearTimeout(this.histTimer); this.histTimer = null }
        if (this.clearLongPress) this.clearLongPress()
        this.hideTableCtx(); this.closeTextMenu(); this.hideFormPop(); this.hideFindPop(); this.closeMenus()
        if (this.root.classList.contains('ye--full')) this.toggleFull()
        this.listenGlobal(false)
        this.yeDestroyed = true
        if (this.imgHandle) this.imgHandle.remove()
        ;(this.menuPops || []).forEach(p => p.remove())
        this.root.remove()
        if (this.input) this.input.style.display = ''
    }

    sync () {
        if (this.root.classList.contains('ye--source')) return
        const html = this.getHTML()
        if (this.input) this.input.value = html
        if (typeof this.options.onChange == 'function') this.options.onChange(html)
        this.emit('change', html)
        const count = this.getCount()
        // IME may exceed the limit until compositionend trims it
        if (!this.composing) this.charLen = count.chars
        this.updateCount(count)
        if (this.lastCount == null || this.lastCount.words != count.words || this.lastCount.chars != count.chars) {
            this.lastCount = count
            if (typeof this.options.onCount == 'function') this.options.onCount(count)
            this.emit('count', count)
        }
        if (this.findPop) this.refreshFind()
        if (!this.restoring) this.scheduleRecord()
    }

    getCount () {
        const text = this.area.textContent.replace(/\s+/g, ' ').trim()
        return { words: text == '' ? 0 : text.split(' ').length, chars: this.countChars() }
    }

    charNodes () {
        const out = []
        const walker = document.createTreeWalker(this.area, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null)
        let n
        while ((n = walker.nextNode())) if (n.nodeType == 3 || (n.tagName == 'IMG' && this.isGlyph(n))) out.push(n)
        return out
    }

    countChars () {
        let total = 0
        this.charNodes().forEach(n => { total += cpLen(n.nodeType == 3 ? n.nodeValue : n.getAttribute('alt')) })
        return total
    }

    roomLeft () {
        if (!this.maxChars) return Infinity
        const sel = window.getSelection()
        const selLen = sel && sel.rangeCount && this.area.contains(sel.anchorNode) ? cpLen(sel.toString()) : 0
        return this.maxChars - (this.countChars() - selLen)
    }

    insertClipboard (html, text) {
        const room = this.roomLeft()
        if (room <= 0) return
        if (html) {
            const clean = this.clean(html, true, { stripStyle: !this.showToolbar })
            exec('insertHTML', room == Infinity ? clean : clipHtml(clean, room, this.glyphClass))
        } else if (text) {
            exec('insertText', room == Infinity ? text : text.slice(0, cpForward(text, 0, room)))
        }
        this.enforceLimit()
        this.sync()
    }

    updateCount (counted) {
        const count = this.root.querySelector('[data-ye-count]')
        if (count == null) return
        const { words, chars } = counted || this.getCount()
        if (this.maxChars) {
            count.textContent = words + ' ' + this.t('words') + ' · ' + chars + ' / ' + this.maxChars + ' ' + this.t('chars')
            count.classList.toggle('is-limit', chars >= this.maxChars)
            count.classList.toggle('is-near', chars >= this.maxChars * 0.9 && chars < this.maxChars)
        } else {
            count.textContent = words + ' ' + this.t('words') + ' · ' + chars + ' ' + this.t('chars')
        }
    }

    enforceLimit (fromEnd) {
        if (!this.maxChars || this.composing) return
        let over = this.countChars() - Math.max(this.maxChars, this.charLen || 0)
        if (over <= 0) return
        const sel = window.getSelection()
        const caret = !fromEnd && sel && sel.rangeCount && this.area.contains(sel.getRangeAt(0).endContainer) ? sel.getRangeAt(0) : null
        let nodes = this.charNodes()
        if (caret) {
            const before = document.createRange()
            before.setStart(this.area, 0)
            before.setEnd(caret.endContainer, caret.endOffset)
            nodes = nodes.filter(n => n == caret.endContainer || before.intersectsNode(n))
        }
        for (let i = nodes.length - 1; i >= 0 && over > 0; i--) {
            const n = nodes[i]
            if (n.nodeType == 1) { over -= cpLen(n.getAttribute('alt')); n.remove(); continue }
            const end = caret && n == caret.endContainer ? caret.endOffset : n.nodeValue.length
            const start = cpBack(n.nodeValue, end, over)
            over -= cpLen(n.nodeValue.slice(start, end))
            n.deleteData(start, end - start)
        }
    }
}

customElements.define('yurba-editor', YurbaEditor)

export { YurbaEditor }
