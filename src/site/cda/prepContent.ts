// Content of /cda/preparation — how to prepare the titre pro CDA.
// Facts come from the référentiel d'évaluation (RE CDA, TP-01281, version du 13/05/2023); advice is mine.

export const SOURCE = 'Référentiel d’évaluation du titre CDA (TP-01281), version du 13/05/2023'

// ---------- the exam, in order
export const EXAM = [
  {
    name: 'Questionnaire professionnel',
    minutes: 30,
    when: 'Avant la présentation',
    points: [
      'Tous les candidats en même temps, avec un surveillant.',
      'Sur un poste sans internet, téléphones interdits.',
      'Vous étudiez une documentation technique en anglais.',
      'Deux questions fermées à choix unique, en français.',
      'Deux questions ouvertes en anglais, réponses courtes rédigées en anglais.'
    ]
  },
  {
    name: 'Présentation du projet',
    minutes: 40,
    when: 'Le cœur de l’épreuve',
    points: [
      'Le jury a lu votre dossier de projet imprimé avant de vous voir.',
      'Vous présentez avec votre diaporama, préparé en amont.',
      'Le jury écoute sans intervenir.'
    ]
  },
  {
    name: 'Entretien technique',
    minutes: 45,
    when: 'Juste après la présentation',
    points: [
      'Questions sur votre dossier de projet et votre présentation.',
      'Puis sur les compétences que votre projet ne couvre pas.'
    ]
  },
  {
    name: 'Entretien final',
    minutes: 20,
    when: 'Pour finir',
    points: [
      'Un échange avec le jury, qui a votre dossier professionnel sous les yeux.',
      'Il vérifie votre vision globale du métier et de sa culture professionnelle.'
    ]
  }
]

export const EXAM_TOTAL = '2 h 15'

// ---------- what you hand in
export const DELIVERABLES = [
  {
    value: '40–60',
    unit: 'pages',
    title: 'Le dossier de projet',
    text: 'Un seul, imprimé, qui réunit tous vos projets. Hors page de garde, sommaire et annexes, schémas et illustrations compris.'
  },
  {
    value: '≤ 40',
    unit: 'pages',
    title: 'Les annexes',
    text: 'Les éléments de la fonctionnalité la plus représentative : maquettes, captures d’écran et leur code, code métier, d’accès aux données…'
  },
  {
    value: '1',
    unit: 'DP',
    title: 'Le dossier professionnel',
    text: 'Le document officiel où vous décrivez des exemples concrets de votre pratique pour chaque activité du titre. Le jury l’évalue, et l’a en main pendant l’entretien final.'
  },
  {
    value: '1',
    unit: 'diaporama',
    title: 'Le support de présentation',
    text: 'Un seul diaporama pour l’ensemble des projets, réalisé avant l’épreuve.'
  }
]

export const DELIVERABLES_NOTE =
  'Vous passez un CCP seul (« Développer une application sécurisée ») ? Le dossier fait alors 30 à 40 pages, annexes 20 pages maximum.'

// ---------- the skills your project(s) must cover
// `interview`: not required in the project, evaluated during the technical interview
export type Skill = { name: string; plain: string; show: string; interview?: boolean }

