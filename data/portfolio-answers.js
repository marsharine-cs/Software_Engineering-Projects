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
    const CURRICULUM_CASE_STUDY = { label: 'Python Foundations curriculum case study', url: '/case-studies/python-foundations-curriculum.html' };
    const SAMPLE_LESSON = { label: 'Sample Lesson 1.3', url: 'https://github.com/marsharine-cs/computer-science-secondary-curriculum/blob/main/intro-to-python-9-12/sample-lesson-1.3.md' };
    const SCOPE_SEQUENCE = { label: 'Scope & sequence', url: 'https://github.com/marsharine-cs/computer-science-secondary-curriculum/blob/main/intro-to-python-9-12/scope-and-sequence.md' };
    const CURRICULUM_OVERVIEW = { label: 'Curriculum overview', url: 'https://github.com/marsharine-cs/computer-science-secondary-curriculum/tree/main/intro-to-python-9-12' };
    const CURRICULUM_REPO = { label: 'Curriculum GitHub repository', url: 'https://github.com/marsharine-cs/computer-science-secondary-curriculum' };
    const CURRICULUM_RESUME = { label: 'Curriculum Designer résumé', url: '/assets/Marsharine-Simpson-Curriculum-Designer-Resume.pdf' };
    const FIELD_GUIDE_CASE_STUDY = { label: 'AI Development Field Guide case study', url: '/case-studies/ai-development-field-guide.html' };

    const INTENT_CURRICULUM = 'curriculum_design';
    const INTENT_SOFTWARE = 'software_development';
    const INTENT_GENERAL = 'general';

    const CURRICULUM_RESUME_ACTION = { label: 'View Curriculum Designer Résumé', url: CURRICULUM_RESUME.url, kind: 'resume' };
    const DEVELOPER_RESUME_ACTION = { label: 'View Developer Résumé', url: RESUME.url, kind: 'resume' };
    const CURRICULUM_RESUME_OFFER = 'You can also view Marsharine’s Curriculum Designer résumé for a more complete overview of her curriculum-development, teaching, EdTech, and technical experience.';

    const answers = [
        {
            id: 'software-projects',
            question: 'What software projects has Marsharine built?',
            patterns: [/software projects?/i, /(apps?|applications?|projects?)\s+(has|did)\s+(she|marsharine)\s+(built|build|made|make|shipped|ship|created|create)/i, /what (has|did) (she|marsharine) (built|build|shipped|ship|made)/i, /(engineering|development|coding|portfolio) projects/i],
            answer: 'Marsharine’s software projects include:\n\n- Student Progress Tracker — a deployed React, TypeScript, and Supabase/PostgreSQL application with authentication, Row Level Security, relational CRUD workflows, dashboard logic, 27 unit and component tests, Playwright browser checks, and CI.\n- AI Development Field Guide — a searchable, accessible JavaScript technical reference with keyboard interaction, persistent preferences, reading progress, and responsive navigation.\n- Luma One — an interactive storefront with product customization, cart state, and accessible feedback.\n- Supporting projects: a JavaScript Knowledge Quiz, an Interactive Balance Sheet, an Ada Lovelace digital-history experience, and a Palindrome Checker.\n\nShe is currently building the Secure Service Operations Platform with TypeScript, NestJS, PostgreSQL, and Docker.',
            sources: [PROJECTS, TRACKER_CASE_STUDY, GITHUB]
        },
        {
            id: 'development-experience',
            question: 'What software development experience does Marsharine have?',
            patterns: [/^\s*(developer|software development|software developer|software engineering)\s*\??\s*$/i, /software\s+(development|developer|engineering)\s+experience/i, /developer\s+experience/i, /development\s+experience/i, /coding\s+experience/i, /programming\s+experience/i],
            answer: 'Marsharine’s software-development experience is demonstrated through shipped projects. She designed and deployed the Student Progress Tracker with React, TypeScript, Supabase/PostgreSQL, authentication, tenant-aware Row Level Security, relational CRUD workflows, dashboard logic, 27 unit and component tests, Playwright browser smoke tests, GitHub Actions, and production debugging. Her frontend work also includes the AI Development Field Guide and Luma One. She is currently building the Secure Service Operations Platform as her next production-focused project.',
            sources: [PROJECTS, TRACKER_CASE_STUDY, GITHUB]
        },
        {
            id: 'strongest-project',
            question: 'What is Marsharine’s strongest project?',
            patterns: [/strongest/i, /best project/i, /flagship/i, /full.?stack project/i, /student progress tracker/i],
            answer: 'The strongest full-stack evidence is the Student Progress Tracker. Marsharine took it from a teacher workflow problem to a deployed React and TypeScript application backed by Supabase/PostgreSQL. It includes authentication, password recovery, tenant-aware data constraints, Row Level Security, relational CRUD workflows, dated assessment history, dashboard logic, 27 unit and component tests, Playwright browser smoke tests, CI checks, and documented production debugging.',
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
            answer: 'The Student Progress Tracker has 27 Vitest and React Testing Library tests covering authentication, password recovery, forms, database-error states, assessment recording, dashboard logic, accessible status presentation, and tenant-boundary schema safeguards. Playwright adds Chromium smoke tests for the public authentication experience. GitHub Actions runs linting, both test layers, and the production build before merge.',
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
            answer: 'Marsharine merits an interview because the portfolio shows more than course exercises: a deployed full-stack application, relational data modeling, authentication and tenant safeguards, 27 unit and component tests, Playwright browser checks, CI, accessible interface decisions, and documented production troubleshooting. She also brings mature communication and user-support experience. The interview should test how she reasons through unfamiliar engineering problems and how quickly she can contribute within an experienced team.',
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
            answer: 'Marsharine earned a Bachelor of Science in Information Technology and Security from the University of Phoenix, graduating Cum Laude with a 3.5 GPA, and an Associate of Arts in Elementary Education and Teaching. She also holds a New Jersey Certificate of Eligibility in CTE Computer Science Technology (grades 9–12) and a Florida Statement of Eligibility in K–12 Computer Science.',
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

    const curriculumAnswers = [
        {
            id: 'curriculum-resume',
            question: 'Can I see her Curriculum Designer résumé?',
            patterns: [],
            answer: 'Here is Marsharine’s Curriculum Designer résumé. It covers her Python Foundations curriculum, teaching experience, teaching credentials, EdTech projects, and technical background.',
            sources: [CURRICULUM_CASE_STUDY, SAMPLE_LESSON],
            offerResume: false
        },
        {
            id: 'curriculum-sample-lesson',
            question: 'Can I see a sample lesson she designed?',
            patterns: [/sample lesson/i, /example (of )?(a |one of her )?lessons?/i, /lessons? (she|marsharine) (designed|wrote|created|developed|built)/i, /see (a|her|one of her) lessons?/i, /lesson plan example/i, /work samples?/i, /lesson 1\.3/i],
            answer: 'Yes. Her public flagship sample is Lesson 1.3, “Reading Errors as Information,” from the Python Foundations curriculum for grades 9–12. It teaches students to read a Python traceback before changing code, and it shows the full lesson design:\n\n- Learning objectives and vocabulary\n- Direct instruction and teacher modeling with real Python 3.12 error messages\n- Guided debugging practice and a student handout\n- An exit ticket with answer key\n- Differentiation guidance, teacher notes, and grades 6–8 adaptation notes\n\nThe public scope and sequence shows where the lesson fits in the 7-unit, 36-lesson course.',
            sources: [SAMPLE_LESSON, SCOPE_SEQUENCE, CURRICULUM_CASE_STUDY]
        },
        {
            id: 'curriculum-software-advantage',
            question: 'How does her software-development background help her as a curriculum designer?',
            patterns: [/(software|developer|development|technical|coding|programming|tech)[\w\s-]{0,30}(background|experience|skills?)[\w\s-]{0,40}(curricul|instructional|teach|education)/i, /(curricul|instructional|teach|education)[\w\s-]{0,40}(software|developer|technical|coding) (background|experience)/i],
            answer: 'Her development background lets her translate complex technical concepts into structured, age-appropriate learning experiences—and guarantee they are accurate. Because she writes and debugs code herself, she executed every code example and interpreter error message in her Python curriculum on Python 3.12 rather than writing them from memory, and she knows where beginners realistically get stuck (reading tracebacks, condition order, loop termination).\n\nShe can also build the tools that support teaching—like her Student Progress Tracker—and work fluently with Python, JavaScript, React, TypeScript, and web development when designing technical courses or training.',
            sources: [CURRICULUM_CASE_STUDY, TRACKER_CASE_STUDY]
        },
        {
            id: 'curriculum-instructional-design',
            question: 'Does she have instructional-design experience, and can she design a complete course?',
            patterns: [/instructional[\s-]*design/i, /good fit|right fit|strong fit|qualified|suited/i, /complete course|full course|entire course|course design|design a course|build a course/i, /learning objectives?/i, /\bpedagog/i, /backward design|\baddie\b/i],
            answer: 'Yes. Marsharine designed a complete course end to end: Python Foundations, 7 units and 36 lessons for grades 9–12. Her process runs from learning objective → skill decomposition → explicit instruction and modeling → guided practice → independent application → assessment and mastery.\n\nEvidence of instructional-design fit:\n\n- Scope-and-sequence development and measurable learning objectives\n- Scaffolded lessons, differentiation, and teacher-facing guidance\n- Assessment design, from exit tickets to rubrics and a capstone project\n- Standards-referenced design (CSTA K–12 and selected AP® CSP concepts)\n- Classroom and virtual teaching experience, plus the technical skill to verify every code example\n\nShe pairs this with EdTech software development, such as the Student Progress Tracker.',
            sources: [CURRICULUM_CASE_STUDY, SAMPLE_LESSON, SCOPE_SEQUENCE]
        },
        {
            id: 'curriculum-standards',
            question: 'Does she have experience with standards alignment?',
            patterns: [/\bcsta\b/i, /\bap\s*(csp|computer science)/i, /standards?/i, /\baligned\b|\balignment\b/i],
            answer: 'Yes. Her Python Foundations curriculum was designed with reference to the CSTA K–12 Computer Science Standards and selected concepts from the AP® Computer Science Principles framework, particularly Big Ideas 1 and 3. After CSTA published its 2026 PK–12 standards, she added a lesson-by-lesson remap to the new identifiers as part of the course’s quality-assurance process.\n\nShe presents the course accurately as standards-referenced: it has not received a CSTA Seal of Alignment, is not endorsed by CSTA or the College Board, and is not represented as a complete AP® course. Her classroom teaching has also used standards-aligned instruction.',
            sources: [SCOPE_SEQUENCE, CURRICULUM_CASE_STUDY]
        },
        {
            id: 'curriculum-assessment',
            question: 'Can she design assessments?',
            patterns: [/assess/i, /\bquiz/i, /rubric/i, /exit ticket/i, /mastery/i, /evaluate (student|learning)/i],
            answer: 'Yes. In her Python Foundations curriculum she designed an assessment system that checks whether students can apply concepts, reason about code, debug, and explain design decisions—not just recall vocabulary. It combines:\n\n- Brief formative checks and exit tickets tied to each lesson’s objectives\n- Coding practice and debugging tasks\n- Unit performance checkpoints with rubrics\n- Code review and explanation\n- Project-based assessment and a final capstone program\n\nIn her Edmentum instruction she also uses end-of-lesson mastery assessments to decide when a student is ready for the next skill. The public Sample Lesson 1.3 includes its exit ticket and answer key.',
            sources: [SAMPLE_LESSON, CURRICULUM_CASE_STUDY]
        },
        {
            id: 'curriculum-differentiation',
            question: 'How does she approach differentiation and scaffolding?',
            patterns: [/differentiat/i, /scaffold/i, /struggling|below grade level|intervention/i, /diverse learners|different (levels|learners)/i],
            answer: 'Marsharine scaffolds instruction so students never work independently on a skill they have not first seen modeled and practiced with support: explicit instruction and modeling, then guided practice with feedback, then independent application, then assessment.\n\nFor differentiation, she identifies specific learning gaps, adjusts instruction to each student’s readiness, and uses formative data to decide next steps—approaches she uses in small-group and individualized virtual instruction at Edmentum and used in her fifth-grade math and science classroom. Her Python curriculum builds this into the materials with differentiation guidance, teacher notes on common misconceptions, and grades 6–8 adaptation notes.',
            sources: [SAMPLE_LESSON, CURRICULUM_CASE_STUDY]
        },
        {
            id: 'curriculum-teacher-materials',
            question: 'Can she write teacher-facing materials?',
            patterns: [/teacher[\s-]*(facing|materials?|resources?|guides?|notes|support)/i, /lesson plans?/i, /student[\s-]*(facing|materials?|handouts?|workbooks?)/i, /answer keys?/i, /instructional materials?/i],
            answer: 'Yes. Her Python Foundations curriculum is built so another educator can understand, deliver, and adapt it. The complete course includes teacher lesson plans, instructional slides, student workbook materials, coding labs, exit tickets and quizzes, performance checkpoints, rubrics, answer keys, and worked solutions.\n\nTeacher notes explain common misconceptions, likely sticking points, the reasoning behind the sequence, expected output, and how to respond when students struggle, with pacing, differentiation, and grades 6–8 adaptation guidance. The full materials are maintained privately; Sample Lesson 1.3 shows the teacher-facing and student-facing format publicly.',
            sources: [SAMPLE_LESSON, CURRICULUM_CASE_STUDY]
        },
        {
            id: 'curriculum-teaching',
            question: 'What teaching experience does she have, and with which grade levels?',
            patterns: [/\bteach(ing|es)?\b/i, /\bk\s*[-–]\s*12\b/i, /grade levels?|grade bands?|\bgrades?\s*\d/i, /classroom/i, /\beducator\b/i, /tutor/i, /education(al)? experience/i],
            answer: 'Marsharine has instructional experience across elementary, middle, and high school contexts:\n\n- Educator, Edmentum (March 2025–present): small-group and individualized virtual instruction in mathematics, English language arts, and reading, using modeling, guided practice, targeted feedback, and end-of-lesson mastery checks to close learning gaps.\n- Educator, Charter Schools USA (2015–2016): standards-aligned, inquiry-based mathematics and science for fifth-grade students.\n- Secondary computer science: she designed the 7-unit, 36-lesson Python Foundations course for grades 9–12.\n\nHer elementary background also includes reading, phonics, science, and intervention. She holds a New Jersey Certificate of Eligibility in CTE Computer Science Technology (grades 9–12) and a Florida Statement of Eligibility in K–12 Computer Science.',
            sources: [CURRICULUM_CASE_STUDY, ABOUT]
        },
        {
            id: 'curriculum-edtech',
            question: 'What educational technology experience does she have?',
            patterns: [/ed\s*tech/i, /educational technology|instructional technology|learning technology/i, /\blms\b|learning management/i, /virtual instruction|online instruction/i],
            answer: 'Marsharine works on both sides of educational technology—designing the learning experience and building the software:\n\n- Student Progress Tracker: a deployed React, TypeScript, and Supabase application she built so teachers can record dated assessments and see each student’s current mastery by skill.\n- AI Development Field Guide: a searchable, accessible technical reference that turns dense AI concepts into a guided, self-directed learning experience.\n- Python Foundations: a browser-based grades 9–12 computer science curriculum that requires no local installation.\n\nShe also teaches through virtual instruction platforms at Edmentum and has experience with learning management systems and digital content creation.',
            sources: [TRACKER_CASE_STUDY, CURRICULUM_CASE_STUDY, FIELD_GUIDE_CASE_STUDY]
        },
        {
            id: 'curriculum-stem-cte',
            question: 'Can she develop STEM or CTE curriculum?',
            patterns: [/\bSTEM\b/, /stem (curricul|education|subjects?|instruction)/i, /\bCTE\b/, /career and technical/i, /technical training|training (materials|programs?|content)|corporate training/i],
            answer: 'Yes. Her strongest evidence is Python Foundations, a complete 7-unit, 36-lesson grades 9–12 computer science course with scope and sequence, objectives, scaffolded lessons, assessments, and teacher materials. She holds a New Jersey Certificate of Eligibility in CTE Computer Science Technology (grades 9–12) and a Florida Statement of Eligibility in K–12 Computer Science, and has taught fifth-grade math and science.\n\nHer curriculum roadmap names JavaScript, web development, computational thinking, data and computing, and cybersecurity fundamentals as planned areas. Her technical-support background also includes new-hire training and explaining technical procedures to non-technical users.',
            sources: [CURRICULUM_CASE_STUDY, CURRICULUM_REPO]
        },
        {
            id: 'curriculum-overview',
            question: 'What curriculum has Marsharine developed?',
            patterns: [/./],
            answer: 'Marsharine designed and authored Python Foundations, a standards-referenced computer science curriculum for grades 9–12 students with little or no programming experience.\n\n- Structure: 7 units and 36 lessons over about one semester, moving from first output through variables, decisions, loops, functions, and lists to an original capstone program.\n- Design approach: learning objective → skill decomposition → modeling → guided practice → independent application → assessment, with debugging taught from Lesson 1.3.\n- Standards: designed with reference to the CSTA K–12 Computer Science Standards and the AP® Computer Science Principles framework.\n- Assessment: formative checks, coding and debugging tasks, unit checkpoints with rubrics, and a capstone project.\n- Technical accuracy: every code example and error message verified on Python 3.12.\n- Teacher usability: lesson plans, teacher notes, differentiation, and answer keys so another educator can deliver and adapt it.',
            sources: [CURRICULUM_CASE_STUDY, SAMPLE_LESSON, SCOPE_SEQUENCE, CURRICULUM_REPO]
        }
    ];

    curriculumAnswers.forEach((entry) => { entry.intent = INTENT_CURRICULUM; });

    // Semantic signals that a question concerns curriculum, instruction, or teaching.
    const CURRICULUM_SIGNALS = [
        /curricul/i, /instructional/i, /\bpedagog/i, /lesson/i, /\bunit (plan|design)/i, /scope (and|&) sequence/i,
        /\bcsta\b/i, /\bap\s*(csp|computer science)/i, /standards?[\s-]*(align|based|referenced)/i, /align\w*\s+(to|with)\s+(the\s+)?standards/i,
        /differentiat/i, /scaffold/i, /learning objectives?/i, /learning (experience|design|outcomes?)/i,
        /\bteach(ing|es)?\b/i, /\beducator\b/i, /classroom/i, /tutor/i, /\bk\s*[-–]\s*12\b/i, /grade levels?|grade bands?|\bgrades?\s*\d/i,
        /\bSTEM\b/, /stem (curricul|education|subjects?)/i, /\bCTE\b/, /career and technical/i,
        /(computer science|cs|python|programming|coding|stem)\s+(education|instruction|teaching|course)/i,
        /ed\s*tech/i, /educational technology|instructional technology|learning technology/i,
        /teacher[\s-]*(facing|materials?|resources?|guides?)/i, /student[\s-]*(facing|materials?|handouts?)/i,
        /technical training|training (materials|programs?|content)/i,
        /(design|develop|creat|writ|build)\w*\s+(\w+\s+)?assessments?/i, /assessment (design|development)/i, /rubric/i, /exit ticket/i,
        /education(al)? experience/i, /sample lesson/i, /work samples?/i, /instructional[\s-]*designer/i, /course design|design a (complete )?course/i
    ];

    const SOFTWARE_SIGNALS = [/software/i, /develop(er|ment)/i, /engineer/i, /\breact\b/i, /typescript/i, /javascript/i, /full.?stack/i, /front.?end/i, /back.?end/i, /coding/i];

    const RESUME_REQUEST = /r[eé]sum[eé]|\bcv\b|curriculum vitae/i;
    const CURRICULUM_RESUME_SIGNAL = /curricul|instructional|teach|educat|\bcs\b|computer science|stem|edtech|trainer|training/i;
    const SOFTWARE_RESUME_SIGNAL = /software|developer|engineer|technical|tech|coding|programming|web/i;

    function hasCurriculumSignal(text) {
        return CURRICULUM_SIGNALS.some((pattern) => pattern.test(text));
    }

    function classifyIntent(message) {
        const text = String(message || '');
        if (hasCurriculumSignal(text)) return INTENT_CURRICULUM;
        if (SOFTWARE_SIGNALS.some((pattern) => pattern.test(text))) return INTENT_SOFTWARE;
        return INTENT_GENERAL;
    }

    function withCurriculumResume(entry) {
        const offer = entry.offerResume === false ? '' : `\n\n${CURRICULUM_RESUME_OFFER}`;
        return {
            id: entry.id,
            intent: INTENT_CURRICULUM,
            answer: `${entry.answer}${offer}`,
            sources: entry.sources,
            actions: [CURRICULUM_RESUME_ACTION]
        };
    }

    function asSoftware(entry) {
        return { id: entry.id, intent: entry.intent || INTENT_SOFTWARE, answer: entry.answer, sources: entry.sources, actions: [] };
    }

    function resumeAnswer(text, lastIntent) {
        const wantsCurriculum = CURRICULUM_RESUME_SIGNAL.test(text.replace(/curriculum vitae/i, ''));
        const wantsSoftware = SOFTWARE_RESUME_SIGNAL.test(text);
        if (wantsCurriculum || (!wantsSoftware && lastIntent === INTENT_CURRICULUM)) {
            return withCurriculumResume(curriculumAnswers[0]);
        }
        if (wantsSoftware) {
            return {
                id: 'developer-resume', intent: INTENT_SOFTWARE,
                answer: 'Here is Marsharine’s developer résumé. It covers her React, TypeScript, Supabase/PostgreSQL, testing, and deployment work, along with her technical-support and AI-evaluation experience.',
                sources: [PROJECTS, GITHUB], actions: [DEVELOPER_RESUME_ACTION]
            };
        }
        return {
            id: 'resume-choice', intent: INTENT_GENERAL,
            answer: 'Marsharine keeps two role-specific résumés. The developer résumé covers her software-development work; the Curriculum Designer résumé covers curriculum development, teaching, and EdTech. Choose the one that matches the role you are evaluating.',
            sources: [PROJECTS, GITHUB], actions: [DEVELOPER_RESUME_ACTION, CURRICULUM_RESUME_ACTION]
        };
    }

    const fallback = {
        id: 'fallback',
        intent: INTENT_GENERAL,
        answer: 'I can help evaluate Marsharine’s software-development experience, strongest project, technical stack, testing, security, accessibility, and role fit—or her curriculum design, instructional-design approach, teaching experience, and EdTech work. Ask one of those questions, or use a suggested prompt.',
        sources: [PROJECTS, GITHUB],
        actions: []
    };

    function findAnswer(message, context = {}) {
        const text = String(message || '').trim();
        if (!text) return fallback;
        const lastIntent = context && context.lastIntent;

        if (RESUME_REQUEST.test(text)) return resumeAnswer(text, lastIntent);

        if (hasCurriculumSignal(text)) {
            const entry = curriculumAnswers.find((candidate) => candidate.patterns.some((pattern) => pattern.test(text)));
            return withCurriculumResume(entry);
        }

        const entry = answers.find((candidate) => candidate.patterns.some((pattern) => pattern.test(text)));
        return entry ? asSoftware(entry) : null;
    }

    function curriculumContext() {
        return {
            sources: [CURRICULUM_CASE_STUDY, SAMPLE_LESSON, SCOPE_SEQUENCE],
            actions: [CURRICULUM_RESUME_ACTION],
            offer: CURRICULUM_RESUME_OFFER
        };
    }

    const positioning = 'PROFESSIONAL POSITIONING\nMarsharine combines teaching experience, curriculum development, computer science, information technology, educational technology, and software development. She is especially well positioned for roles at the intersection of technical subject matter and instructional design (curriculum designer, curriculum developer, instructional designer, CS/STEM curriculum, EdTech, technical training) as well as frontend and full-stack software roles. She can develop scope and sequences, units, lessons, learning objectives, programming activities, assessments, teacher-facing and student-facing materials, code examples, scaffolds, guided and independent practice, and mastery activities. Her instructional approach includes explicit instruction, modeling, guided practice, independent practice, progress monitoring, identifying learning gaps, and adjusting instruction based on student performance.';

    function promptFacts() {
        return [positioning]
            .concat(answers.map((entry) => `${entry.question}\n${entry.answer}`))
            .concat(curriculumAnswers.map((entry) => `${entry.question}\n${entry.answer}`))
            .join('\n\n');
    }

    return {
        answers, curriculumAnswers, fallback, findAnswer, classifyIntent, curriculumContext, promptFacts,
        intents: { CURRICULUM: INTENT_CURRICULUM, SOFTWARE: INTENT_SOFTWARE, GENERAL: INTENT_GENERAL }
    };
}));
