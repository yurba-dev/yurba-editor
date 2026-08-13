import { BLOCK_SEL } from '../helpers/constants.js'

export const withSelection = (Base) => class extends Base {
    closestBlock (node) {
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
        const out = []
        const all = this.area.querySelectorAll(BLOCK_SEL)
        for (let i = 0; i < all.length; i++) {
            if (range.intersectsNode(all[i])) out.push(all[i])
        }
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
        if (this.savedRange == null) return
        this.area.focus()
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(this.savedRange)
    }

    currentCell () {
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0) return null
        let node = sel.getRangeAt(0).startContainer
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
        while (node && node != this.area) {
            if (node.nodeType == 1 && node.tagName == 'A') return node
            node = node.parentNode
        }
        return null
    }
}
