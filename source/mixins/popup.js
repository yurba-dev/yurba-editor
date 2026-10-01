const THEME_TOKENS = ['--ye-surface', '--ye-surface-2', '--ye-border', '--ye-border-strong', '--ye-text', '--ye-text-soft', '--ye-muted', '--ye-accent', '--ye-accent-ink', '--ye-accent-soft', '--ye-on-accent', '--ye-hover', '--ye-fill', '--ye-danger', '--ye-danger-soft', '--ye-shadow']

export const withPopup = (Base) => class extends Base {
    makePopup (extra) {
        const el = document.createElement('div')
        el.className = 'ye-popup is-hidden' + (extra ? ' ' + extra : '')
        this.themePopup(el)
        document.body.appendChild(el)
        return el
    }

    // A popup lives in <body>, outside the editor that sets the theme (a dark one, say): it takes the values along
    themePopup (el) {
        const cs = getComputedStyle(this.root)
        THEME_TOKENS.forEach(name => {
            const v = cs.getPropertyValue(name)
            if (v) el.style.setProperty(name, v.trim())
        })
    }

    revealPopup (el) {
        void el.offsetWidth
        requestAnimationFrame(() => el.classList.remove('is-hidden'))
    }

    dismissPopup (el) {
        el.classList.add('is-hidden')
        setTimeout(() => el.remove(), 200)
    }

    placePopupAt (el, x, y) {
        const pad = 8
        const w = el.offsetWidth
        const h = el.offsetHeight
        let left = x
        let top = y
        if (left + w > window.innerWidth - pad) left = x - w
        if (left < pad) left = pad
        if (top + h > window.innerHeight - pad) top = y - h
        if (top < pad) top = pad
        el.style.left = left + 'px'
        el.style.top = top + 'px'
    }

    placePopupBelow (el, rect, align) {
        const pad = 8
        const w = el.offsetWidth
        const h = el.offsetHeight
        let left = align == 'right' ? rect.right - w : rect.left
        let top = rect.bottom + 4
        if (left + w > window.innerWidth - pad) left = window.innerWidth - w - pad
        if (left < pad) left = pad
        if (top + h > window.innerHeight - pad) top = Math.max(pad, window.innerHeight - h - pad)
        el.style.left = left + 'px'
        el.style.top = top + 'px'
    }
}
