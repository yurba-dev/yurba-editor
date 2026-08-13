import { DEFAULT_CONTEXT_MENU, DEFAULT_TOOLBAR, EMBED_HOSTS } from './helpers/constants.js'
import { cleanHtml, flattenInline } from './helpers/sanitizer.js'
import { exec } from './helpers/utils.js'
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

const mix = (Base, ...mixins) => mixins.reduce((B, m) => m(B), Base)

class YurbaEditor extends mix(HTMLElement, withPopup, withToolbar, withHistory, withSelection, withCommands, withPrompt, withFind, withMedia, withTables, withMenus, withContext, withView, withShortcuts, withWiring) {
    static DEFAULT_TOOLBAR = DEFAULT_TOOLBAR
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
        return el
    }

    static sanitize (html, opts) {
        opts = opts || {}
        return cleanHtml(html, opts.embedHosts || EMBED_HOSTS, false, { allowData: opts.allowData === true, allowClasses: opts.allowClasses === true })
    }

    connectedCallback () {
        if (this.yeReady) return
        this.yeReady = true
        const options = this.initConfig || {}

        this.options = options
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
        this.area.dataset.placeholder = options.placeholder || 'Start writing…'

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

    clean (html, strict) {
        const cleaned = cleanHtml(html, this.embedHosts, strict, { allowData: this.allowData, allowClasses: this.allowClasses })
        return this.inline ? flattenInline(cleaned) : cleaned
    }

    getHTML () {
        const clone = this.area.cloneNode(true)
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
        this.area.innerHTML = this.clean(html)
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
        if (this.histTimer) { clearTimeout(this.histTimer); this.histTimer = null }
        if (this.docClick) document.removeEventListener('click', this.docClick)
        if (this.ctxDismiss) {
            window.removeEventListener('scroll', this.ctxDismiss, true)
            window.removeEventListener('resize', this.ctxDismiss)
        }
        if (this.onMousedown) document.removeEventListener('mousedown', this.onMousedown)
        if (this.onChange) document.removeEventListener('change', this.onChange)
        if (this.onHexKey) document.removeEventListener('keydown', this.onHexKey)
        if (this.onClick) document.removeEventListener('click', this.onClick)
        if (this.onMouseover) document.removeEventListener('mouseover', this.onMouseover)
        if (this.ctxPop) this.ctxPop.remove()
        if (this.textPop) this.textPop.remove()
        if (this.formPop) this.formPop.remove()
        if (this.imgHandle) this.imgHandle.remove()
        if (this.findPop) this.findPop.remove()
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
        this.updateCount()
        const count = this.getCount()
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
        return { words: text == '' ? 0 : text.split(' ').length, chars: this.area.textContent.length }
    }

    updateCount () {
        const count = this.root.querySelector('[data-ye-count]')
        if (count == null) return
        const { words, chars } = this.getCount()
        if (this.maxChars) {
            count.textContent = words + ' words · ' + chars + ' / ' + this.maxChars + ' chars'
            count.classList.toggle('is-limit', chars >= this.maxChars)
            count.classList.toggle('is-near', chars >= this.maxChars * 0.9 && chars < this.maxChars)
        } else {
            count.textContent = words + ' words · ' + chars + ' chars'
        }
    }

    enforceLimit () {
        if (!this.maxChars) return
        let over = this.area.textContent.length - this.maxChars
        if (over <= 0) return
        const walker = document.createTreeWalker(this.area, NodeFilter.SHOW_TEXT, null)
        const nodes = []
        let n
        while ((n = walker.nextNode())) nodes.push(n)
        for (let i = nodes.length - 1; i >= 0 && over > 0; i--) {
            const node = nodes[i]
            const cut = Math.min(node.nodeValue.length, over)
            node.nodeValue = node.nodeValue.slice(0, node.nodeValue.length - cut)
            over -= cut
        }
    }
}

customElements.define('yurba-editor', YurbaEditor)

export { YurbaEditor }
