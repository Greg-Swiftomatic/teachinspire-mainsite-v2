/**
 * English copy, for groups invited with --lang en.
 *
 * Written for English-speaking language teachers, not translated line by
 * line. British spelling, like the Studio's English interface. The type
 * forces the same keys as the French copy, so a missing string fails the
 * build instead of showing up blank.
 */

import type { Copy } from './fr';

export const en: Copy = {
  meta: {
    title: 'Your feedback on the course | TeachInspire',
  },

  app: {
    eyebrow: 'Course: “Create tailor-made lessons”',
    hello: (name: string) => `Hi ${name}, your feedback matters.`,
    title: 'Your feedback on the course',
    intro: 'It takes about 8 minutes, and most questions are multiple choice.',
    goalFinished:
      ' The aim is to understand what the course has changed (or not) in the way you prepare your lessons, now that you can look back on it.',
    goalOngoing:
      ' The aim is to understand what the course has already changed (or not) in the way you prepare your lessons, and what we should improve before it ends.',
    creditStrong: '30 free minutes of audio credits on your Studio account',
    creditRest:
      'as soon as you send your answers, whatever they say, and whether or not you agree to be quoted.',
    thanks: (name: string) => (name ? `Thank you, ${name}.` : 'Thank you.'),
    already:
      'We already have a response from this account: your 30 minutes of audio credits are yours, and there’s nothing else to do. Any questions?',
    footer: 'TeachInspire, AI training for language teachers.',
  },

  login: {
    label: 'Participants only',
    title: 'Sign in with your Studio account',
    introBefore:
      'The questionnaire (and the 30 free minutes of audio credits) is for course participants only. Please use the login details of your',
    introAfter: ' account.',
    email: 'Account email',
    password: 'Password',
    forgot: 'Forgotten your password?',
    submit: 'Sign in',
    failed: 'We couldn’t sign you in.',
    privacy:
      'Your login details are checked directly with the Studio. This form never records or stores them.',
  },

  success: {
    title: 'Thank you, your answers are saved.',
    usedFinished: 'Your answers go straight into improving the next sessions.',
    usedOngoing:
      'Your answers go straight into improving the rest of the course and the next sessions.',
    critique: 'Criticism counts just as much as praise.',
    creditStrong: 'Your 30 minutes of audio credits',
    creditAdded: 'have been added',
    creditPending: 'will be added within 48 hours',
    creditTo: 'to your Studio account',
    review:
      'If you agreed to be quoted, Grégory will send you the exact text before anything goes online. Nothing will be published without your written approval.',
    question: 'Any questions?',
  },

  form: {
    restored: 'We found your previous answers. You can pick up where you left off.',
    step: (n: number, total: number) => `Step ${n} of ${total}`,
    percent: (p: number) => `${p}%`,
    back: 'Back',
    next: 'Continue',
    sending: 'Sending…',
    send: 'Send my answers',
    sendFailed: 'Your answers couldn’t be sent',
    networkFailed: 'Your answers couldn’t be sent. Check your connection and try again.',
    honeypot: 'Leave this empty',

    // Step 1
    youLabel: 'About you',
    roleQuestion: 'Which best describes you?',
    roleHint: 'Your name and email come from your Studio account, so there’s no need to type them again.',
    roleAria: 'Your situation',
    roles: {
      direction: 'I run a language school or training organisation',
      independant: 'I’m a freelance language teacher or trainer',
      salarie: 'I teach at a language school or training organisation',
    },
    instituteEmployed: 'Your school',
    instituteOther: 'The name of your organisation',
    instituteHintIndependent:
      'The name you work under. If you work under your own name, just enter that.',
    instituteHint: 'As your clients know it.',
    city: 'Your city',
    cityPlaceholder: 'Nantes',
    languages: 'Language(s) you teach',
    languagesPlaceholder: 'English, French…',
    sectors: 'Which sectors do your learners work in?',
    sectorsHint: 'Law, manufacturing, healthcare, hospitality…',

    // Step 2
    startLabel: 'At the start',
    reactionAssigned:
      'When your school told you about this course, what was your first thought?',
    reactionChosen: 'When you signed up, where did you stand with AI?',
    reactionHint: 'Please be honest: your doubts interest us as much as your enthusiasm.',
    reactionAria: 'Your first reaction',
    reactionsAssigned: {
      curieux: 'Curious, and fairly keen',
      sceptique: 'Sceptical: I’d already tried AI and wasn’t convinced',
      reticent: 'Reluctant: I couldn’t see what AI had to do with my job',
      inquiet: 'Worried about the future of the profession',
      pas_le_temps: '“Yet another training course”: I didn’t have the time',
      autre: 'Something else',
    },
    reactionsChosen: {
      curieux: 'Curious, with no clear idea of what I’d get out of it',
      sceptique: 'Sceptical: I’d already tried AI and wasn’t convinced',
      reticent: 'Hesitant: I couldn’t really see what AI had to do with my job',
      inquiet: 'Worried about the future of the profession',
      pas_le_temps: 'Interested, but not sure I’d have the time to keep up',
      autre: 'Something else',
    },
    reactionOtherPlaceholder: 'In a sentence',
    reactionOtherAria: 'Tell us more',
    timeBeforeQuestion:
      'Before the course, how long did it take you to prepare a tailor-made session?',
    timeBeforeHint:
      'A session built for a specific learner or sector, from an article, a podcast or a document from their company.',
    timeBeforeAria: 'Preparation time before the course',
    timeBefore: {
      moins_1h: 'Less than 1 hour',
      '1_2h': '1 to 2 hours',
      '2_3h': '2 to 3 hours',
      plus_3h: 'More than 3 hours',
      aucune: 'I didn’t prepare tailor-made lessons',
    },

    // Step 3
    nowLabelFinished: 'Today',
    nowLabelOngoing: 'So far',
    timeNowQuestion: 'Today, the same session takes you:',
    timeNowAria: 'Preparation time today',
    timeNow: {
      moins_30: 'Less than 30 minutes',
      '30_60': '30 minutes to 1 hour',
      '1_2h': '1 to 2 hours',
      plus_2h: 'More than 2 hours',
      non_utilise: 'I haven’t used the method on a real lesson yet',
    },
    timeNowUnusedFinished: 'I don’t use the method',
    frequencyQuestion: 'How often do you use the method?',
    frequencyAria: 'How often',
    frequency: {
      hebdo: 'Every week',
      mensuel: 'A few times a month',
      rare: 'Rarely',
      jamais: 'Not yet',
    },
    frequencyNeverFinished: 'Not any more',
    changedQuestion: 'What has actually changed in the way you prepare your lessons?',
    changedHint:
      'This is the question that matters most. What do you do now that you didn’t do before? What have you stopped doing? If nothing has changed yet, tell us that too.',
    changedTooShort: (n: number, min: number) =>
      `Just a few more words: this is the answer that helps us most (${n}/${min} characters minimum).`,
    artifactQuestion: 'What have you created with the method so far?',
    artifactHint: 'For which learner or sector, and from what source?',
    feedbackQuestion: 'Has a learner reacted to a lesson you created with the method?',
    feedbackHint: 'Optional. What they said, even in just a few words.',

    // Step 4
    opinionLabel: 'Your view',
    skepticQuestion:
      'A fellow teacher or a language school director asks you whether the course is worth it. What do you tell them?',
    skepticHint: 'A few sentences, just as you would say it to them.',
    keepQuestion: 'If you could keep only one thing from the course, what would it be?',
    keepPlaceholder: 'A module, a tool, a prompt, a workshop…',
    missingFinished: 'What was missing for you?',
    missingOngoing: 'What’s missing for you so far?',
    missingHint:
      'What we should improve first. Criticism is more useful to us than praise.',
    recommendQuestion: 'Would you recommend the course to a colleague?',
    scaleAria: 'Score from 0 to 10',
    scaleLow: '0: not at all',
    scaleHigh: '10: without hesitation',

    // Step 5
    networkLabel: 'Your network',
    networkDirection:
      'Do you know other language school directors who might be interested in this course?',
    networkOther: 'Do you also work for other language schools or training organisations?',
    networkHint: 'Optional. Feel free to name them.',
    introQuestion: 'Would you be open to Grégory asking you to introduce him to one of them?',
    introHint: 'He’ll write to you first to talk it over. Nothing will happen without your agreement.',
    introAria: 'Introduction',
    intro: {
      oui: 'Yes, happy to',
      peut_etre: 'Maybe, let’s talk about it',
      non: 'No, thanks',
    },

    // Step 6
    publishLabel: 'Publication',
    publishQuestion: 'May we quote your answers?',
    publishHint:
      'Testimonials help other teachers and schools understand what the course really brings. You choose what appears.',
    publishToggle: 'I allow TeachInspire to publish an excerpt from my answers.',
    publishToggleNote:
      'If you leave this unticked, your answers stay internal, and you still get the credits.',
    namingQuestion: 'How should we name you?',
    namingAria: 'Name shown',
    naming: {
      full_name: 'My first name and surname',
      initial: 'My first name and the initial of my surname',
      first_name: 'My first name only',
      anonymous: 'No name: just my role and my city',
    },
    displayNameLabel: 'Your name as it should appear',
    scopeQuestion: 'What can appear with your testimonial',
    scopeHint: 'Tick everything you’re happy with.',
    scopeRole: 'My role',
    displayTitleLabel: 'Your role as it should appear',
    titlePlaceholder: {
      direction: 'Director, Langues & Co',
      independant: 'Freelance English trainer',
      salarie: 'English trainer at Langues & Co',
    },
    titlePlaceholderDefault: 'English trainer',
    scopeInstitute: 'The name of my organisation',
    scopeCity: 'My city',
    scopeLinkedin: 'A link to my LinkedIn profile',
    linkedinLabel: 'Your profile link',
    scopePhoto: 'My photo',
    scopePhotoNote: 'The one on your LinkedIn profile, or a photo Grégory will ask you for.',
    previewTitle: 'Preview of your testimonial',
    quote: (text: string) => `“${text}”`,
    quotePlaceholder:
      'Your answer to the question about a hesitant colleague or director will appear here.',
    namingPending: 'Choose how you’d like to be named',
    linkedinBadge: '· LinkedIn profile',
    previewNote:
      'We’ll choose and shorten the final excerpt together: Grégory will send you the exact text, and nothing will be published without your written approval. Not a single word is added to what you wrote.',
    whereQuestion: 'Where it might appear',
    where: [
      'The teachinspire.me website',
      'TeachInspire’s LinkedIn posts',
      'Presentation documents sent to language schools',
    ],
    extrasQuestion: 'And if you’d like',
    willingVideo:
      'I’m happy to record a short video (1 to 2 minutes) on a video call with Grégory, showing a lesson I created',
    willingLinkedinPost: 'I’m happy to post my own feedback on LinkedIn',
    creditsNote:
      'Your 30 minutes of audio credits will be added to the Studio account you’re signed in with, whatever your answers.',
    privacy:
      'TeachInspire keeps your answers for 3 years and never shares them with anyone. To change or withdraw your permission at any time, write to greg@teachinspire.me: the quote will be taken down within 7 days.',

    // Signature, while something is still missing
    firstNamePlaceholder: 'First name',
    fullNamePlaceholder: 'First name Surname',
    anonymousSignature: 'Course participant',

    // Incomplete consent
    namingMissing: 'Choose how you’d like to be named, or untick the permission to publish.',
    displayNameMissing: 'Enter your name as it should appear.',
    titleMissing: 'Enter your role, or untick “My role”.',
    cityMissing: 'Enter your city in step 1, or untick “My city”.',
    linkedinInvalid:
      'The LinkedIn link must start with https://www.linkedin.com/, or untick this option.',
  },
};
