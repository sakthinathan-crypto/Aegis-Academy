import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FIELD_LIMITS,
  validateEmail,
  validatePhone,
  getSafeExternalUrl,
  generateApplicationId,
  validateEnrollmentForm,
  validateQuoteRequest,
  validateContactForm,
  validateCareerApplicationForm
} from './validation';

test('validateEmail correctly accepts valid emails and rejects CRLF or oversized inputs', () => {
  assert.equal(validateEmail('student@aegisacademy.sample.in'), true);
  assert.equal(validateEmail('contact.dean@college.edu'), true);
  assert.equal(validateEmail('invalid-email'), false);
  assert.equal(validateEmail('missing@domain'), false);
  assert.equal(validateEmail(''), false);
  assert.equal(validateEmail("victim@example.com\r\nBcc: attacker@evil.com"), false);
  assert.equal(validateEmail("victim@example.com\nSubject: Injected"), false);
  assert.equal(validateEmail(`${'a'.repeat(145)}@example.com`), false);
});

test('validatePhone checks appropriate length and format', () => {
  assert.equal(validatePhone('+919845012345'), true);
  assert.equal(validatePhone('9845012345'), true);
  assert.equal(validatePhone('+1 (555) 019-2834'), true);
  assert.equal(validatePhone('123'), false);
  assert.equal(validatePhone('abc9845012345'), false);
  assert.equal(validatePhone('+91 98450 12345 67890 123456'), false);
  assert.equal(validatePhone(''), false);
});

test('getSafeExternalUrl permits safe http/https URLs and blocks XSS protocols and untrusted hosts', () => {
  assert.equal(getSafeExternalUrl('https://linkedin.com/in/example'), 'https://linkedin.com/in/example');
  assert.equal(getSafeExternalUrl('http://github.com/org/repo'), 'http://github.com/org/repo');
  assert.equal(getSafeExternalUrl('javascript:alert(1)'), null);
  assert.equal(getSafeExternalUrl('JAVASCRIPT:alert(document.cookie)'), null);
  assert.equal(getSafeExternalUrl('data:text/html,<script>alert(1)</script>'), null);
  assert.equal(getSafeExternalUrl('vbscript:msgbox(1)'), null);
  assert.equal(getSafeExternalUrl('file:///etc/passwd'), null);
  assert.equal(getSafeExternalUrl('not a url'), null);

  assert.equal(
    getSafeExternalUrl('https://drive.google.com/file/d/abc/view', ['google.com', 'googleusercontent.com']),
    'https://drive.google.com/file/d/abc/view'
  );
  assert.equal(
    getSafeExternalUrl('https://google.com.evil.com/phish', ['google.com', 'googleusercontent.com']),
    null
  );
  assert.equal(
    getSafeExternalUrl('https://evil.com/malware', ['google.com', 'googleusercontent.com']),
    null
  );
});

test('generateApplicationId creates formatted IDs with prefix', () => {
  const id1 = generateApplicationId('AEGIS-STU');
  assert.match(id1, /^AEGIS-STU-\d{4}-[A-Z0-9]+$/);

  const id2 = generateApplicationId('QUOTE');
  assert.match(id2, /^QUOTE-\d{4}-[A-Z0-9]+$/);
});

test('validateEnrollmentForm rejects incomplete or oversized submissions and passes valid ones', () => {
  const invalidResult = validateEnrollmentForm({
    studentName: '',
    phone: '123',
    whatsapp: '',
    email: 'bad-email',
    institutionName: '',
    department: '',
    yearOfStudy: '',
    district: '',
    selectedProgram: '',
    learningMode: ''
  });

  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.studentName);
  assert.ok(invalidResult.errors.phone);
  assert.ok(invalidResult.errors.email);

  const validResult = validateEnrollmentForm({
    studentName: 'Priya Narayanan',
    phone: '9845012345',
    whatsapp: '9845012345',
    email: 'priya.n@university.sample.in',
    institutionName: 'National Institute of Technology',
    department: 'Computer Science and Engineering',
    yearOfStudy: '3rd Year Undergraduate',
    district: 'Bengaluru Urban',
    selectedProgram: 'full-stack-web-development',
    learningMode: 'Hybrid'
  });

  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);

  const oversized = validateEnrollmentForm({
    studentName: 'Priya Narayanan',
    phone: '9845012345',
    whatsapp: '9845012345',
    email: 'priya.n@university.sample.in',
    institutionName: 'National Institute of Technology',
    department: 'CSE',
    yearOfStudy: '3rd Year Undergraduate',
    district: 'Bengaluru',
    selectedProgram: 'full-stack-web-development',
    learningMode: 'Hybrid',
    additionalInfo: 'x'.repeat(FIELD_LIMITS.MESSAGE_MAX + 1)
  });
  assert.equal(oversized.isValid, false);
  assert.ok(oversized.errors.additionalInfo);
});

test('validateQuoteRequest validates all mandatory fields', () => {
  const invalid = validateQuoteRequest({
    name: 'A',
    organization: '',
    email: 'test',
    phone: '',
    serviceRequired: '',
    projectDescription: 'Short',
    estimatedBudget: '',
    expectedTimeline: ''
  });
  assert.equal(invalid.isValid, false);

  const valid = validateQuoteRequest({
    name: 'Suresh Menon',
    organization: 'Apex Logistics Corp',
    email: 'suresh@apexlogistics.sample.in',
    phone: '+919845099887',
    serviceRequired: 'Web Application Development',
    projectDescription: 'We require a scalable multi-warehouse dispatch automation system.',
    estimatedBudget: '$15,000 - $30,000',
    expectedTimeline: '8-12 Weeks'
  });
  assert.equal(valid.isValid, true);
});

test('validateContactForm enforces schema and length rules', () => {
  const invalid = validateContactForm({
    name: 'A',
    email: "bad@example.com\r\nBcc:evil@evil.com",
    phone: '12',
    category: '',
    subject: 'Hi',
    message: 'Too short'
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.category);
  assert.ok(invalid.errors.subject);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Karthik Subramanian',
    email: 'karthik@college.edu',
    phone: '+91 9876543210',
    organization: 'Engineering College',
    category: 'Institutional Partnership',
    subject: 'Campus Workshop Proposal',
    message: 'We would like to discuss hosting a two-day engineering workshop next month.'
  });
  assert.equal(valid.isValid, true);
});

test('validateCareerApplicationForm blocks javascript URLs and passes valid applicants', () => {
  const xssAttempt = validateCareerApplicationForm({
    candidateName: 'Ananya Rao',
    email: 'ananya@example.com',
    phone: '9876543210',
    qualification: 'B.E. Computer Science',
    collegeOrOrg: 'Anna University',
    linkedInOrPortfolio: 'javascript:alert(document.domain)',
    coverNote: 'Looking forward to contributing.'
  });
  assert.equal(xssAttempt.isValid, false);
  assert.ok(xssAttempt.errors.linkedInOrPortfolio);

  const valid = validateCareerApplicationForm({
    candidateName: 'Ananya Rao',
    email: 'ananya@example.com',
    phone: '9876543210',
    qualification: 'B.E. Computer Science',
    collegeOrOrg: 'Anna University',
    linkedInOrPortfolio: 'https://www.linkedin.com/in/ananya-rao',
    coverNote: 'Looking forward to contributing.'
  });
  assert.equal(valid.isValid, true);
});
