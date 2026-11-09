import { EXPERIENCES } from '@/data/projects'

export const LINKS = {
  email: 'brdnicolas.pro@gmail.com',
  cal: 'https://cal.com/brdnicolas',
  resume: '/resume/NICOLAS BROUARD CV.pdf',
  linkedin: 'https://www.linkedin.com/in/brdnicolas/',
  malt: 'https://www.malt.fr/profile/brdnicolas',
  devto: 'https://dev.to/brdnicolas',
  x: 'https://x.com/_brdnicolas',
  whatsapp: 'https://wa.me/0767939258',
  handmade: '/gluten-free'
} as const

export type TimelineItem = {
  period: string
  role: string
  company: string
  link: string
  tags?: string[]
  current?: boolean
}

export const TIMELINE: TimelineItem[] = [
  {
    period: '2026 — Now',
    role: 'Software Engineer',
    company: 'Shotgun',
    link: 'https://shotgun.live',
    tags: ['New gig'],
    current: true
  },
  {
    period: '2022 — Now',
    role: 'Instructor & Mentor',
    company: 'ETNA',
    link: 'https://etna.io',
    tags: ['Freelance', 'Side quest'],
    current: true
  },
  { period: '2024 — 2026', role: 'Front-End Engineer', company: 'Ornikar', link: 'https://ornikar.com' },
  {
    period: '2024',
    role: 'FullStack Engineer',
    company: 'Big Mamma',
    link: 'https://www.bigmammagroup.com/',
    tags: ['Freelance']
  },
  { period: '2021 — 2023', role: 'FullStack Engineer', company: 'Free', link: 'https://free.fr' },
  {
    period: '2021',
    role: 'Front-End Engineer',
    company: 'Bell Intone',
    link: 'https://bellintone.com/',
    tags: ['Freelance']
  },
  { period: '2021 — 2022', role: 'Front-End Engineer', company: 'Mentor Goal', link: 'https://mentorgoal.com/' }
]

export const EDUCATION = [
  {
    period: '2019 — 2023',
    title: 'Master Software Architect & Application Developer',
    school: 'ETNA',
    honor: 'Major'
  },
  {
    period: '2016 — 2019',
    title: 'Scientific Baccalaureate',
    school: 'Sully',
    honor: 'Mention Bien'
  }
] as const

export const STACK = [
  { name: 'Next.js', icon: '/icons/next.svg' },
  { name: 'React & React Native', icon: '/icons/react.svg' },
  { name: 'TypeScript', icon: '/icons/ts.svg' },
  { name: 'JavaScript', icon: '/icons/js.svg' },
  { name: 'NestJS', icon: '/icons/nest.svg' },
  { name: 'Figma', icon: '/icons/figma.svg' },
  { name: 'GitHub', icon: '/icons/github.svg' },
  { name: 'Docker', icon: '/icons/docker.svg' },
  { name: 'Fastlane', icon: '/icons/fastlane.svg' }
] as const

export const SONGS = [
  { id: '4gE7KmvipFX7w8MAEUwhq2', title: 'Passé chaos', artist: 'samayusi' },
  { id: '7wZnwgGkwpJ8EYJ6VEJD2A', title: 'GARÇON', artist: 'Luther' },
  { id: '2KOvNaMJcuaYTciDe2TmCP', title: 'Big Jet Plane', artist: 'Angus & Julia Stone' }
]

export const MARQUEE_WORDS = ['Software', 'React', 'Engineer', 'Creative', 'Teacher', 'Mobile', 'Design']

export const HERO_WORDS = ['Software', 'React', 'Front-End', 'Mobile', 'Goat-tier']

// Displayed dates for the new site (the hand-made version keeps its own data untouched)
const DATE_OVERRIDES: Record<string, string> = {
  ornikar: '2024 — 2026'
}

// Ambient color radiating from each project on hover (rgb)
const AMBIENT: Record<string, [number, number, number]> = {
  free: [227, 6, 19], // red
  'iliad-group': [255, 79, 154], // pink
  pepiswap: [255, 106, 0], // orange
  ornikar: [142, 68, 255], // violet
  'design-systems': [255, 255, 255], // white
  bellintone: [208, 2, 27], // red
  'mentor-goal': [36, 59, 85] // dark navy
}

export const PROJECTS = EXPERIENCES.map((experience) => ({
  ...experience,
  displayDate: DATE_OVERRIDES[experience.slug] ?? experience.date.slice(0, 4),
  ambient: AMBIENT[experience.slug] ?? [255, 255, 255]
}))

export const COLLABS = [
  { name: 'Shotgun', logo: null },
  { name: 'Ornikar', logo: '/logos/ornikar.svg', height: 18 },
  { name: 'Free', logo: '/logos/free.svg', height: 22 },
  { name: 'ETNA', logo: '/logos/etna.png', height: 24 },
  { name: 'Big Mamma', logo: '/logos/big-mamma.svg', height: 16 },
  { name: 'Iliad', logo: null },
  { name: 'Mentor Goal', logo: null },
  { name: 'Bell Intone', logo: null }
] as const