export const SKILLS: { block: string; items: Skill[] }[] = [
  {
    block: 'Développer une application sécurisée',
    items: [
      {
        name: 'Développer des interfaces utilisateur',
        plain: 'Coder les écrans de l’application, ce que l’utilisateur voit et manipule, à partir de vos maquettes.',
        show: 'Des écrans conformes aux maquettes, qui s’adaptent au support, avec leur code et quelques tests.'
      },
      {
        name: 'Développer des composants métier',
        plain:
          'Coder la logique de l’application : les règles propres au domaine. Par exemple « un lecteur ne peut pas emprunter plus de 5 livres ». C’est souvent côté serveur, dans des services.',
        show: 'Un service ou une classe qui applique une vraie règle de gestion, sécurisé et testé.'
      },
      {
        name: 'Contribuer à la gestion d’un projet informatique',
        plain:
          'Organiser le travail : découper en tâches, planifier, suivre l’avancement, choisir les outils de l’équipe.',
        show: 'Votre board (Jira, Trello…), une user story, votre planning, votre workflow Git.'
      }
    ]
  },
  {
    block: 'Concevoir et développer une application sécurisée organisée en couches',
    items: [
      {
        name: 'Analyser les besoins et maquetter une application',
        plain: 'Comprendre ce que veut le client, puis le traduire en écrans avant de coder.',
        show: 'L’expression des besoins, le zoning, le wireframe, la maquette, et le schéma d’enchaînement des écrans.'
      },
      {
        name: 'Définir l’architecture logicielle d’une application',
        plain:
          'Décider comment l’application est découpée : quelles couches (interface, métier, données), quels services, quels frameworks, et comment ils communiquent.',
        show: 'Un schéma d’architecture en couches, avec le rôle de chacune et le pourquoi de vos choix.'
      },
      {
        name: 'Concevoir et mettre en place une base de données relationnelle',
        plain: 'Modéliser les données (MCD, MLD) puis créer la vraie base, avec ses contraintes et ses droits d’accès.',
        show: 'Vos schémas MERISE, le script SQL de création, et une base de test avec un jeu d’essai.'
      },
      {
        name: 'Développer des composants d’accès aux données SQL et NoSQL',
        plain:
          'Coder la partie qui lit et écrit dans la base : requêtes, ORM, repositories, en contrôlant les entrées et en gérant les erreurs.',
        show: 'Le code d’accès aux données (requêtes, repository, ORM) et la façon dont vous protégez les entrées.'
      }
    ]
  },
  {
    block: 'Préparer le déploiement d’une application sécurisée',
    items: [
      {
        name: 'Préparer et exécuter les plans de tests d’une application',
        plain:
          'Prévoir ce qu’il faut tester et comment, l’exécuter, puis comparer le résultat obtenu au résultat attendu.',
        show: 'Votre plan de tests, quelques tests automatisés, et le jeu d’essai de votre fonctionnalité principale.'
      },
      {
        name: 'Préparer et documenter le déploiement d’une application',
        plain:
          'Écrire comment on met l’application en ligne : la procédure, les scripts, les environnements (test, production), pour que quelqu’un d’autre puisse le refaire.',
        show: 'Votre procédure de déploiement, vos scripts commentés (Dockerfile, docker-compose…) et vos environnements.',
        interview: true
      },
      {
        name: 'Contribuer à la mise en production dans une démarche DevOps',
        plain:
          'Automatiser le chemin du code jusqu’à la production : intégration continue, tests et outils de qualité lancés automatiquement, déploiement.',
        show: 'Votre pipeline CI/CD (GitHub Actions, GitLab CI…), ses étapes, et comment vous lisez ses rapports.',
        interview: true
      }
    ]
  }
]

export const SKILLS_NOTE =
  'Les compétences marquées « entretien technique » n’ont pas à figurer dans votre projet : le jury les évalue pendant l’entretien. L’installation de votre environnement de travail est aussi évaluée à l’entretien et au questionnaire.'

// ---------- the project dossier, in order (project done in a company)
export const DOSSIER = [
  'La liste des compétences mises en œuvre',
  'Le cahier des charges ou l’expression des besoins',
  'La présentation de l’entreprise et du service',
  'La gestion de projet : planning et suivi, environnement humain, objectifs de qualité',
  'Les spécifications fonctionnelles : contraintes et livrables, architecture logicielle, maquettes et leur enchaînement, modèle entités-associations et modèle physique, script de création de la base, diagramme de cas d’utilisation, diagramme de séquence des cas les plus significatifs',
  'Les spécifications techniques, sécurité comprise',
  'Vos réalisations : les extraits de code les plus significatifs (interfaces, composants métier, accès aux données, contrôleurs…) et les arguments de vos choix',
  'Les éléments de sécurité de l’application',
  'Le plan de tests',
  'Le jeu d’essai de la fonctionnalité la plus représentative : données en entrée, attendues, obtenues, et l’analyse des écarts',
  'La veille sur les vulnérabilités de sécurité : ce que vous avez trouvé et corrigé'
]

export const DOSSIER_NOTE =
  'Projet réalisé pendant la formation : le plan est plus court. Les compétences mises en œuvre, l’expression des besoins (objectifs et limites du projet), l’environnement technique, et les réalisations qui démontrent les compétences.'

// ---------- what the jury looks at
export const JURY_FACTS = [
  {
    title: 'Il vous lit avant de vous voir',
    text: 'Votre dossier imprimé est sa première impression. Soignez-le comme votre présentation.'
  },
  {
    title: 'Il vous laisse parler',
    text: '40 minutes sans interruption : c’est à vous de structurer et de tenir le temps.'
  },
  {
    title: 'Puis il creuse',
    text: '45 minutes pour vérifier que vous maîtrisez ce que vous avez montré, et vous interroger sur ce que votre projet ne couvre pas.'
  }
]

