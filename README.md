# YurbaEditor

A full-featured lightweight WYSIWYG editor in a single dependency-free file — rich text in, clean allowlist-sanitized HTML out.

Supports headings, inline formatting (bold, italic, underline, strike, super/subscript, color, highlight, case conversion), lists, blockquotes, inline code and code blocks, links, images (by URL, upload, drag-and-drop or paste), YouTube/Vimeo embeds, and tables — plus find & replace, undo/redo, fullscreen, HTML source view, live word/char count, markdown shortcuts, and a right-click formatting menu.

## Installation

```html
<link rel="stylesheet" href="/dist/yurba-editor.min.css">
<script src="/dist/yurba-editor.min.js"></script>
```

## Build

```bash
npm install
npm run build
```

Output: `dist/yurba-editor.min.js`, `dist/yurba-editor.min.css`

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
| `YurbaEditor.sanitize(html, opts?)` | Run the allowlist sanitizer on a string. |
| `YurbaEditor.DEFAULT_TOOLBAR` | Default toolbar token list. |
| `YurbaEditor.EMBED_HOSTS` | Default `<iframe>` host allowlist. |

**Config options:**

| Key | Type | Default | Description |
|---|---|---|---|
| `field` | string \| Element | — | `<textarea>`/`<input>` to hide and keep in sync |
| `mount` | string \| Element | — | Container to append the editor into |
| `value` | string | field value | Initial HTML |
| `toolbar` | string[] \| false | full set | Toolbar tokens; `'\|'` is a separator; `false` hides it |
| `footer` | boolean | `true` | `false` hides the footer (brand + count) |
| `inline` | boolean | `false` | Enter inserts `<br>` and blocks are flattened |
| `placeholder` | string | `'Start writing…'` | Empty-state text |
| `minHeight` | number | `160` | Min editing height (px) |
| `height` | number | — | Max height before scroll (px) |
| `maxChars` | number | — | Hard character cap |
| `contextMenu` | boolean \| array | built-in | Right-click menu; `false` disables, array customizes |
| `embedHosts` | string[] | YouTube/Vimeo | Allowed `<iframe>` hosts |
| `allowData` | boolean | `false` | Keep `data-*` attributes |
| `allowClasses` | boolean | `false` | Keep all `class` attributes |
| `uploadUrl` | string | — | Image upload endpoint (enables the upload UI) |
| `onImageUpload` | function | — | `file => Promise<url>` custom uploader |
| `onChange` | function | — | `html => {}` on change |
| `onCount` | function | — | `({ words, chars }) => {}` on count change |
| `icons` | object | — | Override toolbar icons by token |

### Instance

| Method | Description |
|---|---|
| `getHTML()` | Sanitized HTML |
| `setHTML(html)` | Replace content |
| `getText()` | Plain text |
| `getCount()` | `{ words, chars }` |
| `focus()` | Focus the editor |
| `on(event, cb)` | Listen for `'change'` or `'count'` |
| `destroy()` | Remove the editor, restore the field |

## Events

Fire via the `on()` method or as native DOM events on the element (`yurba-editor.<name>`, payload in `event.detail`).

| Event | Detail |
|---|---|
| `yurba-editor.change` | `html` |
| `yurba-editor.count` | `{ words, chars }` |

## CSS variables

```css
.ye {
    --ye-surface: #ffffff;
    --ye-border:  #e5e7eb;
    --ye-text:    #1f2937;
    --ye-accent:  #2563eb;
    --ye-radius:  9px;
}
```

Dark mode applies automatically under `prefers-color-scheme: dark`; force it with the `ye--dark` class or opt out with `ye--light`.

See [demo](https://yurba-dev.github.io/yurba-editor/) for full documentation.
