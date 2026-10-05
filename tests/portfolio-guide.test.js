// Run with: node --test tests/portfolio-guide.test.js
const test = require('node:test');
const assert = require('node:assert/strict');
const guide = require('../data/portfolio-answers.js');
const handler = require('../api/portfolio-chat.js');

const CURRICULUM_RESUME = '/assets/Marsharine-Simpson-Curriculum-Designer-Resume.pdf';
const DEVELOPER_RESUME = '/assets/Marsharine-Simpson-Software-Developer-Resume.pdf';
const SAMPLE_LESSON = 'https://github.com/marsharine-cs/computer-science-secondary-curriculum/blob/main/intro-to-python-9-12/sample-lesson-1.3.md';

const hasAction = (result, url) => (result.actions || []).some((action) => action.url === url);
const hasSource = (result, url) => (result.sources || []).some((source) => source.url === url);

// Spec §8 — curriculum questions: curriculum intent, answer, and the résumé offered as an option.
const curriculumQuestions = {
    'What curriculum has Marsharine developed?': 'curriculum-overview',
    'Does she have instructional-design experience?': 'curriculum-instructional-design',
    'Does she have experience teaching computer science?': 'curriculum-teaching',
    'Can she develop STEM curriculum?': 'curriculum-stem-cte',
    'Does she have K–12 experience?': 'curriculum-teaching',
    'What grade levels has she worked with?': 'curriculum-teaching',
    'Does she have experience with standards alignment?': 'curriculum-standards',
    'Can she design assessments?': 'curriculum-assessment',
    'How does she approach differentiation?': 'curriculum-differentiation',
    'Can she write teacher-facing materials?': 'curriculum-teacher-materials',
    'Does she have Python curriculum experience?': 'curriculum-overview',
    'Can I see a sample lesson?': 'curriculum-sample-lesson',
    'Does she understand CSTA standards?': 'curriculum-standards',
    'What educational technology experience does she have?': 'curriculum-edtech',
    'How does her software-development background help her as a curriculum designer?': 'curriculum-software-advantage',
    'Can she design a complete course from learning objectives through assessment?': 'curriculum-instructional-design',
    "Tell me about Marsharine's curriculum development experience.": 'curriculum-overview',
    'Would she be a good fit for an instructional designer position?': 'curriculum-instructional-design'
};

for (const [question, expectedId] of Object.entries(curriculumQuestions)) {
    test(`curriculum: ${question}`, () => {
        const result = guide.findAnswer(question);
        assert.ok(result, 'expected a verified answer');
        assert.equal(result.id, expectedId);
        assert.equal(result.intent, 'curriculum_design');
        assert.ok(hasAction(result, CURRICULUM_RESUME), 'résumé offered as an action');
        assert.match(result.answer, /Curriculum Designer résumé/);
    });
}

test('sample lesson request links the public sample lesson', () => {
    const result = guide.findAnswer('Can I see an example of a lesson she designed?');
    assert.equal(result.id, 'curriculum-sample-lesson');
    assert.ok(hasSource(result, SAMPLE_LESSON));
    assert.ok(hasAction(result, CURRICULUM_RESUME));
});

// Spec §14 — explicit résumé requests.
for (const question of ['Show me her curriculum resume.', 'Can I see her Curriculum Designer résumé?']) {
    test(`explicit curriculum résumé: ${question}`, () => {
        const result = guide.findAnswer(question);
        assert.equal(result.id, 'curriculum-resume');
        assert.deepEqual(result.actions.map((a) => a.url), [CURRICULUM_RESUME]);
        assert.doesNotMatch(result.answer, /You can also view/);
    });
}

test('developer résumé request returns the developer résumé only', () => {
    const result = guide.findAnswer('Can I see her developer resume?');
    assert.deepEqual(result.actions.map((a) => a.url), [DEVELOPER_RESUME]);
});

test('generic résumé request follows the conversation context', () => {
    assert.deepEqual(guide.findAnswer('Can I see her résumé?', { lastIntent: 'curriculum_design' }).actions.map((a) => a.url), [CURRICULUM_RESUME]);
    assert.deepEqual(guide.findAnswer('Can I see her résumé?', { lastIntent: 'software_development' }).actions.map((a) => a.url), [DEVELOPER_RESUME, CURRICULUM_RESUME]);
});

