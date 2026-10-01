export const withPrompt = (Base) => class extends Base {
    promptPop (opts) {
        this.saveRange()
        this.formOpenTs = Date.now()
        let pop = this.formPop
        const fresh = pop == null
        if (fresh) {
            pop = this.makePopup('ye-formpop')
            this.formPop = pop
            // Escape from its buttons and checkbox too, not only from the fields
            pop.addEventListener('keydown', e => { if (e.key == 'Escape' && this.formPop == pop) { e.preventDefault(); this.hideFormPop() } })
        }
        const first = this.fillForm(pop, opts)
        if (this.nextFormAnchor) {
            this.placePopupAt(pop, this.nextFormAnchor.x, this.nextFormAnchor.y)
            this.nextFormAnchor = null
        } else {
            this.placePopupBelow(pop, (this.toolbar || this.area).getBoundingClientRect(), 'left')
        }
        if (fresh) this.revealPopup(pop)
        this.popTop = this.root.getBoundingClientRect().top
        if (first) { try { first.focus({ preventScroll: true }) } catch (e) { first.focus() } if (first.select) first.select() }
    }

    fillForm (pop, opts) {
        pop.innerHTML = ''
        const inputs = (opts.fields || []).map(f => {
            if (f.type == 'checkbox') {
                const label = document.createElement('label')
                label.className = 'ye-formpop__check'
                const cb = document.createElement('input')
                cb.type = 'checkbox'
                cb.checked = !!f.checked
                label.appendChild(cb)
                label.appendChild(document.createTextNode(' ' + (f.label || '')))
                pop.appendChild(label)
                return cb
            }
            const inp = document.createElement('input')
            inp.type = 'text'
            inp.className = 'ye-formpop__input'
            inp.placeholder = f.placeholder || ''
            inp.setAttribute('aria-label', inp.placeholder)
            inp.value = f.value || ''
            pop.appendChild(inp)
            return inp
        })
        const err = document.createElement('div')
        err.className = 'ye-formpop__err'
        pop.appendChild(err)
        const row = document.createElement('div')
        row.className = 'ye-formpop__row'
        const cancel = document.createElement('button')
        cancel.type = 'button'
        cancel.className = 'ye-formpop__btn'
        cancel.textContent = this.t('Cancel')
        const ok = document.createElement('button')
        ok.type = 'button'
        ok.className = 'ye-formpop__btn ye-formpop__btn--ok'
        ok.textContent = this.t('OK')
        row.appendChild(cancel)
        row.appendChild(ok)
        pop.appendChild(row)
        const textInputs = inputs.filter(i => i.type != 'checkbox')
        const editor = this
        function submit () {
            const vals = inputs.map(i => i.type == 'checkbox' ? i.checked : i.value.trim())
            editor.restoreRange()
            editor.area.focus()
            const msg = opts.onSubmit(vals)
            if (msg) { err.textContent = msg; err.classList.add('is-shown'); (textInputs[0] || inputs[0]).focus() }
            else editor.hideFormPop()
        }
        ok.addEventListener('mousedown', e => { e.preventDefault(); submit() })
        cancel.addEventListener('mousedown', e => { e.preventDefault(); this.hideFormPop() })
        // Enter or Space on a focused button: a click with no mouse behind it
        ok.addEventListener('click', e => { if (e.detail == 0) submit() })
        cancel.addEventListener('click', e => { if (e.detail == 0) this.hideFormPop() })
        inputs.forEach(i => i.addEventListener('keydown', e => {
            if (e.key == 'Enter') { e.preventDefault(); submit() }
            else if (e.key == 'Escape') { e.preventDefault(); this.hideFormPop() }
        }))
        return textInputs[0] || inputs[0]
    }

    hideFormPop () {
        if (this.formPop == null) return
        const pop = this.formPop
        this.formPop = null
        // Escape or Cancel: typing goes on in the text, not in the hidden field
        if (pop.contains(document.activeElement)) this.restoreRange()
        this.dismissFormPop(pop)
    }

    dismissFormPop (pop) {
        this.dismissPopup(pop)
    }
}
