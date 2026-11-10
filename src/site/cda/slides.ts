// The model deck of /cda/presentation: the outline I give my students, one slide per part.
// `visual` picks the little illustration drawn on the slide, `notes` is what to say / keep in mind.

export type SlideVisual =
  'cover' | 'need' | 'mockups' | 'kanban' | 'stack' | 'architecture' | 'security' | 'pipeline' | 'demo' | 'end'

export type Slide = {
  title: string
  points: string[]
  visual: SlideVisual
  notes: string
}

export const SLIDES: Slide[] = [
  {
    title: 'Nom de votre projet',
    points: ['Titre pro Concepteur Développeur d’Applications', 'Prénom Nom'],
    visual: 'cover',
    notes: 'Une slide de titre sobre : le nom du projet, le vôtre, et c’est parti. Pas besoin de plus.'
  },
  {
    title: 'Présentation du projet',
    points: ['Le besoin', 'La solution'],
    visual: 'need',
    notes:
      'Partez du problème, pas de la technique : qui sont les utilisateurs, ce qui leur manque, puis ce que votre application leur apporte.'
  },
  {
    title: 'Du zoning à la maquette',
    points: ['Le zoning', 'Le wireframe', 'La maquette'],
    visual: 'mockups',
    notes:
      'Montrez la même page aux trois étapes : c’est la logique de la démarche que le jury regarde, pas l’esthétique.'
  },
  {
    title: 'Conception',
    points: ['L’outil utilisé (Jira, Trello…)', 'Une user story, décrite ou en capture'],
    visual: 'kanban',
    notes:
      'Une capture de votre board, puis une US bien écrite : « En tant que… je veux… afin de… », avec ses critères d’acceptation.'
  },
  {
    title: 'Stack technique',
    points: ['Front', 'Back', 'Base de données', 'Outils'],
    visual: 'stack',
    notes: 'Des logos suffisent. Préparez-vous surtout à justifier chaque choix : pourquoi celui-là et pas un autre ?'
  },
  {
    title: 'Architecture du projet',
    points: ['Les différents services', 'La base de données : vos schémas MCD / MLD'],
    visual: 'architecture',
    notes:
      'Suivez une requête de bout en bout, de l’interface à la base. Vous pouvez remontrer vos schémas MCD / MLD ici.'
  },
  {
    title: 'La sécurité',
    points: [
      'Les tests : la pyramide, et la différence entre les types de tests',
      'Le hashage du mot de passe',
      'Le token JWT, et le reste'
    ],
    visual: 'security',
    notes:
      'Sachez expliquer la pyramide de tests sans notes. Pour la sécurité, montrez ce qui est vraiment en place côté serveur.'
  },
  {
    title: 'Le déploiement',
    points: ['La CI/CD : savoir ce que c’est', 'Ce que vous avez mis en place'],
    visual: 'pipeline',
    notes: 'Même un pipeline simple (lint, tests, build, déploiement) vaut mieux qu’un grand discours. Montrez-le.'
  },
  {
    title: 'Démonstration',
    points: ['Une ou deux fonctionnalités clés', 'Un scénario préparé'],
    visual: 'demo',
    notes: '2 à 3 minutes, répétées à l’avance. Jamais improvisée. Ayez une vidéo de secours si la démo plante.'
  },
  {
    title: 'Conclusion',
    points: ['Les difficultés, et comment vous les avez surmontées', 'Ce dont vous êtes fiers', 'Et après ?'],
    visual: 'end',
    notes: 'Finissez sur votre recul et votre suite. Puis : « Merci, je suis prêt pour vos questions. »'
  }
]
