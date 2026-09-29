import { escapeHtml, escapeRegExp, exec } from '../helpers/utils.js'

// Taken at load: a page may later shadow Highlight
const CssHighlight = typeof Highlight == 'function' ? Highlight : null

export const withFind = (Base) => class extends Base {
    openFindPop () {
        if (this.findPop) { this.findInput.focus(); this.findInput.select(); return }
        const pop = this.makePopup('ye-findpop')
        this.fillFindPop(pop)
        this.placePopupBelow(pop, (this.toolbar || this.area).getBoundingClientRect(), 'right')
        this.revealPopup(pop)
        this.findInput.focus(); this.findInput.select()
        this.runFind()
    }

    fillFindPop (pop) {
        const editor = this
        function t (s) {
            return escapeHtml(editor.t(s))
        }
        pop.innerHTML =
            '<div class="ye-findpop__row">' +
            '<input type="text" class="ye-formpop__input ye-findpop__q" placeholder="' + t('Find') + '" aria-label="' + t('Find') + '" spellcheck="false">' +
            '<span class="ye-findpop__count" aria-live="polite"></span>' +
            '<button type="button" class="ye-findpop__btn" data-ye-find="prev" title="' + t('Previous') + '" aria-label="' + t('Previous') + '">' + this.renderIcon('find-prev') + '</button>' +
            '<button type="button" class="ye-findpop__btn" data-ye-find="next" title="' + t('Next') + '" aria-label="' + t('Next') + '">' + this.renderIcon('find-next') + '</button>' +
            '<button type="button" class="ye-findpop__btn" data-ye-find="close" title="' + t('Close') + '" aria-label="' + t('Close') + '">' + this.iconOr('find-close', '✕') + '</button>' +
            '</div>' +
            '<div class="ye-findpop__row">' +
            '<input type="text" class="ye-formpop__input ye-findpop__r" placeholder="' + t('Replace with') + '" aria-label="' + t('Replace with') + '" spellcheck="false">' +
            '<button type="button" class="ye-formpop__btn" data-ye-find="one">' + t('Replace') + '</button>' +
            '<button type="button" class="ye-formpop__btn" data-ye-find="all">' + t('All') + '</button>' +
            '</div>' +
            '<label class="ye-formpop__check"><input type="checkbox" class="ye-findpop__case"> ' + t('Match case') + '</label>'
        this.findPop = pop
        this.findInput = pop.querySelector('.ye-findpop__q')
        this.replaceInput = pop.querySelector('.ye-findpop__r')
        this.findCount = pop.querySelector('.ye-findpop__count')
        this.findCase = pop.querySelector('.ye-findpop__case')

        pop.addEventListener('mousedown', e => {
            const b = e.target.closest('[data-ye-find]')
            if (b == null) return
            e.preventDefault()
            const op = b.dataset.yeFind
            if (op == 'prev') this.findNav(-1)
            else if (op == 'next') this.findNav(1)
            else if (op == 'one') this.replaceCurrent()
            else if (op == 'all') this.replaceAll()
            else if (op == 'close') this.hideFindPop()
        })
        this.findInput.addEventListener('input', () => this.runFind())
        this.findCase.addEventListener('change', () => this.runFind())
        function histKey (e) {
            const k = (e.key || '').toLowerCase()
            if (!(e.ctrlKey || e.metaKey) || (k != 'z' && k != 'y')) return false
            e.preventDefault()
            if (k == 'y' || e.shiftKey) editor.redo(); else editor.undo()
            e.currentTarget.focus()
            return true
        }
        this.findInput.addEventListener('keydown', e => {
            if (histKey(e)) return
            if (e.key == 'Enter') { e.preventDefault(); this.findNav(e.shiftKey ? -1 : 1) }
            else if (e.key == 'Escape') { e.preventDefault(); this.hideFindPop() }
        })
        this.replaceInput.addEventListener('keydown', e => {
            if (histKey(e)) return
            if (e.key == 'Enter') { e.preventDefault(); this.replaceCurrent() }
            else if (e.key == 'Escape') { e.preventDefault(); this.hideFindPop() }
        })

        const selText = (window.getSelection() && window.getSelection().toString()) || ''
        if (selText && selText.length < 120 && this.area.contains(window.getSelection().anchorNode)) this.findInput.value = selText
    }

    hideFindPop () {
        if (this.findPop == null) return
        const pop = this.findPop
        this.findPop = null
        this.findState = null
        this.clearFindHighlights()
        this.dismissFindPop(pop)
    }

    dismissFindPop (pop) {
        this.dismissPopup(pop)
    }

    runFind () {
        const q = this.findInput ? this.findInput.value : ''
        const cs = this.findCase ? this.findCase.checked : false
        this.findState = { query: q, cs: cs, matches: q ? this.findMatches(q, cs) : [], index: 0 }
        this.showFindMatch()
    }

    refreshFind () {
        if (this.findPop == null || this.findInput == null) return
        const q = this.findInput.value
        const cs = this.findCase ? this.findCase.checked : false
        const prev = this.findState ? this.findState.index : 0
        const matches = q ? this.findMatches(q, cs) : []
        const index = Math.min(prev, Math.max(0, matches.length - 1))
        this.findState = { query: q, cs: cs, matches: matches, index: index }
        if (this.findCount) this.findCount.textContent = matches.length ? (index + 1) + ' / ' + matches.length : (q ? this.t('No matches') : '')
        this.highlightMatches()
    }

    // Offsets from the original: lowercasing can change length ("İ")
    matchesIn (text, q, cs) {
        const out = []
        const re = new RegExp(escapeRegExp(q), cs ? 'gu' : 'giu')
        let m
        while ((m = re.exec(text))) {
            if (m[0].length == 0) { re.lastIndex++; continue }
            out.push({ start: m.index, end: m.index + m[0].length })
        }
        return out
    }

    findMatches (q, cs) {
        const out = []
        const walker = document.createTreeWalker(this.area, NodeFilter.SHOW_TEXT, null)
        let n
        while ((n = walker.nextNode())) {
            this.matchesIn(n.nodeValue, q, cs).forEach(m => out.push({ node: n, start: m.start, end: m.end }))
        }
        return out
    }

    showFindMatch () {
        const st = this.findState
        if (st == null || this.findCount == null) return
        const n = st.matches.length
        this.findCount.textContent = n ? (st.index + 1) + ' / ' + n : (st.query ? this.t('No matches') : '')
        this.highlightMatches()
        if (!n) return
        const m = st.matches[st.index]
        try {
            const r = document.createRange()
            r.setStart(m.node, m.start)
            r.setEnd(m.node, m.end)
            const rect = r.getBoundingClientRect()
            const ar = this.area.getBoundingClientRect()
            if (rect.top < ar.top + 20) this.area.scrollTop += rect.top - ar.top - 40
            else if (rect.bottom > ar.bottom - 20) this.area.scrollTop += rect.bottom - ar.bottom + 40
        } catch (e) {}
    }

    highlightMatches () {
        if (CssHighlight == null || !window.CSS || !CSS.highlights) return
        const st = this.findState
        const all = new CssHighlight()
        const current = new CssHighlight()
        if (st) {
            for (let i = 0; i < st.matches.length; i++) {
                const m = st.matches[i]
                const r = document.createRange()
                try { r.setStart(m.node, m.start); r.setEnd(m.node, m.end) } catch (e) { continue }
                if (i == st.index) current.add(r); else all.add(r)
            }
        }
        CSS.highlights.set('ye-find', all)
        CSS.highlights.set('ye-find-current', current)
    }

    clearFindHighlights () {
        if (window.CSS && CSS.highlights) { CSS.highlights.delete('ye-find'); CSS.highlights.delete('ye-find-current') }
    }

    findNav (dir) {
        const st = this.findState
        if (st == null || st.matches.length == 0) return
        st.index = (st.index + dir + st.matches.length) % st.matches.length
        this.showFindMatch()
    }

    replaceCurrent () {
        const st = this.findState
        if (st == null || st.matches.length == 0) return
        const m = st.matches[st.index]
        try {
            const r = document.createRange()
            r.setStart(m.node, m.start)
            r.setEnd(m.node, m.end)
            const sel = window.getSelection()
            sel.removeAllRanges()
            sel.addRange(r)
            this.area.focus()
            exec('insertText', this.replaceInput.value)
            this.enforceLimit(); this.sync(); this.recordState()
        } catch (e) {}
        const keep = st.index
        this.runFind()
        if (this.findState.matches.length) {
            this.findState.index = Math.min(keep, this.findState.matches.length - 1)
            this.showFindMatch()
        }
        if (this.replaceInput) this.replaceInput.focus()
    }

    replaceAll () {
        const q = this.findInput.value
        if (!q) return
        const cs = this.findCase.checked
        const rep = this.replaceInput.value
        const walker = document.createTreeWalker(this.area, NodeFilter.SHOW_TEXT, null)
        const nodes = []
        let n
        while ((n = walker.nextNode())) nodes.push(n)
        let count = 0
        nodes.forEach(node => {
            const text = node.nodeValue
            const found = this.matchesIn(text, q, cs)
            if (found.length == 0) return
            let result = '', from = 0
            found.forEach(m => { result += text.slice(from, m.start) + rep; from = m.end })
            node.nodeValue = result + text.slice(from)
            count += found.length
        })
        if (count) { this.enforceLimit(); this.sync(); this.recordState() }
        this.runFind()
        if (this.findCount) this.findCount.textContent = this.t('Replaced') + ' ' + count
    }
}
