import { HEADINGS, STATEFUL } from '../helpers/constants.js'

export const withView = (Base) => class extends Base {
    markActive (cmd, on) {
        const btn = this.root.querySelector('.ye-toolbar__btn[data-cmd="' + cmd + '"]')
        if (btn) { btn.classList.toggle('is-active', on); btn.setAttribute('aria-pressed', String(on)) }
    }

    toggleSource () {
        // Pictures still uploading are previews the HTML view cannot hold: they would come back empty
        if (!this.root.classList.contains('ye--source') && this.uploading) return
        this.deselectImage()
        this.flushHistory()
        // Read before the switch: in the HTML view getHTML() reads the (still empty) HTML field
        const html = this.root.classList.contains('ye--source') ? '' : this.getHTML()
        const on = this.root.classList.toggle('ye--source')
        if (on) {
            this.sourceView.value = html
            this.sourceView.hidden = false
            this.area.hidden = true
        } else {
            this.area.innerHTML = this.clean(this.sourceView.value)
            this.area.hidden = false
            this.sourceView.hidden = true
            this.enforceLimit(true)
            this.sync()
            // What was changed in the HTML is one step back
            this.recordState()
            this.area.focus({ preventScroll: true })
        }
        this.markActive('ye-source-toggle', on)
    }

    toggleFull () {
        const on = this.root.classList.toggle('ye--full')
        document.body.classList.toggle('ye-lock', on)
        // A height set by the options would stop the text short of the screen and its scroll
        if (on) {
            this.savedMaxHeight = this.area.style.maxHeight
            this.area.style.maxHeight = ''
        } else if (this.savedMaxHeight) {
            this.area.style.maxHeight = this.savedMaxHeight
        }
        this.markActive('ye-fullscreen', on)
    }

    updateStates () {
        const btns = this.root.querySelectorAll('.ye-toolbar__btn[data-cmd]')
        for (let i = 0; i < btns.length; i++) {
            const cmd = btns[i].dataset.cmd
            if (STATEFUL.indexOf(cmd) != -1) {
                let on = false
                try { on = document.queryCommandState(cmd) } catch (e) {}
                btns[i].classList.toggle('is-active', on)
                btns[i].setAttribute('aria-pressed', String(on))
            }
        }
        const anchor = (window.getSelection() && window.getSelection().anchorNode) || this.area
        const block = this.closestBlock(anchor) || this.area
        const align = block == this.area ? '' : (block.style.textAlign || '')
        const alignBtns = this.root.querySelectorAll('.ye-toolbar__btn[data-cmd="ye-align"]')
        for (let i = 0; i < alignBtns.length; i++) {
            const a = alignBtns[i].dataset.arg
            const on = align == a || (align == '' && a == 'left')
            alignBtns[i].classList.toggle('is-active', on)
            alignBtns[i].setAttribute('aria-pressed', String(on))
        }
        const label = this.root.querySelector('[data-ye-heading-label]')
        if (label) {
            const tag = block && block.tagName ? block.tagName.toLowerCase() : 'p'
            label.textContent = this.t(HEADINGS[tag] || 'Paragraph')
        }
    }
}
