const menuButton = document.querySelector('#menu-button');
const navigation = document.querySelector('#main-navigation');

function closeNavigation({ returnFocus = false } = {}) {
    if (!menuButton || !navigation) return;

    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    navigation.classList.remove('is-open');
    if (returnFocus) menuButton.focus();
}

if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
        const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!isOpen));
        menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
        navigation.classList.toggle('is-open', !isOpen);
    });

    navigation.addEventListener('click', (event) => {
        if (event.target.closest('a')) closeNavigation();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
            closeNavigation({ returnFocus: true });
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 760) closeNavigation();
    });
}

document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
});

function initializeDialog(dialog, openButtons) {
    if (!dialog) return;

    openButtons.forEach((button) => button.addEventListener('click', () => dialog.showModal()));
    dialog.querySelectorAll('[data-close-dialog]').forEach((button) => {
        button.addEventListener('click', () => dialog.close());
    });
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) dialog.close();
    });
}

initializeDialog(
    document.querySelector('#recruiter-dialog'),
    [...document.querySelectorAll('[data-open-recruiter]')]
);

const portfolioGuide = {
    strongest: {
        answer: 'The strongest full-stack evidence is the Student Progress Tracker: a deployed React and TypeScript application with Supabase/PostgreSQL, authentication, password recovery, Row Level Security, CRUD workflows, dated assessment history, dashboard logic, automated component tests, and documented production debugging.',
        sources: [{ label: 'Student Progress Tracker case study', url: '/case-studies/student-progress-tracker.html' }]
    },
    stack: {
        answer: 'Marsharine’s deployed work demonstrates React, TypeScript, JavaScript, HTML5, CSS3, Supabase, PostgreSQL, authentication, Row Level Security, Vitest, React Testing Library, Git workflows, accessibility, and Vercel deployment.',
        sources: [{ label: 'All selected projects', url: '/projects.html' }]
    },
    testing: {
        answer: 'The Student Progress Tracker includes Vitest and React Testing Library coverage for key component behavior, supported by TypeScript checking, ESLint, production builds, manual verification, and a GitHub issue/branch/pull-request workflow.',
        sources: [
            { label: 'Testing evidence', url: '/case-studies/student-progress-tracker.html' },
            { label: 'Source repository', url: 'https://github.com/marsharine-cs/student-progress-tracker' }
        ]
    },
    security: {
        answer: 'The Student Progress Tracker demonstrates authentication, password recovery, protected application access, Supabase sessions, and database Row Level Security. The case study also explains how relational assessment history is preserved rather than overwritten.',
        sources: [{ label: 'Security and data decisions', url: '/case-studies/student-progress-tracker.html' }]
    },
    frontend: {
        answer: 'For frontend evidence, review Luma One for centralized JavaScript state, validated controls, responsive behavior, accessible feedback, and original CSS artwork; and the AI Development Field Guide for search, keyboard interaction, local persistence, and responsive navigation.',
        sources: [
            { label: 'Luma One case study', url: '/case-studies/luma-one.html' },
            { label: 'AI Field Guide case study', url: '/case-studies/ai-development-field-guide.html' }
        ]
    },
    background: {
        answer: 'Marsharine combines software development with a B.S. in Information Technology and Security and experience in technical support, SaaS, telecommunications technology, AI evaluation, and computer science education. That background shows up in systematic troubleshooting, clear documentation, accessibility awareness, and user-centered design.',
        sources: [
            { label: 'Professional background', url: '/about.html' },
            { label: 'Résumé', url: 'https://projectsportfolio-nine.vercel.app/assets/Marsharine-Simpson-Software-Developer-Resume.pdf' }
        ]
    },
    contact: {
        answer: 'The portfolio’s primary professional links are GitHub and the developer résumé. Each featured project also links directly to its live application and source code.',
        sources: [
            { label: 'GitHub profile', url: 'https://github.com/marsharine-cs' },
            { label: 'Résumé', url: 'https://projectsportfolio-nine.vercel.app/assets/Marsharine-Simpson-Software-Developer-Resume.pdf' }
        ]
    }
};

function chooseLocalGuideAnswer(message) {
    const text = message.toLowerCase();
    if (/strong|best|flagship|full.?stack|student|supabase|database/.test(text)) return portfolioGuide.strongest;
    if (/test|quality|vitest|reliable/.test(text)) return portfolioGuide.testing;
    if (/secure|security|auth|row level|rls/.test(text)) return portfolioGuide.security;
    if (/front.?end|javascript|luma|field guide|accessible|responsive/.test(text)) return portfolioGuide.frontend;
    if (/background|education|experience|teach|support|communicat|troubleshoot/.test(text)) return portfolioGuide.background;
    if (/resume|résumé|contact|github|hire|reach/.test(text)) return portfolioGuide.contact;
    if (/stack|skill|technolog|tool|react|typescript/.test(text)) return portfolioGuide.stack;

    return {
        answer: 'I can help you review Marsharine’s strongest project, technical stack, testing and security evidence, frontend work, or professional background. Choose a suggested question below, or ask about one of those areas.',
        sources: [{ label: 'Browse selected projects', url: '/projects.html' }]
    };
}

