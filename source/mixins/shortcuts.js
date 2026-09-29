import { exec } from '../helpers/utils.js'

function menuHas (items, action) {
    return (items || []).some(i => i.action == action || menuHas(i.children, action))
}

export const withShortcuts = (Base) => class extends Base {
    markdownShortcut (e) {
        if (this.inline) return
        if (e.key != ' ') return
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0 || !sel.isCollapsed) return
        const block = this.closestBlock(sel.anchorNode)
        if (block == null || block.matches('pre, li')) return
        const r = document.createRange()
        r.setStart(block, 0)
        r.setEnd(sel.anchorNode, sel.anchorOffset)
        const before = r.toString()
        if (before != block.textContent.trim()) return

        const blocks = { '#': 'h1', '##': 'h2', '###': 'h3', '####': 'h4', '>': 'blockquote' }
        const lists = { '-': 'insertUnorderedList', '*': 'insertUnorderedList', '1.': 'insertOrderedList' }
        // Own keys only: "constructor" must not match the prototype
        const tag = blocks.hasOwnProperty(before) ? blocks[before] : null
        const list = lists.hasOwnProperty(before) ? lists[before] : null
        if (tag == null && list == null) return

        e.preventDefault()
        r.deleteContents()
        if (tag) this.formatBlock(tag)
        else exec(list)
    }

    shortcut (e) {
        const k = (e.key || '').toLowerCase()
        if (!e.altKey && !e.shiftKey) {
            if (k == 'z') { this.undo(); return true }
            if (k == 'y') { this.redo(); return true }
            if (k == 'k' && this.offers('ye-link', 'link')) { this.nextFormAnchor = this.anchorUnder(this.root.querySelector('.ye-toolbar__btn[data-cmd="ye-link"]')); this.insertLink(); return true }
            if (k == 'f' && this.root.classList.contains('ye--full') && this.offers('ye-find', 'find')) { this.openFindPop(); return true }
        }
        if (e.shiftKey && !e.altKey) {
            if (k == 'z') { this.redo(); return true }
            if (k == 'x') { exec('strikeThrough'); this.afterCmd(); return true }
            if (!this.inline && e.code == 'Digit7') { exec('insertOrderedList'); this.afterCmd(); return true }
            if (!this.inline && e.code == 'Digit8') { exec('insertUnorderedList'); this.afterCmd(); return true }
        }
        if (!this.inline && e.altKey && !e.shiftKey) {
            const map = { Digit1: 'h1', Digit2: 'h2', Digit3: 'h3', Digit4: 'h4', Digit0: 'p' }
            if (map[e.code]) { this.formatBlock(map[e.code]); this.afterCmd(); return true }
        }
        return false
    }

    // Ctrl+F/K stay the browser's unless the editor offers them
    offers (cmd, action) {
        return this.root.querySelector('.ye-toolbar__btn[data-cmd="' + cmd + '"]') != null || (this.contextMenuEnabled && menuHas(this.contextMenuItems, action))
    }

    afterCmd () { this.sync(); this.updateStates() }
}
