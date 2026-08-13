export const withPopup = (Base) => class extends Base {
    makePopup (extra) {
        const el = document.createElement('div')
        el.className = 'y-context-menu is-hidden' + (extra ? ' ' + extra : '')
        document.body.appendChild(el)
        return el
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
