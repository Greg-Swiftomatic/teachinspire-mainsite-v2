/**
 * Textes du formulaire en français, la langue par défaut.
 *
 * Les valeurs des choix (direction, curieux, moins_1h…) ne sont jamais
 * traduites : elles sont stockées telles quelles et restent comparables d'une
 * langue à l'autre. Seuls les libellés vivent ici.
 */

export const fr = {
  meta: {
    title: 'Votre retour sur le parcours | TeachInspire',
  },

  app: {
    eyebrow: 'Parcours « Créez des cours sur mesure »',
    hello: (name: string) => `Bonjour ${name}, votre retour compte.`,
    title: 'Votre retour sur le parcours',
    intro: 'Environ 8 minutes, et la plupart des questions sont à cocher.',
    goalFinished:
      " L'objectif : comprendre ce que le parcours a changé (ou pas) dans votre façon de préparer vos cours, maintenant que vous avez du recul.",
    goalOngoing:
      " L'objectif : comprendre ce que le parcours a déjà changé (ou pas) dans votre façon de préparer vos cours, et ce qu'il faut améliorer d'ici la fin.",
    creditStrong: '30 minutes de crédits audio offertes sur votre compte Studio',
    creditRest:
      "dès l'envoi de vos réponses, quel que soit leur contenu, et que vous acceptiez ou non d'être cité·e.",
    thanks: (name: string) => (name ? `Merci, ${name}.` : 'Merci.'),
    already:
      "Une réponse existe déjà pour ce compte : vos 30 minutes de crédits audio sont acquises, il n'y a rien d'autre à faire. Une question ?",
    footer: 'TeachInspire, formation IA pour formateurs de langues.',
  },

  login: {
    label: 'Réservé aux participants',
    title: 'Connectez-vous avec votre compte Studio',
    introBefore:
      'Le questionnaire (et les 30 minutes de crédits audio offertes) est réservé aux participants de la formation. Utilisez les identifiants de votre compte',
    introAfter: '.',
    email: 'Email du compte',
    password: 'Mot de passe',
    forgot: 'Mot de passe oublié ?',
    submit: 'Se connecter',
    failed: 'Connexion impossible.',
    privacy:
      'Vos identifiants sont vérifiés directement auprès du Studio et ne sont ni enregistrés ni conservés par ce formulaire.',
  },

  success: {
    title: "Merci, c'est enregistré.",
    usedFinished: 'Vos réponses servent directement à améliorer les prochaines sessions.',
    usedOngoing:
      'Vos réponses servent directement à améliorer la fin du parcours et les prochaines sessions.',
    critique: 'Les critiques comptent autant que les compliments.',
    creditStrong: 'Vos 30 minutes de crédits audio',
    creditAdded: 'ont été ajoutées',
    creditPending: 'seront ajoutées sous 48 heures',
    creditTo: 'à votre compte Studio',
    review:
      'Si vous avez autorisé la publication, Grégory vous enverra la version exacte du texte avant toute mise en ligne. Rien ne sera publié sans votre accord écrit.',
    question: 'Une question ?',
  },

  form: {
    restored:
      'Vos réponses précédentes ont été retrouvées. Vous pouvez reprendre où vous en étiez.',
    step: (n: number, total: number) => `Étape ${n} sur ${total}`,
    percent: (p: number) => `${p} %`,
    back: 'Retour',
    next: 'Continuer',
    sending: 'Envoi…',
    send: 'Envoyer mes réponses',
    sendFailed: 'Échec de l’envoi',
    networkFailed: "L'envoi a échoué. Vérifiez votre connexion et réessayez.",
    honeypot: 'Ne pas remplir',

    // Étape 1
    youLabel: 'Vous',
    roleQuestion: 'Quelle est votre situation ?',
    roleHint: 'Votre nom et votre email viennent de votre compte Studio, inutile de les ressaisir.',
    roleAria: 'Situation',
    roles: {
      direction: 'Je dirige un institut ou un organisme de formation',
      independant: 'Je suis formateur ou formatrice indépendant·e',
      salarie: 'Je suis formateur ou formatrice au sein d’un institut',
    },
    instituteEmployed: 'Votre institut',
    instituteOther: 'Le nom de votre structure',
    instituteHintIndependent:
      'Le nom sous lequel vous exercez. Si vous exercez à votre nom, indiquez-le simplement.',
    instituteHint: 'Tel que vos clients le connaissent.',
    city: 'Votre ville',
    cityPlaceholder: 'Nantes',
    languages: 'Langue(s) enseignée(s)',
    languagesPlaceholder: 'Anglais, FLE…',
    sectors: 'Dans quels secteurs travaillent vos apprenants ?',
    sectorsHint: 'Juridique, industrie, santé, hôtellerie…',

    // Étape 2
    startLabel: 'Au départ',
    reactionAssigned:
      'Quand votre direction vous a annoncé ce parcours, qu’est-ce que vous vous êtes dit ?',
    reactionChosen: 'Au moment de vous inscrire, où en étiez-vous avec l’IA ?',
    reactionHint: "Répondez franchement : les réserves nous intéressent autant que l'enthousiasme.",
    reactionAria: 'Réaction initiale',
    reactionsAssigned: {
      curieux: 'Curieux ou curieuse, plutôt partant·e',
      sceptique: "Sceptique : j'avais déjà essayé l'IA sans résultat convaincant",
      reticent: "Réticent·e : je ne voyais pas ce que l'IA venait faire dans mon métier",
      inquiet: "Inquiet ou inquiète pour l'avenir du métier",
      pas_le_temps: '« Encore une formation » : je n’avais pas le temps',
      autre: 'Autre',
    },
    reactionsChosen: {
      curieux: 'Curieux ou curieuse, sans idée précise de ce que j’allais en tirer',
      sceptique: "Sceptique : j'avais déjà essayé l'IA sans résultat convaincant",
      reticent: "Réservé·e : je ne voyais pas bien ce que l'IA venait faire dans mon métier",
      inquiet: "Inquiet ou inquiète pour l'avenir du métier",
      pas_le_temps: 'Intéressé·e, mais pas sûr·e d’avoir le temps de suivre',
      autre: 'Autre',
    },
    reactionOtherPlaceholder: 'En une phrase',
    reactionOtherAria: 'Précisez',
    timeBeforeQuestion:
      "Avant le parcours, combien de temps vous prenait la préparation d'une séance sur mesure ?",
    timeBeforeHint:
      "Une séance construite pour un apprenant ou un secteur précis, à partir d'un article, d'un podcast ou d'un document de l'entreprise.",
    timeBeforeAria: 'Temps avant',
    timeBefore: {
      moins_1h: "Moins d'1 h",
      '1_2h': '1 à 2 h',
      '2_3h': '2 à 3 h',
      plus_3h: 'Plus de 3 h',
      aucune: 'Je ne préparais pas de cours sur mesure',
    },

    // Étape 3
    nowLabelFinished: 'Aujourd’hui',
    nowLabelOngoing: 'Jusqu’ici',
    timeNowQuestion: "Aujourd'hui, la même séance vous prend :",
    timeNowAria: "Temps aujourd'hui",
    timeNow: {
      moins_30: 'Moins de 30 min',
      '30_60': '30 min à 1 h',
      '1_2h': '1 à 2 h',
      plus_2h: 'Plus de 2 h',
      non_utilise: "Je n'ai pas encore utilisé la méthode sur un vrai cours",
    },
    timeNowUnusedFinished: "Je n'utilise pas la méthode",
    frequencyQuestion: 'À quelle fréquence utilisez-vous la méthode ?',
    frequencyAria: 'Fréquence',
    frequency: {
      hebdo: 'Chaque semaine',
      mensuel: 'Quelques fois par mois',
      rare: 'Rarement',
      jamais: 'Pas encore',
    },
    frequencyNeverFinished: 'Plus du tout',
    changedQuestion:
      "Qu'est-ce qui a changé concrètement dans votre façon de préparer vos cours ?",
    changedHint:
      "C'est la question qui compte le plus. Qu'est-ce que vous faites aujourd'hui que vous ne faisiez pas avant ? Qu'est-ce que vous avez arrêté de faire ? Si rien n'a encore changé, dites-le aussi.",
    changedTooShort: (n: number, min: number) =>
      `Encore quelques mots : c'est la réponse qui nous sert le plus (${n}/${min} caractères minimum).`,
    artifactQuestion: "Qu'avez-vous déjà créé avec la méthode ?",
    artifactHint: 'Pour quel apprenant ou quel secteur, et à partir de quelle source ?',
    feedbackQuestion: 'Un apprenant a-t-il réagi à un cours créé avec la méthode ?',
    feedbackHint: "Facultatif. Ce qu'il ou elle a dit, même en quelques mots.",

    // Étape 4
    opinionLabel: 'Votre avis',
    skepticQuestion:
      "Un collègue formateur ou un directeur d'institut vous demande si le parcours vaut le coup. Que lui répondez-vous ?",
    skepticHint: 'En quelques phrases, comme vous le lui diriez.',
    keepQuestion: "Si vous ne deviez garder qu'une chose du parcours, laquelle ?",
    keepPlaceholder: 'Un module, un outil, un prompt, un atelier…',
    missingFinished: 'Qu’est-ce qui vous a manqué ?',
    missingOngoing: 'Qu’est-ce qui vous manque pour l’instant ?',
    missingHint:
      "Ce qu'on devrait améliorer en priorité. Les critiques nous sont plus utiles que les compliments.",
    recommendQuestion: 'Recommanderiez-vous le parcours à un collègue ?',
    scaleAria: 'Note de 0 à 10',
    scaleLow: '0 : pas du tout',
    scaleHigh: '10 : sans hésiter',

    // Étape 5
    networkLabel: 'Votre réseau',
    networkDirection:
      'Connaissez-vous d’autres dirigeants d’instituts que ce parcours pourrait intéresser ?',
    networkOther: 'Intervenez-vous pour d’autres instituts ou organismes de formation ?',
    networkHint: 'Facultatif. Indiquez leurs noms si vous le souhaitez.',
    introQuestion:
      "Accepteriez-vous que Grégory vous demande de le présenter à l'un d'eux ?",
    introHint: "Il vous écrira d'abord pour en parler. Rien ne se fera sans votre accord.",
    introAria: 'Mise en relation',
    intro: {
      oui: 'Oui, volontiers',
      peut_etre: 'Peut-être, parlons-en',
      non: 'Non merci',
    },

    // Étape 6
    publishLabel: 'Publication',
    publishQuestion: 'Pouvons-nous citer vos réponses ?',
    publishHint:
      "Les témoignages aident d'autres formateurs et instituts à comprendre ce que le parcours apporte vraiment. Vous choisissez ce qui apparaît.",
    publishToggle: "J'autorise TeachInspire à publier un extrait de mes réponses.",
    publishToggleNote:
      'Sans cette case, vos réponses restent internes, et les crédits vous sont offerts de la même façon.',
    namingQuestion: 'Comment vous nommer ?',
    namingAria: 'Nom affiché',
    naming: {
      full_name: 'Mon prénom et mon nom',
      initial: 'Mon prénom et l’initiale de mon nom',
      first_name: 'Mon prénom seul',
      anonymous: 'Aucun nom : seulement ma fonction et ma ville',
    },
    displayNameLabel: "Votre nom tel qu'il doit apparaître",
    scopeQuestion: 'Ce qui peut accompagner votre témoignage',
    scopeHint: 'Cochez tout ce qui vous convient.',
    scopeRole: 'Ma fonction',
    displayTitleLabel: "Votre fonction telle qu'elle doit apparaître",
    titlePlaceholder: {
      direction: 'Directrice de Langues & Co',
      independant: 'Formatrice d’anglais indépendante',
      salarie: 'Formateur FLE chez Langues & Co',
    } as Record<string, string>,
    titlePlaceholderDefault: 'Formatrice d’anglais',
    scopeInstitute: 'Le nom de ma structure',
    scopeCity: 'Ma ville',
    scopeLinkedin: 'Un lien vers mon profil LinkedIn',
    linkedinLabel: 'Lien de votre profil',
    scopePhoto: 'Ma photo',
    scopePhotoNote: 'Celle de votre profil LinkedIn, ou une photo que Grégory vous demandera.',
    previewTitle: 'Aperçu de votre témoignage',
    quote: (text: string) => `« ${text} »`,
    quotePlaceholder:
      'Votre réponse à la question « un collègue ou un directeur hésite » apparaîtra ici.',
    namingPending: 'Choisissez comment vous nommer',
    linkedinBadge: '· profil LinkedIn',
    previewNote:
      "L'extrait final sera choisi et raccourci avec vous : Grégory vous enverra le texte exact, et rien ne sera publié sans votre accord écrit. Aucun mot n'est ajouté à ce que vous avez écrit.",
    whereQuestion: 'Où il pourrait apparaître',
    where: [
      'Le site teachinspire.me',
      'Les publications LinkedIn de TeachInspire',
      'Les documents de présentation envoyés aux instituts',
    ],
    extrasQuestion: 'Et si vous le souhaitez',
    willingVideo:
      "Je veux bien enregistrer une courte vidéo (1 à 2 min) en visio avec Grégory, en montrant un cours que j'ai créé",
    willingLinkedinPost: 'Je veux bien publier moi-même un retour sur LinkedIn',
    creditsNote:
      'Vos 30 minutes de crédits audio seront ajoutées au compte Studio avec lequel vous êtes connecté·e, quoi que vous ayez répondu.',
    privacy:
      'Vos réponses sont conservées par TeachInspire pendant 3 ans et ne sont transmises à personne. Pour modifier ou retirer votre autorisation à tout moment, écrivez à greg@teachinspire.me : la citation sera retirée sous 7 jours.',

    // Signature, quand un élément manque encore
    firstNamePlaceholder: 'Prénom',
    fullNamePlaceholder: 'Prénom Nom',
    anonymousSignature: 'Participant·e au parcours',

    // Consentement incomplet
    namingMissing: 'Choisissez comment vous nommer, ou décochez l’autorisation de publier.',
    displayNameMissing: 'Indiquez votre nom tel qu’il doit apparaître.',
    titleMissing: 'Indiquez votre fonction, ou décochez « Ma fonction ».',
    cityMissing: 'Indiquez votre ville à l’étape 1, ou décochez « Ma ville ».',
    linkedinInvalid:
      'Le lien LinkedIn doit commencer par https://www.linkedin.com/, ou décochez cette option.',
  },
};

export type Copy = typeof fr;
