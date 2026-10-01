import { ATTRS, CLASS_ALLOWED } from '../helpers/constants.js'
import { ancestorTag, exec, normalizeHex } from '../helpers/utils.js'

export const withCommands = (Base) => class extends Base {
    run (cmd, arg) {
        if (cmd == 'ye-source-toggle') return this.toggleSource()
        if (cmd == 'ye-fullscreen') return this.toggleFull()
        if (this.root.classList.contains('ye--source')) return

        this.area.focus()
        if (cmd == 'undo') return this.undo()
        if (cmd == 'redo') return this.redo()
        // A command is a step of its own, apart from the typing before it; afterCmd() closes it
        this.flushHistory()
        if (cmd == 'ye-link') return this.insertLink()
        if (cmd == 'ye-image') return this.insertImage()
        if (cmd == 'ye-video') return this.insertVideo()
        if (cmd == 'ye-hr') return exec('insertHTML', '<hr><p><br></p>')
        if (cmd == 'ye-code') return this.toggleInline('code')
        if (cmd == 'ye-codeblock') return this.codeBlock()
        if (cmd == 'ye-align') return this.setAlign(arg)
        if (cmd == 'ye-indent') return this.step(32)
        if (cmd == 'ye-outdent') return this.step(-32)
        if (cmd == 'ye-forecolor') { this.restoreRange(); return this.applyColor('foreColor', arg) }
        if (cmd == 'ye-backcolor') { this.restoreRange(); return this.applyColor('hiliteColor', arg) }
        if (cmd == 'ye-clear') { this.clearFormatting(); return }
        if (cmd == 'ye-lower') return this.transformCase('lower')
        if (cmd == 'ye-capitalize') return this.transformCase('capitalize')
        if (cmd == 'ye-upper') return this.transformCase('upper')
        if (cmd == 'ye-find') return this.openFindPop()
        if (cmd == 'formatBlock') return this.formatBlock(arg)
        if (cmd == 'insertOrderedList' || cmd == 'insertUnorderedList') return this.list(cmd)
        exec(cmd, arg)
    }

    formatBlock (arg) {
        let current = ''
        try { current = (document.queryCommandValue('formatBlock') || '').toLowerCase() } catch (e) {}
        const target = current == arg ? 'p' : arg
        exec('formatBlock', '<' + target + '>')
    }

    codeBlock () {
        this.formatBlock('pre')
        const sel = window.getSelection()
        const pre = sel && sel.rangeCount ? ancestorTag(sel.anchorNode, 'PRE') : null
        // Like a rule or a table, a code block at the very end leaves a line to go on below it
        if (pre && pre.parentNode == this.area && pre.nextElementSibling == null) pre.insertAdjacentHTML('afterend', '<p><br></p>')
    }

    applyColor (cmd, color) {
        exec('styleWithCSS', 'true')
        if (cmd == 'hiliteColor' && !document.queryCommandSupported('hiliteColor')) cmd = 'backColor'
        exec(cmd, color || 'inherit')
        exec('styleWithCSS', 'false')
    }

    applyCustomColor (el) {
        const box = el.closest('.ye-color-custom')
        const isNative = el.classList.contains('ye-color-native')
        const color = isNative ? el.value : normalizeHex(el.value)
        if (color == null) return

        const native = box.querySelector('.ye-color-native')
        const hex = box.querySelector('.ye-color-hex')
        if (/^#[0-9a-f]{6}$/i.test(color)) native.value = color.toLowerCase()
        hex.value = color

        this.run(box.dataset.yeColor, color)
        this.closeMenus()
        this.sync()
        this.updateStates()
    }

    // Bare text sits in the area itself, whose own style is never saved
    styleBlocks () {
        if (!this.inline && this.selectionBlocks().indexOf(this.area) != -1) exec('formatBlock', '<p>')
        return this.selectionBlocks().filter(b => b != this.area)
    }

    setAlign (value) {
        this.styleBlocks().forEach(b => { b.style.textAlign = value })
    }

    step (delta) {
        this.styleBlocks().forEach(b => {
            const cur = parseInt(b.style.marginLeft, 10) || 0
            const next = Math.max(0, cur + delta)
            b.style.marginLeft = next ? next + 'px' : ''
        })
    }

    toggleInline (tag) {
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0) return
        const range = sel.getRangeAt(0)
        if (range.collapsed || !this.area.contains(range.commonAncestorContainer)) return
        const existing = ancestorTag(range.commonAncestorContainer, tag.toUpperCase())
        if (existing) {
            const parent = existing.parentNode
            while (existing.firstChild) parent.insertBefore(existing.firstChild, existing)
            parent.removeChild(existing)
            return
        }
        const wrapper = document.createElement(tag)
        wrapper.appendChild(range.extractContents())
        range.insertNode(wrapper)
        sel.removeAllRanges()
        const re = document.createRange()
        re.selectNodeContents(wrapper)
        sel.addRange(re)
    }

    clearFormatting () {
        exec('removeFormat')
        exec('unlink')
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0) return
        const range = sel.getRangeAt(0)
        let scope = range.commonAncestorContainer
        if (scope.nodeType != 1) scope = scope.parentNode
        if (scope == null) return
        if (!this.area.contains(scope)) scope = this.area
        const els = [scope].concat(Array.prototype.slice.call(scope.querySelectorAll('*')))
        els.forEach(el => {
            if (el == this.area) return
            if (range.intersectsNode && !range.intersectsNode(el)) return
            // Keep the glyph's class, or inline cleanup drops it
            if (el.tagName == 'IMG' && this.isGlyph(el)) return
            const kept = (el.getAttribute('class') || '').split(/\s+/).filter(c => CLASS_ALLOWED.indexOf(c) != -1)
            if (kept.length) el.setAttribute('class', kept.join(' ')); else el.removeAttribute('class')
            el.removeAttribute('style')
            const keep = ATTRS[el.tagName.toLowerCase()] || []
            Array.prototype.slice.call(el.attributes).forEach(a => {
                const name = a.name.toLowerCase()
                if (name == 'class' || (this.allowData && name.indexOf('data-') == 0)) return
                if (keep.indexOf(name) == -1) el.removeAttribute(a.name)
            })
        })
        this.sync()
    }
}
