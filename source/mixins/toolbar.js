import { DEFS, HEADINGS, ICONS, MARK_COLORS, SHORTCUTS, TEXT_COLORS } from '../helpers/constants.js'
import { escapeHtml } from '../helpers/utils.js'

export const withToolbar = (Base) => class extends Base {
    iconOr (key, fallback) {
        return this.icons && this.icons[key] != null ? this.icons[key] : fallback
    }

    renderIcon (key) {
        return this.iconOr(key, '<span class="material-symbols-rounded ye-ico">' + (ICONS[key] || '') + '</span>')
    }

    buildToolbar (tokens) {
        const editor = this
        function t (s) {
            return escapeHtml(editor.t(s))
        }
        function toggle (cls, title, inner) {
            return '<button type="button" class="ye-toolbar__btn' + cls + '" data-ye-menu-toggle aria-haspopup="true" aria-expanded="false" title="' + t(title) + '" aria-label="' + t(title) + '">' + inner + '</button>'
        }
        let html = '<div class="ye-toolbar" role="toolbar">'
        tokens.forEach(token => {
            if (token == '|') {
                html += '<span class="ye-toolbar__sep" aria-hidden="true"></span>'
            } else if (token == 'image' && this.uploadEnabled) {
                html += '<div class="ye-menu" data-ye-menu>' + toggle('', 'Insert image', this.renderIcon('image')) + '<div class="ye-menu__pop"><button type="button" class="ye-menu__item" data-ye-upload>' + t('Upload image…') + '</button><button type="button" class="ye-menu__item" data-cmd="ye-image">' + t('By URL…') + '</button></div></div>'
            } else if (token == 'heading') {
                html += '<div class="ye-menu" data-ye-menu>' + toggle(' ye-toolbar__btn--wide', 'Paragraph style', '<span data-ye-heading-label>' + t('Paragraph') + '</span><span class="ye-caret" aria-hidden="true">' + this.iconOr('caret', '▾') + '</span>') + '<div class="ye-menu__pop">'
                Object.keys(HEADINGS).forEach(tag => {
                    html += '<button type="button" class="ye-menu__item ye-menu__item--' + tag + '" data-cmd="formatBlock" data-arg="' + tag + '">' + t(HEADINGS[tag]) + '</button>'
                })
                html += '</div></div>'
            } else if (token == 'forecolor' || token == 'backcolor') {
                const isFore = token == 'forecolor'
                const colors = isFore ? TEXT_COLORS : MARK_COLORS
                const cmd = isFore ? 'ye-forecolor' : 'ye-backcolor'
                html += '<div class="ye-menu" data-ye-menu>' + toggle(' ye-toolbar__btn--' + (isFore ? 'fore' : 'back'), isFore ? 'Text color' : 'Highlight', this.iconOr(token, 'A')) + '<div class="ye-menu__pop ye-menu__pop--colors">'
                colors.forEach(c => {
                    html += '<button type="button" class="ye-swatch" style="background: ' + c + '" data-cmd="' + cmd + '" data-arg="' + c + '" title="' + c + '" aria-label="' + c + '"></button>'
                })
                html += '<button type="button" class="ye-swatch ye-swatch--none" data-cmd="' + cmd + '" data-arg="" title="' + t('Remove') + '" aria-label="' + t('Remove') + '">' + this.iconOr('color-none', '✕') + '</button>'
                html += '<div class="ye-color-custom" data-ye-color="' + cmd + '"><input type="color" class="ye-color-native" value="#000000" title="' + t('Custom color') + '" aria-label="' + t('Custom color') + '"><input type="text" class="ye-color-hex" placeholder="#RRGGBB" maxlength="9" spellcheck="false" aria-label="' + t('Custom color') + '"></div>'
                html += '</div></div>'
            } else if (token == 'table') {
                html += '<div class="ye-menu" data-ye-menu>' + toggle('', 'Table', this.renderIcon('table')) + '<div class="ye-menu__pop ye-menu__pop--table" data-ye-table-pop></div></div>'
            } else if (DEFS[token]) {
                const d = DEFS[token]
                const tip = t(d.title) + (SHORTCUTS[token] ? ' (' + SHORTCUTS[token] + ')' : '')
                html += '<button type="button" class="ye-toolbar__btn' + (d.mod ? ' ye-toolbar__btn--' + d.mod : '') + '" data-cmd="' + d.cmd + '"' + (d.arg != null ? ' data-arg="' + d.arg + '"' : '') + ' title="' + tip + '" aria-label="' + t(d.title) + '">' + this.renderIcon(token) + '</button>'
            }
        })
        return html + '</div>'
    }
}
