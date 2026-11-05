import { Program, Service, Project, Leader, EventItem, GalleryItem, Testimonial, InsightArticle, JobPosting } from '../types';

export const COMPANY_INFO = {
  name: 'Aegis Academy Pvt. Ltd.',
  shortName: 'Aegis Academy',
  acronym: 'AEGIS',
  fullForm: 'Alliance of Entrepreneurs Guiding Innovation and Strategies',
  tagline: 'Empowering Minds. Engineering Futures.',
  subtaglines: [
    'Learn Beyond Boundaries.',
    'Innovation Through Education.',
    'Building Skills for Tomorrow.',
    'Transforming Ideas into Technology.'
  ],
  description: 'Aegis Academy is an education and technology-oriented organization focused on empowering students, institutions, and businesses through modern education, emerging technologies, innovation, and practical skill development.',
  vision: 'To empower the next generation with future-ready knowledge, practical skills, and innovative technological solutions.',
  mission: 'To bridge the gap between education and industry through accessible learning, hands-on training, technology innovation, and meaningful collaborations.',
  philosophy: 'We believe education should be applied, experiential, and directly aligned with modern industrial realities. By integrating academic rigor with frontier technology development, we cultivate thinkers who build and engineers who lead.',
  coreValues: [
    { title: 'Excellence in Execution', description: 'Striving for highest craftsmanship in pedagogy and software engineering.' },
    { title: 'Applied Innovation', description: 'Transforming theoretical knowledge into real-world technological solutions.' },
    { title: 'Inclusive Empowerment', description: 'Making high-impact technical training accessible to ambitious learners everywhere.' },
    { title: 'Ethical Leadership', description: 'Operating with integrity, transparency, and deep institutional responsibility.' }
  ],
  contact: {
    email: 'contact@aegisacademy.sample.in',
    admissionsEmail: 'admissions@aegisacademy.sample.in',
    techEmail: 'solutions@aegisacademy.sample.in',
    phone: '+91 (0) 80 4920 1800',
    whatsapp: '+91 98450 12345',
    address: 'Technology Innovation Hub, Phase 2, Electronic City, Bengaluru, Karnataka 560100',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.0191834160416!2d77.6631853759325!3d12.841399887462725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6c8869cbfae5%3A0x9599298450e1ef00!2sElectronic%20City%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    hours: 'Monday – Saturday: 9:00 AM – 6:30 PM IST',
    isSampleNotice: 'All phone numbers, emails, and address listings provided here are demonstration placeholders and can be replaced with verified corporate coordinates.'
  },
  socials: {
    linkedin: 'https://linkedin.com/company/aegis-academy-sample',
    instagram: 'https://instagram.com/aegisacademy_sample',
    twitter: 'https://twitter.com/aegis_sample',
    github: 'https://github.com/aegis-academy-sample'
  }
};

export const SAMPLE_STATISTICS = [
  { value: '18,500+', label: 'Students Trained', context: 'Across 45+ academic institutions (Demo metric)' },
  { value: '120+', label: 'Industry Workshops', context: 'Hands-on practical cohorts conducted' },
  { value: '35+', label: 'Enterprise Solutions', context: 'Web, Mobile & AI deployments' },
  { value: '94.2%', label: 'Positive Outcomes', context: 'Student skill evaluation benchmark' }
];

export const LEADERSHIP_TEAM: Leader[] = [
  {
    id: 'lead-1',
    name: 'Aarav V. Sharma',
    designation: 'Founder & Chief Executive Officer',
    department: 'Executive Board',
    bio: 'Visionary technologist and education advocate with over 15 years leading cross-functional digital transformations and higher education initiatives.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    linkedInUrl: 'https://linkedin.com/in/sample-founder',
    isSampleProfile: true
  },
  {
    id: 'lead-2',
    name: 'Pooja R. Krishnan',
    designation: 'Chief Business Officer',
    department: 'Business & Institutional Alliances',
    bio: 'Experienced strategist specializing in strategic university collaborations, industrial MOUs, and sustainable revenue growth.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    linkedInUrl: 'https://linkedin.com/in/sample-cbo',
    isSampleProfile: true
  },
  {
    id: 'lead-3',
    name: 'Vikramaditya Sengupta',
    designation: 'Chief Technology Officer',
    department: 'Aegis Technologies',
    bio: 'Former principal cloud architect. Leads Aegis enterprise engineering, software architecture, and developer incubation programs.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    linkedInUrl: 'https://linkedin.com/in/sample-cto',
    isSampleProfile: true
  },
  {
    id: 'lead-4',
    name: 'Meera Nambiar',
    designation: 'Chief Financial Officer',
    department: 'Finance & Governance',
    bio: 'Chartered accountant with deep expertise in tech venture budgeting, statutory compliance, and corporate capital planning.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    linkedInUrl: 'https://linkedin.com/in/sample-cfo',
    isSampleProfile: true
  },
  {
    id: 'lead-5',
    name: 'Rohan Deshmukh',
    designation: 'Chief Product Officer',
    department: 'EdTech Product & Curriculum',
    bio: 'Specialist in learner experience architecture, cognitive learning models, and gamified pedagogical platforms.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    linkedInUrl: 'https://linkedin.com/in/sample-cpo',
    isSampleProfile: true
  },
  {
    id: 'lead-6',
    name: 'Ananya S. Iyer',
    designation: 'Chief Marketing Officer',
    department: 'Brand & Communications',
    bio: 'Digital marketing strategist dedicated to building authentic student communities, institutional outreach, and media campaigns.',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400',
    linkedInUrl: 'https://linkedin.com/in/sample-cmo',
    isSampleProfile: true
  },
  {
    id: 'lead-7',
    name: 'Karthik Balakrishnan',
    designation: 'Event & Community Head',
    department: 'Student & Academic Events',
    bio: 'Organizer of major collegiate hackathons, technical symposiums, and inter-state robotics competitions.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    linkedInUrl: 'https://linkedin.com/in/sample-events',
    isSampleProfile: true
  },
  {
    id: 'lead-8',
    name: 'Sunita Chandrasekhar',
    designation: 'General Manager - Operations',
    department: 'Executive Operations',
    bio: 'Ensuring seamless day-to-day administrative excellence, faculty coordination, and multi-campus logistics.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    linkedInUrl: 'https://linkedin.com/in/sample-gm',
    isSampleProfile: true
  },
  {
    id: 'lead-9',
    name: 'Dr. Tushar Pradhan',
    designation: 'R&D Manager - Applied AI',
    department: 'Research & Innovation',
    bio: 'PhD in Computer Vision. Directs student research projects, proprietary AI prototypes, and industry grant papers.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    linkedInUrl: 'https://linkedin.com/in/sample-rd',
    isSampleProfile: true
  }
];

