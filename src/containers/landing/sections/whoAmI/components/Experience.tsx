import { Icon } from '@iconify/react/dist/iconify.mjs'
import { Tag } from './Tag'

const EXPERIENCES = [
  {
    duration: '2024 — Now',
    role: 'Front-End Engineer',
    company: 'Ornikar',
    link: 'https://ornikar.com',
    asFreelance: false
  },
  {
    duration: '2022 — Now',
    role: 'Instructor & Mentor',
    company: 'ETNA',
    link: 'https://etna.io',
    asFreelance: true
  },
  {
    duration: '2024 — 2024',
    role: 'FullStack Engineer',
    company: 'Big Mamma',
    link: 'https://www.bigmammagroup.com/',
    asFreelance: true
  },
  {
    duration: '2021 — 2023',
    role: 'FullStack Engineer',
    company: 'Free',
    link: 'https://free.fr',
    asFreelance: false
  },
  {
    duration: '2021 — 2021',
    role: 'Front-End Engineer',
    company: 'Bell Intone',
    link: 'https://bellintone.com/',
    asFreelance: true
  },
  {
    duration: '2021 — 2022',
    role: 'Front-End Engineer ',
    company: 'Mentor Goal',
    link: 'https://mentorgoal.com/',
    asFreelance: false
  }
] as const

export const Experience = () => {
  return (
    <div className="card rounded-6">
      <div className="card-content bg-[#171717] font-manrope border-[1px] border-[#232323] p-7 text-5 overflow-hidden">
        <p>Experience</p>
        <div className="mt-4 text-4 w-full flex flex-col gap-6">
          {EXPERIENCES.map((experience) => (
            <div className="flex w-full" key={experience.company}>
              <div className="w-1/3 text-[#989898] font-normal text-3">
                <p>{experience.duration}</p>
              </div>
              <div className="w-2/3 pl-3">
                <p className="font-semibold">{experience.role}</p>
                <div className="flex items-center gap-2 mt-1">
                  <a
                    href={experience.link}
                    className="group flex items-center gap-1 hover:text-white text-[#989898] text-3"
                  >
                    <p className="font-normal">@{experience.company}</p>
                    <Icon
                      icon="solar:arrow-right-up-linear"
                      className="w-3 h-3 pt-[2px] group-hover:rotate-45 transition-all"
                    />
                  </a>
                  {experience.asFreelance ? <Tag>As freelance</Tag> : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
