// Content of the /cda toolbox (titre pro Concepteur Développeur d'Applications).
// Everything students read on the page lives here, so it's easy to update between two sessions.

// The hub: one card per tool, filterable by category.
export const CATEGORIES = [
  { id: 'all', label: 'Tout' },
  { id: 'conception', label: 'Conception' },
  { id: 'soutenance', label: 'Soutenance' },
  { id: 'references', label: 'Références' }
] as const

export type Category = Exclude<(typeof CATEGORIES)[number]['id'], 'all'>
export type ToolIcon = 'compass' | 'schema' | 'slides' | 'question' | 'badge' | 'doc'

export const TOOLS: {
  title: string
  text: string
  href: string
  category: Category
  icon: ToolIcon
  color: string
}[] = [
  {
    title: 'Comment se préparer',
    text: 'Le déroulé de l’épreuve, les temps, le dossier à rendre, ce que veut le jury et ce qu’il ne faut surtout pas faire.',
    href: '/cda/preparation',
    category: 'soutenance',
    icon: 'compass',
    color: '#22d3ee'
  },
  {
    title: 'Anti-sèche MERISE & UML',
    text: 'MCD, MLD, MPD, cardinalités, diagramme de classes et les erreurs qui font tiquer le jury.',
    href: '/cda/schemas',
    category: 'conception',
    icon: 'schema',
    color: '#3ddc84'
  },
  {
    title: 'Plan de la présentation',
    text: 'Un diaporama modèle, slide par slide, avec ce qu’il faut montrer et dire à chaque étape.',
    href: '/cda/presentation',
    category: 'soutenance',
    icon: 'slides',
    color: '#f5b94a'
  },
  {
    title: 'Questions du jury',
    text: 'Un jeu de cartes tirées au hasard : répondez, retournez la carte, et voyez ce que vous maîtrisez.',
    href: '/cda/questions',
    category: 'soutenance',
    icon: 'question',
    color: '#a78bfa'
  },
  {
    title: 'Référentiel officiel',
    text: 'La fiche RNCP 37873 sur France Compétences : les compétences sur lesquelles vous êtes évalués.',
    href: 'https://www.francecompetences.fr/recherche/rncp/37873/',
    category: 'references',
    icon: 'badge',
    color: '#60a5fa'
  },
  {
    title: 'Support de présentation type',
    text: 'Le plan détaillé sur HackMD, partie par partie, avec ce que le jury attend.',
    href: 'https://hackmd.io/@9jUFjRy1TkKMzLF7jSzDyQ/BJdVivDNp',
    category: 'references',
    icon: 'doc',
    color: '#f472b6'
  }
]

export const FACTS = [
  { value: '40 min', label: 'de présentation' },
  { value: '2–3 min', label: 'de démo, pas plus' },
  { value: 'Auth + CRUD', label: 'suffisent, si c’est bien conçu, testé et déployé' }
]

// Examples of questions juries ask. The hints are leads, not answers to recite.
export const QUESTIONS = [
  {
    q: 'Connaissez-vous la pyramide de tests ? Quelles différences entre les types de tests ?',
    a: 'À la base, les tests unitaires : nombreux, rapides, une fonction isolée. Au milieu, les tests d’intégration : plusieurs briques ensemble (API + base de données). Au sommet, les tests end-to-end : un parcours utilisateur complet, lents et coûteux, donc moins nombreux. Ajoutez la recette (UAT), où l’on valide le besoin métier.'
  },
  {
    q: 'Qu’est-ce qu’une clé primaire, une clé étrangère, et à quoi servent-elles ?',
    a: 'La clé primaire identifie chaque ligne d’une table de façon unique (unique, jamais nulle). La clé étrangère référence la clé primaire d’une autre table : elle matérialise une relation et garantit l’intégrité référentielle. Au passage MCD → MLD, une association 1,n devient une clé étrangère côté n, une n,n devient une table de jointure.'
  },
  {
    q: 'Qu’est-ce que la CI/CD ? Qu’avez-vous mis en place ?',
    a: 'CI, intégration continue : à chaque push ou pull request, le code est buildé, linté et testé automatiquement. CD, livraison / déploiement continu : une version validée est déployée automatiquement. Citez votre outil (GitHub Actions, GitLab CI…) et ce que fait votre pipeline.'
  },
  {
    q: 'Comment avez-vous sécurisé votre application ?',
    a: 'Mots de passe hashés (bcrypt, argon2), jamais en clair. Authentification (JWT ou session) et vérification des rôles côté serveur. Validation des entrées, requêtes préparées ou ORM contre les injections SQL, échappement contre le XSS, HTTPS, secrets dans des variables d’environnement. L’OWASP Top 10 est une bonne référence.'
  },
  {
    q: 'Quelle différence entre zoning, wireframe et maquette ?',
    a: 'Le zoning place les grands blocs de la page. Le wireframe détaille la structure et les éléments d’interface, sans design. La maquette applique la charte graphique (couleurs, typos, images) : c’est le rendu proche du final.'
  },
  {
    q: 'L’éco-conception, ça vous parle ? Donnez des exemples.',
    a: 'Réduire l’impact environnemental du service : images compressées et lazy loading, moins de requêtes et de dépendances, pagination, cache, pas de fonctionnalités inutiles, hébergement sobre. Le référentiel français s’appelle le RGESN.'
  },
  {
    q: 'Qu’avez-vous fait pour l’accessibilité ? Le RGAA, ça vous parle ?',
    a: 'Le RGAA est le référentiel français d’accessibilité, basé sur les WCAG. Exemples : textes alternatifs sur les images, contrastes suffisants, navigation au clavier et focus visible, labels sur les formulaires, hiérarchie des titres, attributs ARIA quand c’est utile.'
  },
  {
    q: 'Avez-vous rédigé de la documentation ?',
    a: 'Un README (installation, lancement, variables d’environnement), une documentation d’API (Swagger / OpenAPI), des schémas à jour, éventuellement une doc utilisateur. Montrez où elle se trouve.'
  },
  {
    q: 'Quelle différence entre MCD, MLD et MPD ?',
    a: 'Le MCD est conceptuel : entités, associations, cardinalités, indépendant de la technique. Le MLD est relationnel : tables, clés primaires et étrangères. Le MPD est physique : un SGBD précis, les types, les index, le script SQL.'
  },
  {
    q: 'Comment communiquent les couches de votre application ?',
    a: 'Suivez une requête de bout en bout : l’interface appelle l’API en HTTP, le contrôleur reçoit la requête, le service applique les règles métier, la couche d’accès aux données (ORM, repository) interroge la base, puis la réponse remonte en JSON. Expliquez le rôle de votre framework à chaque étape.'
  }
]

export const TIPS = [
  'Le support est une synthèse du dossier projet, pas une copie : couvrez les compétences du référentiel et tenez le temps.',
  'Le projet n’est jugé ni sur l’innovation, ni sur le nombre de fonctionnalités.',
  'La démo est scénarisée et répétée. Jamais improvisée.',
  'Le jury peut vous demander de commenter une ligne de code dans votre IDE : connaissez votre code.',
  'Il peut aussi naviguer dans l’application, par exemple pour vérifier une route protégée.',
  'Plusieurs solutions sont toujours possibles : ce qui compte, c’est de savoir justifier les vôtres.',
  'Répétez à voix haute, chronomètre en main. Plusieurs fois.'
]
