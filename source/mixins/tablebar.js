import { TABLE_OPS } from '../helpers/constants.js'
import { ancestorTag } from '../helpers/utils.js'

// Each delete sits with the arrows of what it deletes, so the same bin icon reads as row or column
const BAR_GROUPS = [['row-above', 'row-below', 'row-del'], ['col-left', 'col-right', 'col-del'], ['merge-right', 'split'], ['header'], ['del']]

// The bar lives in <body>, outside the editor that defines the theme, so it takes the values along
const BAR_TOKENS = ['--ye-surface', '--ye-border', '--ye-text', '--ye-text-soft', '--ye-hover', '--ye-accent', '--ye-accent-ink', '--ye-accent-soft', '--ye-danger', '--ye-shadow']

function opLabel (key) {
    const op = TABLE_OPS.find(o => o[0] == key)
    return op ? op[1] : key
}

export const withTableBar = (Base) => class extends Base {
    buildTableBar () {
        const bar = document.createElement('div')
        bar.className = 'ye-tablebar'
        bar.setAttribute('role', 'toolbar')
        bar.setAttribute('aria-label', this.t('Table'))
        BAR_GROUPS.forEach((group, i) => {
            if (i) {
                const sep = document.createElement('span')
                sep.className = 'ye-tablebar__sep'
                bar.appendChild(sep)
            }
            group.forEach(key => {
                const b = document.createElement('button')
                b.type = 'button'
                b.className = 'ye-tablebar__btn' + (key == 'del' ? ' ye-tablebar__btn--danger' : '')
                // Pointer only: the keyboard has the table menu, and the bar sits at the end of the page
                b.tabIndex = -1
                b.dataset.yeBar = key
                b.title = this.t(opLabel(key))
                b.setAttribute('aria-label', this.t(opLabel(key)))
                b.innerHTML = this.renderIcon(key)
                bar.appendChild(b)
            })
        })
        // A press must not take the caret out of the cell, by mouse or by finger
        bar.addEventListener('pointerdown', e => e.preventDefault())
        bar.addEventListener('mousedown', e => e.preventDefault())
        bar.addEventListener('click', e => {
            const b = e.target.closest('.ye-tablebar__btn')
            if (b) this.tableBarOp(b)
        })
        document.body.appendChild(bar)
        this.tableBar = bar
        return bar
    }

    tableBarOp (btn) {
        if (btn.getAttribute('aria-disabled') == 'true') return
        const cell = this.barCell
        // A tap may have focused the button: the caret goes back to the cell it was in
        if (document.activeElement != this.area) this.area.focus({ preventScroll: true })
        if (this.currentCell() == null) {
            if (cell == null || !cell.isConnected) return
            this.caretToEnd(cell)
        }
        this.tableOp(btn.dataset.yeBar)
        this.sync()
        this.updateStates()
    }

    // The menu changes the table too: what the bar offers follows
    tableOp (op) {
        super.tableOp(op)
        this.refreshTableBar()
    }

    refreshTableBar () {
        if (this.yeDestroyed || !this.yeReady || this.inline) return
        const active = document.activeElement
        const focused = active == this.area || this.area.contains(active) || (this.tableBar != null && this.tableBar.contains(active))
        const cell = focused && !this.root.classList.contains('ye--source') ? this.currentCell() : null
        if (cell == null) { this.hideTableBar(); return }
        const bar = this.tableBar || this.buildTableBar()
        const table = ancestorTag(cell, 'TABLE')
        const grid = this.tableGrid(table)
        const pos = this.findCellPos(grid, cell)
        if (pos == null) { this.hideTableBar(); return }
        if (bar.style.display != 'flex') {
            const cs = getComputedStyle(this.root)
            BAR_TOKENS.forEach(name => { const v = cs.getPropertyValue(name); if (v) bar.style.setProperty(name, v.trim()) })
            bar.style.display = 'flex'
        }
        this.barCell = cell
        const first = table.rows[0] && table.rows[0].cells[0]
        const off = {
            'row-del': table.rows.length < 2,
            'col-del': !grid.some(r => r && r.length > 1),
            'merge-right': this.mergeTarget(grid, cell, pos, 'right') == null,
            split: (cell.colSpan || 1) < 2 && (cell.rowSpan || 1) < 2,
        }
        bar.querySelectorAll('.ye-tablebar__btn').forEach(b => {
            const key = b.dataset.yeBar
            if (off[key]) b.setAttribute('aria-disabled', 'true')
            else b.removeAttribute('aria-disabled')
            if (key == 'header') b.classList.toggle('is-active', first != null && first.tagName == 'TH')
        })
        this.positionTableBar()
    }

    // Above the table; below it when there is no room; pinned to the top edge when neither fits
    positionTableBar () {
        const bar = this.tableBar
        const cell = this.barCell
        if (bar == null || bar.style.display != 'flex') return
        if (cell == null || !cell.isConnected) { this.hideTableBar(); return }
        const t = ancestorTag(cell, 'TABLE').getBoundingClientRect()
        const a = this.area.getBoundingClientRect()
        const c = cell.getBoundingClientRect()
        let floor = Math.max(a.top, 0)
        if (this.toolbar) floor = Math.max(floor, this.toolbar.getBoundingClientRect().bottom)
        const ceil = Math.min(a.bottom, window.innerHeight)
        const h = bar.offsetHeight
        const w = bar.offsetWidth
        let top = t.top - h - 6
        if (top < floor + 4) top = t.bottom + 6 + h <= ceil - 4 ? t.bottom + 6 : floor + 4
        // Never over the cell being edited
        if (top < c.bottom && top + h > c.top) top = c.bottom + 6
        const gone = t.bottom < floor || t.top > ceil || top + h > ceil
        bar.style.visibility = gone ? 'hidden' : ''
        // On the right: the line above a table starts on the left, where a click must still reach it
        const left = Math.max(8, Math.min(Math.min(t.right, a.right) - w, window.innerWidth - w - 8))
        bar.style.left = left + 'px'
        bar.style.top = top + 'px'
    }

    hideTableBar () {
        this.barCell = null
        if (this.tableBar) this.tableBar.style.display = 'none'
    }

    wire () {
        super.wire()
        // Focus may go to the bar itself on touch; anything else hides it
        this.area.addEventListener('blur', () => setTimeout(() => this.refreshTableBar(), 0))
        this.area.addEventListener('focus', () => this.refreshTableBar())
    }

    listenGlobal (on) {
        super.listenGlobal(on)
        if (this.onClick == null || !!this.barOn == on) return
        this.barOn = on
        if (this.onBarSel == null) {
            this.onBarSel = () => this.refreshTableBar()
            this.onBarMove = () => this.positionTableBar()
        }
        const m = on ? 'addEventListener' : 'removeEventListener'
        document[m]('selectionchange', this.onBarSel)
        window[m]('scroll', this.onBarMove, true)
        window[m]('resize', this.onBarMove)
        // destroy() and a dropped editor both end here: the body-level bar would keep the editor alive
        if (!on && this.tableBar) {
            this.tableBar.remove()
            this.tableBar = null
            this.barCell = null
        }
    }
}
