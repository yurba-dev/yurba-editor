// Pasted HTML from Google Docs, Word and web pages carries its meaning in styles and odd markup,
// which the sanitizer would drop; this turns it into plain tags first. It works on an inert
// template: adopting the nodes into the page would load their images

const BLOCKS = { P: 1, DIV: 1, H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1, UL: 1, OL: 1, LI: 1, TABLE: 1, BLOCKQUOTE: 1, PRE: 1, HR: 1, SECTION: 1, ARTICLE: 1, HEADER: 1, FOOTER: 1, MAIN: 1, ASIDE: 1, NAV: 1, FIGURE: 1, FIGCAPTION: 1, ADDRESS: 1, CENTER: 1, DL: 1, DT: 1, DD: 1 }
// Page wrappers the sanitizer would unwrap, leaving their lines run together
const BOXES = { DIV: 1, SECTION: 1, ARTICLE: 1, HEADER: 1, FOOTER: 1, MAIN: 1, ASIDE: 1, NAV: 1, FIGURE: 1, FIGCAPTION: 1, ADDRESS: 1, CENTER: 1, DL: 1, DT: 1, DD: 1 }
const JUNK = { 'O:P': 1, COLGROUP: 1, COL: 1 }
const WORD_LIST = /mso-list:\s*(l\d+)\s+level(\d+)/i

function isBlock (node) {
    return node != null && node.nodeType == 1 && BLOCKS[node.tagName] == 1
}

function isBlank (node) {
    return node.nodeType == 8 || (node.nodeType == 3 && node.nodeValue.replace(/\u00a0/g, ' ').trim() == '')
}

function styleOf (el) {
    const out = {}
    const decls = (el.getAttribute('style') || '').split(';')
    for (let i = 0; i < decls.length; i++) {
        const idx = decls[i].indexOf(':')
        if (idx == -1) continue
        out[decls[i].slice(0, idx).trim().toLowerCase()] = decls[i].slice(idx + 1).replace(/!important/i, '').trim().toLowerCase()
    }
    return out
}

function rename (el, tag) {
    const out = el.ownerDocument.createElement(tag)
    if (el.getAttribute('style')) out.setAttribute('style', el.getAttribute('style'))
    while (el.firstChild) out.appendChild(el.firstChild)
    el.parentNode.replaceChild(out, el)
    return out
}

function unwrap (el) {
    const parent = el.parentNode
    while (el.firstChild) parent.insertBefore(el.firstChild, el)
    parent.removeChild(el)
}

function wrapInner (el, tag) {
    const w = el.ownerDocument.createElement(tag)
    while (el.firstChild) w.appendChild(el.firstChild)
    el.appendChild(w)
}

function rgbOf (value) {
    if (value == 'black' || value == 'windowtext') return [0, 0, 0]
    if (value == 'white' || value == 'window') return [255, 255, 255]
    let m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/.exec(value)
    if (m) {
        const hex = m[1].length == 3 ? m[1].split('').map(function double (c) { return c + c }).join('') : m[1]
        return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)]
    }
    m = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/.exec(value)
    if (m) return m[4] != null && parseFloat(m[4]) == 0 ? null : [+m[1], +m[2], +m[3]]
    return null
}

function isNeutral (rgb) {
    return Math.max(rgb[0], rgb[1], rgb[2]) - Math.min(rgb[0], rgb[1], rgb[2]) <= 24
}

// Docs and copied pages stamp every run with the source's own dark ink and white paper,
// which would stay black text on the dark theme
function isPlainInk (value) {
    const rgb = rgbOf(value)
    return rgb != null && isNeutral(rgb) && Math.max(rgb[0], rgb[1], rgb[2]) <= 90
}

