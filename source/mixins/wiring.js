import { dtHasFiles, exec, imageFilesFrom } from '../helpers/utils.js'

export const withWiring = (Base) => class extends Base {
    wire () {
        const area = this.area

        area.addEventListener('beforeinput', e => {
            const t = e.inputType || ''
            this.inputBoundary = (t == 'insertText' && /\s/.test(e.data || '')) ||
                t == 'insertParagraph' || t == 'insertLineBreak' ||
                t == 'insertFromPaste' || t == 'insertFromDrop'
            if (!this.maxChars) return
            if (t.indexOf('insert') != 0) return
            const selLen = ((window.getSelection() || {}).toString ? window.getSelection().toString() : '').length
            const room = this.maxChars - (area.textContent.length - selLen)
            let add = 1
            if ((t == 'insertText' || t == 'insertReplacementText') && e.data != null) add = e.data.length
            else if (t == 'insertParagraph' || t == 'insertLineBreak') add = 0
            if (add > room) e.preventDefault()
        })
        area.addEventListener('input', () => {
            this.enforceLimit()
            this.sync()
            if (this.inputBoundary) { this.inputBoundary = false; this.recordState() }
        })
        area.addEventListener('blur', () => this.sync())
        area.addEventListener('keyup', () => this.updateStates())
        area.addEventListener('mouseup', () => this.updateStates())
        area.addEventListener('keydown', e => {
            if (this.inline && e.key == 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey) { e.preventDefault(); exec('insertLineBreak'); return }
            this.markdownShortcut(e)
            if ((e.ctrlKey || e.metaKey) && this.shortcut(e)) { e.preventDefault(); return }
            if (e.key == 'Escape') {
                this.hideTableCtx(); this.closeTextMenu(); this.hideFormPop(); this.hideFindPop(); this.deselectImage()
                if (this.root.classList.contains('ye--full')) this.toggleFull()
            }
        })

        area.addEventListener('contextmenu', e => {
            if (this.openCtxAt(e.target, e.clientX, e.clientY)) e.preventDefault()
        })

        area.addEventListener('click', e => {
            const img = e.target && e.target.closest ? e.target.closest('img') : null
            if (img && area.contains(img)) this.selectImage(img)
            else this.deselectImage()
        })

        let lpTimer = null, lpStart = null
        const clearLp = () => { if (lpTimer) { clearTimeout(lpTimer); lpTimer = null } }
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
            const imgs = this.uploadEnabled ? imageFilesFrom(data) : []
            if (imgs.length) { e.preventDefault(); this.uploadFiles(imgs); return }
            e.preventDefault()
            const html = data.getData('text/html')
            if (html) exec('insertHTML', this.clean(html, true))
            else exec('insertText', data.getData('text/plain'))
            this.enforceLimit()
            this.sync()
        })

        this.onMousedown = e => {
            if (!this.owns(e.target)) return
            this.saveRange()
            if (e.target.closest('.ye-toolbar__btn, .ye-menu__item, .ye-swatch, .ye-tableops button, .ye-grid__cell')) e.preventDefault()
        }
        document.addEventListener('mousedown', this.onMousedown)

        this.onChange = e => {
            if (!this.owns(e.target)) return
            const el = e.target.closest('.ye-color-native, .ye-color-hex')
            if (el == null) return
            this.applyCustomColor(el)
        }
        document.addEventListener('change', this.onChange)
        this.onHexKey = e => {
            if (!this.owns(e.target)) return
            if (e.key == 'Enter' && e.target.classList && e.target.classList.contains('ye-color-hex')) {
                e.preventDefault()
                this.applyCustomColor(e.target)
            }
        }
        document.addEventListener('keydown', this.onHexKey)

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
                    document.body.appendChild(pop)
                    menu.classList.add('is-open')
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
            }
        }
        document.addEventListener('click', this.onClick)

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
        document.addEventListener('mouseover', this.onMouseover)

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
                const r = document.caretRangeFromPoint ? document.caretRangeFromPoint(e.clientX, e.clientY) : null
                if (r) { const s = window.getSelection(); s.removeAllRanges(); s.addRange(r) }
                this.uploadFiles(files)
            })
        }

        this.docClick = e => {
            if (this.imgHandle && this.imgHandle.contains(e.target)) return
            if (!this.owns(e.target)) this.closeMenus()
            if (this.ctxPop && !this.ctxPop.contains(e.target)) this.hideTableCtx()
            if (this.textPop && !this.textPop.contains(e.target)) this.closeTextMenu()
            if (this.formPop && !this.formPop.contains(e.target) && !this.root.contains(e.target)) {
                if (Date.now() - (this.formOpenTs || 0) >= 400) this.hideFormPop()
            }
            if (!this.root.contains(e.target) && !(this.ctxPop && this.ctxPop.contains(e.target))) this.deselectImage()
        }
        document.addEventListener('click', this.docClick)

        this.ctxDismiss = () => { this.hideTableCtx(); this.closeTextMenu(); this.closeMenus(); if (this.selectedImg) this.showImgHandle() }
        window.addEventListener('scroll', this.ctxDismiss, true)
        window.addEventListener('resize', this.ctxDismiss)
    }
}
