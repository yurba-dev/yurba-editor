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
        exec('insertHTML', html)
    }

    tableOp (op) {
        const cell = this.currentCell()
        if (cell == null) return
        const row = cell.parentNode
        const table = ancestorTag(cell, 'TABLE')
        const idx = Array.prototype.indexOf.call(row.children, cell)

        if (op == 'row-above' || op == 'row-below') {
            const clone = row.cloneNode(true)
            const cells = clone.children
            for (let i = 0; i < cells.length; i++) {
                const fresh = document.createElement('td')
                fresh.innerHTML = '<br>'
                clone.replaceChild(fresh, cells[i])
            }
            row.parentNode.insertBefore(clone, op == 'row-above' ? row : row.nextSibling)
        } else if (op == 'col-left' || op == 'col-right') {
            const rows = table.querySelectorAll('tr')
            for (let i = 0; i < rows.length; i++) {
                const ref = rows[i].children[idx]
                const fresh = document.createElement(ref && ref.tagName == 'TH' ? 'th' : 'td')
                fresh.innerHTML = '<br>'
                rows[i].insertBefore(fresh, op == 'col-left' ? ref : (ref ? ref.nextSibling : null))
            }
        } else if (op == 'row-del') {
            if (table.querySelectorAll('tr').length > 1) row.remove()
        } else if (op == 'col-del') {
            const rows = table.querySelectorAll('tr')
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].children.length > 1 && rows[i].children[idx]) rows[i].children[idx].remove()
            }
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
            table.remove()
        }
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

    mergeCell (cell, dir) {
        const table = ancestorTag(cell, 'TABLE')
        const grid = this.tableGrid(table)
        const pos = this.findCellPos(grid, cell)
        if (pos == null) return
        const cs = cell.colSpan || 1
        const rs = cell.rowSpan || 1
        let other = null
        if (dir == 'right') {
            other = (grid[pos.r] || [])[pos.c + cs]
            if (other == null || other == cell) return
            const op = this.findCellPos(grid, other)
            if (op.r != pos.r || op.c != pos.c + cs || (other.rowSpan || 1) != rs) return
            cell.colSpan = cs + (other.colSpan || 1)
        } else {
            other = (grid[pos.r + rs] || [])[pos.c]
            if (other == null || other == cell) return
            const op = this.findCellPos(grid, other)
            if (op.r != pos.r + rs || op.c != pos.c || (other.colSpan || 1) != cs) return
            cell.rowSpan = rs + (other.rowSpan || 1)
        }
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
        cell.colSpan = 1
        cell.rowSpan = 1
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
