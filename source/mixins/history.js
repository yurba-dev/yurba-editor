function pathTo (root, node) {
    const path = []
    while (node && node != root) {
        path.unshift(Array.prototype.indexOf.call(node.parentNode.childNodes, node))
        node = node.parentNode
    }
    return node == root ? path : null
}

function nodeAt (root, path) {
    let node = root
    for (let i = 0; i < path.length && node; i++) node = node.childNodes[path[i]]
    return node || null
}

function nodeSize (node) {
    return node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length
}

export const withHistory = (Base) => class extends Base {
    recordState () {
        if (this.histTimer) { clearTimeout(this.histTimer); this.histTimer = null }
        if (this.root.classList.contains('ye--source')) return
        const html = this.area.innerHTML
        const cur = this.history[this.histIndex]
        if (cur != null && cur.html == html) return
        if (this.histIndex < this.history.length - 1) this.history.length = this.histIndex + 1
        this.history.push({ html: html, caret: this.getCaret() })
        if (this.history.length > this.HIST_MAX) this.history.shift()
        this.histIndex = this.history.length - 1
        this.updateHistoryButtons()
    }

    scheduleRecord () {
        if (this.histTimer) clearTimeout(this.histTimer)
        this.histTimer = setTimeout(() => { this.histTimer = null; this.recordState() }, 300)
    }

    flushHistory () {
        if (this.histTimer) this.recordState()
        else this.noteCaret()
    }

    // Before a change, while the text is still what the last step holds: that step keeps the caret of now,
    // so undoing the change brings the caret back to where it was made
    noteCaret () {
        if (this.histTimer || this.restoring) return
        const cur = this.history[this.histIndex]
        if (cur == null || cur.html != this.area.innerHTML) return
        const caret = this.getCaret()
        if (caret) cur.caret = caret
    }

    undo () {
        this.flushHistory()
        if (this.histIndex <= 0) return
        this.histIndex--
        this.applyState(this.history[this.histIndex])
    }

    redo () {
        this.flushHistory()
        if (this.histIndex >= this.history.length - 1) return
        this.histIndex++
        this.applyState(this.history[this.histIndex])
    }

    applyState (state) {
        if (state == null) return
        this.restoring = true
        this.deselectImage()
        this.area.innerHTML = state.html
        this.settleUploads()
        const stale = this.area.querySelectorAll('.ye-img--sel')
        for (let i = 0; i < stale.length; i++) stale[i].classList.remove('ye-img--sel')
        this.setCaret(state.caret)
        this.sync()
        this.updateStates()
        this.updateHistoryButtons()
        this.restoring = false
    }

    updateHistoryButtons () {
        const states = [['undo', this.histIndex <= 0], ['redo', this.histIndex >= this.history.length - 1]]
        states.forEach(([cmd, disabled]) => {
            const b = this.root.querySelector('.ye-toolbar__btn[data-cmd="' + cmd + '"]')
            // aria-disabled, not disabled: a press on a disabled button never reaches the editor, and focus
            // would leave the text for nothing
            if (b) { b.setAttribute('aria-disabled', disabled ? 'true' : 'false'); b.classList.toggle('is-disabled', disabled) }
        })
    }

    getCaret () {
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0) return null
        const range = sel.getRangeAt(0)
        if (!this.area.contains(range.commonAncestorContainer)) return null
        const pre = range.cloneRange()
        pre.selectNodeContents(this.area)
        pre.setEnd(range.startContainer, range.startOffset)
        const start = pre.toString().length
        // The way down the tree as well: a step brings back the very same HTML, so it finds the very place,
        // where a count of characters cannot tell the end of one block from the start of the next
        return {
            start: start, end: start + range.toString().length,
            sPath: pathTo(this.area, range.startContainer), sOff: range.startOffset,
            ePath: pathTo(this.area, range.endContainer), eOff: range.endOffset
        }
    }

    setCaret (pos) {
        if (pos == null) return
        const sNode = pos.sPath ? nodeAt(this.area, pos.sPath) : null
        const eNode = pos.ePath ? nodeAt(this.area, pos.ePath) : null
        if (sNode && eNode && pos.sOff <= nodeSize(sNode) && pos.eOff <= nodeSize(eNode)) {
            try {
                const range = document.createRange()
                range.setStart(sNode, pos.sOff)
                range.setEnd(eNode, pos.eOff)
                const sel = window.getSelection()
                sel.removeAllRanges()
                sel.addRange(range)
                return
            } catch (e) {}
        }
        const walker = document.createTreeWalker(this.area, NodeFilter.SHOW_TEXT, null)
        let chars = 0, sN = null, sO = 0, eN = null, eO = 0, n
        // A selection that starts on the border of two blocks starts in the second one: the end of the first
        // would pull the next typing (or a Delete) across into the block before
        const spans = pos.end > pos.start
        while ((n = walker.nextNode())) {
            const len = n.nodeValue.length
            if (sN == null && (spans ? pos.start < chars + len : pos.start <= chars + len)) { sN = n; sO = pos.start - chars }
            if (pos.end <= chars + len) { eN = n; eO = pos.end - chars; break }
            chars += len
        }
        if (sN == null) return
        if (eN == null) { eN = sN; eO = sO }
        try {
            const range = document.createRange()
            range.setStart(sN, Math.min(sO, sN.nodeValue.length))
            range.setEnd(eN, Math.min(eO, eN.nodeValue.length))
            const sel = window.getSelection()
            sel.removeAllRanges()
            sel.addRange(range)
        } catch (e) {}
    }
}
