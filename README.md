# YurbaEditor

A full-featured lightweight WYSIWYG editor in a single dependency-free file - rich text in, sanitized HTML out (pastes and `YurbaEditor.sanitize()` use the tag/attribute allowlist; `getHTML()` uses it too with `strict: true`, a looser mode by default).

Supports headings, inline formatting (bold, italic, underline, strike, super/subscript, color, highlight, case conversion), lists, blockquotes, inline code and code blocks, links, images (by URL, upload, drag-and-drop or paste), YouTube/Vimeo embeds, and tables - plus find & replace, undo/redo, fullscreen, HTML source view, live word/char count, markdown shortcuts, and a right-click formatting menu.

## Installation

```html
<link rel="stylesheet" href="/dist/yurba-editor.min.css">
<script src="/dist/yurba-editor.min.js"></script>
```

This is the standalone build. On a page with YurbaUI use the `.ui` build, see [Builds](#builds).

## Builds

Two builds of the same editor with the same API. They differ in who draws the menus and dialogs.

| Build | Files | Menus and dialogs |
|---|---|---|
| `yurba-editor` | `dist/yurba-editor.min.js`, `dist/yurba-editor.min.css` | Its own popups, no dependencies. For a page without YurbaUI |
| `yurba-editor.ui` | `dist/yurba-editor.ui.min.js`, `dist/yurba-editor.ui.min.css` | `YurbaUI.Dropdown` for toolbar menus, `YurbaUI.ContextMenu` for the right-click and link/image/table menus, `YurbaUI.Modal` for the link/image/video prompts and Find & replace, `YurbaUI.Scrollbar` instead of the native scrollbar of the text, the HTML view and the menus. For a page that loads YurbaUI |

Standalone:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0">
<link rel="stylesheet" href="/dist/yurba-editor.min.css">
<script src="/dist/yurba-editor.min.js"></script>
```

With YurbaUI (load it first: the build calls the `YurbaUI` global when an editor with toolbar menus is created and whenever a menu or dialog opens, with no fallback):

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0">
<link rel="stylesheet" href="/dist/yurba-ui.min.css">
<link rel="stylesheet" href="/dist/yurba-editor.ui.min.css">
<script src="/dist/yurba-ui.min.js"></script>
<script src="/dist/yurba-editor.ui.min.js"></script>
```

- Icons are Material Symbols Rounded, so the page loads that font (any built-in icon can be replaced with the `icons` option, see [Icons](#icons)).
- The standalone CSS styles the `.y-dropdown` classes of its right-click menu at zero specificity, so YurbaUI's CSS wins when both are on the page.
- Colors and radii follow the Yurba theme variables (`--yurba-main-color`, `--yurba-brand-color` and others) when the page defines them.

## Build

```bash
npm install
npm run build
```

Output in `dist/`: `yurba-editor.js`, `yurba-editor.min.js`, `yurba-editor.css`, `yurba-editor.min.css` (standalone) and `yurba-editor.ui.js`, `yurba-editor.ui.min.js`, `yurba-editor.ui.css`, `yurba-editor.ui.min.css` (with YurbaUI)

## Usage

`YurbaEditor` is a custom element (`<yurba-editor>`), created via the static `YurbaEditor.create()` factory. Pass `field` to enhance a `<textarea>` (it hides the control and keeps its value in sync), or `mount` to append it to a container.

```js
YurbaEditor.create({ field: 'textarea[name=body]' })
```

## API

### Static

| Method | Description |
|---|---|
| `YurbaEditor.create(config)` | Create a `<yurba-editor>` and return it. |
| `YurbaEditor.sanitize(html, opts?)` | Run the allowlist sanitizer on a string (`opts.strict: false` for the looser mode the editor uses by default). |
| `YurbaEditor.DEFAULT_TOOLBAR` | Default toolbar token list. |
| `YurbaEditor.DEFAULT_CONTEXT_MENU` | Default context-menu item list. |
| `YurbaEditor.EMBED_HOSTS` | Default `<iframe>` host allowlist. |

**Config options:**

| Key | Type | Default | Description |
|---|---|---|---|
| `field` | string \| Element | - | `<textarea>`/`<input>` to hide and keep in sync |
| `mount` | string \| Element | - | Container to append the editor into |
| `value` | string | field value | Initial HTML |
| `toolbar` | string[] \| false | full set | Toolbar tokens; `'\|'` is a separator; `false` hides it |
| `headings` | string[] | `['h1', 'h2', 'h3', 'h4']` | Heading levels offered by the paragraph style menu, the slash menu, Ctrl+Alt+digit and `#` in the text, e.g. `['h2', 'h3', 'h4']` for a page whose title is its only `<h1>`. Digits and `#` go to the allowed levels in order: with `h2`-`h4`, Ctrl+Alt+1 and `# ` give `<h2>`. HTML set or pasted in keeps its levels |
| `footer` | boolean | `true` | `false` hides the footer (brand + count) |
| `inline` | boolean | `false` | Enter inserts `<br>` (unless an earlier `keydown` listener called `preventDefault()`), blocks are flattened and images are dropped (except `glyphClass` ones) |
| `glyphClass` | string | - | Images with this class act as text glyphs (e.g. emoji): kept by the sanitizer and in inline mode, not selectable or resizable. Their `src` may also be a `data:image/` URL, such as an animated emoji's first frame drawn in the page |
| `placeholder` | string | `'Start writing…'` | Empty-state text |
| `minHeight` | number | `160` | Min editing height (px) |
| `height` | number | - | Max height before scroll (px) |
| `maxChars` | number | - | Character cap, counted in code points with glyph images as their `alt`. Inserts past it are clipped; text already over it (e.g. from `setHTML`) is kept for the user to shorten |
| `strict` | boolean | `false` | Run `getHTML()`/`setHTML()` through the same allowlist as pastes, instead of the looser mode that keeps unknown tags and attributes |
| `label` | string | placeholder | Accessible name of the editing area |
| `labels` | object | - | UI strings by their English text, e.g. `{ 'Find': 'Найти' }` |
| `contextMenu` | boolean \| array | built-in | Right-click menu; `false` disables, array customizes. Items are `{ label, icon, key, action \| onClick, children, separator, danger }`; `icon` is a Material Symbols name or your own HTML |
| `embedHosts` | string[] | YouTube/Vimeo | Allowed `<iframe>` hosts |
| `allowData` | boolean | `false` | Keep `data-*` attributes |
| `allowClasses` | boolean | `false` | Keep all `class` attributes |
| `uploadUrl` | string | - | Image upload endpoint (enables the upload UI) |
| `onImageUpload` | function | - | `file => Promise<url>` custom uploader |
| `imageSources` | array | `[]` | More items in the image menu: `{ label, pick }`, where `pick()` returns a URL, a list of URLs or a Promise of them (a gallery, a media library) |
| `imageUrl` | boolean | `true` | `false` leaves "By URL…" out of the image menu, for a host that keeps only pictures it uploaded itself |
| `imageAllowed` | function | - | `src => boolean`. A picture it refuses (pasted or dropped in with text from another site) is taken out at once and `onNotice` gets `'foreign-images'`, instead of showing now and being dropped by the host on save |
| `imageAlt` | boolean | `true` | `false` leaves "Alt text…" out of the image bar and menus, for a host that describes pictures by their captions |
| `onNotice` | function | - | `(type, text) => {}` shows what the editor has to tell (`'upload-failed'`, `'image-too-large'`, `'foreign-images'`), e.g. as a toast. Without it the editor uses `alert()` |
| `onFiles` | function | - | `(files, editor) => {}` takes files pasted with Ctrl+V or the context menu's Paste instead of the editor, e.g. to attach them to a message. The menu's Paste can only bring images: browsers don't give pages a file copied in the system file manager |
| `onChange` | function | - | `html => {}` on change |
| `onCount` | function | - | `({ words, chars }) => {}` on count change |
| `icons` | object | built-in | Override built-in icons, see [Icons](#icons) |
| `extraButtons` | array | - | Your own toolbar buttons, see [Extra buttons](#extra-buttons) |
| `linkProvider` | object | - | Finds pages to link: the link dialog and `[[` in the text search through it, see [Link provider](#link-provider) |
| `linkFields` | boolean | `true` | `false` leaves the Title and Open in new tab fields out of the link dialog and sets neither on a new link, for a host whose saved HTML keeps only `href` |

### Instance

| Method | Description |
|---|---|
| `getHTML()` | Sanitized HTML |
| `setHTML(html)` | Replace content |
| `getText()` | Plain text |
| `getCount()` | `{ words, chars }` |
| `focus()` | Focus the editor |
| `insertText(text)` | Type `text` at the caret (or where it was before focus left the editor). `text` may be a function given the text before the caret in its block that returns what to type, e.g. to put a space before a mark only where it needs one |
| `saveRange()` | Remember the caret, so that `insertText()` puts text there after focus goes elsewhere (a form of the page, say) |
| `caretRect()` | Client rect of the caret, to open a menu of your own next to it |
| `insertLink()` | Open the link dialog |
| `on(event, cb)` | Listen for `'change'` or `'count'` |
| `destroy()` | Remove the editor, restore the field. Detaching the element also releases its page-wide listeners; attaching it again restores them |

## Keyboard and markdown

Not in `inline` editors. Ctrl stands for Cmd on a Mac.

| Keys | Action |
|---|---|
| Ctrl+Z, Ctrl+Y or Ctrl+Shift+Z | Undo, redo: by the key pressed, so in any layout, and also when focus has left the text for a menu, a bar or a dialog of the editor worked in last. Every command, menu or bar action, paste, drag and upload is a step of its own |
| Tab, Shift+Tab | In a list item: nest it in the one above, or take it a level out. In a table: the next or the previous cell; Tab in the last cell adds a row. Elsewhere Tab leaves the editor |
| Ctrl+Alt+0 / 1-4 | Paragraph / the allowed heading levels in order (shown in the paragraph style menu) |
| Alt+Shift+Up / Down | Move the block up or down past its neighbour: a list item within its list, a heading with its whole section past the section of the same level next to it |
| `#` to `####`, `>`, `-` or `*`, `1.` and a space at the start of a line | Heading, quote, bulleted list, numbered list |
| `` ``` `` or `---` and a space or Enter at the start of a line | Code block, horizontal rule |
| `**bold**`, `*italic*`, `` `code` ``, `~~strike~~` | Converted when the closing mark is typed (not in code); Ctrl+Z right after brings the marks back |
| Enter on an empty last line of a code block or a quote | Leave it for a new paragraph below |
| `/` in an empty line | Slash menu with what the toolbar offers (headings, lists, quote, code block, table, image, video, rule): type to filter, Up/Down and Enter or Tab to pick, Esc, a space or a click elsewhere to close. Only in an editor with a toolbar |

## Extra buttons

`extraButtons` adds your own buttons to the toolbar, each `{ key, icon, title, shortcut, onClick }`:

- `key` names the button. Put it in the `toolbar` list to place it; a button the list leaves out goes at the end.
- `icon` is a Material Symbols name or your own HTML. A name gives way to `icons[key]`, HTML is used as given.
- `title` is the tooltip and the accessible name, used as given (not looked up in `labels`).
- `shortcut`, optional, like `'Ctrl+Shift+K'`: it runs the button from the text and shows in the tooltip. Ctrl stands for Cmd on a Mac; letters and digits match by the key's place, so they work on any keyboard layout.
- `onClick(editor, button, event)` runs on a click or the shortcut. The caret is saved first, so `editor.insertText()` lands where it was. `button` is the toolbar button (`null` with no toolbar), `event` the click or the `keydown`.

```js
YurbaEditor.create({
    mount: '#text',
    toolbar: ['bold', 'italic', '|', 'link', 'cite'],
    extraButtons: [{
        key: 'cite',
        icon: 'format_quote',
        title: 'Cite',
        shortcut: 'Ctrl+Shift+K',
        onClick: editor => editor.insertText(before => /(^|\s)$/.test(before) ? '[1]' : ' [1]'),
    }],
})
```

## Link provider

`linkProvider: { search, insert }` lets people link pages of your site by their title:

- `search(query)` returns a Promise of `[{ title, hint }]`: the pages to offer, `hint` a line under the title.
- `insert(item, selectedText)`, optional, returns the text to type for a chosen page. By default it is `[[title]]`, or `[[title|selected text]]` when text was selected. Return nothing to have done it yourself.

With a provider, the link button and Ctrl+K open one dialog for both: a title lists the pages found (arrows and Enter, or a click, choose one), an address (with `https://`, `mailto:`, `tel:` or `www.`) makes a web link, and inside a link it also offers Remove link. Typing `[[` in the text opens the same list at the caret while you type the title: Enter, Tab or a click completes it to `[[title]]`, Escape closes it until the next `[[`.

```js
YurbaEditor.create({
    mount: '#text',
    linkFields: false,
    linkProvider: {
        search: q => fetch('/api/pages?q=' + encodeURIComponent(q)).then(r => r.json()).then(list => list.map(p => ({ title: p.title, hint: p.summary }))),
    },
})
```

## Events

Fire via the `on()` method or as native DOM events on the element (`yurba-editor.<name>`, payload in `event.detail`).

| Event | Detail |
|---|---|
| `yurba-editor.change` | `html` |
| `yurba-editor.count` | `{ words, chars }` |
| `yurba-editor.notice` | `{ type, text }`, see `onNotice` |

## Pictures

A click or a tap on a picture selects it and shows a bar over it:

- widths of 25, 33, 50, 75 and 100% of the text (a little under the share below 100%, so two halves or four quarters share a line), and Auto for the picture's own size;
- float left, centre, float right (a second press puts the picture back in its line);
- Caption, alt text and delete.

The handle on the corner resizes by mouse or finger. It stops at 25, 33, 50, 66, 75 and 100%, at the height or width of a picture beside it or of the nearest ones above and below, and at what is left of the line; a badge shows the share. Widths are kept as `style="width: N%"`.

Caption wraps the picture in `<figure>` with a `<figcaption>`; the figure then carries the width and float, and the picture fills it. Enter in a caption goes on with a new line below the picture. A caption on one of the pictures of a row makes each of them a figure, so they stay side by side; figures one after another share a line.

An uploaded picture shows at once where the caret was, dimmed, and the text stays open while it uploads; it gets its address when the upload is done and goes away if the upload fails.

## Icons

Every built-in icon goes through the `icons` option: key to HTML string. Values are inserted as HTML as given, keys left out keep the default. Both builds use the same keys.

```js
YurbaEditor.create({ field: '#body', icons: { bold: '<svg class="ye-ico" viewBox="0 0 24 24">…</svg>', copy: '<i class="fa fa-copy"></i>' } })
```

| Keys | Where | Default |
|---|---|---|
| `undo` `redo` `bold` `italic` `underline` `strike` `sup` `sub` `lowercase` `capitalize` `uppercase` `alignleft` `aligncenter` `alignright` `alignjustify` `ul` `ol` `outdent` `indent` `link` `image` `video` `table` `hr` `blockquote` `code` `codeblock` `clear` `find` `source` `fullscreen` | Toolbar buttons, by token | Material Symbols icon |
| `forecolor` `backcolor` | Text color and highlight buttons | `A` |
| `caret` | Arrow of the paragraph style button | `▾` |
| `slash-h1` `slash-h2` `slash-h3` `slash-h4` | Heading items of the slash menu (its other items use the toolbar keys) | Material Symbols icon |
| `color-none` | Remove color swatch in the color menus | `✕` |
| `edit` `open` `remove` | Link menu (`remove` also in the link dialog of a [link provider](#link-provider)) | Material Symbols icon |
| `article` | Pages found by a [link provider](#link-provider) | Material Symbols icon |
| `size` `align-left` `align-center` `align-right` `align-none` `caption` `alt` `img-del` | Image menu and the bar over a selected picture | Material Symbols icon |
| `row-above` `row-below` `col-left` `col-right` `cell-left` `cell-center` `cell-right` `merge-right` `merge-down` `split` `row-del` `col-del` `header` `grid` `del` | Table menu | Material Symbols icon |
| `find-prev` `find-next` `find-close` | Find & replace. The `.ui` build hides the close button, its dialog has its own | Material Symbols icon, `✕` for close |
| `select-all` `copy` `paste` `clear-all` `formatting` `case` | Context menu items without a toolbar twin (`clear-all` is Clear, which empties the editor) | The item's `icon` |
| `clear` `bold` `italic` `underline` `strike` `code` `link` `lowercase` `capitalize` `uppercase` `find` | Context menu items, shared with the toolbar key (`clear` is Clear formatting) | The item's `icon` |
| `submenu` | Submenu arrow of the context menu. Standalone build only, in the `.ui` build YurbaUI draws it | `›` |

A context menu item, built-in or custom, takes its key from `key`, else from `action`: `selectAll` uses `select-all`, `clear` uses `clear-all`, `clearFormat` uses `clear`, `lower` and `upper` use `lowercase` and `uppercase`, any other action is its own key. With no entry in `icons` it shows its `icon`. An `icon` that is HTML rather than a symbol name is the item's own and shows whatever `icons` says.

## CSS variables

```css
.ye {
    --ye-surface: #ffffff;
    --ye-border:  #e5e7eb;
    --ye-text:    #1f2937;
    --ye-accent:  #2563eb;
    --ye-radius:  14px;
}
```

Dark mode applies automatically under `prefers-color-scheme: dark`; force it with the `ye--dark` class or opt out with `ye--light`.

See [demo](https://yurba-dev.github.io/yurba-editor/) for full documentation.