export const PROGRAMS: Program[] = [
  {
    id: 'prog-1',
    slug: 'full-stack-web-development',
    title: 'Full Stack Web Development',
    category: 'college',
    shortDescription: 'Master modern frontend architectures, Node.js microservices, distributed databases, and deployment pipelines.',
    overview: 'A comprehensive, engineering-grade program designed to transform computer science and engineering students into production-ready software engineers capable of building scalable modern web applications from scratch.',
    duration: '16 Weeks (120 Hours)',
    eligibility: 'Engineering / BCA / MCA / BSc CS students or aspiring developers with basic programming familiarity.',
    prerequisites: 'Basic understanding of programming syntax (any language) and computer fundamentals.',
    learningMode: 'Hybrid',
    whatYouWillLearn: [
      'Modern JavaScript (ESNext) and TypeScript fundamentals',
      'React component architecture, state management & React Query',
      'Node.js, Express, and RESTful API engineering',
      'Relational (PostgreSQL) and NoSQL (MongoDB) data modeling',
      'Authentication, RBAC, JWT, and web security best practices',
      'CI/CD, Docker basics, and Cloud Deployment on AWS/Vercel'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Web Fundamentals & TypeScript', topics: ['Modern DOM', 'Semantic HTML5', 'CSS Flex/Grid', 'TypeScript Types & Interfaces'] },
      { moduleNumber: 2, title: 'Frontend Mastery with React', topics: ['Hooks & Custom Hooks', 'Component Lifecycle', 'State Management', 'Tailwind CSS'] },
      { moduleNumber: 3, title: 'Backend Systems & REST APIs', topics: ['Node.js Event Loop', 'Express Framework', 'Middleware Design', 'API Validation'] },
      { moduleNumber: 4, title: 'Data Persistence & Security', topics: ['PostgreSQL & Prisma ORM', 'Indexing & Queries', 'JWT Auth', 'HTTPS & CORS'] },
      { moduleNumber: 5, title: 'DevOps & Capstone Project', topics: ['Docker Containerization', 'GitHub Actions', 'Cloud Deployment', 'Live Defense'] }
    ],
    practicalProjects: [
      { title: 'Enterprise Team Collaboration Platform', description: 'Real-time collaborative workspace with workspace permissions, live chat, and Kanban boards.', tools: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'] },
      { title: 'FinTech Microservices Billing Engine', description: 'Idempotent payment ledger with invoice generation and automated webhook handling.', tools: ['TypeScript', 'Express', 'Redis', 'Docker'] }
    ],
    learningOutcomes: [
      'Ability to design, code, and deploy complete full-stack web applications independently.',
      'Confidence in solving algorithmic problems and system design interview rounds.',
      'A GitHub portfolio with 2 verified production-grade capstone projects.'
    ],
    faqs: [
      { question: 'Will I receive a certificate upon completion?', answer: 'Yes, students who successfully complete curriculum modules and defend their capstone receive the Aegis Academy Full-Stack Engineering Certificate.' },
      { question: 'Are classes recorded if I miss a lecture?', answer: 'All live sessions are recorded and made available immediately on the Aegis Student Portal along with instructor code repositories.' }
    ],
    image: '/src/assets/images/aegis_tech_engineering_1793890910041.jpg'
  },
  {
    id: 'prog-2',
    slug: 'generative-ai',
    title: 'Applied Generative AI & LLM Systems',
    category: 'college',
    shortDescription: 'Build intelligent applications using Large Language Models, embeddings, RAG architectures, and autonomous agents.',
    overview: 'Dive deep into modern generative AI systems. Learn to architect, fine-tune, and orchestrate LLMs, vector search databases, multimodal models, and autonomous tool-calling pipelines.',
    duration: '12 Weeks (90 Hours)',
    eligibility: 'Intermediate Python developers, data science students, and software engineers.',
    prerequisites: 'Proficiency in Python, object-oriented concepts, and basic understanding of machine learning principles.',
    learningMode: 'Hybrid',
    whatYouWillLearn: [
      'Foundations of Transformer architectures, attention mechanisms, and tokenization',
      'Prompt engineering patterns: Few-shot, ReAct, Chain-of-Thought',
      'Retrieval-Augmented Generation (RAG) with vector databases (Pinecone, ChromaDB)',
      'Building agentic workflows with LangChain and LlamaIndex',
      'Multimodal AI integration (vision, speech, and document parsing)',
      'Production deployment, latency optimization, and evaluation metrics'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Transformer & LLM Architecture', topics: ['Tokens & Embeddings', 'Attention Mechanisms', 'Open vs Closed Models', 'Inference APIs'] },
      { moduleNumber: 2, title: 'Structured Prompting & Tool Calling', topics: ['System Prompts', 'Function Calling', 'JSON Schemas', 'Output Parsers'] },
      { moduleNumber: 3, title: 'Vector Stores & Enterprise RAG', topics: ['Document Chunking', 'Vector Embeddings', 'Hybrid Search', 'Re-ranking'] },
      { moduleNumber: 4, title: 'Autonomous Agents & Workflows', topics: ['Agentic Loops', 'Tool Orchestration', 'Memory Management', 'Guardrails'] },
      { moduleNumber: 5, title: 'Evaluation, Fine-tuning & Deployment', topics: ['Ragas & TruLens', 'PEFT / LoRA concepts', 'Quantization', 'FastAPI Serving'] }
    ],
    practicalProjects: [
      { title: 'Multimodal Research Assistant', description: 'Upload scientific papers and diagrams to perform grounded multi-source question-answering with citation verification.', tools: ['Python', 'Gemini API', 'ChromaDB', 'FastAPI'] },
      { title: 'Automated Regulatory Compliance Agent', description: 'Autonomous agent that audits corporate documents against statutory guidelines and highlights policy discrepancies.', tools: ['LangGraph', 'Vector DB', 'Streamlit'] }
    ],
    learningOutcomes: [
      'Deep architectural comprehension of LLMs and how to leverage them in production software.',
      'Mastery of RAG techniques for hallucination reduction and proprietary domain data integration.',
      'Deployment of an end-to-end agentic AI project with real-world utility.'
    ],
    faqs: [
      { question: 'Do I need a high-end GPU to enroll?', answer: 'No. Cloud computing credits and hosted inference environments are provided as part of the course laboratory access.' },
      { question: 'Is mathematical background required?', answer: 'A high-school level comfort with vectors, matrix operations, and probability is helpful, but the course emphasizes applied system architecture.' }
    ],
    image: '/src/assets/images/ai_learning_assistant_1793890911044.jpg'
  },
  {
    id: 'prog-3',
    slug: 'cybersecurity',
    title: 'Cybersecurity & Ethical Hacking',
    category: 'college',
    shortDescription: 'Master penetration testing, network defense, threat intelligence, and secure software development.',
    overview: 'An intensive hands-on security training program simulating real-world cyber attack surfaces, vulnerability assessments, network intrusion detection, and proactive defensive hardening.',
    duration: '14 Weeks (100 Hours)',
    eligibility: 'CS / IT / Engineering students and professionals aiming for security analyst roles.',
    prerequisites: 'Foundational networking knowledge (TCP/IP, OSI model) and Linux command-line fluency.',
    learningMode: 'In-Person',
    whatYouWillLearn: [
      'Linux security administration and bash scripting',
      'Network protocols, packet inspection with Wireshark, and scanning with Nmap',
      'Web application security (OWASP Top 10 vulnerabilities & mitigations)',
      'Penetration testing methodologies and Metasploit fundamentals',
      'Cryptography, PKI, SSL/TLS certificates, and secure key exchanges',
      'Incident response, log forensics, and compliance frameworks'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Network Fundamentals & Linux Hardening', topics: ['Packet Flow', 'Subnetting', 'Firewalls', 'SELinux & Permissions'] },
      { moduleNumber: 2, title: 'Reconnaissance & Vulnerability Scanning', topics: ['OSINT', 'Port Scanning', 'Nessus', 'Service Enumeration'] },
      { moduleNumber: 3, title: 'Web App Exploitation & OWASP', topics: ['SQL Injection', 'Cross-Site Scripting (XSS)', 'CSRF', 'Broken Access Control'] },
      { moduleNumber: 4, title: 'Privilege Escalation & Defensive Controls', topics: ['Buffer Overflow basics', 'Active Directory security', 'SIEM & SOC overview'] },
      { moduleNumber: 5, title: 'Red vs. Blue Team Capstone Simulation', topics: ['Capture The Flag (CTF)', 'Forensic Analysis', 'Remediation Reporting'] }
    ],
    practicalProjects: [
      { title: 'Vulnerable Bank Penetration Test', description: 'Authorized black-box penetration audit on an isolated banking portal identifying critical transaction vulnerabilities.', tools: ['Burp Suite', 'Kali Linux', 'Python'] }
    ],
    learningOutcomes: [
      'Practical competence in identifying, exploiting, and fixing high-risk vulnerabilities.',
      'Preparedness for industry security certifications (CEH, CompTIA Security+).',
      'Professional security reporting and remediation documentation skills.'
    ],
    faqs: [
      { question: 'Is ethical hacking legal to practice in this course?', answer: 'Yes, all offensive exercises are strictly confined to isolated virtual sandbox labs provided by Aegis Academy with strict safety controls.' }
    ],
    image: '/src/assets/images/aegis_tech_engineering_1793890910041.jpg'
  },
  {
    id: 'prog-4',
    slug: 'python-programming',
    title: 'Python for Developers & Data Systems',
    category: 'college',
    shortDescription: 'Core to advanced Python: object-oriented programming, data structures, automation, and API development.',
    overview: 'Build deep programming fluency in Python, the lingua franca of modern computing, from algorithmic fundamentals to high-performance libraries and asynchronous services.',
    duration: '10 Weeks (70 Hours)',
    eligibility: 'Beginners and early-stage engineering students.',
    prerequisites: 'No prior programming experience required; logical thinking is beneficial.',
    learningMode: 'In-Person',
    whatYouWillLearn: [
      'Python syntax, control flow, functions, and recursion',
      'Object-Oriented Design (OOP), inheritance, and design patterns',
      'Working with files, JSON, CSV, and SQLite databases',
      'Data manipulation with NumPy and Pandas',
      'Building REST APIs with FastAPI',
      'Automated testing with PyTest and virtual environment management'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Language Fundamentals', topics: ['Variables', 'Data Types', 'Loops', 'Conditionals', 'Functions'] },
      { moduleNumber: 2, title: 'Data Structures & OOP', topics: ['Lists, Dicts, Sets', 'Classes & Objects', 'Encapsulation', 'Polymorphism'] },
      { moduleNumber: 3, title: 'Libraries & File I/O', topics: ['File Systems', 'Regular Expressions', 'CSV/JSON handling', 'NumPy basics'] },
      { moduleNumber: 4, title: 'APIs & Web Services', topics: ['FastAPI setup', 'Pydantic models', 'Endpoints', 'Database CRUD'] }
    ],
    practicalProjects: [
      { title: 'Automated Financial Data Pipeline', description: 'Scrapes market indicators, validates records with Pydantic, and generates automated PDF summary analytics.', tools: ['Python', 'Pandas', 'FastAPI', 'Matplotlib'] }
    ],
    learningOutcomes: [
      'Mastery of idiomatic Python syntax and clean code principles.',
      'Ability to automate repetitive data tasks and build clean web services.'
    ],
    faqs: [
      { question: 'Is Python suitable for first-time coders?', answer: 'Python is the ideal first programming language due to its readable syntax and vast modern ecosystem.' }
    ],
    image: '/src/assets/images/aegis_education_campus_1793890911409.jpg'
  },
  {
    id: 'prog-5',
    slug: 'app-development',
    title: 'Cross-Platform Mobile App Development',
    category: 'college',
    shortDescription: 'Create high-performance iOS and Android applications using Flutter and React Native with backend integration.',
    overview: 'Learn the principles of responsive mobile design, native device API integration, state management, offline-first caching, and app store deployment.',
    duration: '14 Weeks (100 Hours)',
    eligibility: 'Computer science students or web developers expanding into native mobile apps.',
    prerequisites: 'Basic JavaScript/TypeScript or Dart familiarity.',
    learningMode: 'Hybrid',
    whatYouWillLearn: [
      'Cross-platform mobile frameworks (Flutter / React Native)',
      'Mobile UI/UX design conventions for iOS and Android',
      'Local persistence with SQLite and offline synchronization',
      'Hardware integration: GPS, Camera, Accelerometer, Push Notifications',
      'Publishing to Apple App Store & Google Play Store guidelines'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Mobile Framework Fundamentals', topics: ['Component Architecture', 'Layout Widgets', 'Platform specific styling'] },
      { moduleNumber: 2, title: 'State Management & Navigation', topics: ['Routing', 'Deep Linking', 'Context API / Riverpod', 'Form Handling'] },
      { moduleNumber: 3, title: 'Device Hardware & Media', topics: ['Camera API', 'Location Services', 'Local Storage', 'Biometric Auth'] },
      { moduleNumber: 4, title: 'Cloud Sync & Release', topics: ['REST API integration', 'Offline caching', 'Bundle optimization', 'Store Submission'] }
    ],
    practicalProjects: [
      { title: 'Campus Navigation & Events Companion', description: 'Interactive mobile app for university students featuring indoor campus routing, peer notices, and timetable alerts.', tools: ['React Native', 'Expo', 'Node.js', 'Firebase'] }
    ],
    learningOutcomes: [
      'End-to-end mobile development and multi-platform packaging competency.',
      'Real-world portfolio app published on live test tracks.'
    ],
    faqs: [
      { question: 'Do I need a Mac to build iOS apps in this course?', answer: 'We utilize cloud build pipelines and test flights so students with Windows or Linux machines can complete all required coursework.' }
    ],
    image: '/src/assets/images/smart_agriculture_iot_1793890911194.jpg'
  },
  {
    id: 'prog-6',
    slug: 'data-structures-algorithms',
    title: 'Data Structures & Algorithms (DSA)',
    category: 'college',
    shortDescription: 'Master problem-solving, asymptotic complexity analysis, graph algorithms, and technical interview patterns.',
    overview: 'An intensive algorithm training bootcamp designed to build rigorous analytical thinking and prepare candidates for top-tier software engineering technical assessments.',
    duration: '12 Weeks (80 Hours)',
    eligibility: 'Engineering undergraduates preparing for campus placements and technical interviews.',
    prerequisites: 'Knowledge of C++, Java, or Python.',
    learningMode: 'In-Person',
    whatYouWillLearn: [
      'Time and space complexity analysis (Big-O notation)',
      'Linear structures: Arrays, Linked Lists, Stacks, Queues',
      'Non-linear structures: Binary Trees, BSTs, Heaps, AVL Trees',
      'Graph theory: BFS, DFS, Dijkstra, Minimum Spanning Trees',
      'Dynamic Programming, Divide and Conquer, Greedy Algorithms',
      'Top 75 LeetCode problem patterns and behavioral mock drills'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Complexity & Linear Structures', topics: ['Big O Analysis', 'Two Pointers', 'Sliding Window', 'Linked List Manipulation'] },
      { moduleNumber: 2, title: 'Trees & Priority Queues', topics: ['Binary Search Trees', 'Tree Traversals', 'Min/Max Heaps', 'Tries'] },
      { moduleNumber: 3, title: 'Graph Algorithms', topics: ['Adjacency Lists', 'Topological Sort', 'Shortest Paths', 'Disjoint Set Union'] },
      { moduleNumber: 4, title: 'Dynamic Programming & Memoization', topics: ['1D DP', '2D Matrix DP', 'Knapsack Variations', 'Subsequence Problems'] }
    ],
    practicalProjects: [
      { title: 'Optimized Routing & Metro Path Finder', description: 'Implementation of A* search and Dijkstra algorithm on realistic municipal transit graphs with transfer penalty scoring.', tools: ['C++', 'Graph Algorithms', 'CLI Interface'] }
    ],
    learningOutcomes: [
      'Mastery of 200+ core algorithmic challenges across complexity tiers.',
      'Ability to articulate time/space trade-offs clearly to interview panels.'
    ],
    faqs: [
      { question: 'Which programming language will be used in class?', answer: 'Instruction is provided in C++ and Java with dual implementations provided for all algorithmic demonstrations.' }
    ],
    image: '/src/assets/images/aegis_education_campus_1793890911409.jpg'
  },
  {
    id: 'prog-7',
    slug: 'aptitude-training',
    title: 'Quantitative & Logical Aptitude Mastery',
    category: 'college',
    shortDescription: 'Sharpen speed math, data interpretation, critical reasoning, and corporate assessment problem-solving.',
    overview: 'A high-impact training track focused on cracking company placement screening exams, competitive exams, and logical reasoning assessment rounds with speed and mathematical clarity.',
    duration: '8 Weeks (50 Hours)',
    eligibility: 'Final-year and pre-final-year students across all degree streams.',
    prerequisites: 'Basic high school mathematics.',
    learningMode: 'In-Person',
    whatYouWillLearn: [
      'Vedic mathematics and mental calculation shortcuts',
      'Arithmetic: Percentages, Profit & Loss, Time & Work, Speed & Distance',
      'Algebra, Permutations & Combinations, Probability',
      'Data Interpretation: Bar charts, Pie charts, Tabular analysis',
      'Logical Deduction: Syllogisms, Blood relations, Seating arrangements'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Speed Math & Arithmetic Foundations', topics: ['Shortcuts', 'Percentages', 'Ratios & Proportions', 'Averages'] },
      { moduleNumber: 2, title: 'Commercial Mathematics', topics: ['Time, Speed & Distance', 'Time & Work', 'Pipes & Cisterns', 'Interest Math'] },
      { moduleNumber: 3, title: 'Analytical & Logical Reasoning', topics: ['Coding-Decoding', 'Blood Relations', 'Direction Sense', 'Seating Arrangements'] },
      { moduleNumber: 4, title: 'Data Interpretation & Timed Mocks', topics: ['Tables & Charts', 'Caselets', 'Full-Length Timed Test Batteries'] }
    ],
    practicalProjects: [
      { title: 'Placement Mock Assessment Battery', description: '5 comprehensive diagnostic evaluations benchmarked against leading national IT recruitment tests.', tools: ['Computer-Based Testing', 'Percentile Analytics'] }
    ],
    learningOutcomes: [
      'Significant reduction in calculation time with high accuracy rates.',
      'Confidence in clearing competitive tier-1 aptitude screenings.'
    ],
    faqs: [
      { question: 'Are daily practice sheets provided?', answer: 'Yes, over 2,500 curated practice questions with step-by-step video solutions are provided via the student dashboard.' }
    ],
    image: '/src/assets/images/aegis_education_campus_1793890911409.jpg'
  },
  {
    id: 'prog-8',
    slug: 'communication-skills',
    title: 'Professional Communication & Workplace Fluency',
    category: 'college',
    shortDescription: 'Build executive presence, group discussion leadership, interview storytelling, and corporate correspondence skills.',
    overview: 'Designed to elevate verbal articulation, public speaking confidence, active listening, and persuasive writing skills required to excel in multinational corporate environments.',
    duration: '6 Weeks (40 Hours)',
    eligibility: 'College students and early-career professionals seeking to enhance workplace communication.',
    prerequisites: 'Basic English comprehension.',
    learningMode: 'In-Person',
    whatYouWillLearn: [
      'Overcoming stage fright and building vocal projection',
      'The STAR method for behavioral job interviews',
      'Group Discussion (GD) strategies and moderating dynamics',
      'Professional business email etiquette and executive memos',
      'Cross-cultural workplace communication and emotional intelligence'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Verbal Dynamics & Vocal Presence', topics: ['Pacing', 'Articulation', 'Eliminating Filler Words', 'Body Language'] },
      { moduleNumber: 2, title: 'The Art of Group Discussions', topics: ['Initiating', 'Intervening Politely', 'Summarizing', 'Conflict Handling'] },
      { moduleNumber: 3, title: 'Interview Storytelling', topics: ['STAR Technique', 'Resume Walkthroughs', 'Handling Unfamiliar Questions'] },
      { moduleNumber: 4, title: 'Written Corporate Fluency', topics: ['Email Structure', 'Meeting Minutes', 'Executive Presentations'] }
    ],
    practicalProjects: [
      { title: 'Simulated Boardroom Presentation', description: 'Students pitch a digital transformation initiative in front of a live panel with recorded playback critique.', tools: ['Video Review', 'Peer Rubric Feedback'] }
    ],
    learningOutcomes: [
      'Poised presentation ability and interview confidence.',
      'Clean professional writing skills devoid of ambiguity.'
    ],
    faqs: [
      { question: 'Are practice sessions recorded for review?', answer: 'Yes, individual student presentations are recorded and analyzed one-on-one with certified speech coaches.' }
    ],
    image: '/src/assets/images/aegis_education_campus_1793890911409.jpg'
  },
  // School programs
  {
    id: 'prog-school-1',
    slug: 'ai-awareness-schools',
    title: 'Artificial Intelligence Awareness for Young Minds',
    category: 'school',
    shortDescription: 'Engaging, interactive introduction to how computers learn, recognize images, and assist everyday life.',
    overview: 'Specially crafted for students aged 10–15 to demystify artificial intelligence through playful visual games, machine learning experiments, and ethical discussions on technology.',
    duration: '4 Weeks (16 Hours)',
    eligibility: 'School students in Grades 6 through 9 (Ages 10–15).',
    prerequisites: 'Enthusiasm for technology; basic familiarity with using a computer.',
    learningMode: 'In-Person',
    whatYouWillLearn: [
      'What is AI and how does it differ from traditional software?',
      'How computers recognize pictures, sounds, and text (Classification)',
      'Training your first mini image classifier with visual blocks',
      'Understanding everyday AI: Siri, self-driving cars, Netflix recommendations',
      'Being a responsible digital citizen: Fairness, privacy, and online safety'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Meet the Thinking Machine', topics: ['What is Intelligence?', 'Computers vs. Humans', 'The History of Robots'] },
      { moduleNumber: 2, title: 'Teaching a Computer to See', topics: ['Teachable Machine Labs', 'Pixels & Patterns', 'Training vs Testing'] },
      { moduleNumber: 3, title: 'Chatting with Computers', topics: ['Language Models', 'Giving Good Instructions', 'Spotting AI Mistakes'] },
      { moduleNumber: 4, title: 'Building a Friendly Robot Project', topics: ['Visual Logic Builder', 'Ethical Tech Rules', 'Final Showcase'] }
    ],
    practicalProjects: [
      { title: 'Smart Recycling Classifier', description: 'Train a webcam model to detect whether an object is paper, plastic, or organic waste.', tools: ['Google Teachable Machine', 'Scratch'] }
    ],
    learningOutcomes: [
      'Confidence using emerging technology constructively rather than merely consuming it.',
      'Clear conceptual understanding of training data and algorithms.'
    ],
    faqs: [
      { question: 'Is complex math required for school students?', answer: 'No mathematical formulas are used; all concepts are taught through physical metaphors, games, and drag-and-drop tools.' }
    ],
    image: '/src/assets/images/aegis_education_campus_1793890911409.jpg'
  },
  {
    id: 'prog-school-2',
    slug: 'computational-thinking-schools',
    title: 'Computational Thinking & Creative Problem Solving',
    category: 'school',
    shortDescription: 'Fostering algorithmic problem breakdown, logic puzzles, and foundational coding through creative projects.',
    overview: 'Teaches young learners the mental models of computer scientists: decomposition, pattern recognition, abstraction, and algorithmic design using visual block programming and interactive games.',
    duration: '6 Weeks (24 Hours)',
    eligibility: 'School students in Grades 5 through 8.',
    prerequisites: 'None.',
    learningMode: 'In-Person',
    whatYouWillLearn: [
      'Breaking complex challenges into solvable micro-steps (Decomposition)',
      'Pattern identification in numbers, nature, and puzzles',
      'Algorithmic sequences: Loops, Conditions, Variables',
      'Creative storytelling and game design with block-based code'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'The Puzzler’s Mindset', topics: ['Logic Mazes', 'Step-by-Step Instructions', 'Unplugged Coding'] },
      { moduleNumber: 2, title: 'Algorithmic Art & Sound', topics: ['Coordinate Geometry', 'Music Loops', 'Symmetry & Fractals'] },
      { moduleNumber: 3, title: 'Interactive Game Creation', topics: ['Sprites', 'Collision Detection', 'Score Tracking'] }
    ],
    practicalProjects: [
      { title: 'Interactive Science Adventure Game', description: 'A multi-level educational game teaching solar system exploration built by the student.', tools: ['Scratch 3.0', 'Block Logic'] }
    ],
    learningOutcomes: [
      'Strong logical structuring skills applicable to math and science.',
      'Joy of creative expression through technology.'
    ],
    faqs: [
      { question: 'Can this program be conducted on school campuses?', answer: 'Yes, Aegis Academy conducts this program directly within partner school computer laboratories during academic terms.' }
    ],
    image: '/src/assets/images/aegis_education_campus_1793890911409.jpg'
  },
  // Professional development
  {
    id: 'prog-pro-1',
    slug: 'corporate-ai-upskilling',
    title: 'Enterprise AI & Modernization for Engineering Teams',
    category: 'professional',
    shortDescription: 'Customized corporate workshops on integrating LLMs, cloud migration, and modern DevSecOps pipelines.',
    overview: 'Accelerate your engineering organization’s technological agility. Tailored for enterprise product teams transitioning legacy architectures to microservices, cloud-native deployments, and AI-assisted workflows.',
    duration: 'Custom (2–6 Weeks)',
    eligibility: 'Software engineers, engineering leads, tech architects, and product managers.',
    prerequisites: 'Professional software engineering experience.',
    learningMode: 'Virtual Live',
    whatYouWillLearn: [
      'Architecting resilient distributed microservices',
      'Practical adoption of AI developer tooling (GitHub Copilot, Cursor, LLM APIs)',
      'Designing robust internal enterprise RAG pipelines and security compliance',
      'Cloud cost optimization, observability (OpenTelemetry), and zero-downtime releases'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Modern Architecture Patterns', topics: ['Event-Driven Systems', 'API Gateways', 'Database Sharding'] },
      { moduleNumber: 2, title: 'AI Engineering in Enterprise', topics: ['LLM Security', 'Private Model Hosting', 'Evaluation Frameworks'] },
      { moduleNumber: 3, title: 'Modern Delivery Pipelines', topics: ['Infrastructure as Code', 'Observability', 'Chaos Engineering'] }
    ],
    practicalProjects: [
      { title: 'Enterprise Blueprint Implementation', description: 'Live architectural refactor of an enterprise staging service with automated CI/CD and AI-powered log auditing.', tools: ['AWS / GCP', 'Kubernetes', 'Terraform', 'FastAPI'] }
    ],
    learningOutcomes: [
      'Immediate acceleration in enterprise delivery velocity.',
      'Safe, compliant adoption of modern AI paradigms within existing corporate governance.'
    ],
    faqs: [
      { question: 'Can the syllabus be tailored to our tech stack?', answer: 'Yes, our enterprise curriculum team conducts an initial architectural discovery session to customize modules directly to your production stack.' }
    ],
    image: '/src/assets/images/hero_cinematic_tech_ed_1793890908961.jpg'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'serv-1',
    slug: 'web-development',
    title: 'Web Application Development',
    category: 'Engineering',
    shortDescription: 'Modern, scalable, cloud-native web architectures engineered for reliability, security, and high performance.',
    overview: 'We engineer mission-critical web applications, enterprise portals, and SaaS platforms using modern TypeScript frameworks, robust backend microservices, and reactive data architectures.',
    problemsWeSolve: [
      'Sluggish legacy web applications suffering from high latency and technical debt',
      'Inflexible monolithic codebases that resist rapid feature iteration',
      'Poor cross-device rendering and suboptimal accessibility compliance',
      'Unreliable database querying under peak concurrent user traffic'
    ],
    ourSolutions: [
      'High-performance React and Next.js frontends with atomic component design',
      'Scalable Node.js, Express, and Go backend microservices with OpenAPI documentation',
      'Distributed database architecture with read-replicas, connection pooling, and caching',
      'Automated end-to-end testing, static type checking, and sub-second CI/CD pipelines'
    ],
    technologiesUsed: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Tailwind CSS'],
    developmentProcess: [
      { step: '01', title: 'Architecture & Discovery', description: 'Requirement discovery, domain-driven modeling, and technical specification drafting.' },
      { step: '02', title: 'Interactive Prototyping', description: 'High-fidelity wireframes, design tokens, and user journey validation.' },
      { step: '03', title: 'Agile Engineering Sprints', description: 'Two-week iterative sprints with continuous code reviews and test automation.' },
      { step: '04', title: 'Security & Quality Audit', description: 'Penetration testing, accessibility compliance checks, and performance profiling.' },
      { step: '05', title: 'Production Deployment', description: 'Zero-downtime deployment, CDN routing, monitoring setup, and post-launch support.' }
    ],
    deliverables: [
      'Production-ready, thoroughly tested source code repository with complete documentation',
      'Dockerized deployment configuration and CI/CD pipelines',
      'Interactive API documentation and schema contracts',
      'System architecture diagrams and runbooks for client DevOps teams'
    ],
    sampleProjects: [
      { name: 'Enterprise Management Portal', description: 'Scalable multi-tenant portal with role-based access control handling 50k+ daily transactions.' },
      { name: 'Interactive Learning Platform', description: 'Real-time collaborative educational portal with code execution playgrounds and video streaming.' }
    ],
    faqs: [
      { question: 'What is your typical project delivery timeline?', answer: 'Standard enterprise MVP web applications typically range from 6 to 12 weeks depending on integration complexity.' },
      { question: 'Do you offer post-launch maintenance?', answer: 'Yes, we provide tiered SLA-backed maintenance, security patch updates, and ongoing infrastructure monitoring.' }
    ],
    icon: 'Code2'
  },
  {
    id: 'serv-2',
    slug: 'app-development',
    title: 'Mobile App Development',
    category: 'Engineering',
    shortDescription: 'Native-feel iOS and Android applications with fluid gesture interactions, offline sync, and real-time push engines.',
    overview: 'From enterprise mobile field apps to consumer-facing utilities, we build robust cross-platform and native mobile experiences that captivate users and maintain high performance.',
    problemsWeSolve: [
      'Disjointed user experiences between iOS and Android codebases',
      'Application crashes caused by poor memory management and background tasks',
      'Lack of offline capability in low-bandwidth or remote operational environments',
      'Complex app store submission rejections due to compliance oversights'
    ],
    ourSolutions: [
      'Unified Flutter and React Native codebases with native bridges where performance demands it',
      'Local-first data persistence with seamless background synchronization',
      'Hardware sensor integration: GPS tracking, Bluetooth peripherals, Biometrics, and Camera',
      'Rigorous automated device testing across 50+ real screen sizes and OS versions'
    ],
    technologiesUsed: ['React Native', 'Flutter', 'TypeScript', 'Swift', 'Kotlin', 'Firebase', 'SQLite'],
    developmentProcess: [
      { step: '01', title: 'UX Flow & Touch Architecture', description: 'Mapping intuitive mobile gestures, thumb zones, and state machines.' },
      { step: '02', title: 'Component & State System', description: 'Setting up offline databases, store architecture, and native bridges.' },
      { step: '03', title: 'Iterative Feature Development', description: 'Continuous integration distributing builds via TestFlight and Play Store Internal Tracks.' },
      { step: '04', title: 'Store Certification & Launch', description: 'Handling metadata, privacy policies, review certifications, and rollout.' }
    ],
    deliverables: [
      'Signed application binaries (APK, AAB, IPA) ready for store release',
      'Full cross-platform source code with native build scripts',
      'Push notification server integrations and analytics dashboards'
    ],
    sampleProjects: [
      { name: 'Student Productivity Companion', description: 'Cross-platform student timetable, peer notes, and study group communication app.' },
      { name: 'Field Inspection Suite', description: 'Offline-first tablet app for industrial facility auditors with photo annotation.' }
    ],
    faqs: [
      { question: 'Do you manage Apple App Store and Google Play approvals?', answer: 'Yes, our team handles the end-to-end submission, cryptographic signing, and store approval process.' }
    ],
    icon: 'Smartphone'
  },
  {
    id: 'serv-3',
    slug: 'ai-solutions',
    title: 'Artificial Intelligence & Machine Learning',
    category: 'Intelligence',
    shortDescription: 'Custom LLM integration, intelligent document processing, predictive modeling, and automated agent workflows.',
    overview: 'We turn cutting-edge artificial intelligence into dependable business engines. We architect proprietary RAG systems, predictive analytics, computer vision, and autonomous workflow agents.',
    problemsWeSolve: [
      'LLM hallucinations causing unreliable outputs on domain-specific company data',
      'High inference costs and unmanageable latency in AI-driven features',
      'Privacy and data leakage risks when using public cloud AI providers',
      'Labor-intensive manual document extraction from invoices, contracts, and scans'
    ],
    ourSolutions: [
      'Enterprise Retrieval-Augmented Generation (RAG) with vector indexing and re-ranking',
      'Private model hosting, quantized local models, and strict data anonymization gates',
      'Autonomous agent systems with deterministic verification and human-in-the-loop controls',
      'Custom OCR and multimodal data extraction pipelines'
    ],
    technologiesUsed: ['Python', 'PyTorch', 'Gemini API', 'LangChain', 'LlamaIndex', 'Pinecone', 'ChromaDB', 'FastAPI'],
    developmentProcess: [
      { step: '01', title: 'Data Audit & Feasibility', description: 'Evaluating dataset quality, accuracy thresholds, and privacy requirements.' },
      { step: '02', title: 'Pipeline Architecture & Benchmarking', description: 'Building baseline RAG and agent graphs with automated ground-truth scoring.' },
      { step: '03', title: 'Fine-Tuning & Guardrails', description: 'Implementing prompt safety filters, output validators, and latency optimization.' },
      { step: '04', title: 'Enterprise Integration', description: 'Embedding AI endpoints cleanly into existing enterprise ERP, CRM, or web platforms.' }
    ],
    deliverables: [
      'Custom AI microservices containerized with REST / gRPC interfaces',
      'Vector database schemas, embedding generation pipelines, and chunking strategies',
      'Automated evaluation suites measuring hallucination and retrieval precision'
    ],
    sampleProjects: [
      { name: 'AI Academic Advisory Assistant', description: 'Intelligent student counseling engine recommending personalized learning pathways based on performance.' },
      { name: 'Automated Document Parser', description: 'Deep learning pipeline extracting structured JSON from multi-page messy PDF contracts with 98% accuracy.' }
    ],
    faqs: [
      { question: 'Is client proprietary data used to train public models?', answer: 'Never. We enforce strict enterprise zero-retention policies and private VPC deployments for all proprietary models.' }
    ],
    icon: 'Cpu'
  },
  {
    id: 'serv-4',
    slug: 'cloud-solutions',
    title: 'Cloud Solutions & Infrastructure',
    category: 'Infrastructure',
    shortDescription: 'Secure cloud migrations, container orchestration with Kubernetes, serverless pipelines, and multi-region resilience.',
    overview: 'Design and manage modern cloud architectures that reduce operating expenses, prevent downtime, and effortlessly scale during traffic spikes.',
    problemsWeSolve: [
      'Spiraling and unpredictable cloud infrastructure bills with idle resources',
      'Frequent deployment outages and lack of automated rollback strategies',
      'Single-region disaster vulnerability without automated failovers',
      'Security audit compliance gaps in IAM policies and network firewalls'
    ],
    ourSolutions: [
      'Infrastructure as Code (Terraform) for reproducible, version-controlled cloud environments',
      'Kubernetes (EKS/GKE) cluster configuration with automated horizontal pod autoscaling',
      'Zero-trust network security, private subnets, and automated secret rotations',
      'Comprehensive telemetry with Prometheus, Grafana, and Datadog'
    ],
    technologiesUsed: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'PostgreSQL'],
    developmentProcess: [
      { step: '01', title: 'Infrastructure Audit', description: 'Comprehensive review of current architecture, bottlenecks, and security posture.' },
      { step: '02', title: 'Cloud Blueprint Formulation', description: 'Defining VPC topology, IAM policies, and Terraform modules.' },
      { step: '03', title: 'Staging & Load Verification', description: 'Simulating peak traffic loads to verify autoscaling policies and database failover.' },
      { step: '04', title: 'Migration Execution', description: 'Gradual DNS cutover with zero downtime and continuous traffic monitoring.' }
    ],
    deliverables: [
      'Complete Terraform infrastructure repository with CI/CD automation',
      'Configured staging and production cloud clusters with monitoring alerts',
      'Disaster recovery playbook and security policy documentation'
    ],
    sampleProjects: [
      { name: 'Multi-Tenant SaaS Migration', description: 'Migrated 30 enterprise clients from bare-metal servers to Kubernetes with 40% cost reduction.' }
    ],
    faqs: [
      { question: 'Which cloud providers do you support?', answer: 'We are certified architects on both Amazon Web Services (AWS) and Google Cloud Platform (GCP).' }
    ],
    icon: 'Cloud'
  },
  {
    id: 'serv-5',
    slug: 'automation',
    title: 'Business Automation & Workflow Engineering',
    category: 'Operations',
    shortDescription: 'Streamline operational bottlenecks, automate data entry, and connect fragmented software systems.',
    overview: 'We design custom workflow automation engines that eliminate redundant human steps, connect legacy databases to modern APIs, and drastically cut processing turnaround times.',
    problemsWeSolve: [
      'Employees wasting hours copy-pasting records across disconnected enterprise tools',
      'Manual human error in invoices, payroll calculation, and inventory reconciliation',
      'Slow customer support response times for repetitive inquiries',
      'Inability to gain real-time visibility across operational business metrics'
    ],
    ourSolutions: [
      'Custom webhook and event-driven automation middleware',
      'Intelligent robotic process automation (RPA) for legacy desktop software',
      'Automated reconciliation pipelines that flag discrepancies instantly',
      'Executive dashboards streaming live operational KPIs in real time'
    ],
    technologiesUsed: ['Node.js', 'Python', 'Kafka', 'Redis', 'Webhooks', 'Airflow', 'PostgreSQL'],
    developmentProcess: [
      { step: '01', title: 'Process Mining', description: 'Shadowing workflows to quantify bottlenecks and calculate automation ROI.' },
      { step: '02', title: 'Connector & Event Design', description: 'Building resilient API integrations with automatic retry backoffs.' },
      { step: '03', title: 'Sandbox Execution', description: 'Testing edge cases and exceptions in dry-run simulation mode.' },
      { step: '04', title: 'Autonomous Rollout', description: 'Deploying with human exception queues for unresolved edge cases.' }
    ],
    deliverables: [
      'Custom workflow automation microservices with monitoring',
      'Audit logging dashboards for every automated transaction',
      'Operator handbooks and exception-handling guidelines'
    ],
    sampleProjects: [
      { name: 'Automated Inventory & Dispatch System', description: 'Connected 4 warehouse databases to dispatch carriers, reducing fulfillment delays by 75%.' }
    ],
    faqs: [
      { question: 'Can you connect with legacy software without modern APIs?', answer: 'Yes, our team engineers custom database triggers, sFTP polling scripts, and headless RPA connectors.' }
    ],
    icon: 'Zap'
  },
  {
    id: 'serv-6',
    slug: 'digital-presence',
    title: 'Digital Presence & Brand Strategy',
    category: 'Strategy',
    shortDescription: 'High-impact corporate brand identities, design systems, editorial web design, and digital brand elevation.',
    overview: 'Crafting unforgettable corporate identities and digital brand flagships that communicate institutional authority, inspire confidence, and attract top-tier clients and partners.',
    problemsWeSolve: [
      'Outdated corporate websites that look like generic templates',
      'Inconsistent brand typography, colors, and messaging across touchpoints',
      'Low lead conversion rates due to uninspired UX and unclear value propositions',
      'Weak digital authority failing to win institutional trust'
    ],
    ourSolutions: [
      'Holistic corporate brand identity guidelines and bespoke design tokens',
      'Editorial-grade digital design with bespoke iconography and photography art direction',
      'Conversion-rate-optimized landing experiences with frictionless CTAs',
      'Comprehensive social and collateral design kits'
    ],
    technologiesUsed: ['Figma', 'React', 'Tailwind CSS', 'Motion Design', 'SVG Animation'],
    developmentProcess: [
      { step: '01', title: 'Brand Discovery & Positioning', description: 'Defining core value proposition, audience personas, and market differentiation.' },
      { step: '02', title: 'Visual Identity System', description: 'Crafting color palettes, typography hierarchies, and component design tokens.' },
      { step: '03', title: 'Interactive Web Flagship', description: 'Developing immersive digital experiences with motion design and micro-interactions.' },
      { step: '04', title: 'Brand Guidelines Handoff', description: 'Delivering comprehensive brand books and design assets for all organizational channels.' }
    ],
    deliverables: [
      'Brand style guide (typography scale, palette tokens, logo usage rules)',
      'Figma component library with interactive states',
      'Production web code and collateral templates'
    ],
    sampleProjects: [
      { name: 'Fintech Corporate Flagship', description: 'Complete digital rebrand and high-converting portal for an institutional investment advisory.' }
    ],
    faqs: [
      { question: 'Do you create custom illustrations and design assets?', answer: 'Yes, our creative team creates bespoke design assets tailored precisely to your brand ethos.' }
    ],
    icon: 'Layers'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    slug: 'smart-agriculture-platform',
    title: 'Smart Agriculture IoT & Drone Telemetry Platform',
    category: 'Automation Solutions',
    shortDescription: 'Precision agriculture system aggregating soil moisture IoT nodes, drone multispectral imagery, and crop health alerts.',
    problemStatement: 'Small and medium farming cooperatives in semi-arid regions struggled with erratic irrigation schedules, undetected early fungal blight, and inefficient fertilizer application that eroded crop yields.',
    proposedSolution: 'Aegis Technologies designed an end-to-end telemetry system combining low-power LoRaWAN sensor nodes, autonomous agricultural drone imagery processing, and predictive soil irrigation analytics.',
    keyFeatures: [
      'Sub-GHz wireless IoT sensor mesh reporting soil moisture, pH, and temperature every 15 minutes',
      'Automated NDVI (Normalized Difference Vegetation Index) calculation from drone aerial uploads',
      'SMS and mobile push alerts in regional languages with actionable irrigation advice',
      'Solar-powered edge computing gateways designed for harsh rural conditions'
    ],
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'TimescaleDB', 'React', 'Tailwind CSS', 'Docker'],
    image: '/src/assets/images/smart_agriculture_iot_1793890911194.jpg',
    outcomes: [
      '32% documented reduction in water usage across demonstration plots',
      'Early blight detection achieved 7 days prior to visual human inspection',
      'Featured at the National AgroTech Symposium (Demonstration project)'
    ],
    clientSector: 'Agritech & Rural Innovation (Demonstration Case Study)',
    duration: '16 Weeks'
  },
  {
    id: 'proj-2',
    slug: 'ai-learning-assistant',
    title: 'Adaptive AI Learning Navigator & Analytics Suite',
    category: 'AI Solutions',
    shortDescription: 'Intelligent cognitive learning assistant that diagnoses student misconceptions and creates personalized revision plans.',
    problemStatement: 'Educators in large college classrooms cannot provide individual feedback to 120+ students simultaneously, resulting in unnoticed learning gaps in foundational subjects like data structures and calculus.',
    proposedSolution: 'Developed an intelligent student copilot that continuously analyzes quiz patterns, code submissions, and reading times to construct personalized knowledge graphs and interactive Socratic review modules.',
    keyFeatures: [
      'Real-time student knowledge state modeling using dynamic Bayesian networks',
      'Socratic dialogue engine that guides students to answers rather than merely giving solutions',
      'Automated code misconception highlighting with syntax and logic explanations',
      'Teacher dashboard displaying aggregated class conceptual bottlenecks'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Gemini API', 'PostgreSQL', 'ChromaDB', 'Tailwind CSS'],
    image: '/src/assets/images/ai_learning_assistant_1793890911044.jpg',
    outcomes: [
      '41% improvement in quiz retention rates observed in initial student cohort tests',
      'Average student practice time increased from 18 to 44 minutes per day',
      'Adopted across 4 pilot collegiate technology departments (Sample deployment)'
    ],
    clientSector: 'Higher Education Technology (Demonstration Case Study)',
    duration: '20 Weeks'
  },
  {
    id: 'proj-3',
    slug: 'business-management-system',
    title: 'Enterprise ERP & Operations Management Engine',
    category: 'Web Applications',
    shortDescription: 'Unified cloud ERP solution consolidating procurement, multi-warehouse inventory, employee billing, and audit reports.',
    problemStatement: 'A regional manufacturing conglomerate relied on disconnected spreadsheets and legacy software, resulting in missed purchase order reconciliations, delayed invoices, and lack of real-time cash flow visibility.',
    proposedSolution: 'A modern, modular web-based ERP platform with multi-tenant permissions, automated purchase order workflows, electronic signature trails, and automated financial statements.',
    keyFeatures: [
      'Role-based access control (RBAC) with granular department permissions',
      'Real-time multi-warehouse stock tracking with automated reorder thresholds',
      'Integrated invoicing engine with automated tax calculation and PDF generation',
      'Comprehensive audit log recording every data change with cryptographic timestamps'
    ],
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'AWS ECS'],
    image: '/src/assets/images/aegis_tech_engineering_1793890910041.jpg',
    outcomes: [
      'Reduced monthly financial closing cycles from 9 business days to 36 hours',
      'Zero documented stockout events during peak quarterly manufacturing runs',
      'Demonstration platform showcasing enterprise-grade engineering standards'
    ],
    clientSector: 'Enterprise Manufacturing & Distribution (Sample Portfolio Item)',
    duration: '24 Weeks'
  },
  {
    id: 'proj-4',
    slug: 'student-productivity-app',
    title: 'Pulse Campus: Mobile Student Productivity Companion',
    category: 'Mobile Applications',
    shortDescription: 'Cross-platform mobile application coordinating campus class schedules, peer study hubs, and assignments.',
    problemStatement: 'College students experience fragmented campus communications across disparate WhatsApp groups, paper notice boards, and clunky legacy university portals.',
    proposedSolution: 'An elegant, fluid mobile application connecting timetable synchronization, peer study groups, campus club announcements, and offline exam reminder notifications.',
    keyFeatures: [
      'Automatic timetable calendar sync with offline class reminders',
      'Encrypted peer study rooms with code snippet sharing and document exchange',
      'Campus event ticketing and digital pass generation',
      'Anonymous academic feedback channel for institutional improvement'
    ],
    techStack: ['Flutter', 'Dart', 'Node.js', 'Firebase Auth', 'Cloud Firestore', 'Tailwind-inspired Theme'],
    image: '/src/assets/images/aegis_education_campus_1793890911409.jpg',
    outcomes: [
      'Over 4,200 active student downloads achieved during campus pilot phase',
      '88% daily active usage during examination prep periods',
      'Sample application built by Aegis student cohort under senior mentor supervision'
    ],
    clientSector: 'Collegiate Life & EdTech (Sample Portfolio Item)',
    duration: '12 Weeks'
  },
  {
    id: 'proj-5',
    slug: 'automated-inventory-system',
    title: 'Cloud Warehouse Automation & Dispatch Routing System',
    category: 'Automation Solutions',
    shortDescription: 'Computer vision barcode sorting, autonomous order dispatch queuing, and courier SLA optimization.',
    problemStatement: 'A high-volume fulfillment center faced 14% mis-shipment rates and prolonged package turnaround times due to manual handoffs between picking, packing, and courier staging.',
    proposedSolution: 'A high-speed industrial dispatch system integrating optical barcode scanning, dynamic picker route optimization, and automated dispatch courier API handoffs.',
    keyFeatures: [
      'Picker path optimization algorithm cutting warehouse walking distances by 35%',
      'Dual optical verification preventing incorrect carton packing',
      'Real-time courier rate comparison and automated airway bill generation',
      'Sub-second scanner response via local edge caching'
    ],
    techStack: ['Go', 'TypeScript', 'React', 'Docker', 'PostgreSQL', 'Redis', 'MQTT'],
    image: '/src/assets/images/hero_cinematic_tech_ed_1793890908961.jpg',
    outcomes: [
      'Mis-shipment rate reduced to under 0.2% in verification trials',
      'Order dispatch throughput increased from 420 to 1,150 parcels per hour',
      'Sample industrial automation case study'
    ],
    clientSector: 'Logistics & Supply Chain (Sample Portfolio Item)',
    duration: '18 Weeks'
  }
];

