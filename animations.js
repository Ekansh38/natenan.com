/* ============================================================
   animations.js
   To disable ALL animations: remove the <script> tag for this
   file from every HTML page's <body>.
   ============================================================ */

/* typewriter — natenan.com header */
function typewriter() {
    const el = document.querySelector('.site-title');
    if (!el) return;
    const text = el.textContent.trim();
    el.textContent = '';
    el.style.visibility = 'visible';
    let i = 0;
    const tick = () => {
        el.textContent = text.slice(0, ++i);
        if (i < text.length) setTimeout(tick, 75);
    };
    setTimeout(tick, 150);
}

/* stagger fade-in + bounce for scattered home links */
function staggerScattered() {
    const links = document.querySelectorAll('.scattered-link');
    if (!links.length) return;
    const bounceDurations = ['4.8s', '5.4s', '5.1s', '4.6s', '5.7s', '5.0s'];
    links.forEach((el, i) => {
        const delay = i * 0.14;
        el.style.setProperty('--delay', delay + 's');
        el.style.setProperty('--float-dur', bounceDurations[i % bounceDurations.length]);
        el.style.setProperty('--float-delay', (delay + 0.6) + 's');
        el.style.animationDelay = delay + 's';
        setTimeout(() => el.classList.add('visible'), delay * 1000);
    });
}

/* page transitions — fade out on navigate, fade in on arrival */
function pageTransitions() {
    const overlay = document.createElement('div');
    overlay.className = 'page-overlay';
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => overlay.classList.add('fade-out'));
    });

    document.addEventListener('click', e => {
        const a = e.target.closest('a[href]');
        if (!a) return;
        const href = a.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('#')) return;
        e.preventDefault();
        overlay.classList.remove('fade-out');
        setTimeout(() => { window.location.href = href; }, 320);
    });
}

/* light / dark mode toggle */
function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);

    const btn = document.createElement('button');
    btn.className = 'theme-toggle';
    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';
    btn.textContent = isDark() ? 'light' : 'dark';
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
        const next = isDark() ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        btn.textContent = isDark() ? 'light' : 'dark';
    });
}

typewriter();
staggerScattered();
pageTransitions();
initTheme();

