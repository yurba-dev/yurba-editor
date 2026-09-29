import { DANGER_OPS, IMAGE_OPS, LINK_OPS, TABLE_OPS } from '../helpers/constants.js'

export const withYurbaUI = (Base) => class extends Base {
    uiCtxItems (items) {
        return items.map(item => item.separator ? { separator: true } : {
            icon: this.ctxIcon(item),
            label: this.t(item.label || ''),
            className: [item.danger ? 'y-dropdown__item--danger' : '', item.className || ''].join(' ').trim(),
            children: Array.isArray(item.children) && item.children.length > 0 ? this.uiCtxItems(item.children) : null,
            onClick: () => this.runCtxItem(item),
        })
    }

    uiOps (ops, run) {
        return ops.map(op => op[0] == '|' ? { separator: true } : {
            icon: this.renderIcon(op[0]),
            label: this.t(op[1]),
            className: DANGER_OPS.includes(op[0]) ? 'y-dropdown__item--danger' : '',
            onClick: () => {
                this.restoreRange()
                run(op[0])
            },
        })
    }

    openTextMenu (x, y) {
        this.closeTextMenu()
        this.saveRange()
        const menu = new YurbaUI.ContextMenu(this.uiCtxItems(this.contextMenuItems || []), {
            onClose: () => {
                if (this.textMenu != menu) return
                this.textMenu = null
                this.textMenuEl = null
            },
        })
        this.textMenu = menu
        this.textMenuEl = menu.open(x, y, this.area)
    }

    closeTextMenu () {
        const menu = this.textMenu
        this.textMenu = null
        this.textMenuEl = null
        if (menu) menu.close()
    }

    showCtx (x, y, kind) {
        this.hideTableCtx()
        this.saveRange()
        let items
        if (kind == 'link') items = this.uiOps(LINK_OPS, op => { this.linkOp(op); this.sync() })
        else if (kind == 'img') items = this.uiOps(IMAGE_OPS, op => this.imageOp(op))
        else items = this.uiOps(TABLE_OPS, op => { this.area.focus(); this.tableOp(op); this.sync() })
        const menu = new YurbaUI.ContextMenu(items, {
            onClose: () => {
                if (this.ctxMenu != menu) return
                this.ctxMenu = null
                this.ctxPop = null
            },
        })
        this.ctxMenu = menu
        this.ctxAnchorPos = { x, y }
        this.ctxPop = menu.open(x, y, this.area)
    }

    hideTableCtx () {
        const menu = this.ctxMenu
        this.ctxMenu = null
        this.ctxPop = null
        if (menu) menu.close()
    }

    promptPop (opts) {
        this.saveRange()
        this.formOpenTs = Date.now()
        this.nextFormAnchor = null
        this.hideFormPop()
        const form = document.createElement('div')
        form.className = 'ye-formpop'
        const first = this.fillForm(form, opts)
        if (first) first.setAttribute('autofocus', '')
        const modal = new YurbaUI.Modal({
            compact: true,
            components: [{ content: form, area: 'body' }],
            onClose: () => {
                if (this.formModal != modal) return
                this.formModal = null
                this.formPop = null
            },
        })
        this.formModal = modal
        this.formPop = form
        modal.show()
        if (first && first.select) setTimeout(() => first.select(), 60)
    }

    dismissFormPop () {
        const modal = this.formModal
        this.formModal = null
        if (modal) modal.hide()
    }

    openFindPop () {
        if (this.findPop) { this.findInput.focus(); this.findInput.select(); return }
        const pop = document.createElement('div')
        pop.className = 'ye-findpop'
        this.fillFindPop(pop)
        this.findInput.setAttribute('autofocus', '')
        const modal = new YurbaUI.Modal({
            compact: true,
            modeless: true,
            components: [
                { content: new YurbaUI.Title(this.t('Find & replace')), area: 'header' },
                { content: pop, area: 'body' },
            ],
            onClose: () => { if (this.findModal == modal) this.hideFindPop() },
        })
        this.findModal = modal
        modal.show()
        setTimeout(() => { if (this.findInput) this.findInput.select() }, 60)
        this.runFind()
    }

    dismissFindPop () {
        const modal = this.findModal
        this.findModal = null
        if (modal) modal.hide()
    }

    wire () {
        super.wire()
        this.toolbarMenus = []
        this.querySelectorAll('[data-ye-menu]').forEach(menu => {
            const toggle = menu.querySelector('[data-ye-menu-toggle]')
            const pop = menu._pop
            if (toggle == null || pop == null) return
            const panel = pop.hasAttribute('data-ye-table-pop') || pop.querySelector('.ye-swatch') != null
            const dropdown = panel
                ? new YurbaUI.Dropdown([], {
                    trigger: toggle,
                    content: pop,
                    onOpen: () => { if (pop.hasAttribute('data-ye-table-pop')) this.buildTablePop(pop) },
                })
                : new YurbaUI.Dropdown(() => Array.from(pop.querySelectorAll('.ye-menu__item')).map(button => ({
                    label: button.innerHTML,
                    className: button.className.split(' ').filter(c => c.startsWith('ye-menu__item--')).join(' '),
                    onClick: () => this.toolbarItem(button),
                })), { trigger: toggle })
            dropdown.render()
            this.toolbarMenus.push(dropdown)
        })
    }

    toolbarItem (button) {
        if (button.hasAttribute('data-ye-upload')) {
            this.saveRange()
            this.fileInput.click()
            return
        }
        this.restoreRange()
        this.area.focus()
        this.run(button.dataset.cmd, button.dataset.arg)
        this.sync()
        this.updateStates()
    }

    closeMenus () {
        (this.toolbarMenus || []).forEach(dropdown => dropdown.close())
        super.closeMenus()
    }
}