export const EVENTS: EventItem[] = [
  {
    id: 'ev-1',
    slug: 'hack-aegis-2026',
    title: 'HackAegis 2026: 36-Hour National Innovation Hackathon',
    type: 'Hackathon',
    date: 'November 28–29, 2026',
    time: '09:00 AM – 09:00 PM (36 Hours Continuous)',
    location: 'Aegis Academy Innovation Campus, Electronic City, Bengaluru',
    mode: 'Hybrid',
    description: 'Flagship nationwide collegiate hackathon convening 300+ student developers to build AI solutions for healthcare, climate resilience, and modern education.',
    status: 'Upcoming',
    speaker: 'Panel of 12 Senior Industry Mentors & Founders',
    capacity: '100 Teams (400 Participants)'
  },
  {
    id: 'ev-2',
    slug: 'genai-masterclass',
    title: 'Full-Day Hands-on Masterclass: Building Production RAG Systems',
    type: 'Workshop',
    date: 'December 12, 2026',
    time: '10:00 AM – 05:30 PM IST',
    location: 'Virtual Live Auditorium & Aegis Labs',
    mode: 'Online',
    description: 'Code alongside senior AI architects to construct, evaluate, and deploy an enterprise-grade vector search and RAG pipeline with custom guardrails.',
    status: 'Upcoming',
    speaker: 'Vikramaditya Sengupta (CTO) & Dr. Tushar Pradhan (R&D)',
    capacity: '250 Attendees'
  },
  {
    id: 'ev-3',
    slug: 'cyber-defense-bootcamp',
    title: 'Red vs. Blue Cyber Defense Simulation Symposium',
    type: 'Technical Session',
    date: 'October 14, 2026',
    time: '01:30 PM – 06:30 PM IST',
    location: 'Auditorium 2, Tech Park Campus, Bengaluru',
    mode: 'Offline',
    description: 'Live interactive demonstration of perimeter breach techniques, SOC intrusion monitoring, and incident mitigation strategies.',
    status: 'Past',
    speaker: 'Aegis Security Operations Team',
    capacity: '180 Attendees'
  },
  {
    id: 'ev-4',
    slug: 'campus-to-corporate-seminar',
    title: 'Campus to Corporate: Cracking Top Product Engineering Interviews',
    type: 'Training Program',
    date: 'September 22, 2026',
    time: '11:00 AM – 02:00 PM IST',
    location: 'Partner Engineering College, Mysuru',
    mode: 'Offline',
    description: 'Practical session covering algorithmic problem decomposition, resume design, and behavioral storytelling for pre-final year engineering students.',
    status: 'Past',
    speaker: 'Pooja R. Krishnan & Senior Placement Mentors',
    capacity: '350 Students'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'AI Lab Hands-on Cohort',
    category: 'Workshops',
    imageUrl: '/src/assets/images/aegis_education_campus_1793890911409.jpg',
    caption: 'Students collaborating on multi-touch digital workstations during the Applied AI Cohort.',
    date: 'October 2026'
  },
  {
    id: 'gal-2',
    title: 'National Technology Hackathon',
    category: 'Events',
    imageUrl: '/src/assets/images/hero_cinematic_tech_ed_1793890908961.jpg',
    caption: 'Participants pitching live projects to executive judges in the innovation arena.',
    date: 'September 2026'
  },
  {
    id: 'gal-3',
    title: 'Engineering Operations Room',
    category: 'Team Activities',
    imageUrl: '/src/assets/images/aegis_tech_engineering_1793890910041.jpg',
    caption: 'Software engineering mentors guiding student fellows on distributed systems deployment.',
    date: 'August 2026'
  },
  {
    id: 'gal-4',
    title: 'AgroTech IoT Telemetry Field Testing',
    category: 'Projects',
    imageUrl: '/src/assets/images/smart_agriculture_iot_1793890911194.jpg',
    caption: 'Testing drone sensor mesh and telemetry interfaces during research validation trials.',
    date: 'July 2026'
  },
  {
    id: 'gal-5',
    title: 'Cognitive Learning Interface Testing',
    category: 'Projects',
    imageUrl: '/src/assets/images/ai_learning_assistant_1793890911044.jpg',
    caption: 'Evaluating tablet UI response and adaptive learning pathways with learner focus groups.',
    date: 'June 2026'
  },
  {
    id: 'gal-6',
    title: 'Collegiate Workshop Interactive Session',
    category: 'Campus Activities',
    imageUrl: '/src/assets/images/aegis_education_campus_1793890911409.jpg',
    caption: 'Full-room student engagement during the campus technical orientation symposium.',
    date: 'May 2026'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Siddharth M. Nair',
    role: 'Associate Software Engineer',
    organization: 'Fintech Solutions Ltd. (Alumnus)',
    category: 'Student',
    quote: 'The Full-Stack Web Development cohort at Aegis Academy bridged the exact gap between my college textbook theory and real production development. The capstone defense directly helped me clear my technical interviews.',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Dr. Radhika Sundaram',
    role: 'Head of Computer Science Department',
    organization: 'City Engineering College',
    category: 'Institution',
    quote: 'Partnering with Aegis Academy brought practical, high-caliber technical workshops directly to our campus. Our students gained tangible hands-on experience in generative AI and cloud deployments.',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Ravi Teja Varma',
    role: 'Vice President of Talent Acquisition',
    organization: 'Apex Digital Technologies',
    category: 'Corporate',
    quote: 'Graduates from Aegis programs arrive with clean code discipline, understanding of Git workflows, and genuine problem-solving stamina. They onboard into our production sprints in days rather than months.',
    rating: 5
  },
  {
    id: 'test-4',
    name: 'Kavya Ramanathan',
    role: 'Data Science Intern',
    organization: 'Neural Analytics Lab (Student Alumna)',
    category: 'Student',
    quote: 'The Applied Generative AI program provided hands-on access to real LLM tools and vector databases. The mentors took the time to explain the foundational math behind transformers in plain language.',
    rating: 5
  }
];

