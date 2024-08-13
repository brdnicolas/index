export type Project = {
  title: string
  description: string
  images: string[]
  url?: string
}

export type Experience = {
  company: string
  slug: string
  date: string
  role: string
  preview: string
  description: string
  thumbnail: string
  techs: string[]
  subProjects: Project[]
}

export const EXPERIENCES: Experience[] = [
  {
    company: 'Design Systems',
    date: '2023.06.01',
    role: 'FullStack Engineer',
    slug: 'design-systems',
    preview: '/projects/ds/preview.jpg',
    thumbnail: '/projects/ds/thumbnail.png',
    description: `
  The design system is a masterpiece, seamlessly blending forms and colors. Each component is a stroke, purposefully placed to capture the essence of our brand. Fluid lines guide the eye, while typography dances gracefully across the digital canvas. Every pixel is a musical note, harmoniously playing to create an enchanting user experience. Interactions flow effortlessly, like a well-choreographed performance. Documentation serves as a precious guide, revealing the secrets of this masterpiece. Our design system is a digital artwork, transcending time, and unveiling beauty in every interaction.`,
    techs: ['ViteJS', 'Typescript', 'Storybook', 'Chromatic', 'React', 'SCSS', 'Tailwind'],
    subProjects: [
      {
        title: 'Free',
        description:
          "Free's Atomic Design System is a collaborative masterpiece, crafted with designers to ensure seamless sharing across all tech teams. Its modular approach and atomic components provide a solid foundation for consistent design language. The system empowers teams to create cohesive interfaces, from atoms to molecules and organisms. With meticulous documentation and a user-friendly interface, Free's design system becomes an essential tool, fostering creativity and efficiency while unifying the brand experience." +
          '' +
          "Thank's a lot to the Free team for the opportunity to work on this project." +
          'Specialy to Thomas VIMARE, Clovis DEROUCK, Melanie LÊ, Frédéric LUGBULL, Nicolas TOUILLET, Arnaud VATIN, Laurent MENU and others !',
        images: [
          '/projects/ds/projects/free/free1.png',
          '/projects/ds/projects/free/free2.jpg',
          '/projects/ds/projects/free/free3.jpg'
        ]
      },
      {
        title: 'Mentor Goal',
        description:
          "MentorGoal's Simple Design System is a user-friendly toolkit, tailored for rapid integration in a startup environment. It streamlines design consistency, promoting a seamless user experience across platforms. With a focused set of components, colors, and typography, it accelerates product development without the complexity of Atomic Design. The system's intuitive documentation empowers teams to quickly grasp and implement its elements. MentorGoal's Simple Design System nurtures efficiency and brand coherence, providing a solid foundation to shape a delightful user journey for the startup's vision.",
        images: [
          '/projects/ds/projects/mg/mg1.jpg',
          '/projects/ds/projects/mg/mg2.jpg',
          '/projects/ds/projects/mg/mg3.jpg'
        ]
      }
    ]
  },
  {
    company: 'Pepiswap',
    date: '2023.09.01',
    role: 'Front-End Engineer',
    slug: 'pepiswap',
    preview: '/projects/pepiswap/preview.jpg',
    thumbnail: '/projects/pepiswap/thumbnail.jpg',
    description: `Discover Pepiswap, the 100% French DEX (Decentralized Exchange) designed to make cryptocurrency trading easy and accessible. With a user-friendly platform and comprehensive tutorials, Pepiswap welcomes both newcomers and experienced traders alike.`,
    techs: ['NextJS', 'Typescript', 'Strapi', 'Solidity', 'Tailwind'],
    subProjects: [
      {
        title: 'Decentralized Exchange',
        url: 'https://pepiswap.vercel.app/',
        description:
          'The main but here is to make a platform for users to learn how to use cryptocurrency. To this end, the design is modern and accessible, and the functionalities simple and explained.',
        images: [
          '/projects/pepiswap/pepiswap1.jpg',
          '/projects/pepiswap/pepiswap2.jpg',
          '/projects/pepiswap/pepiswap3.jpg'
        ]
      }
    ]
  },
  {
    company: 'Iliad Group',
    date: '2022.10.10',
    role: 'FullStack Engineer',
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
        ]
      },
      {
        title: 'Intranet',
        description:
          'Crafted a robust intranet to welcome 16,700+ Iliad collaborators. This secure platform fosters seamless communication, collaboration, and resource sharing. Empowering the workforce with essential tools, it strengthens the team spirit, streamlines operations, and enhances productivity across the organization.',
        images: [
          '/projects/iliadGroup/projects/intranet/intranet1.jpg',
          '/projects/iliadGroup/projects/intranet/intranet2.jpg',
          '/projects/iliadGroup/projects/intranet/intranet3.jpg'
        ]
      }
    ]
  },
  {
    company: 'Free',
    date: '2022.10.10',
    role: 'FullStack Engineer',
    slug: 'free',
    preview: '/projects/free/preview.jpg',
    thumbnail: '/projects/free/thumbnail.jpg',
    description:
      'Free is a prominent French telecommunications company that revolutionized the industry with its disruptive offerings. Known for affordable and innovative services, Free Mobile and Freebox provide customers with cutting-edge mobile, broadband, and TV solutions. With a customer-centric approach, Free continues to challenge traditional norms and reshape the telecom landscape in France. ',
    techs: ['NextJS', 'Typescript', 'Leaflet', 'Strapi', 'TailwindCSS', 'Material UI'],
    subProjects: [
      {
        title: 'Freebox',
        description:
          "Crafted Free's landing page to redefine their online presence. With a modern design and compelling visuals, it showcases their disruptive telecom services, engaging users and driving conversions.\n" +
          'Developed "Coverage Map" page to empower users with real-time network information. Using interactive maps and data visualization, it allows customers to check network coverage, reinforcing Free\'s commitment to transparency and customer satisfaction.',
        url: 'https://free.fr/freebox',
        images: [
          '/projects/free/projects/freebox/freebox1.jpg',
          '/projects/free/projects/freebox/freebox2.jpg',
          '/projects/free/projects/freebox/freebox3.jpg'
        ]
      },
      {
        title: 'Free Mobile',
        description:
          "Designed Freemobile's captivating landing page to elevate their online image. Through a sleek and user-friendly interface, it effectively communicates their affordable and innovative mobile services, enticing visitors to explore their offerings further.",
        url: 'https://mobile.free.fr/',
        images: [
          '/projects/free/projects/freemobile/freemobile1.jpg',
          '/projects/free/projects/freemobile/freemobile2.jpg',
          '/projects/free/projects/freemobile/freemobile3.jpg'
        ]
      }
    ]
  },
  {
    company: 'Bell Intone',
    date: '2021.10.10',
    role: 'FullStack Engineer',
    slug: 'bellintone',
    preview: '/projects/bellintone/preview.jpg',
    thumbnail: '/projects/bellintone/thumbnail.jpg',
    description:
      "BellIntone is a cutting-edge music platform that empowers aspiring artists to showcase their talent to the world. With a seamless interface and powerful features, BellIntone offers a global stage for musicians to connect with fans, industry professionals, and fellow artists. Whether you're a singer, songwriter, or producer, BellIntone is your gateway to reaching new heights in the music industry. Join the musical revolution today and let your sound resonate with the world! ",
    techs: ['NextJS', 'Typescript', 'ExpressJS', 'Material UI'],
    subProjects: [
      {
        title: 'Luxury landing page',
        description:
          "Client's request: A luxurious landing page reminiscent of Netflix's design to showcase premium services. Crafted with elegance and sophistication, the page entices visitors with high-end offerings, creating an exclusive and captivating user experience.",
        url: 'https://bellintone.com/',
        images: [
          '/projects/bellintone/bellintone1.jpg',
          '/projects/bellintone/bellintone2.jpg',
          '/projects/bellintone/bellintone3.jpg'
        ]
      }
    ]
  },
  {
    company: 'Mentor Goal',
    date: '2021.10.10',
    role: 'Front-End Engineer',
    slug: 'mentor-goal',
    preview: '/projects/mentorgoal/preview.jpg',
    thumbnail: '/projects/mentorgoal/thumbnail.jpg',
    description:
      'Mentor Goal is a personalized mentoring platform that connects aspiring individuals with experienced mentors in their desired fields. Through one-on-one guidance, our platform helps mentees set and achieve their goals, gain valuable insights, and accelerate personal and professional growth. Unlock your potential with Mentor Goal and pave the way to your success journey!',
    techs: ['ReactJS', 'SCSS'],
    subProjects: [
      {
        title: 'Platform',
        description:
          'Continuing platform development to meet client needs and innovate. Our commitment to excellence drives us to enhance user experience, offer new features, and stay ahead in the ever-evolving landscape. Empowering our clients and inspiring progress remain at the core of our journey.',
        url: 'https://mentorgoal.com',
        images: [
          '/projects/mentorgoal/projects/platform/platform1.jpg',
          '/projects/mentorgoal/projects/platform/platform2.jpg',
          '/projects/mentorgoal/projects/platform/platform3.jpg'
        ]
      },
      {
        title: '1 Click Extension',
        description:
          "I developed an extension to ease students' application process on the platform. By streamlining the submission of candidatures, it empowers students to apply seamlessly and efficiently, reducing barriers and enhancing their overall experience. Students' success is our priority! ",
        url: 'https://chrome.google.com/webstore/detail/mentor-goal/liifiipnglpjacgkfeojooabgiionbeg?hl=fr',
        images: [
          '/projects/mentorgoal/projects/extension/extension1.jpeg',
          '/projects/mentorgoal/projects/extension/extension2.jpeg',
          '/projects/mentorgoal/projects/extension/extension3.jpeg'
        ]
      }
    ]
  }
]
