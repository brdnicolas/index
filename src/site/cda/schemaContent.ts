// Content of /cda/schemas — the MERISE & UML cheat sheet.
// One running example everywhere: a library (books, readers, loans).

export type Tool = { name: string; url: string; badge: string; text: string; recommended?: boolean }
export type Table = { head: string[]; rows: string[][] }
export type Callout = { kind: 'tip' | 'warn' | 'jury'; label: string; title?: string; text: string }

export const CHAPTERS = [
  { id: 'merise', label: 'MERISE' },
  { id: 'mcd', label: 'MCD' },
  { id: 'mld', label: 'MLD' },
  { id: 'mpd', label: 'MPD' },
  { id: 'uml', label: 'UML' },
  { id: 'erreurs', label: 'Erreurs' }
] as const

// ---------- MERISE
export const LEVELS = [
  {
    level: 'Niveau 1 · Conceptuel',
    name: 'MCD',
    question: 'Quoi ?',
    text: 'Modélise le métier, sans aucune considération technique. Entités et associations.'
  },
  {
    level: 'Niveau 2 · Logique',
    name: 'MLD',
    question: 'Comment ?',
    text: 'Traduit le MCD en tables relationnelles avec clés étrangères. Indépendant du SGBD.'
  },
  {
    level: 'Niveau 3 · Physique',
    name: 'MPD',
    question: 'Avec quoi ?',
    text: 'Implémentation dans un SGBD précis. Script SQL exécutable.'
  }
]

export const ANALOGY = [
  { emoji: '📐', name: 'MERISE', text: 'La méthode de l’architecte : les règles et les étapes à suivre.' },
  { emoji: '✏️', name: 'MCD', text: 'Le croquis du besoin client : « 3 chambres, un salon ».' },
  { emoji: '📏', name: 'MLD', text: 'Le plan technique, avec dimensions et matériaux génériques.' },
  { emoji: '🔨', name: 'MPD', text: 'Le plan d’exécution : béton X, vis Y, références précises.' }
]

export const MERISE_JURY: Callout = {
  kind: 'jury',
  label: 'Formulation pour le jury',
  text: '« MERISE est la méthode que j’ai utilisée pour concevoir ma base de données. Elle m’a guidé à travers trois niveaux d’abstraction : le MCD pour modéliser le métier, le MLD pour le traduire en tables relationnelles, et le MPD pour l’implémenter en MySQL. »'
}

// ---------- MCD
export const MCD_ELEMENTS: Table = {
  head: ['Élément', 'Définition', 'Représentation'],
  rows: [
    ['Entité', 'Objet du monde réel (Client, Livre…)', 'Rectangle, nom en MAJUSCULE au singulier'],
    ['Propriété', 'Caractéristique d’une entité', 'Dans le rectangle de l’entité'],
    ['Identifiant', 'Attribut qui identifie de façon unique', 'Souligné, préfixé # ou id'],
    ['Association', 'Lien entre entités', 'Ellipse, verbe à l’infinitif'],
    ['Cardinalité', 'Participation min, max', 'Près du lien entité – association']
  ]
}

export const MCD_CARDINALITIES: Table = {
  head: ['Notation', 'Signification', 'Exemple'],
  rows: [
    ['0,1', '0 ou 1 fois (optionnel, unique)', 'Un employé a au plus 1 bureau'],
    ['1,1', 'Exactement 1 fois (obligatoire)', 'Une commande a 1 client'],
    ['0,N', '0 ou plusieurs fois', 'Un client a 0 à N commandes'],
    ['1,N', 'Au moins 1 fois', 'Une facture a au moins 1 ligne']
  ]
}

export const MCD_WARN: Callout = {
  kind: 'warn',
  label: 'Attention',
  title: 'Le sens de lecture MERISE',
  text: 'Les cardinalités se lisent depuis l’entité vers l’association. C’est l’inverse d’UML, où on lit vers la classe cible. Question piège typique du jury.'
}

