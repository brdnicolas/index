export type Project = {
  title: string
  description: string
  images: string[]
  url?: string
  device: 'desktop' | 'mobile'
}

export type Experience = {
  company: string
  slug: string
  date: string
  job: string
  preview: string
  description: string
  thumbnail: string
  techs: string[]
  subProjects: Project[]
}

export const EXPERIENCES: Experience[] = [
  {
    company: 'Ornikar',
    date: '2024.04.11 - Now',
    job: 'Frontend Engineer',
    slug: 'ornikar',
    preview: '/projects/ornikar/preview.png',
    thumbnail: '/projects/ornikar/thumbnail.png',
    description:
      "Worked within a SCRUM environment in the Purchase team, on Ornikar's shop. Developed new features around the shop (AB Testing, business rules, performance optimization), complete checkout redesign (Stripe, Dalenys, Alma, Purchasely), internal CRM for support, in-app advertising system, sign-up and onboarding redesign, CI/CD automation with Fastlane, tracking and error management setup (Sentry, Datadog), unit/integration/visual regression testing, and process automation using n8n, Ollama and Claude.",
    techs: [
      'React native',
      'Typescript',
      'Universal codebase',
      'Jest',
      'Zustand',
      'React Testing Library',
      'Feature Flags',
      'Fastlane',
      'Storybook',
      'Chromatic',
      'n8n',
      'Ollama'
    ],
    subProjects: [
      {
        title: 'Ornikar on app',
        description:
          'Ornikar is primarily a web-based platform, but we recently undertook a major migration to native applications.',
        url: 'https://apps.apple.com/fr/app/ornikar-code-et-permis/id1612432450',
        images: [
          '/projects/ornikar/mobile/ornikar1.png',
          '/projects/ornikar/mobile/ornikar2.png',
          '/projects/ornikar/mobile/ornikar3.png',
          '/projects/ornikar/mobile/ornikar4.png'
        ],
        device: 'mobile'
      },
      {
        title: 'Ornikar on web',
        description:
          'Ornikar started as a web-first project, and thanks to our universal codebase, our platform now runs seamlessly on both web and mobile.',
        url: 'https://ornikar.com/',
        images: [
          '/projects/ornikar/web/ornikar1.jpeg',
          '/projects/ornikar/web/ornikar2.jpeg',
          '/projects/ornikar/web/ornikar3.jpeg',
          '/projects/ornikar/web/ornikar4.jpeg'
        ],
        device: 'desktop'
      }
    ]
  },
  {
    company: 'Design Systems',
    date: '2023.06.01',
    job: 'Frontend Engineer',
    slug: 'design-systems',
    preview: '/projects/ds/preview.jpg',
    thumbnail: '/projects/ds/thumbnail.png',
    description:
      'The design system is a harmonious blend of aesthetics and functionality. Each component is meticulously crafted, creating a seamless visual identity that enhances user experience across the brand. The system’s fluid design and well-documented components enable teams to deliver consistent, high-quality interfaces.',
    techs: ['ViteJS', 'Typescript', 'Storybook', 'Chromatic', 'React', 'SCSS', 'Tailwind'],
    subProjects: [
      {
        title: 'Free’s Atomic Design System',
        description:
          "A collaborative project designed with Free's tech and design teams, focusing on modularity and reusability. This system supports cohesive branding across platforms with a flexible yet structured component library. Special thanks to Thomas Vimare, Clovis Derouck, and other key contributors.",
        images: [
          '/projects/ds/projects/free/free1.png',
          '/projects/ds/projects/free/free2.jpg',
          '/projects/ds/projects/free/free3.jpg'
        ],
        device: 'desktop'
      },
      {
        title: 'MentorGoal’s Simple Design System',
        description:
          'A streamlined toolkit optimized for startup environments, promoting quick deployment and consistency without the overhead of complex structures. It simplifies product development while maintaining a polished user experience.',
        images: [
          '/projects/ds/projects/mg/mg1.jpg',
          '/projects/ds/projects/mg/mg2.jpg',
          '/projects/ds/projects/mg/mg3.jpg'
        ],
        device: 'desktop'
      }
    ]
  },
  {
    company: 'Free',
    date: '2022.10.10',
    job: 'FullStack Engineer',
    slug: 'free',
    preview: '/projects/free/preview.jpg',
    thumbnail: '/projects/free/thumbnail.jpg',
    description:
      'Free is a French company that revolutionized the industry with its disruptive offerings. Known for affordable and innovative services, Free Mobile and Freebox provide customers with cutting-edge mobile, broadband, and TV solutions. With a customer-centric approach, Free continues to challenge traditional norms and reshape the telecom landscape in France.',
    techs: ['NextJS', 'Typescript', 'Leaflet', 'Strapi', 'TailwindCSS', 'Material UI'],
    subProjects: [
      {
        title: 'Freebox',
        description:
          "Revamped Free's online presence with a modern landing page showcasing their innovative telecom services. The 'Coverage Map' page empowers users with real-time network information, reinforcing Free's commitment to transparency and customer satisfaction.",
        url: 'https://free.fr/freebox',
        images: [
          '/projects/free/projects/freebox/freebox1.jpg',
          '/projects/free/projects/freebox/freebox2.jpg',
          '/projects/free/projects/freebox/freebox3.jpg'
        ],
        device: 'desktop'
      },
      {
        title: 'Free Mobile',
        description:
          'Designed a captivating landing page for Free Mobile, elevating its online image with a sleek and user-friendly interface. The design effectively communicates Free Mobile’s affordable and innovative services, enticing visitors to explore further.',
        url: 'https://mobile.free.fr/',
        images: [
          '/projects/free/projects/freemobile/freemobile1.jpg',
          '/projects/free/projects/freemobile/freemobile2.jpg',
          '/projects/free/projects/freemobile/freemobile3.jpg'
        ],
        device: 'desktop'
      }
    ]
  },
  {
    company: 'Iliad Group',
    date: '2022.10.10',
    job: 'FullStack Engineer',
    slug: 'iliad-group',
    preview: '/projects/iliadGroup/preview.jpg',
    thumbnail: '/projects/iliadGroup/thumbnail.jpg',
    description:
      'Iliad Group is a leading French telecom company known for disruptive services like Free Mobile. With a focus on affordability and innovation, Iliad has redefined the telecom landscape, offering customers high-quality mobile, broadband, and TV services.',
    techs: ['ReactJS', 'Typescript', 'NestJS', 'Strapi', 'Material UI'],
    subProjects: [
      {
        title: 'Landing Page',
        description:
          "Created a captivating Iliad landing page to showcase their international image. Highlighting their disruptive telecom services, the page engages visitors with innovative design and clear call-to-action. Promoting Iliad's vision globally, it's a gateway to new opportunities and an enhanced online presence.",
        url: 'https://iliad.fr/',
        images: [
          '/projects/iliadGroup/projects/landing/iliad1.jpg',
          '/projects/iliadGroup/projects/landing/iliad2.jpg',
          '/projects/iliadGroup/projects/landing/iliad3.jpg'
        ],
        device: 'desktop'
      },
      {
        title: 'Intranet',
        description:
          'Crafted a robust intranet to welcome 16,700+ Iliad collaborators. This secure platform fosters seamless communication, collaboration, and resource sharing. Empowering the workforce with essential tools, it strengthens the team spirit, streamlines operations, and enhances productivity across the organization.',
        images: [
          '/projects/iliadGroup/projects/intranet/intranet1.jpg',
          '/projects/iliadGroup/projects/intranet/intranet2.jpg',
          '/projects/iliadGroup/projects/intranet/intranet3.jpg'
        ],
        device: 'desktop'
      }
    ]
  },
  {
    company: 'Pepiswap',
    date: '2023.09.01',
    job: 'Front-End Engineer',
    slug: 'pepiswap',
    preview: '/projects/pepiswap/preview.jpg',
    thumbnail: '/projects/pepiswap/thumbnail.jpg',
    description:
      'Pepiswap is a user-friendly decentralized exchange (DEX) tailored for the French market, bridging the gap between crypto enthusiasts and beginners. The platform focuses on simplicity, with intuitive interfaces and accessible learning resources.',
    techs: ['NextJS', 'Typescript', 'Strapi', 'Solidity', 'Tailwind'],
    subProjects: [
      {
        title: 'Decentralized Exchange',
        url: 'https://pepiswap.vercel.app/',
        description:
          'The main goal is to provide a platform where users can easily learn about and trade cryptocurrencies. The design is modern and accessible, with functionalities that are simple and well-explained.',
        images: [
          '/projects/pepiswap/pepiswap1.jpg',
          '/projects/pepiswap/pepiswap2.jpg',
          '/projects/pepiswap/pepiswap3.jpg'
        ],
        device: 'desktop'
      }
    ]
  },
  {
    company: 'Bell Intone',
    date: '2021.10.10',
    job: 'FullStack Engineer',
    slug: 'bellintone',
    preview: '/projects/bellintone/preview.jpg',
    thumbnail: '/projects/bellintone/thumbnail.jpg',
    description:
      'BellIntone is a cutting-edge music platform that empowers aspiring artists to showcase their talent globally. With a seamless interface and powerful features, BellIntone offers musicians a global stage to connect with fans, industry professionals, and fellow artists. Join the musical revolution and let your sound resonate with the world!',
    techs: ['NextJS', 'Typescript', 'ExpressJS', 'Material UI'],
    subProjects: [
      {
        title: 'Luxury Landing Page',
        description:
          'Designed a luxurious landing page inspired by Netflix to highlight premium services. The elegant and sophisticated design creates an exclusive and captivating user experience.',
        url: 'https://bellintone.com/',
        images: [
          '/projects/bellintone/bellintone1.jpg',
          '/projects/bellintone/bellintone2.jpg',
          '/projects/bellintone/bellintone3.jpg'
        ],
        device: 'desktop'
      }
    ]
  },
  {
    company: 'Mentor Goal',
    date: '2021.10.10',
    job: 'Front-End Engineer',
    slug: 'mentor-goal',
    preview: '/projects/mentorgoal/preview.jpg',
    thumbnail: '/projects/mentorgoal/thumbnail.jpg',
    description:
      'Mentor Goal is a personalized mentoring platform that connects aspiring individuals with experienced mentors in their desired fields. Through one-on-one guidance, the platform helps mentees set and achieve their goals, gain valuable insights, and accelerate their personal and professional growth.',
    techs: ['ReactJS', 'SCSS'],
    subProjects: [
      {
        title: 'Platform',
        description:
          'Ongoing development to meet evolving client needs and innovate. This includes enhancing user experience, adding new features, and staying ahead in the competitive landscape. Empowering clients and inspiring progress are at the core of this project.',
        url: 'https://mentorgoal.com',
        images: [
          '/projects/mentorgoal/projects/platform/platform1.jpg',
          '/projects/mentorgoal/projects/platform/platform2.jpg',
          '/projects/mentorgoal/projects/platform/platform3.jpg'
        ],
        device: 'desktop'
      },
      {
        title: '1 Click Extension',
        description:
          'Developed a Chrome extension to streamline the application process for students. This tool simplifies and accelerates the submission of applications, enhancing the overall user experience and reducing barriers.',
        url: 'https://chrome.google.com/webstore/detail/mentor-goal/liifiipnglpjacgkfeojooabgiionbeg?hl=fr',
        images: [
          '/projects/mentorgoal/projects/extension/extension1.jpeg',
          '/projects/mentorgoal/projects/extension/extension2.jpeg',
          '/projects/mentorgoal/projects/extension/extension3.jpeg'
        ],
        device: 'desktop'
      }
    ]
  }
]