function isPlainPaper (value) {
    if (value == 'transparent' || value == 'none' || value == 'initial' || value == 'inherit') return true
    const rgb = rgbOf(value)
    return rgb == null ? /^rgba?\(/.test(value) : isNeutral(rgb) && Math.min(rgb[0], rgb[1], rgb[2]) >= 235
}

function isBoldWeight (w) {
    return w == 'bold' || w == 'bolder' || /^[6-9]00$/.test(w || '')
}

function fixSpan (span) {
    const st = styleOf(span)
    const deco = (st['text-decoration'] || '') + ' ' + (st['text-decoration-line'] || '')
    const valign = st['vertical-align'] || ''
    if (valign == 'super' || valign == 'sub') wrapInner(span, valign == 'super' ? 'sup' : 'sub')
    if (deco.indexOf('line-through') != -1) wrapInner(span, 's')
    if (deco.indexOf('underline') != -1 && span.closest('a') == null) wrapInner(span, 'u')
    if (st['font-style'] == 'italic' || st['font-style'] == 'oblique') wrapInner(span, 'em')
    if (isBoldWeight(st['font-weight']) && span.closest('h1,h2,h3,h4,h5,h6') == null) wrapInner(span, 'strong')

    const kept = []
    // Links take the theme's link color, not the source app's blue
    if (st.color && !isPlainInk(st.color) && span.closest('a') == null) kept.push('color: ' + st.color)
    if (st['background-color'] && !isPlainPaper(st['background-color'])) kept.push('background-color: ' + st['background-color'])
    if (kept.length) span.setAttribute('style', kept.join('; ')); else span.removeAttribute('style')
    span.removeAttribute('lang')
    span.removeAttribute('dir')
    if (span.attributes.length == 0) unwrap(span)
}

function fontToSpan (font) {
    const color = font.getAttribute('color')
    const span = rename(font, 'span')
    if (color && /^#?[0-9a-z]{3,20}$/i.test(color)) span.setAttribute('style', 'color: ' + color + ';' + (span.getAttribute('style') || ''))
    return span
}

function isEmptyBlock (el) {
    return el.textContent.replace(/\u00a0/g, ' ').trim() == '' && el.querySelector('img, br, iframe, hr, table') == null
}

// Groups the loose inline lines of a wrapper into paragraphs, so they keep their breaks once it goes
function wrapRuns (box) {
    const doc = box.ownerDocument
    let run = []
    function flush () {
        const meaningful = run.filter(function kept (n) { return !isBlank(n) })
        if (meaningful.length) {
            const p = doc.createElement('p')
            box.insertBefore(p, run[0])
            run.forEach(function move (n) { p.appendChild(n) })
            while (p.lastChild && (isBlank(p.lastChild) || p.lastChild.nodeName == 'BR') && p.childNodes.length > 1) p.removeChild(p.lastChild)
        } else {
            run.forEach(function drop (n) { box.removeChild(n) })
        }
        run = []
    }
    const nodes = Array.prototype.slice.call(box.childNodes)
    for (let i = 0; i < nodes.length; i++) {
        if (isBlock(nodes[i])) flush(); else run.push(nodes[i])
    }
    flush()
}

function fixBox (box) {
    const children = box.children
    let hasBlock = false
    for (let i = 0; i < children.length; i++) if (isBlock(children[i])) { hasBlock = true; break }
    if (hasBlock) { wrapRuns(box); unwrap(box); return }
    const st = styleOf(box)
    const align = st['text-align'] || (box.getAttribute('align') || '').toLowerCase() || (box.tagName == 'CENTER' ? 'center' : '')
    const p = rename(box, 'p')
    p.removeAttribute('style')
    if (align) p.setAttribute('style', 'text-align: ' + align)
    if (isEmptyBlock(p)) p.innerHTML = '<br>'
}

// Docs nests a sublist straight in the list, not in its item
function fixList (list) {
    const nodes = Array.prototype.slice.call(list.children)
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].tagName != 'UL' && nodes[i].tagName != 'OL') continue
        let li = nodes[i].previousElementSibling
        if (li == null || li.tagName != 'LI') {
            li = list.ownerDocument.createElement('li')
            list.insertBefore(li, nodes[i])
        }
        li.appendChild(nodes[i])
    }
}

