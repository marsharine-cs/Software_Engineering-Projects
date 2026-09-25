(function attachPortfolioAnswers(root, factory) {
    const library = factory();
    if (typeof module === 'object' && module.exports) module.exports = library;
    else root.PortfolioAnswers = library;
}(typeof globalThis !== 'undefined' ? globalThis : this, function createPortfolioAnswers() {
    const PROJECTS = { label: 'Selected software projects', url: '/projects.html' };
    const TRACKER_CASE_STUDY = { label: 'Student Progress Tracker case study', url: '/case-studies/student-progress-tracker.html' };
    const TRACKER_SOURCE = { label: 'Student Progress Tracker source', url: 'https://github.com/marsharine-cs/student-progress-tracker' };
    const PLATFORM_SOURCE = { label: 'Secure Service Operations Platform source', url: 'https://github.com/marsharine-cs/secure-service-operations-platform' };
    const GITHUB = { label: 'GitHub profile', url: 'https://github.com/marsharine-cs' };
    const ABOUT = { label: 'Professional background', url: '/about.html' };
    const RESUME = { label: 'Developer résumé', url: '/assets/Marsharine-Simpson-Software-Developer-Resume.pdf' };

    const answers = [
        {
            id: 'development-experience',
            question: 'What software development experience does Marsharine have?',
            patterns: [/^\s*(developer|software development|software developer|software engineering)\s*\??\s*$/i, /software\s+(development|developer|engineering)\s+experience/i, /developer\s+experience/i, /development\s+experience/i, /coding\s+experience/i, /programming\s+experience/i],
            answer: 'Marsharine’s software-development experience is demonstrated through shipped projects. She designed and deployed the Student Progress Tracker with React, TypeScript, Supabase/PostgreSQL, authentication, tenant-aware Row Level Security, relational CRUD workflows, dashboard logic, 25 unit and component tests, Playwright browser smoke tests, GitHub Actions, and production debugging. Her frontend work also includes the AI Development Field Guide and Luma One. She is currently building the Secure Service Operations Platform as her next production-focused project.',
            sources: [PROJECTS, TRACKER_CASE_STUDY, GITHUB]
        },
        {
            id: 'strongest-project',
            question: 'What is Marsharine’s strongest project?',
            patterns: [/strongest/i, /best project/i, /flagship/i, /full.?stack project/i, /student progress tracker/i],
            answer: 'The strongest full-stack evidence is the Student Progress Tracker. Marsharine took it from a teacher workflow problem to a deployed React and TypeScript application backed by Supabase/PostgreSQL. It includes authentication, password recovery, tenant-aware data constraints, Row Level Security, relational CRUD workflows, dated assessment history, dashboard logic, 25 unit and component tests, Playwright browser smoke tests, CI checks, and documented production debugging.',
            sources: [TRACKER_CASE_STUDY, TRACKER_SOURCE]
        },
        {
            id: 'project-ownership',
            question: 'What did Marsharine personally build?',
            patterns: [/personally (build|create|implement)/i, /your contribution/i, /her contribution/i, /what did (she|marsharine) (build|do|implement)/i, /project ownership/i],
            answer: 'Marsharine independently designed and implemented the portfolio projects presented here. For the Student Progress Tracker, that includes requirements, the React and TypeScript interface, Supabase integration, relational data model, authentication and recovery flows, CRUD features, mastery-dashboard logic, accessibility improvements, automated tests, GitHub Actions, deployment, and production debugging. The repositories and case studies show the implementation and decisions directly.',
            sources: [TRACKER_CASE_STUDY, TRACKER_SOURCE, GITHUB]
        },
        {
            id: 'testing-quality',
            question: 'What testing and quality experience does she have?',
            patterns: [/\btest/i, /quality/i, /vitest/i, /reliable/i, /regression/i, /continuous integration/i, /\bci\b/i],
            answer: 'The Student Progress Tracker has 25 Vitest and React Testing Library tests covering authentication, password recovery, forms, database-error states, assessment recording, dashboard logic, accessible status presentation, and tenant-boundary schema safeguards. Playwright adds Chromium smoke tests for the public authentication experience. GitHub Actions runs linting, both test layers, and the production build before merge.',
            sources: [TRACKER_CASE_STUDY, TRACKER_SOURCE]
        },
        {
            id: 'security',
            question: 'How does she approach application security?',
            patterns: [/secur/i, /authentication/i, /authorization/i, /row level/i, /\brls\b/i, /tenant/i, /data isolation/i],
            answer: 'Her strongest implemented security evidence is in the Student Progress Tracker: Supabase authentication, password recovery, protected application access, Row Level Security, owner-scoped records, and composite database constraints that prevent cross-account student or skill references. Her B.S. in Information Technology and Security also strengthens how she thinks about access boundaries and failure cases.',
            sources: [TRACKER_CASE_STUDY, TRACKER_SOURCE, RESUME]
        },
        {
            id: 'database-backend',
            question: 'What backend and database experience does she have?',
            patterns: [/backend/i, /back.?end/i, /database/i, /postgres/i, /supabase/i, /relational/i, /\bcrud\b/i, /data model/i],
            answer: 'Marsharine has implemented Supabase/PostgreSQL data flows for students, skills, and dated assessments. She designed relational CRUD workflows, preserved assessment history, derived the latest status for each student-and-skill pair, enforced user ownership with Row Level Security, and added tenant-aware foreign-key constraints. This is project-based full-stack experience rather than a claim of prior employment as a backend engineer.',
            sources: [TRACKER_CASE_STUDY, TRACKER_SOURCE]
        },
        {
            id: 'debugging',
            question: 'How does Marsharine approach debugging?',
            patterns: [/debug/i, /troubleshoot/i, /fix (a |the )?(bug|problem|issue)/i, /problem.solv/i, /investigat/i],
            answer: 'Marsharine approaches debugging systematically: reproduce the behavior, isolate the failing layer, inspect data and state, test the smallest credible fix, run regression checks, and document the result. That method is visible in her production work and is reinforced by years of technical-support and SaaS troubleshooting experience, where clear reproduction steps and communication matter.',
            sources: [TRACKER_CASE_STUDY, ABOUT, RESUME]
        },
        {
            id: 'accessibility',
            question: 'What accessibility experience does she have?',
            patterns: [/accessib/i, /keyboard/i, /screen reader/i, /aria/i, /inclusive/i, /wcag/i],
            answer: 'Accessibility is implemented across her work through visible labels, keyboard-operable controls, focus states, semantic structure, reduced-motion support, accessible dialogs, status text that does not depend on color alone, and screen-reader labels for dashboard data. She also added regression coverage for important accessible behaviors in the Student Progress Tracker.',
            sources: [TRACKER_CASE_STUDY, PROJECTS]
        },
        {
            id: 'workflow-team',
            question: 'How prepared is she to work on a software team?',
            patterns: [/team/i, /collaborat/i, /workflow/i, /pull request/i, /code review/i, /git flow/i, /agile/i],
            answer: 'Her repositories demonstrate team-ready delivery habits: scoped GitHub Issues, feature branches, focused pull requests, CI checks, documented architecture decisions, and incremental verification. Her support, education, and AI-evaluation background adds experience communicating technical findings and working from detailed standards. Her showcased applications are independently built, so she presents this as readiness for a professional engineering team—not as prior employment on a large software team.',
            sources: [GITHUB, TRACKER_SOURCE, RESUME]
        },
        {
            id: 'current-work',
            question: 'What is she building now?',
            patterns: [/currently building/i, /building now/i, /current project/i, /working on now/i, /next project/i, /secure service/i],
            answer: 'Marsharine is currently building the Secure Service Operations Platform, a production-focused TypeScript, NestJS, PostgreSQL, and Docker project. The repository currently contains the product requirements, service boundaries, threat model, architecture decisions, delivery standards, and issue-based roadmap. It is correctly presented as in development; completed features will be added to the portfolio only after they are implemented and verified.',
            sources: [PLATFORM_SOURCE, GITHUB]
        },
        {
            id: 'background-value',
            question: 'How does her background strengthen her development work?',
            patterns: [/background/i, /prior experience/i, /technical support/i, /saas experience/i, /education experience/i, /teacher/i, /communicat/i],
            answer: 'Marsharine brings a B.S. in Information Technology and Security plus experience in technical support, SaaS, telecommunications technology, AI evaluation, and computer science education. That combination strengthens systematic troubleshooting, requirements clarification, documentation, accessibility awareness, user empathy, and the ability to explain technical decisions clearly.',
            sources: [ABOUT, RESUME]
        },
        {
            id: 'why-interview',
            question: 'Why should we interview Marsharine?',
            patterns: [/why (should|would).*(interview|hire)/i, /reason to (interview|hire)/i, /good candidate/i, /stand out/i, /value.*bring/i],
            answer: 'Marsharine merits an interview because the portfolio shows more than course exercises: a deployed full-stack application, relational data modeling, authentication and tenant safeguards, 25 unit and component tests, Playwright browser checks, CI, accessible interface decisions, and documented production troubleshooting. She also brings mature communication and user-support experience. The interview should test how she reasons through unfamiliar engineering problems and how quickly she can contribute within an experienced team.',
            sources: [PROJECTS, TRACKER_CASE_STUDY, RESUME]
        },
        {
            id: 'role-fit',
            question: 'What software role is she seeking?',
            patterns: [/role.*(seek|look|target|want)/i, /position.*(seek|look|target|want)/i, /what kind of (role|job)/i, /role fit/i],
            answer: 'She is targeting software developer and frontend/full-stack opportunities where she can contribute with React, TypeScript, JavaScript, PostgreSQL, testing, accessibility, debugging, and clear technical communication. She is especially credible for teams that value user-centered development and engineers who can bridge technical implementation with real operational needs.',
            sources: [RESUME, PROJECTS]
        },
        {
            id: 'technical-stack',
            question: 'What is her technical stack?',
            patterns: [/tech(nical)? stack/i, /\bskills?\b/i, /technolog/i, /\btools?\b/i, /react/i, /typescript/i, /javascript/i],
            answer: 'Her demonstrated stack includes React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Supabase, PostgreSQL, authentication, Row Level Security, relational CRUD, Vitest, React Testing Library, Playwright, ESLint, GitHub Actions, Git, and Vercel. The current Secure Service Operations Platform adds planned work with NestJS and Docker as implementation progresses.',
            sources: [PROJECTS, GITHUB, RESUME]
        },
        {
            id: 'frontend',
            question: 'What frontend experience does she have?',
            patterns: [/front.?end/i, /responsive/i, /user interface/i, /\bui\b/i, /luma/i, /field guide/i],
            answer: 'Her frontend evidence includes the Student Progress Tracker’s React/TypeScript workflows, Luma One’s centralized JavaScript interface state and validated controls, and the AI Development Field Guide’s search, keyboard interaction, persistent preferences, reading progress, and responsive navigation. Across the portfolio she emphasizes accessible, responsive interfaces and understandable user feedback.',
            sources: [PROJECTS, TRACKER_CASE_STUDY]
        },
        {
            id: 'education',
            question: 'What is her education?',
            patterns: [/education/i, /degree/i, /college/i, /university/i, /qualification/i],
            answer: 'Marsharine earned a Bachelor of Science in Information Technology and Security from the University of Phoenix, graduating Cum Laude. The degree supports her foundation in systems, security, and technical problem-solving; the portfolio provides the current evidence of her software-development skills.',
            sources: [RESUME, ABOUT]
        },
        {
            id: 'contact',
            question: 'Where can I review her work or contact her?',
            patterns: [/résumé/i, /resume/i, /contact/i, /github/i, /reach/i, /review.*code/i, /source code/i],
            answer: 'You can review Marsharine’s selected projects, case studies, live applications, GitHub repositories, and developer résumé directly from this portfolio. GitHub and the résumé are the primary professional links for software-development opportunities.',
            sources: [PROJECTS, GITHUB, RESUME]
        }
    ];

    const fallback = {
        id: 'fallback',
        answer: 'I can help evaluate Marsharine’s software-development experience, strongest project, personal contributions, technical stack, testing, security, databases, debugging, accessibility, workflow, current project, role fit, or reasons to interview her. Ask one of those questions, or use a suggested prompt.',
        sources: [PROJECTS, GITHUB]
    };

    function findAnswer(message) {
        const text = String(message || '').trim();
        if (!text) return fallback;
        return answers.find((entry) => entry.patterns.some((pattern) => pattern.test(text))) || null;
    }

    function promptFacts() {
        return answers.map((entry) => `${entry.question}\n${entry.answer}`).join('\n\n');
    }

    return { answers, fallback, findAnswer, promptFacts };
}));
