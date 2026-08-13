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
        const stale = this.area.querySelectorAll('.ye-img--sel')
        for (let i = 0; i < stale.length; i++) stale[i].classList.remove('ye-img--sel')
        this.setCaret(state.caret)
        this.sync()
        this.updateStates()
        this.updateHistoryButtons()
        this.restoring = false
    }

    updateHistoryButtons () {
        const set = (cmd, disabled) => {
            const b = this.root.querySelector('.ye-toolbar__btn[data-cmd="' + cmd + '"]')
            if (b) { b.disabled = disabled; b.classList.toggle('is-disabled', disabled) }
        }
        set('undo', this.histIndex <= 0)
        set('redo', this.histIndex >= this.history.length - 1)
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
        return { start: start, end: start + range.toString().length }
    }

    setCaret (pos) {
        if (pos == null) return
        const walker = document.createTreeWalker(this.area, NodeFilter.SHOW_TEXT, null)
        let chars = 0, sN = null, sO = 0, eN = null, eO = 0, n
        while ((n = walker.nextNode())) {
            const len = n.nodeValue.length
            if (sN == null && pos.start <= chars + len) { sN = n; sO = pos.start - chars }
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
