import { ALLOWED, ATTRS, CLASS_ALLOWED, DROP, IFRAME_ALLOW, STYLE_PROPS } from './constants.js'

const XHTML = 'http://www.w3.org/1999/xhtml'
const URL_ATTRS = ['href', 'src', 'xlink:href', 'action', 'formaction', 'poster', 'background', 'cite', 'longdesc', 'lowsrc', 'dynsrc', 'data', 'codebase', 'manifest']
const DROP_ATTRS = ['srcdoc', 'srcset', 'imagesrcset', 'ping', 'popover', 'popovertarget', 'popovertargetaction']
// Loose mode: no script, remote loads, overlays or escapes
const UNSAFE_STYLE = /expression\(|javascript:|-moz-binding|@import|behaviou?r\s*:|url\(|image-set\(|image\(|cross-fade\(|\\|\/\*|position\s*:\s*(fixed|sticky|absolute)/i

export function isSafeUrl (url) {
    url = (url || '').trim()
    if (url == '' || /^\s*javascript:/i.test(url)) return false
    return /^(https?:|mailto:|tel:|\/|#)/i.test(url) || url.indexOf(':') == -1
}

export function isSafeEmbed (url, hosts) {
    try {
        const u = new URL(url, window.location.href)
        return u.protocol == 'https:' && hosts.indexOf(u.hostname.toLowerCase()) != -1
    } catch (e) { return false }
}

export function safeStyleValue (prop, value) {
    if (/url\(|expression|\/\*/i.test(value)) return false
    if (prop == 'text-align') return ['left', 'right', 'center', 'justify'].indexOf(value) != -1
    if (prop == 'float') return ['left', 'right', 'none'].indexOf(value) != -1
    if (prop == 'margin-left') return /^\d{1,3}px$/.test(value)
    if (prop == 'width' || prop == 'height') return /^\d{1,4}(px|%)?$/.test(value)
    if (prop == 'color' || prop == 'background-color') return /^(#[0-9a-f]{3,8}|rgba?\([\d.,\s]+\)|[a-z]{3,20})$/i.test(value)
    return false
}

export function filterStyle (style, allowed) {
    const out = []
    const decls = (style || '').split(';')
    for (let i = 0; i < decls.length; i++) {
        const idx = decls[i].indexOf(':')
        if (idx == -1) continue
        const prop = decls[i].slice(0, idx).trim().toLowerCase()
        const value = decls[i].slice(idx + 1).trim()
        if (allowed.indexOf(prop) != -1 && safeStyleValue(prop, value)) out.push(prop + ': ' + value)
    }
    return out.join('; ')
}

export function cleanAttrs (el, hosts, strict, opts) {
    opts = opts || {}
    const tag = el.tagName.toLowerCase()
    const allowed = ATTRS[tag] || []
    const styleAllowed = STYLE_PROPS[tag] || []
    const attrs = Array.prototype.slice.call(el.attributes)

    for (let i = 0; i < attrs.length; i++) {
        const name = attrs[i].name.toLowerCase()
        const value = attrs[i].value

        if (name.indexOf('on') == 0) { el.removeAttribute(attrs[i].name); continue }
        if (name == 'style' && opts.stripStyle) { el.removeAttribute('style'); continue }
        if (DROP_ATTRS.indexOf(name) != -1) { el.removeAttribute(attrs[i].name); continue }
        if (URL_ATTRS.indexOf(name) != -1 && !isSafeUrl(value)) { el.removeAttribute(attrs[i].name); continue }
        if (name == 'allow') {
            const kept = value.split(';').map(v => v.trim()).filter(v => IFRAME_ALLOW.indexOf(v.split(/\s+/)[0].toLowerCase()) != -1)
            if (tag == 'iframe' && kept.length) el.setAttribute('allow', kept.join('; ')); else el.removeAttribute(attrs[i].name)
            continue
        }

        if (name.indexOf('data-') == 0) {
            if (!opts.allowData) el.removeAttribute(attrs[i].name)
            continue
        }
        if (name == 'class') {
            if (opts.allowClasses) continue
            const kept = value.split(/\s+/).filter(c => CLASS_ALLOWED.indexOf(c) != -1 || c == opts.glyphClass)
            if (kept.length) el.setAttribute('class', kept.join(' ')); else el.removeAttribute('class')
            continue
        }

        if (strict) {
            if (name == 'style') {
                const clean = filterStyle(value, styleAllowed)
                if (clean) el.setAttribute('style', clean); else el.removeAttribute('style')
                continue
            }
            if (allowed.indexOf(name) == -1) { el.removeAttribute(attrs[i].name); continue }
            if (['width', 'height', 'colspan', 'rowspan', 'frameborder'].indexOf(name) != -1 && !/^\d{1,4}$/.test(value)) el.removeAttribute(attrs[i].name)
        } else if (name == 'style' && UNSAFE_STYLE.test(value)) {
            el.removeAttribute('style')
        }
    }

    if (tag == 'img' && !isSafeUrl(el.getAttribute('src') || '')) return false
    if (tag == 'iframe' && !isSafeEmbed(el.getAttribute('src') || '', hosts)) return false
    if (tag == 'a' && el.getAttribute('href')) {
        if ((el.getAttribute('target') || '').toLowerCase() == '_self') {
            el.setAttribute('target', '_self')
            el.removeAttribute('rel')
        } else {
            el.setAttribute('target', '_blank')
            el.setAttribute('rel', 'noopener noreferrer nofollow')
        }
    }
    return true
}

export function cleanChildren (parent, hosts, strict, opts) {
    const nodes = Array.prototype.slice.call(parent.childNodes)
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.nodeType == 3) continue
        if (node.nodeType != 1) { parent.removeChild(node); continue }
        const tag = node.tagName.toUpperCase()
        // SVG and MathML bring their own script vectors
        if (node.namespaceURI != XHTML || DROP[tag] == 1) { parent.removeChild(node); continue }
        if (tag == 'IFRAME') while (node.firstChild) node.removeChild(node.firstChild)
        cleanChildren(node, hosts, strict, opts)
        if (strict && (tag == 'STRIKE' || tag == 'DEL')) {
            // Chrome's strikeThrough writes <strike>; only <s> is allowed
            const s = node.ownerDocument.createElement('s')
            while (node.firstChild) s.appendChild(node.firstChild)
            parent.replaceChild(s, node)
        } else if (strict && ALLOWED[tag] != 1) {
            while (node.firstChild) parent.insertBefore(node.firstChild, node)
            parent.removeChild(node)
        } else if (!cleanAttrs(node, hosts, strict, opts)) {
            parent.removeChild(node)
        }
    }
}

export function cleanHtml (html, hosts, strict, opts) {
    const tpl = document.createElement('template')
    tpl.innerHTML = html || ''
    cleanChildren(tpl.content, hosts, strict, opts)
    // Serialize from the inert template: adopting would fetch images
    return tpl.innerHTML
}

const UNWRAP = { P: 1, DIV: 1, H1: 1, H2: 1, H3: 1, H4: 1, BLOCKQUOTE: 1, PRE: 1, UL: 1, OL: 1, LI: 1, TABLE: 1, THEAD: 1, TBODY: 1, TR: 1, TH: 1, TD: 1, HR: 1 }

function flattenNode (parent, glyphClass) {
    const nodes = Array.prototype.slice.call(parent.childNodes)
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.nodeType != 1) continue
        if (node.tagName == 'IMG' && !(glyphClass && node.classList.contains(glyphClass))) { parent.removeChild(node); continue }
        flattenNode(node, glyphClass)
        if (UNWRAP[node.tagName] == 1) {
            const hasNext = node.nextSibling != null
            while (node.firstChild) parent.insertBefore(node.firstChild, node)
            if (hasNext) parent.insertBefore(document.createElement('br'), node)
            parent.removeChild(node)
        }
    }
}

export function flattenInline (html, glyphClass) {
    const tpl = document.createElement('template')
    tpl.innerHTML = html || ''
    flattenNode(tpl.content, glyphClass)
    return tpl.innerHTML.replace(/(<br\s*\/?>\s*)+$/i, '')
}
