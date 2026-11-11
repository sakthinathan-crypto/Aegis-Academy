import {
  Program,
  Service,
  Project,
  Leader,
  EventItem,
  GalleryItem,
  Testimonial,
  InsightArticle,
  JobPosting,
  Achievement,
  InstitutionalCollaboration,
  EducationInitiative
} from '../types';

export const COMPANY_INFO = {
  name: 'AEGIS ACADEMY',
  shortName: 'AEGIS ACADEMY',
  acronym: 'AEGIS',
  fullForm: 'Alliance of Entrepreneurs Guiding Innovation and Strategies',
  tagline: 'Where Guidance Meets Growth',
  subtaglines: [
    'Where Guidance Meets Growth',
    'Learn. Develop. Lead.',
    'Innovate. Build. Transform.',
    'Future Skills & Professional Development'
  ],
  description:
    'AEGIS Academy is an education and technology-driven organisation focused on empowering individuals, transforming learning experiences, and delivering innovative technology solutions.',
  fullAbout:
    'AEGIS Academy is an education and technology-driven organisation focused on empowering individuals, transforming learning experiences, and delivering innovative technology solutions.\n\nThrough AEGIS Education, we provide practical learning experiences, skill development, professional training, and industry-oriented programs that prepare individuals for future opportunities.\n\nThrough AEGIS Technologies, we focus on developing innovative digital solutions, building technology-driven products, and helping businesses and organisations solve real-world challenges.\n\nOur approach brings education and technology together to create opportunities, encourage innovation, and drive meaningful growth.',
  vision:
    'To build a future where knowledge, technology, and innovation empower individuals and organisations to achieve meaningful growth and create a positive impact on society.',
  mission:
    'To bridge the gap between learning and real-world application through quality education, practical skill development, innovative technology solutions, and continuous collaboration with individuals, institutions, and industries.',
  philosophy:
    'Our approach brings education and technology together to create opportunities, encourage innovation, and drive meaningful growth. We bridge the gap between academic theory and real-world application through practical skill development, deep technical exploration, and enduring collaborations.',
  coreValues: [
    {
      title: 'Innovation',
      description: 'Pioneering forward-looking pedagogical approaches, emerging technology programs, and cutting-edge software solutions.'
    },
    {
      title: 'Integrity',
      description: 'Operating with honesty, transparency, ethical principles, and deep responsibility across all initiatives.'
    },
    {
      title: 'Excellence',
      description: 'Committing to the highest standards of quality in education delivery, technical instruction, and engineering craftsmanship.'
    },
    {
      title: 'Collaboration',
      description: 'Building enduring, impactful partnerships with students, educational institutions, startups, and enterprises.'
    },
    {
      title: 'Continuous Learning',
      description: 'Fostering intellectual curiosity, adaptive technical skills, and lifelong learning for future readiness.'
    },
    {
      title: 'Empowerment',
      description: 'Equipping learners and organisations with the knowledge, tools, and confidence to solve real-world challenges.'
    }
  ],
  targetAudience: [
    'School Students',
    'College Students',
    'Graduates',
    'Working Professionals',
    'Educational Institutions',
    'Startups',
    'Businesses and Organisations'
  ],
  divisions: {
    education: {
      name: 'AEGIS Education',
      positioning: 'Future Skills & Professional Development',
      tagline: 'Learn. Develop. Lead.',
      targetCustomers: ['Schools', 'Colleges', 'Universities', 'Individual Learners'],
      deliveryModels: ['Online', 'On-Campus', 'Hybrid']
    },
    technologies: {
      name: 'AEGIS Technologies',
      positioning: 'Technology Solutions & Innovation',
      tagline: 'Innovate. Build. Transform.',
      targetCustomers: ['Startups', 'Small and Medium Enterprises', 'Enterprises', 'Educational Institutions', 'Individual Clients'],
      deliveryModels: ['Online', 'On-Campus', 'Hybrid']
    }
  },
  contact: {
    email: 'connect@aegisacademy.in',
    generalEmail: 'info@aegisacademy.in',
    admissionsEmail: 'connect@aegisacademy.in',
    techEmail: 'info@aegisacademy.in',
    phone: '+91 93427 97014',
    secondaryPhone: '+91 84382 66090',
    whatsapp: '+91 93427 97014',
    address: '3/155, Main Road, Sithankathiruppu, Sirkazhi, Tamil Nadu – 609106.',
    googleMapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.542718917865!2d79.7300!3d11.2333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5518b5b7668603%3A0x6b6c07dc17b2b73!2sSirkazhi%2C%20Tamil%20Nadu%20609106!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    hours: 'Monday – Saturday: 9:00 AM – 6:30 PM IST',
    isSampleNotice: ''
  },
  socials: {
    linkedin: 'https://www.linkedin.com/company/aegis-academy05/',
    instagram: 'https://www.instagram.com/_aegis_academy/',
    github: 'https://github.com/sakthinathan-crypto/Aegis-Academy'
  }
};

export const SAMPLE_STATISTICS = [
  { value: '2', label: 'Core Divisions', context: 'AEGIS Education & AEGIS Technologies' },
  { value: '9', label: 'Leadership Members', context: 'Experienced founders and technical leads' },
  { value: '10+', label: 'Flagship Projects', context: 'Research, IoT, and automated platforms' },
  { value: '100%', label: 'Practical Focus', context: 'Hands-on learning & real-world solutions' }
];

export const PROGRAM_DURATIONS = [
  { program: 'Seminar / Workshop', duration: '1 Day', description: 'Intensive single-day orientation and hands-on demonstrations.' },
  { program: 'Short-Term Workshop', duration: '2–3 Days', description: 'Focused topic immersion with live coding and guided exercises.' },
  { program: 'Technical Bootcamp', duration: '1 Week', description: 'Fast-paced technical sprint covering foundational paradigms.' },
  { program: 'Intensive Skill Development', duration: '2 Weeks', description: 'Comprehensive practical training with mini capstone defense.' },
  { program: 'Technical Training', duration: '1 Month', description: 'Deep-dive curriculum covering full application development.' },
  { program: 'Advanced Training / Internship', duration: '2–3 Months', description: 'Project-based mentorship with real-world problem solving.' },
  { program: 'Institutional Program', duration: '1 Semester', description: 'Integrated on-campus academic semester curriculum.' }
];

export const INTERNSHIP_POLICY = {
  title: 'Important Internship Policy',
  notice: 'All AEGIS Academy student internships are unpaid and do not include a stipend. Internships focus strictly on practical skill development, mentorship, real-world problem solving, and project-based learning.',
  eligibility: 'Open throughout the year for students from all academic years and degree streams.',
  benefits: [
    'Project-Based Learning on live architectures',
    'Real-World Problem Solving & technical exploration',
    'Team-Based Development with Git workflows',
    'Mentorship and Technical Guidance from senior practitioners',
    'Practical Skill Assessment & project defense'
  ]
};

