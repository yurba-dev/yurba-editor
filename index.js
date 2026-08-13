hljs.highlightAll()

const out = document.getElementById('demo-out')

const editor = YurbaEditor.create({
    field: '#demo-body',
    placeholder: 'Write something…',
    onChange: html => { out.textContent = html }
})
out.textContent = editor.getHTML()

YurbaEditor.create({
    field: '#demo-compact',
    minHeight: 120,
    placeholder: 'A trimmed-down toolbar…',
    toolbar: ['heading', '|', 'bold', 'italic', 'underline', '|', 'forecolor', '|', 'ul', 'ol', '|', 'link', '|', 'clear']
})

YurbaEditor.create({
    field: '#demo-bare',
    toolbar: false,
    footer: false,
    inline: true,
    minHeight: 90,
    placeholder: 'Write a post… (right-click to format)'
})

const dark = document.getElementById('dark')
dark.addEventListener('change', () => {
    document.querySelectorAll('.ye').forEach(el => el.classList.toggle('ye--dark', dark.checked))
})

// Highlight the sidebar link for the section currently in view.
const links = document.querySelectorAll('.sidebar a')
const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return
        links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') == '#' + entry.target.id))
    })
}, { rootMargin: '-52px 0px -70% 0px' })
document.querySelectorAll('main section[id]').forEach(section => spy.observe(section))