export const CRITERIA = [
  {
    group: 'Interfaces & conception',
    items: [
      'L’interface est conforme au dossier de conception',
      'Elle s’adapte au support (taille, type, disposition)',
      'La charte graphique et la réglementation sont respectées',
      'L’enchaînement des maquettes est formalisé par un schéma',
      'Les besoins d’éco-conception sont identifiés'
    ]
  },
  {
    group: 'Architecture & données',
    items: [
      'L’architecture multicouche est sécurisée, le rôle de chaque couche est défini',
      'Le schéma conceptuel respecte les règles du relationnel',
      'L’intégrité, la sécurité et la confidentialité des données sont assurées',
      'Une base de test existe, avec un jeu d’essai complet, restaurable',
      'Toutes les entrées sont contrôlées et validées côté serveur'
    ]
  },
  {
    group: 'Tests & déploiement',
    items: [
      'Le plan de tests couvre toutes les fonctionnalités retenues',
      'Les résultats obtenus sont cohérents avec les résultats attendus',
      'Des tests unitaires et de sécurité accompagnent les composants',
      'La procédure de déploiement est rédigée, les scripts documentés',
      'Les scripts d’intégration continue s’exécutent sans erreur'
    ]
  }
]

// ---------- what not to do
export const DONTS = [
  'Dépasser les 60 pages ou les 40 minutes.',
  'Oublier une compétence obligatoire dans vos projets.',
  'Montrer du code que vous ne savez pas expliquer ligne par ligne.',
  'Ne sécuriser que le front : cacher un bouton ne protège pas une route.',
  'Arriver sans plan de tests ni jeu d’essai.',
  'Improviser la démo.',
  'Lire vos slides, ou réciter votre dossier.',
  'Négliger l’anglais : le questionnaire et une partie de la documentation sont en anglais.',
  'Reprendre le dossier d’un autre sans l’adapter.'
]

// ---------- AI
export const AI = {
  intro:
    'Le jury évalue votre maîtrise de ce que vous présentez, pendant 40 minutes de présentation puis 45 minutes d’entretien technique. L’IA peut vous aider à vous préparer, à condition de savoir expliquer tout ce que vous rendez.',
  dos: [
    'Lui demander de vous expliquer un concept, puis le reformuler avec vos mots.',
    'Vous faire interroger : « Pose-moi des questions de jury sur mon MCD ».',
    'Faire relire un passage pour la clarté, après l’avoir écrit vous-même.',
    'Vérifier chaque affirmation dans la doc officielle.'
  ],
  donts: [
    'Faire écrire votre dossier : un texte généré reste générique et ne décrit pas vos choix.',
    'Présenter du code généré que vous ne savez pas défendre.',
    'Croire ce qu’elle affirme sans vérifier : elle invente des librairies, des normes, des chiffres.',
    'Compter sur elle le jour J : le questionnaire se passe sans internet.'
  ]
}

// ---------- confirmation bias, on the jury's side
export const BIAS = {
  definition:
    'Le biais de confirmation, c’est la tendance à chercher ce qui confirme une première impression. Or le jury lit votre dossier avant de vous rencontrer : s’il a le sentiment, dès les premières pages, d’un projet entièrement généré par l’IA, cette impression peut orienter toute la suite de l’épreuve.',
  points: [
    {
      title: 'Elle se forme tôt',
      text: 'Le dossier imprimé est lu avant votre présentation. C’est lui qui installe la première image de vous, avant même que vous ayez parlé.'
    },
    {
      title: 'Elle oriente la suite',
      text: 'Une fois l’idée installée, une hésitation, une formulation vague ou une ligne de code mal expliquée sont lues comme des confirmations. Les questions de l’entretien vont chercher à vérifier.'
    },
    {
      title: 'Elle joue aussi dans l’autre sens',
      text: 'Un dossier qui montre vos choix, vos arbitrages et vos difficultés installe d’emblée l’image d’un candidat qui maîtrise son projet.'
    }
  ],
  signals: [
    {
      seen: 'Des paragraphes génériques qui pourraient décrire n’importe quelle application.',
      better: 'Des phrases sur votre projet : vos contraintes, vos choix, ce que vous avez écarté et pourquoi.'
    },
    {
      seen: 'Du code que vous avez du mal à expliquer, des commentaires qui paraphrasent le code.',
      better: 'Du code que vous savez commenter ligne par ligne, avec vos conventions.'
    },
    {
      seen: 'Aucune difficulté, aucun retour en arrière : tout a marché du premier coup.',
      better: 'Les vrais obstacles rencontrés, et comment vous les avez résolus.'
    },
    {
      seen: 'Des maquettes et une interface sans lien entre elles.',
      better: 'Une démarche visible : du zoning à la maquette, puis à l’écran réel.'
    }
  ]
}
