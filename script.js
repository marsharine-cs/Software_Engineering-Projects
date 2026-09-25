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

function chooseLocalGuideAnswer(message) {
    return window.PortfolioAnswers?.findAnswer(message) || window.PortfolioAnswers?.fallback || {
        answer: 'Browse the selected projects and GitHub repositories for verified engineering evidence.',
        sources: [{ label: 'Selected software projects', url: '/projects.html' }]
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
                    <button type="button" data-guide-question="What software development experience does Marsharine have?">Development experience</button>
                </div>
                <form class="guide-form" id="guide-form">
                    <label class="visually-hidden" for="guide-question">Ask a question about Marsharine’s portfolio</label>
                    <input id="guide-question" name="question" type="text" maxlength="500" autocomplete="off" placeholder="Ask about projects, skills, or experience…" required>
                    <button class="button button-primary button-small" type="submit">Ask</button>
                </form>
                <div class="guide-footer">
                    <p class="guide-status" id="guide-status">Verified answers work even when the optional live model is unavailable.</p>
                    <button class="guide-close-action" type="button" data-close-dialog>Close chat</button>
                </div>
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