// Spec §14 — software questions must not push the Curriculum Designer résumé.
const softwareQuestions = {
    'Does she know React?': 'technical-stack',
    'What software projects has she built?': 'software-projects',
    "What is Marsharine's strongest project?": 'strongest-project',
    'What testing and quality evidence is shown?': 'testing-quality',
    'What software development experience does Marsharine have?': 'development-experience',
    'How does the Student Progress Tracker help teachers track assessments?': 'strongest-project'
};

for (const [question, expectedId] of Object.entries(softwareQuestions)) {
    test(`software: ${question}`, () => {
        const result = guide.findAnswer(question);
        assert.ok(result, 'expected a verified answer');
        assert.equal(result.id, expectedId);
        assert.notEqual(result.intent, 'curriculum_design');
        assert.ok(!hasAction(result, CURRICULUM_RESUME), 'curriculum résumé must not be pushed');
        assert.doesNotMatch(result.answer, /Curriculum Designer résumé/);
    });
}

test('software project answer does not force curriculum content', () => {
    assert.doesNotMatch(guide.findAnswer('What software projects has she built?').answer, /curricul/i);
});

// Spec §12–13 — guardrails on the facts the live model sees.
test('verified facts contain no sensitive personal topics', () => {
    const facts = guide.promptFacts();
    for (const pattern of [/disabilit/i, /\bssdi\b/i, /social security/i, /\bhealth\b/i, /medical/i, /housing/i, /benefits/i]) {
        assert.doesNotMatch(facts, pattern);
    }
});

test('curriculum facts never claim endorsement or outcomes', () => {
    const facts = guide.curriculumAnswers.map((entry) => entry.answer).join('\n');
    assert.doesNotMatch(facts, /(?<!not )endorsed by|(?<!not )certified by|adopted by|used by \d|\d+% |improved (scores|achievement)/i);
});

// Live-model path, with the OpenAI call mocked.
function mockResponse() {
    const res = { statusCode: 200, headers: {}, body: null };
    res.setHeader = (key, value) => { res.headers[key] = value; };
    res.status = (code) => { res.statusCode = code; return res; };
    res.json = (body) => { res.body = body; return res; };
    return res;
}

async function callLive(message, modelPayload) {
    const originalFetch = global.fetch;
    const originalKey = process.env.OPENAI_API_KEY;
    let requestBody = null;
    process.env.OPENAI_API_KEY = 'test-key';
    global.fetch = async (_url, init) => {
        requestBody = JSON.parse(init.body);
        return { ok: true, json: async () => ({ output: [{ content: [{ type: 'output_text', text: JSON.stringify(modelPayload) }] }] }) };
    };
    try {
        const res = mockResponse();
        await handler({ method: 'POST', body: { message }, headers: { 'x-forwarded-for': `10.0.0.${Math.floor(Math.random() * 250)}` }, socket: {} }, res);
        return { res, requestBody };
    } finally {
        global.fetch = originalFetch;
        if (originalKey === undefined) delete process.env.OPENAI_API_KEY; else process.env.OPENAI_API_KEY = originalKey;
    }
}

test('live model: semantically curriculum answer gets the résumé offer', async () => {
    const { res, requestBody } = await callLive('How would she build onboarding modules for new coders?', { answer: 'She structures learning from objectives through practice.', intent: 'curriculum_design' });
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.intent, 'curriculum_design');
    assert.ok(hasAction(res.body, CURRICULUM_RESUME));
    assert.match(res.body.answer, /Curriculum Designer résumé/);
    assert.equal(requestBody.text.format.type, 'json_schema');
    assert.match(requestBody.instructions, /Python Foundations, a standards-referenced/);
});

test('live model: software answer does not get the curriculum résumé', async () => {
    const { res } = await callLive('Has she worked with GraphQL?', { answer: 'The portfolio does not provide that detail.', intent: 'software_development' });
    assert.equal(res.body.intent, 'software_development');
    assert.deepEqual(res.body.actions, []);
    assert.doesNotMatch(res.body.answer, /résumé/);
});

test('live model: plain-text output still works', async () => {
    const { res } = await callLive('Has she worked with GraphQL?', 'not json');
    assert.equal(res.statusCode, 200);
    assert.ok(res.body.answer.length > 0);
});

test('API passes conversation context to résumé routing', async () => {
    const res = mockResponse();
    await handler({ method: 'POST', body: { message: 'Can I see her résumé?', context: { lastIntent: 'curriculum_design' } }, headers: {}, socket: {} }, res);
    assert.deepEqual(res.body.actions.map((a) => a.url), [CURRICULUM_RESUME]);
});