function createGuideMarkup() {
    return `
        <button class="guide-launcher" type="button" aria-haspopup="dialog" aria-controls="portfolio-guide-dialog" data-open-guide>
            <span aria-hidden="true">✦</span> Ask about my work
        </button>
        <dialog class="guide-dialog" id="portfolio-guide-dialog" aria-labelledby="guide-title">
            <div class="guide-shell">
                <header class="guide-header">
                    <div><p class="guide-eyebrow">GROUNDED PORTFOLIO GUIDE</p><h2 id="guide-title">Ask about Marsharine’s work</h2></div>
                    <button class="dialog-close" type="button" aria-label="Close portfolio guide" data-close-dialog>×</button>
                </header>
                <p class="guide-disclosure">Answers use verified portfolio evidence and link to the source. This guide does not speak as Marsharine.</p>
                <div class="guide-messages" id="guide-messages" aria-live="polite" aria-label="Portfolio guide conversation">
                    <div class="guide-message guide-message-assistant">What would you like to evaluate? Try the strongest project, technical stack, testing, security, frontend work, or professional background.</div>
                </div>
                <div class="guide-prompts" aria-label="Suggested questions">
                    <button type="button" data-guide-question="What is Marsharine's strongest project?">Strongest project</button>
                    <button type="button" data-guide-question="What testing and quality evidence is shown?">Testing evidence</button>
                    <button type="button" data-guide-question="How does her background strengthen her development work?">Developer background</button>
                </div>
                <form class="guide-form" id="guide-form">
                    <label class="visually-hidden" for="guide-question">Ask a question about Marsharine’s portfolio</label>
                    <input id="guide-question" name="question" type="text" maxlength="500" autocomplete="off" placeholder="Ask about projects, skills, or experience…" required>
                    <button class="button button-primary button-small" type="submit">Ask</button>
                </form>
                <p class="guide-status" id="guide-status">Verified answers work even when the optional live model is unavailable.</p>
            </div>
        </dialog>`;
}

function sourceMarkup(sources) {
    if (!sources?.length) return '';
    const links = sources.map((source) => {
        const external = /^https?:/.test(source.url);
        return `<a href="${source.url}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${source.label}${external ? ' ↗' : ''}</a>`;
    });
    return `<div class="guide-sources"><strong>Evidence:</strong> ${links.join(' · ')}</div>`;
}

function addGuideMessage(container, kind, content, sources = []) {
    const message = document.createElement('div');
    message.className = `guide-message guide-message-${kind}`;
    const text = document.createElement('p');
    text.textContent = content;
    message.append(text);

    if (sources.length) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = sourceMarkup(sources);
        message.append(...wrapper.children);
    }

    container.append(message);
    container.scrollTop = container.scrollHeight;
}

async function askPortfolioGuide(question, messages, status) {
    status.textContent = 'Checking verified portfolio evidence…';

    try {
        const response = await fetch('/api/portfolio-chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: question })
        });

        if (!response.ok) throw new Error('Live guide unavailable');
        const result = await response.json();
        addGuideMessage(messages, 'assistant', result.answer, result.sources);
        status.textContent = 'Answer generated from the verified portfolio evidence set.';
    } catch {
        const fallback = chooseLocalGuideAnswer(question);
        addGuideMessage(messages, 'assistant', fallback.answer, fallback.sources);
        status.textContent = 'Answer selected from the verified on-site evidence set.';
    }
}

function initializePortfolioGuide() {
    document.body.insertAdjacentHTML('beforeend', createGuideMarkup());

    const dialog = document.querySelector('#portfolio-guide-dialog');
    const openButton = document.querySelector('[data-open-guide]');
    const form = document.querySelector('#guide-form');
    const input = document.querySelector('#guide-question');
    const messages = document.querySelector('#guide-messages');
    const status = document.querySelector('#guide-status');
    let waiting = false;

    initializeDialog(dialog, [openButton]);
    openButton.addEventListener('click', () => window.setTimeout(() => input.focus(), 0));

    async function submitQuestion(question) {
        const cleaned = question.trim();
        if (!cleaned || waiting) return;

        waiting = true;
        form.querySelector('button').disabled = true;
        addGuideMessage(messages, 'user', cleaned);
        input.value = '';
        await askPortfolioGuide(cleaned, messages, status);
        form.querySelector('button').disabled = false;
        waiting = false;
        input.focus();
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        submitQuestion(input.value);
    });

    dialog.querySelectorAll('[data-guide-question]').forEach((button) => {
        button.addEventListener('click', () => submitQuestion(button.dataset.guideQuestion));
    });
}

initializePortfolioGuide();