export const MCD_CHECKLIST = [
  'Toutes les entités ont un identifiant souligné',
  'Associations = verbes, entités = noms',
  'Des cardinalités des deux côtés de chaque relation',
  'Aucune clé étrangère au MCD (les FK, c’est au MLD)',
  'Pas d’information en double (normalisation)'
]

export const MCD_TOOLS: Tool[] = [
  {
    name: 'drawDB',
    url: 'https://drawdb.app',
    badge: 'Recommandé',
    recommended: true,
    text: '100 % gratuit, open source, sans compte. Glisser-déposer, export SQL / PNG / PDF. Parfait pour enchaîner MCD et MLD.'
  },
  {
    name: 'dbdiagram.io',
    url: 'https://dbdiagram.io',
    badge: 'Gratuit',
    text: 'Vous écrivez vos tables en DBML (un langage très simple), le schéma se dessine tout seul. Gratuit jusqu’à 10 diagrammes.'
  }
]

// ---------- MLD
export const MLD_RULES: Table = {
  head: ['N°', 'Règle', 'Transformation'],
  rows: [
    ['1', 'Entité', 'Devient une table. L’identifiant devient clé primaire (PK).'],
    ['2', 'Relation 1:N', 'La PK du côté « 1 » migre comme FK du côté « N ».'],
    ['3', 'Relation N:N', 'Création d’une table d’association, avec une PK composée des 2 FK.'],
    ['4', 'Relation 1:1', 'FK du côté (0,1) vers (1,1), ou fusion des tables.'],
    ['5', 'Association porteuse', 'Ses attributs rejoignent la table d’association.']
  ]
}

export const MLD_TIP: Callout = {
  kind: 'tip',
  label: 'Mnémotechnique',
  title: '« La clé migre du côté 1 vers le côté N »',
  text: 'L’entité côté N reçoit une colonne FK qui pointe vers l’entité côté 1.'
}

export const MLD_NOTATION = [
  { table: 'LIVRE', columns: [{ name: 'idLivre', pk: true }, 'titre', 'auteur', 'isbn', 'anneePublication'] },
  { table: 'LECTEUR', columns: [{ name: 'idLecteur', pk: true }, 'nom', 'prenom', 'email', 'dateInscription'] },
  {
    table: 'EMPRUNTER',
    columns: [
      { name: '#idLivre', pk: true },
      { name: '#idLecteur', pk: true },
      { name: 'dateEmprunt', pk: true },
      'dateRetour'
    ]
  }
]

export const MLD_CHECKLIST = [
  'Chaque entité du MCD → une table',
  'Chaque relation N:N → une table d’association',
  'Les FK placées côté N pour les relations 1:N',
  'Le respect de la 3e forme normale (3FN)',
  'PK et FK clairement identifiées dans la notation'
]

export const MLD_TOOLS: Tool[] = [
  {
    name: 'drawDB',
    url: 'https://drawdb.app',
    badge: 'Recommandé',
    recommended: true,
    text: 'Le même outil que pour le MCD, en mode tables relationnelles avec clés étrangères. Export SQL direct (MySQL, PostgreSQL, SQLite…).'
  },
  {
    name: 'ChartDB',
    url: 'https://chartdb.io',
    badge: 'Gratuit + IA',
    text: 'Éditeur visuel très soigné, génération de schémas par IA, éditeur DBML, export SQL. Importe une base existante en un clic.'
  }
]

// ---------- MPD
export const MPD_ADDS = [
  { title: 'Types propres au SGBD', text: 'VARCHAR(50), INT, DATE, DECIMAL(10,2), BOOLEAN' },
  { title: 'Contraintes', text: 'NOT NULL, UNIQUE, DEFAULT, CHECK' },
  { title: 'Clés', text: 'PRIMARY KEY, FOREIGN KEY … REFERENCES …' },
  { title: 'Auto-incrément', text: 'AUTO_INCREMENT (MySQL), SERIAL (PostgreSQL)' },
  { title: 'Actions référentielles', text: 'ON DELETE CASCADE / RESTRICT / SET NULL' },
  { title: 'Index', text: 'Pour accélérer les requêtes fréquentes' }
]