export const LEADERSHIP_TEAM: Leader[] = [
  {
    id: 'lead-1',
    name: 'Sakthinathan Jayakumar',
    designation: 'Chief Executive Officer (CEO)',
    department: 'Founder & CEO',
    bio: "Sakthinathan Jayakumar leads AEGIS Academy's strategic direction, organisational development, and long-term vision. With a background in Computer Science Engineering and a strong interest in technology innovation and entrepreneurship, he focuses on building meaningful educational initiatives, developing technology-driven solutions, and establishing institutional and industry collaborations.",
    avatar: '/images/leadership/sakthinathan.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/sakthinathan-jayakumar-b3400b33b/',
    isSampleProfile: false
  },
  {
    id: 'lead-2',
    name: 'Sham S',
    designation: 'Chief Business Officer (CBO)',
    department: 'Co-Founder & CBO',
    bio: 'Sham S contributes to business strategy, growth opportunities, and organisational development at AEGIS Academy. He focuses on strengthening business relationships, identifying opportunities, and supporting institutional and industry partnerships.',
    avatar: '/images/leadership/sham.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/sham-s-9bb689316/',
    isSampleProfile: false
  },
  {
    id: 'lead-3',
    name: 'Megna K',
    designation: 'Chief Financial Officer (CFO)',
    department: 'Co-Founder & CFO',
    bio: 'Megna K brings technical expertise in cloud engineering and Artificial Intelligence and Machine Learning. As CFO, she contributes to financial planning, resource management, budgeting, and sustainable organisational growth.',
    avatar: '/images/leadership/megna.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/megnova/',
    isSampleProfile: false
  },
  {
    id: 'lead-4',
    name: 'Sowrirajan N',
    designation: 'Chief Product Officer (CPO)',
    department: 'Co-Founder & CPO',
    bio: 'Sowrirajan N focuses on product vision, development direction, and product strategy. He contributes to transforming ideas into structured product concepts while aligning product priorities with user requirements and organisational objectives.',
    avatar: '/images/leadership/sowrirajan.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/sowrirajan-nalan-661279355/',
    isSampleProfile: false
  },
  {
    id: 'lead-5',
    name: 'Baasith Ahamed B',
    designation: 'Chief Marketing Officer (CMO)',
    department: 'Co-Founder & CMO',
    bio: "Baasith Ahamed B contributes to brand development, marketing strategy, and audience engagement. He focuses on strengthening AEGIS Academy's market presence, communicating its value proposition, and supporting organisational growth.",
    avatar: '/images/leadership/baasith.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/baasith-ahamed-103551371/',
    isSampleProfile: false
  },
  {
    id: 'lead-6',
    name: 'Abinaya G',
    designation: 'Chief Technology Officer (CTO)',
    department: 'Co-Founder & CTO',
    bio: 'Abinaya G contributes to the technology direction and technical development strategy of AEGIS Academy. She focuses on technology planning, engineering excellence, and aligning technical development with organisational goals.',
    avatar: '/images/leadership/abinaya.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/abinaya-ganesan-677144361/',
    isSampleProfile: false
  },
  {
    id: 'lead-7',
    name: 'Ishwarya R',
    designation: 'Event Manager',
    department: 'Co-Founder & Event Manager',
    bio: 'Ishwarya R manages event planning, coordination, and execution. She contributes to organising workshops, educational programs, and institutional events while focusing on scheduling, team coordination, and participant engagement.',
    avatar: '/images/leadership/ishwarya.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/ishwarya-r-b326a2378/',
    isSampleProfile: false
  },
  {
    id: 'lead-8',
    name: 'Santhosh S',
    designation: 'General Manager',
    department: 'Co-Founder & General Manager',
    bio: 'Santhosh S contributes to organisational operations, cross-functional coordination, and execution management. He focuses on operational planning, team coordination, and ensuring that organisational activities progress efficiently.',
    avatar: '/images/leadership/santhosh.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/santhosh-sadagopan-8b2a64371/',
    isSampleProfile: false
  },
  {
    id: 'lead-9',
    name: 'Vasantharaja M',
    designation: 'Research & Development Manager',
    department: 'Co-Founder & R&D Manager',
    bio: 'Vasantharaja M focuses on research initiatives, innovation, and technology exploration. He contributes to evaluating emerging technologies, conducting experiments, exploring new ideas, and supporting research-driven product development.',
    avatar: '/images/leadership/vasantharaja.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/vasantha-raja-806287355/',
    isSampleProfile: false
  }
];

export const EDUCATION_INITIATIVES: EducationInitiative[] = [
  {
    id: 'edu-init-1',
    title: 'Thiran Thedal Thittam',
    subtitle: 'Student-to-Student Mentoring & Higher Education Awareness',
    description:
      'A student-to-student mentoring and higher education awareness initiative. Designed to help students discover future career possibilities, navigate higher education pathways, engage in peer learning, and build technical aspirations.',
    focusAreas: [
      'Career Pathways',
      'Higher Education Guidance',
      'Peer-to-Peer Learning',
      'Student Mentoring',
      'Educational & Technology Awareness'
    ],
    delivery: 'On-Campus, School Outreach & Community Seminars',
    image: '/images/projects/thiran-thedal.jpeg'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'achieve-1',
    title: 'Automated AI-Based Medical Waste Crushing and Collection Machine',
    type: 'UK Registered Design',
    registrationNumber: '6529168',
    registrationDate: '27 May 2026',
    grantDate: '05 June 2026',
    description:
      'An innovative medical waste management machine design registered in the United Kingdom. This achievement represents an important milestone in our journey towards developing technology-driven solutions for healthcare waste management.',
    legalClassification: 'UK Registered Design'
  }
];

