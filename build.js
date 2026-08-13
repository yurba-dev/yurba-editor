const { build, transform } = require('esbuild')
const fs = require('fs')
const path = require('path')

const srcDir = path.join(__dirname, 'source')
const distDir = path.join(__dirname, 'dist')

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir)

const jsOptions = {
    entryPoints: [path.join(srcDir, 'index.js')],
    bundle: true,
    format: 'iife',
    globalName: '__yurbaeditor__',
    footer: { js: 'window.YurbaEditor=__yurbaeditor__.YurbaEditor;' },
    target: ['chrome80', 'firefox78', 'safari14'],
}

Promise.all([
    build({ ...jsOptions, outfile: path.join(distDir, 'yurba-editor.js'), minify: false })
        .then(() => console.log('✓  JS  →  dist/yurba-editor.js')),
    build({ ...jsOptions, outfile: path.join(distDir, 'yurba-editor.min.js'), minify: true })
        .then(() => console.log('✓  JS  →  dist/yurba-editor.min.js')),
]).catch(() => process.exit(1))

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
    'dark.css',
]
const css = cssOrder.map(f => fs.readFileSync(path.join(srcDir, 'styles', f), 'utf8')).join('\n')
fs.writeFileSync(path.join(distDir, 'yurba-editor.css'), css, 'utf8')
console.log('✓  CSS →  dist/yurba-editor.css')

transform(css, { loader: 'css', minify: true }).then(result => {
    fs.writeFileSync(path.join(distDir, 'yurba-editor.min.css'), result.code, 'utf8')
    console.log('✓  CSS →  dist/yurba-editor.min.css')
}).catch(() => process.exit(1))
