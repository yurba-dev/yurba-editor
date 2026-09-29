# YurbaEditor

A full-featured lightweight WYSIWYG editor in a single dependency-free file - rich text in, sanitized HTML out (pastes and `YurbaEditor.sanitize()` use the tag/attribute allowlist; `getHTML()` uses it with `strict: true`).

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
| `yurba-editor.ui` | `dist/yurba-editor.ui.min.js`, `dist/yurba-editor.ui.min.css` | `YurbaUI.Dropdown` for toolbar menus, `YurbaUI.ContextMenu` for the right-click and link/image/table menus, `YurbaUI.Modal` for the link/image/video prompts and Find & replace. For a page that loads YurbaUI |

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
| `onFiles` | function | - | `(files, editor) => {}` takes files pasted with Ctrl+V or the context menu's Paste instead of the editor, e.g. to attach them to a message. The menu's Paste can only bring images: browsers don't give pages a file copied in the system file manager |
| `onChange` | function | - | `html => {}` on change |
| `onCount` | function | - | `({ words, chars }) => {}` on count change |
| `icons` | object | built-in | Override built-in icons, see [Icons](#icons) |

### Instance

| Method | Description |
|---|---|
| `getHTML()` | Sanitized HTML |
| `setHTML(html)` | Replace content |
| `getText()` | Plain text |
| `getCount()` | `{ words, chars }` |
| `focus()` | Focus the editor |
| `on(event, cb)` | Listen for `'change'` or `'count'` |
| `destroy()` | Remove the editor, restore the field. Detaching the element also releases its page-wide listeners; attaching it again restores them |

## Events

Fire via the `on()` method or as native DOM events on the element (`yurba-editor.<name>`, payload in `event.detail`).

| Event | Detail |
|---|---|
| `yurba-editor.change` | `html` |
| `yurba-editor.count` | `{ words, chars }` |

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
| `color-none` | Remove color swatch in the color menus | `✕` |
| `edit` `open` `remove` | Link menu | Material Symbols icon |
| `align-left` `align-center` `align-right` `align-none` `alt` `img-del` | Image menu | Material Symbols icon |
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