// Docs and Word put one paragraph in every item and cell; its margins would space them apart
function unwrapLonePara (el) {
    const kids = el.children
    if (kids.length == 0 || kids[0].tagName != 'P') return
    let paras = 0
    for (let i = 0; i < kids.length; i++) if (kids[i].tagName == 'P') paras++
    if (paras == 1) unwrap(kids[0])
}

function fixElement (el) {
    const tag = el.tagName
    const st = el.hasAttribute('style') ? styleOf(el) : {}
    if ((tag == 'B' || tag == 'STRONG') && st['font-weight'] && !isBoldWeight(st['font-weight'])) { unwrap(el); return }
    if ((tag == 'I' || tag == 'EM') && st['font-style'] == 'normal') { unwrap(el); return }
    if (tag == 'BR' && el.classList.contains('Apple-interchange-newline')) { el.parentNode.removeChild(el); return }
    if (tag == 'A' && !el.hasAttribute('href')) { unwrap(el); return }
    if (tag == 'H5' || tag == 'H6') { rename(el, 'h4'); return }
    if (tag == 'FONT') { fixSpan(fontToSpan(el)); return }
    if (tag == 'SPAN') { fixSpan(el); return }
    // A captioned picture (copied in the editor itself) stays one: the figure keeps its size and float
    if (tag == 'FIGURE' && el.querySelector(':scope > img')) return
    if (tag == 'FIGCAPTION' && el.parentNode && el.parentNode.nodeName == 'FIGURE' && el.parentNode.querySelector(':scope > img')) return
    if (BOXES[tag] == 1) { fixBox(el); return }
    if (tag == 'UL' || tag == 'OL') { fixList(el); return }
    if (tag == 'LI' || tag == 'TD' || tag == 'TH') { unwrapLonePara(el); return }
    // A fixed source width would overflow a phone; a share of the column still fits
    if (tag == 'TABLE') {
        el.removeAttribute('width')
        if (st.width && !/%$/.test(st.width)) el.style.removeProperty('width')
    }
    if (tag == 'P' && isEmptyBlock(el)) el.innerHTML = '<br>'
}

function tidyText (node) {
    // Word wraps its source lines and pads with runs of &nbsp;; outside <pre> both only read as one space
    const v = node.nodeValue.replace(/[\t\r\n]+/g, ' ').replace(/[ \u00a0]{2,}/g, ' ')
    if (v != node.nodeValue) node.nodeValue = v
    if (v.trim() == '' && (isBlock(node.previousSibling) || isBlock(node.nextSibling))) node.parentNode.removeChild(node)
}

function walk (parent, inPre) {
    const nodes = Array.prototype.slice.call(parent.childNodes)
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.nodeType == 8) { parent.removeChild(node); continue }
        if (node.nodeType == 3) { if (!inPre) tidyText(node); continue }
        if (node.nodeType != 1) continue
        if (JUNK[node.tagName] == 1) { parent.removeChild(node); continue }
        walk(node, inPre || node.tagName == 'PRE')
        fixElement(node)
    }
}

function wordListInfo (el) {
    if (el.nodeType != 1 || el.tagName != 'P') return null
    const m = WORD_LIST.exec(el.getAttribute('style') || '')
    return m ? { p: el, id: m[1], level: parseInt(m[2], 10) } : null
}

