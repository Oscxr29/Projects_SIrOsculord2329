// ==========================================
//  Sir_Oscxr29.ux_ — script.js
// ==========================================

// ---- Custom Cursor ----
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursor-trail');

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';

    // Trail lags slightly behind
    setTimeout(() => {
        trail.style.left = e.clientX + 'px';
        trail.style.top  = e.clientY + 'px';
    }, 75);
});

// Scale cursor on hoverable elements
document.addEventListener('mouseover', e => {
    if (e.target.matches('button, a, .card, .nav-btn')) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
        trail.style.transform  = 'translate(-50%, -50%) scale(0.7)';
    }
});

document.addEventListener('mouseout', e => {
    if (e.target.matches('button, a, .card, .nav-btn')) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        trail.style.transform  = 'translate(-50%, -50%) scale(1)';
    }
});


// ---- Preloader ----
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('exit');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2300);
});


// ---- Navigation ----
const navBtns  = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.section;

        navBtns.forEach(b => b.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(target).classList.add('active');

        // Scroll to top of content on mobile
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});


// ---- Classified: reveal sequence ----
const MESSAGES = [
    "> VERIFICANDO CREDENCIALES...",
    "> ERROR: NIVEL DE ACCESO INSUFICIENTE.",
    "> INTENTANDO BYPASS...",
    "> ACCESO DENEGADO. [CLEARANCE NIVEL 4 REQUERIDO]",
    "> ...",
    "> Pronto.",
];

let revealStep = 0;
let revealLocked = false;

function attemptReveal() {
    if (revealLocked) return;

    const output = document.getElementById('reveal-output');
    const btn    = document.getElementById('revealBtn');

    if (revealStep < MESSAGES.length) {
        // Print one message per click with a slight delay
        output.innerHTML += MESSAGES[revealStep] + '<br>';
        revealStep++;

        // Auto-scroll output into view
        output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        if (revealStep >= MESSAGES.length) {
            revealLocked = true;
            btn.textContent = '> [ACCESO DENEGADO — PENDIENTE]';
            btn.disabled = true;
        }
    }
}


// ---- Keyboard easter egg ----
// Type "oscar" to unlock a small message in the footer
let keyBuffer = '';

document.addEventListener('keydown', e => {
    keyBuffer += e.key.toLowerCase();
    if (keyBuffer.length > 10) keyBuffer = keyBuffer.slice(-10);

    if (keyBuffer.includes('oscar')) {
        const footer = document.querySelector('.footer-sub');
        if (footer && !footer.dataset.unlocked) {
            footer.dataset.unlocked = 'true';
            footer.textContent = '> Easter egg encontrado. El proyecto se acerca. 👁️';
            footer.style.color = 'var(--accent)';
            footer.style.fontFamily = "'Space Mono', monospace";
            footer.style.fontSize = '0.72rem';
        }
        keyBuffer = '';
    }
});