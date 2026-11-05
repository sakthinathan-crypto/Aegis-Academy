import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEmail, validatePhone, generateApplicationId, validateEnrollmentForm, validateQuoteRequest } from './validation';

test('validateEmail correctly accepts valid emails', () => {
  assert.equal(validateEmail('student@aegisacademy.sample.in'), true);
  assert.equal(validateEmail('contact.dean@college.edu'), true);
  assert.equal(validateEmail('invalid-email'), false);
  assert.equal(validateEmail('missing@domain'), false);
  assert.equal(validateEmail(''), false);
});

test('validatePhone checks appropriate length and format', () => {
  assert.equal(validatePhone('+919845012345'), true);
  assert.equal(validatePhone('9845012345'), true);
  assert.equal(validatePhone('+1 (555) 019-2834'), true);
  assert.equal(validatePhone('123'), false);
  assert.equal(validatePhone(''), false);
});

test('generateApplicationId creates formatted IDs with prefix', () => {
  const id1 = generateApplicationId('AEGIS-STU');
  assert.match(id1, /^AEGIS-STU-\d{4}-[A-Z0-9]+$/);
  
  const id2 = generateApplicationId('QUOTE');
  assert.match(id2, /^QUOTE-\d{4}-[A-Z0-9]+$/);
});

test('validateEnrollmentForm rejects incomplete submissions and passes valid ones', () => {
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
