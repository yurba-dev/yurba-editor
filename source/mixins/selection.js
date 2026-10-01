import { BLOCK_SEL } from '../helpers/constants.js'

export const withSelection = (Base) => class extends Base {
    closestBlock (node) {
        if (node == null || !this.area.contains(node)) return null
        while (node && node != this.area) {
            if (node.nodeType == 1 && node.matches(BLOCK_SEL)) return node
            node = node.parentNode
        }
        return null
    }

    selectionBlocks () {
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0) return []
        const range = sel.getRangeAt(0)
        let out = []
        const all = this.area.querySelectorAll(BLOCK_SEL)
        for (let i = 0; i < all.length; i++) {
            if (range.intersectsNode(all[i])) out.push(all[i])
        }
        // The innermost ones: a paragraph in a quote or a cell is indented or aligned, not the quote with it
        out = out.filter(b => !out.some(o => o != b && b.contains(o)))
        if (out.length == 0) out.push(this.closestBlock(range.startContainer) || this.area)
        return out
    }

    saveRange () {
        const sel = window.getSelection()
        if (sel && sel.rangeCount && this.area.contains(sel.getRangeAt(0).commonAncestorContainer)) {
            this.savedRange = sel.getRangeAt(0).cloneRange()
        }
    }

    restoreRange () {
        let range = this.savedRange
        // Never clicked into (or the place is gone): what comes in goes to the end rather than wherever focus is
        if (range == null || !this.area.contains(range.commonAncestorContainer)) {
            range = document.createRange()
            range.selectNodeContents(this.area)
            range.collapse(false)
        }
        // Focus alone scrolls to the start of the text before the caret is back: the place stays as it was
        const top = this.area.scrollTop
        const pageX = window.scrollX
        const pageY = window.scrollY
        this.area.focus({ preventScroll: true })
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
        this.area.scrollTop = top
        if (window.scrollY != pageY || window.scrollX != pageX) window.scrollTo(pageX, pageY)
    }

    currentCell () {
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0) return null
        let node = sel.getRangeAt(0).startContainer
        if (!this.area.contains(node)) return null
        while (node && node != this.area) {
            if (node.nodeType == 1 && (node.tagName == 'TD' || node.tagName == 'TH')) return node
            node = node.parentNode
        }
        return null
    }

    currentAnchor () {
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0) return null
        let node = sel.getRangeAt(0).startContainer
        if (!this.area.contains(node)) return null
        while (node && node != this.area) {
            if (node.nodeType == 1 && node.tagName == 'A') return node
            node = node.parentNode
        }
        return null
    }
}
