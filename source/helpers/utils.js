export function escapeHtml (s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export function exec (cmd, arg) {
    try { document.execCommand(cmd, false, arg == null ? null : arg) } catch (e) {}
}

export function ancestorTag (node, tagName) {
    while (node && node.nodeType != null) {
        if (node.nodeType == 1 && node.tagName == tagName) return node
        node = node.parentNode
    }
    return null
}

export function normalizeHex (v) {
    v = (v || '').trim()
    if (v == '') return null
    if (v[0] != '#') v = '#' + v
    return /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v) ? v : null
}

export function embedFromUrl (url) {
    const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/i)
    if (yt) return 'https://www.youtube.com/embed/' + yt[1]
    const vm = url.match(/vimeo\.com\/(?:video\/)?(\d{5,})/i)
    if (vm) return 'https://player.vimeo.com/video/' + vm[1]
    return null
}

export function imageFilesFrom (dt) {
    const out = []
    const files = dt && dt.files ? dt.files : null
    if (files) for (let i = 0; i < files.length; i++) if (/^image\//.test(files[i].type)) out.push(files[i])
    return out
}

export function dtHasFiles (dt) {
    return dt && dt.types && Array.prototype.indexOf.call(dt.types, 'Files') != -1
}

const PAIR = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g

// Code points, as the server counts (mb_strlen)
export function cpLen (s) {
    s = s || ''
    const pairs = s.match(PAIR)
    return s.length - (pairs ? pairs.length : 0)
}

function isHigh (c) { return c >= 0xD800 && c <= 0xDBFF }
function isLow (c) { return c >= 0xDC00 && c <= 0xDFFF }

export function cpForward (s, from, n) {
    let i = from
    while (n > 0 && i < s.length) { i += isHigh(s.charCodeAt(i)) && isLow(s.charCodeAt(i + 1)) ? 2 : 1; n-- }
    return i
}

export function cpBack (s, from, n) {
    let i = from
    while (n > 0 && i > 0) { i -= i > 1 && isLow(s.charCodeAt(i - 1)) && isHigh(s.charCodeAt(i - 2)) ? 2 : 1; n-- }
    return i
}

export function isGlyphEl (el, glyphClass) {
    return !!glyphClass && el.tagName == 'IMG' && el.classList.contains(glyphClass)
}

export function clipHtml (html, max, glyphClass) {
    const tpl = document.createElement('template')
    tpl.innerHTML = html || ''
    const walker = document.createTreeWalker(tpl.content, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null)
    const drop = []
    let left = max, n
    while ((n = walker.nextNode())) {
        if (n.nodeType == 3) {
            if (left <= 0) { drop.push(n); continue }
            const len = cpLen(n.nodeValue)
            if (len > left) n.nodeValue = n.nodeValue.slice(0, cpForward(n.nodeValue, 0, left))
            left -= Math.min(len, left)
        } else if (isGlyphEl(n, glyphClass)) {
            const len = cpLen(n.getAttribute('alt') || '')
            if (len > left) drop.push(n); else left -= len
        }
    }
    drop.forEach(d => d.remove())
    return tpl.innerHTML
}

export function escapeRegExp (s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function rangeFromPoint (x, y) {
    if (document.caretRangeFromPoint) return document.caretRangeFromPoint(x, y)
    if (document.caretPositionFromPoint) {
        const p = document.caretPositionFromPoint(x, y)
        if (p == null) return null
        const r = document.createRange()
        r.setStart(p.offsetNode, p.offset)
        r.collapse(true)
        return r
    }
    return null
}