export const INSTITUTIONAL_COLLABORATIONS: InstitutionalCollaboration[] = [
  {
    id: 'collab-1',
    name: 'Designers Domain Club',
    departmentOrUnit: 'Department of CSE, E.G.S. Pillay Engineering College',
    scope: 'Technical workshops, student hackathons, and design thinking initiatives.'
  },
  {
    id: 'collab-2',
    name: 'KIIT University',
    departmentOrUnit: 'Technical Activities & Student Engagement',
    scope: 'Collaborative technical sessions and knowledge-sharing workshops.'
  },
  {
    id: 'collab-3',
    name: 'Arunai Engineering College, Tiruvannamalai',
    departmentOrUnit: 'Academic Collaboration',
    scope: 'Student skill development bootcamps and faculty development discussions.'
  },
  {
    id: 'collab-4',
    name: "St. Joseph's College of Engineering and Technology, Thanjavur",
    departmentOrUnit: 'Academic Collaboration',
    scope: 'Emerging technology seminars and student project guidance.'
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
      'Relational (PostgreSQL) and NoSQL data modeling',
      'Authentication, RBAC, JWT, and web security best practices',
      'CI/CD, Docker basics, and Cloud Deployment on AWS/Vercel'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Web Fundamentals & TypeScript', topics: ['Modern DOM', 'Semantic HTML5', 'CSS Flex/Grid', 'TypeScript Types & Interfaces'] },
      { moduleNumber: 2, title: 'Frontend Mastery with React', topics: ['Hooks & Custom Hooks', 'Component Lifecycle', 'State Management', 'Tailwind CSS'] },
      { moduleNumber: 3, title: 'Backend Systems & REST APIs', topics: ['Node.js Event Loop', 'Express Framework', 'Middleware Design', 'API Validation'] },
      { moduleNumber: 4, title: 'Data Persistence & Security', topics: ['Database Schema Design', 'Indexing & Queries', 'JWT Auth', 'HTTPS & CORS'] },
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
      { question: 'Will I receive a certificate upon completion?', answer: 'Yes, students who successfully complete curriculum modules and defend their capstone receive the AEGIS Academy Full-Stack Engineering Certificate.' },
      { question: 'Are classes recorded if I miss a lecture?', answer: 'All live sessions are recorded and made available immediately on the AEGIS Student Portal along with instructor code repositories.' }
    ],
    image: '/src/assets/images/aegis_tech_engineering_1793890910041.jpg'
  },
  {
    id: 'prog-2',
    slug: 'generative-ai',
    title: 'Applied Generative AI & Machine Learning',
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
      'Retrieval-Augmented Generation (RAG) with vector databases',
      'Building agentic workflows with LangChain and LlamaIndex',
      'Multimodal AI integration (vision, speech, and document parsing)',
      'Production deployment, latency optimization, and evaluation metrics'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Transformer & LLM Architecture', topics: ['Tokens & Embeddings', 'Attention Mechanisms', 'Open vs Closed Models', 'Inference APIs'] },
      { moduleNumber: 2, title: 'Structured Prompting & Tool Calling', topics: ['System Prompts', 'Function Calling', 'JSON Schemas', 'Output Parsers'] },
      { moduleNumber: 3, title: 'Vector Stores & Enterprise RAG', topics: ['Document Chunking', 'Vector Embeddings', 'Hybrid Search', 'Re-ranking'] },
      { moduleNumber: 4, title: 'Autonomous Agents & Workflows', topics: ['Agentic Loops', 'Tool Orchestration', 'Memory Management', 'Guardrails'] },
      { moduleNumber: 5, title: 'Evaluation, Fine-tuning & Deployment', topics: ['Evaluation metrics', 'PEFT / LoRA concepts', 'Quantization', 'FastAPI Serving'] }
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
    title: 'Cybersecurity & Defensive Engineering',
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
      { moduleNumber: 1, title: 'Network Fundamentals & Linux Hardening', topics: ['Packet Flow', 'Subnetting', 'Firewalls', 'Permissions'] },
      { moduleNumber: 2, title: 'Reconnaissance & Vulnerability Scanning', topics: ['OSINT', 'Port Scanning', 'Vulnerability Assessment', 'Service Enumeration'] },
      { moduleNumber: 3, title: 'Web App Exploitation & OWASP', topics: ['SQL Injection', 'Cross-Site Scripting (XSS)', 'CSRF', 'Broken Access Control'] },
      { moduleNumber: 4, title: 'Privilege Escalation & Defensive Controls', topics: ['System security', 'Active Directory security', 'SIEM & SOC overview'] },
      { moduleNumber: 5, title: 'Red vs. Blue Team Capstone Simulation', topics: ['Capture The Flag (CTF)', 'Forensic Analysis', 'Remediation Reporting'] }
    ],
    practicalProjects: [
      { title: 'Vulnerable Bank Penetration Test', description: 'Authorized black-box penetration audit on an isolated banking portal identifying critical transaction vulnerabilities.', tools: ['Burp Suite', 'Kali Linux', 'Python'] }
    ],
    learningOutcomes: [
      'Practical competence in identifying, exploiting, and fixing high-risk vulnerabilities.',
      'Preparedness for industry security certifications.',
      'Professional security reporting and remediation documentation skills.'
    ],
    faqs: [
      { question: 'Is ethical hacking legal to practice in this course?', answer: 'Yes, all exercises are strictly confined to isolated virtual sandbox labs provided by AEGIS Academy with strict safety controls.' }
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
      'Working with files, JSON, CSV, and databases',
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
      { title: 'Automated Financial Data Pipeline', description: 'Scrapes market indicators, validates records with Pydantic, and generates automated summary analytics.', tools: ['Python', 'Pandas', 'FastAPI', 'Matplotlib'] }
    ],
    learningOutcomes: [
      'Mastery of idiomatic Python syntax and clean code principles.',
      'Ability to automate repetitive data tasks and build clean web services.'
    ],
    faqs: [
      { question: 'Is Python suitable for first-time coders?', answer: 'Python is an ideal programming language due to its readable syntax and vast modern ecosystem.' }
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
      { question: 'Do I need a Mac to build iOS apps in this course?', answer: 'We utilize cloud build pipelines so students with Windows or Linux machines can complete coursework.' }
    ],
    image: '/src/assets/images/smart_agriculture_iot_1793890911194.jpg'
  },
  {
    id: 'prog-6',
    slug: 'data-structures-algorithms',
    title: 'Data Structures & Algorithms (DSA)',
    category: 'college',
    shortDescription: 'Master problem-solving, asymptotic complexity analysis, graph algorithms, and technical interview patterns.',
    overview: 'An intensive algorithm training bootcamp designed to build rigorous analytical thinking and prepare candidates for software engineering technical assessments.',
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
      'Top algorithmic problem patterns and behavioral mock drills'
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
      'Mastery of core algorithmic challenges across complexity tiers.',
      'Ability to articulate time/space trade-offs clearly to interview panels.'
    ],
    faqs: [
      { question: 'Which programming language will be used in class?', answer: 'Instruction is provided in C++ and Java with implementations provided for algorithmic demonstrations.' }
    ],
    image: '/src/assets/images/aegis_education_campus_1793890911409.jpg'
  },
  {
    id: 'prog-7',
    slug: 'aptitude-training',
    title: 'Quantitative & Logical Aptitude Training',
    category: 'college',
    shortDescription: 'Sharpen speed math, data interpretation, critical reasoning, and corporate assessment problem-solving.',
    overview: 'A high-impact training track focused on clearing company placement screening exams, competitive exams, and logical reasoning assessment rounds with speed and mathematical clarity.',
    duration: '8 Weeks (50 Hours)',
    eligibility: 'Final-year and pre-final-year students across all degree streams.',
    prerequisites: 'Basic high school mathematics.',
    learningMode: 'In-Person',
    whatYouWillLearn: [
      'Speed mathematics and mental calculation shortcuts',
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
      { title: 'Placement Mock Assessment Battery', description: 'Diagnostic evaluations benchmarked against leading national recruitment tests.', tools: ['Computer-Based Testing', 'Percentile Analytics'] }
    ],
    learningOutcomes: [
      'Significant reduction in calculation time with high accuracy rates.',
      'Confidence in clearing competitive aptitude screenings.'
    ],
    faqs: [
      { question: 'Are daily practice sheets provided?', answer: 'Yes, curated practice questions with step-by-step solutions are provided via the student dashboard.' }
    ],
    image: '/src/assets/images/aegis_education_campus_1793890911409.jpg'
  },
  {
    id: 'prog-8',
    slug: 'communication-skills',
    title: 'Soft Skills, Communication & Interview Preparation',
    category: 'college',
    shortDescription: 'Build executive presence, group discussion leadership, interview storytelling, and corporate correspondence skills.',
    overview: 'Designed to elevate verbal articulation, public speaking confidence, active listening, and persuasive writing skills required to excel in professional work environments.',
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
      { title: 'Simulated Professional Presentation', description: 'Students pitch a digital transformation initiative in front of a live panel with recorded playback critique.', tools: ['Video Review', 'Peer Rubric Feedback'] }
    ],
    learningOutcomes: [
      'Poised presentation ability and interview confidence.',
      'Clean professional writing skills devoid of ambiguity.'
    ],
    faqs: [
      { question: 'Are practice sessions recorded for review?', answer: 'Yes, student presentations are reviewed and analyzed with certified speech coaches.' }
    ],
    image: '/src/assets/images/aegis_education_campus_1793890911409.jpg'
  },
  // School programs
  {
    id: 'prog-school-1',
    slug: 'ai-awareness-schools',
    title: 'AI Awareness & Generative AI for Schools',
    category: 'school',
    shortDescription: 'Engaging, interactive introduction to how computers learn, recognize images, and assist everyday life.',
    overview: 'Specially crafted for students in Grades 9–12 to demystify artificial intelligence through playful visual experiments, machine learning labs, and ethical discussions on technology.',
    duration: '4 Weeks (16 Hours)',
    eligibility: 'School students in Grades 9 through 12.',
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
      { moduleNumber: 1, title: 'Meet the Thinking Machine', topics: ['What is Intelligence?', 'Computers vs. Humans', 'The History of Computing'] },
      { moduleNumber: 2, title: 'Teaching a Computer to See', topics: ['Visual ML Labs', 'Pixels & Patterns', 'Training vs Testing'] },
      { moduleNumber: 3, title: 'Chatting with Computers', topics: ['Language Models', 'Giving Good Instructions', 'Spotting AI Mistakes'] },
      { moduleNumber: 4, title: 'Building a Friendly Robot Project', topics: ['Visual Logic Builder', 'Ethical Tech Rules', 'Final Showcase'] }
    ],
    practicalProjects: [
      { title: 'Smart Recycling Classifier', description: 'Train a webcam model to detect whether an object is paper, plastic, or organic waste.', tools: ['Teachable Machine', 'Visual Logic'] }
    ],
    learningOutcomes: [
      'Confidence using emerging technology constructively rather than merely consuming it.',
      'Clear conceptual understanding of training data and algorithms.'
    ],
    faqs: [
      { question: 'Is complex math required for school students?', answer: 'No advanced mathematics is required; all concepts are taught through physical metaphors, games, and visual tools.' }
    ],
    image: '/src/assets/images/aegis_education_campus_1793890911409.jpg'
  },
  {
    id: 'prog-school-2',
    slug: 'computational-thinking-schools',
    title: 'Computational Thinking & Digital Literacy',
    category: 'school',
    shortDescription: 'Fostering algorithmic problem breakdown, logic puzzles, and foundational coding through creative projects.',
    overview: 'Teaches young learners in Grades 9–12 the mental models of problem solvers: decomposition, pattern recognition, abstraction, and algorithmic design using interactive tools.',
    duration: '6 Weeks (24 Hours)',
    eligibility: 'School students in Grades 9 through 12.',
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
      { title: 'Interactive Educational Game', description: 'A multi-level educational game teaching science exploration built by the student.', tools: ['Block Logic', 'Visual Coding'] }
    ],
    learningOutcomes: [
      'Strong logical structuring skills applicable to math and science.',
      'Joy of creative expression through technology.'
    ],
    faqs: [
      { question: 'Can this program be conducted on school campuses?', answer: 'Yes, AEGIS Academy conducts this program directly within partner school computer laboratories during academic terms.' }
    ],
    image: '/src/assets/images/aegis_education_campus_1793890911409.jpg'
  },
  {
    id: 'prog-school-3',
    slug: 'career-counselling-schools',
    title: 'Career Awareness & Higher Education Guidance',
    category: 'school',
    shortDescription: 'Empowering high school students to explore modern careers, higher education options, and competitive exam roadmaps.',
    overview: 'A structured career counselling and guidance track designed for Grades 9–12. Covers future career awareness, emerging technology professions, higher education pathways, competitive exams awareness, and foundational life skills.',
    duration: '2–4 Weeks (Flexible)',
    eligibility: 'School students in Grades 9 through 12.',
    prerequisites: 'None.',
    learningMode: 'In-Person',
    whatYouWillLearn: [
      'Understanding modern career paths in engineering, technology, design, and commerce',
      'Higher education options, university admissions criteria, and degree selection',
      'Awareness of national competitive entrance examinations and preparation strategies',
      'Foundational life skills, critical thinking, and communication confidence'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Career Exploration & Self-Discovery', topics: ['Aptitude Mapping', 'Emerging Tech Fields', 'Industry Demands'] },
      { moduleNumber: 2, title: 'Higher Education Roadmaps', topics: ['Degree Streams', 'Institutions & Admissions', 'Scholarships'] },
      { moduleNumber: 3, title: 'Competitive Exam Demystification', topics: ['National Exams Overview', 'Study Habits', 'Time Management'] },
      { moduleNumber: 4, title: 'Life Skills & Communication', topics: ['Confidence Building', 'Public Speaking Basics', 'Goal Setting'] }
    ],
    practicalProjects: [
      { title: 'Personal Career Blueprint', description: 'A guided portfolio blueprint mapping individual strengths to higher education targets and 5-year milestones.', tools: ['Career Assessment', 'Mentorship Review'] }
    ],
    learningOutcomes: [
      'Clear clarity on higher education options and prospective career trajectories.',
      'Actionable roadmaps for board exams and competitive entrance pathways.'
    ],
    faqs: [
      { question: 'Can parents attend the guidance sessions?', answer: 'Yes, parent-student orientation workshops are conducted as part of the school guidance program.' }
    ],
    image: '/src/assets/images/aegis_education_campus_1793890911409.jpg'
  },
  // Professional & Institutional programs
  {
    id: 'prog-pro-1',
    slug: 'faculty-development-program',
    title: 'Faculty Development Program (FDP) & Institutional Training',
    category: 'professional',
    shortDescription: 'Customized training for college faculty and educators on emerging technologies, modern pedagogical tools, and AI.',
    overview: 'Accelerate institutional teaching excellence. Tailored for college professors, department heads, and technical instructors wanting to incorporate modern software engineering and AI workflows into their curricula.',
    duration: 'Custom (1–2 Weeks)',
    eligibility: 'College faculty, professors, school teachers, and academic administrators.',
    prerequisites: 'Teaching or technical instruction background.',
    learningMode: 'Hybrid',
    whatYouWillLearn: [
      'Modern software architecture and industry development practices',
      'Teaching AI, Generative AI, and Machine Learning effectively',
      'Designing capstone projects that align with industry standards',
      'Cloud deployments, automated code grading, and open-source teaching aids'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Modern Pedagogy & Emerging Tech', topics: ['Industry Expectations', 'Curriculum Modernization', 'Interactive Labs'] },
      { moduleNumber: 2, title: 'Hands-on AI & Cloud Tools', topics: ['LLM APIs', 'Cloud Workbenches', 'Automated Lab Setups'] },
      { moduleNumber: 3, title: 'Student Mentoring & Capstones', topics: ['Project Supervision', 'Rubrics Design', 'Hackathon Mentoring'] }
    ],
    practicalProjects: [
      { title: 'Institutional Curriculum Modernization Plan', description: 'Design an updated syllabus module and corresponding hands-on laboratory exercises.', tools: ['Curriculum Templates', 'Open-source Labs'] }
    ],
    learningOutcomes: [
      'Empowered faculty ready to guide students in contemporary industry tech stacks.',
      'Certified FDP completion credentials recognized across academic alliances.'
    ],
    faqs: [
      { question: 'Can this program be conducted on our college campus?', answer: 'Yes, AEGIS Academy delivers on-campus Faculty Development Programs tailored to your institution.' }
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
      'Distributed database architecture with connection pooling and caching',
      'Automated end-to-end testing, static type checking, and CI/CD pipelines'
    ],
    technologiesUsed: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Tailwind CSS'],
    developmentProcess: [
      { step: '01', title: 'Architecture & Discovery', description: 'Requirement discovery, domain modeling, and technical specification drafting.' },
      { step: '02', title: 'Interactive Prototyping', description: 'High-fidelity wireframes, design tokens, and user journey validation.' },
      { step: '03', title: 'Agile Engineering Sprints', description: 'Two-week iterative sprints with continuous code reviews and test automation.' },
      { step: '04', title: 'Security & Quality Audit', description: 'Penetration testing, accessibility compliance checks, and performance profiling.' },
      { step: '05', title: 'Production Deployment', description: 'Zero-downtime deployment, CDN routing, monitoring setup, and post-launch support.' }
    ],
    deliverables: [
      'Production-ready, thoroughly tested source code repository with complete documentation',
      'Dockerized deployment configuration and CI/CD pipelines',
      'Interactive API documentation and schema contracts',
      'System architecture diagrams and runbooks'
    ],
    sampleProjects: [
      { name: 'SYNTRONIX ’26 Symposium Website', description: 'Digital event platform for an international student symposium supporting registrations and session schedules.' },
      { name: 'Smart Exam Seat Allocation System', description: 'Automated examination room allocation and student seating chart generator.' }
    ],
    faqs: [
      { question: 'What is your typical project delivery timeline?', answer: 'Standard enterprise MVP web applications typically range from 6 to 12 weeks depending on integration complexity.' },
      { question: 'Do you offer post-launch maintenance?', answer: 'Yes, we provide tiered maintenance, security patch updates, and ongoing infrastructure monitoring.' }
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
      'Signed application binaries ready for store release',
      'Full cross-platform source code with native build scripts',
      'Push notification server integrations and analytics dashboards'
    ],
    sampleProjects: [
      { name: 'Student Placement Readiness App', description: 'Mobile career assessment and skill diagnostics tool for university learners.' }
    ],
    faqs: [
      { question: 'Do you manage Apple App Store and Google Play approvals?', answer: 'Yes, our team handles end-to-end submission, cryptographic signing, and store approval.' }
    ],
    icon: 'Smartphone'
  },
  {
    id: 'serv-3',
    slug: 'ai-solutions',
    title: 'AI & Machine Learning Solutions',
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
      { name: 'AGRORA Crop Disease Vision Model', description: 'Machine learning model identifying plant pest and disease symptoms.' },
      { name: 'PAG Document Analysis Engine', description: 'Intelligent multi-format document parser processing PDF, PPTX, and Excel files.' }
    ],
    faqs: [
      { question: 'Is client proprietary data used to train public models?', answer: 'Never. We enforce strict enterprise zero-retention policies and private VPC deployments for all proprietary models.' }
    ],
    icon: 'Cpu'
  },
  {
    id: 'serv-4',
    slug: 'cloud-solutions',
    title: 'Cloud Solutions & DevOps',
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
      'Kubernetes cluster configuration with automated horizontal pod autoscaling',
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
      { name: 'Cloud Migration & Containerization', description: 'Migrated web services to containerized autoscaling architecture.' }
    ],
    faqs: [
      { question: 'Which cloud providers do you support?', answer: 'We build architectures on Amazon Web Services (AWS) and Google Cloud Platform (GCP).' }
    ],
    icon: 'Cloud'
  },
  {
    id: 'serv-5',
    slug: 'automation',
    title: 'Business Automation & IoT Solutions',
    category: 'Operations',
    shortDescription: 'Streamline operational bottlenecks, automate data entry, and connect physical IoT hardware systems.',
    overview: 'We design custom workflow automation engines and smart IoT systems that eliminate redundant human steps, connect hardware sensors to modern dashboards, and drastically cut processing turnaround times.',
    problemsWeSolve: [
      'Employees wasting hours copy-pasting records across disconnected enterprise tools',
      'Manual human error in data reconciliation and inventory management',
      'Lack of real-time sensory telemetry from physical equipment and facilities',
      'Slow response times for automated alert triggers'
    ],
    ourSolutions: [
      'Custom webhook and event-driven automation middleware',
      'IoT sensor mesh integration for environmental and equipment telemetry',
      'Automated data reconciliation pipelines that flag discrepancies instantly',
      'Executive dashboards streaming live operational KPIs in real time'
    ],
    technologiesUsed: ['Node.js', 'Python', 'MQTT', 'Redis', 'Webhooks', 'PostgreSQL', 'Docker'],
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
      { name: 'Smart Traffic Management Telemetry', description: 'Dynamic signal timing and vehicle density monitoring.' }
    ],
    faqs: [
      { question: 'Can you connect with custom hardware sensors?', answer: 'Yes, our team engineers microcontrollers, MQTT telemetry, and cloud ingestion pipelines.' }
    ],
    icon: 'Zap'
  },
  {
    id: 'serv-6',
    slug: 'custom-software',
    title: 'Custom Software & Deep-Tech R&D',
    category: 'Strategy & R&D',
    shortDescription: 'Deep-tech research, proprietary equipment intelligence, prototype engineering, and bespoke software solutions.',
    overview: 'Beyond traditional software consulting, AEGIS Technologies invests deeply in proprietary research and development: AI-powered software products, SaaS platforms, smart IoT solutions, and deep-tech experimental prototypes.',
    problemsWeSolve: [
      'Standard off-the-shelf software failing to address unique domain requirements',
      'Lack of research and development capabilities for experimental engineering concepts',
      'Complex hardware-software interface challenges in refrigeration and equipment intelligence'
    ],
    ourSolutions: [
      'End-to-end bespoke software engineering from concept to deployment',
      'Deep-tech experimental prototyping (e.g. UPTIME OS equipment intelligence)',
      'Structured technical feasibility studies and proof-of-concept validation',
      'Long-term technology partnerships and R&D collaboration'
    ],
    technologiesUsed: ['Python', 'C/C++', 'TypeScript', 'React', 'Embedded Systems', 'IoT Edge'],
    developmentProcess: [
      { step: '01', title: 'Research & Feasibility', description: 'Evaluating theoretical foundations, technical constraints, and hardware parameters.' },
      { step: '02', title: 'Prototype Engineering', description: 'Building functional testbeds and validating core operational hypotheses.' },
      { step: '03', title: 'Iterative Refinement', description: 'Refining algorithms, reducing error margins, and hardening performance.' },
      { step: '04', title: 'Product Architecture', description: 'Packaging verified prototypes into maintainable software architectures.' }
    ],
    deliverables: [
      'Experimental prototypes and technical research documentation',
      'Full custom source code with test suites',
      'Intellectual property preparation and technical reports'
    ],
    sampleProjects: [
      { name: 'UPTIME OS', description: 'Deep-tech refrigeration and equipment intelligence R&D initiative.' },
      { name: 'PAG Document Processing', description: 'Intelligent multi-format document analysis and contextual data extraction.' }
    ],
    faqs: [
      { question: 'What is your engagement model for custom software?', answer: 'We offer project-based development, monthly maintenance, and long-term technology partnerships.' }
    ],
    icon: 'Layers'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    slug: 'agrora-smart-agriculture',
    title: 'AGRORA – Smart Agriculture System',
    category: 'AI Solutions',
    shortDescription:
      'A smart agriculture initiative focused on identifying crop diseases, pest attacks, nutrient deficiencies, and irrigation requirements using technology-driven analysis.',
    problemStatement:
      'Farmers frequently suffer yield loss due to delayed detection of leaf diseases, fungal infections, and inefficient irrigation and chemical fertilizer application.',
    proposedSolution:
      'AGRORA combines computer vision crop disease recognition, soil nutrient analysis, and smart irrigation calculation. (Related to Smart India Hackathon problem statement SIH26180).',
    keyFeatures: [
      'Crop disease & pest attack detection via image analysis',
      'Soil nutrient deficiency identification (NPK evaluation)',
      'Precision irrigation requirement recommendations',
      'Actionable recommendations designed for regional farmers'
    ],
    techStack: ['Python', 'Computer Vision', 'FastAPI', 'React', 'IoT Telemetry'],
    outcomes: [
      'Formulated for Smart India Hackathon problem statement SIH26180',
      'Awaiting confirmation for field deployment milestones',
      'Provides actionable insights for water and fertilizer optimization'
    ],
    clientSector: 'Smart Agriculture & Agritech',
    duration: 'Ongoing Development',
    status: 'Awaiting Confirmation'
  },
  {
    id: 'proj-2',
    slug: 'uptime-os',
    title: 'UPTIME OS – Equipment Intelligence',
    category: 'Academic & Research',
    shortDescription:
      'A deep-tech research and development initiative focused on refrigeration and equipment intelligence.',
    problemStatement:
      'Industrial and commercial cooling systems experience unexpected compressor failures, refrigerant leaks, and inefficient power draw without predictive warnings.',
    proposedSolution:
      'UPTIME OS is a deep-tech research initiative researching equipment monitoring, performance analysis, predictive maintenance, and intelligent refrigeration technology.',
    keyFeatures: [
      'Real-time equipment telemetry and temperature monitoring',
      'Thermal performance and electrical load analysis',
      'Predictive maintenance indicators for cooling compressors',
      'Intelligent monitoring and alert notifications'
    ],
    techStack: ['Embedded Systems', 'IoT Edge', 'Python', 'Telemetry Pipelines', 'Data Modeling'],
    outcomes: [
      'Deep-tech research and development initiative',
      'Laboratory experimental prototype validation',
      'Focused on commercial and industrial equipment resilience'
    ],
    clientSector: 'Refrigeration Technology & Equipment Intelligence',
    duration: 'Active R&D',
    status: 'Research & Development'
  },
  {
    id: 'proj-3',
    slug: 'syntronix-26-symposium',
    title: 'SYNTRONIX ’26 Symposium Website',
    category: 'Web Applications',
    shortDescription:
      'A digital platform developed for the International Student Symposium on Humanizing Technology.',
    problemStatement:
      'Large-scale academic student symposiums require centralized digital coordination for participant registration, paper submissions, and event itineraries.',
    proposedSolution:
      'Developed a modern digital platform supporting event information, registration details, speaker schedules, and participant engagement.',
    keyFeatures: [
      'Event information & track overview schedules',
      'Participant digital registration workflow',
      'Symposium theme & presentation guidelines',
      'Responsive design with seamless mobile accessibility'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Cloud Hosting'],
    outcomes: [
      'Built for the International Student Symposium on Humanizing Technology',
      'Awaiting confirmation for production archive stats',
      'Provided streamlined information access for student delegates'
    ],
    clientSector: 'Academic & Technical Symposiums',
    duration: 'Event Platform',
    status: 'Awaiting Confirmation'
  },
  {
    id: 'proj-4',
    slug: 'smart-exam-seat-allocation',
    title: 'Smart Exam Seat Allocation System',
    category: 'Web Applications',
    shortDescription:
      'A system designed to support efficient examination seat allocation and hall management.',
    problemStatement:
      'Manual examination hall mapping in educational institutions is tedious and prone to clerical errors, branch overlap, and room capacity violations.',
    proposedSolution:
      'A web application that automates seating arrangements, distributes candidates cleanly across halls, and prevents proximity of identical department rolls.',
    keyFeatures: [
      'Automated candidate seat mapping across multiple halls',
      'Branch diversity algorithm preventing adjacent subject overlap',
      'Printable room-wise seating charts and roll rosters',
      'Administrative dashboard for exam controllers'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    outcomes: [
      'Automates institutional exam seating logistics',
      'Awaiting confirmation for production deployment tracking',
      'Eliminates manual allocation overhead'
    ],
    clientSector: 'Educational Administration',
    duration: 'Prototype',
    status: 'Awaiting Confirmation'
  },
  {
    id: 'proj-5',
    slug: 'pag-document-processing',
    title: 'PAG – Process, Analyse, Generate',
    category: 'AI Solutions',
    shortDescription:
      'An intelligent document processing and analysis initiative designed to work with documents such as PDF, PPTX, and Excel files.',
    problemStatement:
      'Organisations face substantial friction retrieving specific structured data and contextual insights trapped in heterogeneous document files.',
    proposedSolution:
      'PAG aims to process uploaded multi-format documents (PDF, PPTX, XLSX), retrieve relevant information, and generate useful outputs using AI-assisted analysis.',
    keyFeatures: [
      'Multi-format ingestion: PDF, PPTX, and Excel files',
      'Contextual information extraction and search',
      'AI-assisted analytical summary generation',
      'Clean data export for workflow integration'
    ],
    techStack: ['Python', 'FastAPI', 'LangChain', 'Vector Embeddings', 'React'],
    outcomes: [
      'Intelligent document processing concept in active development',
      'Awaiting confirmation for enterprise benchmarks',
      'Designed to reduce manual document reading time'
    ],
    clientSector: 'Enterprise Document Intelligence',
    duration: 'In Development',
    status: 'Awaiting Confirmation'
  },
  {
    id: 'proj-6',
    slug: 'placement-readiness-platform',
    title: 'AI-Powered Placement Readiness & Career Intelligence Platform',
    category: 'AI Solutions',
    shortDescription:
      'A platform concept focused on evaluating placement readiness and supporting career development through intelligent analysis.',
    problemStatement:
      'Graduates often struggle to gauge how their coding, aptitude, and communication skills measure against industry hiring criteria.',
    proposedSolution:
      'A platform concept providing diagnostic evaluation, coding review, and personalized skill development roadmaps.',
    keyFeatures: [
      'Technical assessment and code logic analysis',
      'Diagnostic skill gap identification',
      'Personalized interview preparation roadmaps',
      'Candidate progress tracking'
    ],
    techStack: ['React', 'TypeScript', 'Python', 'FastAPI', 'Tailwind CSS'],
    outcomes: [
      'Career intelligence platform concept in development',
      'Awaiting confirmation for student pilot cohorts',
      'Aims to empower students with data-driven career clarity'
    ],
    clientSector: 'Career Intelligence & EdTech',
    duration: 'In Development',
    status: 'Awaiting Confirmation'
  },
  {
    id: 'proj-7',
    slug: 'smart-traffic-management',
    title: 'Smart Traffic Management System',
    category: 'Automation Solutions',
    shortDescription:
      'A technology initiative focused on improving traffic management through intelligent and automated systems.',
    problemStatement:
      'Static, predetermined traffic signal timers result in unnecessary delays and severe junction bottlenecks during fluctuating traffic volumes.',
    proposedSolution:
      'An intelligent traffic initiative exploring vehicle density monitoring to adapt signal cycles and optimize intersection throughput.',
    keyFeatures: [
      'Vehicle density estimation at intersections',
      'Dynamic signal cycle adjustments',
      'Traffic flow monitoring and anomaly alerts',
      'Automated telemetry communication'
    ],
    techStack: ['Computer Vision', 'Python', 'IoT Controllers', 'Edge Devices'],
    outcomes: [
      'Smart city traffic automation initiative in development',
      'Awaiting confirmation for junction trial results',
      'Designed to reduce intersection waiting times'
    ],
    clientSector: 'Smart City & Automation',
    duration: 'In Development',
    status: 'Awaiting Confirmation'
  },
  {
    id: 'proj-8',
    slug: 'thiran-thedal-thittam',
    title: 'Thiran Thedal Thittam – Mentoring Initiative',
    category: 'Academic & Research',
    shortDescription:
      'A student-to-student mentoring and higher education guidance initiative empowering school students to explore career possibilities and emerging technology fields.',
    problemStatement:
      'High school students frequently lack direct mentorship, awareness of emerging technology careers, and firsthand perspectives from active engineering undergraduates.',
    proposedSolution:
      'AEGIS team conducts direct classroom mentorship sessions and interactive career roadmaps, bridging the gap between secondary school education and higher engineering disciplines.',
    keyFeatures: [
      'Direct classroom interactive career mentoring sessions',
      'Higher education pathways and engineering branch orientation',
      'Peer-to-peer relatable guidance from active engineering undergraduates',
      'Technology career awareness and practical motivation'
    ],
    techStack: ['Peer Mentoring', 'Career Roadmaps', 'Interactive Workshops', 'Education Outreach'],
    image: '/images/projects/thiran-thedal.jpeg',
    outcomes: [
      'Conducted direct classroom mentoring sessions for secondary school students',
      'Active student engagement and practical career clarity',
      'Ongoing flagship community education outreach initiative'
    ],
    clientSector: 'Higher Education & School Outreach',
    duration: 'Active Initiative',
    status: 'In Development'
  }
];

export const EVENTS: EventItem[] = [
  {
    id: 'ev-1',
    slug: 'technical-innovation-bootcamp',
    title: 'Frontier Skills & Technical Innovation Bootcamp',
    type: 'Workshop',
    date: 'Upcoming Academic Cycle 2026',
    time: '10:00 AM – 04:30 PM IST',
    location: 'On-Campus & Online Interactive Labs',
    mode: 'Hybrid',
    description:
      'Hands-on technical workshop covering modern full-stack web architectures, Python automation, and applied machine learning principles.',
    status: 'Upcoming',
    speaker: 'AEGIS Technical Instructors & Industry Mentors',
    capacity: 'Open for Student Registration'
  },
  {
    id: 'ev-2',
    slug: 'school-ai-awareness-symposium',
    title: 'School AI Awareness & Computational Thinking Seminar',
    type: 'Training Program',
    date: 'Upcoming Academic Term 2026',
    time: '09:30 AM – 01:00 PM IST',
    location: 'Partner School Campuses',
    mode: 'Offline',
    description:
      'Interactive school orientation introducing Grades 9–12 students to artificial intelligence, digital safety, and future career awareness.',
    status: 'Upcoming',
    speaker: 'AEGIS Education Faculty',
    capacity: 'School Student Delegations'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-arunai-uiux',
    title: 'UI/UX Workshop – Arunai Engineering College, Tiruvannamalai (Interactive Series)',
    category: 'Workshops',
    imageUrl: '/images/gallery/uiux-workshop-arunai-1.jpeg',
    images: [
      '/images/gallery/uiux-workshop-arunai-1.jpeg',
      '/images/gallery/uiux-workshop-arunai-2.jpeg',
      '/images/gallery/uiux-workshop-arunai-3.jpeg',
      '/images/gallery/uiux-workshop-arunai-4.jpeg'
    ],
    caption: 'Comprehensive 4-part UI/UX design workshop series at Arunai Engineering College, Tiruvannamalai. Place your cursor on the image to view the sequence 1 to 4.',
    date: '2026',
    location: 'Arunai Engineering College, Tiruvannamalai'
  },
  {
    id: 'gal-arunai-1',
    title: 'UI/UX Workshop (Sequence 1) – Arunai Engineering College',
    category: 'Workshops',
    imageUrl: '/images/gallery/uiux-workshop-arunai-1.jpeg',
    caption: 'Part 1: Introduction to user interface design principles and wireframing at Arunai Engineering College, Tiruvannamalai.',
    date: '2026',
    location: 'Arunai Engineering College, Tiruvannamalai'
  },
  {
    id: 'gal-arunai-2',
    title: 'UI/UX Workshop (Sequence 2) – Arunai Engineering College',
    category: 'Workshops',
    imageUrl: '/images/gallery/uiux-workshop-arunai-2.jpeg',
    caption: 'Part 2: Hands-on Figma prototyping and UI component architecture at Arunai Engineering College, Tiruvannamalai.',
    date: '2026',
    location: 'Arunai Engineering College, Tiruvannamalai'
  },
  {
    id: 'gal-arunai-3',
    title: 'UI/UX Workshop (Sequence 3) – Arunai Engineering College',
    category: 'Workshops',
    imageUrl: '/images/gallery/uiux-workshop-arunai-3.jpeg',
    caption: 'Part 3: Interactive user testing and student experience lab at Arunai Engineering College, Tiruvannamalai.',
    date: '2026',
    location: 'Arunai Engineering College, Tiruvannamalai'
  },
  {
    id: 'gal-arunai-4',
    title: 'UI/UX Workshop (Sequence 4) – Arunai Engineering College',
    category: 'Workshops',
    imageUrl: '/images/gallery/uiux-workshop-arunai-4.jpeg',
    caption: 'Part 4: Student prototype presentations and design critique session at Arunai Engineering College, Tiruvannamalai.',
    date: '2026',
    location: 'Arunai Engineering College, Tiruvannamalai'
  },
  {
    id: 'gal-1',
    title: 'Career Guidance – Akkarapettai, Nagapattinam',
    category: 'Workshops',
    imageUrl: '/images/gallery/career-guidance-akkarapettai-nagapattinam.jpeg',
    caption: 'Higher education guidance and career pathway mentoring session conducted by AEGIS team for students in Akkarapettai, Nagapattinam.',
    date: '2026'
  },
  {
    id: 'gal-2',
    title: 'Career Guidance – Azhiyur',
    category: 'Workshops',
    imageUrl: '/images/gallery/career-guidance-azhiyur.jpeg',
    caption: 'Student-to-student career orientation and higher secondary stream counseling session conducted at Azhiyur.',
    date: '2026'
  },
  {
    id: 'gal-3',
    title: 'Career Guidance – Sikkal',
    category: 'Workshops',
    imageUrl: '/images/gallery/career-guidance-sikkal.jpeg',
    caption: 'Interactive student mentoring and academic roadmap workshop conducted for secondary school students at Sikkal.',
    date: '2026'
  },
  {
    id: 'gal-4',
    title: 'Career Guidance – Thittachery',
    category: 'Workshops',
    imageUrl: '/images/gallery/career-guidance-thittachery.jpeg',
    caption: 'Higher education pathway awareness and future technology career counseling session at Thittachery.',
    date: '2026'
  },
  {
    id: 'gal-5',
    title: 'Project Building Workshop',
    category: 'Workshops',
    imageUrl: '/images/gallery/project-building-workshop.jpeg',
    caption: 'Hands-on practical engineering project building workshop guiding learners on end-to-end prototype development.',
    date: '2026'
  },
  {
    id: 'gal-6',
    title: 'Python Programming Workshop',
    category: 'Training Sessions',
    imageUrl: '/images/gallery/python-workshop.jpeg',
    caption: 'Intensive code laboratory and Python fundamentals training session conducted for aspiring student developers.',
    date: '2026'
  },
  {
    id: 'gal-7',
    title: 'Thiran Thedal Thittam – Classroom Mentoring Outreach',
    category: 'Campus Activities',
    imageUrl: '/images/gallery/thiran-thedal.jpeg',
    caption: 'AEGIS founding team conducting classroom mentoring, career guidance, and higher education awareness with school students.',
    date: '2026'
  }
];

/**
 * Testimonials are kept empty until genuine verified reviews are collected,
 * as strictly instructed in Phase 1 specifications.
 */
export const TESTIMONIALS: Testimonial[] = [];

export const INSIGHTS: InsightArticle[] = [
  {
    id: 'ins-1',
    slug: 'bringing-education-and-technology-together',
    title: 'Bringing Education and Technology Together for Meaningful Growth',
    category: 'Education',
    summary:
      'How bridging the divide between academic learning and real-world technology application empowers students and organisations to innovate.',
    content: [
      'The modern technological landscape evolves at a rapid pace. For learners, developing theoretical knowledge is a crucial foundation, but real growth occurs when that knowledge is applied to solve tangible, real-world problems.',
      'Through AEGIS Education and AEGIS Technologies, our approach brings education and technology together. By understanding what modern digital products require in production, we equip learners with relevant, future-ready competencies.',
      'From artificial intelligence awareness in secondary schools to rigorous collegiate engineering bootcamps, practical skill development prepares individuals to become confident creators and problem solvers.'
    ],
    author: 'Sakthinathan Jayakumar',
    readTime: '4 min read',
    publishedDate: '2026',
    tags: ['Education', 'Technology', 'Skill Development']
  },
  {
    id: 'ins-2',
    slug: 'deep-tech-and-equipment-intelligence',
    title: 'Exploring Deep-Tech: The Promise of Equipment Intelligence',
    category: 'Technology',
    summary:
      'An overview of research initiatives in commercial refrigeration, continuous equipment monitoring, and predictive maintenance.',
    content: [
      'Industrial and commercial equipment systems form the silent backbone of modern supply chains, food preservation, and healthcare storage. When these systems fail unexpectedly, the consequences are severe.',
      'Through initiatives like UPTIME OS, AEGIS Technologies explores equipment intelligence: combining sensor telemetry, performance modeling, and predictive maintenance to detect anomalies before they cause operational downtime.',
      'Investments in deep-tech research and experimental prototypes enable us to understand emerging engineering frontiers and build durable, intelligent products.'
    ],
    author: 'Vasantharaja M',
    readTime: '5 min read',
    publishedDate: '2026',
    tags: ['Deep Tech', 'IoT', 'Equipment Intelligence']
  }
];

export const CAREER_OPENINGS: JobPosting[] = [
  {
    id: 'job-1',
    title: 'Technical Trainer – Web Development & Python',
    department: 'AEGIS Education',
    type: 'Full-Time',
    location: 'Tamil Nadu / Hybrid',
    experience: 'Open for Discussion based on Technical Competency',
    overview:
      'Deliver practical, engaging technical sessions in web development, Python, and modern software fundamentals for collegiate student cohorts.',
    responsibilities: [
      'Conduct practical, hands-on programming workshops and lab guidance',
      'Assist students with capstone project building and technical problem solving',
      'Collaborate on curriculum exercises and code review guidelines'
    ],
    requirements: [
      'Strong proficiency in Python or modern Full Stack JavaScript/TypeScript',
      'Passion for teaching and breaking down technical concepts clearly',
      'Good communication and interpersonal skills'
    ],
    status: 'Open'
  },
  {
    id: 'job-2',
    title: 'Software Developer – Web & Mobile Systems',
    department: 'AEGIS Technologies',
    type: 'Full-Time',
    location: 'Tamil Nadu / Hybrid',
    experience: 'Experience in Building Web or Mobile Applications',
    overview:
      'Contribute to developing client software solutions, responsive web applications, and internal technology products at AEGIS Technologies.',
    responsibilities: [
      'Write clean, well-tested code in React, Node.js, or mobile frameworks',
      'Collaborate with product and design leads on feature implementation',
      'Participate in code reviews, bug fixes, and deployment releases'
    ],
    requirements: [
      'Solid command of modern web technologies (React, Node.js, TypeScript, SQL)',
      'Problem-solving mindset and eagerness to learn emerging technologies',
      'Familiarity with Git and collaborative development'
    ],
    status: 'Open'
  },
  {
    id: 'job-3',
    title: 'Student Technical Intern (Unpaid Learning Internship)',
    department: 'AEGIS Education & Tech Labs',
    type: 'Internship',
    location: 'Virtual / On-Campus',
    experience: 'Students from All Academic Years (All Streams Eligible)',
    overview:
      'Unpaid learning internship open throughout the year. Focuses strictly on practical skill development, project-based learning, teamwork, and technical mentorship. No stipend is provided.',
    responsibilities: [
      'Participate in project-based learning modules under mentor guidance',
      'Work in small teams to solve real-world technical problems',
      'Present and defend completed project milestones'
    ],
    requirements: [
      'Curiosity and eagerness to learn programming and technology',
      'Enrolled college student (any academic year and stream)',
      'Willingness to commit to regular learning hours and project reviews'
    ],
    status: 'Open'
  },
  {
    id: 'job-4',
    title: 'Campus Ambassador & Event Coordinator',
    department: 'Events & Community',
    type: 'Part-Time',
    location: 'College Campuses (Regional)',
    experience: 'Enrolled College Student',
    overview:
      'Represent AEGIS Academy on your campus, assist in coordinating technical workshops, and support student engagement for events.',
    responsibilities: [
      'Share event and workshop information with fellow students',
      'Coordinate on-campus workshop logistics and student registrations',
      'Gather participant feedback and support community growth'
    ],
    requirements: [
      'Active student with good communication and networking abilities',
      'Enthusiasm for technology and student community building',
      'Reliable, organised, and collaborative attitude'
    ],
    status: 'Open'
  }
];

export const PARTNERSHIP_MODELS = [
  {
    title: 'School Innovation Alliance',
    target: 'Secondary Schools (Grades 9–12)',
    description:
      'Equip school students with foundational AI awareness, digital literacy, computational thinking, and career guidance through interactive workshops.',
    benefits: [
      'Age-appropriate AI & digital literacy workshops',
      'Hands-on interactive problem solving and logic games',
      'Higher education pathways and career counselling for Grades 9–12',
      'Structured sessions that fit school academic timetables'
    ]
  },
  {
    title: 'Collegiate Center of Excellence (CoE) & Bootcamps',
    target: 'Engineering Colleges & Universities',
    description:
      'Establish technical bootcamps and collaborative workshops that provide students with industry-relevant skill training in Web Development, Python, AI, and Cybersecurity.',
    benefits: [
      'Practical technical workshops aligned with modern industry tools',
      'Hands-on project mentoring and capstone development guidance',
      'Faculty Development Programs (FDP) on emerging technologies',
      'Symposium and campus hackathon collaboration'
    ]
  },
  {
    title: 'Corporate & Technology Partnerships',
    target: 'Startups, SMEs & Enterprises',
    description:
      'Collaborate with AEGIS Technologies on custom software development, automated digital solutions, and exploratory technology initiatives.',
    benefits: [
      'Project-based software engineering and digital transformation',
      'Flexible engagement models (project development, monthly maintenance)',
      'Access to motivated technical talent and collaborative R&D',
      'Tailored solutions for real-world business challenges'
    ]
  }
];