export const INSIGHTS: InsightArticle[] = [
  {
    id: 'ins-1',
    slug: 'bridging-engineering-curriculum-industry-ai',
    title: 'Bridging the Divide: Why Applied AI Belongs in Undergraduate Engineering',
    category: 'Artificial Intelligence',
    summary: 'Traditional computer science degrees often lag behind the rapid evolution of generative AI and LLM agents. Here is how modern educational institutions are closing that gap.',
    content: [
      'The pace of technological transformation in software engineering has accelerated exponentially over the past three years. Where previous curriculum revisions occurred on three-to-five-year cycles, modern software paradigms—particularly in applied machine learning, container orchestration, and LLM development—evolve quarterly.',
      'For engineering colleges, the challenge is not whether to teach artificial intelligence, but how to integrate hands-on, production-grade tools into foundational coursework without diluting essential core principles like data structures, operating systems, and discrete mathematics.',
      'At Aegis Academy, our pedagogical philosophy is straightforward: theory provides the map, but hands-on engineering provides the journey. By having students build, break, and deploy working vector databases and agentic loops, abstract concepts transform into concrete intuition.',
      'Institutions that embrace this dual approach see dramatic increases in student engagement, higher retention of complex principles, and substantially stronger campus recruitment outcomes.'
    ],
    author: 'Vikramaditya Sengupta',
    readTime: '5 min read',
    publishedDate: 'November 2, 2026',
    tags: ['Artificial Intelligence', 'Higher Education', 'Curriculum Design']
  },
  {
    id: 'ins-2',
    slug: 'architecting-rag-systems-without-hallucination',
    title: 'Architecting Enterprise RAG Systems: Minimizing Hallucination at Scale',
    category: 'Technology',
    summary: 'A technical deep-dive into semantic chunking, reciprocal rank fusion, and hybrid search pipelines for high-accuracy enterprise applications.',
    content: [
      'Retrieval-Augmented Generation (RAG) has become the de facto architecture for deploying large language models against private organizational data. However, naive RAG implementations—simple chunking followed by vector cosine similarity—frequently stumble when confronted with nuanced domain queries.',
      'In our engineering deployments at Aegis Technologies, we emphasize three essential architectural pillars to achieve deterministic reliability:',
      '1. Context-Aware Semantic Chunking: Avoid rigid character-count window splits that sever logical paragraphs and tabular relationships.',
      '2. Hybrid Search Fusion: Combine sparse BM25 lexical keyword matching with dense neural vector embeddings using Reciprocal Rank Fusion (RRF).',
      '3. Re-Ranking & Verification Filters: Pass retrieved passages through a cross-encoder model before feeding them to the generation prompt, discarding irrelevant context that triggers hallucinations.',
      'By implementing these checks, enterprise teams can achieve accurate, cited answers with strict adherence to organizational ground truth.'
    ],
    author: 'Dr. Tushar Pradhan',
    readTime: '7 min read',
    publishedDate: 'October 24, 2026',
    tags: ['RAG', 'Vector Search', 'Machine Learning']
  },
  {
    id: 'ins-3',
    slug: 'building-computational-thinking-in-schools',
    title: 'Cultivating Computational Thinking in Young Learners Aged 10–15',
    category: 'Education',
    summary: 'Why algorithmic logic, pattern abstraction, and creative problem-solving are foundational life skills, not just preparation for coding careers.',
    content: [
      'In the modern digital age, every student will interact continuously with algorithmic systems. Understanding how these systems make decisions, classify information, and process logic is as critical to 21st-century literacy as reading and basic arithmetic.',
      'Computational thinking is not solely about memorizing programming syntax. It is the structured ability to break an intimidating challenge into modular sub-problems, recognize recurring patterns, eliminate extraneous noise through abstraction, and formulate precise steps to achieve a goal.',
      'When introduced through creative storytelling, puzzle solving, and playful visual programming, young learners develop resilience in the face of setbacks—viewing errors not as personal failure, but simply as bugs waiting to be systematically debugged.'
    ],
    author: 'Rohan Deshmukh',
    readTime: '4 min read',
    publishedDate: 'October 11, 2026',
    tags: ['K-12 Education', 'Problem Solving', 'STEM']
  }
];

