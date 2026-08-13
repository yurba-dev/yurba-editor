import { DEFS, HEADINGS, ICONS, MARK_COLORS, SHORTCUTS, TEXT_COLORS } from '../helpers/constants.js'

export const withToolbar = (Base) => class extends Base {
    renderIcon (key) {
        if (this.icons && this.icons[key] != null) return this.icons[key]
        return '<span class="material-symbols-rounded ye-ico">' + (ICONS[key] || '') + '</span>'
    }

    buildToolbar (tokens) {
        let html = '<div class="ye-toolbar">'
        tokens.forEach(token => {
            if (token == '|') {
                html += '<span class="ye-toolbar__sep" aria-hidden="true"></span>'
            } else if (token == 'image' && this.uploadEnabled) {
                html += '<div class="ye-menu" data-ye-menu><button type="button" class="ye-toolbar__btn" data-ye-menu-toggle title="Insert image" aria-label="Insert image">' + this.renderIcon('image') + '</button><div class="ye-menu__pop"><button type="button" class="ye-menu__item" data-ye-upload>Upload image…</button><button type="button" class="ye-menu__item" data-cmd="ye-image">By URL…</button></div></div>'
            } else if (token == 'heading') {
                html += '<div class="ye-menu" data-ye-menu><button type="button" class="ye-toolbar__btn ye-toolbar__btn--wide" data-ye-menu-toggle title="Paragraph style"><span data-ye-heading-label>Paragraph</span><span class="ye-caret" aria-hidden="true">▾</span></button><div class="ye-menu__pop">'
                Object.keys(HEADINGS).forEach(tag => {
                    html += '<button type="button" class="ye-menu__item ye-menu__item--' + tag + '" data-cmd="formatBlock" data-arg="' + tag + '">' + HEADINGS[tag] + '</button>'
                })
                html += '</div></div>'
            } else if (token == 'forecolor' || token == 'backcolor') {
                const isFore = token == 'forecolor'
                const colors = isFore ? TEXT_COLORS : MARK_COLORS
                const cmd = isFore ? 'ye-forecolor' : 'ye-backcolor'
                html += '<div class="ye-menu" data-ye-menu><button type="button" class="ye-toolbar__btn ye-toolbar__btn--' + (isFore ? 'fore' : 'back') + '" data-ye-menu-toggle title="' + (isFore ? 'Text color' : 'Highlight') + '">A</button><div class="ye-menu__pop ye-menu__pop--colors">'
                colors.forEach(c => {
                    html += '<button type="button" class="ye-swatch" style="background: ' + c + '" data-cmd="' + cmd + '" data-arg="' + c + '" title="' + c + '"></button>'
                })
                html += '<button type="button" class="ye-swatch ye-swatch--none" data-cmd="' + cmd + '" data-arg="" title="Remove">✕</button>'
                html += '<div class="ye-color-custom" data-ye-color="' + cmd + '"><input type="color" class="ye-color-native" value="#000000" title="Custom color"><input type="text" class="ye-color-hex" placeholder="#RRGGBB" maxlength="9" spellcheck="false"></div>'
                html += '</div></div>'
            } else if (token == 'table') {
                html += '<div class="ye-menu" data-ye-menu><button type="button" class="ye-toolbar__btn" data-ye-menu-toggle title="Table">' + this.renderIcon('table') + '</button><div class="ye-menu__pop ye-menu__pop--table" data-ye-table-pop></div></div>'
            } else if (DEFS[token]) {
                const d = DEFS[token]
                const tip = d.title + (SHORTCUTS[token] ? ' (' + SHORTCUTS[token] + ')' : '')
                html += '<button type="button" class="ye-toolbar__btn' + (d.mod ? ' ye-toolbar__btn--' + d.mod : '') + '" data-cmd="' + d.cmd + '"' + (d.arg != null ? ' data-arg="' + d.arg + '"' : '') + ' title="' + tip + '" aria-label="' + d.title + '">' + this.renderIcon(token) + '</button>'
            }
        })
        return html + '</div>'
    }
}
