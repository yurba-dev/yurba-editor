import { exec } from '../helpers/utils.js'

export const withContext = (Base) => class extends Base {
    openTextMenu (x, y) {
        this.closeTextMenu()
        this.saveRange()
        const menu = this.makePopup()
        this.buildCtxItems(this.contextMenuItems || [], menu)
        this.textPop = menu
        this.placePopupAt(menu, x, y)
        this.revealPopup(menu)
    }

    closeTextMenu () {
        if (this.textPop == null) return
        const menu = this.textPop
        this.textPop = null
        this.dismissPopup(menu)
    }

    buildCtxItems (items, container) {
        items.forEach(item => {
            if (item.separator) {
                const sep = document.createElement('div')
                sep.className = 'y-dropdown__separator'
                container.appendChild(sep)
                return
            }
            const hasChildren = Array.isArray(item.children) && item.children.length > 0
            const btn = document.createElement('button')
            btn.type = 'button'
            btn.className = 'y-dropdown__item' + (hasChildren ? ' y-dropdown__item--has-children' : '')
            if (item.danger) btn.classList.add('y-dropdown__item--danger')
            if (item.className) btn.classList.add(...item.className.split(' ').filter(Boolean))
            btn.innerHTML =
                (item.icon ? '<span class="y-dropdown__item-icon"><span class="material-symbols-rounded">' + item.icon + '</span></span>' : '') +
                '<span class="y-dropdown__item-label">' + (item.label || '') + '</span>' +
                (hasChildren ? '<span class="y-dropdown__item-arrow">›</span>' : '')

            if (hasChildren) {
                const wrapper = document.createElement('div')
                wrapper.className = 'y-dropdown__item-wrapper'
                const submenu = document.createElement('div')
                submenu.className = 'y-dropdown__menu y-dropdown__submenu is-hidden'
                this.buildCtxItems(item.children, submenu)
                let hideTimer = null
                const show = () => { clearTimeout(hideTimer); this.positionSubmenu(btn, submenu); submenu.classList.remove('is-hidden') }
                const hide = () => { hideTimer = setTimeout(() => submenu.classList.add('is-hidden'), 80) }
                btn.addEventListener('mouseenter', show)
                btn.addEventListener('mouseleave', hide)
                submenu.addEventListener('mouseenter', () => clearTimeout(hideTimer))
                submenu.addEventListener('mouseleave', hide)
                wrapper.appendChild(btn)
                wrapper.appendChild(submenu)
                container.appendChild(wrapper)
            } else {
                btn.addEventListener('mousedown', e => { e.preventDefault(); this.runCtxItem(item); this.closeTextMenu() })
                container.appendChild(btn)
            }
        })
    }

    positionSubmenu (btn, sub) {
        sub.style.top = ''; sub.style.bottom = ''; sub.style.left = ''; sub.style.right = ''
        const pad = 8
        const t = btn.getBoundingClientRect()
        const m = sub.getBoundingClientRect()
        if (t.right + m.width > window.innerWidth - pad) { sub.style.left = 'auto'; sub.style.right = '100%' }
        else { sub.style.left = '100%'; sub.style.right = 'auto' }
        if (t.top + m.height > window.innerHeight - pad) { sub.style.top = 'auto'; sub.style.bottom = '0' }
        else { sub.style.top = '0'; sub.style.bottom = 'auto' }
    }

    runCtxItem (item) {
        this.restoreRange()
        this.area.focus()
        if (typeof item.onClick == 'function') { item.onClick(this); this.sync(); this.updateStates(); return }
        this.textCtxAction(item.action)
    }

    textCtxAction (action) {
        if (action == 'selectAll') {
            const range = document.createRange()
            range.selectNodeContents(this.area)
            const sel = window.getSelection()
            sel.removeAllRanges()
            sel.addRange(range)
            return
        }
        if (action == 'copy') {
            const text = (this.savedRange ? this.savedRange.toString() : '') || this.area.textContent
            if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {})
            return
        }
        if (action == 'paste') {
            if (navigator.clipboard && navigator.clipboard.readText) {
                navigator.clipboard.readText().then(text => { exec('insertText', text); this.enforceLimit(); this.sync() }).catch(() => {})
            }
            return
        }
        if (action == 'clear') { this.setHTML(''); this.recordState(); return }
        if (action == 'clearFormat') { this.run('ye-clear'); this.updateStates(); return }
        if (action == 'find') { this.openFindPop(); return }
        if (action == 'lower' || action == 'upper' || action == 'capitalize') { this.transformCase(action); return }
        if (action == 'link') { this.run('ye-link'); return }
        const map = { bold: 'bold', italic: 'italic', underline: 'underline', strike: 'strikeThrough', code: 'ye-code' }
        if (map[action]) { this.run(map[action]); this.sync(); this.updateStates() }
    }

    transformCase (action) {
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0) return
        const range = sel.getRangeAt(0)
        if (range.collapsed || !this.area.contains(range.commonAncestorContainer)) return

        const root = range.commonAncestorContainer.nodeType == 1 ? range.commonAncestorContainer : range.commonAncestorContainer.parentNode
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null)
        const slices = []
        let node
        while ((node = walker.nextNode())) {
            if (!range.intersectsNode(node)) continue
            const start = node == range.startContainer ? range.startOffset : 0
            const end = node == range.endContainer ? range.endOffset : node.nodeValue.length
            if (end > start) slices.push({ node: node, start: start, end: end })
        }
        if (slices.length == 0) return

        let boundary = true
        let prev = null
        let last = null
        slices.forEach(s => {
            if (action == 'capitalize' && prev && this.lineBreakBetween(prev, s.node)) boundary = true
            const seg = s.node.nodeValue.slice(s.start, s.end)
            let out
            if (action == 'lower') out = seg.toLowerCase()
            else if (action == 'upper') out = seg.toUpperCase()
            else {
                out = ''
                for (const ch of seg) {
                    if (/\s/.test(ch)) { out += ch; boundary = true }
                    else { out += boundary ? ch.toUpperCase() : ch.toLowerCase(); boundary = false }
                }
            }
            s.node.replaceData(s.start, s.end - s.start, out)
            prev = s.node
            last = { node: s.node, start: s.start, len: out.length }
        })

        try {
            const restored = document.createRange()
            restored.setStart(slices[0].node, slices[0].start)
            restored.setEnd(last.node, last.start + last.len)
            sel.removeAllRanges(); sel.addRange(restored)
        } catch (e) {}
        this.enforceLimit(); this.sync(); this.recordState()
    }

    lineBreakBetween (a, b) {
        if (this.closestBlock(a) != this.closestBlock(b)) return true
        try {
            const gap = document.createRange()
            gap.setStartAfter(a)
            gap.setEndBefore(b)
            return gap.cloneContents().querySelector('br') != null
        } catch (e) { return false }
    }
}