export const CAREER_OPENINGS: JobPosting[] = [
  {
    id: 'job-1',
    title: 'Senior Technical Trainer - Full Stack Web & Cloud',
    department: 'Aegis Education',
    type: 'Full-Time',
    location: 'Bengaluru (On-Site / Hybrid)',
    experience: '3–6 Years in Software Engineering / Technical Instruction',
    overview: 'Lead immersive hands-on engineering cohorts for college students and professionals, mentoring the next generation of full-stack developers.',
    responsibilities: [
      'Deliver engaging, high-energy live coding lectures and architecture walkthroughs',
      'Design capstone projects, code review rubrics, and automated grading tests',
      'Mentor students 1-on-1 through technical challenges and placement preparation'
    ],
    requirements: [
      'Strong production experience with React, TypeScript, Node.js, and PostgreSQL',
      'Passion for teaching and explaining complex technical concepts clearly',
      'Familiarity with cloud deployments (AWS/Docker/Vercel)'
    ],
    status: 'Open'
  },
  {
    id: 'job-2',
    title: 'Lead Software Engineer - Enterprise Solutions',
    department: 'Aegis Technologies',
    type: 'Full-Time',
    location: 'Bengaluru (Hybrid)',
    experience: '4–7 Years in Web & Cloud Architecture',
    overview: 'Architect and build client web applications, microservices, and AI integrations for Aegis Technologies client engagements.',
    responsibilities: [
      'Lead technical architecture design, system modeling, and API contract specifications',
      'Write clean, thoroughly tested TypeScript and Python production code',
      'Mentor junior developers and participate in code reviews and sprint planning'
    ],
    requirements: [
      'Deep fluency in React/Next.js, Node.js, Python, and SQL databases',
      'Experience with distributed systems, caching, and CI/CD automation',
      'Excellent verbal and written communication skills'
    ],
    status: 'Open'
  },
  {
    id: 'job-3',
    title: 'Academic Alliances & Institutional Growth Manager',
    department: 'Business Development',
    type: 'Full-Time',
    location: 'Bengaluru (With Regional Travel)',
    experience: '2–5 Years in EdTech Partnerships / University Relations',
    overview: 'Drive institutional MOUs and training partnerships with engineering colleges, universities, and schools across southern India.',
    responsibilities: [
      'Establish and nurture relationships with college principals, deans, and placement directors',
      'Present Aegis Academy education models and coordinate workshop logistics',
      'Collaborate with curriculum heads to customize institutional training proposals'
    ],
    requirements: [
      'Proven track record in institutional sales or higher education partnerships',
      'Outstanding presentation, negotiation, and relationship management skills',
      'Deep appreciation for technical education and student outcomes'
    ],
    status: 'Open'
  },
  {
    id: 'job-4',
    title: 'Student Technical Fellow (Summer / Fall Internship)',
    department: 'Aegis Education & Tech Labs',
    type: 'Internship',
    location: 'Bengaluru / Remote',
    experience: 'Undergraduate student in CS/IT/ECE (Final or Pre-Final Year)',
    overview: 'Hands-on 3-to-6 month paid internship working alongside senior architects on real client platforms and educational curriculum tools.',
    responsibilities: [
      'Assist with open-source curriculum modules and workshop lab configurations',
      'Build sample full-stack applications and test documentation',
      'Support campus hackathons and technical community events'
    ],
    requirements: [
      'Demonstrated portfolio of personal code projects on GitHub',
      'Solid command of JavaScript/TypeScript, Python, or C++',
      'Eager learner with strong work ethic'
    ],
    status: 'Open'
  }
];

