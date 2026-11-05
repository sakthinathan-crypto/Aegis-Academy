export interface Program {
  id: string;
  slug: string;
  title: string;
  category: 'school' | 'college' | 'professional';
  shortDescription: string;
  overview: string;
  duration: string;
  eligibility: string;
  prerequisites: string;
  learningMode: 'In-Person' | 'Hybrid' | 'Virtual Live';
  whatYouWillLearn: string[];
  curriculum: {
    moduleNumber: number;
    title: string;
    topics: string[];
  }[];
  practicalProjects: {
    title: string;
    description: string;
    tools: string[];
  }[];
  learningOutcomes: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  image?: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  overview: string;
  problemsWeSolve: string[];
  ourSolutions: string[];
  technologiesUsed: string[];
  developmentProcess: {
    step: string;
    title: string;
    description: string;
  }[];
  deliverables: string[];
  sampleProjects: {
    name: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  icon: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'Web Applications' | 'Mobile Applications' | 'AI Solutions' | 'Automation Solutions' | 'Academic & Research';
  shortDescription: string;
  problemStatement: string;
  proposedSolution: string;
  keyFeatures: string[];
  techStack: string[];
  image: string;
  outcomes: string[];
  clientSector: string;
  duration: string;
}

export interface Leader {
  id: string;
  name: string;
  designation: string;
  department: string;
  bio: string;
  avatar: string;
  linkedInUrl: string;
  isSampleProfile: boolean;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  type: 'Workshop' | 'Hackathon' | 'Technical Session' | 'Training Program';
  date: string;
  time: string;
  location: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  description: string;
  status: 'Upcoming' | 'Past';
  speaker: string;
  capacity: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Workshops' | 'Events' | 'Training Sessions' | 'Team Activities' | 'Campus Activities' | 'Projects';
  imageUrl: string;
  caption: string;
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  category: 'Student' | 'Institution' | 'Corporate';
  quote: string;
  rating: number;
}

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Artificial Intelligence' | 'Education' | 'Technology' | 'Career Development' | 'Industry Trends' | 'Company Updates';
  summary: string;
  content: string[];
  author: string;
  readTime: string;
  publishedDate: string;
  tags: string[];
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  type: 'Full-Time' | 'Part-Time' | 'Internship' | 'Contract';
  location: string;
  experience: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  status: 'Open' | 'Closed';
}

export interface EnrollmentSubmission {
  id: string;
  studentName: string;
  phone: string;
  whatsapp: string;
  email: string;
  institutionName: string;
  department: string;
  yearOfStudy: string;
  district: string;
  selectedProgram: string;
  learningMode: string;
  additionalInfo?: string;
  submittedAt: string;
  status: 'Pending' | 'Contacted' | 'Enrolled' | 'Archived';
}

export interface QuoteRequestSubmission {
  id: string;
  name: string;
  organization: string;
  email: string;
  phone: string;
  serviceRequired: string;
  projectDescription: string;
  estimatedBudget: string;
  expectedTimeline: string;
  additionalRequirements?: string;
  submittedAt: string;
  status: 'New' | 'Reviewing' | 'Quoted' | 'Closed';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category: 'General Inquiry' | 'Education Inquiry' | 'Technology Services' | 'Partnership';
  subject: string;
  message: string;
  submittedAt: string;
  status: 'Unread' | 'Replied' | 'Archived';
}

export interface PartnershipInquiry {
  id: string;
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  type: 'School' | 'College' | 'University' | 'Corporate' | 'Technology Partner';
  message: string;
  submittedAt: string;
}
