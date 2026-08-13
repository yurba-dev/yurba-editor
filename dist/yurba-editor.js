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
  var DROP = { SCRIPT: 1, STYLE: 1, OBJECT: 1, EMBED: 1, NOSCRIPT: 1, TEMPLATE: 1, LINK: 1, META: 1, HEAD: 1, TITLE: 1, BASE: 1, FORM: 1, INPUT: 1, BUTTON: 1, TEXTAREA: 1, SELECT: 1, OPTION: 1, SVG: 1, MATH: 1 };
  var ALLOWED = { P: 1, DIV: 1, BR: 1, HR: 1, STRONG: 1, B: 1, EM: 1, I: 1, U: 1, S: 1, SUB: 1, SUP: 1, A: 1, SPAN: 1, UL: 1, OL: 1, LI: 1, BLOCKQUOTE: 1, H1: 1, H2: 1, H3: 1, H4: 1, CODE: 1, PRE: 1, IMG: 1, IFRAME: 1, TABLE: 1, THEAD: 1, TBODY: 1, TR: 1, TH: 1, TD: 1 };
  var ATTRS = { a: ["href", "title", "target"], img: ["src", "alt", "title", "width", "height"], iframe: ["src", "width", "height", "allow", "allowfullscreen", "frameborder", "title"], td: ["colspan", "rowspan"], th: ["colspan", "rowspan"] };
  var STYLE_PROPS = { p: ["text-align", "margin-left"], div: ["text-align", "margin-left"], h1: ["text-align"], h2: ["text-align"], h3: ["text-align"], h4: ["text-align"], li: ["text-align"], blockquote: ["text-align", "margin-left"], td: ["text-align"], th: ["text-align"], span: ["color", "background-color"], img: ["width", "height", "float"], table: ["width"] };
  var CLASS_ALLOWED = ["ye-table--no-grid"];
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
    "align-left": "format_align_left",
    "align-center": "format_align_center",
    "align-right": "format_align_right",
    "align-none": "format_align_justify",
    alt: "title",
    "img-del": "delete_forever",
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
  var DEFAULT_CONTEXT_MENU = [
    { action: "selectAll", icon: "select_all", label: "Select all" },
    { action: "copy", icon: "content_copy", label: "Copy" },
    { action: "paste", icon: "content_paste", label: "Paste" },
    { action: "clear", icon: "delete_sweep", label: "Clear" },
    { separator: true },
    {
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
    if (prop == "width" || prop == "height") return /^\d{1,4}(px|%)?$/.test(value);
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
      if (name == "srcdoc") {
        el.removeAttribute(attrs[i].name);
        continue;
      }
      if (["href", "src", "xlink:href", "action", "formaction"].indexOf(name) != -1 && !isSafeUrl(value)) {
        el.removeAttribute(attrs[i].name);
        continue;
      }
      if (name.indexOf("data-") == 0) {
        if (!opts.allowData) el.removeAttribute(attrs[i].name);
        continue;
      }
      if (name == "class") {
        if (opts.allowClasses) continue;
        const kept = value.split(/\s+/).filter((c) => CLASS_ALLOWED.indexOf(c) != -1);
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
      } else if (name == "style" && /expression\(|javascript:|-moz-binding|@import|behaviou?r\s*:/i.test(value)) {
        el.removeAttribute("style");
      }
    }
    if (tag == "img" && !isSafeUrl(el.getAttribute("src") || "")) return false;
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
      if (DROP[node.tagName] == 1) {
        parent.removeChild(node);
        continue;
      }
      cleanChildren(node, hosts, strict, opts);
      if (strict && ALLOWED[node.tagName] != 1) {
        while (node.firstChild) parent.insertBefore(node.firstChild, node);
        parent.removeChild(node);
      } else if (!cleanAttrs(node, hosts, strict, opts)) {
        parent.removeChild(node);
      }
    }
  }
  function cleanHtml(html, hosts, strict, opts) {
    const tpl = document.createElement("template");
    tpl.innerHTML = html || "";
    cleanChildren(tpl.content, hosts, strict, opts);
    const holder = document.createElement("div");
    holder.appendChild(tpl.content.cloneNode(true));
    return holder.innerHTML;
  }
  var UNWRAP = { P: 1, DIV: 1, H1: 1, H2: 1, H3: 1, H4: 1, BLOCKQUOTE: 1, PRE: 1, UL: 1, OL: 1, LI: 1, TABLE: 1, THEAD: 1, TBODY: 1, TR: 1, TH: 1, TD: 1, HR: 1 };
  function flattenNode(parent) {
    const nodes = Array.prototype.slice.call(parent.childNodes);
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.nodeType != 1) continue;
      flattenNode(node);
      if (UNWRAP[node.tagName] == 1) {
        const hasNext = node.nextSibling != null;
        while (node.firstChild) parent.insertBefore(node.firstChild, node);
        if (hasNext) parent.insertBefore(document.createElement("br"), node);
        parent.removeChild(node);
      }
    }
  }
  function flattenInline(html) {
    const tpl = document.createElement("template");
    tpl.innerHTML = html || "";
    flattenNode(tpl.content);
    const holder = document.createElement("div");
    holder.appendChild(tpl.content.cloneNode(true));
    return holder.innerHTML.replace(/(<br\s*\/?>\s*)+$/i, "");
  }

  // source/helpers/utils.js
  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
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
  function dtHasFiles(dt) {
    return dt && dt.types && Array.prototype.indexOf.call(dt.types, "Files") != -1;
  }

  // source/mixins/popup.js
  var withPopup = (Base) => class extends Base {
    makePopup(extra) {
      const el = document.createElement("div");
      el.className = "y-context-menu is-hidden" + (extra ? " " + extra : "");
      document.body.appendChild(el);
      return el;
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
  var withContext = (Base) => class extends Base {
    openTextMenu(x, y) {
      this.closeTextMenu();
      this.saveRange();
      const menu = this.makePopup();
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
          container.appendChild(sep);
          return;
        }
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "y-dropdown__item" + (hasChildren ? " y-dropdown__item--has-children" : "");
        if (item.danger) btn.classList.add("y-dropdown__item--danger");
        if (item.className) btn.classList.add(...item.className.split(" ").filter(Boolean));
        btn.innerHTML = (item.icon ? '<span class="y-dropdown__item-icon"><span class="material-symbols-rounded">' + item.icon + "</span></span>" : "") + '<span class="y-dropdown__item-label">' + (item.label || "") + "</span>" + (hasChildren ? '<span class="y-dropdown__item-arrow">\u203A</span>' : "");
        if (hasChildren) {
          const wrapper = document.createElement("div");
          wrapper.className = "y-dropdown__item-wrapper";
          const submenu = document.createElement("div");
          submenu.className = "y-dropdown__menu y-dropdown__submenu is-hidden";
          this.buildCtxItems(item.children, submenu);
          let hideTimer = null;
          const show = () => {
            clearTimeout(hideTimer);
            this.positionSubmenu(btn, submenu);
            submenu.classList.remove("is-hidden");
          };
          const hide = () => {
            hideTimer = setTimeout(() => submenu.classList.add("is-hidden"), 80);
          };
          btn.addEventListener("mouseenter", show);
          btn.addEventListener("mouseleave", hide);
          submenu.addEventListener("mouseenter", () => clearTimeout(hideTimer));
          submenu.addEventListener("mouseleave", hide);
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
    positionSubmenu(btn, sub) {
      sub.style.top = "";
      sub.style.bottom = "";
      sub.style.left = "";
      sub.style.right = "";
      const pad = 8;
      const t = btn.getBoundingClientRect();
      const m = sub.getBoundingClientRect();
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
        const text = (this.savedRange ? this.savedRange.toString() : "") || this.area.textContent;
        if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {
        });
        return;
      }
      if (action == "paste") {
        if (navigator.clipboard && navigator.clipboard.readText) {
          navigator.clipboard.readText().then((text) => {
            exec("insertText", text);
            this.enforceLimit();
            this.sync();
          }).catch(() => {
          });
        }
        return;
      }
      if (action == "clear") {
        this.setHTML("");
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
    renderIcon(key) {
      if (this.icons && this.icons[key] != null) return this.icons[key];
      return '<span class="material-symbols-rounded ye-ico">' + (ICONS[key] || "") + "</span>";
    }
    buildToolbar(tokens) {
      let html = '<div class="ye-toolbar">';
      tokens.forEach((token) => {
        if (token == "|") {
          html += '<span class="ye-toolbar__sep" aria-hidden="true"></span>';
        } else if (token == "image" && this.uploadEnabled) {
          html += '<div class="ye-menu" data-ye-menu><button type="button" class="ye-toolbar__btn" data-ye-menu-toggle title="Insert image" aria-label="Insert image">' + this.renderIcon("image") + '</button><div class="ye-menu__pop"><button type="button" class="ye-menu__item" data-ye-upload>Upload image\u2026</button><button type="button" class="ye-menu__item" data-cmd="ye-image">By URL\u2026</button></div></div>';
        } else if (token == "heading") {
          html += '<div class="ye-menu" data-ye-menu><button type="button" class="ye-toolbar__btn ye-toolbar__btn--wide" data-ye-menu-toggle title="Paragraph style"><span data-ye-heading-label>Paragraph</span><span class="ye-caret" aria-hidden="true">\u25BE</span></button><div class="ye-menu__pop">';
          Object.keys(HEADINGS).forEach((tag) => {
            html += '<button type="button" class="ye-menu__item ye-menu__item--' + tag + '" data-cmd="formatBlock" data-arg="' + tag + '">' + HEADINGS[tag] + "</button>";
          });
          html += "</div></div>";
        } else if (token == "forecolor" || token == "backcolor") {
          const isFore = token == "forecolor";
          const colors = isFore ? TEXT_COLORS : MARK_COLORS;
          const cmd = isFore ? "ye-forecolor" : "ye-backcolor";
          html += '<div class="ye-menu" data-ye-menu><button type="button" class="ye-toolbar__btn ye-toolbar__btn--' + (isFore ? "fore" : "back") + '" data-ye-menu-toggle title="' + (isFore ? "Text color" : "Highlight") + '">A</button><div class="ye-menu__pop ye-menu__pop--colors">';
          colors.forEach((c) => {
            html += '<button type="button" class="ye-swatch" style="background: ' + c + '" data-cmd="' + cmd + '" data-arg="' + c + '" title="' + c + '"></button>';
          });
          html += '<button type="button" class="ye-swatch ye-swatch--none" data-cmd="' + cmd + '" data-arg="" title="Remove">\u2715</button>';
          html += '<div class="ye-color-custom" data-ye-color="' + cmd + '"><input type="color" class="ye-color-native" value="#000000" title="Custom color"><input type="text" class="ye-color-hex" placeholder="#RRGGBB" maxlength="9" spellcheck="false"></div>';
          html += "</div></div>";
        } else if (token == "table") {
          html += '<div class="ye-menu" data-ye-menu><button type="button" class="ye-toolbar__btn" data-ye-menu-toggle title="Table">' + this.renderIcon("table") + '</button><div class="ye-menu__pop ye-menu__pop--table" data-ye-table-pop></div></div>';
        } else if (DEFS[token]) {
          const d = DEFS[token];
          const tip = d.title + (SHORTCUTS[token] ? " (" + SHORTCUTS[token] + ")" : "");
          html += '<button type="button" class="ye-toolbar__btn' + (d.mod ? " ye-toolbar__btn--" + d.mod : "") + '" data-cmd="' + d.cmd + '"' + (d.arg != null ? ' data-arg="' + d.arg + '"' : "") + ' title="' + tip + '" aria-label="' + d.title + '">' + this.renderIcon(token) + "</button>";
        }
      });
      return html + "</div>";
    }
  };

  // source/mixins/history.js
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
      const stale = this.area.querySelectorAll(".ye-img--sel");
      for (let i = 0; i < stale.length; i++) stale[i].classList.remove("ye-img--sel");
      this.setCaret(state.caret);
      this.sync();
      this.updateStates();
      this.updateHistoryButtons();
      this.restoring = false;
    }
    updateHistoryButtons() {
      const set = (cmd, disabled) => {
        const b = this.root.querySelector('.ye-toolbar__btn[data-cmd="' + cmd + '"]');
        if (b) {
          b.disabled = disabled;
          b.classList.toggle("is-disabled", disabled);
        }
      };
      set("undo", this.histIndex <= 0);
      set("redo", this.histIndex >= this.history.length - 1);
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
      return { start, end: start + range.toString().length };
    }
    setCaret(pos) {
      if (pos == null) return;
      const walker = document.createTreeWalker(this.area, NodeFilter.SHOW_TEXT, null);
      let chars = 0, sN = null, sO = 0, eN = null, eO = 0, n;
      while (n = walker.nextNode()) {
        const len = n.nodeValue.length;
        if (sN == null && pos.start <= chars + len) {
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
      const out = [];
      const all = this.area.querySelectorAll(BLOCK_SEL);
      for (let i = 0; i < all.length; i++) {
        if (range.intersectsNode(all[i])) out.push(all[i]);
      }
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
      if (this.savedRange == null) return;
      this.area.focus();
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(this.savedRange);
    }
    currentCell() {
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0) return null;
      let node = sel.getRangeAt(0).startContainer;
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
      if (cmd == "ye-link") return this.insertLink();
      if (cmd == "ye-image") return this.insertImage();
      if (cmd == "ye-video") return this.insertVideo();
      if (cmd == "ye-hr") return exec("insertHTML", "<hr><p><br></p>");
      if (cmd == "ye-code") return this.toggleInline("code");
      if (cmd == "ye-codeblock") return this.formatBlock("pre");
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
    setAlign(value) {
      this.selectionBlocks().forEach((b) => {
        b.style.textAlign = value;
      });
    }
    step(delta) {
      this.selectionBlocks().forEach((b) => {
        const cur = parseInt(b.style.marginLeft, 10) || 0;
        const next = Math.max(0, cur + delta);
        b.style.marginLeft = next ? next + "px" : "";
      });
    }
    toggleInline(tag) {
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0) return;
      const range = sel.getRangeAt(0);
      if (range.collapsed) return;
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
      const els = [scope].concat(Array.prototype.slice.call(scope.querySelectorAll("*")));
      els.forEach((el) => {
        if (el == this.area) return;
        if (range.intersectsNode && !range.intersectsNode(el)) return;
        el.removeAttribute("class");
        el.removeAttribute("style");
        const keep = ATTRS[el.tagName.toLowerCase()] || [];
        Array.prototype.slice.call(el.attributes).forEach((a) => {
          if (keep.indexOf(a.name.toLowerCase()) == -1) el.removeAttribute(a.name);
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
      }
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
      cancel.textContent = "Cancel";
      const ok = document.createElement("button");
      ok.type = "button";
      ok.className = "ye-formpop__btn ye-formpop__btn--ok";
      ok.textContent = "OK";
      row.appendChild(cancel);
      row.appendChild(ok);
      pop.appendChild(row);
      const textInputs = inputs.filter((i) => i.type != "checkbox");
      const submit = () => {
        const vals = inputs.map((i) => i.type == "checkbox" ? i.checked : i.value.trim());
        this.restoreRange();
        this.area.focus();
        const msg = opts.onSubmit(vals);
        if (msg) {
          err.textContent = msg;
          err.classList.add("is-shown");
          (textInputs[0] || inputs[0]).focus();
        } else this.hideFormPop();
      };
      ok.addEventListener("mousedown", (e) => {
        e.preventDefault();
        submit();
      });
      cancel.addEventListener("mousedown", (e) => {
        e.preventDefault();
        this.hideFormPop();
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
      if (this.nextFormAnchor) {
        this.placePopupAt(pop, this.nextFormAnchor.x, this.nextFormAnchor.y);
        this.nextFormAnchor = null;
      } else {
        this.placePopupBelow(pop, (this.toolbar || this.area).getBoundingClientRect(), "left");
      }
      if (fresh) this.revealPopup(pop);
      const first = textInputs[0] || inputs[0];
      if (first) {
        try {
          first.focus({ preventScroll: true });
        } catch (e) {
          first.focus();
        }
        if (first.select) first.select();
      }
    }
    hideFormPop() {
      if (this.formPop == null) return;
      const pop = this.formPop;
      this.formPop = null;
      this.dismissPopup(pop);
    }
  };

  // source/mixins/find.js
  var withFind = (Base) => class extends Base {
    openFindPop() {
      if (this.findPop) {
        this.findInput.focus();
        this.findInput.select();
        return;
      }
      const pop = this.makePopup("ye-findpop");
      pop.innerHTML = '<div class="ye-findpop__row"><input type="text" class="ye-formpop__input ye-findpop__q" placeholder="Find" spellcheck="false"><span class="ye-findpop__count"></span><button type="button" class="ye-findpop__btn" data-ye-find="prev" title="Previous">' + this.renderIcon("find-prev") + '</button><button type="button" class="ye-findpop__btn" data-ye-find="next" title="Next">' + this.renderIcon("find-next") + '</button><button type="button" class="ye-findpop__btn" data-ye-find="close" title="Close">\u2715</button></div><div class="ye-findpop__row"><input type="text" class="ye-formpop__input ye-findpop__r" placeholder="Replace with" spellcheck="false"><button type="button" class="ye-formpop__btn" data-ye-find="one">Replace</button><button type="button" class="ye-formpop__btn" data-ye-find="all">All</button></div><label class="ye-formpop__check"><input type="checkbox" class="ye-findpop__case"> Match case</label>';
      this.findPop = pop;
      this.findInput = pop.querySelector(".ye-findpop__q");
      this.replaceInput = pop.querySelector(".ye-findpop__r");
      this.findCount = pop.querySelector(".ye-findpop__count");
      this.findCase = pop.querySelector(".ye-findpop__case");
      pop.addEventListener("mousedown", (e) => {
        const b = e.target.closest("[data-ye-find]");
        if (b == null) return;
        e.preventDefault();
        const op = b.dataset.yeFind;
        if (op == "prev") this.findNav(-1);
        else if (op == "next") this.findNav(1);
        else if (op == "one") this.replaceCurrent();
        else if (op == "all") this.replaceAll();
        else if (op == "close") this.hideFindPop();
      });
      this.findInput.addEventListener("input", () => this.runFind());
      this.findCase.addEventListener("change", () => this.runFind());
      const histKey = (e) => {
        const k = e.key.toLowerCase();
        if (!(e.ctrlKey || e.metaKey) || k != "z" && k != "y") return false;
        e.preventDefault();
        if (k == "y" || e.shiftKey) this.redo();
        else this.undo();
        e.currentTarget.focus();
        return true;
      };
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
      this.placePopupBelow(pop, (this.toolbar || this.area).getBoundingClientRect(), "right");
      this.revealPopup(pop);
      this.findInput.focus();
      this.findInput.select();
      this.runFind();
    }
    hideFindPop() {
      if (this.findPop == null) return;
      const pop = this.findPop;
      this.findPop = null;
      this.findState = null;
      this.clearFindHighlights();
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
      if (this.findCount) this.findCount.textContent = matches.length ? index + 1 + " / " + matches.length : q ? "No matches" : "";
      this.highlightMatches();
    }
    findMatches(q, cs) {
      const out = [];
      const needle = cs ? q : q.toLowerCase();
      const walker = document.createTreeWalker(this.area, NodeFilter.SHOW_TEXT, null);
      let n;
      while (n = walker.nextNode()) {
        const text = cs ? n.nodeValue : n.nodeValue.toLowerCase();
        let from = 0, idx;
        while ((idx = text.indexOf(needle, from)) != -1) {
          out.push({ node: n, start: idx, end: idx + q.length });
          from = idx + q.length;
        }
      }
      return out;
    }
    showFindMatch() {
      const st = this.findState;
      if (st == null || this.findCount == null) return;
      const n = st.matches.length;
      this.findCount.textContent = n ? st.index + 1 + " / " + n : st.query ? "No matches" : "";
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
      if (typeof Highlight == "undefined" || !window.CSS || !CSS.highlights) return;
      const st = this.findState;
      const all = new Highlight();
      const current = new Highlight();
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
          if (i == st.index) current.add(r);
          else all.add(r);
        }
      }
      CSS.highlights.set("ye-find", all);
      CSS.highlights.set("ye-find-current", current);
    }
    clearFindHighlights() {
      if (window.CSS && CSS.highlights) {
        CSS.highlights.delete("ye-find");
        CSS.highlights.delete("ye-find-current");
      }
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
      const needle = cs ? q : q.toLowerCase();
      const walker = document.createTreeWalker(this.area, NodeFilter.SHOW_TEXT, null);
      const nodes = [];
      let n;
      while (n = walker.nextNode()) nodes.push(n);
      let count = 0;
      nodes.forEach((node) => {
        const text = node.nodeValue;
        const hay = cs ? text : text.toLowerCase();
        let result = "", from = 0, idx, changed = false;
        while ((idx = hay.indexOf(needle, from)) != -1) {
          result += text.slice(from, idx) + rep;
          from = idx + q.length;
          count++;
          changed = true;
        }
        if (changed) {
          result += text.slice(from);
          node.nodeValue = result;
        }
      });
      if (count) {
        this.enforceLimit();
        this.sync();
        this.recordState();
      }
      this.runFind();
      if (this.findCount) this.findCount.textContent = "Replaced " + count;
    }
  };

  // source/mixins/media.js
  var withMedia = (Base) => class extends Base {
    insertLink() {
      const sel = window.getSelection();
      const selected = sel ? sel.toString() : "";
      const anchor = this.currentAnchor();
      const newTab = anchor ? (anchor.getAttribute("target") || "_blank").toLowerCase() != "_self" : true;
      this.promptPop({
        fields: [
          { placeholder: "Link URL", value: anchor ? anchor.getAttribute("href") : "https://" },
          { placeholder: "Title (optional)", value: anchor ? anchor.getAttribute("title") || "" : "" },
          { type: "checkbox", label: "Open in new tab", checked: newTab }
        ],
        onSubmit: (vals) => {
          const url = vals[0], title = vals[1], openNew = vals[2];
          if (url == "") {
            if (anchor) {
              const parent = anchor.parentNode;
              while (anchor.firstChild) parent.insertBefore(anchor.firstChild, anchor);
              parent.removeChild(anchor);
              this.sync();
            } else {
              exec("unlink");
            }
            return null;
          }
          if (!isSafeUrl(url)) return "That link scheme is not allowed.";
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
          if (a) {
            if (title) a.setAttribute("title", title);
            else a.removeAttribute("title");
            if (openNew) {
              a.setAttribute("target", "_blank");
              a.setAttribute("rel", "noopener noreferrer nofollow");
            } else {
              a.setAttribute("target", "_self");
              a.removeAttribute("rel");
            }
          }
          this.sync();
          return null;
        }
      });
    }
    insertImage() {
      this.promptPop({
        fields: [{ placeholder: "Image URL", value: "https://" }, { placeholder: "Alt text (optional)", value: "" }],
        onSubmit: (vals) => {
          const url = vals[0];
          if (!isSafeUrl(url)) return "That image URL is not allowed.";
          exec("insertHTML", '<img src="' + escapeHtml(url) + '" alt="' + escapeHtml(vals[1] || "") + '">');
          return null;
        }
      });
    }
    insertVideo() {
      this.promptPop({
        fields: [{ placeholder: "YouTube or Vimeo URL", value: "https://" }],
        onSubmit: (vals) => {
          const src = embedFromUrl(vals[0]);
          if (src == null) return "Only YouTube and Vimeo links are supported.";
          exec("insertHTML", '<iframe src="' + escapeHtml(src) + '" frameborder="0" allowfullscreen></iframe><p><br></p>');
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
        if (href) window.open(href, "_blank", "noopener");
      } else if (op == "remove") {
        const parent = anchor.parentNode;
        while (anchor.firstChild) parent.insertBefore(anchor.firstChild, anchor);
        parent.removeChild(anchor);
      }
    }
    uploadFiles(list) {
      let chain = Promise.resolve();
      for (let i = 0; i < list.length; i++) {
        const file = list[i];
        chain = chain.then(() => this.uploadFile(file));
      }
      return chain;
    }
    uploadFile(file) {
      if (!/^image\//.test(file.type)) return Promise.resolve();
      if (this.maxImageKb && file.size > this.maxImageKb * 1024) {
        window.alert("Image is too large (max " + this.maxImageKb + " KB).");
        return Promise.resolve();
      }
      this.saveRange();
      this.setBusy(true);
      const insert = (url) => {
        if (!url || !isSafeUrl(url)) throw new Error("bad upload url");
        this.restoreRange();
        exec("insertHTML", '<img src="' + escapeHtml(url) + '" alt="">');
        this.sync();
      };
      const task = this.onImageUpload ? Promise.resolve(this.onImageUpload(file)).then(insert) : this.postImage(file).then(insert);
      return task.catch(() => window.alert("Image upload failed.")).then(() => this.setBusy(false));
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
      if (on) count.textContent = "Uploading\u2026";
      else this.updateCount();
    }
    imageOp(op) {
      const img = this.ctxImg || this.selectedImg;
      if (img == null) return;
      if (op == "align-left") {
        img.style.float = "left";
        this.setBlockAlign(img, "");
      } else if (op == "align-right") {
        img.style.float = "right";
        this.setBlockAlign(img, "");
      } else if (op == "align-center") {
        img.style.float = "";
        this.setBlockAlign(img, "center");
      } else if (op == "align-none") {
        img.style.float = "";
        this.setBlockAlign(img, "");
      } else if (op == "alt") {
        this.editAlt(img);
        return;
      } else if (op == "img-del") {
        img.remove();
        this.deselectImage();
        this.sync();
        return;
      }
      this.sync();
      this.showImgHandle();
    }
    setBlockAlign(node, val) {
      const b = this.closestBlock(node);
      if (b && b != this.area) b.style.textAlign = val;
    }
    editAlt(img) {
      this.nextFormAnchor = this.ctxAnchorPos;
      this.promptPop({
        fields: [{ placeholder: "Alt text (describe the image)", value: img.getAttribute("alt") || "" }],
        onSubmit: (vals) => {
          img.setAttribute("alt", vals[0]);
          this.sync();
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
    }
    showImgHandle() {
      const img = this.selectedImg;
      if (img == null) return;
      if (this.imgHandle == null) {
        const h = document.createElement("div");
        h.className = "ye-img-handle";
        document.body.appendChild(h);
        h.addEventListener("mousedown", (e) => this.startImgResize(e));
        this.imgHandle = h;
      }
      const r = img.getBoundingClientRect();
      this.imgHandle.style.display = "block";
      this.imgHandle.style.left = r.right - 6 + "px";
      this.imgHandle.style.top = r.bottom - 6 + "px";
    }
    startImgResize(e) {
      e.preventDefault();
      const img = this.selectedImg;
      if (img == null) return;
      const startX = e.clientX;
      const startW = img.getBoundingClientRect().width;
      const maxW = this.area.clientWidth;
      const move = (ev) => {
        let w = Math.round(startW + (ev.clientX - startX));
        w = Math.max(24, Math.min(w, maxW));
        img.style.width = w + "px";
        img.style.height = "";
        img.removeAttribute("width");
        img.removeAttribute("height");
        this.showImgHandle();
      };
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        this.sync();
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
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
      exec("insertHTML", html);
    }
    tableOp(op) {
      const cell = this.currentCell();
      if (cell == null) return;
      const row = cell.parentNode;
      const table = ancestorTag(cell, "TABLE");
      const idx = Array.prototype.indexOf.call(row.children, cell);
      if (op == "row-above" || op == "row-below") {
        const clone = row.cloneNode(true);
        const cells = clone.children;
        for (let i = 0; i < cells.length; i++) {
          const fresh = document.createElement("td");
          fresh.innerHTML = "<br>";
          clone.replaceChild(fresh, cells[i]);
        }
        row.parentNode.insertBefore(clone, op == "row-above" ? row : row.nextSibling);
      } else if (op == "col-left" || op == "col-right") {
        const rows = table.querySelectorAll("tr");
        for (let i = 0; i < rows.length; i++) {
          const ref = rows[i].children[idx];
          const fresh = document.createElement(ref && ref.tagName == "TH" ? "th" : "td");
          fresh.innerHTML = "<br>";
          rows[i].insertBefore(fresh, op == "col-left" ? ref : ref ? ref.nextSibling : null);
        }
      } else if (op == "row-del") {
        if (table.querySelectorAll("tr").length > 1) row.remove();
      } else if (op == "col-del") {
        const rows = table.querySelectorAll("tr");
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].children.length > 1 && rows[i].children[idx]) rows[i].children[idx].remove();
        }
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
        table.remove();
      }
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
    mergeCell(cell, dir) {
      const table = ancestorTag(cell, "TABLE");
      const grid = this.tableGrid(table);
      const pos = this.findCellPos(grid, cell);
      if (pos == null) return;
      const cs = cell.colSpan || 1;
      const rs = cell.rowSpan || 1;
      let other = null;
      if (dir == "right") {
        other = (grid[pos.r] || [])[pos.c + cs];
        if (other == null || other == cell) return;
        const op = this.findCellPos(grid, other);
        if (op.r != pos.r || op.c != pos.c + cs || (other.rowSpan || 1) != rs) return;
        cell.colSpan = cs + (other.colSpan || 1);
      } else {
        other = (grid[pos.r + rs] || [])[pos.c];
        if (other == null || other == cell) return;
        const op = this.findCellPos(grid, other);
        if (op.r != pos.r + rs || op.c != pos.c || (other.colSpan || 1) != cs) return;
        cell.rowSpan = rs + (other.rowSpan || 1);
      }
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
      cell.colSpan = 1;
      cell.rowSpan = 1;
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
        const ops = [
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
        const wrap = document.createElement("div");
        wrap.className = "ye-tableops";
        ops.forEach((op) => {
          if (op[0] == "|") {
            const d = document.createElement("div");
            d.className = "ye-tableops__sep";
            wrap.appendChild(d);
            return;
          }
          const b = document.createElement("button");
          b.type = "button";
          b.innerHTML = this.renderIcon(op[0]) + "<span>" + op[1] + "</span>";
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
            const cell = document.createElement("div");
            cell.className = "ye-grid__cell";
            cell.dataset.r = r;
            cell.dataset.c = c;
            grid.appendChild(cell);
          }
        }
        const label = document.createElement("div");
        label.className = "ye-grid__label";
        label.textContent = "Pick size";
        const opt = document.createElement("label");
        opt.className = "ye-grid__opt";
        opt.innerHTML = '<input type="checkbox" data-ye-table-header> Header row';
        pop.appendChild(grid);
        pop.appendChild(label);
        pop.appendChild(opt);
      }
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
      const near = (sel) => target && target.closest ? target.closest(sel) : null;
      let anchor = near("a");
      if (anchor && this.area.contains(anchor)) {
        this.ctxAnchor = anchor;
        this.showCtx(x, y, "link");
        return true;
      }
      let img = near("img");
      if (img && this.area.contains(img)) {
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
      const ops = [["edit", "Edit link"], ["open", "Open"], ["remove", "Remove link"]];
      ops.forEach((op) => {
        const b = document.createElement("button");
        b.type = "button";
        b.innerHTML = this.renderIcon(op[0]) + "<span>" + op[1] + "</span>";
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
      const ops = [
        ["align-left", "Float left"],
        ["align-center", "Center"],
        ["align-right", "Float right"],
        ["align-none", "Inline"],
        ["|"],
        ["alt", "Alt text\u2026"],
        ["img-del", "Delete image"]
      ];
      ops.forEach((op) => {
        if (op[0] == "|") {
          const d = document.createElement("div");
          d.className = "ye-tableops__sep";
          wrap.appendChild(d);
          return;
        }
        const b = document.createElement("button");
        b.type = "button";
        b.innerHTML = this.renderIcon(op[0]) + "<span>" + op[1] + "</span>";
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
      const pops = this.menuPops || [];
      for (let i = 0; i < pops.length; i++) if (pops[i].contains(t)) return true;
      return false;
    }
  };

  // source/mixins/view.js
  var withView = (Base) => class extends Base {
    markActive(cmd, on) {
      const btn = this.root.querySelector('.ye-toolbar__btn[data-cmd="' + cmd + '"]');
      if (btn) btn.classList.toggle("is-active", on);
    }
    toggleSource() {
      const on = this.root.classList.toggle("ye--source");
      if (on) {
        this.sourceView.value = this.getHTML();
        this.sourceView.hidden = false;
        this.area.hidden = true;
      } else {
        this.area.innerHTML = this.clean(this.sourceView.value);
        this.area.hidden = false;
        this.sourceView.hidden = true;
        this.sync();
      }
      this.markActive("ye-source-toggle", on);
    }
    toggleFull() {
      const on = this.root.classList.toggle("ye--full");
      document.body.classList.toggle("ye-lock", on);
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
        }
      }
      const anchor = window.getSelection() && window.getSelection().anchorNode || this.area;
      const block = this.closestBlock(anchor) || this.area;
      const align = block == this.area ? "" : block.style.textAlign || "";
      const alignBtns = this.root.querySelectorAll('.ye-toolbar__btn[data-cmd="ye-align"]');
      for (let i = 0; i < alignBtns.length; i++) {
        const a = alignBtns[i].dataset.arg;
        alignBtns[i].classList.toggle("is-active", align == a || align == "" && a == "left");
      }
      const label = this.root.querySelector("[data-ye-heading-label]");
      if (label) {
        const tag = block && block.tagName ? block.tagName.toLowerCase() : "p";
        label.textContent = HEADINGS[tag] || "Paragraph";
      }
    }
  };

  // source/mixins/shortcuts.js
  var withShortcuts = (Base) => class extends Base {
    markdownShortcut(e) {
      if (this.inline) return;
      if (e.key != " ") return;
      const sel = window.getSelection();
      if (sel == null || sel.rangeCount == 0 || !sel.isCollapsed) return;
      const block = this.closestBlock(sel.anchorNode);
      if (block == null || block.matches("pre, li")) return;
      const before = block.textContent.slice(0, sel.anchorOffset);
      if (before != block.textContent.trim()) return;
      const map = { "#": "h1", "##": "h2", "###": "h3", "####": "h4", ">": "blockquote" };
      let action = null;
      if (map[before]) action = () => this.formatBlock(map[before]);
      else if (before == "-" || before == "*") action = () => exec("insertUnorderedList");
      else if (before == "1.") action = () => exec("insertOrderedList");
      if (action == null) return;
      e.preventDefault();
      const r = document.createRange();
      r.setStart(block, 0);
      r.setEnd(sel.anchorNode, sel.anchorOffset);
      r.deleteContents();
      action();
    }
    shortcut(e) {
      const k = (e.key || "").toLowerCase();
      if (!e.altKey && !e.shiftKey) {
        if (k == "z") {
          this.undo();
          return true;
        }
        if (k == "y") {
          this.redo();
          return true;
        }
        if (k == "k") {
          this.nextFormAnchor = this.anchorUnder(this.root.querySelector('.ye-toolbar__btn[data-cmd="ye-link"]'));
          this.insertLink();
          return true;
        }
        if (k == "f") {
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
          exec("insertOrderedList");
          this.afterCmd();
          return true;
        }
        if (!this.inline && e.code == "Digit8") {
          exec("insertUnorderedList");
          this.afterCmd();
          return true;
        }
      }
      if (!this.inline && e.altKey && !e.shiftKey) {
        const map = { Digit1: "h1", Digit2: "h2", Digit3: "h3", Digit4: "h4", Digit0: "p" };
        if (map[e.code]) {
          this.formatBlock(map[e.code]);
          this.afterCmd();
          return true;
        }
      }
      return false;
    }
    afterCmd() {
      this.sync();
      this.updateStates();
    }
  };

  // source/mixins/wiring.js
  var withWiring = (Base) => class extends Base {
    wire() {
      const area = this.area;
      area.addEventListener("beforeinput", (e) => {
        const t = e.inputType || "";
        this.inputBoundary = t == "insertText" && /\s/.test(e.data || "") || t == "insertParagraph" || t == "insertLineBreak" || t == "insertFromPaste" || t == "insertFromDrop";
        if (!this.maxChars) return;
        if (t.indexOf("insert") != 0) return;
        const selLen = ((window.getSelection() || {}).toString ? window.getSelection().toString() : "").length;
        const room = this.maxChars - (area.textContent.length - selLen);
        let add = 1;
        if ((t == "insertText" || t == "insertReplacementText") && e.data != null) add = e.data.length;
        else if (t == "insertParagraph" || t == "insertLineBreak") add = 0;
        if (add > room) e.preventDefault();
      });
      area.addEventListener("input", () => {
        this.enforceLimit();
        this.sync();
        if (this.inputBoundary) {
          this.inputBoundary = false;
          this.recordState();
        }
      });
      area.addEventListener("blur", () => this.sync());
      area.addEventListener("keyup", () => this.updateStates());
      area.addEventListener("mouseup", () => this.updateStates());
      area.addEventListener("keydown", (e) => {
        if (this.inline && e.key == "Enter" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          exec("insertLineBreak");
          return;
        }
        this.markdownShortcut(e);
        if ((e.ctrlKey || e.metaKey) && this.shortcut(e)) {
          e.preventDefault();
          return;
        }
        if (e.key == "Escape") {
          this.hideTableCtx();
          this.closeTextMenu();
          this.hideFormPop();
          this.hideFindPop();
          this.deselectImage();
          if (this.root.classList.contains("ye--full")) this.toggleFull();
        }
      });
      area.addEventListener("contextmenu", (e) => {
        if (this.openCtxAt(e.target, e.clientX, e.clientY)) e.preventDefault();
      });
      area.addEventListener("click", (e) => {
        const img = e.target && e.target.closest ? e.target.closest("img") : null;
        if (img && area.contains(img)) this.selectImage(img);
        else this.deselectImage();
      });
      let lpTimer = null, lpStart = null;
      const clearLp = () => {
        if (lpTimer) {
          clearTimeout(lpTimer);
          lpTimer = null;
        }
      };
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
        const imgs = this.uploadEnabled ? imageFilesFrom(data) : [];
        if (imgs.length) {
          e.preventDefault();
          this.uploadFiles(imgs);
          return;
        }
        e.preventDefault();
        const html = data.getData("text/html");
        if (html) exec("insertHTML", this.clean(html, true));
        else exec("insertText", data.getData("text/plain"));
        this.enforceLimit();
        this.sync();
      });
      this.onMousedown = (e) => {
        if (!this.owns(e.target)) return;
        this.saveRange();
        if (e.target.closest(".ye-toolbar__btn, .ye-menu__item, .ye-swatch, .ye-tableops button, .ye-grid__cell")) e.preventDefault();
      };
      document.addEventListener("mousedown", this.onMousedown);
      this.onChange = (e) => {
        if (!this.owns(e.target)) return;
        const el = e.target.closest(".ye-color-native, .ye-color-hex");
        if (el == null) return;
        this.applyCustomColor(el);
      };
      document.addEventListener("change", this.onChange);
      this.onHexKey = (e) => {
        if (!this.owns(e.target)) return;
        if (e.key == "Enter" && e.target.classList && e.target.classList.contains("ye-color-hex")) {
          e.preventDefault();
          this.applyCustomColor(e.target);
        }
      };
      document.addEventListener("keydown", this.onHexKey);
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
            document.body.appendChild(pop);
            menu.classList.add("is-open");
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
        }
      };
      document.addEventListener("click", this.onClick);
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
      document.addEventListener("mouseover", this.onMouseover);
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
          const r = document.caretRangeFromPoint ? document.caretRangeFromPoint(e.clientX, e.clientY) : null;
          if (r) {
            const s = window.getSelection();
            s.removeAllRanges();
            s.addRange(r);
          }
          this.uploadFiles(files);
        });
      }
      this.docClick = (e) => {
        if (this.imgHandle && this.imgHandle.contains(e.target)) return;
        if (!this.owns(e.target)) this.closeMenus();
        if (this.ctxPop && !this.ctxPop.contains(e.target)) this.hideTableCtx();
        if (this.textPop && !this.textPop.contains(e.target)) this.closeTextMenu();
        if (this.formPop && !this.formPop.contains(e.target) && !this.root.contains(e.target)) {
          if (Date.now() - (this.formOpenTs || 0) >= 400) this.hideFormPop();
        }
        if (!this.root.contains(e.target) && !(this.ctxPop && this.ctxPop.contains(e.target))) this.deselectImage();
      };
      document.addEventListener("click", this.docClick);
      this.ctxDismiss = () => {
        this.hideTableCtx();
        this.closeTextMenu();
        this.closeMenus();
        if (this.selectedImg) this.showImgHandle();
      };
      window.addEventListener("scroll", this.ctxDismiss, true);
      window.addEventListener("resize", this.ctxDismiss);
    }
  };

  // source/index.js
  var mix = (Base, ...mixins) => mixins.reduce((B, m) => m(B), Base);
  var YurbaEditor = class extends mix(HTMLElement, withPopup, withToolbar, withHistory, withSelection, withCommands, withPrompt, withFind, withMedia, withTables, withMenus, withContext, withView, withShortcuts, withWiring) {
    static create(config = {}) {
      const el = document.createElement("yurba-editor");
      el.initConfig = config;
      const field = config.field ? typeof config.field == "string" ? document.querySelector(config.field) : config.field : null;
      if (field) field.after(el);
      else if (config.mount) {
        const mount = typeof config.mount == "string" ? document.querySelector(config.mount) : config.mount;
        if (mount) mount.appendChild(el);
      }
      return el;
    }
    static sanitize(html, opts) {
      opts = opts || {};
      return cleanHtml(html, opts.embedHosts || EMBED_HOSTS, false, { allowData: opts.allowData === true, allowClasses: opts.allowClasses === true });
    }
    connectedCallback() {
      if (this.yeReady) return;
      this.yeReady = true;
      const options = this.initConfig || {};
      this.options = options;
      this.icons = options.icons || {};
      this.embedHosts = options.embedHosts || EMBED_HOSTS;
      this.uploadUrl = options.uploadUrl || null;
      this.onImageUpload = typeof options.onImageUpload == "function" ? options.onImageUpload : null;
      this.uploadField = options.uploadField || "file";
      this.uploadHeaders = options.uploadHeaders || {};
      this.maxImageKb = options.maxImageKb || 0;
      this.maxChars = options.maxChars || 0;
      this.uploadEnabled = !!(this.uploadUrl || this.onImageUpload);
      this.inline = options.inline === true || options.blocks === false;
      this.allowData = options.allowData === true;
      this.allowClasses = options.allowClasses === true;
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
      this.area.dataset.placeholder = options.placeholder || "Start writing\u2026";
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
    clean(html, strict) {
      const cleaned = cleanHtml(html, this.embedHosts, strict, { allowData: this.allowData, allowClasses: this.allowClasses });
      return this.inline ? flattenInline(cleaned) : cleaned;
    }
    getHTML() {
      const clone = this.area.cloneNode(true);
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
      this.area.innerHTML = this.clean(html);
      this.sync();
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
      if (this.histTimer) {
        clearTimeout(this.histTimer);
        this.histTimer = null;
      }
      if (this.docClick) document.removeEventListener("click", this.docClick);
      if (this.ctxDismiss) {
        window.removeEventListener("scroll", this.ctxDismiss, true);
        window.removeEventListener("resize", this.ctxDismiss);
      }
      if (this.onMousedown) document.removeEventListener("mousedown", this.onMousedown);
      if (this.onChange) document.removeEventListener("change", this.onChange);
      if (this.onHexKey) document.removeEventListener("keydown", this.onHexKey);
      if (this.onClick) document.removeEventListener("click", this.onClick);
      if (this.onMouseover) document.removeEventListener("mouseover", this.onMouseover);
      if (this.ctxPop) this.ctxPop.remove();
      if (this.textPop) this.textPop.remove();
      if (this.formPop) this.formPop.remove();
      if (this.imgHandle) this.imgHandle.remove();
      if (this.findPop) this.findPop.remove();
      (this.menuPops || []).forEach((p) => p.remove());
      this.root.remove();
      if (this.input) this.input.style.display = "";
    }
    sync() {
      if (this.root.classList.contains("ye--source")) return;
      const html = this.getHTML();
      if (this.input) this.input.value = html;
      if (typeof this.options.onChange == "function") this.options.onChange(html);
      this.emit("change", html);
      this.updateCount();
      const count = this.getCount();
      if (this.lastCount == null || this.lastCount.words != count.words || this.lastCount.chars != count.chars) {
        this.lastCount = count;
        if (typeof this.options.onCount == "function") this.options.onCount(count);
        this.emit("count", count);
      }
      if (this.findPop) this.refreshFind();
      if (!this.restoring) this.scheduleRecord();
    }
    getCount() {
      const text = this.area.textContent.replace(/\s+/g, " ").trim();
      return { words: text == "" ? 0 : text.split(" ").length, chars: this.area.textContent.length };
    }
    updateCount() {
      const count = this.root.querySelector("[data-ye-count]");
      if (count == null) return;
      const { words, chars } = this.getCount();
      if (this.maxChars) {
        count.textContent = words + " words \xB7 " + chars + " / " + this.maxChars + " chars";
        count.classList.toggle("is-limit", chars >= this.maxChars);
        count.classList.toggle("is-near", chars >= this.maxChars * 0.9 && chars < this.maxChars);
      } else {
        count.textContent = words + " words \xB7 " + chars + " chars";
      }
    }
    enforceLimit() {
      if (!this.maxChars) return;
      let over = this.area.textContent.length - this.maxChars;
      if (over <= 0) return;
      const walker = document.createTreeWalker(this.area, NodeFilter.SHOW_TEXT, null);
      const nodes = [];
      let n;
      while (n = walker.nextNode()) nodes.push(n);
      for (let i = nodes.length - 1; i >= 0 && over > 0; i--) {
        const node = nodes[i];
        const cut = Math.min(node.nodeValue.length, over);
        node.nodeValue = node.nodeValue.slice(0, node.nodeValue.length - cut);
        over -= cut;
      }
    }
  };
  __publicField(YurbaEditor, "DEFAULT_TOOLBAR", DEFAULT_TOOLBAR);
  __publicField(YurbaEditor, "EMBED_HOSTS", EMBED_HOSTS);
  customElements.define("yurba-editor", YurbaEditor);
  return __toCommonJS(index_exports);
})();
window.YurbaEditor=__yurbaeditor__.YurbaEditor;
