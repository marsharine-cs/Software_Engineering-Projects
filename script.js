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

initializeDialog(
    document.querySelector('#curriculum-recruiter-dialog'),
    [...document.querySelectorAll('[data-open-curriculum-recruiter]')]
);

function chooseLocalGuideAnswer(message, context) {
    return window.PortfolioAnswers?.findAnswer(message, context) || window.PortfolioAnswers?.fallback || {
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
                    <div class="guide-message guide-message-assistant">What would you like to evaluate? Try the strongest project, technical stack, testing, security, curriculum design, teaching experience, or professional background.</div>
                </div>
                <div class="guide-prompts" aria-label="Suggested questions">
                    <button type="button" data-guide-question="What is Marsharine's strongest project?">Strongest project</button>
                    <button type="button" data-guide-question="What testing and quality evidence is shown?">Testing evidence</button>
                    <button type="button" data-guide-question="What software development experience does Marsharine have?">Development experience</button>
                    <button type="button" data-guide-question="What curriculum has Marsharine developed?">Curriculum design</button>
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

function isSafeUrl(url) {
    return /^https:\/\//.test(url) || /^\/(?!\/)/.test(url);
}

function appendInlineText(parent, text) {
    const linkPattern = /\[([^\]]+)\]\(([^)\s]+)\)|(https:\/\/[^\s)]+)/g;
    let lastIndex = 0;
    let match;
    while ((match = linkPattern.exec(text)) !== null) {
        if (match.index > lastIndex) parent.append(document.createTextNode(text.slice(lastIndex, match.index)));
        const label = match[1] || match[3];
        const url = (match[2] || match[3]).replace(/[.,;:]+$/, '');
        if (isSafeUrl(url)) {
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.textContent = label;
            if (/^https:/.test(url)) {
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
            }
            parent.append(anchor);
        } else {
            parent.append(document.createTextNode(match[0]));
        }
        lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) parent.append(document.createTextNode(text.slice(lastIndex)));
}

function renderAnswerText(container, content) {
    const blocks = String(content || '').split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
    blocks.forEach((block) => {
        const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
        let list = null;
        let paragraph = null;
        lines.forEach((line) => {
            const bulletMatch = line.match(/^(?:[-•*]|\d+[.)])\s+(.*)$/);
            if (bulletMatch) {
                if (!list) {
                    list = document.createElement('ul');
                    container.append(list);
                }
                paragraph = null;
                const item = document.createElement('li');
                appendInlineText(item, bulletMatch[1]);
                list.append(item);
            } else {
                list = null;
                if (!paragraph) {
                    paragraph = document.createElement('p');
                    container.append(paragraph);
                } else {
                    paragraph.append(document.createTextNode(' '));
                }
                appendInlineText(paragraph, line);
            }
        });
    });
}

function actionMarkup(actions) {
    const wrapper = document.createElement('div');
    wrapper.className = 'guide-actions';
    actions.filter((action) => action && isSafeUrl(action.url)).forEach((action) => {
        const anchor = document.createElement('a');
        anchor.className = 'guide-action';
        anchor.href = action.url;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        anchor.textContent = `${action.label} ↗`;
        wrapper.append(anchor);
    });
    return wrapper.children.length ? wrapper : null;
}

function addGuideMessage(container, kind, content, sources = [], actions = []) {
    const message = document.createElement('div');
    message.className = `guide-message guide-message-${kind}`;

    if (kind === 'user') {
        const text = document.createElement('p');
        text.textContent = content;
        message.append(text);
    } else {
        renderAnswerText(message, content);
    }

    if (actions?.length) {
        const actionRow = actionMarkup(actions);
        if (actionRow) message.append(actionRow);
    }

    if (sources?.length) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = sourceMarkup(sources);
        message.append(...wrapper.children);
    }

    container.append(message);
    container.scrollTop = container.scrollHeight;
}

const guideConversation = { lastIntent: undefined };

async function askPortfolioGuide(question, messages, status) {
    status.textContent = 'Checking verified portfolio evidence…';
    const context = { lastIntent: guideConversation.lastIntent };

    try {
        const response = await fetch('/api/portfolio-chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: question, context })
        });

        if (!response.ok) throw new Error('Live guide unavailable');
        const result = await response.json();
        addGuideMessage(messages, 'assistant', result.answer, result.sources, result.actions);
        if (result.intent && result.intent !== 'general') guideConversation.lastIntent = result.intent;
        status.textContent = 'Answer generated from the verified portfolio evidence set.';
    } catch {
        const fallback = chooseLocalGuideAnswer(question, context);
        addGuideMessage(messages, 'assistant', fallback.answer, fallback.sources, fallback.actions);
        if (fallback.intent && fallback.intent !== 'general') guideConversation.lastIntent = fallback.intent;
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