export const MPD_SQL = `-- Base : gestion_bibliotheque | SGBD : MySQL 8.0

CREATE TABLE LIVRE (
  idLivre          INT AUTO_INCREMENT PRIMARY KEY,
  titre            VARCHAR(200) NOT NULL,
  auteur           VARCHAR(100) NOT NULL,
  isbn             VARCHAR(13) UNIQUE,
  anneePublication YEAR,
  dateAjout        DATE DEFAULT (CURRENT_DATE),
  INDEX idx_auteur (auteur)
) ENGINE=InnoDB CHARSET=utf8mb4;

CREATE TABLE LECTEUR (
  idLecteur       INT AUTO_INCREMENT PRIMARY KEY,
  nom             VARCHAR(50) NOT NULL,
  prenom          VARCHAR(50) NOT NULL,
  email           VARCHAR(100) UNIQUE NOT NULL,
  dateInscription DATE DEFAULT (CURRENT_DATE),
  actif           BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB CHARSET=utf8mb4;

CREATE TABLE EMPRUNTER (
  idLivre     INT NOT NULL,
  idLecteur   INT NOT NULL,
  dateEmprunt DATETIME NOT NULL,
  dateRetour  DATETIME DEFAULT NULL,
  PRIMARY KEY (idLivre, idLecteur, dateEmprunt),
  FOREIGN KEY (idLivre) REFERENCES LIVRE(idLivre)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (idLecteur) REFERENCES LECTEUR(idLecteur)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB CHARSET=utf8mb4;`

export const MPD_JURY: Callout = {
  kind: 'jury',
  label: 'À commenter au jury',
  title: 'Justifiez vos choix techniques',
  text: 'Moteur InnoDB (il gère les clés étrangères), encodage utf8mb4 (accents, emojis), RESTRICT sur ON DELETE (impossible de supprimer un livre encore emprunté), index sur les colonnes souvent recherchées.'
}

export const MPD_CHECKLIST = [
  'Le SGBD cible est précisé (MySQL 8, PostgreSQL 15…)',
  'Des types adaptés : jamais d’INT pour un code postal français !',
  'Les contraintes (NOT NULL, UNIQUE, CHECK) sont définies',
  'Des index sur les FK et les colonnes de recherche',
  'Des actions ON DELETE / ON UPDATE réfléchies, pas laissées par défaut'
]

export const MPD_TOOLS: Tool[] = [
  {
    name: 'DB Fiddle',
    url: 'https://www.db-fiddle.com',
    badge: 'Recommandé',
    recommended: true,
    text: 'Testez votre script SQL en ligne en 10 secondes (MySQL, PostgreSQL, SQLite), et partagez un lien au jury.'
  },
  {
    name: 'SQLite Online',
    url: 'https://sqliteonline.com',
    badge: 'Gratuit',
    text: 'Une base SQL dans le navigateur : collez votre script, lancez des SELECT, vérifiez vos contraintes. Zéro installation.'
  }
]

// ---------- UML
export const VISIBILITIES = [
  { symbol: '+', name: 'public', text: 'accessible partout' },
  { symbol: '–', name: 'private', text: 'la classe seule' },
  { symbol: '#', name: 'protected', text: 'la classe et ses sous-classes' },
  { symbol: '~', name: 'package', text: 'le même package' }
]

export const RELATIONS = [
  { name: 'Association', symbol: '───────', text: 'Lien simple entre classes' },
  { name: 'Agrégation', symbol: '◇───────', text: 'Losange vide : « a un »' },
  { name: 'Composition', symbol: '◆───────', text: 'Losange plein : « est composé de »' },
  { name: 'Héritage', symbol: '───────▷', text: 'Triangle vide : « est un »' },
  { name: 'Dépendance', symbol: '- - - - ▸', text: 'Utilise temporairement' },
  { name: 'Réalisation', symbol: '- - - - ▷', text: 'Implémente une interface' }
]