export const PARTNERSHIP_MODELS = [
  {
    title: 'School Innovation Alliances',
    target: 'K-12 & Secondary Schools (Grades 6–12)',
    description: 'Empower students with age-appropriate AI awareness, computational thinking, and digital safety curricula integrated seamlessly into academic schedules.',
    benefits: [
      'Turnkey curriculum and student workbooks',
      'Certified instructor delivery on your school campus',
      'Annual intra-school STEM & Robotics exhibition',
      'Detailed student analytical learning reports'
    ]
  },
  {
    title: 'Collegiate Center of Excellence (CoE)',
    target: 'Engineering Colleges & Universities',
    description: 'Establish a dedicated on-campus modern technology lab and structured finishing school program aligning student skill sets with tier-1 technology recruitment standards.',
    benefits: [
      'Placement-oriented technical bootcamps (Full Stack, AI, Cyber, DSA)',
      'Industry capstone project supervision by working engineers',
      'Faculty Development Programs (FDP) on modern emerging technologies',
      'Host campus hackathons with corporate sponsor connectivity'
    ]
  },
  {
    title: 'Corporate Upskilling & Incubation',
    target: 'Technology Enterprises & Startups',
    description: 'Bespoke corporate technical training sprints designed to accelerate onboarding of campus hires or modernize existing development teams into cloud and AI engineering.',
    benefits: [
      'Customized curricula tailored directly to client production stack',
      'Practical lab assessments with code quality metrics',
      'Flexible virtual live or on-premise executive delivery',
      'Pre-vetted graduate hiring pipeline from Aegis talent pool'
    ]
  }
];
