export const DROP = { SCRIPT: 1, STYLE: 1, OBJECT: 1, EMBED: 1, APPLET: 1, PARAM: 1, FRAME: 1, FRAMESET: 1, NOSCRIPT: 1, NOEMBED: 1, NOFRAMES: 1, XMP: 1, PLAINTEXT: 1, TEMPLATE: 1, LINK: 1, META: 1, HEAD: 1, TITLE: 1, BASE: 1, FORM: 1, INPUT: 1, BUTTON: 1, TEXTAREA: 1, SELECT: 1, OPTION: 1, SVG: 1, MATH: 1 }

export const ALLOWED = { P: 1, DIV: 1, BR: 1, HR: 1, STRONG: 1, B: 1, EM: 1, I: 1, U: 1, S: 1, SUB: 1, SUP: 1, A: 1, SPAN: 1, UL: 1, OL: 1, LI: 1, BLOCKQUOTE: 1, H1: 1, H2: 1, H3: 1, H4: 1, CODE: 1, PRE: 1, IMG: 1, FIGURE: 1, FIGCAPTION: 1, IFRAME: 1, TABLE: 1, THEAD: 1, TBODY: 1, TR: 1, TH: 1, TD: 1 }

export const ATTRS = { a: ['href', 'title', 'target'], img: ['src', 'alt', 'title', 'width', 'height'], iframe: ['src', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder', 'title'], td: ['colspan', 'rowspan'], th: ['colspan', 'rowspan'] }

export const STYLE_PROPS = { p: ['text-align', 'margin-left'], div: ['text-align', 'margin-left'], h1: ['text-align', 'margin-left'], h2: ['text-align', 'margin-left'], h3: ['text-align', 'margin-left'], h4: ['text-align', 'margin-left'], li: ['text-align', 'margin-left'], blockquote: ['text-align', 'margin-left'], pre: ['text-align', 'margin-left'], td: ['text-align'], th: ['text-align'], span: ['color', 'background-color'], b: ['color', 'background-color'], strong: ['color', 'background-color'], i: ['color', 'background-color'], em: ['color', 'background-color'], u: ['color', 'background-color'], s: ['color', 'background-color'], a: ['color', 'background-color'], code: ['color', 'background-color'], sub: ['color', 'background-color'], sup: ['color', 'background-color'], img: ['width', 'height', 'float'], figure: ['width', 'float'], figcaption: ['text-align'], table: ['width'] }

export const CLASS_ALLOWED = ['ye-table--no-grid']

export const IFRAME_ALLOW = ['accelerometer', 'autoplay', 'clipboard-write', 'encrypted-media', 'fullscreen', 'gyroscope', 'picture-in-picture', 'web-share']

export const EMBED_HOSTS = ['youtube.com', 'www.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com', 'player.vimeo.com']

export const STATEFUL = ['bold', 'italic', 'underline', 'strikeThrough', 'insertUnorderedList', 'insertOrderedList', 'subscript', 'superscript']

export const BLOCK_SEL = 'p,div,h1,h2,h3,h4,li,blockquote,pre,td,th'

export const ICONS = {
    undo: 'undo', redo: 'redo',
    bold: 'format_bold', italic: 'format_italic', underline: 'format_underlined', strike: 'format_strikethrough',
    sup: 'superscript', sub: 'subscript',
    lowercase: 'lowercase', capitalize: 'match_case', uppercase: 'uppercase',
    alignleft: 'format_align_left', aligncenter: 'format_align_center', alignright: 'format_align_right', alignjustify: 'format_align_justify',
    ul: 'format_list_bulleted', ol: 'format_list_numbered',
    outdent: 'format_indent_decrease', indent: 'format_indent_increase',
    link: 'link', image: 'image', video: 'smart_display',
    hr: 'horizontal_rule', blockquote: 'format_quote',
    code: 'code', codeblock: 'code_blocks',
    clear: 'format_clear', source: 'code', fullscreen: 'fullscreen',
    table: 'table', find: 'search',
    'row-above': 'arrow_upward', 'row-below': 'arrow_downward', 'col-left': 'arrow_back', 'col-right': 'arrow_forward',
    'row-del': 'delete', 'col-del': 'delete', header: 'toolbar', grid: 'border_all', del: 'delete_forever',
    'cell-left': 'format_align_left', 'cell-center': 'format_align_center', 'cell-right': 'format_align_right',
    'merge-right': 'merge', 'merge-down': 'merge', split: 'call_split',
    edit: 'edit', open: 'open_in_new', remove: 'link_off',
    'align-left': 'format_image_left', 'align-center': 'format_align_center', 'align-right': 'format_image_right',
    'align-none': 'format_align_justify', alt: 'title', 'img-del': 'delete_forever', caption: 'subtitles', size: 'photo_size_select_large',
    'find-prev': 'keyboard_arrow_up', 'find-next': 'keyboard_arrow_down'
}

export const DEFS = {
    undo: { cmd: 'undo', title: 'Undo' },
    redo: { cmd: 'redo', title: 'Redo' },
    bold: { cmd: 'bold', title: 'Bold', mod: 'bold' },
    italic: { cmd: 'italic', title: 'Italic', mod: 'italic' },
    underline: { cmd: 'underline', title: 'Underline', mod: 'underline' },
    strike: { cmd: 'strikeThrough', title: 'Strikethrough', mod: 'strike' },
    lowercase: { cmd: 'ye-lower', title: 'lowercase' },
    capitalize: { cmd: 'ye-capitalize', title: 'Capitalize' },
    uppercase: { cmd: 'ye-upper', title: 'UPPERCASE' },
    sup: { cmd: 'superscript', title: 'Superscript' },
    sub: { cmd: 'subscript', title: 'Subscript' },
    alignleft: { cmd: 'ye-align', arg: 'left', title: 'Align left' },
    aligncenter: { cmd: 'ye-align', arg: 'center', title: 'Align center' },
    alignright: { cmd: 'ye-align', arg: 'right', title: 'Align right' },
    alignjustify: { cmd: 'ye-align', arg: 'justify', title: 'Justify' },
    ul: { cmd: 'insertUnorderedList', title: 'Bulleted list' },
    ol: { cmd: 'insertOrderedList', title: 'Numbered list' },
    outdent: { cmd: 'ye-outdent', title: 'Decrease indent' },
    indent: { cmd: 'ye-indent', title: 'Increase indent' },
    link: { cmd: 'ye-link', title: 'Insert link' },
    image: { cmd: 'ye-image', title: 'Insert image' },
    video: { cmd: 'ye-video', title: 'Embed video' },
    hr: { cmd: 'ye-hr', title: 'Horizontal rule' },
    blockquote: { cmd: 'formatBlock', arg: 'blockquote', title: 'Quote' },
    code: { cmd: 'ye-code', title: 'Inline code' },
    codeblock: { cmd: 'ye-codeblock', title: 'Code block' },
    clear: { cmd: 'ye-clear', title: 'Clear formatting' },
    find: { cmd: 'ye-find', title: 'Find & replace' },
    source: { cmd: 'ye-source-toggle', title: 'HTML source' },
    fullscreen: { cmd: 'ye-fullscreen', title: 'Fullscreen' }
}

export const SHORTCUTS = {
    undo: 'Ctrl+Z', redo: 'Ctrl+Y', bold: 'Ctrl+B', italic: 'Ctrl+I', underline: 'Ctrl+U',
    strike: 'Ctrl+Shift+X', link: 'Ctrl+K', ul: 'Ctrl+Shift+8', ol: 'Ctrl+Shift+7', find: 'Ctrl+F'
}

export const LINK_OPS = [['edit', 'Edit link'], ['open', 'Open'], ['remove', 'Remove link']]

// "size" opens the IMG_SIZES choices
export const IMAGE_OPS = [
    ['size', 'Size'],
    ['|'],
    ['align-left', 'Float left'], ['align-center', 'Center'], ['align-right', 'Float right'], ['align-none', 'Inline'],
    ['|'],
    ['caption', 'Caption'], ['alt', 'Alt text…'], ['img-del', 'Delete image']
]

// Widths a picture is given in one press, as shares of the text; a drag also stops at two thirds
export const IMG_SIZES = [25, 33, 50, 75, 100]

export const IMG_SNAPS = [25, 33, 50, 66, 75, 100]

export const TABLE_OPS = [
    ['row-above', 'Row above'], ['row-below', 'Row below'], ['col-left', 'Col left'], ['col-right', 'Col right'],
    ['|'],
    ['cell-left', 'Align left'], ['cell-center', 'Align center'], ['cell-right', 'Align right'],
    ['|'],
    ['merge-right', 'Merge right'], ['merge-down', 'Merge down'], ['split', 'Split cell'],
    ['|'],
    ['row-del', 'Delete row'], ['col-del', 'Delete col'],
    ['|'],
    ['header', 'Header row'], ['grid', 'Toggle grid'], ['del', 'Delete table']
]

export const DANGER_OPS = ['remove', 'img-del', 'del']

export const HEADINGS = { p: 'Paragraph', h1: 'Heading 1', h2: 'Heading 2', h3: 'Heading 3', h4: 'Heading 4' }

export const TEXT_COLORS = ['#111827', '#374151', '#6b7280', '#9ca3af', '#dc2626', '#ea580c', '#d97706', '#16a34a', '#0d6efd', '#4f46e5', '#9333ea', '#db2777']

export const MARK_COLORS = ['#fef08a', '#fed7aa', '#fecaca', '#bbf7d0', '#bae6fd', '#ddd6fe', '#fbcfe8', '#e5e7eb']

export const DEFAULT_TOOLBAR = [
    'undo', 'redo', '|', 'heading', '|',
    'bold', 'italic', 'underline', 'strike', 'lowercase', 'capitalize', 'uppercase', '|',
    'forecolor', 'backcolor', '|',
    'alignleft', 'aligncenter', 'alignright', '|',
    'ul', 'ol', 'outdent', 'indent', '|',
    'link', 'image', 'video', 'table', 'hr', '|',
    'blockquote', 'codeblock', 'clear', 'find', '|',
    'source', 'fullscreen'
]

// Context actions share icon keys with the toolbar; clear here empties the editor, so it gets its own
export const CTX_ICON_KEYS = { selectAll: 'select-all', clear: 'clear-all', clearFormat: 'clear', lower: 'lowercase', upper: 'uppercase' }

export const DEFAULT_CONTEXT_MENU = [
    { action: 'selectAll', icon: 'select_all', label: 'Select all' },
    { action: 'copy', icon: 'content_copy', label: 'Copy' },
    { action: 'paste', icon: 'content_paste', label: 'Paste' },
    { action: 'clear', icon: 'delete_sweep', label: 'Clear' },
    { separator: true },
    {
        key: 'formatting',
        icon: 'format_size',
        label: 'Formatting',
        children: [
            { action: 'clearFormat', icon: 'format_clear', label: 'Clear formatting' },
            { separator: true },
            { action: 'bold', icon: 'format_bold', label: 'Bold' },
            { action: 'italic', icon: 'format_italic', label: 'Italic' },
            { action: 'underline', icon: 'format_underlined', label: 'Underline' },
            { action: 'strike', icon: 'format_strikethrough', label: 'Strikethrough' },
            { action: 'code', icon: 'code', label: 'Inline code' },
            { separator: true },
            { action: 'link', icon: 'link', label: 'Link…' }
        ]
    },
    {
        key: 'case',
        icon: 'text_fields',
        label: 'Case',
        children: [
            { action: 'lower', icon: 'lowercase', label: 'Lowercase' },
            { action: 'capitalize', icon: 'match_case', label: 'Capitalize' },
            { action: 'upper', icon: 'uppercase', label: 'Uppercase' }
        ]
    },
    { separator: true },
    { action: 'find', icon: 'search', label: 'Find & replace' }
]
