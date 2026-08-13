import { HEADINGS, STATEFUL } from '../helpers/constants.js'

export const withView = (Base) => class extends Base {
    markActive (cmd, on) {
        const btn = this.root.querySelector('.ye-toolbar__btn[data-cmd="' + cmd + '"]')
        if (btn) btn.classList.toggle('is-active', on)
    }

    toggleSource () {
        const on = this.root.classList.toggle('ye--source')
        if (on) {
            this.sourceView.value = this.getHTML()
            this.sourceView.hidden = false
            this.area.hidden = true
        } else {
            this.area.innerHTML = this.clean(this.sourceView.value)
            this.area.hidden = false
            this.sourceView.hidden = true
            this.sync()
        }
        this.markActive('ye-source-toggle', on)
    }

    toggleFull () {
        const on = this.root.classList.toggle('ye--full')
        document.body.classList.toggle('ye-lock', on)
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
            }
        }
        const anchor = (window.getSelection() && window.getSelection().anchorNode) || this.area
        const block = this.closestBlock(anchor) || this.area
        const align = block == this.area ? '' : (block.style.textAlign || '')
        const alignBtns = this.root.querySelectorAll('.ye-toolbar__btn[data-cmd="ye-align"]')
        for (let i = 0; i < alignBtns.length; i++) {
            const a = alignBtns[i].dataset.arg
            alignBtns[i].classList.toggle('is-active', align == a || (align == '' && a == 'left'))
        }
        const label = this.root.querySelector('[data-ye-heading-label]')
        if (label) {
            const tag = block && block.tagName ? block.tagName.toLowerCase() : 'p'
            label.textContent = HEADINGS[tag] || 'Paragraph'
        }
    }
}
