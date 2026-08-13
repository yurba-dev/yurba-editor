export const withMenus = (Base) => class extends Base {
    showCtx (x, y, kind) {
        let pop = this.ctxPop
        if (pop == null) {
            pop = this.makePopup('ye-ctxpop')
            pop.addEventListener('mousedown', e => {
                const b = e.target.closest('.ye-tableops button')
                if (b == null) return
                e.preventDefault()
                if (b.dataset.ye != null) this.tableOp(b.dataset.ye)
                else if (b.dataset.yeLink != null) this.linkOp(b.dataset.yeLink)
                else if (b.dataset.yeImg != null) { this.imageOp(b.dataset.yeImg); this.hideTableCtx(); return }
                this.hideTableCtx(); this.sync()
            })
            this.ctxPop = pop
        }
        if (kind == 'link') this.buildLinkPop(pop)
        else if (kind == 'img') this.buildImagePop(pop)
        else this.buildTablePop(pop)
        this.placePopupAt(pop, x, y)
        this.ctxAnchorPos = { x: parseFloat(pop.style.left), y: parseFloat(pop.style.top) }
        this.revealPopup(pop)
    }

    hideTableCtx () {
        if (this.ctxPop == null) return
        const pop = this.ctxPop
        this.ctxPop = null
        this.dismissPopup(pop)
    }

    openCtxAt (target, x, y) {
        const near = sel => (target && target.closest ? target.closest(sel) : null)
        let anchor = near('a')
        if (anchor && this.area.contains(anchor)) { this.ctxAnchor = anchor; this.showCtx(x, y, 'link'); return true }
        let img = near('img')
        if (img && this.area.contains(img)) { this.selectImage(img); this.ctxImg = img; this.showCtx(x, y, 'img'); return true }
        let cell = target
        while (cell && cell != this.area) {
            if (cell.nodeType == 1 && (cell.tagName == 'TD' || cell.tagName == 'TH')) break
            cell = cell.parentNode
        }
        if (cell && cell != this.area) {
            const range = document.createRange()
            range.selectNodeContents(cell)
            range.collapse(true)
            const sel = window.getSelection()
            sel.removeAllRanges()
            sel.addRange(range)
            this.showCtx(x, y, 'table')
            return true
        }
        if (this.contextMenuEnabled) {
            this.openTextMenu(x, y)
            return true
        }
        return false
    }

    anchorUnder (el) {
        if (el == null) return null
        const r = el.getBoundingClientRect()
        return { x: r.left, y: r.bottom + 4 }
    }

    positionMenuPop (menu) {
        const btn = menu.querySelector('[data-ye-menu-toggle]')
        const pop = menu._pop
        if (btn == null || pop == null) return
        const rect = btn.getBoundingClientRect()
        const pad = 8
        const mw = pop.offsetWidth
        const mh = pop.offsetHeight
        let left = rect.left
        let top = rect.bottom + 4
        if (left + mw > window.innerWidth - pad) left = window.innerWidth - mw - pad
        if (left < pad) left = pad
        if (top + mh > window.innerHeight - pad) top = Math.max(pad, rect.top - 4 - mh)
        pop.style.left = left + 'px'
        pop.style.top = top + 'px'
    }

    buildLinkPop (pop) {
        pop.innerHTML = ''
        const wrap = document.createElement('div')
        wrap.className = 'ye-tableops'
        const ops = [['edit', 'Edit link'], ['open', 'Open'], ['remove', 'Remove link']]
        ops.forEach(op => {
            const b = document.createElement('button')
            b.type = 'button'
            b.innerHTML = this.renderIcon(op[0]) + '<span>' + op[1] + '</span>'
            b.dataset.yeLink = op[0]
            if (op[0] == 'remove') b.className = 'ye-tableops__danger'
            wrap.appendChild(b)
        })
        pop.appendChild(wrap)
    }

    buildImagePop (pop) {
        pop.innerHTML = ''
        const wrap = document.createElement('div')
        wrap.className = 'ye-tableops'
        const ops = [
            ['align-left', 'Float left'], ['align-center', 'Center'], ['align-right', 'Float right'], ['align-none', 'Inline'],
            ['|'],
            ['alt', 'Alt text…'], ['img-del', 'Delete image']
        ]
        ops.forEach(op => {
            if (op[0] == '|') { const d = document.createElement('div'); d.className = 'ye-tableops__sep'; wrap.appendChild(d); return }
            const b = document.createElement('button')
            b.type = 'button'
            b.innerHTML = this.renderIcon(op[0]) + '<span>' + op[1] + '</span>'
            b.dataset.yeImg = op[0]
            if (op[0] == 'img-del') b.className = 'ye-tableops__danger'
            wrap.appendChild(b)
        })
        pop.appendChild(wrap)
    }

    closeMenus () {
        (this.menuPops || []).forEach(p => p.classList.remove('is-open'))
        const menus = this.root.querySelectorAll('.ye-menu.is-open')
        for (let i = 0; i < menus.length; i++) menus[i].classList.remove('is-open')
        const openEl = this.openMenuEl
        this.openMenuEl = null
        if (openEl && openEl._pop) {
            const pop = openEl._pop
            setTimeout(() => { if (!pop.classList.contains('is-open')) openEl.appendChild(pop) }, 160)
        }
    }

    owns (t) {
        if (this.root.contains(t)) return true
        if (this.ctxPop && this.ctxPop.contains(t)) return true
        if (this.textPop && this.textPop.contains(t)) return true
        if (this.formPop && this.formPop.contains(t)) return true
        if (this.findPop && this.findPop.contains(t)) return true
        if (this.imgHandle && this.imgHandle.contains(t)) return true
        const pops = this.menuPops || []
        for (let i = 0; i < pops.length; i++) if (pops[i].contains(t)) return true
        return false
    }
}
