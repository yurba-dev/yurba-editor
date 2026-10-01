import { IMAGE_OPS, IMG_SIZES, IMG_SNAPS } from '../helpers/constants.js'
import { isSafeUrl } from '../helpers/sanitizer.js'
import { embedFromUrl, escapeHtml, exec } from '../helpers/utils.js'

const IMG_BAR_TOKENS = ['--ye-surface', '--ye-border', '--ye-text', '--ye-hover', '--ye-accent', '--ye-accent-ink', '--ye-accent-soft', '--ye-on-accent', '--ye-danger']

export const withMedia = (Base) => class extends Base {
    insertLink () {
        const sel = window.getSelection()
        const selected = sel ? sel.toString() : ''
        const anchor = this.currentAnchor()
        const newTab = anchor ? (anchor.getAttribute('target') || '_blank').toLowerCase() != '_self' : true
        // A host whose saved HTML keeps only href hides the fields it would lose
        const extra = this.options.linkFields !== false
        const fields = [{ placeholder: this.t('Link URL'), value: anchor ? anchor.getAttribute('href') : 'https://' }]
        if (extra) {
            fields.push({ placeholder: this.t('Title (optional)'), value: anchor ? (anchor.getAttribute('title') || '') : '' })
            fields.push({ type: 'checkbox', label: this.t('Open in new tab'), checked: newTab })
        }
        this.promptPop({
            fields,
            onSubmit: vals => this.applyLink(vals[0], anchor, selected, extra ? { title: vals[1], newTab: vals[2] } : null)
        })
    }

    // An empty url unlinks; attrs null leaves title and target as they are
    applyLink (url, anchor, selected, attrs) {
        url = (url || '').trim()
        // The https:// the field starts with is no address yet
        if (/^[a-z][a-z0-9+.-]*:\/*$/i.test(url)) return this.t('Enter a link address.')
        // A bare site name is a web address, not a page of this one
        if (/^www\./i.test(url) || /^[^/@:\s]+\.[a-z]{2,}(\/\S*)?$/i.test(url)) url = 'https://' + url
        this.flushHistory()
        if (url == '') {
            if (anchor) {
                const parent = anchor.parentNode
                while (anchor.firstChild) parent.insertBefore(anchor.firstChild, anchor)
                parent.removeChild(anchor)
                this.sync()
            } else {
                exec('unlink')
            }
            this.recordState()
            return null
        }
        if (!isSafeUrl(url)) return this.t('That link scheme is not allowed.')
        let a = anchor
        if (a) { a.setAttribute('href', url) }
        else if (selected == '') { exec('insertHTML', '<a href="' + escapeHtml(url) + '">' + escapeHtml(url) + '</a>'); a = this.currentAnchor() }
        else { exec('createLink', url); a = this.currentAnchor() }
        if (a && attrs) {
            if (attrs.title) a.setAttribute('title', attrs.title); else a.removeAttribute('title')
            if (attrs.newTab) { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener noreferrer nofollow') }
            else { a.setAttribute('target', '_self'); a.removeAttribute('rel') }
        }
        this.sync()
        this.recordState()
        return null
    }

    insertImage () {
        this.promptPop({
            fields: [{ placeholder: this.t('Image URL'), value: 'https://' }, { placeholder: this.t('Alt text (optional)'), value: '' }],
            onSubmit: vals => {
                const url = vals[0]
                if (!isSafeUrl(url)) return this.t('That image URL is not allowed.')
                exec('insertHTML', '<img src="' + escapeHtml(url) + '" alt="' + escapeHtml(vals[1] || '') + '">')
                return null
            }
        })
    }

    insertVideo () {
        this.promptPop({
            fields: [{ placeholder: this.t('YouTube or Vimeo URL'), value: 'https://' }],
            onSubmit: vals => {
                const src = embedFromUrl(vals[0])
                if (src == null) return this.t('Only YouTube and Vimeo links are supported.')
                this.flushHistory()
                const frame = document.createElement('iframe')
                frame.setAttribute('src', src)
                frame.setAttribute('frameborder', '0')
                frame.setAttribute('allowfullscreen', '')
                const next = document.createElement('p')
                next.innerHTML = '<br>'
                // A video is a block of its own: after the paragraph the caret is in, not inside its text
                const sel = window.getSelection()
                const block = sel && sel.rangeCount ? this.closestBlock(sel.anchorNode) : null
                const top = block && block != this.area && block.parentNode == this.area ? block : null
                if (top && top.textContent.trim() == '' && top.querySelector('img, iframe') == null) top.replaceWith(frame)
                else if (top) top.after(frame)
                else this.area.appendChild(frame)
                frame.after(next)
                this.caretInto(next)
                this.sync()
                this.recordState()
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
            if (href && isSafeUrl(href)) window.open(href, '_blank', 'noopener')
        } else if (op == 'remove') {
            const parent = anchor.parentNode
            while (anchor.firstChild) parent.insertBefore(anchor.firstChild, anchor)
            parent.removeChild(anchor)
        }
    }

    // Every picture shows at once where the caret is, dimmed, and takes its address when its upload is done;
    // the uploads go one by one
    uploadFiles (list) {
        const files = Array.prototype.slice.call(list).filter(file => this.uploadable(file))
        if (files.length == 0) return Promise.resolve()
        this.saveRange()
        this.flushHistory()
        this.restoreRange()
        const marks = files.map(file => {
            this.uploadSeq = (this.uploadSeq || 0) + 1
            const mark = 'u' + this.uploadSeq
            let preview = ''
            try { preview = URL.createObjectURL(file) } catch (e) {}
            exec('insertHTML', '<img src="' + escapeHtml(preview) + '" alt="" class="ye-img--uploading" data-ye-up="' + mark + '">')
            return { file, mark, preview }
        })
        this.uploading = (this.uploading || 0) + marks.length
        this.setBusy(true)
        let chain = Promise.resolve()
        marks.forEach(m => { chain = chain.then(() => this.uploadFile(m.file, m)) })
        return chain
    }

    uploadable (file) {
        if (!/^image\//.test(file.type)) return false
        if (this.maxImageKb && file.size > this.maxImageKb * 1024) {
            this.notice('image-too-large', this.t('Image is too large') + ' (' + this.maxImageKb + ' KB)')
            return false
        }
        return true
    }

    // A host shows it its own way (a toast); on its own the editor falls back to an alert
    notice (type, text) {
        if (typeof this.options.onNotice == 'function') this.options.onNotice(type, text)
        else window.alert(text)
        this.emit('notice', { type, text })
    }

    uploadFile (file, placed) {
        if (placed == null) return this.uploadFiles([file])
        // Wrapped so a sync throw still ends in the catch
        const task = this.onImageUpload ? new Promise(resolve => resolve(this.onImageUpload(file))) : this.postImage(file)
        const editor = this
        function preview () {
            return editor.area.querySelector('img[data-ye-up="' + placed.mark + '"]')
        }
        function done () {
            if (placed.preview) URL.revokeObjectURL(placed.preview)
            editor.uploading = Math.max(0, (editor.uploading || 1) - 1)
            if (editor.uploading == 0) editor.setBusy(false)
        }
        // A step of the history taken while it uploaded still holds the preview: what came of it is kept by
        // its mark, so going back there shows the picture (or nothing) rather than a dead blob
        this.upDone = this.upDone || {}
        return task.then(url => {
            if (!url || !isSafeUrl(url)) throw new Error('bad upload url')
            this.upDone[placed.mark] = url
            const img = preview()
            // Deleted while it was uploading, or the editor is gone: nothing to fill
            if (img == null || this.yeDestroyed) return
            this.fillUploaded(img, url)
            this.sync()
            this.recordState()
        }).catch(() => {
            this.upDone[placed.mark] = false
            if (this.yeDestroyed) return
            const img = preview()
            if (img) { if (img == this.selectedImg) this.deselectImage(); img.remove(); this.sync() }
            this.notice('upload-failed', this.t('Image upload failed.'))
        }).then(done)
    }

    fillUploaded (img, url) {
        img.setAttribute('src', url)
        img.classList.remove('ye-img--uploading')
        img.removeAttribute('data-ye-up')
        if (img.getAttribute('class') == '') img.removeAttribute('class')
    }

    // After a step of the history comes back: previews whose uploads ended take their result
    settleUploads () {
        const done = this.upDone || {}
        this.area.querySelectorAll('img[data-ye-up]').forEach(img => {
            const url = done[img.dataset.yeUp]
            if (url) this.fillUploaded(img, url)
            else if (url == false) img.remove()
        })
    }

    // A picture from one of the imageSources goes where the caret was when the menu opened
    pickImage (index) {
        const source = this.imageSources[index]
        if (!source) return
        this.saveRange()
        Promise.resolve(source.pick()).then(result => {
            const urls = (Array.isArray(result) ? result : [result]).filter(url => typeof url == 'string' && url && isSafeUrl(url))
            if (!urls.length || this.yeDestroyed || !this.area.isConnected) return
            this.flushHistory()
            this.restoreRange()
            exec('insertHTML', urls.map(url => '<img src="' + escapeHtml(url) + '" alt="">').join(''))
            this.sync()
            this.recordState()
        }).catch(() => {})
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
        if (on) count.textContent = this.t('Uploading…')
        else this.updateCount()
    }

    imageOps () {
        return this.imageAlt ? IMAGE_OPS : IMAGE_OPS.filter(op => op[0] != 'alt')
    }

    // Each is one step of the history, apart from the typing before it
    imageOp (op, target) {
        const img = target || this.ctxImg || this.selectedImg
        this.ctxImg = null
        if (img == null || !this.area.contains(img)) return
        // The bar and the handle would stand over the dialog
        if (op == 'alt') { if (this.imageAlt) { this.deselectImage(); this.editAlt(img) } return }
        this.flushHistory()
        const box = this.imgBox(img)
        const figure = box != img
        if (op == 'align-left' || op == 'align-right') {
            box.style.float = op.slice(6)
            if (!figure) this.setBlockAlign(img, '')
        } else if (op == 'align-center') {
            box.style.float = ''
            if (!figure) this.setBlockAlign(img, 'center')
        } else if (op == 'align-none') {
            box.style.float = ''
            if (!figure) this.setBlockAlign(img, '')
        } else if (op.indexOf('size-') == 0) {
            this.setImgSize(box, op == 'size-auto' ? null : +op.slice(5))
        } else if (op == 'caption') {
            if (this.hasCaption(img)) this.dropCaption(img)
            else this.addCaption(img)
        } else if (op == 'img-del') {
            this.deselectImage()
            const next = box.nextSibling
            const parent = box.parentNode
            box.remove()
            // The caret stays where the picture was, so the next key (Ctrl+Z too) still lands in the text
            if (parent && this.area.contains(parent)) {
                const range = document.createRange()
                if (next && next.parentNode == parent) range.setStartBefore(next)
                else { range.selectNodeContents(parent); range.collapse(false) }
                window.getSelection().removeAllRanges()
                window.getSelection().addRange(range)
                this.area.focus({ preventScroll: true })
            }
        }
        this.sync()
        this.recordState()
        this.showImgHandle()
    }

    // Pictures the host would not keep (another site's, pasted along with text) go at once, with a word why,
    // rather than showing now and vanishing on save
    dropForeignImages () {
        if (this.imageAllowed == null) return
        let dropped = 0
        this.area.querySelectorAll('img').forEach(img => {
            if (this.isGlyph(img) || img.classList.contains('ye-img--uploading')) return
            if (this.imageAllowed(img.getAttribute('src') || '')) return
            const box = this.imgBox(img)
            if (box == this.selectedImg || img == this.selectedImg) this.deselectImage()
            box.remove()
            dropped++
        })
        if (dropped) this.notice('foreign-images', this.t('Pictures from other sites are not kept. Upload them instead.'))
    }

    // What carries a picture's size and float: its figure when it has a caption
    imgBox (img) {
        const parent = img.parentNode
        return parent && parent.tagName == 'FIGURE' && this.area.contains(parent) ? parent : img
    }

    // A preset is a share of the text's width. Below the whole width a little is left over, so two halves
    // or four quarters still share a line where the text wraps a pixel sooner.
    imgShareFor (preset) {
        if (preset >= 100) return 100
        const exact = preset == 33 ? 100 / 3 : preset == 66 ? 200 / 3 : preset
        return Math.round((exact - 0.5) * 100) / 100
    }

    setImgSize (box, preset) {
        box.style.width = preset == null ? '' : this.imgShareFor(preset) + '%'
        box.style.height = ''
        box.removeAttribute('width'); box.removeAttribute('height')
        if (box.getAttribute('style') == '') box.removeAttribute('style')
        if (box.tagName == 'FIGURE') {
            const img = box.querySelector('img')
            if (img) { img.style.width = ''; img.style.height = ''; img.removeAttribute('width'); img.removeAttribute('height') }
        }
    }

    // The preset a picture is at now: a number, 'auto' with no width, or null for a width of its own
    imgPreset (box) {
        const width = box.style.width || ''
        if (width == '' && !box.getAttribute('width')) return 'auto'
        const share = /%$/.test(width) ? parseFloat(width) : NaN
        if (isNaN(share)) return null
        const found = IMG_SIZES.find(p => Math.abs(this.imgShareFor(p) - share) < 0.3 || Math.abs(p - share) < 0.3)
        return found == null ? null : found
    }

    hasCaption (img) {
        const box = this.imgBox(img)
        return box != img && box.querySelector(':scope > figcaption') != null
    }

    // Size and float move to the figure: the picture fills it and the caption follows its width
    figureFor (img) {
        const figure = document.createElement('figure')
        if (img.style.width) figure.style.width = img.style.width
        if (img.style.float) figure.style.float = img.style.float
        img.style.width = ''; img.style.height = ''; img.style.float = ''
        img.removeAttribute('width'); img.removeAttribute('height')
        if (img.getAttribute('style') == '') img.removeAttribute('style')
        return figure
    }

    // A paragraph of pictures alone, side by side
    pictureRow (block) {
        if (block == null || block.tagName != 'P') return null
        const imgs = []
        for (const n of block.childNodes) {
            if (n.nodeType == 3 && n.nodeValue.trim() == '') continue
            if (n.nodeName == 'BR') continue
            if (n.nodeName != 'IMG' || this.isGlyph(n)) return null
            imgs.push(n)
        }
        return imgs.length > 1 ? imgs : null
    }

    // The figures standing next to this one in a line
    figureRow (figure) {
        let first = figure
        while (first.previousElementSibling && first.previousElementSibling.tagName == 'FIGURE') first = first.previousElementSibling
        const row = []
        for (let n = first; n && n.tagName == 'FIGURE'; n = n.nextElementSibling) row.push(n)
        return row
    }

    addCaption (img) {
        const caption = document.createElement('figcaption')
        caption.innerHTML = '<br>'
        // A picture already in a figure of a row only needs its caption
        const box = this.imgBox(img)
        if (box != img) {
            box.appendChild(caption)
            this.caretInto(caption)
            this.selectImage(img)
            this.sync()
            return
        }
        const block = this.closestBlock(img)
        // Pictures side by side stay so: each becomes a figure, the others without a caption
        const row = this.pictureRow(block)
        if (row) {
            const figures = row.map(pic => { const f = this.figureFor(pic); f.appendChild(pic); return f })
            block.replaceWith(...figures)
            figures[row.indexOf(img)].appendChild(caption)
            const last = figures[figures.length - 1]
            if (last.nextSibling == null || last.nextSibling.nodeType != 1) last.after(document.createElement('p'))
            if (last.nextSibling.tagName == 'P' && last.nextSibling.innerHTML == '') last.nextSibling.innerHTML = '<br>'
            this.caretInto(caption)
            this.selectImage(img)
            this.sync()
            return
        }
        const figure = this.figureFor(img)
        // A figure is a block of its own: a paragraph holding the picture is split around it
        if (block && block != this.area && block.tagName == 'P') {
            const after = block.cloneNode(false)
            let n = img.nextSibling
            while (n) { const next = n.nextSibling; after.appendChild(n); n = next }
            block.after(figure)
            if (after.textContent.trim() != '' || after.querySelector('img')) figure.after(after)
            img.remove()
            if (block.textContent.trim() == '' && block.querySelector('img') == null) block.remove()
        } else {
            img.replaceWith(figure)
        }
        figure.appendChild(img)
        figure.appendChild(caption)
        if (figure.nextSibling == null) figure.after(document.createElement('p'))
        if (figure.nextSibling.tagName == 'P' && figure.nextSibling.innerHTML == '') figure.nextSibling.innerHTML = '<br>'
        this.caretInto(caption)
        this.selectImage(img)
        this.sync()
    }

    dropCaption (img) {
        const figure = this.imgBox(img)
        const row = this.figureRow(figure)
        if (row.length > 1) {
            figure.querySelector(':scope > figcaption').remove()
            // With no caption left the row goes back to one paragraph of pictures
            if (row.every(f => f.querySelector(':scope > figcaption') == null)) {
                const p = document.createElement('p')
                row[0].before(p)
                row.forEach(f => {
                    const pic = f.querySelector('img')
                    if (f.style.width) pic.style.width = f.style.width
                    if (f.style.float) pic.style.float = f.style.float
                    p.appendChild(pic)
                    f.remove()
                })
            }
            this.selectImage(img)
            this.sync()
            return
        }
        const p = document.createElement('p')
        if (figure.style.width) img.style.width = figure.style.width
        if (figure.style.float) img.style.float = figure.style.float
        else p.style.textAlign = 'center'
        figure.replaceWith(p)
        p.appendChild(img)
        this.selectImage(img)
        this.sync()
    }

    caretInto (el) {
        const range = document.createRange()
        range.selectNodeContents(el)
        range.collapse(false)
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
        this.area.focus({ preventScroll: true })
    }

    // Enter in a caption goes on with the text below; the caption stays one line
    captionKey (e) {
        if (e.key != 'Enter' || e.shiftKey || e.isComposing) return false
        const sel = window.getSelection()
        if (sel == null || sel.rangeCount == 0) return false
        const node = sel.anchorNode
        const caption = node && (node.nodeType == 1 ? node : node.parentNode).closest('figcaption')
        if (caption == null || !this.area.contains(caption)) return false
        e.preventDefault()
        this.flushHistory()
        const figure = caption.parentNode
        let next = figure.nextElementSibling
        // An empty line after the picture is taken, otherwise a new one starts, as Enter does in text
        if (next == null || next.tagName != 'P' || next.textContent != '' || next.querySelector('img')) {
            next = document.createElement('p')
            next.innerHTML = '<br>'
            figure.after(next)
        }
        const range = document.createRange()
        range.setStart(next, 0)
        range.collapse(true)
        sel.removeAllRanges()
        sel.addRange(range)
        this.deselectImage()
        this.sync()
        this.recordState()
        return true
    }

    setBlockAlign (node, val) {
        let b = this.closestBlock(node)
        // A picture straight in the text has no paragraph to align: it gets one of its own
        if (b == null && val) {
            b = document.createElement('p')
            node.replaceWith(b)
            b.appendChild(node)
        }
        if (b && b != this.area) b.style.textAlign = val
    }

    editAlt (img) {
        this.nextFormAnchor = this.ctxAnchorPos
        this.promptPop({
            fields: [{ placeholder: this.t('Alt text (describe the image)'), value: img.getAttribute('alt') || '' }],
            onSubmit: vals => { this.flushHistory(); img.setAttribute('alt', vals[0]); this.sync(); this.recordState(); return null }
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
        if (this.imgBar) this.imgBar.style.display = 'none'
    }

    showImgHandle () {
        const img = this.selectedImg
        if (img == null) return
        if (!img.isConnected) { this.deselectImage(); return }
        if (this.imgHandle == null) {
            const h = document.createElement('div')
            h.className = 'ye-img-handle'
            document.body.appendChild(h)
            // Pointer events, so a finger drags it as a mouse does
            h.addEventListener('pointerdown', e => this.startImgResize(e))
            this.imgHandle = h
        }
        const r = img.getBoundingClientRect()
        const area = this.area.getBoundingClientRect()
        this.showImgBar(r, area)
        // A corner scrolled out of the text has nothing to hold
        if (r.bottom > area.bottom || r.bottom < area.top || r.right > area.right) {
            this.imgHandle.style.display = 'none'
            return
        }
        this.imgHandle.style.display = 'block'
        // On the corner, and pushed back in only where it would stick out of the editor
        const size = this.imgHandle.offsetWidth || 16
        this.imgHandle.style.left = Math.min(r.right - size / 2, area.right - size - 2) + 'px'
        this.imgHandle.style.top = Math.min(r.bottom - size / 2, area.bottom - size - 2) + 'px'
    }

    buildImgBar () {
        // The hint an empty caption shows; saved HTML keeps no data attributes, so it lives on the area
        this.area.style.setProperty('--ye-caption-hint', JSON.stringify(this.t('Caption')))
        const bar = document.createElement('div')
        bar.className = 'ye-imgbar'
        bar.setAttribute('role', 'toolbar')
        bar.setAttribute('aria-label', this.t('Image'))
        const editor = this
        function button (op, inner, title, extra) {
            const b = document.createElement('button')
            b.type = 'button'
            b.className = 'ye-imgbar__btn' + (extra ? ' ' + extra : '')
            b.dataset.yeImgbar = op
            b.innerHTML = inner
            b.title = title
            b.setAttribute('aria-label', title)
            bar.appendChild(b)
        }
        function sep () {
            const d = document.createElement('span')
            d.className = 'ye-imgbar__sep'
            bar.appendChild(d)
        }
        IMG_SIZES.forEach(p => button('size-' + p, p + '%', editor.t('Width') + ' ' + p + '%', 'ye-imgbar__btn--text'))
        button('size-auto', escapeHtml(this.t('Auto')), this.t('Original size'), 'ye-imgbar__btn--text')
        sep()
        button('align-left', this.renderIcon('align-left'), this.t('Float left'))
        button('align-center', this.renderIcon('align-center'), this.t('Center'))
        button('align-right', this.renderIcon('align-right'), this.t('Float right'))
        sep()
        button('caption', this.renderIcon('caption'), this.t('Caption'))
        if (this.imageAlt) button('alt', this.renderIcon('alt'), this.t('Alt text…'))
        button('img-del', this.renderIcon('img-del'), this.t('Delete image'), 'ye-imgbar__btn--danger')
        // The text keeps its focus and the picture its selection
        bar.addEventListener('mousedown', e => e.preventDefault())
        bar.addEventListener('click', e => {
            const b = e.target.closest('[data-ye-imgbar]')
            const img = this.selectedImg
            if (b == null || img == null) return
            let op = b.dataset.yeImgbar
            // A second press on the float or centring in use puts the picture back in its line
            if (op.indexOf('align-') == 0 && b.classList.contains('ye-imgbar__btn--on')) op = 'align-none'
            // A dialog (alt text) opens under the button, not where a right click once was
            this.ctxAnchorPos = this.anchorUnder(b)
            this.imageOp(op, img)
        })
        document.body.appendChild(bar)
        return bar
    }

    // Over the picture, or under it where the editor's top would cover it; always inside the window
    showImgBar (r, area) {
        const img = this.selectedImg
        if (this.imgBar == null) this.imgBar = this.buildImgBar()
        const bar = this.imgBar
        if (img == null || r.bottom < area.top || r.top > area.bottom || this.imgResizing) {
            bar.style.display = 'none'
            return
        }
        this.markImgBar(img)
        if (bar.style.display != 'flex') {
            // The bar lives in <body>, outside the editor that sets the theme, so it takes the values along
            const cs = getComputedStyle(this.root)
            IMG_BAR_TOKENS.forEach(name => { const v = cs.getPropertyValue(name); if (v) bar.style.setProperty(name, v.trim()) })
        }
        bar.style.display = 'flex'
        const w = bar.offsetWidth
        const h = bar.offsetHeight
        const top = Math.max(area.top, 8)
        let y = r.top - h - 8
        if (y < top) y = r.bottom + 8
        if (y + h > Math.min(area.bottom, window.innerHeight - 8)) y = Math.max(top, r.top) + 8
        let x = r.left + r.width / 2 - w / 2
        x = Math.max(8, Math.min(x, window.innerWidth - w - 8))
        bar.style.left = Math.round(x) + 'px'
        bar.style.top = Math.round(y) + 'px'
    }

    markImgBar (img) {
        const box = this.imgBox(img)
        const preset = this.imgPreset(box)
        const float = box.style.float
        const block = box == img ? this.closestBlock(img) : null
        const centred = box != img ? !float : !float && block && block.style.textAlign == 'center'
        this.imgBar.querySelectorAll('[data-ye-imgbar]').forEach(b => {
            const op = b.dataset.yeImgbar
            let on = false
            if (op.indexOf('size-') == 0) on = String(preset) == op.slice(5)
            else if (op == 'align-left' || op == 'align-right') on = float == op.slice(6)
            else if (op == 'align-center') on = !!centred
            else if (op == 'caption') on = this.hasCaption(img)
            b.classList.toggle('ye-imgbar__btn--on', on)
            b.setAttribute('aria-pressed', on ? 'true' : 'false')
        })
    }

    // The width of the text itself, inside the area's padding
    innerWidth () {
        const style = getComputedStyle(this.area)
        return this.area.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
    }

    // Widths a picture sticks to while it is resized: the height or the width of a picture beside it or of
    // the nearest ones above and below, and what is left of the line with those beside it; alone on its line,
    // the whole width of the text
    imgSnaps (img, r, ratio, maxW) {
        const box = this.imgBox(img)
        const all = Array.from(this.area.querySelectorAll('img'))
            .filter(other => other != img && !this.isGlyph(other))
            .map(other => ({ other: this.imgBox(other), rect: this.imgBox(other).getBoundingClientRect(), pic: other.getBoundingClientRect() }))
            .filter(x => x.rect.height > 0 && x.other != box)
        const beside = x => x.rect.top < r.bottom - 4 && x.rect.bottom > r.top + 4
        const row = all.filter(beside)
        const middle = (r.top + r.bottom) / 2
        // A few nearest are enough; more would make it stick at every step
        const near = all.filter(x => !beside(x))
            .sort((a, b) => Math.abs((a.rect.top + a.rect.bottom) / 2 - middle) - Math.abs((b.rect.top + b.rect.bottom) / 2 - middle))
            .slice(0, 4)
        // The presets of the bar, so a hand stops on a half or a third as a press would give
        const snaps = IMG_SNAPS.map(p => ({ width: Math.round(this.imgShareFor(p) / 100 * maxW), kind: 'preset', preset: p }))
        row.concat(near).forEach(x => {
            snaps.push({ width: Math.round(x.pic.height * ratio), kind: 'height', other: x.other, apart: !beside(x) })
            snaps.push({ width: Math.round(x.rect.width), kind: 'width', other: x.other, apart: !beside(x) })
        })
        if (row.length) {
            const left = Math.min(r.left, ...row.map(x => x.rect.left))
            const right = Math.max(r.right, ...row.map(x => x.rect.right))
            // Widths are kept as shares of the text, while the gaps between pictures stay in pixels: a little is
            // left over, so the line still fits where the text is narrower than here
            const spare = Math.ceil(maxW * 0.015)
            snaps.push({ width: Math.floor(maxW - (right - left - r.width)) - spare, kind: 'fill', row: row.map(x => x.other) })
        }
        return snaps.filter(s => s.width >= 24 && s.width <= maxW)
    }

    // The share a picture has while it is dragged, next to the finger or the cursor
    showImgBadge (text, snapped, x, y) {
        if (this.imgBadge == null) {
            const badge = document.createElement('div')
            badge.className = 'ye-img-badge'
            const cs = getComputedStyle(this.root)
            IMG_BAR_TOKENS.forEach(name => { const v = cs.getPropertyValue(name); if (v) badge.style.setProperty(name, v.trim()) })
            document.body.appendChild(badge)
            this.imgBadge = badge
        }
        const badge = this.imgBadge
        if (text == null) { badge.style.display = 'none'; return }
        badge.textContent = text
        badge.classList.toggle('ye-img-badge--snap', snapped)
        badge.style.display = 'block'
        const w = badge.offsetWidth
        badge.style.left = Math.max(8, Math.min(x - w - 12, window.innerWidth - w - 8)) + 'px'
        badge.style.top = Math.max(8, y + 14) + 'px'
    }

    // The picture a size is taken from is outlined, and a line shows what lines up
    showSnap (snap, img) {
        this.area.querySelectorAll('.ye-img--snap').forEach(el => el.classList.remove('ye-img--snap'))
        if (this.imgGuide == null) {
            const guide = document.createElement('div')
            guide.className = 'ye-img-guide'
            document.body.appendChild(guide)
            this.imgGuide = guide
        }
        const guide = this.imgGuide
        if (snap == null || img == null) {
            guide.style.display = 'none'
            return
        }
        const r = img.getBoundingClientRect()
        // A preset lines up with nothing in the text: the badge tells it
        if (snap.kind == 'preset') {
            guide.style.display = 'none'
            return
        }
        const others = snap.other ? [snap.other] : snap.row
        others.forEach(el => el.classList.add('ye-img--snap'))
        guide.style.display = 'block'
        if (snap.kind == 'fill') {
            const area = this.area.getBoundingClientRect()
            const style = getComputedStyle(this.area)
            guide.style.left = (area.right - parseFloat(style.paddingRight)) + 'px'
            guide.style.top = r.top + 'px'
            guide.style.width = '2px'
            guide.style.height = r.height + 'px'
            return
        }
        const o = snap.other.getBoundingClientRect()
        const left = Math.min(r.left, o.left)
        // One above or below: a line down the right edge shows the widths meet, one along the side the height
        if (snap.apart) {
            const top = Math.min(r.top, o.top)
            guide.style.left = (snap.kind == 'width' ? r.right + 4 : r.left - 6) + 'px'
            guide.style.top = (snap.kind == 'width' ? top : r.top) + 'px'
            guide.style.width = '2px'
            guide.style.height = (snap.kind == 'width' ? Math.max(r.bottom, o.bottom) - top : r.height) + 'px'
            return
        }
        if (snap.kind == 'height') {
            guide.style.left = left + 'px'
            guide.style.top = Math.max(r.bottom, o.bottom) + 'px'
            guide.style.width = (Math.max(r.right, o.right) - left) + 'px'
            guide.style.height = '2px'
        } else {
            guide.style.left = r.left + 'px'
            guide.style.top = (Math.max(r.bottom, o.bottom) + 4) + 'px'
            guide.style.width = r.width + 'px'
            guide.style.height = '2px'
        }
    }

    startImgResize (e) {
        e.preventDefault()
        const img = this.selectedImg
        if (img == null) return
        const pointer = e.pointerId
        try { this.imgHandle.setPointerCapture(pointer) } catch (err) {}
        const startX = e.clientX
        const box = this.imgBox(img)
        const start = box.getBoundingClientRect()
        const pic = img.getBoundingClientRect()
        const ratio = pic.height ? pic.width / pic.height : 1
        const maxW = this.innerWidth()
        const snaps = this.imgSnaps(img, start, ratio, maxW)
        const editor = this
        // The whole drag is one step of the history
        this.flushHistory()
        this.imgResizing = true
        function move (ev) {
            if (ev.pointerId != pointer) return
            let w = Math.round(start.width + (ev.clientX - startX))
            w = Math.max(24, Math.min(w, maxW))
            let snap = null
            snaps.forEach(s => {
                if (Math.abs(s.width - w) <= 8 && (snap == null || Math.abs(s.width - w) < Math.abs(snap.width - w))) snap = s
            })
            if (snap) w = snap.width
            // A share of the text's width, so the picture keeps its place in a narrower or wider page
            if (snap && snap.kind == 'preset') editor.setImgSize(box, snap.preset)
            else {
                editor.setImgSize(box, null)
                box.style.width = Math.round(w / maxW * 10000) / 100 + '%'
            }
            editor.showImgHandle()
            editor.showSnap(snap, box)
            const share = snap && snap.kind == 'preset' ? snap.preset : Math.round(w / maxW * 100)
            editor.showImgBadge(share + '%', !!snap, ev.clientX, ev.clientY)
        }
        function up (ev) {
            if (ev.pointerId != pointer) return
            document.removeEventListener('pointermove', move)
            document.removeEventListener('pointerup', up)
            document.removeEventListener('pointercancel', up)
            editor.imgResizing = false
            editor.showSnap(null)
            editor.showImgBadge(null)
            editor.showImgHandle()
            editor.sync()
            editor.recordState()
        }
        document.addEventListener('pointermove', move)
        document.addEventListener('pointerup', up)
        document.addEventListener('pointercancel', up)
    }
}
