import { cpForward, cpLen, dtHasFiles, exec, filesFrom, imageFilesFrom, rangeFromPoint, shortcutKey } from '../helpers/utils.js'

// Shared by every editor on the page: the one a Ctrl+Z outside the text belongs to
let lastEditor = null

export const withWiring = (Base) => class extends Base {
    wire () {
        const area = this.area

        area.addEventListener('beforeinput', e => {
            const t = e.inputType || ''
            // The browser's own undo knows typing only, not what the editor changed itself (a table taken out,
            // a picture resized): the editor's history answers it, from the Edit menu or a phone keyboard too
            if (t == 'historyUndo' || t == 'historyRedo') {
                e.preventDefault()
                if (t == 'historyUndo') this.undo()
                else this.redo()
                return
            }
            this.inputBoundary = (t == 'insertText' && /\s/.test(e.data || '')) ||
                t == 'insertParagraph' || t == 'insertLineBreak' ||
                t == 'insertFromPaste' || t == 'insertFromDrop'
            if (!this.maxChars) return
            if (t.indexOf('insert') != 0) return
            let add = 1
            if ((t == 'insertText' || t == 'insertReplacementText') && e.data != null) add = cpLen(e.data)
            else if (t == 'insertParagraph' || t == 'insertLineBreak') add = 0
            const room = this.roomLeft()
            if (add <= room) return
            e.preventDefault()
            // A word at once (autocomplete, dictation, an IME) goes in as far as there is room, not at all
            if (t == 'insertText' && e.data && room > 0) exec('insertText', e.data.slice(0, cpForward(e.data, 0, room)))
        })
        area.addEventListener('input', e => {
            // A dragged-in image lands without a paste event
            if (this.inline) area.querySelectorAll('img, iframe').forEach(el => { if (!this.isGlyph(el)) el.remove() })
            // Joining a paragraph to a heading, Chrome keeps the paragraph's look in a <span style="font-size">
            if (/^delete/.test(e.inputType || '')) this.dropComputedSpans()
            this.dropForeignImages()
            this.enforceLimit()
            this.sync()
            if (this.inputBoundary) { this.inputBoundary = false; this.recordState() }
        })
        area.addEventListener('compositionstart', () => { this.composing = true })
        area.addEventListener('compositionend', () => {
            this.composing = false
            this.enforceLimit()
            this.sync()
        })
        area.addEventListener('blur', () => this.sync())
        area.addEventListener('keyup', () => this.updateStates())
        area.addEventListener('mouseup', () => this.updateStates())
        area.addEventListener('keydown', e => {
            // Ctrl+Z brings the caret back to where the edit started, not where the last step ended
            this.noteCaret()
            if (this.inline && e.key == 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.isComposing) {
                // A host handler (e.g. send) may have taken Enter first
                if (!e.defaultPrevented) { e.preventDefault(); exec('insertLineBreak') }
                return
            }
            if (this.imageKey(e)) return
            if (this.captionKey(e)) return
            if (e.key == 'Tab' && !e.defaultPrevented) {
                // What was typed just before is a step of its own, apart from the new row or level
                this.flushHistory()
                if (this.tabKey(e)) { e.preventDefault(); this.recordState(); return }
            }
            this.markdownShortcut(e)
            if ((e.ctrlKey || e.metaKey) && this.shortcut(e)) { e.preventDefault(); return }
            if (e.key == 'Escape') {
                // One Escape closes one thing: an open menu first, the full screen only after
                const busy = this.ctxPop || this.textPop || this.textMenu || this.formPop || this.findPop || this.selectedImg || this.openMenuEl
                this.hideTableCtx(); this.closeTextMenu(); this.hideFormPop(); this.hideFindPop(); this.deselectImage(); this.closeMenus()
                if (!busy && this.root.classList.contains('ye--full')) this.toggleFull()
            }
        })

        area.addEventListener('contextmenu', e => {
            if (this.openCtxAt(e.target, e.clientX, e.clientY)) e.preventDefault()
        })

        area.addEventListener('click', e => {
            const img = e.target && e.target.closest ? e.target.closest('img') : null
            if (img && area.contains(img) && !this.isGlyph(img)) {
                this.selectImage(img)
                // The caret leaves the words it may have held and stands after the picture
                const range = document.createRange()
                range.setStartAfter(img)
                range.collapse(true)
                window.getSelection().removeAllRanges()
                window.getSelection().addRange(range)
            } else this.deselectImage()
        })

        let lpTimer = null, lpStart = null
        function clearLp () {
            if (lpTimer) { clearTimeout(lpTimer); lpTimer = null }
        }
        this.clearLongPress = clearLp
        area.addEventListener('touchstart', e => {
            if (e.touches.length != 1) { clearLp(); return }
            const t = e.touches[0]
            lpStart = { x: t.clientX, y: t.clientY, target: t.target }
            clearLp()
            lpTimer = setTimeout(() => {
                lpTimer = null
                if (this.openCtxAt(lpStart.target, lpStart.x, lpStart.y)) {
                    if (navigator.vibrate) { try { navigator.vibrate(10) } catch (er) {} }
                }
            }, 500)
        }, { passive: true })
        area.addEventListener('touchmove', e => {
            if (lpTimer == null || lpStart == null) return
            const t = e.touches[0]
            if (Math.abs(t.clientX - lpStart.x) > 10 || Math.abs(t.clientY - lpStart.y) > 10) clearLp()
        }, { passive: true })
        area.addEventListener('touchend', clearLp)
        area.addEventListener('touchcancel', clearLp)

        this.sourceView.addEventListener('input', () => {
            const html = this.clean(this.sourceView.value)
            if (this.input) this.input.value = html
            if (typeof this.options.onChange == 'function') this.options.onChange(html)
            this.emit('change', html)
        })

        area.addEventListener('paste', e => {
            const data = e.clipboardData || window.clipboardData
            if (data == null) return
            // Office apps put a picture of copied text next to the text itself
            const files = this.onFiles && !data.getData('text/plain') ? filesFrom(data) : []
            if (files.length) { e.preventDefault(); this.onFiles(files, this); return }
            const imgs = this.uploadEnabled ? imageFilesFrom(data) : []
            if (imgs.length) { e.preventDefault(); this.uploadFiles(imgs); return }
            e.preventDefault()
            this.insertClipboard(data.getData('text/html'), data.getData('text/plain'))
        })

        area.addEventListener('dragstart', () => { this.dragInside = true })
        area.addEventListener('dragend', () => { this.dragInside = false })
        area.addEventListener('drop', e => {
            const dt = e.dataTransfer
            if (this.dragInside || dt == null || dtHasFiles(dt)) return
            const html = dt.getData('text/html')
            const text = dt.getData('text/plain')
            if (!html && !text) return
            e.preventDefault()
            area.focus()
            const r = rangeFromPoint(e.clientX, e.clientY)
            if (r && area.contains(r.startContainer)) { const s = window.getSelection(); s.removeAllRanges(); s.addRange(r) }
            this.insertClipboard(html, text)
        })

        area.addEventListener('focus', () => { lastEditor = this })

        // The editor worked in last answers Ctrl+Z / Ctrl+Y also when focus left the text for a menu, a bar,
        // a dialog or the page itself; a field of its own keeps its own undo
        this.onUndoKey = e => {
            if (lastEditor != this || !(e.ctrlKey || e.metaKey) || e.altKey || e.defaultPrevented) return
            const k = shortcutKey(e)
            if (k != 'z' && k != 'y') return
            const t = e.target
            if (t == null || this.area.contains(t)) return
            if (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return
            e.preventDefault()
            if (k == 'y' || e.shiftKey) this.redo()
            else this.undo()
        }

        this.onMousedown = e => {
            // A press elsewhere on the page ends it, except in the menus and dialogs the editor opened
            if (!this.owns(e.target) && !(e.target.closest && e.target.closest('.y-context-menu, .y-dropdown, .y-modal, .ye-popup'))) {
                if (lastEditor == this) lastEditor = null
                return
            }
            lastEditor = this
            if (!this.owns(e.target)) return
            this.saveRange()
            if (e.target.closest('.ye-toolbar__btn, .ye-menu__item, .ye-swatch, .ye-tableops button, .ye-grid__cell')) e.preventDefault()
        }

        this.onChange = e => {
            if (!this.owns(e.target)) return
            const el = e.target.closest('.ye-color-native, .ye-color-hex')
            if (el == null) return
            this.applyCustomColor(el)
        }
        this.onHexKey = e => {
            if (!this.owns(e.target)) return
            if (e.key == 'Enter' && e.target.classList && e.target.classList.contains('ye-color-hex')) {
                e.preventDefault()
                this.applyCustomColor(e.target)
            }
        }

        this.onClick = e => {
            if (!this.owns(e.target)) return
            if ((this.ctxPop && this.ctxPop.contains(e.target)) || (this.formPop && this.formPop.contains(e.target))) return
            const toggle = e.target.closest('[data-ye-menu-toggle]')
            if (toggle) {
                e.preventDefault()
                const menu = toggle.closest('[data-ye-menu]')
                const pop = menu._pop
                const willOpen = pop && !pop.classList.contains('is-open')
                this.closeMenus()
                if (willOpen) {
                    if (pop.hasAttribute('data-ye-table-pop')) this.buildTablePop(pop)
                    this.themePopup(pop)
                    document.body.appendChild(pop)
                    menu.classList.add('is-open')
                    toggle.setAttribute('aria-expanded', 'true')
                    this.openMenuEl = menu
                    this.positionMenuPop(menu)
                    void pop.offsetWidth
                    pop.classList.add('is-open')
                }
                return
            }
            const gridCell = e.target.closest('.ye-grid__cell')
            if (gridCell) {
                e.preventDefault()
                area.focus()
                const gpop = gridCell.closest('[data-ye-table-pop]')
                const hb = gpop && gpop.querySelector('[data-ye-table-header]')
                this.insertTable(parseInt(gridCell.dataset.r, 10), parseInt(gridCell.dataset.c, 10), hb && hb.checked)
                this.closeMenus(); this.sync()
                return
            }
            const opBtn = e.target.closest('.ye-tableops button')
            if (opBtn) {
                e.preventDefault()
                area.focus()
                this.tableOp(opBtn.dataset.ye)
                this.closeMenus(); this.sync()
                return
            }
            const sourceBtn = e.target.closest('[data-ye-source]')
            if (sourceBtn && this.owns(sourceBtn)) {
                e.preventDefault()
                this.closeMenus()
                this.pickImage(+sourceBtn.dataset.yeSource)
                return
            }
            const upBtn = e.target.closest('[data-ye-upload]')
            if (upBtn) {
                e.preventDefault()
                this.saveRange()
                this.closeMenus()
                this.fileInput.click()
                return
            }
            const cmdEl = e.target.closest('[data-cmd]')
            if (cmdEl && this.owns(cmdEl)) {
                e.preventDefault()
                const c = cmdEl.dataset.cmd
                if (c == 'ye-link' || c == 'ye-image' || c == 'ye-video') this.nextFormAnchor = this.anchorUnder(cmdEl)
                this.run(c, cmdEl.dataset.arg)
                this.closeMenus(); this.sync(); this.updateStates()
                if (c != 'undo' && c != 'redo') this.recordState()
            }
        }

        this.onMouseover = e => {
            if (!this.owns(e.target)) return
            const cell = e.target.closest('.ye-grid__cell')
            if (cell == null) return
            const gr = parseInt(cell.dataset.r, 10)
            const gc = parseInt(cell.dataset.c, 10)
            const container = cell.closest('.ye-menu__pop') || this.root
            const cells = container.querySelectorAll('.ye-grid__cell')
            for (let i = 0; i < cells.length; i++) {
                const on = parseInt(cells[i].dataset.r, 10) <= gr && parseInt(cells[i].dataset.c, 10) <= gc
                cells[i].classList.toggle('is-on', on)
            }
            const label = container.querySelector('.ye-grid__label')
            if (label) label.textContent = gr + ' × ' + gc
        }

        if (this.uploadEnabled) {
            this.fileInput.addEventListener('change', () => {
                this.uploadFiles(Array.prototype.slice.call(this.fileInput.files))
                this.fileInput.value = ''
            })
            area.addEventListener('dragover', e => {
                if (!dtHasFiles(e.dataTransfer)) return
                e.preventDefault()
                this.root.classList.add('ye--drop')
            })
            area.addEventListener('dragleave', e => {
                if (e.target == area) this.root.classList.remove('ye--drop')
            })
            area.addEventListener('drop', e => {
                if (!dtHasFiles(e.dataTransfer)) return
                e.preventDefault()
                this.root.classList.remove('ye--drop')
                const files = imageFilesFrom(e.dataTransfer)
                if (files.length == 0) return
                const r = rangeFromPoint(e.clientX, e.clientY)
                if (r && area.contains(r.startContainer)) { const s = window.getSelection(); s.removeAllRanges(); s.addRange(r) }
                this.uploadFiles(files)
            })
        }

        this.docClick = e => {
            if (this.imgHandle && this.imgHandle.contains(e.target)) return
            if (this.imgBar && this.imgBar.contains(e.target)) return
            // A click into the text closes an open toolbar menu too, as one anywhere else does
            if (!this.owns(e.target) || this.area.contains(e.target)) this.closeMenus()
            if (this.ctxPop && !this.ctxPop.contains(e.target)) this.hideTableCtx()
            if (this.textPop && !this.textPop.contains(e.target)) this.closeTextMenu()
            if (this.formPop && !this.formPop.contains(e.target) && !this.root.contains(e.target)) {
                if (Date.now() - (this.formOpenTs || 0) >= 400) this.hideFormPop()
            }
            if (!this.root.contains(e.target) && !(this.ctxPop && this.ctxPop.contains(e.target))) this.deselectImage()
        }

        this.ctxDismiss = e => {
            const inside = [this.textMenuEl, this.textPop, this.ctxPop].some(el => el && e && e.target instanceof Node && el.contains(e.target))
            if (inside) return
            this.hideTableCtx(); this.closeTextMenu(); this.closeMenus(); if (this.selectedImg) this.showImgHandle()
            this.followPopups()
        }
    }

    // Sizes and fonts the editor never sets itself come only from Chrome copying computed looks: they go,
    // and a span left with nothing goes with them
    dropComputedSpans () {
        this.area.querySelectorAll('span[style]').forEach(span => {
            ['font-size', 'font-family', 'line-height', 'letter-spacing', 'font-weight', 'font-style'].forEach(p => span.style.removeProperty(p))
            if (span.getAttribute('style').trim() == '') {
                span.removeAttribute('style')
                if (span.attributes.length == 0) span.replaceWith(...span.childNodes)
            }
        })
    }

    // A selected picture: Delete or Backspace takes it out, any other key lets it go
    imageKey (e) {
        const img = this.selectedImg
        if (img == null || e.ctrlKey || e.metaKey || e.altKey) return false
        if (e.key == 'Backspace' || e.key == 'Delete') {
            e.preventDefault()
            this.imageOp('img-del', img)
            return true
        }
        if ((e.key || '').length == 1 || e.key == 'Enter') this.deselectImage()
        return false
    }

    // Find and a dialog of the standalone build stand by the editor: a scroll takes them along
    followPopups () {
        const top = this.root.getBoundingClientRect().top
        const shift = this.popTop == null ? 0 : top - this.popTop
        this.popTop = top
        if (shift == 0) return
        ;[this.findPop, this.formPop].forEach(pop => {
            if (pop && pop.classList.contains('ye-popup')) pop.style.top = (parseFloat(pop.style.top) || 0) + shift + 'px'
        })
    }

    listenGlobal (on) {
        if (this.onClick == null || !!this.globalOn == on) return
        this.globalOn = on
        const m = on ? 'addEventListener' : 'removeEventListener'
        document[m]('mousedown', this.onMousedown)
        document[m]('change', this.onChange)
        document[m]('keydown', this.onHexKey)
        document[m]('keydown', this.onUndoKey)
        if (!on && lastEditor == this) lastEditor = null
        document[m]('click', this.onClick)
        document[m]('mouseover', this.onMouseover)
        document[m]('focusin', this.onMouseover)
        document[m]('click', this.docClick)
        window[m]('scroll', this.ctxDismiss, true)
        window[m]('resize', this.ctxDismiss)
    }
}
