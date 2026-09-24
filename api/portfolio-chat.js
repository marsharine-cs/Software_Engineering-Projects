const WINDOW_MS = 60_000;
const MAX_REQUESTS = 8;
const requestWindows = new Map();

const portfolioFacts = `
Marsharine A. Simpson is a software developer building user-focused web applications.
Primary skills demonstrated in deployed work: React, TypeScript, JavaScript, HTML5, CSS3, Supabase, PostgreSQL, authentication, Row Level Security, CRUD, Vitest, React Testing Library, accessibility, Git, GitHub Issues, feature branches, pull requests, and Vercel deployment.

Student Progress Tracker is the strongest full-stack project. It is a React and TypeScript application using Supabase/PostgreSQL. It includes authentication, password recovery, protected access, Row Level Security, CRUD for students and skills, dated assessment history, dashboard logic that determines the latest mastery status for every student-and-skill pair, automated component tests, and production debugging. Case study: /case-studies/student-progress-tracker.html. Source: https://github.com/marsharine-cs/student-progress-tracker. Live app: https://student-progress-tracker-sepia.vercel.app.

AI Development Field Guide is an interactive JavaScript technical reference with content search, keyboard shortcuts, responsive navigation, expandable sections, glossary, reading progress, theme persistence through local storage, and accessibility-conscious behavior. Case study: /case-studies/ai-development-field-guide.html. Live app: https://ai-development-field-guide.vercel.app/.

Luma One is a product-focused JavaScript frontend with centralized interface state, product-finish selection, validated quantity controls, demonstration cart behavior, mobile navigation, expandable FAQs, accessible feedback, responsive design, and original CSS-created product artwork. Case study: /case-studies/luma-one.html. Live app: https://luma-one-product-landing.vercel.app/.

Marsharine has a Bachelor of Science in Information Technology and Security and experience spanning technical support, SaaS, telecommunications technology, AI evaluation, computer science education, and curriculum development. That background supports systematic troubleshooting, clear communication, documentation, accessibility awareness, and user-centered development.

Portfolio: https://projectsportfolio-nine.vercel.app/. GitHub: https://github.com/marsharine-cs. Resume: https://projectsportfolio-nine.vercel.app/assets/Marsharine-Simpson-Software-Developer-Resume.pdf.
`;

function getClientId(req) {
    const forwarded = req.headers['x-forwarded-for'];
    return String(Array.isArray(forwarded) ? forwarded[0] : forwarded || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
}

function isRateLimited(clientId) {
    const now = Date.now();
    const recent = (requestWindows.get(clientId) || []).filter((time) => now - time < WINDOW_MS);
    recent.push(now);
    requestWindows.set(clientId, recent);
    return recent.length > MAX_REQUESTS;
}

function extractOutputText(response) {
    return (response.output || [])
        .flatMap((item) => item.content || [])
        .filter((content) => content.type === 'output_text' && typeof content.text === 'string')
        .map((content) => content.text)
        .join('\n')
        .trim();
}

function selectSources(message) {
    const text = message.toLowerCase();
    if (/student|full.?stack|supabase|database|auth|test|security/.test(text)) {
        return [{ label: 'Student Progress Tracker case study', url: '/case-studies/student-progress-tracker.html' }];
    }
    if (/field guide|documentation|search|ai literacy/.test(text)) {
        return [{ label: 'AI Development Field Guide case study', url: '/case-studies/ai-development-field-guide.html' }];
    }
    if (/luma|frontend|product|javascript|state/.test(text)) {
        return [{ label: 'Luma One case study', url: '/case-studies/luma-one.html' }];
    }
    if (/background|education|experience|communicat|troubleshoot/.test(text)) {
        return [{ label: 'About Marsharine', url: '/about.html' }];
    }
    return [
        { label: 'Selected projects', url: '/projects.html' },
        { label: 'GitHub profile', url: 'https://github.com/marsharine-cs' }
    ];
}

module.exports = async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed.' });
    }

    if (isRateLimited(getClientId(req))) {
        return res.status(429).json({ error: 'Please wait a minute before asking another question.' });
    }

    const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
    if (!message || message.length > 500) {
        return res.status(400).json({ error: 'Ask a question between 1 and 500 characters.' });
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(503).json({ error: 'The live model is not configured.' });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/responses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: process.env.OPENAI_MODEL || 'gpt-5-mini',
                store: false,
                max_output_tokens: 350,
                instructions: `You are Marsharine A. Simpson's portfolio guide. Answer only from the verified portfolio facts below. Be concise, professional, and specific. Do not invent employers, dates, metrics, skills, or project features. If the facts do not answer the question, say that the portfolio does not provide that detail and direct the visitor to the resume or GitHub. Do not claim to be Marsharine. Do not output HTML.\n\nVERIFIED FACTS:\n${portfolioFacts}`,
                input: message
            })
        });

        const data = await response.json();
        if (!response.ok) {
            console.error('OpenAI Responses API error', response.status, data?.error?.type || 'unknown');
            return res.status(502).json({ error: 'The live guide is temporarily unavailable.' });
        }

        const answer = extractOutputText(data);
        if (!answer) return res.status(502).json({ error: 'The live guide returned no answer.' });

        return res.status(200).json({ answer, sources: selectSources(message) });
    } catch (error) {
        console.error('Portfolio guide request failed', error?.message || error);
        return res.status(502).json({ error: 'The live guide is temporarily unavailable.' });
    }
};