// Word writes the bullet or number as text, fenced by [if !supportLists] comments or in an mso-list:Ignore span
function takeMarker (p) {
    let text = ''
    const walker = p.ownerDocument.createTreeWalker(p, NodeFilter.SHOW_COMMENT, null)
    let start = walker.nextNode()
    while (start && !/^\[if !supportLists\]$/i.test(start.nodeValue.trim())) start = walker.nextNode()
    if (start) {
        let n = start.nextSibling
        while (n && !(n.nodeType == 8 && /^\[endif\]$/i.test(n.nodeValue.trim()))) {
            const next = n.nextSibling
            text += n.textContent
            n.parentNode.removeChild(n)
            n = next
        }
    } else {
        const spans = p.getElementsByTagName('span')
        for (let i = 0; i < spans.length; i++) {
            if (!/mso-list:\s*ignore/i.test(spans[i].getAttribute('style') || '')) continue
            text = spans[i].textContent
            spans[i].parentNode.removeChild(spans[i])
            break
        }
    }
    return text.replace(/\u00a0/g, ' ').trim()
}

function buildWordList (items) {
    const doc = items[0].p.ownerDocument
    const stack = []
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const ordered = /^\(?(\d+|[a-z]{1,5})[.)]/i.test(takeMarker(item.p))
        while (stack.length && stack[stack.length - 1].level > item.level) stack.pop()
        if (stack.length && stack[stack.length - 1].level == item.level && stack[stack.length - 1].ordered != ordered) stack.pop()
        if (stack.length == 0 || stack[stack.length - 1].level < item.level) {
            const list = doc.createElement(ordered ? 'ol' : 'ul')
            if (stack.length) {
                const host = stack[stack.length - 1].list
                let li = host.lastElementChild
                if (li == null) { li = doc.createElement('li'); host.appendChild(li) }
                li.appendChild(list)
            } else {
                item.p.parentNode.insertBefore(list, item.p)
            }
            stack.push({ list: list, level: item.level, ordered: ordered })
        }
        const li = doc.createElement('li')
        while (item.p.firstChild) li.appendChild(item.p.firstChild)
        stack[stack.length - 1].list.appendChild(li)
        item.p.parentNode.removeChild(item.p)
    }
}

function fixWordLists (root) {
    const paras = Array.prototype.slice.call(root.querySelectorAll('p[style]'))
    const done = []
    for (let i = 0; i < paras.length; i++) {
        const first = wordListInfo(paras[i])
        if (first == null || done.indexOf(paras[i]) != -1) continue
        const items = [first]
        let n = paras[i].nextSibling
        while (n) {
            if (isBlank(n)) { n = n.nextSibling; continue }
            const info = wordListInfo(n)
            if (info == null || info.id != first.id) break
            items.push(info)
            done.push(n)
            n = n.nextSibling
        }
        buildWordList(items)
    }
}

// Docs spaces its paragraphs with bare <br>s between them
function fixLooseBreaks (root) {
    const nodes = Array.prototype.slice.call(root.childNodes)
    for (let i = 0; i < nodes.length; i++) {
        const br = nodes[i]
        if (br.nodeName != 'BR') continue
        let prev = br.previousSibling, next = br.nextSibling
        while (prev && isBlank(prev)) prev = prev.previousSibling
        while (next && isBlank(next)) next = next.nextSibling
        if (!isBlock(prev) && !isBlock(next)) continue
        if (next == null) { root.removeChild(br); continue }
        const p = root.ownerDocument.createElement('p')
        p.appendChild(root.ownerDocument.createElement('br'))
        root.replaceChild(p, br)
    }
}

export function normalizePaste (html) {
    const tpl = document.createElement('template')
    tpl.innerHTML = html || ''
    fixWordLists(tpl.content)
    walk(tpl.content, false)
    fixLooseBreaks(tpl.content)
    return tpl.innerHTML
}

// A lone web address, as text or as a bare link to itself
export function pastedUrl (html, text) {
    const url = (text || '').trim()
    if (!/^https?:\/\/[^\s<>"]+$/i.test(url)) return null
    if (!html) return url
    const tpl = document.createElement('template')
    tpl.innerHTML = html
    if (tpl.content.querySelector('img, iframe, table') != null) return null
    return tpl.content.textContent.trim() == url ? url : null
}
