import { CTX_ICON_KEYS } from '../helpers/constants.js'
import { exec } from '../helpers/utils.js'

function byMouse (fn) {
    return function (e) {
        if (e.pointerType == 'mouse') fn()
    }
}

export const withContext = (Base) => class extends Base {
    openTextMenu (x, y) {
        this.closeTextMenu()
        this.saveRange()
        const menu = this.makePopup()
        menu.setAttribute('role', 'menu')
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
                sep.setAttribute('role', 'separator')
                container.appendChild(sep)
                return
            }
            const hasChildren = Array.isArray(item.children) && item.children.length > 0
            const btn = document.createElement('button')
            btn.type = 'button'
            btn.className = 'y-dropdown__item' + (hasChildren ? ' y-dropdown__item--has-children' : '')
            btn.setAttribute('role', 'menuitem')
            if (hasChildren) btn.setAttribute('aria-haspopup', 'true')
            if (item.danger) btn.classList.add('y-dropdown__item--danger')
            if (item.className) btn.classList.add(...item.className.split(' ').filter(Boolean))
            const icon = this.ctxIcon(item)
            btn.innerHTML =
                (icon ? '<span class="y-dropdown__item-icon">' + icon + '</span>' : '') +
                '<span class="y-dropdown__item-label">' + this.t(item.label || '') + '</span>' +
                (hasChildren ? '<span class="y-dropdown__item-arrow">' + this.iconOr('submenu', '›') + '</span>' : '')

            if (hasChildren) {
                const wrapper = document.createElement('div')
                wrapper.className = 'y-dropdown__item-wrapper'
                const submenu = document.createElement('div')
                submenu.className = 'y-dropdown__menu y-dropdown__submenu is-hidden'
                submenu.setAttribute('role', 'menu')
                this.buildCtxItems(item.children, submenu)
                const editor = this
                let hideTimer = null
                function show () {
                    clearTimeout(hideTimer)
                    editor.positionSubmenu(btn, submenu)
                    submenu.classList.remove('is-hidden')
                }
                function hide () {
                    hideTimer = setTimeout(() => submenu.classList.add('is-hidden'), 80)
                }
                // Mouse only: emulated touch hover would open and close it at once
                btn.addEventListener('pointerenter', byMouse(show))
                btn.addEventListener('pointerleave', byMouse(hide))
                submenu.addEventListener('pointerenter', byMouse(() => clearTimeout(hideTimer)))
                submenu.addEventListener('pointerleave', byMouse(hide))
                btn.addEventListener('mousedown', e => e.preventDefault())
                btn.addEventListener('click', e => {
                    e.stopPropagation()
                    if (e.pointerType == 'mouse') return show()
                    if (!submenu.classList.contains('is-hidden')) { clearTimeout(hideTimer); submenu.classList.add('is-hidden'); return }
                    container.querySelectorAll(':scope > .y-dropdown__item-wrapper > .y-dropdown__submenu').forEach(s => s != submenu && s.classList.add('is-hidden'))
                    show()
                })
                wrapper.appendChild(btn)
                wrapper.appendChild(submenu)
                container.appendChild(wrapper)
            } else {
                btn.addEventListener('mousedown', e => { e.preventDefault(); this.runCtxItem(item); this.closeTextMenu() })
                container.appendChild(btn)
            }
        })
    }

    ctxIcon (item) {
        const key = item.key || CTX_ICON_KEYS[item.action] || item.action
        // Markup of the item's own wins; a Material Symbols name gives way to the icons option
        if (item.icon && item.icon.includes('<')) return item.icon
        return this.iconOr(key, item.icon ? '<span class="material-symbols-rounded">' + item.icon + '</span>' : '')
    }

    positionSubmenu (btn, sub) {
        sub.classList.remove('y-dropdown__submenu--inline')
        sub.style.top = ''; sub.style.bottom = ''; sub.style.left = ''; sub.style.right = ''
        const pad = 8
        const t = btn.getBoundingClientRect()
        const m = sub.getBoundingClientRect()
        if (t.right + m.width > window.innerWidth - pad && t.left - m.width < pad) { sub.classList.add('y-dropdown__submenu--inline'); return }
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
            const text = (this.savedRange && !this.savedRange.collapsed ? this.plainText(this.savedRange) : '') || this.plainText(null)
            if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {})
            return
        }
        if (action == 'paste') {
            if (navigator.clipboard && navigator.clipboard.readText) {
                navigator.clipboard.readText().then(text => this.insertClipboard('', text)).catch(() => {})
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

    plainText (range) {
        const frag = range ? range.cloneContents() : this.area.cloneNode(true)
        frag.querySelectorAll('img').forEach(img => { if (this.isGlyph(img)) img.replaceWith(img.getAttribute('alt') || '') })
        return frag.textContent
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
