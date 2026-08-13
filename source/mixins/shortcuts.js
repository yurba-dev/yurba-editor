import { exec } from '../helpers/utils.js'

export const withShortcuts = (Base) => class extends Base {
    markdownShortcut (e) {
        if (this.inline) return
        if (e.key != ' ') return
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0 || !sel.isCollapsed) return
        const block = this.closestBlock(sel.anchorNode)
        if (block == null || block.matches('pre, li')) return
        const before = block.textContent.slice(0, sel.anchorOffset)
        if (before != block.textContent.trim()) return

        const map = { '#': 'h1', '##': 'h2', '###': 'h3', '####': 'h4', '>': 'blockquote' }
        let action = null
        if (map[before]) action = () => this.formatBlock(map[before])
        else if (before == '-' || before == '*') action = () => exec('insertUnorderedList')
        else if (before == '1.') action = () => exec('insertOrderedList')
        if (action == null) return

        e.preventDefault()
        const r = document.createRange()
        r.setStart(block, 0)
        r.setEnd(sel.anchorNode, sel.anchorOffset)
        r.deleteContents()
        action()
    }

    shortcut (e) {
        const k = (e.key || '').toLowerCase()
        if (!e.altKey && !e.shiftKey) {
            if (k == 'z') { this.undo(); return true }
            if (k == 'y') { this.redo(); return true }
            if (k == 'k') { this.nextFormAnchor = this.anchorUnder(this.root.querySelector('.ye-toolbar__btn[data-cmd="ye-link"]')); this.insertLink(); return true }
            if (k == 'f') { this.openFindPop(); return true }
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

    afterCmd () { this.sync(); this.updateStates() }
}
