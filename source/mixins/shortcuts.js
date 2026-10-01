import { exec, shortcutKey } from '../helpers/utils.js'

const LEVELS = ['h1', 'h2', 'h3', 'h4']

// The closing marker has just been typed; group 1 is what stands before the opening one and stays
const INLINE_MD = [
    { re: /()\*\*([^*\s](?:[^*]*[^*\s])?)\*\*$/, tag: 'strong' },
    { re: /()~~([^~\s](?:[^~]*[^~\s])?)~~$/, tag: 's' },
    // A letter before the star is a product or a name like a*b*c, not emphasis
    { re: /(^|[^*\w])\*([^*\s](?:[^*]*[^*\s])?)\*$/, tag: 'em' },
    { re: /(^|[^`])`([^`]+)`$/, tag: 'code' }
]

const MEDIA = 'img, iframe, hr, table'

function menuHas (items, action) {
    return (items || []).some(i => i.action == action || menuHas(i.children, action))
}

function isHeading (el) {
    return el != null && el.nodeType == 1 && /^H[1-4]$/.test(el.tagName)
}

function headingLevel (el) {
    return +el.tagName.charAt(1)
}

// The heading and everything under it, down to the next heading of its level or higher
function sectionOf (heading) {
    const level = headingLevel(heading)
    const out = [heading]
    let n = heading.nextElementSibling
    while (n && !(isHeading(n) && headingLevel(n) <= level)) { out.push(n); n = n.nextElementSibling }
    return out
}

function isBlank (el) {
    return el.textContent == '' && el.querySelector(MEDIA) == null
}

function caretTo (node, offset) {
    const r = document.createRange()
    r.setStart(node, offset)
    r.collapse(true)
    const sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(r)
}

export const withShortcuts = (Base) => class extends Base {
    // Levels the editor offers, from the headings option, in document order
    headingLevels () {
        const opt = this.options && Array.isArray(this.options.headings) ? this.options.headings.map(h => typeof h == 'number' ? 'h' + h : String(h).toLowerCase()) : null
        const levels = opt ? LEVELS.filter(h => opt.indexOf(h) != -1) : LEVELS
        return levels.length ? levels : LEVELS
    }

    markdownShortcut (e) {
        if (this.inline) return
        if (e.key == 'Enter') {
            if (e.shiftKey || e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return
            if (!this.markdownBlock(e, true)) this.leaveBlock(e)
            return
        }
        if (e.key == ' ' && !e.isComposing) this.markdownBlock(e, false)
    }

    markdownBlock (e, enter) {
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0 || !sel.isCollapsed) return false
        const block = this.closestBlock(sel.anchorNode)
        if (block == null || block.matches('pre, li')) return false
        const r = document.createRange()
        r.setStart(block, 0)
        r.setEnd(sel.anchorNode, sel.anchorOffset)
        const before = r.toString()
        if (before != block.textContent.trim()) return false

        let tag = null, list = null, cmd = null
        if (before == '```') cmd = 'ye-codeblock'
        else if (before == '---') cmd = 'ye-hr'
        else if (enter) return false
        else if (/^#{1,4}$/.test(before)) tag = this.headingLevels()[before.length - 1] || null
        else if (before == '>') tag = 'blockquote'
        else if (before == '-' || before == '*') list = 'insertUnorderedList'
        else if (before == '1.') list = 'insertOrderedList'
        if (tag == null && list == null && cmd == null) return false

        e.preventDefault()
        // The typed markers are a step of their own: Ctrl+Z brings them back
        this.recordState()
        r.deleteContents()
        // An empty text node is left behind: Chrome would keep it as an empty paragraph next to the new block
        if (isBlank(block)) { block.innerHTML = '<br>'; caretTo(block, 0) }
        if (tag) this.formatBlock(tag)
        else if (list) this.list(list)
        else {
            this.run(cmd)
            // A rule lands after the emptied line, which is left over
            if (cmd == 'ye-hr' && block.isConnected && isBlank(block) && block.nextElementSibling && block.nextElementSibling.tagName == 'HR') block.remove()
        }
        this.afterCmd()
        return true
    }

    // Enter on an empty last line of a code block or a quote goes on below it: Chrome keeps adding lines inside
    leaveBlock (e) {
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0 || !sel.isCollapsed) return false
        const node = sel.anchorNode
        const off = sel.anchorOffset
        const el = node.nodeType == 1 ? node : node.parentNode
        const box = el && el.closest ? el.closest('pre, blockquote') : null
        if (box == null || !this.area.contains(box)) return false

        const rest = document.createRange()
        rest.setStart(node, off)
        rest.setEnd(box, box.childNodes.length)
        const tail = rest.cloneContents()
        if (tail.textContent != '' || tail.querySelector(MEDIA)) return false

        const block = this.closestBlock(node)
        let emptied = false
        if (block && block != box && box.contains(block)) {
            // A list in a quote leaves by its own rules
            if (block.tagName == 'LI' || !isBlank(block)) return false
            block.remove()
            emptied = true
        } else if (!isBlank(box)) {
            if (!this.dropEmptyLine(box, node, off)) return false
            rest.deleteContents()
            emptied = true
        }

        e.preventDefault()
        this.recordState()
        let next
        if (!emptied || isBlank(box)) {
            next = document.createElement('p')
            next.innerHTML = '<br>'
            box.replaceWith(next)
        } else {
            next = box.nextElementSibling
            if (next == null || next.tagName != 'P' || !isBlank(next)) {
                next = document.createElement('p')
                next.innerHTML = '<br>'
                box.after(next)
            }
        }
        caretTo(next, 0)
        this.afterCmd()
        this.recordState()
        return true
    }

    // The line the caret is on is empty when a break or a newline comes right before it
    dropEmptyLine (box, node, off) {
        const head = document.createRange()
        head.setStart(box, 0)
        head.setEnd(node, off)
        const walker = document.createTreeWalker(box, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null)
        let last = null, n
        while ((n = walker.nextNode())) {
            if (!head.intersectsNode(n)) continue
            if (n.nodeType == 3) {
                const end = n == node ? off : n.nodeValue.length
                if (end > 0) last = { text: n, end: end }
            } else if (n.tagName == 'BR') last = { br: n }
        }
        if (last == null) return false
        if (last.br) { last.br.remove(); return true }
        if (last.text.nodeValue.charAt(last.end - 1) != '\n') return false
        last.text.deleteData(last.end - 1, 1)
        return true
    }

    inlineMarkdown (e) {
        if (this.inline || e.inputType != 'insertText' || !e.data) return
        const ch = e.data.slice(-1)
        if (ch != '*' && ch != '`' && ch != '~') return
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0 || !sel.isCollapsed) return
        const node = sel.anchorNode
        const at = sel.anchorOffset
        if (node == null || node.nodeType != 3 || !this.area.contains(node) || node.parentNode.closest('pre, code')) return
        const before = node.nodeValue.slice(0, at)
        INLINE_MD.some(md => {
            const m = md.re.exec(before)
            if (m == null) return false
            // The literal text first, so one Ctrl+Z turns the markers back
            this.recordState()
            const r = document.createRange()
            r.setStart(node, m.index + m[1].length)
            r.setEnd(node, at)
            r.deleteContents()
            const el = document.createElement(md.tag)
            el.textContent = m[2]
            r.insertNode(el)
            this.caretAfter(el)
            this.afterCmd()
            this.recordState()
            return true
        })
    }

    caretAfter (el) {
        let next = el.nextSibling
        if (next == null || next.nodeType != 3) {
            next = document.createTextNode('')
            el.after(next)
        }
        caretTo(next, 0)
        this.mdTail = el
    }

    // Chrome puts the letter typed right after a new tag inside it: the first one goes after it by hand
    mdBeforeInput (e) {
        const space = this.mdSpace
        this.mdSpace = null
        // With a letter after it the space shows as it is: the no-break one is not kept in the text
        if (space && space.isConnected && e.inputType == 'insertText' && e.data && e.data != ' ' && space.nodeValue.charAt(0) == ' ') {
            const s = window.getSelection()
            // By hand as well: Chrome would take a caret after a plain space back into the tag
            if (s && s.isCollapsed && s.anchorNode == space && s.anchorOffset == 1) {
                e.preventDefault()
                space.replaceData(0, 1, ' ' + e.data)
                caretTo(space, 1 + e.data.length)
                this.mdTail = null
                this.sync()
                return
            }
        }
        const el = this.mdTail
        this.mdTail = null
        if (el == null || e.defaultPrevented || e.inputType != 'insertText' || !e.data || !el.isConnected) return
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0 || !sel.isCollapsed) return
        const node = sel.anchorNode
        const off = sel.anchorOffset
        let atEnd = false
        if (el.contains(node)) {
            const rest = document.createRange()
            rest.setStart(node, off)
            rest.setEnd(el, el.childNodes.length)
            atEnd = rest.toString() == ''
        } else {
            atEnd = (node == el.nextSibling && off == 0) || (node == el.parentNode && node.childNodes[off - 1] == el)
        }
        if (!atEnd) return
        e.preventDefault()
        let next = el.nextSibling
        if (next == null || next.nodeType != 3) {
            next = document.createTextNode('')
            el.after(next)
        }
        // A plain space at the end of a line would not show until the next letter
        const text = e.data == ' ' && next.nodeValue == '' ? ' ' : e.data
        next.insertData(0, text)
        caretTo(next, text.length)
        if (text == ' ') this.mdSpace = next
        this.sync()
    }

    moveKey (e) {
        if (this.inline || !e.altKey || !e.shiftKey || e.ctrlKey || e.metaKey) return false
        if (e.key != 'ArrowUp' && e.key != 'ArrowDown') return false
        if (e.getModifierState && e.getModifierState('AltGraph')) return false
        this.moveBlock(e.key == 'ArrowUp')
        return true
    }

    // Alt+Shift+Up/Down: the block, list item or heading section swaps with its neighbour
    moveBlock (up) {
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0) return false
        const range = sel.getRangeAt(0)
        let node = range.startContainer
        if (!this.area.contains(node) || node == this.area) return false
        const el = node.nodeType == 1 ? node : node.parentNode
        const li = el.closest('li')
        let unit, target = null
        if (li && this.area.contains(li)) {
            unit = [li]
            const sib = up ? li.previousElementSibling : li.nextElementSibling
            if (sib && sib.tagName == 'LI') target = [sib]
        } else {
            while (node.parentNode != this.area) node = node.parentNode
            if (node.nodeType != 1) return false
            unit = isHeading(node) ? sectionOf(node) : [node]
            target = isHeading(node) ? this.sectionNeighbour(unit, up) : null
            if (!isHeading(node)) {
                const sib = up ? node.previousElementSibling : node.nextElementSibling
                if (sib) target = [sib]
            }
        }
        if (target == null) return false

        const sc = range.startContainer, so = range.startOffset, ec = range.endContainer, eo = range.endOffset
        this.recordState()
        const frag = document.createDocumentFragment()
        unit.forEach(n => frag.appendChild(n))
        const parent = target[0].parentNode
        parent.insertBefore(frag, up ? target[0] : target[target.length - 1].nextSibling)
        try {
            const r = document.createRange()
            r.setStart(sc, so)
            r.setEnd(ec, eo)
            this.area.focus({ preventScroll: true })
            sel.removeAllRanges()
            sel.addRange(r)
        } catch (err) {}
        if (unit[0].scrollIntoView) unit[0].scrollIntoView({ block: 'nearest' })
        this.afterCmd()
        this.recordState()
        return true
    }

    // A section passes only a section of its own level: past a higher heading it would change parent
    sectionNeighbour (unit, up) {
        const level = headingLevel(unit[0])
        if (!up) {
            const next = unit[unit.length - 1].nextElementSibling
            return next && isHeading(next) && headingLevel(next) == level ? sectionOf(next) : null
        }
        let n = unit[0].previousElementSibling
        while (n && !(isHeading(n) && headingLevel(n) <= level)) n = n.previousElementSibling
        if (n) return headingLevel(n) == level ? sectionOf(n) : null
        // Only text above it, no heading: it passes one block at a time
        return unit[0].previousElementSibling ? [unit[0].previousElementSibling] : null
    }

    shortcut (e) {
        // AltGr comes as Ctrl+Alt on Windows: it types @, # or } on some layouts, it is no shortcut
        if (e.getModifierState && e.getModifierState('AltGraph')) return false
        const k = shortcutKey(e)
        if (!e.altKey && !e.shiftKey) {
            if (k == 'z') { this.undo(); return true }
            if (k == 'y') { this.redo(); return true }
            if (k == 'k' && this.offers('ye-link', 'link')) { this.nextFormAnchor = this.anchorUnder(this.root.querySelector('.ye-toolbar__btn[data-cmd="ye-link"]')); this.insertLink(); return true }
            // In the text the editor's own find, as its button says; outside it the browser's
            if (k == 'f' && this.offers('ye-find', 'find')) { this.openFindPop(); return true }
        }
        if (e.shiftKey && !e.altKey) {
            if (k == 'z') { this.redo(); return true }
            if (k == 'x') { exec('strikeThrough'); this.afterCmd(); return true }
            if (!this.inline && e.code == 'Digit7') { this.list('insertOrderedList'); this.afterCmd(); return true }
            if (!this.inline && e.code == 'Digit8') { this.list('insertUnorderedList'); this.afterCmd(); return true }
        }
        if (!this.inline && e.altKey && !e.shiftKey) {
            // Digits go to the allowed levels in order: with h2-h4, Alt+1 is h2
            const digit = /^Digit([0-9])$/.exec(e.code || '')
            const tag = digit == null ? null : digit[1] == '0' ? 'p' : this.headingLevels()[digit[1] - 1]
            if (tag) { this.formatBlock(tag); this.afterCmd(); return true }
        }
        return false
    }

    // Ctrl+F/K stay the browser's unless the editor offers them
    offers (cmd, action) {
        return this.root.querySelector('.ye-toolbar__btn[data-cmd="' + cmd + '"]') != null || (this.contextMenuEnabled && menuHas(this.contextMenuItems, action))
    }

    list (cmd) {
        exec(cmd)
        this.liftList()
        // A list turned off leaves its lines loose in the text, split by <br>: each gets its paragraph back
        const sel = window.getSelection()
        const node = sel && sel.rangeCount ? sel.anchorNode : null
        if (node && node != this.area && this.area.contains(node) && this.closestBlock(node) == null) exec('formatBlock', '<p>')
    }

    // Chrome makes a list inside the paragraph it came from, <p><ol>…</ol></p>, which no browser keeps as is
    liftList () {
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0) return
        let list = sel.anchorNode
        while (list && list != this.area && !(list.nodeType == 1 && (list.tagName == 'OL' || list.tagName == 'UL'))) list = list.parentNode
        if (list == null || list == this.area) return
        const p = list.parentNode
        if (p == this.area || !/^(P|DIV|H[1-4])$/.test(p.tagName)) return
        const range = sel.getRangeAt(0)
        const sc = range.startContainer, so = range.startOffset, ec = range.endContainer, eo = range.endOffset
        const after = p.cloneNode(false)
        while (list.nextSibling) after.appendChild(list.nextSibling)
        p.after(list)
        list.after(after)
        if (isBlank(p)) p.remove()
        if (isBlank(after)) after.remove()
        try {
            const r = document.createRange()
            r.setStart(sc, so)
            r.setEnd(ec, eo)
            sel.removeAllRanges()
            sel.addRange(r)
        } catch (err) {}
    }

    afterCmd () { this.sync(); this.updateStates(); this.recordState() }
}
