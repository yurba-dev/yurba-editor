import { DEFAULT_TOOLBAR, HEADINGS } from '../helpers/constants.js'
import { escapeHtml } from '../helpers/utils.js'

const HEAD_ICONS = { h1: 'format_h1', h2: 'format_h2', h3: 'format_h3', h4: 'format_h4' }
const SLASH_BLOCKS = /^(P|DIV|H[1-4])$/

function symbol (name) {
    return '<span class="material-symbols-rounded ye-ico">' + name + '</span>'
}

// Own popup in both builds: a ContextMenu cannot be filtered while the caret stays in the text
export const withSlash = (Base) => class extends Base {
    wire () {
        super.wire()
        if (this.inline) return
        // Capture on the host, so the open menu takes its keys before the text does
        this.addEventListener('keydown', e => {
            if (!this.area.contains(e.target)) return
            if (this.slashKey(e) || this.moveKey(e)) { e.preventDefault(); e.stopPropagation() }
        }, true)
        this.area.addEventListener('beforeinput', e => this.mdBeforeInput(e))
        this.area.addEventListener('input', e => {
            this.inlineMarkdown(e)
            this.slashInput(e)
        })
        this.onSlashSel = () => this.slashTrack()
        this.onSlashDown = e => {
            const s = this.slash
            if (s && !s.pop.contains(e.target) && !this.area.contains(e.target)) this.closeSlash()
        }
        this.onSlashScroll = e => {
            const s = this.slash
            if (s && !(e.target instanceof Node && s.pop.contains(e.target))) this.placeSlash()
        }
    }

    slashItems () {
        const tokens = Array.isArray(this.options.toolbar) ? this.options.toolbar : DEFAULT_TOOLBAR
        function has (token) {
            return tokens.indexOf(token) != -1
        }
        const items = []
        if (has('heading')) {
            this.headingLevels().forEach((tag, i) => {
                items.push({ label: HEADINGS[tag], words: tag + ' heading title', hint: '#'.repeat(i + 1), icon: this.iconOr('slash-' + tag, symbol(HEAD_ICONS[tag])), run: () => this.formatBlock(tag) })
            })
        }
        if (has('ul')) items.push({ label: 'Bulleted list', words: 'ul bullet list', hint: '-', icon: this.renderIcon('ul'), run: () => this.list('insertUnorderedList') })
        if (has('ol')) items.push({ label: 'Numbered list', words: 'ol numbered list', hint: '1.', icon: this.renderIcon('ol'), run: () => this.list('insertOrderedList') })
        if (has('blockquote')) items.push({ label: 'Quote', words: 'blockquote quote', hint: '>', icon: this.renderIcon('blockquote'), run: () => this.formatBlock('blockquote') })
        if (has('codeblock')) items.push({ label: 'Code block', words: 'pre code', hint: '```', icon: this.renderIcon('codeblock'), run: () => this.run('ye-codeblock') })
        if (has('table')) items.push({ label: 'Table', words: 'table grid', icon: this.renderIcon('table'), run: () => this.slashTable() })
        if (has('image') && (this.uploadEnabled || this.imageSources.length || this.imageUrl)) items.push({ label: 'Insert image', words: 'image picture photo upload', icon: this.renderIcon('image'), run: () => this.slashImage() })
        if (has('video')) items.push({ label: 'Embed video', words: 'video youtube vimeo embed', icon: this.renderIcon('video'), run: () => this.run('ye-video') })
        if (has('hr')) items.push({ label: 'Horizontal rule', words: 'hr divider line separator', hint: '---', icon: this.renderIcon('hr'), run: () => this.run('ye-hr') })
        return items
    }

    // Typing goes on in the first cell, not in the line below the table
    slashTable () {
        this.insertTable(3, 3, true)
        const sel = window.getSelection()
        const line = sel.rangeCount ? this.closestBlock(sel.anchorNode) : null
        const table = line && line.previousElementSibling
        const cell = table && table.tagName == 'TABLE' ? table.querySelector('th, td') : null
        if (cell == null) return
        const r = document.createRange()
        r.setStart(cell, 0)
        r.collapse(true)
        sel.removeAllRanges()
        sel.addRange(r)
    }

    // The first item of the toolbar image menu
    slashImage () {
        if (this.uploadEnabled) { this.saveRange(); this.fileInput.click(); return }
        if (this.imageSources.length) { this.pickImage(0); return }
        this.run('ye-image')
    }

    // The block the caret ends, with the text before it; the menu lives only at the end of a bare top-level line
    slashAt () {
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0 || !sel.isCollapsed) return null
        const node = sel.anchorNode
        if (node == null || !this.area.contains(node)) return null
        let block = this.closestBlock(node)
        if (block == null && node.parentNode == this.area) block = this.area
        if (block == null || (block != this.area && (block.parentNode != this.area || !SLASH_BLOCKS.test(block.tagName)))) return null
        if (block.querySelector('img, iframe, hr, table, pre, ul, ol, blockquote')) return null
        const r = document.createRange()
        r.selectNodeContents(block)
        r.setEnd(node, sel.anchorOffset)
        const text = r.toString()
        if (text != block.textContent) return null
        return { block: block, text: text }
    }

    slashInput (e) {
        if (this.slash) { this.slashTrack(); return }
        if (this.toolbar == null || this.composing) return
        if (e.inputType != 'insertText' && e.inputType != 'insertCompositionText') return
        if ((e.data || '').slice(-1) != '/') return
        const at = this.slashAt()
        if (at && at.text == '/') this.openSlash(at.block)
    }

    openSlash (block) {
        const items = this.slashItems()
        if (items.length == 0) return
        const pop = this.makePopup('ye-slash')
        pop.setAttribute('role', 'listbox')
        pop.setAttribute('aria-label', this.t('Insert'))
        // Taps and clicks leave the caret, and the phone keyboard, in the text
        pop.addEventListener('mousedown', e => e.preventDefault())
        pop.addEventListener('click', e => {
            const item = e.target.closest('[data-i]')
            if (item) this.pickSlash(+item.dataset.i)
        })
        pop.addEventListener('mousemove', e => {
            const item = e.target.closest('[data-i]')
            if (item && this.slash && +item.dataset.i != this.slash.index) this.slashActive(+item.dataset.i, false)
        })
        this.slash = { block: block, items: items, pop: pop, query: '', index: 0, shown: [] }
        document.addEventListener('selectionchange', this.onSlashSel)
        document.addEventListener('mousedown', this.onSlashDown, true)
        document.addEventListener('touchstart', this.onSlashDown, { capture: true, passive: true })
        window.addEventListener('scroll', this.onSlashScroll, true)
        window.addEventListener('resize', this.onSlashScroll)
        this.renderSlash()
        this.revealPopup(pop)
        // The .ui build draws its own thumb over the list
        if (this.scrollbar) this.scrollbar(pop)
    }

    closeSlash () {
        const s = this.slash
        if (s == null) return
        this.slash = null
        document.removeEventListener('selectionchange', this.onSlashSel)
        document.removeEventListener('mousedown', this.onSlashDown, true)
        document.removeEventListener('touchstart', this.onSlashDown, true)
        window.removeEventListener('scroll', this.onSlashScroll, true)
        window.removeEventListener('resize', this.onSlashScroll)
        this.dismissPopup(s.pop)
    }

    // Typing, deleting and moving the caret: the menu follows the text after the slash, or goes away
    slashTrack () {
        const s = this.slash
        if (s == null || this.composing) return
        const at = this.slashAt()
        if (at == null || at.block != s.block || at.text.charAt(0) != '/' || /\s/.test(at.text)) { this.closeSlash(); return }
        const query = at.text.slice(1)
        if (query != s.query) { s.query = query; s.index = 0; this.renderSlash() }
    }

    renderSlash () {
        const s = this.slash
        const q = s.query.toLowerCase()
        s.shown = s.items.filter(it => q == '' || it.label.toLowerCase().indexOf(q) != -1 || this.t(it.label).toLowerCase().indexOf(q) != -1 || it.words.indexOf(q) != -1)
        s.pop.classList.toggle('is-empty', s.shown.length == 0)
        s.pop.innerHTML = s.shown.map((it, i) => '<div class="ye-slash__item' + (i == s.index ? ' is-active' : '') + '" role="option" aria-selected="' + (i == s.index) + '" data-i="' + i + '">' +
            it.icon + '<span class="ye-slash__label">' + escapeHtml(this.t(it.label)) + '</span>' +
            (it.hint ? '<span class="ye-slash__hint">' + escapeHtml(it.hint) + '</span>' : '') + '</div>').join('')
        this.placeSlash()
    }

    slashActive (index, scroll) {
        const s = this.slash
        s.index = index
        const els = s.pop.querySelectorAll('[data-i]')
        for (let i = 0; i < els.length; i++) {
            els[i].classList.toggle('is-active', i == index)
            els[i].setAttribute('aria-selected', String(i == index))
        }
        if (scroll && els[index]) els[index].scrollIntoView({ block: 'nearest' })
    }

    placeSlash () {
        const s = this.slash
        if (s == null) return
        const sel = window.getSelection()
        let rect = sel && sel.rangeCount ? sel.getRangeAt(0).getBoundingClientRect() : null
        if (rect == null || (rect.height == 0 && rect.width == 0)) rect = s.block.getBoundingClientRect()
        const pad = 8
        const vv = window.visualViewport
        // The phone keyboard covers the bottom of the layout viewport
        const bottom = vv ? vv.offsetTop + vv.height : window.innerHeight
        const pop = s.pop
        pop.style.maxHeight = ''
        const w = pop.offsetWidth
        const h = pop.offsetHeight
        const below = bottom - rect.bottom - 4 - pad
        const above = rect.top - 4 - pad
        let top = rect.bottom + 4
        if (h > below && above > below) {
            if (h > above) pop.style.maxHeight = above + 'px'
            top = rect.top - 4 - Math.min(h, above)
        } else if (h > below) {
            pop.style.maxHeight = Math.max(below, 120) + 'px'
        }
        let left = rect.left
        if (left + w > window.innerWidth - pad) left = window.innerWidth - w - pad
        if (left < pad) left = pad
        pop.style.left = left + 'px'
        pop.style.top = top + 'px'
    }

    slashKey (e) {
        const s = this.slash
        if (s == null || e.isComposing) return false
        if (e.key == 'Escape') { this.closeSlash(); return true }
        if (s.shown.length == 0 || e.ctrlKey || e.metaKey || e.altKey) return false
        const n = s.shown.length
        if (e.key == 'ArrowDown') { this.slashActive((s.index + 1) % n, true); return true }
        if (e.key == 'ArrowUp') { this.slashActive((s.index + n - 1) % n, true); return true }
        if ((e.key == 'Enter' || e.key == 'Tab') && !e.shiftKey) { this.pickSlash(s.index); return true }
        return false
    }

    pickSlash (index) {
        const s = this.slash
        const item = s ? s.shown[index] : null
        if (item == null) return
        const block = s.block
        this.closeSlash()
        this.area.focus({ preventScroll: true })
        this.flushHistory()
        let line = block
        if (block == this.area) {
            this.area.innerHTML = '<p><br></p>'
            line = this.area.firstChild
        } else {
            block.innerHTML = '<br>'
        }
        const r = document.createRange()
        r.setStart(line, 0)
        r.collapse(true)
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(r)
        item.run()
        // A table or a rule comes in after the emptied line, which is left over
        const now = sel.rangeCount ? this.closestBlock(sel.anchorNode) : null
        if (line.isConnected && line != now && line.textContent == '' && line.querySelector('img, iframe, hr, table') == null && line.nextElementSibling) line.remove()
        this.sync()
        this.updateStates()
        this.recordState()
    }
}
