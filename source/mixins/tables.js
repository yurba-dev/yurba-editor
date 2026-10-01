import { TABLE_OPS } from '../helpers/constants.js'
import { ancestorTag, exec } from '../helpers/utils.js'

export const withTables = (Base) => class extends Base {
    insertTable (rows, cols, header) {
        let html = '<table><tbody>'
        for (let r = 0; r < rows; r++) {
            const cellTag = (header && r == 0) ? 'th' : 'td'
            html += '<tr>'
            for (let c = 0; c < cols; c++) html += '<' + cellTag + '><br></' + cellTag + '>'
            html += '</tr>'
        }
        html += '</tbody></table><p><br></p>'
        this.flushHistory()
        exec('insertHTML', html)
        // Typing goes on in the first cell, not in the line below the table
        const sel = window.getSelection()
        const line = sel.rangeCount ? this.closestBlock(sel.anchorNode) : null
        const table = line && line.previousElementSibling
        const cell = table && table.tagName == 'TABLE' ? table.querySelector('th, td') : null
        if (cell) {
            const r = document.createRange()
            r.setStart(cell, 0)
            r.collapse(true)
            sel.removeAllRanges()
            sel.addRange(r)
        }
        this.sync()
        this.recordState()
    }

    // One step of the history, apart from the typing before it
    tableOp (op) {
        if (this.currentCell() == null) return
        this.flushHistory()
        this.runTableOp(op)
        this.sync()
        this.recordState()
    }

    runTableOp (op) {
        const cell = this.currentCell()
        if (cell == null) return
        const table = ancestorTag(cell, 'TABLE')
        // Rows and columns as they are seen, merged cells included; a table inside a cell is its own
        const grid = this.tableGrid(table)
        const pos = this.findCellPos(grid, cell)
        if (pos == null) return

        if (op == 'row-above' || op == 'row-below') {
            this.insertRow(table, grid, op == 'row-above' ? pos.r : pos.r + (cell.rowSpan || 1))
        } else if (op == 'col-left' || op == 'col-right') {
            this.insertCol(table, grid, op == 'col-left' ? pos.c : pos.c + (cell.colSpan || 1))
        } else if (op == 'row-del') {
            if (table.rows.length > 1) this.deleteRow(table, grid, pos.r)
        } else if (op == 'col-del') {
            if (grid.some(r => r && r.length > 1)) this.deleteCol(grid, pos.c)
        } else if (op == 'header') {
            const first = table.querySelector('tr')
            if (first == null) return
            const toTh = first.children[0] == null || first.children[0].tagName == 'TD'
            Array.prototype.slice.call(first.children).forEach(c => {
                const t = document.createElement(toTh ? 'th' : 'td')
                Array.prototype.slice.call(c.attributes).forEach(a => t.setAttribute(a.name, a.value))
                t.innerHTML = c.innerHTML
                first.replaceChild(t, c)
            })
        } else if (op == 'cell-left' || op == 'cell-center' || op == 'cell-right') {
            const val = op.slice(5)
            cell.style.textAlign = cell.style.textAlign == val ? '' : val
        } else if (op == 'merge-right') {
            this.mergeCell(cell, 'right')
        } else if (op == 'merge-down') {
            this.mergeCell(cell, 'down')
        } else if (op == 'split') {
            this.splitCell(cell)
        } else if (op == 'grid') {
            table.classList.toggle('ye-table--no-grid')
        } else if (op == 'del') {
            const next = table.nextElementSibling || table.previousElementSibling
            table.remove()
            if (next && this.area.contains(next)) this.caretToEnd(next)
        }
        // The caret went with its cell: it stays at the same place in the grid, so the next press still works
        if (!cell.isConnected && table.isConnected) {
            const left = this.tableGrid(table)
            const row = left[Math.min(pos.r, left.length - 1)] || []
            const near = row[Math.min(pos.c, row.length - 1)]
            if (near) this.caretToEnd(near)
        }
    }

    // Cells in reading order, each once, where it starts
    cellOrder (grid) {
        const out = []
        grid.forEach(row => (row || []).forEach(cell => { if (cell && out.indexOf(cell) == -1) out.push(cell) }))
        return out
    }

    caretToEnd (box) {
        const range = document.createRange()
        const walker = document.createTreeWalker(box, NodeFilter.SHOW_TEXT, null)
        let last = null
        let n
        while ((n = walker.nextNode())) if (n.nodeValue.trim() != '') last = n
        if (last) {
            range.setStart(last, last.nodeValue.length)
        } else {
            // An empty cell holds a <br> (or a <p><br></p>): the caret goes before it, not onto a second line
            let inner = box
            while (inner.firstElementChild && inner.firstElementChild.matches('p,div,h1,h2,h3,h4,blockquote,pre')) inner = inner.firstElementChild
            range.setStart(inner, 0)
        }
        range.collapse(true)
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
        const el = last ? last.parentNode : box
        if (el.scrollIntoView) el.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }

    tableGrid (table) {
        const grid = []
        const rows = Array.prototype.slice.call(table.rows)
        for (let r = 0; r < rows.length; r++) {
            grid[r] = grid[r] || []
            let c = 0
            const cells = Array.prototype.slice.call(rows[r].cells)
            for (let ci = 0; ci < cells.length; ci++) {
                const cell = cells[ci]
                while (grid[r][c]) c++
                const cs = cell.colSpan || 1
                const rs = cell.rowSpan || 1
                for (let dr = 0; dr < rs; dr++) {
                    grid[r + dr] = grid[r + dr] || []
                    for (let dc = 0; dc < cs; dc++) grid[r + dr][c + dc] = cell
                }
                c += cs
            }
        }
        return grid
    }

    findCellPos (grid, cell) {
        for (let r = 0; r < grid.length; r++) {
            const row = grid[r] || []
            for (let c = 0; c < row.length; c++) if (row[c] == cell) return { r: r, c: c }
        }
        return null
    }

    // Only a neighbour of the same height (or width) that starts on the same line joins in, so the grid stays a rectangle
    mergeTarget (grid, cell, pos, dir) {
        const cs = cell.colSpan || 1
        const rs = cell.rowSpan || 1
        const right = dir == 'right'
        const other = right ? (grid[pos.r] || [])[pos.c + cs] : (grid[pos.r + rs] || [])[pos.c]
        if (other == null || other == cell) return null
        const op = this.findCellPos(grid, other)
        if (right && (op.r != pos.r || op.c != pos.c + cs || (other.rowSpan || 1) != rs)) return null
        if (!right && (op.r != pos.r + rs || op.c != pos.c || (other.colSpan || 1) != cs)) return null
        return other
    }

    mergeCell (cell, dir) {
        const table = ancestorTag(cell, 'TABLE')
        const grid = this.tableGrid(table)
        const pos = this.findCellPos(grid, cell)
        if (pos == null) return
        const other = this.mergeTarget(grid, cell, pos, dir)
        if (other == null) return
        if (dir == 'right') cell.colSpan = (cell.colSpan || 1) + (other.colSpan || 1)
        else cell.rowSpan = (cell.rowSpan || 1) + (other.rowSpan || 1)
        const otherHtml = other.innerHTML.replace(/^(\s|<br\s*\/?>)+$/i, '')
        if (otherHtml) cell.innerHTML = cell.innerHTML.replace(/^(<br\s*\/?>)+$/i, '') + ' ' + otherHtml
        other.parentNode.removeChild(other)
    }

    splitCell (cell) {
        const table = ancestorTag(cell, 'TABLE')
        const cs = cell.colSpan || 1
        const rs = cell.rowSpan || 1
        if (cs <= 1 && rs <= 1) return
        const grid = this.tableGrid(table)
        const pos = this.findCellPos(grid, cell)
        if (pos == null) return
        const rows = table.rows
        const tag = cell.tagName.toLowerCase()
        this.setSpan(cell, 'colspan', 1)
        this.setSpan(cell, 'rowspan', 1)
        for (let dr = 0; dr < rs; dr++) {
            for (let dc = 0; dc < cs; dc++) {
                if (dr == 0 && dc == 0) continue
                const rr = pos.r + dr, cc = pos.c + dc
                const tr = rows[rr]
                if (tr == null) continue
                const fresh = document.createElement(tag)
                fresh.innerHTML = '<br>'
                let ref = null
                const starts = this.rowStarts(grid, rr)
                for (let i = 0; i < starts.length; i++) { if (starts[i].c >= cc) { ref = starts[i].cell; break } }
                tr.insertBefore(fresh, ref)
                grid[rr][cc] = fresh
            }
        }
    }

    // A span of one is no span: the attribute goes rather than staying as colspan="1"
    setSpan (cell, name, n) {
        if (n > 1) cell.setAttribute(name, n)
        else cell.removeAttribute(name)
    }

    freshCell (tag) {
        const fresh = document.createElement(tag)
        fresh.innerHTML = '<br>'
        return fresh
    }

    // A cell that starts in a row goes before the first one there that stands right of it
    placeCell (tr, grid, r, c, fresh) {
        const starts = this.rowStarts(grid, r)
        let ref = null
        for (let i = 0; i < starts.length; i++) { if (starts[i].c >= c) { ref = starts[i].cell; break } }
        tr.insertBefore(fresh, ref)
    }

    insertRow (table, grid, at) {
        const rows = table.rows
        const width = Math.max(...grid.map(r => (r || []).length))
        const tr = document.createElement('tr')
        const grown = []
        for (let c = 0; c < width; c++) {
            const above = (grid[at - 1] || [])[c]
            // A cell spanning over the new row just grows into it
            if (above && (grid[at] || [])[c] == above) {
                if (grown.indexOf(above) == -1) { above.rowSpan = (above.rowSpan || 1) + 1; grown.push(above) }
                continue
            }
            tr.appendChild(this.freshCell('td'))
        }
        if (at < rows.length) rows[at].parentNode.insertBefore(tr, rows[at])
        else rows[rows.length - 1].parentNode.appendChild(tr)
    }

    insertCol (table, grid, at) {
        const rows = table.rows
        const grown = []
        for (let r = 0; r < rows.length; r++) {
            const left = (grid[r] || [])[at - 1]
            const right = (grid[r] || [])[at]
            if (left && left == right) {
                if (grown.indexOf(left) == -1) { left.colSpan = (left.colSpan || 1) + 1; grown.push(left) }
                continue
            }
            const beside = right || left
            this.placeCell(rows[r], grid, r, at, this.freshCell(beside && beside.tagName == 'TH' ? 'th' : 'td'))
        }
    }

    deleteRow (table, grid, r) {
        const tr = table.rows[r]
        const next = table.rows[r + 1]
        const seen = []
        ;(grid[r] || []).forEach((cell, c) => {
            if (cell == null || seen.indexOf(cell) != -1) return
            seen.push(cell)
            if ((cell.rowSpan || 1) < 2) return
            this.setSpan(cell, 'rowspan', cell.rowSpan - 1)
            // A merged cell that starts here moves down to the row it still covers
            if (cell.parentNode == tr && next) this.placeCell(next, grid, r + 1, c, cell)
        })
        tr.remove()
    }

    deleteCol (grid, c) {
        const seen = []
        grid.forEach(row => {
            const cell = (row || [])[c]
            if (cell == null || seen.indexOf(cell) != -1) return
            seen.push(cell)
            if ((cell.colSpan || 1) > 1) this.setSpan(cell, 'colspan', cell.colSpan - 1)
            else cell.remove()
        })
    }

    rowStarts (grid, rr) {
        const out = []
        const seen = []
        const row = grid[rr] || []
        for (let c = 0; c < row.length; c++) {
            const cell = row[c]
            if (cell == null || seen.indexOf(cell) != -1) continue
            seen.push(cell)
            const p = this.findCellPos(grid, cell)
            if (p && p.r == rr) out.push({ c: c, cell: cell })
        }
        out.sort((a, b) => a.c - b.c)
        return out
    }

    buildTablePop (pop) {
        pop.innerHTML = ''
        if (this.currentCell() != null) {
            const wrap = document.createElement('div')
            wrap.className = 'ye-tableops'
            wrap.setAttribute('role', 'menu')
            TABLE_OPS.forEach(op => {
                if (op[0] == '|') { const d = document.createElement('div'); d.className = 'ye-tableops__sep'; wrap.appendChild(d); return }
                const b = document.createElement('button')
                b.type = 'button'
                b.setAttribute('role', 'menuitem')
                b.innerHTML = this.renderIcon(op[0]) + '<span>' + this.t(op[1]) + '</span>'
                b.dataset.ye = op[0]
                if (op[0] == 'del') b.className = 'ye-tableops__danger'
                wrap.appendChild(b)
            })
            pop.appendChild(wrap)
        } else {
            const grid = document.createElement('div')
            grid.className = 'ye-grid'
            for (let r = 1; r <= 6; r++) {
                for (let c = 1; c <= 6; c++) {
                    const cell = document.createElement('button')
                    cell.type = 'button'
                    cell.setAttribute('aria-label', r + ' × ' + c)
                    cell.className = 'ye-grid__cell'
                    cell.dataset.r = r
                    cell.dataset.c = c
                    grid.appendChild(cell)
                }
            }
            const label = document.createElement('div')
            label.className = 'ye-grid__label'
            label.textContent = this.t('Pick size')
            const opt = document.createElement('label')
            opt.className = 'ye-grid__opt'
            opt.innerHTML = '<input type="checkbox" data-ye-table-header> ' + this.t('Header row')
            pop.appendChild(grid)
            pop.appendChild(label)
            pop.appendChild(opt)
        }
    }
}
