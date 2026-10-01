const { build, transform } = require('esbuild')
const fs = require('fs')
const path = require('path')

const srcDir = path.join(__dirname, 'source')
const distDir = path.join(__dirname, 'dist')

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir)

const builds = {
    'yurba-editor': { ui: false, css: ['dropdown.css'] },
    'yurba-editor.ui': { ui: true, css: ['yurbaui.css'] },
}

const cssOrder = [
    'base.css',
    'toolbar.css',
    'menus.css',
    'forms.css',
    'tables.css',
    'area.css',
    'foot.css',
    'states.css',
    'context.css',
    'slash.css',
]

const jsOptions = {
    entryPoints: [path.join(srcDir, 'index.js')],
    bundle: true,
    format: 'iife',
    globalName: '__yurbaeditor__',
    footer: { js: 'window.YurbaEditor=__yurbaeditor__.YurbaEditor;' },
    target: ['chrome80', 'firefox78', 'safari14'],
}

Promise.all(Object.entries(builds).flatMap(([name, options]) => {
    const define = { YE_UI: String(options.ui) }
    const css = [...cssOrder, ...options.css, 'dark.css'].map(f => fs.readFileSync(path.join(srcDir, 'styles', f), 'utf8')).join('\n')
    fs.writeFileSync(path.join(distDir, name + '.css'), css, 'utf8')
    console.log(`✓  CSS →  dist/${name}.css`)
    return [
        build({ ...jsOptions, define, outfile: path.join(distDir, name + '.js'), minify: false })
            .then(() => console.log(`✓  JS  →  dist/${name}.js`)),
        build({ ...jsOptions, define, outfile: path.join(distDir, name + '.min.js'), minify: true })
            .then(() => console.log(`✓  JS  →  dist/${name}.min.js`)),
        transform(css, { loader: 'css', minify: true })
            .then(result => fs.writeFileSync(path.join(distDir, name + '.min.css'), result.code, 'utf8'))
            .then(() => console.log(`✓  CSS →  dist/${name}.min.css`)),
    ]
})).catch(() => process.exit(1))
