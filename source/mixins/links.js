import { escapeHtml, exec } from '../helpers/utils.js'

// "[[" and what follows it up to the caret, while it is still an unfinished title
const WIKI_OPEN = /\[\[([^[\]|\n]{0,100})$/

// { href, sure }: a scheme or www. is sure to be an address, a bare domain may as well be a title like Node.js
function urlOf (text) {
    if (/\s/.test(text) || text == '') return null
    if (/^(https?:\/\/|mailto:|tel:)/i.test(text)) return { href: text, sure: true }
    if (/^www\./i.test(text)) return { href: 'https://' + text, sure: true }
    if (/^[^/@:]+\.[a-z]{2,}(\/\S*)?$/i.test(text)) return { href: 'https://' + text, sure: false }
    return null
}

// "Ctrl+Shift+K": Ctrl stands for Cmd on a Mac; letters and digits go by the key's place, so other layouts match too
function matchesShortcut (e, spec) {
    const parts = String(spec).toLowerCase().split('+').map(p => p.trim())
    const key = parts[parts.length - 1]
    const mod = parts.indexOf('ctrl') != -1 || parts.indexOf('cmd') != -1 || parts.indexOf('mod') != -1
    if (mod != (e.ctrlKey || e.metaKey)) return false
    if ((parts.indexOf('shift') != -1) != e.shiftKey || (parts.indexOf('alt') != -1) != e.altKey) return false
    if (/^[a-z]$/.test(key)) return e.code == 'Key' + key.toUpperCase()
    if (/^[0-9]$/.test(key)) return e.code == 'Digit' + key
    return (e.key || '').toLowerCase() == key
}

export const withLinks = (Base) => class extends Base {
    // { search(q) -> Promise<[{ title, hint }]>, insert(item, selectedText) -> text }
    get linkProvider () {
        const p = this.options && this.options.linkProvider
        return p && typeof p.search == 'function' ? p : null
    }

    wire () {
        super.wire()
        if (this.toolbar) {
            this.toolbar.addEventListener('click', e => {
                const btn = e.target.closest('[data-ye-extra]')
                if (btn == null) return
                const b = this.extraButtons().find(x => x.key == btn.dataset.yeExtra)
                if (b) { this.saveRange(); b.onClick(this, btn, e) }
            })
        }
        if (this.linkProvider == null) return
        const area = this.area
        area.addEventListener('input', () => this.checkWikiOpen())
        // Capture: Enter and Escape are the list's before the editor turns them into a paragraph or a closed full screen
        area.addEventListener('keydown', e => this.suggestKey(e), true)
        area.addEventListener('keyup', e => { if (this.suggestPop && /^(Arrow(Left|Right)|Home|End)$/.test(e.key)) this.checkWikiOpen() })
        area.addEventListener('mouseup', () => { if (this.suggestPop) this.checkWikiOpen() })
        area.addEventListener('blur', () => this.closeSuggest())
    }

    // Detaching or destroying the editor releases its page listeners: the suggestions go with them
    listenGlobal (on) {
        super.listenGlobal(on)
        if (!on) this.closeSuggest()
    }

    shortcut (e) {
        const b = this.extraButtons().find(x => x.shortcut && matchesShortcut(e, x.shortcut))
        if (b == null) return super.shortcut(e)
        this.saveRange()
        b.onClick(this, this.toolbar ? this.toolbar.querySelector('[data-ye-extra="' + CSS.escape(b.key) + '"]') : null, e)
        return true
    }

    // Text, or a function given the text before the caret in its block that returns it
    insertText (text) {
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0 || !this.area.contains(sel.getRangeAt(0).commonAncestorContainer)) this.restoreRange()
        else if (document.activeElement != this.area) this.area.focus({ preventScroll: true })
        if (typeof text == 'function') text = text(this.textBeforeCaret())
        if (!text) return this
        this.flushHistory()
        exec('insertText', text)
        this.sync()
        this.recordState()
        return this
    }

    textBeforeCaret () {
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0 || !this.area.contains(sel.getRangeAt(0).startContainer)) return ''
        const r = sel.getRangeAt(0)
        const before = document.createRange()
        before.setStart(this.closestBlock(r.startContainer) || this.area, 0)
        before.setEnd(r.startContainer, r.startOffset)
        return before.toString()
    }

    caretRect () {
        const sel = window.getSelection()
        if (sel && sel.rangeCount && this.area.contains(sel.getRangeAt(0).startContainer)) {
            const rects = sel.getRangeAt(0).getClientRects()
            if (rects.length) return rects[rects.length - 1]
            const node = sel.getRangeAt(0).startContainer
            const el = node.nodeType == 1 ? node : node.parentElement
            if (el) return el.getBoundingClientRect()
        }
        return this.area.getBoundingClientRect()
    }

    linkText (item, selected) {
        const p = this.linkProvider
        const label = (selected || '').replace(/[[\]|]/g, '').replace(/\s+/g, ' ').trim()
        if (typeof p.insert == 'function') {
            const out = p.insert(item, label)
            return typeof out == 'string' ? out : null
        }
        return '[[' + item.title + (label && label != item.title ? '|' + label : '') + ']]'
    }

    pickItem (item) {
        const b = document.createElement('button')
        b.type = 'button'
        b.className = 'ye-picklist__item' + (item.kind == 'remove' ? ' ye-picklist__item--danger' : '')
        b.setAttribute('role', 'option')
        const icon = item.kind == 'url' ? this.renderIcon('link') : item.kind == 'remove' ? this.renderIcon('remove') : this.iconOr('article', '<span class="material-symbols-rounded ye-ico">article</span>')
        const title = item.kind == 'url' ? item.url : item.kind == 'remove' ? this.t('Remove link') : item.title
        const hint = item.kind == 'url' ? this.t('Web link') : item.kind == 'remove' ? '' : item.hint
        b.innerHTML = '<span class="ye-picklist__icon">' + icon + '</span><span class="ye-picklist__text"><span class="ye-picklist__title">' + escapeHtml(title || '') + '</span>' +
            (hint ? '<span class="ye-picklist__hint">' + escapeHtml(hint) + '</span>' : '') + '</span>'
        return b
    }

    fillPicklist (list, items, active, empty) {
        list.innerHTML = ''
        if (items.length == 0) {
            if (empty) list.innerHTML = '<div class="ye-picklist__empty">' + escapeHtml(empty) + '</div>'
            return
        }
        items.forEach((item, i) => {
            const b = this.pickItem(item)
            b.dataset.index = i
            if (i == active) { b.classList.add('is-active'); b.setAttribute('aria-selected', 'true') }
            list.appendChild(b)
        })
        const current = list.children[active]
        if (current && current.scrollIntoView) current.scrollIntoView({ block: 'nearest' })
    }

    fillForm (pop, opts) {
        pop.classList.toggle('ye-linkpop', !!opts.render)
        return opts.render ? opts.render(pop) : super.fillForm(pop, opts)
    }

    // One dialog for both: a title finds articles through the provider, an address makes a web link
    insertLink () {
        const provider = this.linkProvider
        if (provider == null) return super.insertLink()
        const sel = window.getSelection()
        const selected = sel && sel.rangeCount && this.area.contains(sel.getRangeAt(0).commonAncestorContainer) ? sel.toString() : ''
        const anchor = this.currentAnchor()
        this.promptPop({ render: pop => this.fillLinkPop(pop, provider, anchor, selected) })
    }

    fillLinkPop (pop, provider, anchor, selected) {
        const editor = this
        pop.innerHTML = ''
        const input = document.createElement('input')
        input.type = 'text'
        input.className = 'ye-formpop__input'
        input.placeholder = this.t('Find an article or paste a link')
        input.setAttribute('aria-label', input.placeholder)
        input.value = anchor ? (anchor.getAttribute('href') || '') : selected.replace(/\s+/g, ' ').trim().slice(0, 100)
        const list = document.createElement('div')
        list.className = 'ye-picklist'
        list.setAttribute('role', 'listbox')
        const err = document.createElement('div')
        err.className = 'ye-formpop__err'
        const row = document.createElement('div')
        row.className = 'ye-formpop__row'
        const cancel = document.createElement('button')
        cancel.type = 'button'
        cancel.className = 'ye-formpop__btn'
        cancel.textContent = this.t('Cancel')
        const ok = document.createElement('button')
        ok.type = 'button'
        ok.className = 'ye-formpop__btn ye-formpop__btn--ok'
        ok.textContent = this.t('OK')
        row.append(cancel, ok)
        pop.append(input, list, err, row)

        let items = []
        let found = []
        let active = 0
        let seq = 0
        let timer = null

        function compose () {
            const q = input.value.trim()
            const url = urlOf(q)
            const out = []
            if (url && url.sure) out.push({ kind: 'url', url: url.href })
            found.forEach(f => out.push(f))
            if (url && !url.sure) out.push({ kind: 'url', url: url.href })
            if (anchor) out.push({ kind: 'remove' })
            items = out
            if (active >= items.length) active = 0
            editor.fillPicklist(list, items, active, q == '' ? editor.t('Type a title or paste a link') : '')
        }

        function search () {
            const q = input.value.trim()
            const n = ++seq
            clearTimeout(timer)
            found = []
            active = 0
            compose()
            if (q == '' || (urlOf(q) && urlOf(q).sure)) return
            timer = setTimeout(() => {
                Promise.resolve(provider.search(q)).then(res => {
                    if (n != seq) return
                    found = (Array.isArray(res) ? res : []).filter(r => r && r.title).map(r => ({ kind: 'article', title: r.title, hint: r.hint || '' }))
                    compose()
                    if (items.length == 0) editor.fillPicklist(list, items, 0, editor.t('Nothing found'))
                }).catch(() => {})
            }, 200)
        }

        function pick (item) {
            if (item == null) return
            clearTimeout(timer)
            seq++
            editor.restoreRange()
            let msg = null
            if (item.kind == 'url') {
                // A new link opens in a new tab, as the plain dialog does; an edited one keeps what it had
                const attrs = anchor || editor.options.linkFields === false ? null : { title: '', newTab: true }
                msg = editor.applyLink(item.url, anchor, selected, attrs)
            } else if (item.kind == 'remove') {
                editor.applyLink('', anchor, selected, null)
            } else {
                const text = editor.linkText(item, anchor ? anchor.textContent : selected)
                if (text != null) {
                    if (anchor) {
                        const r = document.createRange()
                        r.selectNode(anchor)
                        const s = window.getSelection()
                        s.removeAllRanges()
                        s.addRange(r)
                    }
                    exec('insertText', text)
                    editor.sync()
                }
            }
            if (msg) {
                err.textContent = msg
                err.classList.add('is-shown')
                input.focus()
                return
            }
            editor.hideFormPop()
        }

        function move (step) {
            if (items.length == 0) return
            active = (active + step + items.length) % items.length
            editor.fillPicklist(list, items, active, '')
        }

        input.addEventListener('input', () => {
            err.classList.remove('is-shown')
            search()
        })
        input.addEventListener('keydown', e => {
            if (e.key == 'ArrowDown') { e.preventDefault(); move(1) }
            else if (e.key == 'ArrowUp') { e.preventDefault(); move(-1) }
            else if (e.key == 'Enter') { e.preventDefault(); pick(items[active]) }
            else if (e.key == 'Escape') { e.preventDefault(); this.hideFormPop() }
        })
        // The input keeps focus, so typing goes on after a look at the list
        list.addEventListener('mousedown', e => e.preventDefault())
        list.addEventListener('click', e => {
            const b = e.target.closest('.ye-picklist__item')
            if (b) pick(items[+b.dataset.index])
        })
        ok.addEventListener('mousedown', e => { e.preventDefault(); pick(items[active]) })
        cancel.addEventListener('mousedown', e => { e.preventDefault(); this.hideFormPop() })
        ok.addEventListener('click', e => { if (e.detail == 0) pick(items[active]) })
        cancel.addEventListener('click', e => { if (e.detail == 0) this.hideFormPop() })
        search()
        return input
    }

    // [[ suggestions

    wikiTrigger () {
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0 || !sel.isCollapsed) return null
        const node = sel.anchorNode
        if (node == null || node.nodeType != 3 || !this.area.contains(node)) return null
        if (node.parentElement && node.parentElement.closest('a, code, pre')) return null
        const m = node.nodeValue.slice(0, sel.anchorOffset).match(WIKI_OPEN)
        if (m == null) return null
        return { node, start: sel.anchorOffset - m[0].length, end: sel.anchorOffset, query: m[1] }
    }

    checkWikiOpen () {
        if (this.composing) return
        const at = this.wikiTrigger()
        if (at == null) { this.suggestDismissed = null; return this.closeSuggest() }
        // Escape holds for this [[ until another one is typed
        const gone = this.suggestDismissed
        if (gone && gone.node == at.node && gone.start == at.start) return this.closeSuggest()
        const q = at.query.trim()
        const same = this.suggestAt && this.suggestAt.query.trim() == q && this.suggestPop
        this.suggestAt = at
        if (this.suggestPop == null) {
            this.suggestPop = this.makePopup('ye-suggest')
            this.suggestList = document.createElement('div')
            this.suggestList.className = 'ye-picklist'
            this.suggestList.setAttribute('role', 'listbox')
            this.suggestPop.appendChild(this.suggestList)
            this.suggestList.addEventListener('mousedown', e => e.preventDefault())
            this.suggestList.addEventListener('click', e => {
                const b = e.target.closest('.ye-picklist__item')
                if (b && this.suggestItems) this.completeWiki(this.suggestItems[+b.dataset.index])
            })
            this.suggestScroll = () => this.placeSuggest()
            window.addEventListener('scroll', this.suggestScroll, true)
            this.suggestItems = []
            this.fillPicklist(this.suggestList, [], 0, this.t('Type an article title'))
            this.placeSuggest()
            this.revealPopup(this.suggestPop)
        } else {
            this.placeSuggest()
        }
        if (same) return
        clearTimeout(this.suggestTimer)
        const n = this.suggestSeq = (this.suggestSeq || 0) + 1
        if (q == '') {
            this.suggestItems = []
            this.fillPicklist(this.suggestList, [], 0, this.t('Type an article title'))
            this.placeSuggest()
            return
        }
        this.suggestTimer = setTimeout(() => {
            Promise.resolve(this.linkProvider.search(q)).then(res => {
                if (n != this.suggestSeq || this.suggestPop == null) return
                this.suggestItems = (Array.isArray(res) ? res : []).filter(r => r && r.title).map(r => ({ kind: 'article', title: r.title, hint: r.hint || '' }))
                this.suggestIndex = 0
                this.fillPicklist(this.suggestList, this.suggestItems, 0, this.t('Nothing found'))
                this.placeSuggest()
            }).catch(() => {})
        }, 200)
    }

    placeSuggest () {
        const pop = this.suggestPop
        const at = this.suggestAt
        if (pop == null || at == null || !at.node.isConnected) return
        const r = document.createRange()
        r.setStart(at.node, at.start)
        r.setEnd(at.node, Math.min(at.start + 2, at.node.nodeValue.length))
        const rect = r.getBoundingClientRect()
        const pad = 8
        const w = pop.offsetWidth
        const h = pop.offsetHeight
        let left = rect.left
        let top = rect.bottom + 4
        if (left + w > window.innerWidth - pad) left = window.innerWidth - w - pad
        if (left < pad) left = pad
        // No room below the line: the list goes above it rather than over the text
        if (top + h > window.innerHeight - pad && rect.top - 4 - h >= pad) top = rect.top - 4 - h
        pop.style.left = left + 'px'
        pop.style.top = top + 'px'
    }

    suggestKey (e) {
        if (this.suggestPop == null || e.isComposing) return
        if (e.key == 'Escape') {
            e.preventDefault()
            e.stopImmediatePropagation()
            if (this.suggestAt) this.suggestDismissed = { node: this.suggestAt.node, start: this.suggestAt.start }
            this.closeSuggest()
            return
        }
        const items = this.suggestItems || []
        if (items.length == 0) return
        if (e.key == 'ArrowDown' || e.key == 'ArrowUp') {
            e.preventDefault()
            this.suggestIndex = ((this.suggestIndex || 0) + (e.key == 'ArrowDown' ? 1 : -1) + items.length) % items.length
            this.fillPicklist(this.suggestList, items, this.suggestIndex, '')
        } else if (e.key == 'Enter' || e.key == 'Tab') {
            e.preventDefault()
            e.stopImmediatePropagation()
            this.completeWiki(items[this.suggestIndex || 0])
        }
    }

    completeWiki (item) {
        const at = this.suggestAt
        this.closeSuggest()
        if (item == null || at == null || !at.node.isConnected) return
        const text = this.linkText(item, '')
        if (text == null) return
        // The closing brackets typed already are part of what the title replaces
        const tail = at.node.nodeValue.slice(at.end).startsWith(']]') ? 2 : 0
        const r = document.createRange()
        r.setStart(at.node, at.start)
        r.setEnd(at.node, at.end + tail)
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(r)
        // The completed link is a step of its own: Ctrl+Z goes back to what was typed
        this.flushHistory()
        exec('insertText', text)
        this.sync()
        this.recordState()
    }

    closeSuggest () {
        clearTimeout(this.suggestTimer)
        this.suggestSeq = (this.suggestSeq || 0) + 1
        this.suggestItems = null
        this.suggestAt = null
        this.suggestIndex = 0
        const pop = this.suggestPop
        if (pop == null) return
        this.suggestPop = null
        this.suggestList = null
        window.removeEventListener('scroll', this.suggestScroll, true)
        this.dismissPopup(pop)
    }
}
