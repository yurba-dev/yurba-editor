var __yurbaeditor__ = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // source/index.js
  var index_exports = {};
  __export(index_exports, {
    YurbaEditor: () => YurbaEditor
  });

  // source/helpers/constants.js
  var DROP = { SCRIPT: 1, STYLE: 1, OBJECT: 1, EMBED: 1, APPLET: 1, PARAM: 1, FRAME: 1, FRAMESET: 1, NOSCRIPT: 1, NOEMBED: 1, NOFRAMES: 1, XMP: 1, PLAINTEXT: 1, TEMPLATE: 1, LINK: 1, META: 1, HEAD: 1, TITLE: 1, BASE: 1, FORM: 1, INPUT: 1, BUTTON: 1, TEXTAREA: 1, SELECT: 1, OPTION: 1, SVG: 1, MATH: 1 };
  var ALLOWED = { P: 1, DIV: 1, BR: 1, HR: 1, STRONG: 1, B: 1, EM: 1, I: 1, U: 1, S: 1, SUB: 1, SUP: 1, A: 1, SPAN: 1, UL: 1, OL: 1, LI: 1, BLOCKQUOTE: 1, H1: 1, H2: 1, H3: 1, H4: 1, CODE: 1, PRE: 1, IMG: 1, FIGURE: 1, FIGCAPTION: 1, IFRAME: 1, TABLE: 1, THEAD: 1, TBODY: 1, TR: 1, TH: 1, TD: 1 };
  var ATTRS = { a: ["href", "title", "target"], img: ["src", "alt", "title", "width", "height"], iframe: ["src", "width", "height", "allow", "allowfullscreen", "frameborder", "title"], td: ["colspan", "rowspan"], th: ["colspan", "rowspan"] };
  var STYLE_PROPS = { p: ["text-align", "margin-left"], div: ["text-align", "margin-left"], h1: ["text-align", "margin-left"], h2: ["text-align", "margin-left"], h3: ["text-align", "margin-left"], h4: ["text-align", "margin-left"], li: ["text-align", "margin-left"], blockquote: ["text-align", "margin-left"], pre: ["text-align", "margin-left"], td: ["text-align"], th: ["text-align"], span: ["color", "background-color"], b: ["color", "background-color"], strong: ["color", "background-color"], i: ["color", "background-color"], em: ["color", "background-color"], u: ["color", "background-color"], s: ["color", "background-color"], a: ["color", "background-color"], code: ["color", "background-color"], sub: ["color", "background-color"], sup: ["color", "background-color"], img: ["width", "height", "float"], figure: ["width", "float"], figcaption: ["text-align"], table: ["width"] };
  var CLASS_ALLOWED = ["ye-table--no-grid"];
  var IFRAME_ALLOW = ["accelerometer", "autoplay", "clipboard-write", "encrypted-media", "fullscreen", "gyroscope", "picture-in-picture", "web-share"];
  var EMBED_HOSTS = ["youtube.com", "www.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com", "player.vimeo.com"];
  var STATEFUL = ["bold", "italic", "underline", "strikeThrough", "insertUnorderedList", "insertOrderedList", "subscript", "superscript"];
  var BLOCK_SEL = "p,div,h1,h2,h3,h4,li,blockquote,pre,td,th";
  var ICONS = {
    undo: "undo",
    redo: "redo",
    bold: "format_bold",
    italic: "format_italic",
    underline: "format_underlined",
    strike: "format_strikethrough",
    sup: "superscript",
    sub: "subscript",
    lowercase: "lowercase",
    capitalize: "match_case",
    uppercase: "uppercase",
    alignleft: "format_align_left",
    aligncenter: "format_align_center",
    alignright: "format_align_right",
    alignjustify: "format_align_justify",
    ul: "format_list_bulleted",
    ol: "format_list_numbered",
    outdent: "format_indent_decrease",
    indent: "format_indent_increase",
    link: "link",
    image: "image",
    video: "smart_display",
    hr: "horizontal_rule",
    blockquote: "format_quote",
    code: "code",
    codeblock: "code_blocks",
    clear: "format_clear",
    source: "code",
    fullscreen: "fullscreen",
    table: "table",
    find: "search",
    "row-above": "arrow_upward",
    "row-below": "arrow_downward",
    "col-left": "arrow_back",
    "col-right": "arrow_forward",
    "row-del": "delete",
    "col-del": "delete",
    header: "toolbar",
    grid: "border_all",
    del: "delete_forever",
    "cell-left": "format_align_left",
    "cell-center": "format_align_center",
    "cell-right": "format_align_right",
    "merge-right": "merge",
    "merge-down": "merge",
    split: "call_split",
    edit: "edit",
    open: "open_in_new",
    remove: "link_off",
    "align-left": "format_image_left",
    "align-center": "format_align_center",
    "align-right": "format_image_right",
    "align-none": "format_align_justify",
    alt: "title",
    "img-del": "delete_forever",
    caption: "subtitles",
    size: "photo_size_select_large",
    "find-prev": "keyboard_arrow_up",
    "find-next": "keyboard_arrow_down"
  };
  var DEFS = {
    undo: { cmd: "undo", title: "Undo" },
    redo: { cmd: "redo", title: "Redo" },
    bold: { cmd: "bold", title: "Bold", mod: "bold" },
    italic: { cmd: "italic", title: "Italic", mod: "italic" },
    underline: { cmd: "underline", title: "Underline", mod: "underline" },
    strike: { cmd: "strikeThrough", title: "Strikethrough", mod: "strike" },
    lowercase: { cmd: "ye-lower", title: "lowercase" },
    capitalize: { cmd: "ye-capitalize", title: "Capitalize" },
    uppercase: { cmd: "ye-upper", title: "UPPERCASE" },
    sup: { cmd: "superscript", title: "Superscript" },
    sub: { cmd: "subscript", title: "Subscript" },
    alignleft: { cmd: "ye-align", arg: "left", title: "Align left" },
    aligncenter: { cmd: "ye-align", arg: "center", title: "Align center" },
    alignright: { cmd: "ye-align", arg: "right", title: "Align right" },
    alignjustify: { cmd: "ye-align", arg: "justify", title: "Justify" },
    ul: { cmd: "insertUnorderedList", title: "Bulleted list" },
    ol: { cmd: "insertOrderedList", title: "Numbered list" },
    outdent: { cmd: "ye-outdent", title: "Decrease indent" },
    indent: { cmd: "ye-indent", title: "Increase indent" },
    link: { cmd: "ye-link", title: "Insert link" },
    image: { cmd: "ye-image", title: "Insert image" },
    video: { cmd: "ye-video", title: "Embed video" },
    hr: { cmd: "ye-hr", title: "Horizontal rule" },
    blockquote: { cmd: "formatBlock", arg: "blockquote", title: "Quote" },
    code: { cmd: "ye-code", title: "Inline code" },
    codeblock: { cmd: "ye-codeblock", title: "Code block" },
    clear: { cmd: "ye-clear", title: "Clear formatting" },
    find: { cmd: "ye-find", title: "Find & replace" },
    source: { cmd: "ye-source-toggle", title: "HTML source" },
    fullscreen: { cmd: "ye-fullscreen", title: "Fullscreen" }
  };
  var SHORTCUTS = {
    undo: "Ctrl+Z",
    redo: "Ctrl+Y",
    bold: "Ctrl+B",
    italic: "Ctrl+I",
    underline: "Ctrl+U",
    strike: "Ctrl+Shift+X",
    link: "Ctrl+K",
    ul: "Ctrl+Shift+8",
    ol: "Ctrl+Shift+7",
    find: "Ctrl+F"
  };
  var LINK_OPS = [["edit", "Edit link"], ["open", "Open"], ["remove", "Remove link"]];
  var IMAGE_OPS = [
    ["size", "Size"],
    ["|"],
    ["align-left", "Float left"],
    ["align-center", "Center"],
    ["align-right", "Float right"],
    ["align-none", "Inline"],
    ["|"],
    ["caption", "Caption"],
    ["alt", "Alt text\u2026"],
    ["img-del", "Delete image"]
  ];
  var IMG_SIZES = [25, 33, 50, 75, 100];
  var IMG_SNAPS = [25, 33, 50, 66, 75, 100];
  var TABLE_OPS = [
    ["row-above", "Row above"],
    ["row-below", "Row below"],
    ["col-left", "Col left"],
    ["col-right", "Col right"],
    ["|"],
    ["cell-left", "Align left"],
    ["cell-center", "Align center"],
    ["cell-right", "Align right"],
    ["|"],
    ["merge-right", "Merge right"],
    ["merge-down", "Merge down"],
    ["split", "Split cell"],
    ["|"],
    ["row-del", "Delete row"],
    ["col-del", "Delete col"],
    ["|"],
    ["header", "Header row"],
    ["grid", "Toggle grid"],
    ["del", "Delete table"]
  ];
  var DANGER_OPS = ["remove", "img-del", "del"];
  var HEADINGS = { p: "Paragraph", h1: "Heading 1", h2: "Heading 2", h3: "Heading 3", h4: "Heading 4" };
  var TEXT_COLORS = ["#111827", "#374151", "#6b7280", "#9ca3af", "#dc2626", "#ea580c", "#d97706", "#16a34a", "#0d6efd", "#4f46e5", "#9333ea", "#db2777"];
  var MARK_COLORS = ["#fef08a", "#fed7aa", "#fecaca", "#bbf7d0", "#bae6fd", "#ddd6fe", "#fbcfe8", "#e5e7eb"];
  var DEFAULT_TOOLBAR = [
    "undo",
    "redo",
    "|",
    "heading",
    "|",
    "bold",
    "italic",
    "underline",
    "strike",
    "lowercase",
    "capitalize",
    "uppercase",
    "|",
    "forecolor",
    "backcolor",
    "|",
    "alignleft",
    "aligncenter",
    "alignright",
    "|",
    "ul",
    "ol",
    "outdent",
    "indent",
    "|",
    "link",
    "image",
    "video",
    "table",
    "hr",
    "|",
    "blockquote",
    "codeblock",
    "clear",
    "find",
    "|",
    "source",
    "fullscreen"
  ];
  var CTX_ICON_KEYS = { selectAll: "select-all", clear: "clear-all", clearFormat: "clear", lower: "lowercase", upper: "uppercase" };
  var DEFAULT_CONTEXT_MENU = [
    { action: "selectAll", icon: "select_all", label: "Select all" },
    { action: "copy", icon: "content_copy", label: "Copy" },
    { action: "paste", icon: "content_paste", label: "Paste" },
    { action: "clear", icon: "delete_sweep", label: "Clear" },
    { separator: true },
    {
      key: "formatting",
      icon: "format_size",
      label: "Formatting",
      children: [
        { action: "clearFormat", icon: "format_clear", label: "Clear formatting" },
        { separator: true },
        { action: "bold", icon: "format_bold", label: "Bold" },
        { action: "italic", icon: "format_italic", label: "Italic" },
        { action: "underline", icon: "format_underlined", label: "Underline" },
        { action: "strike", icon: "format_strikethrough", label: "Strikethrough" },
        { action: "code", icon: "code", label: "Inline code" },
        { separator: true },
        { action: "link", icon: "link", label: "Link\u2026" }
      ]
    },
    {
      key: "case",
      icon: "text_fields",
      label: "Case",
      children: [
        { action: "lower", icon: "lowercase", label: "Lowercase" },
        { action: "capitalize", icon: "match_case", label: "Capitalize" },
        { action: "upper", icon: "uppercase", label: "Uppercase" }
      ]
    },
    { separator: true },
    { action: "find", icon: "search", label: "Find & replace" }
  ];

  // source/helpers/sanitizer.js
  var XHTML = "http://www.w3.org/1999/xhtml";
  var URL_ATTRS = ["href", "src", "xlink:href", "action", "formaction", "poster", "background", "cite", "longdesc", "lowsrc", "dynsrc", "data", "codebase", "manifest"];
  var DROP_ATTRS = ["srcdoc", "srcset", "imagesrcset", "ping", "popover", "popovertarget", "popovertargetaction"];
  var UNSAFE_STYLE = /expression\(|javascript:|-moz-binding|@import|behaviou?r\s*:|url\(|image-set\(|image\(|cross-fade\(|\\|\/\*|position\s*:\s*(fixed|sticky|absolute)|var\(|--/i;
  function isSafeUrl(url) {
    url = (url || "").trim();
    if (url == "" || /^\s*javascript:/i.test(url)) return false;
    return /^(https?:|mailto:|tel:|\/|#)/i.test(url) || url.indexOf(":") == -1;
  }
  function isSafeEmbed(url, hosts) {
    try {
      const u = new URL(url, window.location.href);
      return u.protocol == "https:" && hosts.indexOf(u.hostname.toLowerCase()) != -1;
    } catch (e) {
      return false;
    }
  }
  function safeStyleValue(prop, value) {
    if (/url\(|expression|\/\*/i.test(value)) return false;
    if (prop == "text-align") return ["left", "right", "center", "justify"].indexOf(value) != -1;
    if (prop == "float") return ["left", "right", "none"].indexOf(value) != -1;
    if (prop == "margin-left") return /^\d{1,3}px$/.test(value);
    if (prop == "width" || prop == "height") return /^\d{1,4}(\.\d{1,2})?(px|%)?$/.test(value);
    if (prop == "color" || prop == "background-color") return /^(#[0-9a-f]{3,8}|rgba?\([\d.,\s]+\)|[a-z]{3,20})$/i.test(value);
    return false;
  }
  function filterStyle(style, allowed) {
    const out = [];
    const decls = (style || "").split(";");
    for (let i = 0; i < decls.length; i++) {
      const idx = decls[i].indexOf(":");
      if (idx == -1) continue;
      const prop = decls[i].slice(0, idx).trim().toLowerCase();
      const value = decls[i].slice(idx + 1).trim();
      if (allowed.indexOf(prop) != -1 && safeStyleValue(prop, value)) out.push(prop + ": " + value);
    }
    return out.join("; ");
  }
  function isGlyphData(el, name, value, opts) {
    return name == "src" && el.tagName == "IMG" && !!opts.glyphClass && el.classList.contains(opts.glyphClass) && /^data:image\//i.test(value.trim());
  }
  function cleanAttrs(el, hosts, strict, opts) {
    opts = opts || {};
    const tag = el.tagName.toLowerCase();
    const allowed = ATTRS[tag] || [];
    const styleAllowed = STYLE_PROPS[tag] || [];
    const attrs = Array.prototype.slice.call(el.attributes);
    for (let i = 0; i < attrs.length; i++) {
      const name = attrs[i].name.toLowerCase();
      const value = attrs[i].value;
      if (name.indexOf("on") == 0) {
        el.removeAttribute(attrs[i].name);
        continue;
      }
      if (name == "style" && opts.stripStyle) {
        el.removeAttribute("style");
        continue;
      }
      if (DROP_ATTRS.indexOf(name) != -1) {
        el.removeAttribute(attrs[i].name);
        continue;
      }
      if (URL_ATTRS.indexOf(name) != -1 && !isSafeUrl(value) && !isGlyphData(el, name, value, opts)) {
        el.removeAttribute(attrs[i].name);
        continue;
      }
      if (name == "allow") {
        const kept = value.split(";").map((v) => v.trim()).filter((v) => IFRAME_ALLOW.indexOf(v.split(/\s+/)[0].toLowerCase()) != -1);
        if (tag == "iframe" && kept.length) el.setAttribute("allow", kept.join("; "));
        else el.removeAttribute(attrs[i].name);
        continue;
      }
      if (name.indexOf("data-") == 0) {
        if (!opts.allowData) el.removeAttribute(attrs[i].name);
        continue;
      }
      if (name == "class") {
        if (opts.allowClasses) continue;
        const kept = value.split(/\s+/).filter((c) => CLASS_ALLOWED.indexOf(c) != -1 || c == opts.glyphClass);
        if (kept.length) el.setAttribute("class", kept.join(" "));
        else el.removeAttribute("class");
        continue;
      }
      if (strict) {
        if (name == "style") {
          const clean = filterStyle(value, styleAllowed);
          if (clean) el.setAttribute("style", clean);
          else el.removeAttribute("style");
          continue;
        }
        if (allowed.indexOf(name) == -1) {
          el.removeAttribute(attrs[i].name);
          continue;
        }
        if (["width", "height", "colspan", "rowspan", "frameborder"].indexOf(name) != -1 && !/^\d{1,4}$/.test(value)) el.removeAttribute(attrs[i].name);
      } else if (name == "style" && UNSAFE_STYLE.test(value)) {
        el.removeAttribute("style");
      }
    }
    const src = el.getAttribute("src") || "";
    if (tag == "img" && !isSafeUrl(src) && !isGlyphData(el, "src", src, opts)) return false;
    if (tag == "iframe" && !isSafeEmbed(el.getAttribute("src") || "", hosts)) return false;
    if (tag == "a" && el.getAttribute("href")) {
      if ((el.getAttribute("target") || "").toLowerCase() == "_self") {
        el.setAttribute("target", "_self");
        el.removeAttribute("rel");
      } else {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer nofollow");
      }
    }
    return true;
  }
  function cleanChildren(parent, hosts, strict, opts) {
    const nodes = Array.prototype.slice.call(parent.childNodes);
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.nodeType == 3) continue;
      if (node.nodeType != 1) {
        parent.removeChild(node);
        continue;
      }
      const tag = node.tagName.toUpperCase();
      if (node.namespaceURI != XHTML || DROP[tag] == 1) {
        parent.removeChild(node);
        continue;
      }
      if (tag == "IFRAME") while (node.firstChild) node.removeChild(node.firstChild);
      cleanChildren(node, hosts, strict, opts);
      if (strict && (tag == "STRIKE" || tag == "DEL")) {
        const s = node.ownerDocument.createElement("s");
        while (node.firstChild) s.appendChild(node.firstChild);
        parent.replaceChild(s, node);
      } else if (strict && ALLOWED[tag] != 1 || tag.indexOf("-") != -1) {
        while (node.firstChild) parent.insertBefore(node.firstChild, node);
        parent.removeChild(node);
      } else if (!cleanAttrs(node, hosts, strict, opts)) {
        parent.removeChild(node);
      }
    }
  }
  function joinPictures(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const blank = [];
    let n;
    while (n = walker.nextNode()) {
      if (/\S/.test(n.nodeValue)) continue;
      const prev = n.previousSibling;
      const next = n.nextSibling;
      if (prev && next && (prev.nodeName == "IMG" && next.nodeName == "IMG" || prev.nodeName == "FIGURE" && next.nodeName == "FIGURE")) blank.push(n);
    }
    blank.forEach((t) => t.remove());
  }
  function cleanHtml(html, hosts, strict, opts) {
    const tpl = document.createElement("template");
    tpl.innerHTML = html || "";
    cleanChildren(tpl.content, hosts, strict, opts);
    joinPictures(tpl.content);
    return tpl.innerHTML;
  }
  var UNWRAP = { P: 1, DIV: 1, FIGURE: 1, FIGCAPTION: 1, H1: 1, H2: 1, H3: 1, H4: 1, BLOCKQUOTE: 1, PRE: 1, UL: 1, OL: 1, LI: 1, TABLE: 1, THEAD: 1, TBODY: 1, TR: 1, TH: 1, TD: 1, HR: 1 };
  function flattenNode(parent, glyphClass) {
    const nodes = Array.prototype.slice.call(parent.childNodes);
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.nodeType != 1) continue;
      if (node.tagName == "IMG" && !(glyphClass && node.classList.contains(glyphClass)) || node.tagName == "IFRAME") {
        parent.removeChild(node);
        continue;
      }
      flattenNode(node, glyphClass);
      if (UNWRAP[node.tagName] == 1) {
        const hasNext = node.nextSibling != null && !(node.childNodes.length == 1 && node.firstChild.nodeName == "BR");
        while (node.firstChild) parent.insertBefore(node.firstChild, node);
        if (hasNext) parent.insertBefore(document.createElement("br"), node);
        parent.removeChild(node);
      }
    }
  }
  function flattenInline(html, glyphClass) {
    const tpl = document.createElement("template");
    tpl.innerHTML = html || "";
    flattenNode(tpl.content, glyphClass);
    return tpl.innerHTML.replace(/(<br\s*\/?>\s*)+$/i, "");
  }

  // source/helpers/paste.js
  var BLOCKS = { P: 1, DIV: 1, H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1, UL: 1, OL: 1, LI: 1, TABLE: 1, BLOCKQUOTE: 1, PRE: 1, HR: 1, SECTION: 1, ARTICLE: 1, HEADER: 1, FOOTER: 1, MAIN: 1, ASIDE: 1, NAV: 1, FIGURE: 1, FIGCAPTION: 1, ADDRESS: 1, CENTER: 1, DL: 1, DT: 1, DD: 1 };
  var BOXES = { DIV: 1, SECTION: 1, ARTICLE: 1, HEADER: 1, FOOTER: 1, MAIN: 1, ASIDE: 1, NAV: 1, FIGURE: 1, FIGCAPTION: 1, ADDRESS: 1, CENTER: 1, DL: 1, DT: 1, DD: 1 };
  var JUNK = { "O:P": 1, COLGROUP: 1, COL: 1 };
  var WORD_LIST = /mso-list:\s*(l\d+)\s+level(\d+)/i;
  function isBlock(node) {
    return node != null && node.nodeType == 1 && BLOCKS[node.tagName] == 1;
  }
  function isBlank(node) {
    return node.nodeType == 8 || node.nodeType == 3 && node.nodeValue.replace(/\u00a0/g, " ").trim() == "";
  }
  function styleOf(el) {
    const out = {};
    const decls = (el.getAttribute("style") || "").split(";");
    for (let i = 0; i < decls.length; i++) {
      const idx = decls[i].indexOf(":");
      if (idx == -1) continue;
      out[decls[i].slice(0, idx).trim().toLowerCase()] = decls[i].slice(idx + 1).replace(/!important/i, "").trim().toLowerCase();
    }
    return out;
  }
  function rename(el, tag) {
    const out = el.ownerDocument.createElement(tag);
    if (el.getAttribute("style")) out.setAttribute("style", el.getAttribute("style"));
    while (el.firstChild) out.appendChild(el.firstChild);
    el.parentNode.replaceChild(out, el);
    return out;
  }
  function unwrap(el) {
    const parent = el.parentNode;
    while (el.firstChild) parent.insertBefore(el.firstChild, el);
    parent.removeChild(el);
  }
  function wrapInner(el, tag) {
    const w = el.ownerDocument.createElement(tag);
    while (el.firstChild) w.appendChild(el.firstChild);
    el.appendChild(w);
  }
  function rgbOf(value) {
    if (value == "black" || value == "windowtext") return [0, 0, 0];
    if (value == "white" || value == "window") return [255, 255, 255];
    let m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/.exec(value);
    if (m) {
      const hex = m[1].length == 3 ? m[1].split("").map(function double(c) {
        return c + c;
      }).join("") : m[1];
      return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
    }
    m = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/.exec(value);
    if (m) return m[4] != null && parseFloat(m[4]) == 0 ? null : [+m[1], +m[2], +m[3]];
    return null;
  }
  function isNeutral(rgb) {
    return Math.max(rgb[0], rgb[1], rgb[2]) - Math.min(rgb[0], rgb[1], rgb[2]) <= 24;
  }
  function isPlainInk(value) {
    const rgb = rgbOf(value);
    return rgb != null && isNeutral(rgb) && Math.max(rgb[0], rgb[1], rgb[2]) <= 90;
  }
  function isPlainPaper(value) {
    if (value == "transparent" || value == "none" || value == "initial" || value == "inherit") return true;
    const rgb = rgbOf(value);
    return rgb == null ? /^rgba?\(/.test(value) : isNeutral(rgb) && Math.min(rgb[0], rgb[1], rgb[2]) >= 235;
  }
  function isBoldWeight(w) {
    return w == "bold" || w == "bolder" || /^[6-9]00$/.test(w || "");
  }
  function fixSpan(span) {
    const st = styleOf(span);
    const deco = (st["text-decoration"] || "") + " " + (st["text-decoration-line"] || "");
    const valign = st["vertical-align"] || "";
    if (valign == "super" || valign == "sub") wrapInner(span, valign == "super" ? "sup" : "sub");
    if (deco.indexOf("line-through") != -1) wrapInner(span, "s");
    if (deco.indexOf("underline") != -1 && span.closest("a") == null) wrapInner(span, "u");
    if (st["font-style"] == "italic" || st["font-style"] == "oblique") wrapInner(span, "em");
    if (isBoldWeight(st["font-weight"]) && span.closest("h1,h2,h3,h4,h5,h6") == null) wrapInner(span, "strong");
    const kept = [];
    if (st.color && !isPlainInk(st.color) && span.closest("a") == null) kept.push("color: " + st.color);
    if (st["background-color"] && !isPlainPaper(st["background-color"])) kept.push("background-color: " + st["background-color"]);
    if (kept.length) span.setAttribute("style", kept.join("; "));
    else span.removeAttribute("style");
    span.removeAttribute("lang");
    span.removeAttribute("dir");
    if (span.attributes.length == 0) unwrap(span);
  }
  function fontToSpan(font) {
    const color = font.getAttribute("color");
    const span = rename(font, "span");
    if (color && /^#?[0-9a-z]{3,20}$/i.test(color)) span.setAttribute("style", "color: " + color + ";" + (span.getAttribute("style") || ""));
    return span;
  }
  function isEmptyBlock(el) {
    return el.textContent.replace(/\u00a0/g, " ").trim() == "" && el.querySelector("img, br, iframe, hr, table") == null;
  }
  function wrapRuns(box) {
    const doc = box.ownerDocument;
    let run = [];
    function flush() {
      const meaningful = run.filter(function kept(n) {
        return !isBlank(n);
      });
      if (meaningful.length) {
        const p = doc.createElement("p");
        box.insertBefore(p, run[0]);
        run.forEach(function move(n) {
          p.appendChild(n);
        });
        while (p.lastChild && (isBlank(p.lastChild) || p.lastChild.nodeName == "BR") && p.childNodes.length > 1) p.removeChild(p.lastChild);
      } else {
        run.forEach(function drop(n) {
          box.removeChild(n);
        });
      }
      run = [];
    }
    const nodes = Array.prototype.slice.call(box.childNodes);
    for (let i = 0; i < nodes.length; i++) {
      if (isBlock(nodes[i])) flush();
      else run.push(nodes[i]);
    }
    flush();
  }
  function fixBox(box) {
    const children = box.children;
    let hasBlock = false;
    for (let i = 0; i < children.length; i++) if (isBlock(children[i])) {
      hasBlock = true;
      break;
    }
    if (hasBlock) {
      wrapRuns(box);
      unwrap(box);
      return;
    }
    const st = styleOf(box);
    const align = st["text-align"] || (box.getAttribute("align") || "").toLowerCase() || (box.tagName == "CENTER" ? "center" : "");
    const p = rename(box, "p");
    p.removeAttribute("style");
    if (align) p.setAttribute("style", "text-align: " + align);
    if (isEmptyBlock(p)) p.innerHTML = "<br>";
  }
  function fixList(list) {
    const nodes = Array.prototype.slice.call(list.children);
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].tagName != "UL" && nodes[i].tagName != "OL") continue;
      let li = nodes[i].previousElementSibling;
      if (li == null || li.tagName != "LI") {
        li = list.ownerDocument.createElement("li");
        list.insertBefore(li, nodes[i]);
      }
      li.appendChild(nodes[i]);
    }
  }
  function unwrapLonePara(el) {
    const kids = el.children;
    if (kids.length == 0 || kids[0].tagName != "P") return;
    let paras = 0;
    for (let i = 0; i < kids.length; i++) if (kids[i].tagName == "P") paras++;
    if (paras == 1) unwrap(kids[0]);
  }
  function fixElement(el) {
    const tag = el.tagName;
    const st = el.hasAttribute("style") ? styleOf(el) : {};
    if ((tag == "B" || tag == "STRONG") && st["font-weight"] && !isBoldWeight(st["font-weight"])) {
      unwrap(el);
      return;
    }
    if ((tag == "I" || tag == "EM") && st["font-style"] == "normal") {
      unwrap(el);
      return;
    }
    if (tag == "BR" && el.classList.contains("Apple-interchange-newline")) {
      el.parentNode.removeChild(el);
      return;
    }
    if (tag == "A" && !el.hasAttribute("href")) {
      unwrap(el);
      return;
    }
    if (tag == "H5" || tag == "H6") {
      rename(el, "h4");
      return;
    }
    if (tag == "FONT") {
      fixSpan(fontToSpan(el));
      return;
    }
    if (tag == "SPAN") {
      fixSpan(el);
      return;
    }
    if (tag == "FIGURE" && el.querySelector(":scope > img")) return;
    if (tag == "FIGCAPTION" && el.parentNode && el.parentNode.nodeName == "FIGURE" && el.parentNode.querySelector(":scope > img")) return;
    if (BOXES[tag] == 1) {
      fixBox(el);
      return;
    }
    if (tag == "UL" || tag == "OL") {
      fixList(el);
      return;
    }
    if (tag == "LI" || tag == "TD" || tag == "TH") {
      unwrapLonePara(el);
      return;
    }
    if (tag == "TABLE") {
      el.removeAttribute("width");
      if (st.width && !/%$/.test(st.width)) el.style.removeProperty("width");
    }
    if (tag == "P" && isEmptyBlock(el)) el.innerHTML = "<br>";
  }
  function tidyText(node) {
    const v = node.nodeValue.replace(/[\t\r\n]+/g, " ").replace(/[ \u00a0]{2,}/g, " ");
    if (v != node.nodeValue) node.nodeValue = v;
    if (v.trim() == "" && (isBlock(node.previousSibling) || isBlock(node.nextSibling))) node.parentNode.removeChild(node);
  }
  function walk(parent, inPre) {
    const nodes = Array.prototype.slice.call(parent.childNodes);
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.nodeType == 8) {
        parent.removeChild(node);
        continue;
      }
      if (node.nodeType == 3) {
        if (!inPre) tidyText(node);
        continue;
      }
      if (node.nodeType != 1) continue;
      if (JUNK[node.tagName] == 1) {
        parent.removeChild(node);
        continue;
      }
      walk(node, inPre || node.tagName == "PRE");
      fixElement(node);
    }
  }
  function wordListInfo(el) {
    if (el.nodeType != 1 || el.tagName != "P") return null;
    const m = WORD_LIST.exec(el.getAttribute("style") || "");
    return m ? { p: el, id: m[1], level: parseInt(m[2], 10) } : null;
  }
  function takeMarker(p) {
    let text = "";
    const walker = p.ownerDocument.createTreeWalker(p, NodeFilter.SHOW_COMMENT, null);
    let start = walker.nextNode();
    while (start && !/^\[if !supportLists\]$/i.test(start.nodeValue.trim())) start = walker.nextNode();
    if (start) {
      let n = start.nextSibling;
      while (n && !(n.nodeType == 8 && /^\[endif\]$/i.test(n.nodeValue.trim()))) {
        const next = n.nextSibling;
        text += n.textContent;
        n.parentNode.removeChild(n);
        n = next;
      }
    } else {
      const spans = p.getElementsByTagName("span");
      for (let i = 0; i < spans.length; i++) {
        if (!/mso-list:\s*ignore/i.test(spans[i].getAttribute("style") || "")) continue;
        text = spans[i].textContent;
        spans[i].parentNode.removeChild(spans[i]);
        break;
      }
    }
    return text.replace(/\u00a0/g, " ").trim();
  }
  function buildWordList(items) {
    const doc = items[0].p.ownerDocument;
    const stack = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const ordered = /^\(?(\d+|[a-z]{1,5})[.)]/i.test(takeMarker(item.p));
      while (stack.length && stack[stack.length - 1].level > item.level) stack.pop();
      if (stack.length && stack[stack.length - 1].level == item.level && stack[stack.length - 1].ordered != ordered) stack.pop();
      if (stack.length == 0 || stack[stack.length - 1].level < item.level) {
        const list = doc.createElement(ordered ? "ol" : "ul");
        if (stack.length) {
          const host = stack[stack.length - 1].list;
          let li2 = host.lastElementChild;
          if (li2 == null) {
            li2 = doc.createElement("li");
            host.appendChild(li2);
          }
          li2.appendChild(list);
        } else {
          item.p.parentNode.insertBefore(list, item.p);
        }
        stack.push({ list, level: item.level, ordered });
      }
      const li = doc.createElement("li");
      while (item.p.firstChild) li.appendChild(item.p.firstChild);
      stack[stack.length - 1].list.appendChild(li);
      item.p.parentNode.removeChild(item.p);
    }
  }
  function fixWordLists(root) {
    const paras = Array.prototype.slice.call(root.querySelectorAll("p[style]"));
    const done = [];
    for (let i = 0; i < paras.length; i++) {
      const first = wordListInfo(paras[i]);
      if (first == null || done.indexOf(paras[i]) != -1) continue;
      const items = [first];
      let n = paras[i].nextSibling;
      while (n) {
        if (isBlank(n)) {
          n = n.nextSibling;
          continue;
        }
        const info = wordListInfo(n);
        if (info == null || info.id != first.id) break;
        items.push(info);
        done.push(n);
        n = n.nextSibling;
      }
      buildWordList(items);
    }
  }
  function fixLooseBreaks(root) {
    const nodes = Array.prototype.slice.call(root.childNodes);
    for (let i = 0; i < nodes.length; i++) {
      const br = nodes[i];
      if (br.nodeName != "BR") continue;
      let prev = br.previousSibling, next = br.nextSibling;
      while (prev && isBlank(prev)) prev = prev.previousSibling;
      while (next && isBlank(next)) next = next.nextSibling;
      if (!isBlock(prev) && !isBlock(next)) continue;
      if (next == null) {
        root.removeChild(br);
        continue;
      }
      const p = root.ownerDocument.createElement("p");
      p.appendChild(root.ownerDocument.createElement("br"));
      root.replaceChild(p, br);
    }
  }
  function normalizePaste(html) {
    const tpl = document.createElement("template");
    tpl.innerHTML = html || "";
    fixWordLists(tpl.content);
    walk(tpl.content, false);
    fixLooseBreaks(tpl.content);
    return tpl.innerHTML;
  }
  function pastedUrl(html, text) {
    const url = (text || "").trim();
    if (!/^https?:\/\/[^\s<>"]+$/i.test(url)) return null;
    if (!html) return url;
    const tpl = document.createElement("template");
    tpl.innerHTML = html;
    if (tpl.content.querySelector("img, iframe, table") != null) return null;
    return tpl.content.textContent.trim() == url ? url : null;
  }

  // source/helpers/utils.js
  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function shortcutKey(e) {
    const k = (e.key || "").toLowerCase();
    if (/^[a-z]$/.test(k) || !/^Key[A-Z]$/.test(e.code || "")) return k;
    return e.code.slice(3).toLowerCase();
  }
  function exec(cmd, arg) {
    try {
      document.execCommand(cmd, false, arg == null ? null : arg);
    } catch (e) {
    }
  }
  function ancestorTag(node, tagName) {
    while (node && node.nodeType != null) {
      if (node.nodeType == 1 && node.tagName == tagName) return node;
      node = node.parentNode;
    }
    return null;
  }
  function normalizeHex(v) {
    v = (v || "").trim();
    if (v == "") return null;
    if (v[0] != "#") v = "#" + v;
    return /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v) ? v : null;
  }
  function embedFromUrl(url) {
    const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/i);
    if (yt) return "https://www.youtube.com/embed/" + yt[1];
    const vm = url.match(/vimeo\.com\/(?:video\/)?(\d{5,})/i);
    if (vm) return "https://player.vimeo.com/video/" + vm[1];
    return null;
  }
  function imageFilesFrom(dt) {
    const out = [];
    const files = dt && dt.files ? dt.files : null;
    if (files) {
      for (let i = 0; i < files.length; i++) if (/^image\//.test(files[i].type)) out.push(files[i]);
    }
    return out;
  }
  function filesFrom(dt) {
    return dt && dt.files ? Array.prototype.slice.call(dt.files) : [];
  }
  function dtHasFiles(dt) {
    return dt && dt.types && Array.prototype.indexOf.call(dt.types, "Files") != -1;
  }
  var PAIR = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  function cpLen(s) {
    s = s || "";
    const pairs = s.match(PAIR);
    return s.length - (pairs ? pairs.length : 0);
  }
  function isHigh(c) {
    return c >= 55296 && c <= 56319;
  }
  function isLow(c) {
    return c >= 56320 && c <= 57343;
  }
  function cpForward(s, from, n) {
    let i = from;
    while (n > 0 && i < s.length) {
      i += isHigh(s.charCodeAt(i)) && isLow(s.charCodeAt(i + 1)) ? 2 : 1;
      n--;
    }
    return i;
  }
  function cpBack(s, from, n) {
    let i = from;
    while (n > 0 && i > 0) {
      i -= i > 1 && isLow(s.charCodeAt(i - 1)) && isHigh(s.charCodeAt(i - 2)) ? 2 : 1;
      n--;
    }
    return i;
  }
  function isGlyphEl(el, glyphClass) {
    return !!glyphClass && el.tagName == "IMG" && el.classList.contains(glyphClass);
  }
  function clipHtml(html, max, glyphClass) {
    const tpl = document.createElement("template");
    tpl.innerHTML = html || "";
    const walker = document.createTreeWalker(tpl.content, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null);
    const drop = [];
    let left = max, n;
    while (n = walker.nextNode()) {
      if (n.nodeType == 3) {
        if (left <= 0) {
          drop.push(n);
          continue;
        }
        const len = cpLen(n.nodeValue);
        if (len > left) n.nodeValue = n.nodeValue.slice(0, cpForward(n.nodeValue, 0, left));
        left -= Math.min(len, left);
      } else if (isGlyphEl(n, glyphClass)) {
        const len = cpLen(n.getAttribute("alt") || "");
        if (len > left) drop.push(n);
        else left -= len;
      }
    }
    drop.forEach((d) => d.remove());
    return tpl.innerHTML;
  }
  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function rangeFromPoint(x, y) {
    if (document.caretRangeFromPoint) return document.caretRangeFromPoint(x, y);
    if (document.caretPositionFromPoint) {
      const p = document.caretPositionFromPoint(x, y);
      if (p == null) return null;
      const r = document.createRange();
      r.setStart(p.offsetNode, p.offset);
      r.collapse(true);
      return r;
    }
    return null;
  }

  // source/mixins/popup.js
  var THEME_TOKENS = ["--ye-surface", "--ye-surface-2", "--ye-border", "--ye-border-strong", "--ye-text", "--ye-text-soft", "--ye-muted", "--ye-accent", "--ye-accent-ink", "--ye-accent-soft", "--ye-on-accent", "--ye-hover", "--ye-fill", "--ye-danger", "--ye-danger-soft", "--ye-shadow"];
  var withPopup = (Base) => class extends Base {
    makePopup(extra) {
      const el = document.createElement("div");
      el.className = "ye-popup is-hidden" + (extra ? " " + extra : "");
      this.themePopup(el);
      document.body.appendChild(el);
      return el;
    }
    // A popup lives in <body>, outside the editor that sets the theme (a dark one, say): it takes the values along
    themePopup(el) {
      const cs = getComputedStyle(this.root);
      THEME_TOKENS.forEach((name) => {
        const v = cs.getPropertyValue(name);
        if (v) el.style.setProperty(name, v.trim());
      });
    }
    revealPopup(el) {
      void el.offsetWidth;
      requestAnimationFrame(() => el.classList.remove("is-hidden"));
    }
    dismissPopup(el) {
      el.classList.add("is-hidden");
      setTimeout(() => el.remove(), 200);
    }
    placePopupAt(el, x, y) {
      const pad = 8;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      let left = x;
      let top = y;
      if (left + w > window.innerWidth - pad) left = x - w;
      if (left < pad) left = pad;
      if (top + h > window.innerHeight - pad) top = y - h;
      if (top < pad) top = pad;
      el.style.left = left + "px";
      el.style.top = top + "px";
    }
    placePopupBelow(el, rect, align) {
      const pad = 8;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      let left = align == "right" ? rect.right - w : rect.left;
      let top = rect.bottom + 4;
      if (left + w > window.innerWidth - pad) left = window.innerWidth - w - pad;
      if (left < pad) left = pad;
      if (top + h > window.innerHeight - pad) top = Math.max(pad, window.innerHeight - h - pad);
      el.style.left = left + "px";
      el.style.top = top + "px";
    }
  };

  // source/mixins/context.js
  function byMouse(fn) {
    return function(e) {
      if (e.pointerType == "mouse") fn();
    };
  }
  var withContext = (Base) => class extends Base {
    openTextMenu(x, y) {
      this.closeTextMenu();
      this.saveRange();
      const menu = this.makePopup();
      menu.setAttribute("role", "menu");
      this.buildCtxItems(this.contextMenuItems || [], menu);
      this.textPop = menu;
      this.placePopupAt(menu, x, y);
      this.revealPopup(menu);
    }
    closeTextMenu() {
      if (this.textPop == null) return;
      const menu = this.textPop;
      this.textPop = null;
      this.dismissPopup(menu);
    }
    buildCtxItems(items, container) {
      items.forEach((item) => {
        if (item.separator) {
          const sep = document.createElement("div");
          sep.className = "y-dropdown__separator";
          sep.setAttribute("role", "separator");
          container.appendChild(sep);
          return;
        }
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "y-dropdown__item" + (hasChildren ? " y-dropdown__item--has-children" : "");
        btn.setAttribute("role", "menuitem");
        if (hasChildren) btn.setAttribute("aria-haspopup", "true");
        if (item.danger) btn.classList.add("y-dropdown__item--danger");
        if (item.className) btn.classList.add(...item.className.split(" ").filter(Boolean));
        const icon = this.ctxIcon(item);
        btn.innerHTML = (icon ? '<span class="y-dropdown__item-icon">' + icon + "</span>" : "") + '<span class="y-dropdown__item-label">' + this.t(item.label || "") + "</span>" + (hasChildren ? '<span class="y-dropdown__item-arrow">' + this.iconOr("submenu", "\u203A") + "</span>" : "");
        if (hasChildren) {
          let show = function() {
            clearTimeout(hideTimer);
            editor.positionSubmenu(btn, submenu);
            submenu.classList.remove("is-hidden");
            if (submenu.classList.contains("y-dropdown__submenu--inline")) editor.fitPopup(submenu.closest(".ye-popup"));
          }, hide = function() {
            hideTimer = setTimeout(() => submenu.classList.add("is-hidden"), 80);
          };
          const wrapper = document.createElement("div");
          wrapper.className = "y-dropdown__item-wrapper";
          const submenu = document.createElement("div");
          submenu.className = "y-dropdown__menu y-dropdown__submenu is-hidden";
          submenu.setAttribute("role", "menu");
          this.buildCtxItems(item.children, submenu);
          const editor = this;
          let hideTimer = null;
          btn.addEventListener("pointerenter", byMouse(show));
          btn.addEventListener("pointerleave", byMouse(hide));
          submenu.addEventListener("pointerenter", byMouse(() => clearTimeout(hideTimer)));
          submenu.addEventListener("pointerleave", byMouse(hide));
          btn.addEventListener("mousedown", (e) => e.preventDefault());
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (e.pointerType == "mouse") return show();
            if (!submenu.classList.contains("is-hidden")) {
              clearTimeout(hideTimer);
              submenu.classList.add("is-hidden");
              return;
            }
            container.querySelectorAll(":scope > .y-dropdown__item-wrapper > .y-dropdown__submenu").forEach((s) => s != submenu && s.classList.add("is-hidden"));
            show();
          });
          wrapper.appendChild(btn);
          wrapper.appendChild(submenu);
          container.appendChild(wrapper);
        } else {
          btn.addEventListener("mousedown", (e) => {
            e.preventDefault();
            this.runCtxItem(item);
            this.closeTextMenu();
          });
          container.appendChild(btn);
        }
      });
    }
    ctxIcon(item) {
      const key = item.key || CTX_ICON_KEYS[item.action] || item.action;
      if (item.icon && item.icon.includes("<")) return item.icon;
      return this.iconOr(key, item.icon ? '<span class="material-symbols-rounded">' + item.icon + "</span>" : "");
    }
    fitPopup(pop) {
      if (pop == null) return;
      const pad = 8;
      const r = pop.getBoundingClientRect();
      if (r.bottom <= window.innerHeight - pad) return;
      pop.style.top = Math.max(pad, window.innerHeight - pad - r.height) + "px";
      if (r.height > window.innerHeight - pad * 2) pop.classList.add("ye-popup--scroll");
    }
    positionSubmenu(btn, sub) {
      sub.classList.remove("y-dropdown__submenu--inline");
      sub.style.top = "";
      sub.style.bottom = "";
      sub.style.left = "";
      sub.style.right = "";
      const pad = 8;
      const t = btn.getBoundingClientRect();
      const m = sub.getBoundingClientRect();
      if (t.right + m.width > window.innerWidth - pad && t.left - m.width < pad) {
        sub.classList.add("y-dropdown__submenu--inline");
        return;
      }
      if (t.right + m.width > window.innerWidth - pad) {
        sub.style.left = "auto";
        sub.style.right = "100%";
      } else {
        sub.style.left = "100%";
        sub.style.right = "auto";
      }
      if (t.top + m.height > window.innerHeight - pad) {
        sub.style.top = "auto";
        sub.style.bottom = "0";
      } else {
        sub.style.top = "0";
        sub.style.bottom = "auto";
      }
    }
    runCtxItem(item) {
      this.restoreRange();
      this.area.focus();
      if (typeof item.onClick == "function") {
        item.onClick(this);
        this.sync();
        this.updateStates();
        return;
      }
      this.textCtxAction(item.action);
    }
    textCtxAction(action) {
      if (action == "selectAll") {
        const range = document.createRange();
        range.selectNodeContents(this.area);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        return;
      }
      if (action == "copy") {
        const text = (this.savedRange && !this.savedRange.collapsed ? this.plainText(this.savedRange) : "") || this.plainText(null);
        if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {
        });
        return;
      }
      if (action == "paste") {
        this.pasteFromClipboard();
        return;
      }
      if (action == "clear") {
        this.flushHistory();
        this.deselectImage();
        this.area.innerHTML = "";
        this.sync();
        this.recordState();
        return;
      }
      if (action == "clearFormat") {
        this.run("ye-clear");
        this.updateStates();
        return;
      }
      if (action == "find") {
        this.openFindPop();
        return;
      }
      if (action == "lower" || action == "upper" || action == "capitalize") {
        this.transformCase(action);
        return;
      }
      if (action == "link") {
        this.run("ye-link");
        return;
      }
      const map = { bold: "bold", italic: "italic", underline: "underline", strike: "strikeThrough", code: "ye-code" };
      if (map[action]) {
        this.run(map[action]);
        this.sync();
        this.updateStates();
      }
    }
    // The async clipboard gives images only as blobs, and a copied file from the system not at all
    pasteFromClipboard() {
      const clip = navigator.clipboard;
      const refused = () => this.notice("paste-blocked", this.t("The browser does not let the menu paste. Press Ctrl+V."));
      if (clip == null || !clip.readText) {
        refused();
        return;
      }
      const text = () => {
        clip.readText().then((t) => this.insertClipboard("", t)).catch(refused);
      };
      if (!clip.read || !this.onFiles && !this.uploadEnabled) {
        text();
        return;
      }
      clip.read().then(async (items) => {
        const files = [];
        for (const item of items) {
          const type = item.types.indexOf("text/plain") == -1 && item.types.find((t) => /^image\//.test(t));
          if (type) files.push(new File([await item.getType(type)], "image." + type.split("/")[1].replace("jpeg", "jpg"), { type }));
        }
        if (files.length == 0) {
          text();
          return;
        }
        if (this.onFiles) this.onFiles(files, this);
        else this.uploadFiles(files);
      }).catch(text);
    }
    plainText(range) {
      const frag = range ? range.cloneContents() : this.area.cloneNode(true);
      frag.querySelectorAll("img").forEach((img) => {
        if (this.isGlyph(img)) img.replaceWith(img.getAttribute("alt") || "");
      });
      return frag.textContent;
    }
    transformCase(action) {
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0) return;
      const range = sel.getRangeAt(0);
      if (range.collapsed || !this.area.contains(range.commonAncestorContainer)) return;
      const root = range.commonAncestorContainer.nodeType == 1 ? range.commonAncestorContainer : range.commonAncestorContainer.parentNode;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      const slices = [];
      let node;
      while (node = walker.nextNode()) {
        if (!range.intersectsNode(node)) continue;
        const start = node == range.startContainer ? range.startOffset : 0;
        const end = node == range.endContainer ? range.endOffset : node.nodeValue.length;
        if (end > start) slices.push({ node, start, end });
      }
      if (slices.length == 0) return;
      let boundary = true;
      let prev = null;
      let last = null;
      slices.forEach((s) => {
        if (action == "capitalize" && prev && this.lineBreakBetween(prev, s.node)) boundary = true;
        const seg = s.node.nodeValue.slice(s.start, s.end);
        let out;
        if (action == "lower") out = seg.toLowerCase();
        else if (action == "upper") out = seg.toUpperCase();
        else {
          out = "";
          for (const ch of seg) {
            if (/\s/.test(ch)) {
              out += ch;
              boundary = true;
            } else {
              out += boundary ? ch.toUpperCase() : ch.toLowerCase();
              boundary = false;
            }
          }
        }
        s.node.replaceData(s.start, s.end - s.start, out);
        prev = s.node;
        last = { node: s.node, start: s.start, len: out.length };
      });
      try {
        const restored = document.createRange();
        restored.setStart(slices[0].node, slices[0].start);
        restored.setEnd(last.node, last.start + last.len);
        sel.removeAllRanges();
        sel.addRange(restored);
      } catch (e) {
      }
      this.enforceLimit();
      this.sync();
      this.recordState();
    }
    lineBreakBetween(a, b) {
      if (this.closestBlock(a) != this.closestBlock(b)) return true;
      try {
        const gap = document.createRange();
        gap.setStartAfter(a);
        gap.setEndBefore(b);
        return gap.cloneContents().querySelector("br") != null;
      } catch (e) {
        return false;
      }
    }
  };

  // source/mixins/toolbar.js
  var withToolbar = (Base) => class extends Base {
    iconOr(key, fallback) {
      return this.icons && this.icons[key] != null ? this.icons[key] : fallback;
    }
    renderIcon(key) {
      return this.iconOr(key, '<span class="material-symbols-rounded ye-ico">' + (ICONS[key] || "") + "</span>");
    }
    buildToolbar(tokens) {
      const editor = this;
      function t(s) {
        return escapeHtml(editor.t(s));
      }
      function toggle(cls, title, inner) {
        return '<button type="button" class="ye-toolbar__btn' + cls + '" data-ye-menu-toggle aria-haspopup="true" aria-expanded="false" title="' + t(title) + '" aria-label="' + t(title) + '">' + inner + "</button>";
      }
      const extras = this.extraButtons();
      const placed = [];
      let html = '<div class="ye-toolbar" role="toolbar">';
      tokens.forEach((token) => {
        if (token == "|") {
          html += '<span class="ye-toolbar__sep" aria-hidden="true"></span>';
        } else if (token == "image" && (this.uploadEnabled || this.imageSources.length)) {
          html += '<div class="ye-menu" data-ye-menu>' + toggle("", "Insert image", this.renderIcon("image")) + '<div class="ye-menu__pop">' + (this.uploadEnabled ? '<button type="button" class="ye-menu__item" data-ye-upload>' + t("Upload image\u2026") + "</button>" : "") + this.imageSources.map((s, i) => '<button type="button" class="ye-menu__item" data-ye-source="' + i + '">' + escapeHtml(s.label) + "</button>").join("") + (this.imageUrl ? '<button type="button" class="ye-menu__item" data-cmd="ye-image">' + t("By URL\u2026") + "</button>" : "") + "</div></div>";
        } else if (token == "image" && !this.imageUrl) {
        } else if (token == "heading") {
          html += '<div class="ye-menu" data-ye-menu>' + toggle(" ye-toolbar__btn--wide", "Paragraph style", "<span data-ye-heading-label>" + t("Paragraph") + '</span><span class="ye-caret" aria-hidden="true">' + this.iconOr("caret", "\u25BE") + "</span>") + '<div class="ye-menu__pop">';
          ["p"].concat(this.headingLevels()).forEach((tag, i) => {
            html += '<button type="button" class="ye-menu__item ye-menu__item--' + tag + ' ye-menu__item--hinted" data-cmd="formatBlock" data-arg="' + tag + '">' + t(HEADINGS[tag]) + '<span class="ye-menu__hint">Ctrl+Alt+' + i + "</span></button>";
          });
          html += "</div></div>";
        } else if (token == "forecolor" || token == "backcolor") {
          const isFore = token == "forecolor";
          const colors = isFore ? TEXT_COLORS : MARK_COLORS;
          const cmd = isFore ? "ye-forecolor" : "ye-backcolor";
          html += '<div class="ye-menu" data-ye-menu>' + toggle(" ye-toolbar__btn--" + (isFore ? "fore" : "back"), isFore ? "Text color" : "Highlight", this.iconOr(token, "A")) + '<div class="ye-menu__pop ye-menu__pop--colors">';
          colors.forEach((c) => {
            html += '<button type="button" class="ye-swatch" style="background: ' + c + '" data-cmd="' + cmd + '" data-arg="' + c + '" title="' + c + '" aria-label="' + c + '"></button>';
          });
          html += '<button type="button" class="ye-swatch ye-swatch--none" data-cmd="' + cmd + '" data-arg="" title="' + t("Remove") + '" aria-label="' + t("Remove") + '">' + this.iconOr("color-none", "\u2715") + "</button>";
          html += '<div class="ye-color-custom" data-ye-color="' + cmd + '"><input type="color" class="ye-color-native" value="#000000" title="' + t("Custom color") + '" aria-label="' + t("Custom color") + '"><input type="text" class="ye-color-hex" placeholder="#RRGGBB" maxlength="9" spellcheck="false" aria-label="' + t("Custom color") + '"></div>';
          html += "</div></div>";
        } else if (token == "table") {
          html += '<div class="ye-menu" data-ye-menu>' + toggle("", "Table", this.renderIcon("table")) + '<div class="ye-menu__pop ye-menu__pop--table" data-ye-table-pop></div></div>';
        } else if (extras.some((b) => b.key == token)) {
          placed.push(token);
          html += this.extraButtonHtml(extras.find((b) => b.key == token));
        } else if (DEFS[token]) {
          const d = DEFS[token];
          const tip = t(d.title) + (SHORTCUTS[token] ? " (" + SHORTCUTS[token] + ")" : "");
          html += '<button type="button" class="ye-toolbar__btn' + (d.mod ? " ye-toolbar__btn--" + d.mod : "") + '" data-cmd="' + d.cmd + '"' + (d.arg != null ? ' data-arg="' + d.arg + '"' : "") + ' title="' + tip + '" aria-label="' + t(d.title) + '">' + this.renderIcon(token) + "</button>";
        }
      });
      extras.forEach((b) => {
        if (placed.indexOf(b.key) == -1) html += this.extraButtonHtml(b);
      });
      return html + "</div>";
    }
    // Host buttons: { key, icon, title, shortcut, onClick(editor, button) }
    extraButtons() {
      const list = this.options && Array.isArray(this.options.extraButtons) ? this.options.extraButtons : [];
      return list.filter((b) => b && b.key && typeof b.onClick == "function");
    }
    extraButtonHtml(b) {
      const icon = b.icon && b.icon.includes("<") ? b.icon : this.iconOr(b.key, '<span class="material-symbols-rounded ye-ico">' + escapeHtml(b.icon || "") + "</span>");
      const title = escapeHtml(b.title || b.key);
      return '<button type="button" class="ye-toolbar__btn" data-ye-extra="' + escapeHtml(b.key) + '" title="' + title + (b.shortcut ? " (" + escapeHtml(b.shortcut) + ")" : "") + '" aria-label="' + title + '">' + icon + "</button>";
    }
  };

  // source/mixins/history.js
  function pathTo(root, node) {
    const path = [];
    while (node && node != root) {
      path.unshift(Array.prototype.indexOf.call(node.parentNode.childNodes, node));
      node = node.parentNode;
    }
    return node == root ? path : null;
  }
  function nodeAt(root, path) {
    let node = root;
    for (let i = 0; i < path.length && node; i++) node = node.childNodes[path[i]];
    return node || null;
  }
  function nodeSize(node) {
    return node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length;
  }
  var withHistory = (Base) => class extends Base {
    recordState() {
      if (this.histTimer) {
        clearTimeout(this.histTimer);
        this.histTimer = null;
      }
      if (this.root.classList.contains("ye--source")) return;
      const html = this.area.innerHTML;
      const cur = this.history[this.histIndex];
      if (cur != null && cur.html == html) return;
      if (this.histIndex < this.history.length - 1) this.history.length = this.histIndex + 1;
      this.history.push({ html, caret: this.getCaret() });
      if (this.history.length > this.HIST_MAX) this.history.shift();
      this.histIndex = this.history.length - 1;
      this.updateHistoryButtons();
    }
    scheduleRecord() {
      if (this.histTimer) clearTimeout(this.histTimer);
      this.histTimer = setTimeout(() => {
        this.histTimer = null;
        this.recordState();
      }, 300);
    }
    flushHistory() {
      if (this.histTimer) this.recordState();
      else this.noteCaret();
    }
    // Before a change, while the text is still what the last step holds: that step keeps the caret of now,
    // so undoing the change brings the caret back to where it was made
    noteCaret() {
      if (this.histTimer || this.restoring) return;
      const cur = this.history[this.histIndex];
      if (cur == null || cur.html != this.area.innerHTML) return;
      const caret = this.getCaret();
      if (caret) cur.caret = caret;
    }
    undo() {
      this.flushHistory();
      if (this.histIndex <= 0) return;
      this.histIndex--;
      this.applyState(this.history[this.histIndex]);
    }
    redo() {
      this.flushHistory();
      if (this.histIndex >= this.history.length - 1) return;
      this.histIndex++;
      this.applyState(this.history[this.histIndex]);
    }
    applyState(state) {
      if (state == null) return;
      this.restoring = true;
      this.deselectImage();
      this.area.innerHTML = state.html;
      this.settleUploads();
      const stale = this.area.querySelectorAll(".ye-img--sel");
      for (let i = 0; i < stale.length; i++) stale[i].classList.remove("ye-img--sel");
      this.setCaret(state.caret);
      this.sync();
      this.updateStates();
      this.updateHistoryButtons();
      this.restoring = false;
    }
    updateHistoryButtons() {
      const states = [["undo", this.histIndex <= 0], ["redo", this.histIndex >= this.history.length - 1]];
      states.forEach(([cmd, disabled]) => {
        const b = this.root.querySelector('.ye-toolbar__btn[data-cmd="' + cmd + '"]');
        if (b) {
          b.setAttribute("aria-disabled", disabled ? "true" : "false");
          b.classList.toggle("is-disabled", disabled);
        }
      });
    }
    getCaret() {
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0) return null;
      const range = sel.getRangeAt(0);
      if (!this.area.contains(range.commonAncestorContainer)) return null;
      const pre = range.cloneRange();
      pre.selectNodeContents(this.area);
      pre.setEnd(range.startContainer, range.startOffset);
      const start = pre.toString().length;
      return {
        start,
        end: start + range.toString().length,
        sPath: pathTo(this.area, range.startContainer),
        sOff: range.startOffset,
        ePath: pathTo(this.area, range.endContainer),
        eOff: range.endOffset
      };
    }
    setCaret(pos) {
      if (pos == null) return;
      const sNode = pos.sPath ? nodeAt(this.area, pos.sPath) : null;
      const eNode = pos.ePath ? nodeAt(this.area, pos.ePath) : null;
      if (sNode && eNode && pos.sOff <= nodeSize(sNode) && pos.eOff <= nodeSize(eNode)) {
        try {
          const range = document.createRange();
          range.setStart(sNode, pos.sOff);
          range.setEnd(eNode, pos.eOff);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          return;
        } catch (e) {
        }
      }
      const walker = document.createTreeWalker(this.area, NodeFilter.SHOW_TEXT, null);
      let chars = 0, sN = null, sO = 0, eN = null, eO = 0, n;
      const spans = pos.end > pos.start;
      while (n = walker.nextNode()) {
        const len = n.nodeValue.length;
        if (sN == null && (spans ? pos.start < chars + len : pos.start <= chars + len)) {
          sN = n;
          sO = pos.start - chars;
        }
        if (pos.end <= chars + len) {
          eN = n;
          eO = pos.end - chars;
          break;
        }
        chars += len;
      }
      if (sN == null) return;
      if (eN == null) {
        eN = sN;
        eO = sO;
      }
      try {
        const range = document.createRange();
        range.setStart(sN, Math.min(sO, sN.nodeValue.length));
        range.setEnd(eN, Math.min(eO, eN.nodeValue.length));
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } catch (e) {
      }
    }
  };

  // source/mixins/selection.js
  var withSelection = (Base) => class extends Base {
    closestBlock(node) {
      if (node == null || !this.area.contains(node)) return null;
      while (node && node != this.area) {
        if (node.nodeType == 1 && node.matches(BLOCK_SEL)) return node;
        node = node.parentNode;
      }
      return null;
    }
    selectionBlocks() {
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0) return [];
      const range = sel.getRangeAt(0);
      let out = [];
      const all = this.area.querySelectorAll(BLOCK_SEL);
      for (let i = 0; i < all.length; i++) {
        if (range.intersectsNode(all[i])) out.push(all[i]);
      }
      out = out.filter((b) => !out.some((o) => o != b && b.contains(o)));
      if (out.length == 0) out.push(this.closestBlock(range.startContainer) || this.area);
      return out;
    }
    saveRange() {
      const sel = window.getSelection();
      if (sel && sel.rangeCount && this.area.contains(sel.getRangeAt(0).commonAncestorContainer)) {
        this.savedRange = sel.getRangeAt(0).cloneRange();
      }
    }
    restoreRange() {
      let range = this.savedRange;
      if (range == null || !this.area.contains(range.commonAncestorContainer)) {
        range = document.createRange();
        range.selectNodeContents(this.area);
        range.collapse(false);
      }
      const top = this.area.scrollTop;
      const pageX = window.scrollX;
      const pageY = window.scrollY;
      this.area.focus({ preventScroll: true });
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      this.area.scrollTop = top;
      if (window.scrollY != pageY || window.scrollX != pageX) window.scrollTo(pageX, pageY);
    }
    currentCell() {
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0) return null;
      let node = sel.getRangeAt(0).startContainer;
      if (!this.area.contains(node)) return null;
      while (node && node != this.area) {
        if (node.nodeType == 1 && (node.tagName == "TD" || node.tagName == "TH")) return node;
        node = node.parentNode;
      }
      return null;
    }
    currentAnchor() {
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0) return null;
      let node = sel.getRangeAt(0).startContainer;
      if (!this.area.contains(node)) return null;
      while (node && node != this.area) {
        if (node.nodeType == 1 && node.tagName == "A") return node;
        node = node.parentNode;
      }
      return null;
    }
  };

  // source/mixins/commands.js
  var withCommands = (Base) => class extends Base {
    run(cmd, arg) {
      if (cmd == "ye-source-toggle") return this.toggleSource();
      if (cmd == "ye-fullscreen") return this.toggleFull();
      if (this.root.classList.contains("ye--source")) return;
      this.area.focus();
      if (cmd == "undo") return this.undo();
      if (cmd == "redo") return this.redo();
      this.flushHistory();
      if (cmd == "ye-link") return this.insertLink();
      if (cmd == "ye-image") return this.insertImage();
      if (cmd == "ye-video") return this.insertVideo();
      if (cmd == "ye-hr") return exec("insertHTML", "<hr><p><br></p>");
      if (cmd == "ye-code") return this.toggleInline("code");
      if (cmd == "ye-codeblock") return this.codeBlock();
      if (cmd == "ye-align") return this.setAlign(arg);
      if (cmd == "ye-indent") return this.step(32);
      if (cmd == "ye-outdent") return this.step(-32);
      if (cmd == "ye-forecolor") {
        this.restoreRange();
        return this.applyColor("foreColor", arg);
      }
      if (cmd == "ye-backcolor") {
        this.restoreRange();
        return this.applyColor("hiliteColor", arg);
      }
      if (cmd == "ye-clear") {
        this.clearFormatting();
        return;
      }
      if (cmd == "ye-lower") return this.transformCase("lower");
      if (cmd == "ye-capitalize") return this.transformCase("capitalize");
      if (cmd == "ye-upper") return this.transformCase("upper");
      if (cmd == "ye-find") return this.openFindPop();
      if (cmd == "formatBlock") return this.formatBlock(arg);
      if (cmd == "insertOrderedList" || cmd == "insertUnorderedList") return this.list(cmd);
      exec(cmd, arg);
    }
    formatBlock(arg) {
      let current = "";
      try {
        current = (document.queryCommandValue("formatBlock") || "").toLowerCase();
      } catch (e) {
      }
      const target = current == arg ? "p" : arg;
      exec("formatBlock", "<" + target + ">");
    }
    codeBlock() {
      this.formatBlock("pre");
      const sel = window.getSelection();
      const pre = sel && sel.rangeCount ? ancestorTag(sel.anchorNode, "PRE") : null;
      if (pre && pre.parentNode == this.area && pre.nextElementSibling == null) pre.insertAdjacentHTML("afterend", "<p><br></p>");
    }
    applyColor(cmd, color) {
      exec("styleWithCSS", "true");
      if (cmd == "hiliteColor" && !document.queryCommandSupported("hiliteColor")) cmd = "backColor";
      exec(cmd, color || "inherit");
      exec("styleWithCSS", "false");
    }
    applyCustomColor(el) {
      const box = el.closest(".ye-color-custom");
      const isNative = el.classList.contains("ye-color-native");
      const color = isNative ? el.value : normalizeHex(el.value);
      if (color == null) return;
      const native = box.querySelector(".ye-color-native");
      const hex = box.querySelector(".ye-color-hex");
      if (/^#[0-9a-f]{6}$/i.test(color)) native.value = color.toLowerCase();
      hex.value = color;
      this.run(box.dataset.yeColor, color);
      this.closeMenus();
      this.sync();
      this.updateStates();
    }
    // Bare text sits in the area itself, whose own style is never saved
    styleBlocks() {
      if (!this.inline && this.selectionBlocks().indexOf(this.area) != -1) exec("formatBlock", "<p>");
      return this.selectionBlocks().filter((b) => b != this.area);
    }
    setAlign(value) {
      this.styleBlocks().forEach((b) => {
        b.style.textAlign = value;
      });
    }
    step(delta) {
      this.styleBlocks().forEach((b) => {
        const cur = parseInt(b.style.marginLeft, 10) || 0;
        const next = Math.max(0, cur + delta);
        b.style.marginLeft = next ? next + "px" : "";
      });
    }
    toggleInline(tag) {
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0) return;
      const range = sel.getRangeAt(0);
      if (range.collapsed || !this.area.contains(range.commonAncestorContainer)) return;
      const existing = ancestorTag(range.commonAncestorContainer, tag.toUpperCase());
      if (existing) {
        const parent = existing.parentNode;
        while (existing.firstChild) parent.insertBefore(existing.firstChild, existing);
        parent.removeChild(existing);
        return;
      }
      const wrapper = document.createElement(tag);
      wrapper.appendChild(range.extractContents());
      range.insertNode(wrapper);
      sel.removeAllRanges();
      const re = document.createRange();
      re.selectNodeContents(wrapper);
      sel.addRange(re);
    }
    clearFormatting() {
      exec("removeFormat");
      exec("unlink");
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0) return;
      const range = sel.getRangeAt(0);
      let scope = range.commonAncestorContainer;
      if (scope.nodeType != 1) scope = scope.parentNode;
      if (scope == null) return;
      if (!this.area.contains(scope)) scope = this.area;
      const els = [scope].concat(Array.prototype.slice.call(scope.querySelectorAll("*")));
      els.forEach((el) => {
        if (el == this.area) return;
        if (range.intersectsNode && !range.intersectsNode(el)) return;
        if (el.tagName == "IMG" && this.isGlyph(el)) return;
        const kept = (el.getAttribute("class") || "").split(/\s+/).filter((c) => CLASS_ALLOWED.indexOf(c) != -1);
        if (kept.length) el.setAttribute("class", kept.join(" "));
        else el.removeAttribute("class");
        el.removeAttribute("style");
        const keep = ATTRS[el.tagName.toLowerCase()] || [];
        Array.prototype.slice.call(el.attributes).forEach((a) => {
          const name = a.name.toLowerCase();
          if (name == "class" || this.allowData && name.indexOf("data-") == 0) return;
          if (keep.indexOf(name) == -1) el.removeAttribute(a.name);
        });
      });
      this.sync();
    }
  };

  // source/mixins/prompt.js
  var withPrompt = (Base) => class extends Base {
    promptPop(opts) {
      this.saveRange();
      this.formOpenTs = Date.now();
      let pop = this.formPop;
      const fresh = pop == null;
      if (fresh) {
        pop = this.makePopup("ye-formpop");
        this.formPop = pop;
        pop.addEventListener("keydown", (e) => {
          if (e.key == "Escape" && this.formPop == pop) {
            e.preventDefault();
            this.hideFormPop();
          }
        });
      }
      const first = this.fillForm(pop, opts);
      if (this.nextFormAnchor) {
        this.placePopupAt(pop, this.nextFormAnchor.x, this.nextFormAnchor.y);
        this.nextFormAnchor = null;
      } else {
        this.placePopupBelow(pop, (this.toolbar || this.area).getBoundingClientRect(), "left");
      }
      if (fresh) this.revealPopup(pop);
      this.popTop = this.root.getBoundingClientRect().top;
      if (first) {
        try {
          first.focus({ preventScroll: true });
        } catch (e) {
          first.focus();
        }
        if (first.select) first.select();
      }
    }
    fillForm(pop, opts) {
      pop.innerHTML = "";
      const inputs = (opts.fields || []).map((f) => {
        if (f.type == "checkbox") {
          const label = document.createElement("label");
          label.className = "ye-formpop__check";
          const cb = document.createElement("input");
          cb.type = "checkbox";
          cb.checked = !!f.checked;
          label.appendChild(cb);
          label.appendChild(document.createTextNode(" " + (f.label || "")));
          pop.appendChild(label);
          return cb;
        }
        const inp = document.createElement("input");
        inp.type = "text";
        inp.className = "ye-formpop__input";
        inp.placeholder = f.placeholder || "";
        inp.setAttribute("aria-label", inp.placeholder);
        inp.value = f.value || "";
        pop.appendChild(inp);
        return inp;
      });
      const err = document.createElement("div");
      err.className = "ye-formpop__err";
      pop.appendChild(err);
      const row = document.createElement("div");
      row.className = "ye-formpop__row";
      const cancel = document.createElement("button");
      cancel.type = "button";
      cancel.className = "ye-formpop__btn";
      cancel.textContent = this.t("Cancel");
      const ok = document.createElement("button");
      ok.type = "button";
      ok.className = "ye-formpop__btn ye-formpop__btn--ok";
      ok.textContent = this.t("OK");
      row.appendChild(cancel);
      row.appendChild(ok);
      pop.appendChild(row);
      const textInputs = inputs.filter((i) => i.type != "checkbox");
      const editor = this;
      function submit() {
        const vals = inputs.map((i) => i.type == "checkbox" ? i.checked : i.value.trim());
        editor.restoreRange();
        editor.area.focus();
        const msg = opts.onSubmit(vals);
        if (msg) {
          err.textContent = msg;
          err.classList.add("is-shown");
          (textInputs[0] || inputs[0]).focus();
        } else editor.hideFormPop();
      }
      ok.addEventListener("mousedown", (e) => {
        e.preventDefault();
        submit();
      });
      cancel.addEventListener("mousedown", (e) => {
        e.preventDefault();
        this.hideFormPop();
      });
      ok.addEventListener("click", (e) => {
        if (e.detail == 0) submit();
      });
      cancel.addEventListener("click", (e) => {
        if (e.detail == 0) this.hideFormPop();
      });
      inputs.forEach((i) => i.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
          e.preventDefault();
          submit();
        } else if (e.key == "Escape") {
          e.preventDefault();
          this.hideFormPop();
        }
      }));
      return textInputs[0] || inputs[0];
    }
    hideFormPop() {
      if (this.formPop == null) return;
      const pop = this.formPop;
      this.formPop = null;
      if (pop.contains(document.activeElement)) this.restoreRange();
      this.dismissFormPop(pop);
    }
    dismissFormPop(pop) {
      this.dismissPopup(pop);
    }
  };

  // source/mixins/find.js
  var CssHighlight = typeof Highlight == "function" ? Highlight : null;
  var findMarks = /* @__PURE__ */ new Map();
  function paintFind() {
    if (CssHighlight == null || !window.CSS || !CSS.highlights) return;
    if (findMarks.size == 0) {
      CSS.highlights.delete("ye-find");
      CSS.highlights.delete("ye-find-current");
      return;
    }
    const all = new CssHighlight();
    const current = new CssHighlight();
    findMarks.forEach((own) => {
      own.all.forEach((r) => all.add(r));
      own.current.forEach((r) => current.add(r));
    });
    CSS.highlights.set("ye-find", all);
    CSS.highlights.set("ye-find-current", current);
  }
  var withFind = (Base) => class extends Base {
    openFindPop() {
      if (this.findPop) {
        this.findInput.focus();
        this.findInput.select();
        return;
      }
      const pop = this.makePopup("ye-findpop");
      this.fillFindPop(pop);
      this.placePopupBelow(pop, (this.toolbar || this.area).getBoundingClientRect(), "right");
      this.revealPopup(pop);
      this.popTop = this.root.getBoundingClientRect().top;
      this.findInput.focus();
      this.findInput.select();
      this.runFind();
    }
    fillFindPop(pop) {
      const editor = this;
      function t(s) {
        return escapeHtml(editor.t(s));
      }
      pop.innerHTML = '<div class="ye-findpop__row"><input type="text" class="ye-formpop__input ye-findpop__q" placeholder="' + t("Find") + '" aria-label="' + t("Find") + '" spellcheck="false"><span class="ye-findpop__count" aria-live="polite"></span><button type="button" class="ye-findpop__btn" data-ye-find="prev" title="' + t("Previous") + '" aria-label="' + t("Previous") + '">' + this.renderIcon("find-prev") + '</button><button type="button" class="ye-findpop__btn" data-ye-find="next" title="' + t("Next") + '" aria-label="' + t("Next") + '">' + this.renderIcon("find-next") + '</button><button type="button" class="ye-findpop__btn" data-ye-find="close" title="' + t("Close") + '" aria-label="' + t("Close") + '">' + this.iconOr("find-close", "\u2715") + '</button></div><div class="ye-findpop__row"><input type="text" class="ye-formpop__input ye-findpop__r" placeholder="' + t("Replace with") + '" aria-label="' + t("Replace with") + '" spellcheck="false"><button type="button" class="ye-formpop__btn" data-ye-find="one">' + t("Replace") + '</button><button type="button" class="ye-formpop__btn" data-ye-find="all">' + t("All") + '</button></div><label class="ye-formpop__check"><input type="checkbox" class="ye-findpop__case"> ' + t("Match case") + "</label>";
      this.findPop = pop;
      this.findInput = pop.querySelector(".ye-findpop__q");
      this.replaceInput = pop.querySelector(".ye-findpop__r");
      this.findCount = pop.querySelector(".ye-findpop__count");
      this.findCase = pop.querySelector(".ye-findpop__case");
      function press(e) {
        const b = e.target.closest("[data-ye-find]");
        if (b == null) return;
        e.preventDefault();
        const op = b.dataset.yeFind;
        if (op == "prev") editor.findNav(-1);
        else if (op == "next") editor.findNav(1);
        else if (op == "one") editor.replaceCurrent();
        else if (op == "all") editor.replaceAll();
        else if (op == "close") editor.hideFindPop();
      }
      pop.addEventListener("mousedown", press);
      pop.addEventListener("keydown", (e) => {
        if (e.key == "Escape" && this.findPop == pop) {
          e.preventDefault();
          this.hideFindPop();
        }
      });
      pop.addEventListener("click", (e) => {
        if (e.detail == 0) press(e);
      });
      this.findInput.addEventListener("input", () => this.runFind());
      this.findCase.addEventListener("change", () => this.runFind());
      function histKey(e) {
        const k = shortcutKey(e);
        if (!(e.ctrlKey || e.metaKey) || k != "z" && k != "y") return false;
        e.preventDefault();
        if (k == "y" || e.shiftKey) editor.redo();
        else editor.undo();
        e.currentTarget.focus();
        return true;
      }
      this.findInput.addEventListener("keydown", (e) => {
        if (histKey(e)) return;
        if (e.key == "Enter") {
          e.preventDefault();
          this.findNav(e.shiftKey ? -1 : 1);
        } else if (e.key == "Escape") {
          e.preventDefault();
          this.hideFindPop();
        }
      });
      this.replaceInput.addEventListener("keydown", (e) => {
        if (histKey(e)) return;
        if (e.key == "Enter") {
          e.preventDefault();
          this.replaceCurrent();
        } else if (e.key == "Escape") {
          e.preventDefault();
          this.hideFindPop();
        }
      });
      const selText = window.getSelection() && window.getSelection().toString() || "";
      if (selText && selText.length < 120 && this.area.contains(window.getSelection().anchorNode)) this.findInput.value = selText;
    }
    hideFindPop() {
      if (this.findPop == null) return;
      const pop = this.findPop;
      this.findPop = null;
      this.findState = null;
      if (pop.contains(document.activeElement)) this.restoreRange();
      this.clearFindHighlights();
      this.dismissFindPop(pop);
    }
    dismissFindPop(pop) {
      this.dismissPopup(pop);
    }
    runFind() {
      const q = this.findInput ? this.findInput.value : "";
      const cs = this.findCase ? this.findCase.checked : false;
      this.findState = { query: q, cs, matches: q ? this.findMatches(q, cs) : [], index: 0 };
      this.showFindMatch();
    }
    refreshFind() {
      if (this.findPop == null || this.findInput == null) return;
      const q = this.findInput.value;
      const cs = this.findCase ? this.findCase.checked : false;
      const prev = this.findState ? this.findState.index : 0;
      const matches = q ? this.findMatches(q, cs) : [];
      const index = Math.min(prev, Math.max(0, matches.length - 1));
      this.findState = { query: q, cs, matches, index };
      if (this.findCount) this.findCount.textContent = matches.length ? index + 1 + " / " + matches.length : q ? this.t("No matches") : "";
      this.highlightMatches();
    }
    // Offsets from the original: lowercasing can change length ("İ")
    matchesIn(text, q, cs) {
      const out = [];
      const re = new RegExp(escapeRegExp(q), cs ? "gu" : "giu");
      let m;
      while (m = re.exec(text)) {
        if (m[0].length == 0) {
          re.lastIndex++;
          continue;
        }
        out.push({ start: m.index, end: m.index + m[0].length });
      }
      return out;
    }
    findMatches(q, cs) {
      const out = [];
      const walker = document.createTreeWalker(this.area, NodeFilter.SHOW_TEXT, null);
      let n;
      while (n = walker.nextNode()) {
        this.matchesIn(n.nodeValue, q, cs).forEach((m) => out.push({ node: n, start: m.start, end: m.end }));
      }
      return out;
    }
    showFindMatch() {
      const st = this.findState;
      if (st == null || this.findCount == null) return;
      const n = st.matches.length;
      this.findCount.textContent = n ? st.index + 1 + " / " + n : st.query ? this.t("No matches") : "";
      this.highlightMatches();
      if (!n) return;
      const m = st.matches[st.index];
      try {
        const r = document.createRange();
        r.setStart(m.node, m.start);
        r.setEnd(m.node, m.end);
        const rect = r.getBoundingClientRect();
        const ar = this.area.getBoundingClientRect();
        if (rect.top < ar.top + 20) this.area.scrollTop += rect.top - ar.top - 40;
        else if (rect.bottom > ar.bottom - 20) this.area.scrollTop += rect.bottom - ar.bottom + 40;
      } catch (e) {
      }
    }
    highlightMatches() {
      if (CssHighlight == null || !window.CSS || !CSS.highlights) return;
      const st = this.findState;
      const own = { all: [], current: [] };
      if (st) {
        for (let i = 0; i < st.matches.length; i++) {
          const m = st.matches[i];
          const r = document.createRange();
          try {
            r.setStart(m.node, m.start);
            r.setEnd(m.node, m.end);
          } catch (e) {
            continue;
          }
          if (i == st.index) own.current.push(r);
          else own.all.push(r);
        }
      }
      findMarks.set(this, own);
      paintFind();
    }
    clearFindHighlights() {
      findMarks.delete(this);
      paintFind();
    }
    findNav(dir) {
      const st = this.findState;
      if (st == null || st.matches.length == 0) return;
      st.index = (st.index + dir + st.matches.length) % st.matches.length;
      this.showFindMatch();
    }
    replaceCurrent() {
      const st = this.findState;
      if (st == null || st.matches.length == 0) return;
      const m = st.matches[st.index];
      try {
        const r = document.createRange();
        r.setStart(m.node, m.start);
        r.setEnd(m.node, m.end);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
        this.area.focus();
        exec("insertText", this.replaceInput.value);
        this.enforceLimit();
        this.sync();
        this.recordState();
      } catch (e) {
      }
      const keep = st.index;
      this.runFind();
      if (this.findState.matches.length) {
        this.findState.index = Math.min(keep, this.findState.matches.length - 1);
        this.showFindMatch();
      }
      if (this.replaceInput) this.replaceInput.focus();
    }
    replaceAll() {
      const q = this.findInput.value;
      if (!q) return;
      const cs = this.findCase.checked;
      const rep = this.replaceInput.value;
      const walker = document.createTreeWalker(this.area, NodeFilter.SHOW_TEXT, null);
      const nodes = [];
      let n;
      while (n = walker.nextNode()) nodes.push(n);
      let count = 0;
      nodes.forEach((node) => {
        const text = node.nodeValue;
        const found = this.matchesIn(text, q, cs);
        if (found.length == 0) return;
        let result = "", from = 0;
        found.forEach((m) => {
          result += text.slice(from, m.start) + rep;
          from = m.end;
        });
        node.nodeValue = result + text.slice(from);
        count += found.length;
      });
      if (count) {
        this.enforceLimit();
        this.sync();
        this.recordState();
      }
      this.runFind();
      if (this.findCount) this.findCount.textContent = this.t("Replaced") + " " + count;
    }
  };

  // source/mixins/media.js
  var IMG_BAR_TOKENS = ["--ye-surface", "--ye-border", "--ye-text", "--ye-hover", "--ye-accent", "--ye-accent-ink", "--ye-accent-soft", "--ye-on-accent", "--ye-danger"];
  var withMedia = (Base) => class extends Base {
    insertLink() {
      const sel = window.getSelection();
      const selected = sel ? sel.toString() : "";
      const anchor = this.currentAnchor();
      const newTab = anchor ? (anchor.getAttribute("target") || "_blank").toLowerCase() != "_self" : true;
      const extra = this.options.linkFields !== false;
      const fields = [{ placeholder: this.t("Link URL"), value: anchor ? anchor.getAttribute("href") : "https://" }];
      if (extra) {
        fields.push({ placeholder: this.t("Title (optional)"), value: anchor ? anchor.getAttribute("title") || "" : "" });
        fields.push({ type: "checkbox", label: this.t("Open in new tab"), checked: newTab });
      }
      this.promptPop({
        fields,
        onSubmit: (vals) => this.applyLink(vals[0], anchor, selected, extra ? { title: vals[1], newTab: vals[2] } : null)
      });
    }
    // An empty url unlinks; attrs null leaves title and target as they are
    applyLink(url, anchor, selected, attrs) {
      url = (url || "").trim();
      if (/^[a-z][a-z0-9+.-]*:\/*$/i.test(url)) return this.t("Enter a link address.");
      if (/^www\./i.test(url) || /^[^/@:\s]+\.[a-z]{2,}(\/\S*)?$/i.test(url)) url = "https://" + url;
      this.flushHistory();
      if (url == "") {
        if (anchor) {
          const parent = anchor.parentNode;
          while (anchor.firstChild) parent.insertBefore(anchor.firstChild, anchor);
          parent.removeChild(anchor);
          this.sync();
        } else {
          exec("unlink");
        }
        this.recordState();
        return null;
      }
      if (!isSafeUrl(url)) return this.t("That link scheme is not allowed.");
      let a = anchor;
      if (a) {
        a.setAttribute("href", url);
      } else if (selected == "") {
        exec("insertHTML", '<a href="' + escapeHtml(url) + '">' + escapeHtml(url) + "</a>");
        a = this.currentAnchor();
      } else {
        exec("createLink", url);
        a = this.currentAnchor();
      }
      if (a && attrs) {
        if (attrs.title) a.setAttribute("title", attrs.title);
        else a.removeAttribute("title");
        if (attrs.newTab) {
          a.setAttribute("target", "_blank");
          a.setAttribute("rel", "noopener noreferrer nofollow");
        } else {
          a.setAttribute("target", "_self");
          a.removeAttribute("rel");
        }
      }
      this.sync();
      this.recordState();
      return null;
    }
    insertImage() {
      this.promptPop({
        fields: [{ placeholder: this.t("Image URL"), value: "https://" }, { placeholder: this.t("Alt text (optional)"), value: "" }],
        onSubmit: (vals) => {
          const url = vals[0];
          if (!isSafeUrl(url)) return this.t("That image URL is not allowed.");
          exec("insertHTML", '<img src="' + escapeHtml(url) + '" alt="' + escapeHtml(vals[1] || "") + '">');
          return null;
        }
      });
    }
    insertVideo() {
      this.promptPop({
        fields: [{ placeholder: this.t("YouTube or Vimeo URL"), value: "https://" }],
        onSubmit: (vals) => {
          const src = embedFromUrl(vals[0]);
          if (src == null) return this.t("Only YouTube and Vimeo links are supported.");
          this.flushHistory();
          const frame = document.createElement("iframe");
          frame.setAttribute("src", src);
          frame.setAttribute("frameborder", "0");
          frame.setAttribute("allowfullscreen", "");
          const next = document.createElement("p");
          next.innerHTML = "<br>";
          const sel = window.getSelection();
          const block = sel && sel.rangeCount ? this.closestBlock(sel.anchorNode) : null;
          const top = block && block != this.area && block.parentNode == this.area ? block : null;
          if (top && top.textContent.trim() == "" && top.querySelector("img, iframe") == null) top.replaceWith(frame);
          else if (top) top.after(frame);
          else this.area.appendChild(frame);
          frame.after(next);
          this.caretInto(next);
          this.sync();
          this.recordState();
          return null;
        }
      });
    }
    linkOp(op) {
      const anchor = this.ctxAnchor;
      if (anchor == null) return;
      if (op == "edit") {
        const range = document.createRange();
        range.selectNodeContents(anchor);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        this.nextFormAnchor = this.ctxAnchorPos;
        this.insertLink();
      } else if (op == "open") {
        const href = anchor.getAttribute("href");
        if (href && isSafeUrl(href)) window.open(href, "_blank", "noopener");
      } else if (op == "remove") {
        const parent = anchor.parentNode;
        while (anchor.firstChild) parent.insertBefore(anchor.firstChild, anchor);
        parent.removeChild(anchor);
      }
    }
    // Every picture shows at once where the caret is, dimmed, and takes its address when its upload is done;
    // the uploads go one by one
    uploadFiles(list) {
      const files = Array.prototype.slice.call(list).filter((file) => this.uploadable(file));
      if (files.length == 0) return Promise.resolve();
      this.saveRange();
      this.flushHistory();
      this.restoreRange();
      const marks = files.map((file) => {
        this.uploadSeq = (this.uploadSeq || 0) + 1;
        const mark = "u" + this.uploadSeq;
        let preview = "";
        try {
          preview = URL.createObjectURL(file);
        } catch (e) {
        }
        exec("insertHTML", '<img src="' + escapeHtml(preview) + '" alt="" class="ye-img--uploading" data-ye-up="' + mark + '">');
        return { file, mark, preview };
      });
      this.uploading = (this.uploading || 0) + marks.length;
      this.setBusy(true);
      let chain = Promise.resolve();
      marks.forEach((m) => {
        chain = chain.then(() => this.uploadFile(m.file, m));
      });
      return chain;
    }
    uploadable(file) {
      if (!/^image\//.test(file.type)) return false;
      if (this.maxImageKb && file.size > this.maxImageKb * 1024) {
        this.notice("image-too-large", this.t("Image is too large") + " (" + this.maxImageKb + " KB)");
        return false;
      }
      return true;
    }
    // A host shows it its own way (a toast); on its own the editor falls back to an alert
    notice(type, text) {
      if (typeof this.options.onNotice == "function") this.options.onNotice(type, text);
      else window.alert(text);
      this.emit("notice", { type, text });
    }
    uploadFile(file, placed) {
      if (placed == null) return this.uploadFiles([file]);
      const task = this.onImageUpload ? new Promise((resolve) => resolve(this.onImageUpload(file))) : this.postImage(file);
      const editor = this;
      function preview() {
        return editor.area.querySelector('img[data-ye-up="' + placed.mark + '"]');
      }
      function done() {
        if (placed.preview) URL.revokeObjectURL(placed.preview);
        editor.uploading = Math.max(0, (editor.uploading || 1) - 1);
        if (editor.uploading == 0) editor.setBusy(false);
      }
      this.upDone = this.upDone || {};
      return task.then((url) => {
        if (!url || !isSafeUrl(url)) throw new Error("bad upload url");
        this.upDone[placed.mark] = url;
        const img = preview();
        if (img == null || this.yeDestroyed) return;
        this.fillUploaded(img, url);
        this.sync();
        this.recordState();
      }).catch(() => {
        this.upDone[placed.mark] = false;
        if (this.yeDestroyed) return;
        const img = preview();
        if (img) {
          if (img == this.selectedImg) this.deselectImage();
          img.remove();
          this.sync();
        }
        this.notice("upload-failed", this.t("Image upload failed."));
      }).then(done);
    }
    fillUploaded(img, url) {
      img.setAttribute("src", url);
      img.classList.remove("ye-img--uploading");
      img.removeAttribute("data-ye-up");
      if (img.getAttribute("class") == "") img.removeAttribute("class");
    }
    // After a step of the history comes back: previews whose uploads ended take their result
    settleUploads() {
      const done = this.upDone || {};
      this.area.querySelectorAll("img[data-ye-up]").forEach((img) => {
        const url = done[img.dataset.yeUp];
        if (url) this.fillUploaded(img, url);
        else if (url == false) img.remove();
      });
    }
    // A picture from one of the imageSources goes where the caret was when the menu opened
    pickImage(index) {
      const source = this.imageSources[index];
      if (!source) return;
      this.saveRange();
      Promise.resolve(source.pick()).then((result) => {
        const urls = (Array.isArray(result) ? result : [result]).filter((url) => typeof url == "string" && url && isSafeUrl(url));
        if (!urls.length || this.yeDestroyed || !this.area.isConnected) return;
        this.flushHistory();
        this.restoreRange();
        exec("insertHTML", urls.map((url) => '<img src="' + escapeHtml(url) + '" alt="">').join(""));
        this.sync();
        this.recordState();
      }).catch(() => {
      });
    }
    postImage(file) {
      const fd = new FormData();
      fd.append(this.uploadField, file);
      const headers = Object.assign({ Accept: "application/json" }, this.uploadHeaders);
      return fetch(this.uploadUrl, { method: "POST", body: fd, headers, credentials: "same-origin" }).then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      }).then((data) => data && data.url);
    }
    setBusy(on) {
      this.root.classList.toggle("ye--busy", on);
      const count = this.root.querySelector("[data-ye-count]");
      if (count == null) return;
      if (on) count.textContent = this.t("Uploading\u2026");
      else this.updateCount();
    }
    imageOps() {
      return this.imageAlt ? IMAGE_OPS : IMAGE_OPS.filter((op) => op[0] != "alt");
    }
    // Each is one step of the history, apart from the typing before it
    imageOp(op, target) {
      const img = target || this.ctxImg || this.selectedImg;
      this.ctxImg = null;
      if (img == null || !this.area.contains(img)) return;
      if (op == "alt") {
        if (this.imageAlt) {
          this.deselectImage();
          this.editAlt(img);
        }
        return;
      }
      this.flushHistory();
      const box = this.imgBox(img);
      const figure = box != img;
      if (op == "align-left" || op == "align-right") {
        box.style.float = op.slice(6);
        if (!figure) this.setBlockAlign(img, "");
      } else if (op == "align-center") {
        box.style.float = "";
        if (!figure) this.setBlockAlign(img, "center");
      } else if (op == "align-none") {
        box.style.float = "";
        if (!figure) this.setBlockAlign(img, "");
      } else if (op.indexOf("size-") == 0) {
        this.setImgSize(box, op == "size-auto" ? null : +op.slice(5));
      } else if (op == "caption") {
        if (this.hasCaption(img)) this.dropCaption(img);
        else this.addCaption(img);
      } else if (op == "img-del") {
        this.deselectImage();
        const next = box.nextSibling;
        const parent = box.parentNode;
        box.remove();
        if (parent && this.area.contains(parent)) {
          const range = document.createRange();
          if (next && next.parentNode == parent) range.setStartBefore(next);
          else {
            range.selectNodeContents(parent);
            range.collapse(false);
          }
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(range);
          this.area.focus({ preventScroll: true });
        }
      }
      this.sync();
      this.recordState();
      this.showImgHandle();
    }
    // Pictures the host would not keep (another site's, pasted along with text) go at once, with a word why,
    // rather than showing now and vanishing on save
    dropForeignImages() {
      if (this.imageAllowed == null) return;
      let dropped = 0;
      this.area.querySelectorAll("img").forEach((img) => {
        if (this.isGlyph(img) || img.classList.contains("ye-img--uploading")) return;
        if (this.imageAllowed(img.getAttribute("src") || "")) return;
        const box = this.imgBox(img);
        if (box == this.selectedImg || img == this.selectedImg) this.deselectImage();
        box.remove();
        dropped++;
      });
      if (dropped) this.notice("foreign-images", this.t("Pictures from other sites are not kept. Upload them instead."));
    }
    // What carries a picture's size and float: its figure when it has a caption
    imgBox(img) {
      const parent = img.parentNode;
      return parent && parent.tagName == "FIGURE" && this.area.contains(parent) ? parent : img;
    }
    // A preset is a share of the text's width. Below the whole width a little is left over, so two halves
    // or four quarters still share a line where the text wraps a pixel sooner.
    imgShareFor(preset) {
      if (preset >= 100) return 100;
      const exact = preset == 33 ? 100 / 3 : preset == 66 ? 200 / 3 : preset;
      return Math.round((exact - 0.5) * 100) / 100;
    }
    setImgSize(box, preset) {
      box.style.width = preset == null ? "" : this.imgShareFor(preset) + "%";
      box.style.height = "";
      box.removeAttribute("width");
      box.removeAttribute("height");
      if (box.getAttribute("style") == "") box.removeAttribute("style");
      if (box.tagName == "FIGURE") {
        const img = box.querySelector("img");
        if (img) {
          img.style.width = "";
          img.style.height = "";
          img.removeAttribute("width");
          img.removeAttribute("height");
        }
      }
    }
    // The preset a picture is at now: a number, 'auto' with no width, or null for a width of its own
    imgPreset(box) {
      const width = box.style.width || "";
      if (width == "" && !box.getAttribute("width")) return "auto";
      const share = /%$/.test(width) ? parseFloat(width) : NaN;
      if (isNaN(share)) return null;
      const found = IMG_SIZES.find((p) => Math.abs(this.imgShareFor(p) - share) < 0.3 || Math.abs(p - share) < 0.3);
      return found == null ? null : found;
    }
    hasCaption(img) {
      const box = this.imgBox(img);
      return box != img && box.querySelector(":scope > figcaption") != null;
    }
    // Size and float move to the figure: the picture fills it and the caption follows its width
    figureFor(img) {
      const figure = document.createElement("figure");
      if (img.style.width) figure.style.width = img.style.width;
      if (img.style.float) figure.style.float = img.style.float;
      img.style.width = "";
      img.style.height = "";
      img.style.float = "";
      img.removeAttribute("width");
      img.removeAttribute("height");
      if (img.getAttribute("style") == "") img.removeAttribute("style");
      return figure;
    }
    // A paragraph of pictures alone, side by side
    pictureRow(block) {
      if (block == null || block.tagName != "P") return null;
      const imgs = [];
      for (const n of block.childNodes) {
        if (n.nodeType == 3 && n.nodeValue.trim() == "") continue;
        if (n.nodeName == "BR") continue;
        if (n.nodeName != "IMG" || this.isGlyph(n)) return null;
        imgs.push(n);
      }
      return imgs.length > 1 ? imgs : null;
    }
    // The figures standing next to this one in a line
    figureRow(figure) {
      let first = figure;
      while (first.previousElementSibling && first.previousElementSibling.tagName == "FIGURE") first = first.previousElementSibling;
      const row = [];
      for (let n = first; n && n.tagName == "FIGURE"; n = n.nextElementSibling) row.push(n);
      return row;
    }
    addCaption(img) {
      const caption = document.createElement("figcaption");
      caption.innerHTML = "<br>";
      const box = this.imgBox(img);
      if (box != img) {
        box.appendChild(caption);
        this.caretInto(caption);
        this.selectImage(img);
        this.sync();
        return;
      }
      const block = this.closestBlock(img);
      const row = this.pictureRow(block);
      if (row) {
        const figures = row.map((pic) => {
          const f = this.figureFor(pic);
          f.appendChild(pic);
          return f;
        });
        block.replaceWith(...figures);
        figures[row.indexOf(img)].appendChild(caption);
        const last = figures[figures.length - 1];
        if (last.nextSibling == null || last.nextSibling.nodeType != 1) last.after(document.createElement("p"));
        if (last.nextSibling.tagName == "P" && last.nextSibling.innerHTML == "") last.nextSibling.innerHTML = "<br>";
        this.caretInto(caption);
        this.selectImage(img);
        this.sync();
        return;
      }
      const figure = this.figureFor(img);
      if (block && block != this.area && block.tagName == "P") {
        const after = block.cloneNode(false);
        let n = img.nextSibling;
        while (n) {
          const next = n.nextSibling;
          after.appendChild(n);
          n = next;
        }
        block.after(figure);
        if (after.textContent.trim() != "" || after.querySelector("img")) figure.after(after);
        img.remove();
        if (block.textContent.trim() == "" && block.querySelector("img") == null) block.remove();
      } else {
        img.replaceWith(figure);
      }
      figure.appendChild(img);
      figure.appendChild(caption);
      if (figure.nextSibling == null) figure.after(document.createElement("p"));
      if (figure.nextSibling.tagName == "P" && figure.nextSibling.innerHTML == "") figure.nextSibling.innerHTML = "<br>";
      this.caretInto(caption);
      this.selectImage(img);
      this.sync();
    }
    dropCaption(img) {
      const figure = this.imgBox(img);
      const row = this.figureRow(figure);
      if (row.length > 1) {
        figure.querySelector(":scope > figcaption").remove();
        if (row.every((f) => f.querySelector(":scope > figcaption") == null)) {
          const p2 = document.createElement("p");
          row[0].before(p2);
          row.forEach((f) => {
            const pic = f.querySelector("img");
            if (f.style.width) pic.style.width = f.style.width;
            if (f.style.float) pic.style.float = f.style.float;
            p2.appendChild(pic);
            f.remove();
          });
        }
        this.selectImage(img);
        this.sync();
        return;
      }
      const p = document.createElement("p");
      if (figure.style.width) img.style.width = figure.style.width;
      if (figure.style.float) img.style.float = figure.style.float;
      else p.style.textAlign = "center";
      figure.replaceWith(p);
      p.appendChild(img);
      this.selectImage(img);
      this.sync();
    }
    caretInto(el) {
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      this.area.focus({ preventScroll: true });
    }
    // Enter in a caption goes on with the text below; the caption stays one line
    captionKey(e) {
      if (e.key != "Enter" || e.shiftKey || e.isComposing) return false;
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0) return false;
      const node = sel.anchorNode;
      const caption = node && (node.nodeType == 1 ? node : node.parentNode).closest("figcaption");
      if (caption == null || !this.area.contains(caption)) return false;
      e.preventDefault();
      this.flushHistory();
      const figure = caption.parentNode;
      let next = figure.nextElementSibling;
      if (next == null || next.tagName != "P" || next.textContent != "" || next.querySelector("img")) {
        next = document.createElement("p");
        next.innerHTML = "<br>";
        figure.after(next);
      }
      const range = document.createRange();
      range.setStart(next, 0);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      this.deselectImage();
      this.sync();
      this.recordState();
      return true;
    }
    setBlockAlign(node, val) {
      let b = this.closestBlock(node);
      if (b == null && val) {
        b = document.createElement("p");
        node.replaceWith(b);
        b.appendChild(node);
      }
      if (b && b != this.area) b.style.textAlign = val;
    }
    editAlt(img) {
      this.nextFormAnchor = this.ctxAnchorPos;
      this.promptPop({
        fields: [{ placeholder: this.t("Alt text (describe the image)"), value: img.getAttribute("alt") || "" }],
        onSubmit: (vals) => {
          this.flushHistory();
          img.setAttribute("alt", vals[0]);
          this.sync();
          this.recordState();
          return null;
        }
      });
    }
    selectImage(img) {
      if (this.selectedImg && this.selectedImg != img) this.selectedImg.classList.remove("ye-img--sel");
      this.selectedImg = img;
      img.classList.add("ye-img--sel");
      this.showImgHandle();
    }
    deselectImage() {
      if (this.selectedImg) this.selectedImg.classList.remove("ye-img--sel");
      this.selectedImg = null;
      if (this.imgHandle) this.imgHandle.style.display = "none";
      if (this.imgBar) this.imgBar.style.display = "none";
    }
    showImgHandle() {
      const img = this.selectedImg;
      if (img == null) return;
      if (!img.isConnected) {
        this.deselectImage();
        return;
      }
      if (this.imgHandle == null) {
        const h = document.createElement("div");
        h.className = "ye-img-handle";
        document.body.appendChild(h);
        h.addEventListener("pointerdown", (e) => this.startImgResize(e));
        this.imgHandle = h;
      }
      const r = img.getBoundingClientRect();
      const area = this.area.getBoundingClientRect();
      this.showImgBar(r, area);
      if (r.bottom > area.bottom || r.bottom < area.top || r.right > area.right) {
        this.imgHandle.style.display = "none";
        return;
      }
      this.imgHandle.style.display = "block";
      const size = this.imgHandle.offsetWidth || 16;
      this.imgHandle.style.left = Math.min(r.right - size / 2, area.right - size - 2) + "px";
      this.imgHandle.style.top = Math.min(r.bottom - size / 2, area.bottom - size - 2) + "px";
    }
    buildImgBar() {
      this.area.style.setProperty("--ye-caption-hint", JSON.stringify(this.t("Caption")));
      const bar = document.createElement("div");
      bar.className = "ye-imgbar";
      bar.setAttribute("role", "toolbar");
      bar.setAttribute("aria-label", this.t("Image"));
      const editor = this;
      function button(op, inner, title, extra) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "ye-imgbar__btn" + (extra ? " " + extra : "");
        b.dataset.yeImgbar = op;
        b.innerHTML = inner;
        b.title = title;
        b.setAttribute("aria-label", title);
        bar.appendChild(b);
      }
      function sep() {
        const d = document.createElement("span");
        d.className = "ye-imgbar__sep";
        bar.appendChild(d);
      }
      IMG_SIZES.forEach((p) => button("size-" + p, p + "%", editor.t("Width") + " " + p + "%", "ye-imgbar__btn--text"));
      button("size-auto", escapeHtml(this.t("Auto")), this.t("Original size"), "ye-imgbar__btn--text");
      sep();
      button("align-left", this.renderIcon("align-left"), this.t("Float left"));
      button("align-center", this.renderIcon("align-center"), this.t("Center"));
      button("align-right", this.renderIcon("align-right"), this.t("Float right"));
      sep();
      button("caption", this.renderIcon("caption"), this.t("Caption"));
      if (this.imageAlt) button("alt", this.renderIcon("alt"), this.t("Alt text\u2026"));
      button("img-del", this.renderIcon("img-del"), this.t("Delete image"), "ye-imgbar__btn--danger");
      bar.addEventListener("mousedown", (e) => e.preventDefault());
      bar.addEventListener("click", (e) => {
        const b = e.target.closest("[data-ye-imgbar]");
        const img = this.selectedImg;
        if (b == null || img == null) return;
        let op = b.dataset.yeImgbar;
        if (op.indexOf("align-") == 0 && b.classList.contains("ye-imgbar__btn--on")) op = "align-none";
        this.ctxAnchorPos = this.anchorUnder(b);
        this.imageOp(op, img);
      });
      document.body.appendChild(bar);
      return bar;
    }
    // Over the picture, or under it where the editor's top would cover it; always inside the window
    showImgBar(r, area) {
      const img = this.selectedImg;
      if (this.imgBar == null) this.imgBar = this.buildImgBar();
      const bar = this.imgBar;
      if (img == null || r.bottom < area.top || r.top > area.bottom || this.imgResizing) {
        bar.style.display = "none";
        return;
      }
      this.markImgBar(img);
      if (bar.style.display != "flex") {
        const cs = getComputedStyle(this.root);
        IMG_BAR_TOKENS.forEach((name) => {
          const v = cs.getPropertyValue(name);
          if (v) bar.style.setProperty(name, v.trim());
        });
      }
      bar.style.display = "flex";
      const w = bar.offsetWidth;
      const h = bar.offsetHeight;
      const top = Math.max(area.top, 8);
      let y = r.top - h - 8;
      if (y < top) y = r.bottom + 8;
      if (y + h > Math.min(area.bottom, window.innerHeight - 8)) y = Math.max(top, r.top) + 8;
      let x = r.left + r.width / 2 - w / 2;
      x = Math.max(8, Math.min(x, window.innerWidth - w - 8));
      bar.style.left = Math.round(x) + "px";
      bar.style.top = Math.round(y) + "px";
    }
    markImgBar(img) {
      const box = this.imgBox(img);
      const preset = this.imgPreset(box);
      const float = box.style.float;
      const block = box == img ? this.closestBlock(img) : null;
      const centred = box != img ? !float : !float && block && block.style.textAlign == "center";
      this.imgBar.querySelectorAll("[data-ye-imgbar]").forEach((b) => {
        const op = b.dataset.yeImgbar;
        let on = false;
        if (op.indexOf("size-") == 0) on = String(preset) == op.slice(5);
        else if (op == "align-left" || op == "align-right") on = float == op.slice(6);
        else if (op == "align-center") on = !!centred;
        else if (op == "caption") on = this.hasCaption(img);
        b.classList.toggle("ye-imgbar__btn--on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }
    // The width of the text itself, inside the area's padding
    innerWidth() {
      const style = getComputedStyle(this.area);
      return this.area.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    }
    // Widths a picture sticks to while it is resized: the height or the width of a picture beside it or of
    // the nearest ones above and below, and what is left of the line with those beside it; alone on its line,
    // the whole width of the text
    imgSnaps(img, r, ratio, maxW) {
      const box = this.imgBox(img);
      const all = Array.from(this.area.querySelectorAll("img")).filter((other) => other != img && !this.isGlyph(other)).map((other) => ({ other: this.imgBox(other), rect: this.imgBox(other).getBoundingClientRect(), pic: other.getBoundingClientRect() })).filter((x) => x.rect.height > 0 && x.other != box);
      const beside = (x) => x.rect.top < r.bottom - 4 && x.rect.bottom > r.top + 4;
      const row = all.filter(beside);
      const middle = (r.top + r.bottom) / 2;
      const near = all.filter((x) => !beside(x)).sort((a, b) => Math.abs((a.rect.top + a.rect.bottom) / 2 - middle) - Math.abs((b.rect.top + b.rect.bottom) / 2 - middle)).slice(0, 4);
      const snaps = IMG_SNAPS.map((p) => ({ width: Math.round(this.imgShareFor(p) / 100 * maxW), kind: "preset", preset: p }));
      row.concat(near).forEach((x) => {
        snaps.push({ width: Math.round(x.pic.height * ratio), kind: "height", other: x.other, apart: !beside(x) });
        snaps.push({ width: Math.round(x.rect.width), kind: "width", other: x.other, apart: !beside(x) });
      });
      if (row.length) {
        const left = Math.min(r.left, ...row.map((x) => x.rect.left));
        const right = Math.max(r.right, ...row.map((x) => x.rect.right));
        const spare = Math.ceil(maxW * 0.015);
        snaps.push({ width: Math.floor(maxW - (right - left - r.width)) - spare, kind: "fill", row: row.map((x) => x.other) });
      }
      return snaps.filter((s) => s.width >= 24 && s.width <= maxW);
    }
    // The share a picture has while it is dragged, next to the finger or the cursor
    showImgBadge(text, snapped, x, y) {
      if (this.imgBadge == null) {
        const badge2 = document.createElement("div");
        badge2.className = "ye-img-badge";
        const cs = getComputedStyle(this.root);
        IMG_BAR_TOKENS.forEach((name) => {
          const v = cs.getPropertyValue(name);
          if (v) badge2.style.setProperty(name, v.trim());
        });
        document.body.appendChild(badge2);
        this.imgBadge = badge2;
      }
      const badge = this.imgBadge;
      if (text == null) {
        badge.style.display = "none";
        return;
      }
      badge.textContent = text;
      badge.classList.toggle("ye-img-badge--snap", snapped);
      badge.style.display = "block";
      const w = badge.offsetWidth;
      badge.style.left = Math.max(8, Math.min(x - w - 12, window.innerWidth - w - 8)) + "px";
      badge.style.top = Math.max(8, y + 14) + "px";
    }
    // The picture a size is taken from is outlined, and a line shows what lines up
    showSnap(snap, img) {
      this.area.querySelectorAll(".ye-img--snap").forEach((el) => el.classList.remove("ye-img--snap"));
      if (this.imgGuide == null) {
        const guide2 = document.createElement("div");
        guide2.className = "ye-img-guide";
        document.body.appendChild(guide2);
        this.imgGuide = guide2;
      }
      const guide = this.imgGuide;
      if (snap == null || img == null) {
        guide.style.display = "none";
        return;
      }
      const r = img.getBoundingClientRect();
      if (snap.kind == "preset") {
        guide.style.display = "none";
        return;
      }
      const others = snap.other ? [snap.other] : snap.row;
      others.forEach((el) => el.classList.add("ye-img--snap"));
      guide.style.display = "block";
      if (snap.kind == "fill") {
        const area = this.area.getBoundingClientRect();
        const style = getComputedStyle(this.area);
        guide.style.left = area.right - parseFloat(style.paddingRight) + "px";
        guide.style.top = r.top + "px";
        guide.style.width = "2px";
        guide.style.height = r.height + "px";
        return;
      }
      const o = snap.other.getBoundingClientRect();
      const left = Math.min(r.left, o.left);
      if (snap.apart) {
        const top = Math.min(r.top, o.top);
        guide.style.left = (snap.kind == "width" ? r.right + 4 : r.left - 6) + "px";
        guide.style.top = (snap.kind == "width" ? top : r.top) + "px";
        guide.style.width = "2px";
        guide.style.height = (snap.kind == "width" ? Math.max(r.bottom, o.bottom) - top : r.height) + "px";
        return;
      }
      if (snap.kind == "height") {
        guide.style.left = left + "px";
        guide.style.top = Math.max(r.bottom, o.bottom) + "px";
        guide.style.width = Math.max(r.right, o.right) - left + "px";
        guide.style.height = "2px";
      } else {
        guide.style.left = r.left + "px";
        guide.style.top = Math.max(r.bottom, o.bottom) + 4 + "px";
        guide.style.width = r.width + "px";
        guide.style.height = "2px";
      }
    }
    startImgResize(e) {
      e.preventDefault();
      const img = this.selectedImg;
      if (img == null) return;
      const pointer = e.pointerId;
      try {
        this.imgHandle.setPointerCapture(pointer);
      } catch (err) {
      }
      const startX = e.clientX;
      const box = this.imgBox(img);
      const start = box.getBoundingClientRect();
      const pic = img.getBoundingClientRect();
      const ratio = pic.height ? pic.width / pic.height : 1;
      const maxW = this.innerWidth();
      const snaps = this.imgSnaps(img, start, ratio, maxW);
      const editor = this;
      this.flushHistory();
      this.imgResizing = true;
      function move(ev) {
        if (ev.pointerId != pointer) return;
        let w = Math.round(start.width + (ev.clientX - startX));
        w = Math.max(24, Math.min(w, maxW));
        let snap = null;
        snaps.forEach((s) => {
          if (Math.abs(s.width - w) <= 8 && (snap == null || Math.abs(s.width - w) < Math.abs(snap.width - w))) snap = s;
        });
        if (snap) w = snap.width;
        if (snap && snap.kind == "preset") editor.setImgSize(box, snap.preset);
        else {
          editor.setImgSize(box, null);
          box.style.width = Math.round(w / maxW * 1e4) / 100 + "%";
        }
        editor.showImgHandle();
        editor.showSnap(snap, box);
        const share = snap && snap.kind == "preset" ? snap.preset : Math.round(w / maxW * 100);
        editor.showImgBadge(share + "%", !!snap, ev.clientX, ev.clientY);
      }
      function up(ev) {
        if (ev.pointerId != pointer) return;
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);
        document.removeEventListener("pointercancel", up);
        editor.imgResizing = false;
        editor.showSnap(null);
        editor.showImgBadge(null);
        editor.showImgHandle();
        editor.sync();
        editor.recordState();
      }
      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", up);
      document.addEventListener("pointercancel", up);
    }
  };

  // source/mixins/tables.js
  var withTables = (Base) => class extends Base {
    insertTable(rows, cols, header) {
      let html = "<table><tbody>";
      for (let r = 0; r < rows; r++) {
        const cellTag = header && r == 0 ? "th" : "td";
        html += "<tr>";
        for (let c = 0; c < cols; c++) html += "<" + cellTag + "><br></" + cellTag + ">";
        html += "</tr>";
      }
      html += "</tbody></table><p><br></p>";
      this.flushHistory();
      exec("insertHTML", html);
      const sel = window.getSelection();
      const line = sel.rangeCount ? this.closestBlock(sel.anchorNode) : null;
      const table = line && line.previousElementSibling;
      const cell = table && table.tagName == "TABLE" ? table.querySelector("th, td") : null;
      if (cell) {
        const r = document.createRange();
        r.setStart(cell, 0);
        r.collapse(true);
        sel.removeAllRanges();
        sel.addRange(r);
      }
      this.sync();
      this.recordState();
    }
    // One step of the history, apart from the typing before it
    tableOp(op) {
      if (this.currentCell() == null) return;
      this.flushHistory();
      this.runTableOp(op);
      this.sync();
      this.recordState();
    }
    runTableOp(op) {
      const cell = this.currentCell();
      if (cell == null) return;
      const table = ancestorTag(cell, "TABLE");
      const grid = this.tableGrid(table);
      const pos = this.findCellPos(grid, cell);
      if (pos == null) return;
      if (op == "row-above" || op == "row-below") {
        this.insertRow(table, grid, op == "row-above" ? pos.r : pos.r + (cell.rowSpan || 1));
      } else if (op == "col-left" || op == "col-right") {
        this.insertCol(table, grid, op == "col-left" ? pos.c : pos.c + (cell.colSpan || 1));
      } else if (op == "row-del") {
        if (table.rows.length > 1) this.deleteRow(table, grid, pos.r);
      } else if (op == "col-del") {
        if (grid.some((r) => r && r.length > 1)) this.deleteCol(grid, pos.c);
      } else if (op == "header") {
        const first = table.querySelector("tr");
        if (first == null) return;
        const toTh = first.children[0] == null || first.children[0].tagName == "TD";
        Array.prototype.slice.call(first.children).forEach((c) => {
          const t = document.createElement(toTh ? "th" : "td");
          Array.prototype.slice.call(c.attributes).forEach((a) => t.setAttribute(a.name, a.value));
          t.innerHTML = c.innerHTML;
          first.replaceChild(t, c);
        });
      } else if (op == "cell-left" || op == "cell-center" || op == "cell-right") {
        const val = op.slice(5);
        cell.style.textAlign = cell.style.textAlign == val ? "" : val;
      } else if (op == "merge-right") {
        this.mergeCell(cell, "right");
      } else if (op == "merge-down") {
        this.mergeCell(cell, "down");
      } else if (op == "split") {
        this.splitCell(cell);
      } else if (op == "grid") {
        table.classList.toggle("ye-table--no-grid");
      } else if (op == "del") {
        const next = table.nextElementSibling || table.previousElementSibling;
        table.remove();
        if (next && this.area.contains(next)) this.caretToEnd(next);
      }
      if (!cell.isConnected && table.isConnected) {
        const left = this.tableGrid(table);
        const row = left[Math.min(pos.r, left.length - 1)] || [];
        const near = row[Math.min(pos.c, row.length - 1)];
        if (near) this.caretToEnd(near);
      }
    }
    // Cells in reading order, each once, where it starts
    cellOrder(grid) {
      const out = [];
      grid.forEach((row) => (row || []).forEach((cell) => {
        if (cell && out.indexOf(cell) == -1) out.push(cell);
      }));
      return out;
    }
    caretToEnd(box) {
      const range = document.createRange();
      const walker = document.createTreeWalker(box, NodeFilter.SHOW_TEXT, null);
      let last = null;
      let n;
      while (n = walker.nextNode()) if (n.nodeValue.trim() != "") last = n;
      if (last) {
        range.setStart(last, last.nodeValue.length);
      } else {
        let inner = box;
        while (inner.firstElementChild && inner.firstElementChild.matches("p,div,h1,h2,h3,h4,blockquote,pre")) inner = inner.firstElementChild;
        range.setStart(inner, 0);
      }
      range.collapse(true);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      const el = last ? last.parentNode : box;
      if (el.scrollIntoView) el.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
    tableGrid(table) {
      const grid = [];
      const rows = Array.prototype.slice.call(table.rows);
      for (let r = 0; r < rows.length; r++) {
        grid[r] = grid[r] || [];
        let c = 0;
        const cells = Array.prototype.slice.call(rows[r].cells);
        for (let ci = 0; ci < cells.length; ci++) {
          const cell = cells[ci];
          while (grid[r][c]) c++;
          const cs = cell.colSpan || 1;
          const rs = cell.rowSpan || 1;
          for (let dr = 0; dr < rs; dr++) {
            grid[r + dr] = grid[r + dr] || [];
            for (let dc = 0; dc < cs; dc++) grid[r + dr][c + dc] = cell;
          }
          c += cs;
        }
      }
      return grid;
    }
    findCellPos(grid, cell) {
      for (let r = 0; r < grid.length; r++) {
        const row = grid[r] || [];
        for (let c = 0; c < row.length; c++) if (row[c] == cell) return { r, c };
      }
      return null;
    }
    // Only a neighbour of the same height (or width) that starts on the same line joins in, so the grid stays a rectangle
    mergeTarget(grid, cell, pos, dir) {
      const cs = cell.colSpan || 1;
      const rs = cell.rowSpan || 1;
      const right = dir == "right";
      const other = right ? (grid[pos.r] || [])[pos.c + cs] : (grid[pos.r + rs] || [])[pos.c];
      if (other == null || other == cell) return null;
      const op = this.findCellPos(grid, other);
      if (right && (op.r != pos.r || op.c != pos.c + cs || (other.rowSpan || 1) != rs)) return null;
      if (!right && (op.r != pos.r + rs || op.c != pos.c || (other.colSpan || 1) != cs)) return null;
      return other;
    }
    mergeCell(cell, dir) {
      const table = ancestorTag(cell, "TABLE");
      const grid = this.tableGrid(table);
      const pos = this.findCellPos(grid, cell);
      if (pos == null) return;
      const other = this.mergeTarget(grid, cell, pos, dir);
      if (other == null) return;
      if (dir == "right") cell.colSpan = (cell.colSpan || 1) + (other.colSpan || 1);
      else cell.rowSpan = (cell.rowSpan || 1) + (other.rowSpan || 1);
      const otherHtml = other.innerHTML.replace(/^(\s|<br\s*\/?>)+$/i, "");
      if (otherHtml) cell.innerHTML = cell.innerHTML.replace(/^(<br\s*\/?>)+$/i, "") + " " + otherHtml;
      other.parentNode.removeChild(other);
    }
    splitCell(cell) {
      const table = ancestorTag(cell, "TABLE");
      const cs = cell.colSpan || 1;
      const rs = cell.rowSpan || 1;
      if (cs <= 1 && rs <= 1) return;
      const grid = this.tableGrid(table);
      const pos = this.findCellPos(grid, cell);
      if (pos == null) return;
      const rows = table.rows;
      const tag = cell.tagName.toLowerCase();
      this.setSpan(cell, "colspan", 1);
      this.setSpan(cell, "rowspan", 1);
      for (let dr = 0; dr < rs; dr++) {
        for (let dc = 0; dc < cs; dc++) {
          if (dr == 0 && dc == 0) continue;
          const rr = pos.r + dr, cc = pos.c + dc;
          const tr = rows[rr];
          if (tr == null) continue;
          const fresh = document.createElement(tag);
          fresh.innerHTML = "<br>";
          let ref = null;
          const starts = this.rowStarts(grid, rr);
          for (let i = 0; i < starts.length; i++) {
            if (starts[i].c >= cc) {
              ref = starts[i].cell;
              break;
            }
          }
          tr.insertBefore(fresh, ref);
          grid[rr][cc] = fresh;
        }
      }
    }
    // A span of one is no span: the attribute goes rather than staying as colspan="1"
    setSpan(cell, name, n) {
      if (n > 1) cell.setAttribute(name, n);
      else cell.removeAttribute(name);
    }
    freshCell(tag) {
      const fresh = document.createElement(tag);
      fresh.innerHTML = "<br>";
      return fresh;
    }
    // A cell that starts in a row goes before the first one there that stands right of it
    placeCell(tr, grid, r, c, fresh) {
      const starts = this.rowStarts(grid, r);
      let ref = null;
      for (let i = 0; i < starts.length; i++) {
        if (starts[i].c >= c) {
          ref = starts[i].cell;
          break;
        }
      }
      tr.insertBefore(fresh, ref);
    }
    insertRow(table, grid, at) {
      const rows = table.rows;
      const width = Math.max(...grid.map((r) => (r || []).length));
      const tr = document.createElement("tr");
      const grown = [];
      for (let c = 0; c < width; c++) {
        const above = (grid[at - 1] || [])[c];
        if (above && (grid[at] || [])[c] == above) {
          if (grown.indexOf(above) == -1) {
            above.rowSpan = (above.rowSpan || 1) + 1;
            grown.push(above);
          }
          continue;
        }
        tr.appendChild(this.freshCell("td"));
      }
      if (at < rows.length) rows[at].parentNode.insertBefore(tr, rows[at]);
      else rows[rows.length - 1].parentNode.appendChild(tr);
    }
    insertCol(table, grid, at) {
      const rows = table.rows;
      const grown = [];
      for (let r = 0; r < rows.length; r++) {
        const left = (grid[r] || [])[at - 1];
        const right = (grid[r] || [])[at];
        if (left && left == right) {
          if (grown.indexOf(left) == -1) {
            left.colSpan = (left.colSpan || 1) + 1;
            grown.push(left);
          }
          continue;
        }
        const beside = right || left;
        this.placeCell(rows[r], grid, r, at, this.freshCell(beside && beside.tagName == "TH" ? "th" : "td"));
      }
    }
    deleteRow(table, grid, r) {
      const tr = table.rows[r];
      const next = table.rows[r + 1];
      const seen = [];
      (grid[r] || []).forEach((cell, c) => {
        if (cell == null || seen.indexOf(cell) != -1) return;
        seen.push(cell);
        if ((cell.rowSpan || 1) < 2) return;
        this.setSpan(cell, "rowspan", cell.rowSpan - 1);
        if (cell.parentNode == tr && next) this.placeCell(next, grid, r + 1, c, cell);
      });
      tr.remove();
    }
    deleteCol(grid, c) {
      const seen = [];
      grid.forEach((row) => {
        const cell = (row || [])[c];
        if (cell == null || seen.indexOf(cell) != -1) return;
        seen.push(cell);
        if ((cell.colSpan || 1) > 1) this.setSpan(cell, "colspan", cell.colSpan - 1);
        else cell.remove();
      });
    }
    rowStarts(grid, rr) {
      const out = [];
      const seen = [];
      const row = grid[rr] || [];
      for (let c = 0; c < row.length; c++) {
        const cell = row[c];
        if (cell == null || seen.indexOf(cell) != -1) continue;
        seen.push(cell);
        const p = this.findCellPos(grid, cell);
        if (p && p.r == rr) out.push({ c, cell });
      }
      out.sort((a, b) => a.c - b.c);
      return out;
    }
    buildTablePop(pop) {
      pop.innerHTML = "";
      if (this.currentCell() != null) {
        const wrap = document.createElement("div");
        wrap.className = "ye-tableops";
        wrap.setAttribute("role", "menu");
        TABLE_OPS.forEach((op) => {
          if (op[0] == "|") {
            const d = document.createElement("div");
            d.className = "ye-tableops__sep";
            wrap.appendChild(d);
            return;
          }
          const b = document.createElement("button");
          b.type = "button";
          b.setAttribute("role", "menuitem");
          b.innerHTML = this.renderIcon(op[0]) + "<span>" + this.t(op[1]) + "</span>";
          b.dataset.ye = op[0];
          if (op[0] == "del") b.className = "ye-tableops__danger";
          wrap.appendChild(b);
        });
        pop.appendChild(wrap);
      } else {
        const grid = document.createElement("div");
        grid.className = "ye-grid";
        for (let r = 1; r <= 6; r++) {
          for (let c = 1; c <= 6; c++) {
            const cell = document.createElement("button");
            cell.type = "button";
            cell.setAttribute("aria-label", r + " \xD7 " + c);
            cell.className = "ye-grid__cell";
            cell.dataset.r = r;
            cell.dataset.c = c;
            grid.appendChild(cell);
          }
        }
        const label = document.createElement("div");
        label.className = "ye-grid__label";
        label.textContent = this.t("Pick size");
        const opt = document.createElement("label");
        opt.className = "ye-grid__opt";
        opt.innerHTML = '<input type="checkbox" data-ye-table-header> ' + this.t("Header row");
        pop.appendChild(grid);
        pop.appendChild(label);
        pop.appendChild(opt);
      }
    }
  };

  // source/mixins/tablebar.js
  var BAR_GROUPS = [["row-above", "row-below", "row-del"], ["col-left", "col-right", "col-del"], ["merge-right", "split"], ["header"], ["del"]];
  var BAR_TOKENS = ["--ye-surface", "--ye-border", "--ye-text", "--ye-text-soft", "--ye-hover", "--ye-accent", "--ye-accent-ink", "--ye-accent-soft", "--ye-danger", "--ye-shadow"];
  function opLabel(key) {
    const op = TABLE_OPS.find((o) => o[0] == key);
    return op ? op[1] : key;
  }
  var withTableBar = (Base) => class extends Base {
    buildTableBar() {
      const bar = document.createElement("div");
      bar.className = "ye-tablebar";
      bar.setAttribute("role", "toolbar");
      bar.setAttribute("aria-label", this.t("Table"));
      BAR_GROUPS.forEach((group, i) => {
        if (i) {
          const sep = document.createElement("span");
          sep.className = "ye-tablebar__sep";
          bar.appendChild(sep);
        }
        group.forEach((key) => {
          const b = document.createElement("button");
          b.type = "button";
          b.className = "ye-tablebar__btn" + (key == "del" ? " ye-tablebar__btn--danger" : "");
          b.tabIndex = -1;
          b.dataset.yeBar = key;
          b.title = this.t(opLabel(key));
          b.setAttribute("aria-label", this.t(opLabel(key)));
          b.innerHTML = this.renderIcon(key);
          bar.appendChild(b);
        });
      });
      bar.addEventListener("pointerdown", (e) => e.preventDefault());
      bar.addEventListener("mousedown", (e) => e.preventDefault());
      bar.addEventListener("click", (e) => {
        const b = e.target.closest(".ye-tablebar__btn");
        if (b) this.tableBarOp(b);
      });
      document.body.appendChild(bar);
      this.tableBar = bar;
      return bar;
    }
    tableBarOp(btn) {
      if (btn.getAttribute("aria-disabled") == "true") return;
      const cell = this.barCell;
      if (document.activeElement != this.area) this.area.focus({ preventScroll: true });
      if (this.currentCell() == null) {
        if (cell == null || !cell.isConnected) return;
        this.caretToEnd(cell);
      }
      this.tableOp(btn.dataset.yeBar);
      this.sync();
      this.updateStates();
    }
    // The menu changes the table too: what the bar offers follows
    tableOp(op) {
      super.tableOp(op);
      this.refreshTableBar();
    }
    refreshTableBar() {
      if (this.yeDestroyed || !this.yeReady || this.inline) return;
      const active = document.activeElement;
      const focused = active == this.area || this.area.contains(active) || this.tableBar != null && this.tableBar.contains(active);
      const cell = focused && !this.root.classList.contains("ye--source") ? this.currentCell() : null;
      if (cell == null) {
        this.hideTableBar();
        return;
      }
      const bar = this.tableBar || this.buildTableBar();
      const table = ancestorTag(cell, "TABLE");
      const grid = this.tableGrid(table);
      const pos = this.findCellPos(grid, cell);
      if (pos == null) {
        this.hideTableBar();
        return;
      }
      if (bar.style.display != "flex") {
        const cs = getComputedStyle(this.root);
        BAR_TOKENS.forEach((name) => {
          const v = cs.getPropertyValue(name);
          if (v) bar.style.setProperty(name, v.trim());
        });
        bar.style.display = "flex";
      }
      this.barCell = cell;
      const first = table.rows[0] && table.rows[0].cells[0];
      const off = {
        "row-del": table.rows.length < 2,
        "col-del": !grid.some((r) => r && r.length > 1),
        "merge-right": this.mergeTarget(grid, cell, pos, "right") == null,
        split: (cell.colSpan || 1) < 2 && (cell.rowSpan || 1) < 2
      };
      bar.querySelectorAll(".ye-tablebar__btn").forEach((b) => {
        const key = b.dataset.yeBar;
        if (off[key]) b.setAttribute("aria-disabled", "true");
        else b.removeAttribute("aria-disabled");
        if (key == "header") b.classList.toggle("is-active", first != null && first.tagName == "TH");
      });
      this.positionTableBar();
    }
    // Above the table; below it when there is no room; pinned to the top edge when neither fits
    positionTableBar() {
      const bar = this.tableBar;
      const cell = this.barCell;
      if (bar == null || bar.style.display != "flex") return;
      if (cell == null || !cell.isConnected) {
        this.hideTableBar();
        return;
      }
      const t = ancestorTag(cell, "TABLE").getBoundingClientRect();
      const a = this.area.getBoundingClientRect();
      const c = cell.getBoundingClientRect();
      let floor = Math.max(a.top, 0);
      if (this.toolbar) floor = Math.max(floor, this.toolbar.getBoundingClientRect().bottom);
      const ceil = Math.min(a.bottom, window.innerHeight);
      const h = bar.offsetHeight;
      const w = bar.offsetWidth;
      let top = t.top - h - 6;
      if (top < floor + 4) top = t.bottom + 6 + h <= ceil - 4 ? t.bottom + 6 : floor + 4;
      if (top < c.bottom && top + h > c.top) top = c.bottom + 6;
      const gone = t.bottom < floor || t.top > ceil || top + h > ceil;
      bar.style.visibility = gone ? "hidden" : "";
      const left = Math.max(8, Math.min(Math.min(t.right, a.right) - w, window.innerWidth - w - 8));
      bar.style.left = left + "px";
      bar.style.top = top + "px";
    }
    hideTableBar() {
      this.barCell = null;
      if (this.tableBar) this.tableBar.style.display = "none";
    }
    wire() {
      super.wire();
      this.area.addEventListener("blur", () => setTimeout(() => this.refreshTableBar(), 0));
      this.area.addEventListener("focus", () => this.refreshTableBar());
    }
    listenGlobal(on) {
      super.listenGlobal(on);
      if (this.onClick == null || !!this.barOn == on) return;
      this.barOn = on;
      if (this.onBarSel == null) {
        this.onBarSel = () => this.refreshTableBar();
        this.onBarMove = () => this.positionTableBar();
      }
      const m = on ? "addEventListener" : "removeEventListener";
      document[m]("selectionchange", this.onBarSel);
      window[m]("scroll", this.onBarMove, true);
      window[m]("resize", this.onBarMove);
      if (!on && this.tableBar) {
        this.tableBar.remove();
        this.tableBar = null;
        this.barCell = null;
      }
    }
  };

  // source/mixins/tabkey.js
  function isList(node) {
    return node != null && (node.tagName == "UL" || node.tagName == "OL");
  }
  var withTabKey = (Base) => class extends Base {
    // Tab nests list items and walks table cells; anywhere else it leaves the editor, as a keyboard user expects
    tabKey(e) {
      if (this.inline || e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return false;
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0) return false;
      let node = sel.getRangeAt(0).startContainer;
      if (!this.area.contains(node)) return false;
      while (node && node != this.area) {
        if (node.nodeType == 1 && node.tagName == "LI") {
          this.tabList(sel, e.shiftKey);
          return true;
        }
        if (node.nodeType == 1 && (node.tagName == "TD" || node.tagName == "TH")) {
          this.tabCell(node, e.shiftKey);
          return true;
        }
        node = node.parentNode;
      }
      return false;
    }
    tabCell(cell, back) {
      const table = ancestorTag(cell, "TABLE");
      const grid = this.tableGrid(table);
      const order = this.cellOrder(grid);
      let target = order[order.indexOf(cell) + (back ? -1 : 1)];
      if (target == null && !back) {
        this.insertRow(table, grid, table.rows.length);
        target = table.rows[table.rows.length - 1].cells[0];
      }
      if (target == null) return;
      this.caretToEnd(target);
      this.sync();
    }
    tabList(sel, back) {
      const range = sel.getRangeAt(0);
      const mark = [sel.anchorNode, sel.anchorOffset, sel.focusNode, sel.focusOffset];
      const items = this.selectedItems(range);
      let lifted = null;
      items.forEach((li) => {
        lifted = (back ? this.unnestItem(li) : this.nestItem(li)) || lifted;
      });
      if (this.area.contains(mark[0]) && this.area.contains(mark[2])) {
        try {
          sel.setBaseAndExtent(mark[0], mark[1], mark[2], mark[3]);
        } catch (err) {
        }
      } else if (lifted) {
        this.caretToEnd(lifted);
      }
      this.sync();
      this.updateStates();
    }
    // The outermost items touched: the item the caret is in, not the one around its list
    selectedItems(range) {
      const startLi = ancestorTag(range.startContainer, "LI");
      const endLi = ancestorTag(range.endContainer, "LI");
      const all = Array.prototype.slice.call(this.area.querySelectorAll("li")).filter((li) => {
        if (!range.intersectsNode(li) || !isList(li.parentNode)) return false;
        return !(startLi && li != startLi && li.contains(startLi) || endLi && li != endLi && li.contains(endLi));
      });
      return all.filter((li) => !all.some((o) => o != li && o.contains(li)));
    }
    nestItem(li) {
      const list = li.parentNode;
      const prev = li.previousElementSibling;
      if (prev == null) return;
      if (isList(prev)) {
        prev.appendChild(li);
        return;
      }
      if (prev.tagName != "LI") return;
      let sub = prev.lastElementChild;
      if (sub == null || sub.tagName != list.tagName) {
        sub = document.createElement(list.tagName);
        prev.appendChild(sub);
      }
      sub.appendChild(li);
    }
    unnestItem(li) {
      const list = li.parentNode;
      const host = list.parentNode.tagName == "LI" ? list.parentNode : isList(list.parentNode) ? list : null;
      if (host == null) return this.liftItem(li);
      const rest = [];
      for (let n = li.nextSibling; n; n = n.nextSibling) rest.push(n);
      if (rest.some((n) => n.nodeType == 1)) {
        let sub = li.lastElementChild;
        if (sub == null || sub.tagName != list.tagName) {
          sub = document.createElement(list.tagName);
          li.appendChild(sub);
        }
        rest.forEach((n) => sub.appendChild(n));
      }
      host.parentNode.insertBefore(li, host.nextSibling);
      if (list.firstElementChild == null) list.remove();
    }
    // Out of the top level the item becomes a paragraph, splitting its list around it
    liftItem(li) {
      const list = li.parentNode;
      const tail = document.createElement(list.tagName);
      while (li.nextSibling) tail.appendChild(li.nextSibling);
      const out = [];
      let p = null;
      Array.prototype.slice.call(li.childNodes).forEach((n) => {
        if (n.nodeType == 1 && (isList(n) || n.matches("p,div,h1,h2,h3,h4,blockquote,pre,table"))) {
          out.push(n);
          p = null;
          return;
        }
        if (p == null) {
          p = document.createElement("p");
          out.push(p);
        }
        p.appendChild(n);
      });
      if (out.length == 0) {
        p = document.createElement("p");
        p.innerHTML = "<br>";
        out.push(p);
      }
      const last = out[out.length - 1];
      if (last && last.tagName == tail.tagName) {
        while (tail.firstChild) last.appendChild(tail.firstChild);
      } else if (tail.firstElementChild) out.push(tail);
      const at = list.nextSibling;
      out.forEach((n) => list.parentNode.insertBefore(n, at));
      li.remove();
      if (list.firstElementChild == null) list.remove();
      return out[0];
    }
  };

  // source/mixins/menus.js
  var withMenus = (Base) => class extends Base {
    showCtx(x, y, kind) {
      let pop = this.ctxPop;
      if (pop == null) {
        pop = this.makePopup("ye-ctxpop");
        pop.addEventListener("mousedown", (e) => {
          const b = e.target.closest(".ye-tableops button");
          if (b == null) return;
          e.preventDefault();
          if (b.dataset.ye != null) this.tableOp(b.dataset.ye);
          else if (b.dataset.yeLink != null) this.linkOp(b.dataset.yeLink);
          else if (b.dataset.yeImg != null) {
            this.imageOp(b.dataset.yeImg);
            this.hideTableCtx();
            return;
          }
          this.hideTableCtx();
          this.sync();
        });
        this.ctxPop = pop;
      }
      if (kind == "link") this.buildLinkPop(pop);
      else if (kind == "img") this.buildImagePop(pop);
      else this.buildTablePop(pop);
      this.placePopupAt(pop, x, y);
      this.ctxAnchorPos = { x: parseFloat(pop.style.left), y: parseFloat(pop.style.top) };
      this.revealPopup(pop);
    }
    hideTableCtx() {
      if (this.ctxPop == null) return;
      const pop = this.ctxPop;
      this.ctxPop = null;
      this.dismissPopup(pop);
    }
    openCtxAt(target, x, y) {
      function near(sel) {
        return target && target.closest ? target.closest(sel) : null;
      }
      let anchor = near("a");
      if (anchor && this.area.contains(anchor)) {
        this.ctxAnchor = anchor;
        this.showCtx(x, y, "link");
        return true;
      }
      let img = near("img");
      if (img && this.area.contains(img) && !this.isGlyph(img)) {
        this.selectImage(img);
        this.ctxImg = img;
        this.showCtx(x, y, "img");
        return true;
      }
      let cell = target;
      while (cell && cell != this.area) {
        if (cell.nodeType == 1 && (cell.tagName == "TD" || cell.tagName == "TH")) break;
        cell = cell.parentNode;
      }
      if (cell && cell != this.area) {
        const range = document.createRange();
        range.selectNodeContents(cell);
        range.collapse(true);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        this.showCtx(x, y, "table");
        return true;
      }
      if (this.contextMenuEnabled) {
        this.openTextMenu(x, y);
        return true;
      }
      return false;
    }
    anchorUnder(el) {
      if (el == null) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left, y: r.bottom + 4 };
    }
    positionMenuPop(menu) {
      const btn = menu.querySelector("[data-ye-menu-toggle]");
      const pop = menu._pop;
      if (btn == null || pop == null) return;
      const rect = btn.getBoundingClientRect();
      const pad = 8;
      const mw = pop.offsetWidth;
      const mh = pop.offsetHeight;
      let left = rect.left;
      let top = rect.bottom + 4;
      if (left + mw > window.innerWidth - pad) left = window.innerWidth - mw - pad;
      if (left < pad) left = pad;
      if (top + mh > window.innerHeight - pad) top = Math.max(pad, rect.top - 4 - mh);
      pop.style.left = left + "px";
      pop.style.top = top + "px";
    }
    buildLinkPop(pop) {
      pop.innerHTML = "";
      const wrap = document.createElement("div");
      wrap.className = "ye-tableops";
      wrap.setAttribute("role", "menu");
      LINK_OPS.forEach((op) => {
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute("role", "menuitem");
        b.innerHTML = this.renderIcon(op[0]) + "<span>" + this.t(op[1]) + "</span>";
        b.dataset.yeLink = op[0];
        if (op[0] == "remove") b.className = "ye-tableops__danger";
        wrap.appendChild(b);
      });
      pop.appendChild(wrap);
    }
    buildImagePop(pop) {
      pop.innerHTML = "";
      const wrap = document.createElement("div");
      wrap.className = "ye-tableops";
      wrap.setAttribute("role", "menu");
      this.imageOps().forEach((op) => {
        if (op[0] == "|") {
          const d = document.createElement("div");
          d.className = "ye-tableops__sep";
          wrap.appendChild(d);
          return;
        }
        if (op[0] == "size") {
          const row = document.createElement("div");
          row.className = "ye-tableops__sizes";
          IMG_SIZES.map((p) => ["size-" + p, p + "%"]).concat([["size-auto", this.t("Auto")]]).forEach((size) => {
            const b2 = document.createElement("button");
            b2.type = "button";
            b2.setAttribute("role", "menuitem");
            b2.textContent = size[1];
            b2.dataset.yeImg = size[0];
            row.appendChild(b2);
          });
          wrap.appendChild(row);
          return;
        }
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute("role", "menuitem");
        b.innerHTML = this.renderIcon(op[0]) + "<span>" + this.t(op[1]) + "</span>";
        b.dataset.yeImg = op[0];
        if (op[0] == "img-del") b.className = "ye-tableops__danger";
        wrap.appendChild(b);
      });
      pop.appendChild(wrap);
    }
    closeMenus() {
      (this.menuPops || []).forEach((p) => p.classList.remove("is-open"));
      const menus = this.root.querySelectorAll(".ye-menu.is-open");
      for (let i = 0; i < menus.length; i++) menus[i].classList.remove("is-open");
      const openEl = this.openMenuEl;
      this.openMenuEl = null;
      if (openEl && openEl._pop) {
        const toggle = openEl.querySelector("[data-ye-menu-toggle]");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
        const pop = openEl._pop;
        setTimeout(() => {
          if (!pop.classList.contains("is-open")) openEl.appendChild(pop);
        }, 160);
      }
    }
    owns(t) {
      if (this.root.contains(t)) return true;
      if (this.ctxPop && this.ctxPop.contains(t)) return true;
      if (this.textPop && this.textPop.contains(t)) return true;
      if (this.formPop && this.formPop.contains(t)) return true;
      if (this.findPop && this.findPop.contains(t)) return true;
      if (this.imgHandle && this.imgHandle.contains(t)) return true;
      if (this.imgBar && this.imgBar.contains(t)) return true;
      const pops = this.menuPops || [];
      for (let i = 0; i < pops.length; i++) if (pops[i].contains(t)) return true;
      return false;
    }
  };

  // source/mixins/view.js
  var withView = (Base) => class extends Base {
    markActive(cmd, on) {
      const btn = this.root.querySelector('.ye-toolbar__btn[data-cmd="' + cmd + '"]');
      if (btn) {
        btn.classList.toggle("is-active", on);
        btn.setAttribute("aria-pressed", String(on));
      }
    }
    toggleSource() {
      if (!this.root.classList.contains("ye--source") && this.uploading) return;
      this.deselectImage();
      this.flushHistory();
      const html = this.root.classList.contains("ye--source") ? "" : this.getHTML();
      const on = this.root.classList.toggle("ye--source");
      if (on) {
        this.sourceView.value = html;
        this.sourceView.hidden = false;
        this.area.hidden = true;
      } else {
        this.area.innerHTML = this.clean(this.sourceView.value);
        this.area.hidden = false;
        this.sourceView.hidden = true;
        this.enforceLimit(true);
        this.sync();
        this.recordState();
        this.area.focus({ preventScroll: true });
      }
      this.markActive("ye-source-toggle", on);
    }
    toggleFull() {
      const on = this.root.classList.toggle("ye--full");
      document.body.classList.toggle("ye-lock", on);
      if (on) {
        this.savedMaxHeight = this.area.style.maxHeight;
        this.area.style.maxHeight = "";
      } else if (this.savedMaxHeight) {
        this.area.style.maxHeight = this.savedMaxHeight;
      }
      this.markActive("ye-fullscreen", on);
    }
    updateStates() {
      const btns = this.root.querySelectorAll(".ye-toolbar__btn[data-cmd]");
      for (let i = 0; i < btns.length; i++) {
        const cmd = btns[i].dataset.cmd;
        if (STATEFUL.indexOf(cmd) != -1) {
          let on = false;
          try {
            on = document.queryCommandState(cmd);
          } catch (e) {
          }
          btns[i].classList.toggle("is-active", on);
          btns[i].setAttribute("aria-pressed", String(on));
        }
      }
      const anchor = window.getSelection() && window.getSelection().anchorNode || this.area;
      const block = this.closestBlock(anchor) || this.area;
      const align = block == this.area ? "" : block.style.textAlign || "";
      const alignBtns = this.root.querySelectorAll('.ye-toolbar__btn[data-cmd="ye-align"]');
      for (let i = 0; i < alignBtns.length; i++) {
        const a = alignBtns[i].dataset.arg;
        const on = align == a || align == "" && a == "left";
        alignBtns[i].classList.toggle("is-active", on);
        alignBtns[i].setAttribute("aria-pressed", String(on));
      }
      const label = this.root.querySelector("[data-ye-heading-label]");
      if (label) {
        const tag = block && block.tagName ? block.tagName.toLowerCase() : "p";
        label.textContent = this.t(HEADINGS[tag] || "Paragraph");
      }
    }
  };

  // source/mixins/shortcuts.js
  var LEVELS = ["h1", "h2", "h3", "h4"];
  var INLINE_MD = [
    { re: /()\*\*([^*\s](?:[^*]*[^*\s])?)\*\*$/, tag: "strong" },
    { re: /()~~([^~\s](?:[^~]*[^~\s])?)~~$/, tag: "s" },
    // A letter before the star is a product or a name like a*b*c, not emphasis
    { re: /(^|[^*\w])\*([^*\s](?:[^*]*[^*\s])?)\*$/, tag: "em" },
    { re: /(^|[^`])`([^`]+)`$/, tag: "code" }
  ];
  var MEDIA = "img, iframe, hr, table";
  function menuHas(items, action) {
    return (items || []).some((i) => i.action == action || menuHas(i.children, action));
  }
  function isHeading(el) {
    return el != null && el.nodeType == 1 && /^H[1-4]$/.test(el.tagName);
  }
  function headingLevel(el) {
    return +el.tagName.charAt(1);
  }
  function sectionOf(heading) {
    const level = headingLevel(heading);
    const out = [heading];
    let n = heading.nextElementSibling;
    while (n && !(isHeading(n) && headingLevel(n) <= level)) {
      out.push(n);
      n = n.nextElementSibling;
    }
    return out;
  }
  function isBlank2(el) {
    return el.textContent == "" && el.querySelector(MEDIA) == null;
  }
  function caretTo(node, offset) {
    const r = document.createRange();
    r.setStart(node, offset);
    r.collapse(true);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(r);
  }
  var withShortcuts = (Base) => class extends Base {
    // Levels the editor offers, from the headings option, in document order
    headingLevels() {
      const opt = this.options && Array.isArray(this.options.headings) ? this.options.headings.map((h) => typeof h == "number" ? "h" + h : String(h).toLowerCase()) : null;
      const levels = opt ? LEVELS.filter((h) => opt.indexOf(h) != -1) : LEVELS;
      return levels.length ? levels : LEVELS;
    }
    markdownShortcut(e) {
      if (this.inline) return;
      if (e.key == "Enter") {
        if (e.shiftKey || e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return;
        if (!this.markdownBlock(e, true)) this.leaveBlock(e);
        return;
      }
      if (e.key == " " && !e.isComposing) this.markdownBlock(e, false);
    }
    markdownBlock(e, enter) {
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0 || !sel.isCollapsed) return false;
      const block = this.closestBlock(sel.anchorNode);
      if (block == null || block.matches("pre, li")) return false;
      const r = document.createRange();
      r.setStart(block, 0);
      r.setEnd(sel.anchorNode, sel.anchorOffset);
      const before = r.toString();
      if (before != block.textContent.trim()) return false;
      let tag = null, list = null, cmd = null;
      if (before == "```") cmd = "ye-codeblock";
      else if (before == "---") cmd = "ye-hr";
      else if (enter) return false;
      else if (/^#{1,4}$/.test(before)) tag = this.headingLevels()[before.length - 1] || null;
      else if (before == ">") tag = "blockquote";
      else if (before == "-" || before == "*") list = "insertUnorderedList";
      else if (before == "1.") list = "insertOrderedList";
      if (tag == null && list == null && cmd == null) return false;
      e.preventDefault();
      this.recordState();
      r.deleteContents();
      if (isBlank2(block)) {
        block.innerHTML = "<br>";
        caretTo(block, 0);
      }
      if (tag) this.formatBlock(tag);
      else if (list) this.list(list);
      else {
        this.run(cmd);
        if (cmd == "ye-hr" && block.isConnected && isBlank2(block) && block.nextElementSibling && block.nextElementSibling.tagName == "HR") block.remove();
      }
      this.afterCmd();
      return true;
    }
    // Enter on an empty last line of a code block or a quote goes on below it: Chrome keeps adding lines inside
    leaveBlock(e) {
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0 || !sel.isCollapsed) return false;
      const node = sel.anchorNode;
      const off = sel.anchorOffset;
      const el = node.nodeType == 1 ? node : node.parentNode;
      const box = el && el.closest ? el.closest("pre, blockquote") : null;
      if (box == null || !this.area.contains(box)) return false;
      const rest = document.createRange();
      rest.setStart(node, off);
      rest.setEnd(box, box.childNodes.length);
      const tail = rest.cloneContents();
      if (tail.textContent != "" || tail.querySelector(MEDIA)) return false;
      const block = this.closestBlock(node);
      let emptied = false;
      if (block && block != box && box.contains(block)) {
        if (block.tagName == "LI" || !isBlank2(block)) return false;
        block.remove();
        emptied = true;
      } else if (!isBlank2(box)) {
        if (!this.dropEmptyLine(box, node, off)) return false;
        rest.deleteContents();
        emptied = true;
      }
      e.preventDefault();
      this.recordState();
      let next;
      if (!emptied || isBlank2(box)) {
        next = document.createElement("p");
        next.innerHTML = "<br>";
        box.replaceWith(next);
      } else {
        next = box.nextElementSibling;
        if (next == null || next.tagName != "P" || !isBlank2(next)) {
          next = document.createElement("p");
          next.innerHTML = "<br>";
          box.after(next);
        }
      }
      caretTo(next, 0);
      this.afterCmd();
      this.recordState();
      return true;
    }
    // The line the caret is on is empty when a break or a newline comes right before it
    dropEmptyLine(box, node, off) {
      const head = document.createRange();
      head.setStart(box, 0);
      head.setEnd(node, off);
      const walker = document.createTreeWalker(box, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null);
      let last = null, n;
      while (n = walker.nextNode()) {
        if (!head.intersectsNode(n)) continue;
        if (n.nodeType == 3) {
          const end = n == node ? off : n.nodeValue.length;
          if (end > 0) last = { text: n, end };
        } else if (n.tagName == "BR") last = { br: n };
      }
      if (last == null) return false;
      if (last.br) {
        last.br.remove();
        return true;
      }
      if (last.text.nodeValue.charAt(last.end - 1) != "\n") return false;
      last.text.deleteData(last.end - 1, 1);
      return true;
    }
    inlineMarkdown(e) {
      if (this.inline || e.inputType != "insertText" || !e.data) return;
      const ch = e.data.slice(-1);
      if (ch != "*" && ch != "`" && ch != "~") return;
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0 || !sel.isCollapsed) return;
      const node = sel.anchorNode;
      const at = sel.anchorOffset;
      if (node == null || node.nodeType != 3 || !this.area.contains(node) || node.parentNode.closest("pre, code")) return;
      const before = node.nodeValue.slice(0, at);
      INLINE_MD.some((md) => {
        const m = md.re.exec(before);
        if (m == null) return false;
        this.recordState();
        const r = document.createRange();
        r.setStart(node, m.index + m[1].length);
        r.setEnd(node, at);
        r.deleteContents();
        const el = document.createElement(md.tag);
        el.textContent = m[2];
        r.insertNode(el);
        this.caretAfter(el);
        this.afterCmd();
        this.recordState();
        return true;
      });
    }
    caretAfter(el) {
      let next = el.nextSibling;
      if (next == null || next.nodeType != 3) {
        next = document.createTextNode("");
        el.after(next);
      }
      caretTo(next, 0);
      this.mdTail = el;
    }
    // Chrome puts the letter typed right after a new tag inside it: the first one goes after it by hand
    mdBeforeInput(e) {
      const space = this.mdSpace;
      this.mdSpace = null;
      if (space && space.isConnected && e.inputType == "insertText" && e.data && e.data != " " && space.nodeValue.charAt(0) == "\xA0") {
        const s = window.getSelection();
        if (s && s.isCollapsed && s.anchorNode == space && s.anchorOffset == 1) {
          e.preventDefault();
          space.replaceData(0, 1, " " + e.data);
          caretTo(space, 1 + e.data.length);
          this.mdTail = null;
          this.sync();
          return;
        }
      }
      const el = this.mdTail;
      this.mdTail = null;
      if (el == null || e.defaultPrevented || e.inputType != "insertText" || !e.data || !el.isConnected) return;
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0 || !sel.isCollapsed) return;
      const node = sel.anchorNode;
      const off = sel.anchorOffset;
      let atEnd = false;
      if (el.contains(node)) {
        const rest = document.createRange();
        rest.setStart(node, off);
        rest.setEnd(el, el.childNodes.length);
        atEnd = rest.toString() == "";
      } else {
        atEnd = node == el.nextSibling && off == 0 || node == el.parentNode && node.childNodes[off - 1] == el;
      }
      if (!atEnd) return;
      e.preventDefault();
      let next = el.nextSibling;
      if (next == null || next.nodeType != 3) {
        next = document.createTextNode("");
        el.after(next);
      }
      const text = e.data == " " && next.nodeValue == "" ? "\xA0" : e.data;
      next.insertData(0, text);
      caretTo(next, text.length);
      if (text == "\xA0") this.mdSpace = next;
      this.sync();
    }
    moveKey(e) {
      if (this.inline || !e.altKey || !e.shiftKey || e.ctrlKey || e.metaKey) return false;
      if (e.key != "ArrowUp" && e.key != "ArrowDown") return false;
      if (e.getModifierState && e.getModifierState("AltGraph")) return false;
      this.moveBlock(e.key == "ArrowUp");
      return true;
    }
    // Alt+Shift+Up/Down: the block, list item or heading section swaps with its neighbour
    moveBlock(up) {
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0) return false;
      const range = sel.getRangeAt(0);
      let node = range.startContainer;
      if (!this.area.contains(node) || node == this.area) return false;
      const el = node.nodeType == 1 ? node : node.parentNode;
      const li = el.closest("li");
      let unit, target = null;
      if (li && this.area.contains(li)) {
        unit = [li];
        const sib = up ? li.previousElementSibling : li.nextElementSibling;
        if (sib && sib.tagName == "LI") target = [sib];
      } else {
        while (node.parentNode != this.area) node = node.parentNode;
        if (node.nodeType != 1) return false;
        unit = isHeading(node) ? sectionOf(node) : [node];
        target = isHeading(node) ? this.sectionNeighbour(unit, up) : null;
        if (!isHeading(node)) {
          const sib = up ? node.previousElementSibling : node.nextElementSibling;
          if (sib) target = [sib];
        }
      }
      if (target == null) return false;
      const sc = range.startContainer, so = range.startOffset, ec = range.endContainer, eo = range.endOffset;
      this.recordState();
      const frag = document.createDocumentFragment();
      unit.forEach((n) => frag.appendChild(n));
      const parent = target[0].parentNode;
      parent.insertBefore(frag, up ? target[0] : target[target.length - 1].nextSibling);
      try {
        const r = document.createRange();
        r.setStart(sc, so);
        r.setEnd(ec, eo);
        this.area.focus({ preventScroll: true });
        sel.removeAllRanges();
        sel.addRange(r);
      } catch (err) {
      }
      if (unit[0].scrollIntoView) unit[0].scrollIntoView({ block: "nearest" });
      this.afterCmd();
      this.recordState();
      return true;
    }
    // A section passes only a section of its own level: past a higher heading it would change parent
    sectionNeighbour(unit, up) {
      const level = headingLevel(unit[0]);
      if (!up) {
        const next = unit[unit.length - 1].nextElementSibling;
        return next && isHeading(next) && headingLevel(next) == level ? sectionOf(next) : null;
      }
      let n = unit[0].previousElementSibling;
      while (n && !(isHeading(n) && headingLevel(n) <= level)) n = n.previousElementSibling;
      if (n) return headingLevel(n) == level ? sectionOf(n) : null;
      return unit[0].previousElementSibling ? [unit[0].previousElementSibling] : null;
    }
    shortcut(e) {
      if (e.getModifierState && e.getModifierState("AltGraph")) return false;
      const k = shortcutKey(e);
      if (!e.altKey && !e.shiftKey) {
        if (k == "z") {
          this.undo();
          return true;
        }
        if (k == "y") {
          this.redo();
          return true;
        }
        if (k == "k" && this.offers("ye-link", "link")) {
          this.nextFormAnchor = this.anchorUnder(this.root.querySelector('.ye-toolbar__btn[data-cmd="ye-link"]'));
          this.insertLink();
          return true;
        }
        if (k == "f" && this.offers("ye-find", "find")) {
          this.openFindPop();
          return true;
        }
      }
      if (e.shiftKey && !e.altKey) {
        if (k == "z") {
          this.redo();
          return true;
        }
        if (k == "x") {
          exec("strikeThrough");
          this.afterCmd();
          return true;
        }
        if (!this.inline && e.code == "Digit7") {
          this.list("insertOrderedList");
          this.afterCmd();
          return true;
        }
        if (!this.inline && e.code == "Digit8") {
          this.list("insertUnorderedList");
          this.afterCmd();
          return true;
        }
      }
      if (!this.inline && e.altKey && !e.shiftKey) {
        const digit = /^Digit([0-9])$/.exec(e.code || "");
        const tag = digit == null ? null : digit[1] == "0" ? "p" : this.headingLevels()[digit[1] - 1];
        if (tag) {
          this.formatBlock(tag);
          this.afterCmd();
          return true;
        }
      }
      return false;
    }
    // Ctrl+F/K stay the browser's unless the editor offers them
    offers(cmd, action) {
      return this.root.querySelector('.ye-toolbar__btn[data-cmd="' + cmd + '"]') != null || this.contextMenuEnabled && menuHas(this.contextMenuItems, action);
    }
    list(cmd) {
      exec(cmd);
      this.liftList();
      const sel = window.getSelection();
      const node = sel && sel.rangeCount ? sel.anchorNode : null;
      if (node && node != this.area && this.area.contains(node) && this.closestBlock(node) == null) exec("formatBlock", "<p>");
    }
    // Chrome makes a list inside the paragraph it came from, <p><ol>…</ol></p>, which no browser keeps as is
    liftList() {
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0) return;
      let list = sel.anchorNode;
      while (list && list != this.area && !(list.nodeType == 1 && (list.tagName == "OL" || list.tagName == "UL"))) list = list.parentNode;
      if (list == null || list == this.area) return;
      const p = list.parentNode;
      if (p == this.area || !/^(P|DIV|H[1-4])$/.test(p.tagName)) return;
      const range = sel.getRangeAt(0);
      const sc = range.startContainer, so = range.startOffset, ec = range.endContainer, eo = range.endOffset;
      const after = p.cloneNode(false);
      while (list.nextSibling) after.appendChild(list.nextSibling);
      p.after(list);
      list.after(after);
      if (isBlank2(p)) p.remove();
      if (isBlank2(after)) after.remove();
      try {
        const r = document.createRange();
        r.setStart(sc, so);
        r.setEnd(ec, eo);
        sel.removeAllRanges();
        sel.addRange(r);
      } catch (err) {
      }
    }
    afterCmd() {
      this.sync();
      this.updateStates();
      this.recordState();
    }
  };

  // source/mixins/wiring.js
  var lastEditor = null;
  var withWiring = (Base) => class extends Base {
    wire() {
      const area = this.area;
      area.addEventListener("beforeinput", (e) => {
        const t = e.inputType || "";
        if (t == "historyUndo" || t == "historyRedo") {
          e.preventDefault();
          if (t == "historyUndo") this.undo();
          else this.redo();
          return;
        }
        this.inputBoundary = t == "insertText" && /\s/.test(e.data || "") || t == "insertParagraph" || t == "insertLineBreak" || t == "insertFromPaste" || t == "insertFromDrop";
        if (!this.maxChars) return;
        if (t.indexOf("insert") != 0) return;
        let add = 1;
        if ((t == "insertText" || t == "insertReplacementText") && e.data != null) add = cpLen(e.data);
        else if (t == "insertParagraph" || t == "insertLineBreak") add = 0;
        const room = this.roomLeft();
        if (add <= room) return;
        e.preventDefault();
        if (t == "insertText" && e.data && room > 0) exec("insertText", e.data.slice(0, cpForward(e.data, 0, room)));
      });
      area.addEventListener("input", (e) => {
        if (this.inline) area.querySelectorAll("img, iframe").forEach((el) => {
          if (!this.isGlyph(el)) el.remove();
        });
        if (/^delete/.test(e.inputType || "")) this.dropComputedSpans();
        this.dropForeignImages();
        this.enforceLimit();
        this.sync();
        if (this.inputBoundary) {
          this.inputBoundary = false;
          this.recordState();
        }
      });
      area.addEventListener("compositionstart", () => {
        this.composing = true;
      });
      area.addEventListener("compositionend", () => {
        this.composing = false;
        this.enforceLimit();
        this.sync();
      });
      area.addEventListener("blur", () => this.sync());
      area.addEventListener("keyup", () => this.updateStates());
      area.addEventListener("mouseup", () => this.updateStates());
      area.addEventListener("keydown", (e) => {
        this.noteCaret();
        if (this.inline && e.key == "Enter" && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.isComposing) {
          if (!e.defaultPrevented) {
            e.preventDefault();
            exec("insertLineBreak");
          }
          return;
        }
        if (this.imageKey(e)) return;
        if (this.captionKey(e)) return;
        if (e.key == "Tab" && !e.defaultPrevented) {
          this.flushHistory();
          if (this.tabKey(e)) {
            e.preventDefault();
            this.recordState();
            return;
          }
        }
        this.markdownShortcut(e);
        if ((e.ctrlKey || e.metaKey) && this.shortcut(e)) {
          e.preventDefault();
          return;
        }
        if (e.key == "Escape") {
          const busy = this.ctxPop || this.textPop || this.textMenu || this.formPop || this.findPop || this.selectedImg || this.openMenuEl;
          this.hideTableCtx();
          this.closeTextMenu();
          this.hideFormPop();
          this.hideFindPop();
          this.deselectImage();
          this.closeMenus();
          if (!busy && this.root.classList.contains("ye--full")) this.toggleFull();
        }
      });
      area.addEventListener("contextmenu", (e) => {
        if (this.openCtxAt(e.target, e.clientX, e.clientY)) e.preventDefault();
      });
      area.addEventListener("click", (e) => {
        const img = e.target && e.target.closest ? e.target.closest("img") : null;
        if (img && area.contains(img) && !this.isGlyph(img)) {
          this.selectImage(img);
          const range = document.createRange();
          range.setStartAfter(img);
          range.collapse(true);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(range);
        } else this.deselectImage();
      });
      let lpTimer = null, lpStart = null;
      function clearLp() {
        if (lpTimer) {
          clearTimeout(lpTimer);
          lpTimer = null;
        }
      }
      this.clearLongPress = clearLp;
      area.addEventListener("touchstart", (e) => {
        if (e.touches.length != 1) {
          clearLp();
          return;
        }
        const t = e.touches[0];
        lpStart = { x: t.clientX, y: t.clientY, target: t.target };
        clearLp();
        lpTimer = setTimeout(() => {
          lpTimer = null;
          if (this.openCtxAt(lpStart.target, lpStart.x, lpStart.y)) {
            if (navigator.vibrate) {
              try {
                navigator.vibrate(10);
              } catch (er) {
              }
            }
          }
        }, 500);
      }, { passive: true });
      area.addEventListener("touchmove", (e) => {
        if (lpTimer == null || lpStart == null) return;
        const t = e.touches[0];
        if (Math.abs(t.clientX - lpStart.x) > 10 || Math.abs(t.clientY - lpStart.y) > 10) clearLp();
      }, { passive: true });
      area.addEventListener("touchend", clearLp);
      area.addEventListener("touchcancel", clearLp);
      this.sourceView.addEventListener("input", () => {
        const html = this.clean(this.sourceView.value);
        if (this.input) this.input.value = html;
        if (typeof this.options.onChange == "function") this.options.onChange(html);
        this.emit("change", html);
      });
      area.addEventListener("paste", (e) => {
        const data = e.clipboardData || window.clipboardData;
        if (data == null) return;
        const files = this.onFiles && !data.getData("text/plain") ? filesFrom(data) : [];
        if (files.length) {
          e.preventDefault();
          this.onFiles(files, this);
          return;
        }
        const imgs = this.uploadEnabled ? imageFilesFrom(data) : [];
        if (imgs.length) {
          e.preventDefault();
          this.uploadFiles(imgs);
          return;
        }
        e.preventDefault();
        this.insertClipboard(data.getData("text/html"), data.getData("text/plain"));
      });
      area.addEventListener("dragstart", () => {
        this.dragInside = true;
      });
      area.addEventListener("dragend", () => {
        this.dragInside = false;
      });
      area.addEventListener("drop", (e) => {
        const dt = e.dataTransfer;
        if (this.dragInside || dt == null || dtHasFiles(dt)) return;
        const html = dt.getData("text/html");
        const text = dt.getData("text/plain");
        if (!html && !text) return;
        e.preventDefault();
        area.focus();
        const r = rangeFromPoint(e.clientX, e.clientY);
        if (r && area.contains(r.startContainer)) {
          const s = window.getSelection();
          s.removeAllRanges();
          s.addRange(r);
        }
        this.insertClipboard(html, text);
      });
      area.addEventListener("focus", () => {
        lastEditor = this;
      });
      this.onUndoKey = (e) => {
        if (lastEditor != this || !(e.ctrlKey || e.metaKey) || e.altKey || e.defaultPrevented) return;
        const k = shortcutKey(e);
        if (k != "z" && k != "y") return;
        const t = e.target;
        if (t == null || this.area.contains(t)) return;
        if (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
        e.preventDefault();
        if (k == "y" || e.shiftKey) this.redo();
        else this.undo();
      };
      this.onMousedown = (e) => {
        if (!this.owns(e.target) && !(e.target.closest && e.target.closest(".y-context-menu, .y-dropdown, .y-modal, .ye-popup"))) {
          if (lastEditor == this) lastEditor = null;
          return;
        }
        lastEditor = this;
        if (!this.owns(e.target)) return;
        this.saveRange();
        if (e.target.closest(".ye-toolbar__btn, .ye-menu__item, .ye-swatch, .ye-tableops button, .ye-grid__cell")) e.preventDefault();
      };
      this.onChange = (e) => {
        if (!this.owns(e.target)) return;
        const el = e.target.closest(".ye-color-native, .ye-color-hex");
        if (el == null) return;
        this.applyCustomColor(el);
      };
      this.onHexKey = (e) => {
        if (!this.owns(e.target)) return;
        if (e.key == "Enter" && e.target.classList && e.target.classList.contains("ye-color-hex")) {
          e.preventDefault();
          this.applyCustomColor(e.target);
        }
      };
      this.onClick = (e) => {
        if (!this.owns(e.target)) return;
        if (this.ctxPop && this.ctxPop.contains(e.target) || this.formPop && this.formPop.contains(e.target)) return;
        const toggle = e.target.closest("[data-ye-menu-toggle]");
        if (toggle) {
          e.preventDefault();
          const menu = toggle.closest("[data-ye-menu]");
          const pop = menu._pop;
          const willOpen = pop && !pop.classList.contains("is-open");
          this.closeMenus();
          if (willOpen) {
            if (pop.hasAttribute("data-ye-table-pop")) this.buildTablePop(pop);
            this.themePopup(pop);
            document.body.appendChild(pop);
            menu.classList.add("is-open");
            toggle.setAttribute("aria-expanded", "true");
            this.openMenuEl = menu;
            this.positionMenuPop(menu);
            void pop.offsetWidth;
            pop.classList.add("is-open");
          }
          return;
        }
        const gridCell = e.target.closest(".ye-grid__cell");
        if (gridCell) {
          e.preventDefault();
          area.focus();
          const gpop = gridCell.closest("[data-ye-table-pop]");
          const hb = gpop && gpop.querySelector("[data-ye-table-header]");
          this.insertTable(parseInt(gridCell.dataset.r, 10), parseInt(gridCell.dataset.c, 10), hb && hb.checked);
          this.closeMenus();
          this.sync();
          return;
        }
        const opBtn = e.target.closest(".ye-tableops button");
        if (opBtn) {
          e.preventDefault();
          area.focus();
          this.tableOp(opBtn.dataset.ye);
          this.closeMenus();
          this.sync();
          return;
        }
        const sourceBtn = e.target.closest("[data-ye-source]");
        if (sourceBtn && this.owns(sourceBtn)) {
          e.preventDefault();
          this.closeMenus();
          this.pickImage(+sourceBtn.dataset.yeSource);
          return;
        }
        const upBtn = e.target.closest("[data-ye-upload]");
        if (upBtn) {
          e.preventDefault();
          this.saveRange();
          this.closeMenus();
          this.fileInput.click();
          return;
        }
        const cmdEl = e.target.closest("[data-cmd]");
        if (cmdEl && this.owns(cmdEl)) {
          e.preventDefault();
          const c = cmdEl.dataset.cmd;
          if (c == "ye-link" || c == "ye-image" || c == "ye-video") this.nextFormAnchor = this.anchorUnder(cmdEl);
          this.run(c, cmdEl.dataset.arg);
          this.closeMenus();
          this.sync();
          this.updateStates();
          if (c != "undo" && c != "redo") this.recordState();
        }
      };
      this.onMouseover = (e) => {
        if (!this.owns(e.target)) return;
        const cell = e.target.closest(".ye-grid__cell");
        if (cell == null) return;
        const gr = parseInt(cell.dataset.r, 10);
        const gc = parseInt(cell.dataset.c, 10);
        const container = cell.closest(".ye-menu__pop") || this.root;
        const cells = container.querySelectorAll(".ye-grid__cell");
        for (let i = 0; i < cells.length; i++) {
          const on = parseInt(cells[i].dataset.r, 10) <= gr && parseInt(cells[i].dataset.c, 10) <= gc;
          cells[i].classList.toggle("is-on", on);
        }
        const label = container.querySelector(".ye-grid__label");
        if (label) label.textContent = gr + " \xD7 " + gc;
      };
      if (this.uploadEnabled) {
        this.fileInput.addEventListener("change", () => {
          this.uploadFiles(Array.prototype.slice.call(this.fileInput.files));
          this.fileInput.value = "";
        });
        area.addEventListener("dragover", (e) => {
          if (!dtHasFiles(e.dataTransfer)) return;
          e.preventDefault();
          this.root.classList.add("ye--drop");
        });
        area.addEventListener("dragleave", (e) => {
          if (e.target == area) this.root.classList.remove("ye--drop");
        });
        area.addEventListener("drop", (e) => {
          if (!dtHasFiles(e.dataTransfer)) return;
          e.preventDefault();
          this.root.classList.remove("ye--drop");
          const files = imageFilesFrom(e.dataTransfer);
          if (files.length == 0) return;
          const r = rangeFromPoint(e.clientX, e.clientY);
          if (r && area.contains(r.startContainer)) {
            const s = window.getSelection();
            s.removeAllRanges();
            s.addRange(r);
          }
          this.uploadFiles(files);
        });
      }
      this.docClick = (e) => {
        if (this.imgHandle && this.imgHandle.contains(e.target)) return;
        if (this.imgBar && this.imgBar.contains(e.target)) return;
        if (!this.owns(e.target) || this.area.contains(e.target)) this.closeMenus();
        if (this.ctxPop && !this.ctxPop.contains(e.target)) this.hideTableCtx();
        if (this.textPop && !this.textPop.contains(e.target)) this.closeTextMenu();
        if (this.formPop && !this.formPop.contains(e.target) && !this.root.contains(e.target)) {
          if (Date.now() - (this.formOpenTs || 0) >= 400) this.hideFormPop();
        }
        if (!this.root.contains(e.target) && !(this.ctxPop && this.ctxPop.contains(e.target))) this.deselectImage();
      };
      this.ctxDismiss = (e) => {
        const inside = [this.textMenuEl, this.textPop, this.ctxPop].some((el) => el && e && e.target instanceof Node && el.contains(e.target));
        if (inside) return;
        this.hideTableCtx();
        this.closeTextMenu();
        this.closeMenus();
        if (this.selectedImg) this.showImgHandle();
        this.followPopups();
      };
    }
    // Sizes and fonts the editor never sets itself come only from Chrome copying computed looks: they go,
    // and a span left with nothing goes with them
    dropComputedSpans() {
      this.area.querySelectorAll("span[style]").forEach((span) => {
        ["font-size", "font-family", "line-height", "letter-spacing", "font-weight", "font-style"].forEach((p) => span.style.removeProperty(p));
        if (span.getAttribute("style").trim() == "") {
          span.removeAttribute("style");
          if (span.attributes.length == 0) span.replaceWith(...span.childNodes);
        }
      });
    }
    // A selected picture: Delete or Backspace takes it out, any other key lets it go
    imageKey(e) {
      const img = this.selectedImg;
      if (img == null || e.ctrlKey || e.metaKey || e.altKey) return false;
      if (e.key == "Backspace" || e.key == "Delete") {
        e.preventDefault();
        this.imageOp("img-del", img);
        return true;
      }
      if ((e.key || "").length == 1 || e.key == "Enter") this.deselectImage();
      return false;
    }
    // Find and a dialog of the standalone build stand by the editor: a scroll takes them along
    followPopups() {
      const top = this.root.getBoundingClientRect().top;
      const shift = this.popTop == null ? 0 : top - this.popTop;
      this.popTop = top;
      if (shift == 0) return;
      [this.findPop, this.formPop].forEach((pop) => {
        if (pop && pop.classList.contains("ye-popup")) pop.style.top = (parseFloat(pop.style.top) || 0) + shift + "px";
      });
    }
    listenGlobal(on) {
      if (this.onClick == null || !!this.globalOn == on) return;
      this.globalOn = on;
      const m = on ? "addEventListener" : "removeEventListener";
      document[m]("mousedown", this.onMousedown);
      document[m]("change", this.onChange);
      document[m]("keydown", this.onHexKey);
      document[m]("keydown", this.onUndoKey);
      if (!on && lastEditor == this) lastEditor = null;
      document[m]("click", this.onClick);
      document[m]("mouseover", this.onMouseover);
      document[m]("focusin", this.onMouseover);
      document[m]("click", this.docClick);
      window[m]("scroll", this.ctxDismiss, true);
      window[m]("resize", this.ctxDismiss);
    }
  };

  // source/mixins/links.js
  var WIKI_OPEN = /\[\[([^[\]|\n]{0,100})$/;
  function urlOf(text) {
    if (/\s/.test(text) || text == "") return null;
    if (/^(https?:\/\/|mailto:|tel:)/i.test(text)) return { href: text, sure: true };
    if (/^www\./i.test(text)) return { href: "https://" + text, sure: true };
    if (/^[^/@:]+\.[a-z]{2,}(\/\S*)?$/i.test(text)) return { href: "https://" + text, sure: false };
    return null;
  }
  function matchesShortcut(e, spec) {
    const parts = String(spec).toLowerCase().split("+").map((p) => p.trim());
    const key = parts[parts.length - 1];
    const mod = parts.indexOf("ctrl") != -1 || parts.indexOf("cmd") != -1 || parts.indexOf("mod") != -1;
    if (mod != (e.ctrlKey || e.metaKey)) return false;
    if (parts.indexOf("shift") != -1 != e.shiftKey || parts.indexOf("alt") != -1 != e.altKey) return false;
    if (/^[a-z]$/.test(key)) return e.code == "Key" + key.toUpperCase();
    if (/^[0-9]$/.test(key)) return e.code == "Digit" + key;
    return (e.key || "").toLowerCase() == key;
  }
  var withLinks = (Base) => class extends Base {
    // { search(q) -> Promise<[{ title, hint }]>, insert(item, selectedText) -> text }
    get linkProvider() {
      const p = this.options && this.options.linkProvider;
      return p && typeof p.search == "function" ? p : null;
    }
    wire() {
      super.wire();
      if (this.toolbar) {
        this.toolbar.addEventListener("click", (e) => {
          const btn = e.target.closest("[data-ye-extra]");
          if (btn == null) return;
          const b = this.extraButtons().find((x) => x.key == btn.dataset.yeExtra);
          if (b) {
            this.saveRange();
            b.onClick(this, btn, e);
          }
        });
      }
      if (this.linkProvider == null) return;
      const area = this.area;
      area.addEventListener("input", () => this.checkWikiOpen());
      area.addEventListener("keydown", (e) => this.suggestKey(e), true);
      area.addEventListener("keyup", (e) => {
        if (this.suggestPop && /^(Arrow(Left|Right)|Home|End)$/.test(e.key)) this.checkWikiOpen();
      });
      area.addEventListener("mouseup", () => {
        if (this.suggestPop) this.checkWikiOpen();
      });
      area.addEventListener("blur", () => this.closeSuggest());
    }
    // Detaching or destroying the editor releases its page listeners: the suggestions go with them
    listenGlobal(on) {
      super.listenGlobal(on);
      if (!on) this.closeSuggest();
    }
    shortcut(e) {
      const b = this.extraButtons().find((x) => x.shortcut && matchesShortcut(e, x.shortcut));
      if (b == null) return super.shortcut(e);
      this.saveRange();
      b.onClick(this, this.toolbar ? this.toolbar.querySelector('[data-ye-extra="' + CSS.escape(b.key) + '"]') : null, e);
      return true;
    }
    // Text, or a function given the text before the caret in its block that returns it
    insertText(text) {
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0 || !this.area.contains(sel.getRangeAt(0).commonAncestorContainer)) this.restoreRange();
      else if (document.activeElement != this.area) this.area.focus({ preventScroll: true });
      if (typeof text == "function") text = text(this.textBeforeCaret());
      if (!text) return this;
      this.flushHistory();
      exec("insertText", text);
      this.sync();
      this.recordState();
      return this;
    }
    textBeforeCaret() {
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0 || !this.area.contains(sel.getRangeAt(0).startContainer)) return "";
      const r = sel.getRangeAt(0);
      const before = document.createRange();
      before.setStart(this.closestBlock(r.startContainer) || this.area, 0);
      before.setEnd(r.startContainer, r.startOffset);
      return before.toString();
    }
    caretRect() {
      const sel = window.getSelection();
      if (sel && sel.rangeCount && this.area.contains(sel.getRangeAt(0).startContainer)) {
        const rects = sel.getRangeAt(0).getClientRects();
        if (rects.length) return rects[rects.length - 1];
        const node = sel.getRangeAt(0).startContainer;
        const el = node.nodeType == 1 ? node : node.parentElement;
        if (el) return el.getBoundingClientRect();
      }
      return this.area.getBoundingClientRect();
    }
    linkText(item, selected) {
      const p = this.linkProvider;
      const label = (selected || "").replace(/[[\]|]/g, "").replace(/\s+/g, " ").trim();
      if (typeof p.insert == "function") {
        const out = p.insert(item, label);
        return typeof out == "string" ? out : null;
      }
      return "[[" + item.title + (label && label != item.title ? "|" + label : "") + "]]";
    }
    pickItem(item) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "ye-picklist__item" + (item.kind == "remove" ? " ye-picklist__item--danger" : "");
      b.setAttribute("role", "option");
      const icon = item.kind == "url" ? this.renderIcon("link") : item.kind == "remove" ? this.renderIcon("remove") : this.iconOr("article", '<span class="material-symbols-rounded ye-ico">article</span>');
      const title = item.kind == "url" ? item.url : item.kind == "remove" ? this.t("Remove link") : item.title;
      const hint = item.kind == "url" ? this.t("Web link") : item.kind == "remove" ? "" : item.hint;
      b.innerHTML = '<span class="ye-picklist__icon">' + icon + '</span><span class="ye-picklist__text"><span class="ye-picklist__title">' + escapeHtml(title || "") + "</span>" + (hint ? '<span class="ye-picklist__hint">' + escapeHtml(hint) + "</span>" : "") + "</span>";
      return b;
    }
    fillPicklist(list, items, active, empty) {
      list.innerHTML = "";
      if (items.length == 0) {
        if (empty) list.innerHTML = '<div class="ye-picklist__empty">' + escapeHtml(empty) + "</div>";
        return;
      }
      items.forEach((item, i) => {
        const b = this.pickItem(item);
        b.dataset.index = i;
        if (i == active) {
          b.classList.add("is-active");
          b.setAttribute("aria-selected", "true");
        }
        list.appendChild(b);
      });
      const current = list.children[active];
      if (current && current.scrollIntoView) current.scrollIntoView({ block: "nearest" });
    }
    fillForm(pop, opts) {
      pop.classList.toggle("ye-linkpop", !!opts.render);
      return opts.render ? opts.render(pop) : super.fillForm(pop, opts);
    }
    // One dialog for both: a title finds articles through the provider, an address makes a web link
    insertLink() {
      const provider = this.linkProvider;
      if (provider == null) return super.insertLink();
      const sel = window.getSelection();
      const selected = sel && sel.rangeCount && this.area.contains(sel.getRangeAt(0).commonAncestorContainer) ? sel.toString() : "";
      const anchor = this.currentAnchor();
      this.promptPop({ render: (pop) => this.fillLinkPop(pop, provider, anchor, selected) });
    }
    fillLinkPop(pop, provider, anchor, selected) {
      const editor = this;
      pop.innerHTML = "";
      const input = document.createElement("input");
      input.type = "text";
      input.className = "ye-formpop__input";
      input.placeholder = this.t("Find an article or paste a link");
      input.setAttribute("aria-label", input.placeholder);
      input.value = anchor ? anchor.getAttribute("href") || "" : selected.replace(/\s+/g, " ").trim().slice(0, 100);
      const list = document.createElement("div");
      list.className = "ye-picklist";
      list.setAttribute("role", "listbox");
      const err = document.createElement("div");
      err.className = "ye-formpop__err";
      const row = document.createElement("div");
      row.className = "ye-formpop__row";
      const cancel = document.createElement("button");
      cancel.type = "button";
      cancel.className = "ye-formpop__btn";
      cancel.textContent = this.t("Cancel");
      const ok = document.createElement("button");
      ok.type = "button";
      ok.className = "ye-formpop__btn ye-formpop__btn--ok";
      ok.textContent = this.t("OK");
      row.append(cancel, ok);
      pop.append(input, list, err, row);
      let items = [];
      let found = [];
      let active = 0;
      let seq = 0;
      let timer = null;
      function compose() {
        const q = input.value.trim();
        const url = urlOf(q);
        const out = [];
        if (url && url.sure) out.push({ kind: "url", url: url.href });
        found.forEach((f) => out.push(f));
        if (url && !url.sure) out.push({ kind: "url", url: url.href });
        if (anchor) out.push({ kind: "remove" });
        items = out;
        if (active >= items.length) active = 0;
        editor.fillPicklist(list, items, active, q == "" ? editor.t("Type a title or paste a link") : "");
      }
      function search() {
        const q = input.value.trim();
        const n = ++seq;
        clearTimeout(timer);
        found = [];
        active = 0;
        compose();
        if (q == "" || urlOf(q) && urlOf(q).sure) return;
        timer = setTimeout(() => {
          Promise.resolve(provider.search(q)).then((res) => {
            if (n != seq) return;
            found = (Array.isArray(res) ? res : []).filter((r) => r && r.title).map((r) => ({ kind: "article", title: r.title, hint: r.hint || "" }));
            compose();
            if (items.length == 0) editor.fillPicklist(list, items, 0, editor.t("Nothing found"));
          }).catch(() => {
          });
        }, 200);
      }
      function pick(item) {
        if (item == null) return;
        clearTimeout(timer);
        seq++;
        editor.restoreRange();
        let msg = null;
        if (item.kind == "url") {
          const attrs = anchor || editor.options.linkFields === false ? null : { title: "", newTab: true };
          msg = editor.applyLink(item.url, anchor, selected, attrs);
        } else if (item.kind == "remove") {
          editor.applyLink("", anchor, selected, null);
        } else {
          const text = editor.linkText(item, anchor ? anchor.textContent : selected);
          if (text != null) {
            if (anchor) {
              const r = document.createRange();
              r.selectNode(anchor);
              const s = window.getSelection();
              s.removeAllRanges();
              s.addRange(r);
            }
            exec("insertText", text);
            editor.sync();
          }
        }
        if (msg) {
          err.textContent = msg;
          err.classList.add("is-shown");
          input.focus();
          return;
        }
        editor.hideFormPop();
      }
      function move(step) {
        if (items.length == 0) return;
        active = (active + step + items.length) % items.length;
        editor.fillPicklist(list, items, active, "");
      }
      input.addEventListener("input", () => {
        err.classList.remove("is-shown");
        search();
      });
      input.addEventListener("keydown", (e) => {
        if (e.key == "ArrowDown") {
          e.preventDefault();
          move(1);
        } else if (e.key == "ArrowUp") {
          e.preventDefault();
          move(-1);
        } else if (e.key == "Enter") {
          e.preventDefault();
          pick(items[active]);
        } else if (e.key == "Escape") {
          e.preventDefault();
          this.hideFormPop();
        }
      });
      list.addEventListener("mousedown", (e) => e.preventDefault());
      list.addEventListener("click", (e) => {
        const b = e.target.closest(".ye-picklist__item");
        if (b) pick(items[+b.dataset.index]);
      });
      ok.addEventListener("mousedown", (e) => {
        e.preventDefault();
        pick(items[active]);
      });
      cancel.addEventListener("mousedown", (e) => {
        e.preventDefault();
        this.hideFormPop();
      });
      ok.addEventListener("click", (e) => {
        if (e.detail == 0) pick(items[active]);
      });
      cancel.addEventListener("click", (e) => {
        if (e.detail == 0) this.hideFormPop();
      });
      search();
      return input;
    }
    // [[ suggestions
    wikiTrigger() {
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0 || !sel.isCollapsed) return null;
      const node = sel.anchorNode;
      if (node == null || node.nodeType != 3 || !this.area.contains(node)) return null;
      if (node.parentElement && node.parentElement.closest("a, code, pre")) return null;
      const m = node.nodeValue.slice(0, sel.anchorOffset).match(WIKI_OPEN);
      if (m == null) return null;
      return { node, start: sel.anchorOffset - m[0].length, end: sel.anchorOffset, query: m[1] };
    }
    checkWikiOpen() {
      if (this.composing) return;
      const at = this.wikiTrigger();
      if (at == null) {
        this.suggestDismissed = null;
        return this.closeSuggest();
      }
      const gone = this.suggestDismissed;
      if (gone && gone.node == at.node && gone.start == at.start) return this.closeSuggest();
      const q = at.query.trim();
      const same = this.suggestAt && this.suggestAt.query.trim() == q && this.suggestPop;
      this.suggestAt = at;
      if (this.suggestPop == null) {
        this.suggestPop = this.makePopup("ye-suggest");
        this.suggestList = document.createElement("div");
        this.suggestList.className = "ye-picklist";
        this.suggestList.setAttribute("role", "listbox");
        this.suggestPop.appendChild(this.suggestList);
        this.suggestList.addEventListener("mousedown", (e) => e.preventDefault());
        this.suggestList.addEventListener("click", (e) => {
          const b = e.target.closest(".ye-picklist__item");
          if (b && this.suggestItems) this.completeWiki(this.suggestItems[+b.dataset.index]);
        });
        this.suggestScroll = () => this.placeSuggest();
        window.addEventListener("scroll", this.suggestScroll, true);
        this.suggestItems = [];
        this.fillPicklist(this.suggestList, [], 0, this.t("Type an article title"));
        this.placeSuggest();
        this.revealPopup(this.suggestPop);
      } else {
        this.placeSuggest();
      }
      if (same) return;
      clearTimeout(this.suggestTimer);
      const n = this.suggestSeq = (this.suggestSeq || 0) + 1;
      if (q == "") {
        this.suggestItems = [];
        this.fillPicklist(this.suggestList, [], 0, this.t("Type an article title"));
        this.placeSuggest();
        return;
      }
      this.suggestTimer = setTimeout(() => {
        Promise.resolve(this.linkProvider.search(q)).then((res) => {
          if (n != this.suggestSeq || this.suggestPop == null) return;
          this.suggestItems = (Array.isArray(res) ? res : []).filter((r) => r && r.title).map((r) => ({ kind: "article", title: r.title, hint: r.hint || "" }));
          this.suggestIndex = 0;
          this.fillPicklist(this.suggestList, this.suggestItems, 0, this.t("Nothing found"));
          this.placeSuggest();
        }).catch(() => {
        });
      }, 200);
    }
    placeSuggest() {
      const pop = this.suggestPop;
      const at = this.suggestAt;
      if (pop == null || at == null || !at.node.isConnected) return;
      const r = document.createRange();
      r.setStart(at.node, at.start);
      r.setEnd(at.node, Math.min(at.start + 2, at.node.nodeValue.length));
      const rect = r.getBoundingClientRect();
      const pad = 8;
      const w = pop.offsetWidth;
      const h = pop.offsetHeight;
      let left = rect.left;
      let top = rect.bottom + 4;
      if (left + w > window.innerWidth - pad) left = window.innerWidth - w - pad;
      if (left < pad) left = pad;
      if (top + h > window.innerHeight - pad && rect.top - 4 - h >= pad) top = rect.top - 4 - h;
      pop.style.left = left + "px";
      pop.style.top = top + "px";
    }
    suggestKey(e) {
      if (this.suggestPop == null || e.isComposing) return;
      if (e.key == "Escape") {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (this.suggestAt) this.suggestDismissed = { node: this.suggestAt.node, start: this.suggestAt.start };
        this.closeSuggest();
        return;
      }
      const items = this.suggestItems || [];
      if (items.length == 0) return;
      if (e.key == "ArrowDown" || e.key == "ArrowUp") {
        e.preventDefault();
        this.suggestIndex = ((this.suggestIndex || 0) + (e.key == "ArrowDown" ? 1 : -1) + items.length) % items.length;
        this.fillPicklist(this.suggestList, items, this.suggestIndex, "");
      } else if (e.key == "Enter" || e.key == "Tab") {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.completeWiki(items[this.suggestIndex || 0]);
      }
    }
    completeWiki(item) {
      const at = this.suggestAt;
      this.closeSuggest();
      if (item == null || at == null || !at.node.isConnected) return;
      const text = this.linkText(item, "");
      if (text == null) return;
      const tail = at.node.nodeValue.slice(at.end).startsWith("]]") ? 2 : 0;
      const r = document.createRange();
      r.setStart(at.node, at.start);
      r.setEnd(at.node, at.end + tail);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
      this.flushHistory();
      exec("insertText", text);
      this.sync();
      this.recordState();
    }
    closeSuggest() {
      clearTimeout(this.suggestTimer);
      this.suggestSeq = (this.suggestSeq || 0) + 1;
      this.suggestItems = null;
      this.suggestAt = null;
      this.suggestIndex = 0;
      const pop = this.suggestPop;
      if (pop == null) return;
      this.suggestPop = null;
      this.suggestList = null;
      window.removeEventListener("scroll", this.suggestScroll, true);
      this.dismissPopup(pop);
    }
  };

  // source/mixins/slash.js
  var HEAD_ICONS = { h1: "format_h1", h2: "format_h2", h3: "format_h3", h4: "format_h4" };
  var SLASH_BLOCKS = /^(P|DIV|H[1-4])$/;
  function symbol(name) {
    return '<span class="material-symbols-rounded ye-ico">' + name + "</span>";
  }
  var withSlash = (Base) => class extends Base {
    wire() {
      super.wire();
      if (this.inline) return;
      this.addEventListener("keydown", (e) => {
        if (!this.area.contains(e.target)) return;
        if (this.slashKey(e) || this.moveKey(e)) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, true);
      this.area.addEventListener("beforeinput", (e) => this.mdBeforeInput(e));
      this.area.addEventListener("input", (e) => {
        this.inlineMarkdown(e);
        this.slashInput(e);
      });
      this.onSlashSel = () => this.slashTrack();
      this.onSlashDown = (e) => {
        const s = this.slash;
        if (s && !s.pop.contains(e.target) && !this.area.contains(e.target)) this.closeSlash();
      };
      this.onSlashScroll = (e) => {
        const s = this.slash;
        if (s && !(e.target instanceof Node && s.pop.contains(e.target))) this.placeSlash();
      };
    }
    slashItems() {
      const tokens = Array.isArray(this.options.toolbar) ? this.options.toolbar : DEFAULT_TOOLBAR;
      function has(token) {
        return tokens.indexOf(token) != -1;
      }
      const items = [];
      if (has("heading")) {
        this.headingLevels().forEach((tag, i) => {
          items.push({ label: HEADINGS[tag], words: tag + " heading title", hint: "#".repeat(i + 1), icon: this.iconOr("slash-" + tag, symbol(HEAD_ICONS[tag])), run: () => this.formatBlock(tag) });
        });
      }
      if (has("ul")) items.push({ label: "Bulleted list", words: "ul bullet list", hint: "-", icon: this.renderIcon("ul"), run: () => this.list("insertUnorderedList") });
      if (has("ol")) items.push({ label: "Numbered list", words: "ol numbered list", hint: "1.", icon: this.renderIcon("ol"), run: () => this.list("insertOrderedList") });
      if (has("blockquote")) items.push({ label: "Quote", words: "blockquote quote", hint: ">", icon: this.renderIcon("blockquote"), run: () => this.formatBlock("blockquote") });
      if (has("codeblock")) items.push({ label: "Code block", words: "pre code", hint: "```", icon: this.renderIcon("codeblock"), run: () => this.run("ye-codeblock") });
      if (has("table")) items.push({ label: "Table", words: "table grid", icon: this.renderIcon("table"), run: () => this.slashTable() });
      if (has("image") && (this.uploadEnabled || this.imageSources.length || this.imageUrl)) items.push({ label: "Insert image", words: "image picture photo upload", icon: this.renderIcon("image"), run: () => this.slashImage() });
      if (has("video")) items.push({ label: "Embed video", words: "video youtube vimeo embed", icon: this.renderIcon("video"), run: () => this.run("ye-video") });
      if (has("hr")) items.push({ label: "Horizontal rule", words: "hr divider line separator", hint: "---", icon: this.renderIcon("hr"), run: () => this.run("ye-hr") });
      return items;
    }
    // Typing goes on in the first cell, not in the line below the table
    slashTable() {
      this.insertTable(3, 3, true);
      const sel = window.getSelection();
      const line = sel.rangeCount ? this.closestBlock(sel.anchorNode) : null;
      const table = line && line.previousElementSibling;
      const cell = table && table.tagName == "TABLE" ? table.querySelector("th, td") : null;
      if (cell == null) return;
      const r = document.createRange();
      r.setStart(cell, 0);
      r.collapse(true);
      sel.removeAllRanges();
      sel.addRange(r);
    }
    // The first item of the toolbar image menu
    slashImage() {
      if (this.uploadEnabled) {
        this.saveRange();
        this.fileInput.click();
        return;
      }
      if (this.imageSources.length) {
        this.pickImage(0);
        return;
      }
      this.run("ye-image");
    }
    // The block the caret ends, with the text before it; the menu lives only at the end of a bare top-level line
    slashAt() {
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0 || !sel.isCollapsed) return null;
      const node = sel.anchorNode;
      if (node == null || !this.area.contains(node)) return null;
      let block = this.closestBlock(node);
      if (block == null && node.parentNode == this.area) block = this.area;
      if (block == null || block != this.area && (block.parentNode != this.area || !SLASH_BLOCKS.test(block.tagName))) return null;
      if (block.querySelector("img, iframe, hr, table, pre, ul, ol, blockquote")) return null;
      const r = document.createRange();
      r.selectNodeContents(block);
      r.setEnd(node, sel.anchorOffset);
      const text = r.toString();
      if (text != block.textContent) return null;
      return { block, text };
    }
    slashInput(e) {
      if (this.slash) {
        this.slashTrack();
        return;
      }
      if (this.toolbar == null || this.composing) return;
      if (e.inputType != "insertText" && e.inputType != "insertCompositionText") return;
      if ((e.data || "").slice(-1) != "/") return;
      const at = this.slashAt();
      if (at && at.text == "/") this.openSlash(at.block);
    }
    openSlash(block) {
      const items = this.slashItems();
      if (items.length == 0) return;
      const pop = this.makePopup("ye-slash");
      pop.setAttribute("role", "listbox");
      pop.setAttribute("aria-label", this.t("Insert"));
      pop.addEventListener("mousedown", (e) => e.preventDefault());
      pop.addEventListener("click", (e) => {
        const item = e.target.closest("[data-i]");
        if (item) this.pickSlash(+item.dataset.i);
      });
      pop.addEventListener("mousemove", (e) => {
        const item = e.target.closest("[data-i]");
        if (item && this.slash && +item.dataset.i != this.slash.index) this.slashActive(+item.dataset.i, false);
      });
      this.slash = { block, items, pop, query: "", index: 0, shown: [] };
      document.addEventListener("selectionchange", this.onSlashSel);
      document.addEventListener("mousedown", this.onSlashDown, true);
      document.addEventListener("touchstart", this.onSlashDown, { capture: true, passive: true });
      window.addEventListener("scroll", this.onSlashScroll, true);
      window.addEventListener("resize", this.onSlashScroll);
      this.renderSlash();
      this.revealPopup(pop);
      if (this.scrollbar) this.scrollbar(pop);
    }
    closeSlash() {
      const s = this.slash;
      if (s == null) return;
      this.slash = null;
      document.removeEventListener("selectionchange", this.onSlashSel);
      document.removeEventListener("mousedown", this.onSlashDown, true);
      document.removeEventListener("touchstart", this.onSlashDown, true);
      window.removeEventListener("scroll", this.onSlashScroll, true);
      window.removeEventListener("resize", this.onSlashScroll);
      this.dismissPopup(s.pop);
    }
    // Typing, deleting and moving the caret: the menu follows the text after the slash, or goes away
    slashTrack() {
      const s = this.slash;
      if (s == null || this.composing) return;
      const at = this.slashAt();
      if (at == null || at.block != s.block || at.text.charAt(0) != "/" || /\s/.test(at.text)) {
        this.closeSlash();
        return;
      }
      const query = at.text.slice(1);
      if (query != s.query) {
        s.query = query;
        s.index = 0;
        this.renderSlash();
      }
    }
    renderSlash() {
      const s = this.slash;
      const q = s.query.toLowerCase();
      s.shown = s.items.filter((it) => q == "" || it.label.toLowerCase().indexOf(q) != -1 || this.t(it.label).toLowerCase().indexOf(q) != -1 || it.words.indexOf(q) != -1);
      s.pop.classList.toggle("is-empty", s.shown.length == 0);
      s.pop.innerHTML = s.shown.map((it, i) => '<div class="ye-slash__item' + (i == s.index ? " is-active" : "") + '" role="option" aria-selected="' + (i == s.index) + '" data-i="' + i + '">' + it.icon + '<span class="ye-slash__label">' + escapeHtml(this.t(it.label)) + "</span>" + (it.hint ? '<span class="ye-slash__hint">' + escapeHtml(it.hint) + "</span>" : "") + "</div>").join("");
      this.placeSlash();
    }
    slashActive(index, scroll) {
      const s = this.slash;
      s.index = index;
      const els = s.pop.querySelectorAll("[data-i]");
      for (let i = 0; i < els.length; i++) {
        els[i].classList.toggle("is-active", i == index);
        els[i].setAttribute("aria-selected", String(i == index));
      }
      if (scroll && els[index]) els[index].scrollIntoView({ block: "nearest" });
    }
    placeSlash() {
      const s = this.slash;
      if (s == null) return;
      const sel = window.getSelection();
      let rect = sel && sel.rangeCount ? sel.getRangeAt(0).getBoundingClientRect() : null;
      if (rect == null || rect.height == 0 && rect.width == 0) rect = s.block.getBoundingClientRect();
      const pad = 8;
      const vv = window.visualViewport;
      const bottom = vv ? vv.offsetTop + vv.height : window.innerHeight;
      const pop = s.pop;
      pop.style.maxHeight = "";
      const w = pop.offsetWidth;
      const h = pop.offsetHeight;
      const below = bottom - rect.bottom - 4 - pad;
      const above = rect.top - 4 - pad;
      let top = rect.bottom + 4;
      if (h > below && above > below) {
        if (h > above) pop.style.maxHeight = above + "px";
        top = rect.top - 4 - Math.min(h, above);
      } else if (h > below) {
        pop.style.maxHeight = Math.max(below, 120) + "px";
      }
      let left = rect.left;
      if (left + w > window.innerWidth - pad) left = window.innerWidth - w - pad;
      if (left < pad) left = pad;
      pop.style.left = left + "px";
      pop.style.top = top + "px";
    }
    slashKey(e) {
      const s = this.slash;
      if (s == null || e.isComposing) return false;
      if (e.key == "Escape") {
        this.closeSlash();
        return true;
      }
      if (s.shown.length == 0 || e.ctrlKey || e.metaKey || e.altKey) return false;
      const n = s.shown.length;
      if (e.key == "ArrowDown") {
        this.slashActive((s.index + 1) % n, true);
        return true;
      }
      if (e.key == "ArrowUp") {
        this.slashActive((s.index + n - 1) % n, true);
        return true;
      }
      if ((e.key == "Enter" || e.key == "Tab") && !e.shiftKey) {
        this.pickSlash(s.index);
        return true;
      }
      return false;
    }
    pickSlash(index) {
      const s = this.slash;
      const item = s ? s.shown[index] : null;
      if (item == null) return;
      const block = s.block;
      this.closeSlash();
      this.area.focus({ preventScroll: true });
      this.flushHistory();
      let line = block;
      if (block == this.area) {
        this.area.innerHTML = "<p><br></p>";
        line = this.area.firstChild;
      } else {
        block.innerHTML = "<br>";
      }
      const r = document.createRange();
      r.setStart(line, 0);
      r.collapse(true);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
      item.run();
      const now = sel.rangeCount ? this.closestBlock(sel.anchorNode) : null;
      if (line.isConnected && line != now && line.textContent == "" && line.querySelector("img, iframe, hr, table") == null && line.nextElementSibling) line.remove();
      this.sync();
      this.updateStates();
      this.recordState();
    }
  };

  // source/mixins/yurbaui.js
  var withYurbaUI = (Base) => class extends Base {
    uiCtxItems(items) {
      return items.map((item) => item.separator ? { separator: true } : {
        icon: this.ctxIcon(item),
        label: this.t(item.label || ""),
        className: [item.danger ? "y-dropdown__item--danger" : "", item.className || ""].join(" ").trim(),
        children: Array.isArray(item.children) && item.children.length > 0 ? this.uiCtxItems(item.children) : null,
        onClick: () => this.runCtxItem(item)
      });
    }
    uiOps(ops, run) {
      return ops.map((op) => op[0] == "|" ? { separator: true } : op[0] == "size" ? {
        icon: this.renderIcon("size"),
        label: this.t(op[1]),
        children: IMG_SIZES.map((p) => ["size-" + p, p + "%"]).concat([["size-auto", "Original size"]]).map((size) => ({
          label: this.t(size[1]),
          onClick: () => run(size[0])
        }))
      } : {
        icon: this.renderIcon(op[0]),
        label: this.t(op[1]),
        className: DANGER_OPS.includes(op[0]) ? "y-dropdown__item--danger" : "",
        onClick: () => {
          this.restoreRange();
          run(op[0]);
        }
      });
    }
    openTextMenu(x, y) {
      this.closeTextMenu();
      this.saveRange();
      const menu = new YurbaUI.ContextMenu(this.uiCtxItems(this.contextMenuItems || []), {
        onOpen: (pop) => this.scrollbar(pop),
        onClose: () => {
          if (this.textMenu != menu) return;
          this.textMenu = null;
          this.textMenuEl = null;
        }
      });
      this.textMenu = menu;
      this.textMenuEl = menu.open(x, y, this.area);
    }
    closeTextMenu() {
      const menu = this.textMenu;
      this.textMenu = null;
      this.textMenuEl = null;
      if (menu) menu.close();
    }
    showCtx(x, y, kind) {
      this.hideTableCtx();
      this.saveRange();
      let items;
      if (kind == "link") items = this.uiOps(LINK_OPS, (op) => {
        this.linkOp(op);
        this.sync();
      });
      else if (kind == "img") items = this.uiOps(this.imageOps(), (op) => this.imageOp(op));
      else items = this.uiOps(TABLE_OPS, (op) => {
        this.area.focus();
        this.tableOp(op);
        this.sync();
      });
      const menu = new YurbaUI.ContextMenu(items, {
        onOpen: (pop) => this.scrollbar(pop),
        onClose: () => {
          if (this.ctxMenu != menu) return;
          this.ctxMenu = null;
          this.ctxPop = null;
        }
      });
      this.ctxMenu = menu;
      this.ctxAnchorPos = { x, y };
      this.ctxPop = menu.open(x, y, this.area);
    }
    hideTableCtx() {
      const menu = this.ctxMenu;
      this.ctxMenu = null;
      this.ctxPop = null;
      if (menu) menu.close();
    }
    promptPop(opts) {
      this.saveRange();
      this.formOpenTs = Date.now();
      this.nextFormAnchor = null;
      this.hideFormPop();
      const form = document.createElement("div");
      form.className = "ye-formpop";
      const first = this.fillForm(form, opts);
      if (first) first.setAttribute("autofocus", "");
      const modal = new YurbaUI.Modal({
        compact: true,
        components: [{ content: form, area: "body" }],
        onClose: () => {
          if (this.formModal != modal) return;
          this.formModal = null;
          this.formPop = null;
        }
      });
      this.formModal = modal;
      this.formPop = form;
      modal.show();
      if (first && first.select) setTimeout(() => first.select(), 60);
    }
    dismissFormPop() {
      const modal = this.formModal;
      this.formModal = null;
      if (modal) modal.hide();
    }
    openFindPop() {
      if (this.findPop) {
        this.findInput.focus();
        this.findInput.select();
        return;
      }
      const pop = document.createElement("div");
      pop.className = "ye-findpop";
      this.fillFindPop(pop);
      this.findInput.setAttribute("autofocus", "");
      const modal = new YurbaUI.Modal({
        compact: true,
        modeless: true,
        components: [
          { content: new YurbaUI.Title(this.t("Find & replace")), area: "header" },
          { content: pop, area: "body" }
        ],
        onClose: () => {
          if (this.findModal == modal) this.hideFindPop();
        }
      });
      this.findModal = modal;
      modal.show();
      setTimeout(() => {
        if (this.findInput) this.findInput.select();
      }, 60);
      this.runFind();
    }
    dismissFindPop() {
      const modal = this.findModal;
      this.findModal = null;
      if (modal) modal.hide();
    }
    // Before YurbaUI.Scrollbar a page keeps the native bars
    scrollbar(el) {
      if (el && YurbaUI.Scrollbar) YurbaUI.Scrollbar.attach(el);
    }
    toggleFull() {
      super.toggleFull();
      if (YurbaUI.Scrollbar) [this.area, this.sourceView].forEach((el) => {
        const bar = YurbaUI.Scrollbar.get(el);
        if (bar) bar.refresh();
      });
    }
    wire() {
      super.wire();
      this.scrollbar(this.area);
      this.scrollbar(this.sourceView);
      this.toolbarMenus = [];
      this.querySelectorAll("[data-ye-menu]").forEach((menu) => {
        const toggle = menu.querySelector("[data-ye-menu-toggle]");
        const pop = menu._pop;
        if (toggle == null || pop == null) return;
        const panel = pop.hasAttribute("data-ye-table-pop") || pop.querySelector(".ye-swatch") != null;
        const dropdown = panel ? new YurbaUI.Dropdown([], {
          trigger: toggle,
          content: pop,
          onOpen: (menuEl) => {
            if (pop.hasAttribute("data-ye-table-pop")) this.buildTablePop(pop);
            this.scrollbar(menuEl);
          }
        }) : new YurbaUI.Dropdown(() => Array.from(pop.querySelectorAll(".ye-menu__item")).map((button) => ({
          label: button.innerHTML,
          className: button.className.split(" ").filter((c) => c.startsWith("ye-menu__item--")).join(" "),
          onClick: () => this.toolbarItem(button)
        })), { trigger: toggle, onOpen: (menuEl) => this.scrollbar(menuEl) });
        dropdown.render();
        this.toolbarMenus.push(dropdown);
      });
    }
    toolbarItem(button) {
      if (button.hasAttribute("data-ye-source")) return this.pickImage(+button.dataset.yeSource);
      if (button.hasAttribute("data-ye-upload")) {
        this.saveRange();
        this.fileInput.click();
        return;
      }
      this.restoreRange();
      this.area.focus();
      this.run(button.dataset.cmd, button.dataset.arg);
      this.sync();
      this.updateStates();
      this.recordState();
    }
    closeMenus() {
      (this.toolbarMenus || []).forEach((dropdown) => dropdown.close());
      super.closeMenus();
    }
  };

  // source/index.js
  function mix(Base, ...mixins2) {
    return mixins2.reduce((B, m) => m(B), Base);
  }
  var mixins = [withPopup, withToolbar, withHistory, withSelection, withCommands, withPrompt, withFind, withMedia, withTables, withMenus, withContext, withView, withShortcuts, withWiring, withTabKey, withTableBar, withLinks, withSlash];
  if (true) mixins.push(withYurbaUI);
  var YurbaEditor = class extends mix(HTMLElement, ...mixins) {
    static create(config = {}) {
      const el = document.createElement("yurba-editor");
      el.initConfig = config;
      const field = config.field ? typeof config.field == "string" ? document.querySelector(config.field) : config.field : null;
      if (field) field.after(el);
      else if (config.mount) {
        const mount = typeof config.mount == "string" ? document.querySelector(config.mount) : config.mount;
        if (mount) mount.appendChild(el);
      }
      el.setup();
      return el;
    }
    static sanitize(html, opts) {
      opts = opts || {};
      return cleanHtml(html, opts.embedHosts || EMBED_HOSTS, opts.strict !== false, { allowData: opts.allowData === true, allowClasses: opts.allowClasses === true });
    }
    connectedCallback() {
      if (this.yeDestroyed) return;
      this.setup();
      this.listenGlobal(true);
    }
    // A host may drop the editor without destroy()
    disconnectedCallback() {
      if (!this.yeReady || this.yeDestroyed) return;
      this.listenGlobal(false);
      this.hideTableCtx();
      this.closeTextMenu();
      this.hideFormPop();
      this.hideFindPop();
      this.deselectImage();
      this.closeMenus();
      this.closeSlash();
      if (this.imgHandle) {
        this.imgHandle.remove();
        this.imgHandle = null;
      }
      if (this.imgGuide) {
        this.imgGuide.remove();
        this.imgGuide = null;
      }
      if (this.imgBar) {
        this.imgBar.remove();
        this.imgBar = null;
      }
      if (this.imgBadge) {
        this.imgBadge.remove();
        this.imgBadge = null;
      }
      if (this.clearLongPress) this.clearLongPress();
      if (this.root.classList.contains("ye--full")) this.toggleFull();
    }
    setup() {
      if (this.yeReady) return;
      this.yeReady = true;
      const options = this.initConfig || {};
      this.options = options;
      this.labels = options.labels || {};
      this.icons = options.icons || {};
      this.embedHosts = options.embedHosts || EMBED_HOSTS;
      this.uploadUrl = options.uploadUrl || null;
      this.onImageUpload = typeof options.onImageUpload == "function" ? options.onImageUpload : null;
      this.onFiles = typeof options.onFiles == "function" ? options.onFiles : null;
      this.uploadField = options.uploadField || "file";
      this.uploadHeaders = options.uploadHeaders || {};
      this.maxImageKb = options.maxImageKb || 0;
      this.maxChars = options.maxChars || 0;
      this.uploadEnabled = !!(this.uploadUrl || this.onImageUpload);
      this.imageSources = Array.isArray(options.imageSources) ? options.imageSources.filter((s) => s && typeof s.pick == "function" && s.label) : [];
      this.imageUrl = options.imageUrl !== false;
      this.imageAllowed = typeof options.imageAllowed == "function" ? options.imageAllowed : null;
      this.imageAlt = options.imageAlt !== false;
      this.inline = options.inline === true || options.blocks === false;
      this.allowData = options.allowData === true;
      this.allowClasses = options.allowClasses === true;
      this.strict = options.strict === true;
      this.glyphClass = options.glyphClass || null;
      this.contextMenuEnabled = options.contextMenu !== false;
      this.contextMenuItems = Array.isArray(options.contextMenu) ? options.contextMenu : DEFAULT_CONTEXT_MENU;
      this.listeners = {};
      this.history = [];
      this.histIndex = -1;
      this.histTimer = null;
      this.restoring = false;
      this.HIST_MAX = 200;
      const field = options.field ? typeof options.field == "string" ? document.querySelector(options.field) : options.field : null;
      this.input = field;
      const initial = options.value != null ? options.value : field ? field.value : this.innerHTML;
      const showToolbar = options.toolbar !== false;
      this.showToolbar = showToolbar;
      const showFooter = options.footer !== false;
      const toolbar = Array.isArray(options.toolbar) ? options.toolbar : DEFAULT_TOOLBAR;
      this.classList.add("ye");
      if (this.inline) this.classList.add("ye--inline");
      if (!showToolbar) this.classList.add("ye--no-toolbar");
      if (!showFooter) this.classList.add("ye--no-foot");
      this.innerHTML = (showToolbar ? this.buildToolbar(toolbar) : "") + '<div class="ye-body"><div class="ye-area" contenteditable="true" role="textbox" aria-multiline="true"></div><textarea class="ye-source-view" spellcheck="false" hidden></textarea></div>' + (showFooter ? '<div class="ye-foot"><a class="ye-brand" href="https://dev.yurba.one" target="_blank" rel="noopener noreferrer">YurbaEditor</a><span class="ye-count" data-ye-count></span></div>' : "") + (this.uploadEnabled ? '<input type="file" class="ye-file-input" accept="image/*" multiple hidden>' : "");
      if (field) field.style.display = "none";
      this.root = this;
      this.toolbar = this.querySelector(".ye-toolbar");
      this.area = this.querySelector(".ye-area");
      this.sourceView = this.querySelector(".ye-source-view");
      this.fileInput = this.querySelector(".ye-file-input");
      this.menuPops = [];
      this.querySelectorAll("[data-ye-menu]").forEach((menu) => {
        const pop = menu.querySelector(".ye-menu__pop");
        if (pop) {
          menu._pop = pop;
          this.menuPops.push(pop);
        }
      });
      this.area.style.minHeight = (options.minHeight || 160) + "px";
      if (options.height) this.area.style.maxHeight = options.height + "px";
      this.area.dataset.placeholder = options.placeholder || this.t("Start writing\u2026");
      this.area.setAttribute("aria-label", options.label || this.area.dataset.placeholder);
      try {
        exec("styleWithCSS", "false");
        exec("defaultParagraphSeparator", "p");
      } catch (e) {
      }
      this.area.innerHTML = this.clean(initial);
      this.wire();
      this.sync();
      this.updateStates();
      this.recordState();
    }
    t(text) {
      return this.labels && this.labels[text] || text;
    }
    clean(html, strict, opts) {
      const cleaned = cleanHtml(html, this.embedHosts, strict || this.strict, { allowData: this.allowData, allowClasses: this.allowClasses, glyphClass: this.glyphClass, ...opts });
      return this.inline ? flattenInline(cleaned, this.glyphClass) : cleaned;
    }
    isGlyph(img) {
      return !!this.glyphClass && img.classList.contains(this.glyphClass);
    }
    getHTML() {
      let clone;
      if (this.root.classList.contains("ye--source")) {
        clone = document.implementation.createHTMLDocument("").createElement("div");
        clone.innerHTML = this.sourceView.value;
      } else {
        clone = this.area.cloneNode(true);
      }
      const sel = clone.querySelectorAll(".ye-img--sel");
      for (let i = 0; i < sel.length; i++) {
        sel[i].classList.remove("ye-img--sel");
        if (sel[i].classList.length == 0) sel[i].removeAttribute("class");
      }
      let html = this.clean(clone.innerHTML);
      if (clone.textContent.trim() == "" && clone.querySelector("img, iframe, hr, table") == null) html = "";
      return html;
    }
    setHTML(html) {
      this.deselectImage();
      this.flushHistory();
      const loading = this.histIndex <= 0;
      this.area.innerHTML = this.clean(html);
      if (this.root.classList.contains("ye--source")) {
        this.sourceView.value = this.area.innerHTML;
        this.sourceView.dispatchEvent(new Event("input"));
      }
      this.sync();
      if (loading) {
        this.history = [];
        this.histIndex = -1;
      }
      this.recordState();
      this.updateStates();
      return this;
    }
    getText() {
      return this.area.textContent;
    }
    focus() {
      this.area.focus();
      return this;
    }
    on(event, callback) {
      (this.listeners[event] = this.listeners[event] || []).push(callback);
      return this;
    }
    emit(event, payload) {
      (this.listeners[event] || []).forEach((cb) => cb(payload));
      this.dispatchEvent(new CustomEvent("yurba-editor." + event, { detail: payload }));
    }
    destroy() {
      if (!this.yeReady) {
        this.yeDestroyed = true;
        this.remove();
        return;
      }
      if (this.histTimer) {
        clearTimeout(this.histTimer);
        this.histTimer = null;
      }
      if (this.clearLongPress) this.clearLongPress();
      this.hideTableCtx();
      this.closeTextMenu();
      this.hideFormPop();
      this.hideFindPop();
      this.closeMenus();
      this.closeSlash();
      if (this.root.classList.contains("ye--full")) this.toggleFull();
      this.listenGlobal(false);
      this.yeDestroyed = true;
      if (this.imgHandle) this.imgHandle.remove();
      if (this.imgGuide) this.imgGuide.remove();
      if (this.imgBar) this.imgBar.remove();
      if (this.imgBadge) this.imgBadge.remove();
      (this.menuPops || []).forEach((p) => p.remove());
      this.root.remove();
      if (this.input) this.input.style.display = "";
    }
    sync() {
      if (this.root.classList.contains("ye--source")) return;
      if (this.selectedImg && !this.area.contains(this.selectedImg)) this.deselectImage();
      const html = this.getHTML();
      this.area.classList.toggle("is-empty", html == "");
      if (this.input) this.input.value = html;
      if (typeof this.options.onChange == "function") this.options.onChange(html);
      this.emit("change", html);
      const count = this.getCount();
      if (!this.composing) this.charLen = count.chars;
      this.updateCount(count);
      if (this.lastCount == null || this.lastCount.words != count.words || this.lastCount.chars != count.chars) {
        this.lastCount = count;
        if (typeof this.options.onCount == "function") this.options.onCount(count);
        this.emit("count", count);
      }
      if (this.findPop) this.refreshFind();
      if (!this.restoring) this.scheduleRecord();
    }
    getCount() {
      const parts = [];
      const walker = document.createTreeWalker(this.area, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null);
      let n;
      while (n = walker.nextNode()) {
        if (n.nodeType == 3) parts.push(n.nodeValue);
        else if (n.tagName == "BR" || n.matches(BLOCK_SEL)) parts.push(" ");
      }
      const text = parts.join("").replace(/\s+/g, " ").trim();
      return { words: text == "" ? 0 : text.split(" ").length, chars: this.countChars() };
    }
    charNodes() {
      const out = [];
      const walker = document.createTreeWalker(this.area, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null);
      let n;
      while (n = walker.nextNode()) if (n.nodeType == 3 || n.tagName == "IMG" && this.isGlyph(n)) out.push(n);
      return out;
    }
    countChars() {
      let total = 0;
      this.charNodes().forEach((n) => {
        total += cpLen(n.nodeType == 3 ? n.nodeValue : n.getAttribute("alt"));
      });
      return total;
    }
    roomLeft() {
      if (!this.maxChars) return Infinity;
      const sel = window.getSelection();
      const selLen = sel && sel.rangeCount && this.area.contains(sel.anchorNode) ? cpLen(sel.toString()) : 0;
      return this.maxChars - (this.countChars() - selLen);
    }
    insertClipboard(html, text) {
      this.flushHistory();
      if (this.linkPastedUrl(html, text)) {
        this.recordState();
        return;
      }
      const room = this.roomLeft();
      if (room <= 0) return;
      let clean = html ? this.clean(normalizePaste(html), true, { stripStyle: !this.showToolbar }) : "";
      if (text && clean.replace(/<br\s*\/?>/gi, "").trim() == "") clean = "";
      if (clean) {
        exec("insertHTML", room == Infinity ? clean : clipHtml(clean, room, this.glyphClass));
      } else if (text) {
        exec("insertText", room == Infinity ? text : text.slice(0, cpForward(text, 0, room)));
      }
      this.enforceLimit();
      this.sync();
      this.recordState();
    }
    // An address pasted over selected words links them, as in docs apps, instead of replacing them
    linkPastedUrl(html, text) {
      if (this.inline || !this.offers("ye-link", "link")) return false;
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0 || sel.isCollapsed || !this.area.contains(sel.getRangeAt(0).commonAncestorContainer)) return false;
      if (sel.toString().trim() == "") return false;
      const url = pastedUrl(html, text);
      if (url == null) return false;
      exec("createLink", url);
      this.sync();
      this.updateStates();
      return true;
    }
    updateCount(counted) {
      const count = this.root.querySelector("[data-ye-count]");
      if (count == null) return;
      const { words, chars } = counted || this.getCount();
      if (this.maxChars) {
        count.textContent = words + " " + this.t("words") + " \xB7 " + chars + " / " + this.maxChars + " " + this.t("chars");
        count.classList.toggle("is-limit", chars >= this.maxChars);
        count.classList.toggle("is-near", chars >= this.maxChars * 0.9 && chars < this.maxChars);
      } else {
        count.textContent = words + " " + this.t("words") + " \xB7 " + chars + " " + this.t("chars");
      }
    }
    enforceLimit(fromEnd) {
      if (!this.maxChars || this.composing) return;
      let over = this.countChars() - Math.max(this.maxChars, this.charLen || 0);
      if (over <= 0) return;
      const sel = window.getSelection();
      const caret = !fromEnd && sel && sel.rangeCount && this.area.contains(sel.getRangeAt(0).endContainer) ? sel.getRangeAt(0) : null;
      let nodes = this.charNodes();
      if (caret) {
        const before = document.createRange();
        before.setStart(this.area, 0);
        before.setEnd(caret.endContainer, caret.endOffset);
        nodes = nodes.filter((n) => n == caret.endContainer || before.intersectsNode(n));
      }
      for (let i = nodes.length - 1; i >= 0 && over > 0; i--) {
        const n = nodes[i];
        if (n.nodeType == 1) {
          over -= cpLen(n.getAttribute("alt"));
          n.remove();
          continue;
        }
        const end = caret && n == caret.endContainer ? caret.endOffset : n.nodeValue.length;
        const start = cpBack(n.nodeValue, end, over);
        over -= cpLen(n.nodeValue.slice(start, end));
        n.deleteData(start, end - start);
      }
    }
  };
  __publicField(YurbaEditor, "DEFAULT_TOOLBAR", DEFAULT_TOOLBAR);
  __publicField(YurbaEditor, "DEFAULT_CONTEXT_MENU", DEFAULT_CONTEXT_MENU);
  __publicField(YurbaEditor, "EMBED_HOSTS", EMBED_HOSTS);
  customElements.define("yurba-editor", YurbaEditor);
  return __toCommonJS(index_exports);
})();
window.YurbaEditor=__yurbaeditor__.YurbaEditor;
