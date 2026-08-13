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
