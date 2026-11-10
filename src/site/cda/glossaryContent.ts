// Content of /cda/glossaire: the words students meet in the référentiel, the dossier and the jury's questions.
// `link`: an optional toolbox page that goes further on the subject.

// accents and case don't matter when searching
export const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

// anchor of a term: /cda/glossaire#cle-etrangere
export const termId = (term: string) =>
  normalize(term)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const GLOSSARY_CATEGORIES = [
  { id: 'all', label: 'Tout' },
  { id: 'titre', label: 'Le titre pro' },
  { id: 'conception', label: 'Conception' },
  { id: 'dev', label: 'Développement' },
  { id: 'securite', label: 'Sécurité' },
  { id: 'tests', label: 'Tests' },
  { id: 'deploiement', label: 'Déploiement' },
  { id: 'qualite', label: 'Qualité' }
] as const

export type GlossaryCategory = Exclude<(typeof GLOSSARY_CATEGORIES)[number]['id'], 'all'>

export type Term = {
  term: string
  aka?: string
  category: GlossaryCategory
  definition: string
  link?: { label: string; href: string }
}

export const TERMS: Term[] = [
  // ---------- the titre pro itself
  {
    term: 'REAC',
    aka: 'Référentiel Emploi Activités Compétences',
    category: 'titre',
    definition:
      'Le document officiel qui décrit le métier de CDA : ses activités, ses compétences et ce qu’on attend de chacune. C’est la référence de tout le titre.',
    link: { label: 'Comment se préparer', href: '/cda/preparation' }
  },
  {
    term: 'RE',
    aka: 'Référentiel d’Évaluation',
    category: 'titre',
    definition:
      'Le document qui décrit comment le titre est évalué : les épreuves, leur durée, ce qu’il faut rendre et les critères du jury.',
    link: { label: 'Le déroulé de l’épreuve', href: '/cda/preparation' }
  },
  {
    term: 'Activité type',
    category: 'titre',
    definition:
      'Un grand bloc du métier. Le titre CDA en compte trois : développer une application sécurisée, la concevoir et la développer en couches, préparer son déploiement.'
  },
  {
    term: 'CCP',
    aka: 'Certificat de Compétences Professionnelles',
    category: 'titre',
    definition:
      'Une partie du titre, qui correspond à une activité type. On peut obtenir les CCP séparément et les cumuler pour obtenir le titre complet.'
  },
  {
    term: 'Dossier de projet',
    category: 'titre',
    definition:
      'Le document imprimé qui présente votre ou vos projets : 40 à 60 pages hors annexes. Le jury le lit avant votre présentation.',
    link: { label: 'Ce qu’il faut rendre', href: '/cda/preparation' }
  },
  {
    term: 'Dossier professionnel',
    aka: 'DP',
    category: 'titre',
    definition:
      'Le document officiel où vous décrivez des exemples concrets de votre pratique pour chaque activité type. Le jury l’a en main pendant l’entretien final.'
  },

  // ---------- design
  {
    term: 'MERISE',
    category: 'conception',
    definition:
      'Une méthode française pour concevoir une base de données en trois niveaux : le MCD (le métier), le MLD (les tables) et le MPD (le SGBD précis).',
    link: { label: 'Anti-sèche MERISE', href: '/cda/schemas' }
  },
  {
    term: 'MCD',
    aka: 'Modèle Conceptuel de Données',
    category: 'conception',
    definition:
      'Le schéma des données vues par le métier, sans technique : des entités (Livre, Lecteur), des associations (emprunter) et des cardinalités.',
    link: { label: 'Le MCD en détail', href: '/cda/schemas#mcd' }
  },
  {
    term: 'MLD',
    aka: 'Modèle Logique de Données',
    category: 'conception',
    definition:
      'La traduction du MCD en tables relationnelles, avec clés primaires et étrangères. Il reste indépendant du SGBD choisi.',
    link: { label: 'Le MLD en détail', href: '/cda/schemas#mld' }
  },
  {
    term: 'MPD',
    aka: 'Modèle Physique de Données',
    category: 'conception',
    definition:
      'L’implémentation dans un SGBD précis (MySQL, PostgreSQL…) : les types, les contraintes, les index. Concrètement, c’est le script SQL de création.',
    link: { label: 'Le MPD en détail', href: '/cda/schemas#mpd' }
  },
  {
    term: 'Cardinalité',
    category: 'conception',
    definition:
      'Le nombre minimum et maximum de fois qu’une entité participe à une association (0,1 / 1,1 / 0,N / 1,N). Attention : MERISE et UML ne les lisent pas dans le même sens.'
  },
  {
    term: 'Clé primaire',
    aka: 'PK',
    category: 'conception',
    definition:
      'La colonne (ou le groupe de colonnes) qui identifie chaque ligne d’une table de façon unique. Jamais nulle.'
  },
  {
    term: 'Clé étrangère',
    aka: 'FK',
    category: 'conception',
    definition:
      'Une colonne qui référence la clé primaire d’une autre table. Elle matérialise une relation et empêche de pointer vers une ligne qui n’existe pas.'
  },
  {
    term: 'Normalisation',
    category: 'conception',
    definition:
      'Des règles (1FN, 2FN, 3FN) pour éviter la redondance et les incohérences dans une base : chaque information est stockée à un seul endroit.'
  },
  {
    term: 'UML',
    category: 'conception',
    definition:
      'Un langage de schémas pour modéliser une application orientée objet : cas d’utilisation, classes, séquences… Ce n’est pas une méthode, c’est une notation.',
    link: { label: 'L’UML en détail', href: '/cda/schemas#uml' }
  },
  {
    term: 'Diagramme de cas d’utilisation',
    category: 'conception',
    definition:
      'Qui fait quoi dans l’application : les acteurs (visiteur, admin…) et les actions qu’ils peuvent réaliser.'
  },
  {
    term: 'Diagramme de classes',
    category: 'conception',
    definition:
      'Les classes de l’application avec leurs attributs, leurs méthodes, leurs visibilités et leurs relations (héritage, composition, association).'
  },
  {
    term: 'Diagramme de séquence',
    category: 'conception',
    definition:
      'Le déroulé d’un cas d’utilisation dans le temps : quels objets s’échangent quels messages, dans quel ordre, avec un scénario d’erreur.'
  },
  {
    term: 'Zoning',
    category: 'conception',
    definition:
      'Le tout premier croquis d’une page : de grands blocs qui indiquent où va chaque zone (en-tête, contenu, menu…).'
  },
  {
    term: 'Wireframe',
    category: 'conception',
    definition: 'La structure détaillée d’une page, sans design : les vrais éléments d’interface, en niveaux de gris.'
  },
  {
    term: 'Maquette',
    category: 'conception',
    definition: 'Le rendu proche du final, avec la charte graphique : couleurs, typographies, images.'
  },
  {
    term: 'User story',
    aka: 'US',
    category: 'conception',
    definition:
      'Un besoin écrit du point de vue de l’utilisateur : « En tant que… je veux… afin de… », avec ses critères d’acceptation.'
  },

  // ---------- development
  {
    term: 'Architecture en couches',
    aka: 'multicouche, n-tiers',
    category: 'dev',
    definition:
      'Découper l’application en couches qui ont chacune un rôle : présentation (l’interface), métier (les règles), accès aux données (la base).'
  },
  {
    term: 'Composant métier',
    category: 'dev',
    definition:
      'Le code qui applique les règles propres au domaine, par exemple « un lecteur ne peut pas emprunter plus de 5 livres ». Souvent dans des services, côté serveur.'
  },
  {
    term: 'Composant d’accès aux données',
    aka: 'DAO, repository',
    category: 'dev',
    definition:
      'Le code qui lit et écrit dans la base de données, pour que le reste de l’application n’ait pas à écrire de SQL.'
  },
  {
    term: 'ORM',
    category: 'dev',
    definition:
      'Une librairie qui fait le lien entre les objets du code et les tables de la base (Prisma, TypeORM, Doctrine, Hibernate…).'
  },
  {
    term: 'API REST',
    category: 'dev',
    definition:
      'Une interface qui expose des ressources via des URL et les verbes HTTP (GET, POST, PUT, DELETE), le plus souvent en JSON.'
  },
  {
    term: 'MVC',
    category: 'dev',
    definition:
      'Modèle – Vue – Contrôleur : un découpage où le contrôleur reçoit la requête, le modèle gère les données et la vue affiche le résultat.'
  },
  {
    term: 'NoSQL',
    category: 'dev',
    definition:
      'Des bases de données non relationnelles (MongoDB, Redis…) : documents, clé-valeur, graphes. Le référentiel demande de savoir accéder aux deux.'
  },

  // ---------- security
  {
    term: 'Authentification',
    category: 'securite',
    definition:
      'Vérifier qui vous êtes (identifiant et mot de passe, par exemple). À ne pas confondre avec l’autorisation.'
  },
  {
    term: 'Autorisation',
    category: 'securite',
    definition:
      'Vérifier ce que vous avez le droit de faire (vos rôles, vos permissions). Elle se contrôle côté serveur, pas en cachant un bouton.'
  },
  {
    term: 'Hashage',
    category: 'securite',
    definition:
      'Transformer un mot de passe en empreinte irréversible (bcrypt, argon2) avant de le stocker. On ne stocke jamais un mot de passe en clair.'
  },
  {
    term: 'Salage',
    category: 'securite',
    definition:
      'Ajouter une valeur aléatoire au mot de passe avant de le hasher, pour que deux mots de passe identiques n’aient pas la même empreinte.'
  },
  {
    term: 'JWT',
    aka: 'JSON Web Token',
    category: 'securite',
    definition:
      'Un jeton signé, envoyé à chaque requête, qui prouve que l’utilisateur est authentifié. Il contient des informations lisibles : rien de secret dedans.'
  },
  {
    term: 'Injection SQL',
    category: 'securite',
    definition:
      'Une attaque qui glisse du SQL dans une saisie utilisateur pour manipuler la base. On s’en protège avec des requêtes préparées ou un ORM.'
  },
  {
    term: 'XSS',
    category: 'securite',
    definition:
      'Une attaque qui injecte du JavaScript dans une page vue par d’autres utilisateurs. On s’en protège en échappant ce qu’on affiche.'
  },
  {
    term: 'CSRF',
    category: 'securite',
    definition:
      'Une attaque qui fait exécuter une action à un utilisateur connecté, à son insu, depuis un autre site. On s’en protège avec des jetons anti-CSRF.'
  },
  {
    term: 'OWASP Top 10',
    category: 'securite',
    definition:
      'La liste de référence des 10 risques de sécurité les plus courants dans les applications web. Une bonne base pour votre veille.'
  },
  {
    term: 'RGPD',
    category: 'securite',
    definition:
      'Le règlement européen sur les données personnelles : ne collecter que le nécessaire, informer, permettre la suppression, sécuriser.'
  },

  // ---------- tests
  {
    term: 'Test unitaire',
    category: 'tests',
    definition: 'Teste une petite unité de code (une fonction, une classe) isolée du reste. Rapide, et nombreux.'
  },
  {
    term: 'Test d’intégration',
    category: 'tests',
    definition: 'Teste plusieurs briques ensemble, par exemple l’API et la base de données.'
  },
  {
    term: 'Test end-to-end',
    aka: 'E2E',
    category: 'tests',
    definition:
      'Teste un parcours utilisateur complet, comme un vrai utilisateur dans le navigateur. Lent et coûteux, donc moins nombreux.'
  },
  {
    term: 'Pyramide de tests',
    category: 'tests',
    definition:
      'Beaucoup de tests unitaires à la base, moins de tests d’intégration au milieu, peu de tests end-to-end au sommet.'
  },
  {
    term: 'Plan de tests',
    category: 'tests',
    definition:
      'Le document qui prévoit ce qui sera testé, comment et dans quel environnement, pour couvrir toutes les fonctionnalités.'
  },
  {
    term: 'Jeu d’essai',
    category: 'tests',
    definition:
      'Des données préparées pour tester une fonctionnalité : les données en entrée, le résultat attendu, le résultat obtenu, et l’analyse des écarts.'
  },
  {
    term: 'Recette',
    aka: 'UAT',
    category: 'tests',
    definition: 'La validation de l’application par le client ou l’utilisateur final : est-ce que ça répond au besoin ?'
  },

  // ---------- deployment
  {
    term: 'CI/CD',
    category: 'deploiement',
    definition:
      'Intégration continue : le code est testé automatiquement à chaque push. Déploiement continu : une version validée part en production automatiquement.'
  },
  {
    term: 'Pipeline',
    category: 'deploiement',
    definition:
      'La suite d’étapes automatiques lancée à chaque push : lint, tests, build, déploiement (GitHub Actions, GitLab CI…).'
  },
  {
    term: 'Conteneur',
    aka: 'Docker',
    category: 'deploiement',
    definition:
      'Un paquet qui embarque l’application avec tout ce dont elle a besoin pour tourner pareil partout, sur votre machine comme en production.'
  },
  {
    term: 'Environnements',
    category: 'deploiement',
    definition:
      'Les différentes copies de l’application : développement (votre machine), test ou recette, et production (les vrais utilisateurs).'
  },
  {
    term: 'DevOps',
    category: 'deploiement',
    definition:
      'Une façon de travailler qui rapproche développement et exploitation, en automatisant les tests, le déploiement et la surveillance.'
  },

  // ---------- quality
  {
    term: 'RGAA',
    category: 'qualite',
    definition:
      'Le référentiel français d’accessibilité numérique, basé sur les WCAG : contrastes, navigation au clavier, textes alternatifs…'
  },
  {
    term: 'Éco-conception',
    aka: 'RGESN',
    category: 'qualite',
    definition:
      'Réduire l’impact environnemental d’un service numérique : moins de données transférées, moins de calculs, pas de fonctionnalités inutiles.'
  },
  {
    term: 'Responsive',
    category: 'qualite',
    definition: 'Une interface qui s’adapte à la taille de l’écran : mobile, tablette, ordinateur.'
  },
  {
    term: 'Veille technologique',
    category: 'qualite',
    definition:
      'Suivre les évolutions et les failles de sécurité de vos outils. Le titre demande de présenter votre veille sur les vulnérabilités.'
  }
]