export const UML_TIP: Callout = {
  kind: 'tip',
  label: 'Mnémotechnique',
  title: 'Agrégation ou composition ?',
  text: 'Losange vide : le tout disparaît, les parties survivent (université / étudiants). Losange plein : le tout disparaît, les parties aussi (maison / pièces).'
}

export const UML_CARDINALITIES: Table = {
  head: ['Notation', 'Signification'],
  rows: [
    ['1', 'Exactement 1'],
    ['0..1', '0 ou 1 (optionnel)'],
    ['* ou 0..*', '0 à plusieurs'],
    ['1..*', '1 à plusieurs'],
    ['n..m', 'Entre n et m']
  ]
}

export const UML_WARN: Callout = {
  kind: 'warn',
  label: 'Piège',
  title: 'Sens inversé par rapport à MERISE',
  text: 'En UML, la cardinalité se lit vers la classe opposée. En MERISE, elle se lit vers l’association. À savoir justifier à l’oral.'
}

export const UML_LEGEND = [
  {
    name: 'Héritage',
    text: 'Lecteur et Bibliothecaire héritent de Personne (classe abstraite) : flèche à triangle vide.'
  },
  { name: 'Composition', text: 'Un Livre est composé de 1 à plusieurs Exemplaires : losange plein côté Livre.' },
  { name: 'Association', text: 'Un Lecteur emprunte de 0 à 5 Livres en même temps : ligne simple avec cardinalités.' }
]

export const UML_CHECKLIST = [
  'Une visibilité (+, –, #) sur tous les attributs et méthodes',
  'Les types de retour des méthodes précisés',
  'Des cardinalités sur toutes les associations',
  'Les bons symboles (losange vide ou plein selon l’intention)',
  'Les classes abstraites en italique ou avec «abstract»'
]

export const UML_TOOLS: Tool[] = [
  {
    name: 'Mermaid Live',
    url: 'https://mermaid.live',
    badge: 'Recommandé',
    recommended: true,
    text: 'Gratuit, sans compte. Vous écrivez le diagramme en quelques lignes, le rendu est instantané. Export PNG / SVG.'
  },
  {
    name: 'Eraser · DiagramGPT',
    url: 'https://www.eraser.io/ai/uml-diagram-generator',
    badge: 'Gratuit + IA',
    text: 'Vous décrivez votre système en français, l’IA génère le diagramme UML, éditable ensuite. Parfait pour démarrer vite.'
  }
]

export const MERMAID = `classDiagram
  class Personne {
    <<abstract>>
    -nom : String
    +getNomComplet() String
  }
  Personne <|-- Lecteur
  Lecteur "0..5" -- "0..*" Livre : emprunte`

// ---------- the 5 mistakes
export const MISTAKES = [
  {
    title: 'Confondre les cardinalités MERISE et UML',
    text: 'En MERISE on lit vers l’association, en UML vers la classe cible : le sens est inversé. Cette confusion fait inverser les cardinalités en passant d’un formalisme à l’autre.'
  },
  {
    title: 'Mettre des clés étrangères au MCD',
    text: 'Les FK n’apparaissent qu’au MLD. Au MCD, il y a des associations, pas des colonnes techniques. Un champ « idClient » dans l’entité COMMANDE au MCD est une faute classique.'
  },
  {
    title: 'Oublier les visibilités en UML',
    text: 'Un attribut ou une méthode sans +, – ou # devant est incomplet. C’est le premier détail que le jury vérifie sur un diagramme de classes.'
  },
  {
    title: 'Confondre agrégation et composition',
    text: 'Losange vide : les parties sont indépendantes du tout. Losange plein : elles sont détruites avec lui. Les mélanger montre que la nuance n’est pas comprise.'
  },
  {
    title: 'Mélanger MLD et MPD',
    text: 'Pas de VARCHAR(50), d’AUTO_INCREMENT ni d’ENGINE=InnoDB au MLD : ces détails n’apparaissent qu’au MPD. Le MLD reste indépendant du SGBD.'
  }
]
