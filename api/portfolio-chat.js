const WINDOW_MS = 60_000;
const MAX_REQUESTS = 8;
const requestWindows = new Map();
const portfolioAnswers = require('../data/portfolio-answers.js');

const portfolioFacts = portfolioAnswers.promptFacts();

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

module.exports = async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed.' });
    }

    const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
    if (!message || message.length > 500) {
        return res.status(400).json({ error: 'Ask a question between 1 and 500 characters.' });
    }

    const verifiedAnswer = portfolioAnswers.findAnswer(message);
    if (verifiedAnswer) {
        return res.status(200).json({
            answer: verifiedAnswer.answer,
            sources: verifiedAnswer.sources
        });
    }

    if (isRateLimited(getClientId(req))) {
        return res.status(429).json({ error: 'Please wait a minute before asking another question.' });
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
                instructions: `You are Marsharine A. Simpson's portfolio guide. Answer only from the verified portfolio facts below. Be concise, professional, and specific. For questions about developer or software-development experience, lead with concrete shipped projects, technologies, engineering decisions, testing, CI, security, and deployment evidence before discussing her broader professional background. Do not invent employers, dates, metrics, skills, or project features. If the facts do not answer the question, say that the portfolio does not provide that detail and direct the visitor to the resume or GitHub. Do not claim to be Marsharine. Do not output HTML.\n\nVERIFIED FACTS:\n${portfolioFacts}`,
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

        return res.status(200).json({ answer, sources: portfolioAnswers.fallback.sources });
    } catch (error) {
        console.error('Portfolio guide request failed', error?.message || error);
        return res.status(502).json({ error: 'The live guide is temporarily unavailable.' });
    }
};
