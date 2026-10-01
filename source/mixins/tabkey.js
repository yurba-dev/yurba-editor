import { ancestorTag } from '../helpers/utils.js'

function isList (node) {
    return node != null && (node.tagName == 'UL' || node.tagName == 'OL')
}

export const withTabKey = (Base) => class extends Base {
    // Tab nests list items and walks table cells; anywhere else it leaves the editor, as a keyboard user expects
    tabKey (e) {
        if (this.inline || e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return false
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0) return false
        let node = sel.getRangeAt(0).startContainer
        if (!this.area.contains(node)) return false
        while (node && node != this.area) {
            if (node.nodeType == 1 && node.tagName == 'LI') { this.tabList(sel, e.shiftKey); return true }
            if (node.nodeType == 1 && (node.tagName == 'TD' || node.tagName == 'TH')) { this.tabCell(node, e.shiftKey); return true }
            node = node.parentNode
        }
        return false
    }

    tabCell (cell, back) {
        const table = ancestorTag(cell, 'TABLE')
        const grid = this.tableGrid(table)
        const order = this.cellOrder(grid)
        let target = order[order.indexOf(cell) + (back ? -1 : 1)]
        if (target == null && !back) {
            this.insertRow(table, grid, table.rows.length)
            target = table.rows[table.rows.length - 1].cells[0]
        }
        if (target == null) return
        this.caretToEnd(target)
        this.sync()
    }

    tabList (sel, back) {
        const range = sel.getRangeAt(0)
        const mark = [sel.anchorNode, sel.anchorOffset, sel.focusNode, sel.focusOffset]
        const items = this.selectedItems(range)
        // Chrome's own indent makes <ul><ul> and its outdent leaves loose text, so the tree is built by hand
        let lifted = null
        items.forEach(li => { lifted = (back ? this.unnestItem(li) : this.nestItem(li)) || lifted })
        // Moving a node drops the selection inside it; the nodes themselves are still there, unless an empty item was the caret's place
        if (this.area.contains(mark[0]) && this.area.contains(mark[2])) {
            try { sel.setBaseAndExtent(mark[0], mark[1], mark[2], mark[3]) } catch (err) {}
        } else if (lifted) {
            this.caretToEnd(lifted)
        }
        this.sync()
        this.updateStates()
    }

    // The outermost items touched: the item the caret is in, not the one around its list
    selectedItems (range) {
        const startLi = ancestorTag(range.startContainer, 'LI')
        const endLi = ancestorTag(range.endContainer, 'LI')
        const all = Array.prototype.slice.call(this.area.querySelectorAll('li')).filter(li => {
            if (!range.intersectsNode(li) || !isList(li.parentNode)) return false
            return !((startLi && li != startLi && li.contains(startLi)) || (endLi && li != endLi && li.contains(endLi)))
        })
        return all.filter(li => !all.some(o => o != li && o.contains(li)))
    }

    nestItem (li) {
        const list = li.parentNode
        const prev = li.previousElementSibling
        if (prev == null) return
        // A list left inside a list by older edits takes the item as it is
        if (isList(prev)) { prev.appendChild(li); return }
        if (prev.tagName != 'LI') return
        let sub = prev.lastElementChild
        if (sub == null || sub.tagName != list.tagName) {
            sub = document.createElement(list.tagName)
            prev.appendChild(sub)
        }
        sub.appendChild(li)
    }

    unnestItem (li) {
        const list = li.parentNode
        const host = list.parentNode.tagName == 'LI' ? list.parentNode : (isList(list.parentNode) ? list : null)
        if (host == null) return this.liftItem(li)
        // Items below it stay below it, so they go one level down under it
        const rest = []
        for (let n = li.nextSibling; n; n = n.nextSibling) rest.push(n)
        if (rest.some(n => n.nodeType == 1)) {
            let sub = li.lastElementChild
            if (sub == null || sub.tagName != list.tagName) {
                sub = document.createElement(list.tagName)
                li.appendChild(sub)
            }
            rest.forEach(n => sub.appendChild(n))
        }
        host.parentNode.insertBefore(li, host.nextSibling)
        if (list.firstElementChild == null) list.remove()
    }

    // Out of the top level the item becomes a paragraph, splitting its list around it
    liftItem (li) {
        const list = li.parentNode
        const tail = document.createElement(list.tagName)
        while (li.nextSibling) tail.appendChild(li.nextSibling)
        const out = []
        let p = null
        Array.prototype.slice.call(li.childNodes).forEach(n => {
            if (n.nodeType == 1 && (isList(n) || n.matches('p,div,h1,h2,h3,h4,blockquote,pre,table'))) { out.push(n); p = null; return }
            if (p == null) { p = document.createElement('p'); out.push(p) }
            p.appendChild(n)
        })
        if (out.length == 0) { p = document.createElement('p'); p.innerHTML = '<br>'; out.push(p) }
        const last = out[out.length - 1]
        if (last && last.tagName == tail.tagName) { while (tail.firstChild) last.appendChild(tail.firstChild) }
        else if (tail.firstElementChild) out.push(tail)
        const at = list.nextSibling
        out.forEach(n => list.parentNode.insertBefore(n, at))
        li.remove()
        if (list.firstElementChild == null) list.remove()
        return out[0]
    }
}
