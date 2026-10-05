const WINDOW_MS = 60_000;
const MAX_REQUESTS = 8;
const requestWindows = new Map();
const portfolioAnswers = require('../data/portfolio-answers.js');

const portfolioFacts = portfolioAnswers.promptFacts();
const INTENTS = portfolioAnswers.intents;
const VALID_INTENTS = new Set(Object.values(INTENTS));

const GUIDE_INSTRUCTIONS = `You are Marsharine A. Simpson's portfolio guide for recruiters and hiring managers. Answer only from the verified portfolio facts below. Be concise, professional, specific, and recruiter-friendly.

Answer the visitor's actual question first. For developer or software-development questions, lead with concrete shipped projects, technologies, engineering decisions, testing, CI, security, and deployment evidence. For curriculum, instructional-design, teaching, STEM/CTE, EdTech, or technical-training questions, lead with the Python Foundations curriculum (grades 9–12, 7 units, 36 lessons, design approach, standards references, assessments, teacher materials, Python 3.12 verification) and her teaching experience, and explain how her technical background helps her translate complex concepts into structured, age-appropriate learning experiences. Do not push curriculum content into purely software questions, or software content into purely curriculum questions, unless it directly strengthens the answer.

Never invent employers, dates, metrics, student outcomes, adoption or usage numbers, clients, credentials, job titles, or project features. Describe standards only as references: do not claim CSTA certification, endorsement, or an authorized AP course. If the facts do not answer the question, say the portfolio does not provide that detail. Keep answers strictly professional: never discuss health, disability, benefits, family, finances, housing, or other personal matters. Do not mention or link résumés; the interface attaches the appropriate résumé. Do not claim to be Marsharine. Write plain text: short paragraphs separated by a blank line, and "- " bullets when listing. No HTML, headings, or tables.

Classify the question's intent as "curriculum_design" (curriculum, instructional design, teaching, pedagogy, lessons, standards, assessment design, differentiation, STEM/CTE, EdTech, technical training, education roles), "software_development" (software, engineering, code, technologies, projects), or "general".

VERIFIED FACTS:
${portfolioFacts}`;

const RESPONSE_FORMAT = {
    type: 'json_schema',
    name: 'portfolio_answer',
    strict: true,
    schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
            answer: { type: 'string' },
            intent: { type: 'string', enum: [INTENTS.CURRICULUM, INTENTS.SOFTWARE, INTENTS.GENERAL] }
        },
        required: ['answer', 'intent']
    }
};

function parseModelOutput(text) {
    try {
        const parsed = JSON.parse(text);
        if (parsed && typeof parsed.answer === 'string' && parsed.answer.trim()) {
            return { answer: parsed.answer.trim(), intent: VALID_INTENTS.has(parsed.intent) ? parsed.intent : null };
        }
    } catch {
        // Fall through: treat the output as plain text.
    }
    return { answer: text, intent: null };
}

function readLastIntent(body) {
    const value = body?.context?.lastIntent;
    return VALID_INTENTS.has(value) ? value : undefined;
}

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

    const lastIntent = readLastIntent(req.body);
    const verifiedAnswer = portfolioAnswers.findAnswer(message, { lastIntent });
    if (verifiedAnswer) {
        return res.status(200).json({
            answer: verifiedAnswer.answer,
            sources: verifiedAnswer.sources,
            actions: verifiedAnswer.actions || [],
            intent: verifiedAnswer.intent
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
                max_output_tokens: 900,
                instructions: GUIDE_INSTRUCTIONS,
                text: { format: RESPONSE_FORMAT },
                input: message
            })
        });

        const data = await response.json();
        if (!response.ok) {
            console.error('OpenAI Responses API error', response.status, data?.error?.type || 'unknown');
            return res.status(502).json({ error: 'The live guide is temporarily unavailable.' });
        }

        const output = extractOutputText(data);
        if (!output) return res.status(502).json({ error: 'The live guide returned no answer.' });

        const parsed = parseModelOutput(output);
        const keywordIntent = portfolioAnswers.classifyIntent(message);
        const intent = keywordIntent === INTENTS.CURRICULUM || parsed.intent === INTENTS.CURRICULUM
            ? INTENTS.CURRICULUM
            : (parsed.intent || keywordIntent);

        if (intent === INTENTS.CURRICULUM) {
            const curriculum = portfolioAnswers.curriculumContext();
            return res.status(200).json({
                answer: `${parsed.answer}\n\n${curriculum.offer}`,
                sources: curriculum.sources,
                actions: curriculum.actions,
                intent
            });
        }

        return res.status(200).json({ answer: parsed.answer, sources: portfolioAnswers.fallback.sources, actions: [], intent });
    } catch (error) {
        console.error('Portfolio guide request failed', error?.message || error);
        return res.status(502).json({ error: 'The live guide is temporarily unavailable.' });
    }
};
