import { isSafeUrl } from '../helpers/sanitizer.js'
import { embedFromUrl, escapeHtml, exec } from '../helpers/utils.js'

export const withMedia = (Base) => class extends Base {
    insertLink () {
        const sel = window.getSelection()
        const selected = sel ? sel.toString() : ''
        const anchor = this.currentAnchor()
        const newTab = anchor ? (anchor.getAttribute('target') || '_blank').toLowerCase() != '_self' : true
        this.promptPop({
            fields: [
                { placeholder: 'Link URL', value: anchor ? anchor.getAttribute('href') : 'https://' },
                { placeholder: 'Title (optional)', value: anchor ? (anchor.getAttribute('title') || '') : '' },
                { type: 'checkbox', label: 'Open in new tab', checked: newTab }
            ],
            onSubmit: vals => {
                const url = vals[0], title = vals[1], openNew = vals[2]
                if (url == '') {
                    if (anchor) {
                        const parent = anchor.parentNode
                        while (anchor.firstChild) parent.insertBefore(anchor.firstChild, anchor)
                        parent.removeChild(anchor)
                        this.sync()
                    } else {
                        exec('unlink')
                    }
                    return null
                }
                if (!isSafeUrl(url)) return 'That link scheme is not allowed.'
                let a = anchor
                if (a) { a.setAttribute('href', url) }
                else if (selected == '') { exec('insertHTML', '<a href="' + escapeHtml(url) + '">' + escapeHtml(url) + '</a>'); a = this.currentAnchor() }
                else { exec('createLink', url); a = this.currentAnchor() }
                if (a) {
                    if (title) a.setAttribute('title', title); else a.removeAttribute('title')
                    if (openNew) { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener noreferrer nofollow') }
                    else { a.setAttribute('target', '_self'); a.removeAttribute('rel') }
                }
                this.sync()
                return null
            }
        })
    }

    insertImage () {
        this.promptPop({
            fields: [{ placeholder: 'Image URL', value: 'https://' }, { placeholder: 'Alt text (optional)', value: '' }],
            onSubmit: vals => {
                const url = vals[0]
                if (!isSafeUrl(url)) return 'That image URL is not allowed.'
                exec('insertHTML', '<img src="' + escapeHtml(url) + '" alt="' + escapeHtml(vals[1] || '') + '">')
                return null
            }
        })
    }

    insertVideo () {
        this.promptPop({
            fields: [{ placeholder: 'YouTube or Vimeo URL', value: 'https://' }],
            onSubmit: vals => {
                const src = embedFromUrl(vals[0])
                if (src == null) return 'Only YouTube and Vimeo links are supported.'
                exec('insertHTML', '<iframe src="' + escapeHtml(src) + '" frameborder="0" allowfullscreen></iframe><p><br></p>')
                return null
            }
        })
    }

    linkOp (op) {
        const anchor = this.ctxAnchor
        if (anchor == null) return
        if (op == 'edit') {
            const range = document.createRange()
            range.selectNodeContents(anchor)
            const sel = window.getSelection()
            sel.removeAllRanges()
            sel.addRange(range)
            this.nextFormAnchor = this.ctxAnchorPos
            this.insertLink()
        } else if (op == 'open') {
            const href = anchor.getAttribute('href')
            if (href) window.open(href, '_blank', 'noopener')
        } else if (op == 'remove') {
            const parent = anchor.parentNode
            while (anchor.firstChild) parent.insertBefore(anchor.firstChild, anchor)
            parent.removeChild(anchor)
        }
    }

    uploadFiles (list) {
        let chain = Promise.resolve()
        for (let i = 0; i < list.length; i++) {
            const file = list[i]
            chain = chain.then(() => this.uploadFile(file))
        }
        return chain
    }

    uploadFile (file) {
        if (!/^image\//.test(file.type)) return Promise.resolve()
        if (this.maxImageKb && file.size > this.maxImageKb * 1024) {
            window.alert('Image is too large (max ' + this.maxImageKb + ' KB).')
            return Promise.resolve()
        }
        this.saveRange()
        this.setBusy(true)
        const insert = url => {
            if (!url || !isSafeUrl(url)) throw new Error('bad upload url')
            this.restoreRange()
            exec('insertHTML', '<img src="' + escapeHtml(url) + '" alt="">')
            this.sync()
        }
        const task = this.onImageUpload
            ? Promise.resolve(this.onImageUpload(file)).then(insert)
            : this.postImage(file).then(insert)
        return task.catch(() => window.alert('Image upload failed.')).then(() => this.setBusy(false))
    }

    postImage (file) {
        const fd = new FormData()
        fd.append(this.uploadField, file)
        const headers = Object.assign({ Accept: 'application/json' }, this.uploadHeaders)
        return fetch(this.uploadUrl, { method: 'POST', body: fd, headers: headers, credentials: 'same-origin' })
            .then(res => { if (!res.ok) throw new Error('HTTP ' + res.status); return res.json() })
            .then(data => data && data.url)
    }

    setBusy (on) {
        this.root.classList.toggle('ye--busy', on)
        const count = this.root.querySelector('[data-ye-count]')
        if (count == null) return
        if (on) count.textContent = 'Uploading…'
        else this.updateCount()
    }

    imageOp (op) {
        const img = this.ctxImg || this.selectedImg
        if (img == null) return
        if (op == 'align-left') { img.style.float = 'left'; this.setBlockAlign(img, '') }
        else if (op == 'align-right') { img.style.float = 'right'; this.setBlockAlign(img, '') }
        else if (op == 'align-center') { img.style.float = ''; this.setBlockAlign(img, 'center') }
        else if (op == 'align-none') { img.style.float = ''; this.setBlockAlign(img, '') }
        else if (op == 'alt') { this.editAlt(img); return }
        else if (op == 'img-del') { img.remove(); this.deselectImage(); this.sync(); return }
        this.sync()
        this.showImgHandle()
    }

    setBlockAlign (node, val) {
        const b = this.closestBlock(node)
        if (b && b != this.area) b.style.textAlign = val
    }

    editAlt (img) {
        this.nextFormAnchor = this.ctxAnchorPos
        this.promptPop({
            fields: [{ placeholder: 'Alt text (describe the image)', value: img.getAttribute('alt') || '' }],
            onSubmit: vals => { img.setAttribute('alt', vals[0]); this.sync(); return null }
        })
    }

    selectImage (img) {
        if (this.selectedImg && this.selectedImg != img) this.selectedImg.classList.remove('ye-img--sel')
        this.selectedImg = img
        img.classList.add('ye-img--sel')
        this.showImgHandle()
    }

    deselectImage () {
        if (this.selectedImg) this.selectedImg.classList.remove('ye-img--sel')
        this.selectedImg = null
        if (this.imgHandle) this.imgHandle.style.display = 'none'
    }

    showImgHandle () {
        const img = this.selectedImg
        if (img == null) return
        if (this.imgHandle == null) {
            const h = document.createElement('div')
            h.className = 'ye-img-handle'
            document.body.appendChild(h)
            h.addEventListener('mousedown', e => this.startImgResize(e))
            this.imgHandle = h
        }
        const r = img.getBoundingClientRect()
        this.imgHandle.style.display = 'block'
        this.imgHandle.style.left = (r.right - 6) + 'px'
        this.imgHandle.style.top = (r.bottom - 6) + 'px'
    }

    startImgResize (e) {
        e.preventDefault()
        const img = this.selectedImg
        if (img == null) return
        const startX = e.clientX
        const startW = img.getBoundingClientRect().width
        const maxW = this.area.clientWidth
        const move = ev => {
            let w = Math.round(startW + (ev.clientX - startX))
            w = Math.max(24, Math.min(w, maxW))
            img.style.width = w + 'px'
            img.style.height = ''
            img.removeAttribute('width'); img.removeAttribute('height')
            this.showImgHandle()
        }
        const up = () => {
            document.removeEventListener('mousemove', move)
            document.removeEventListener('mouseup', up)
            this.sync()
        }
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', up)
    }
}
