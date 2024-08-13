import Atropos from 'atropos/react'
import 'atropos/css'

interface ProjectCard {
  date: string
  role: string
  company: string
  tinyDescription: string
  thumbnailUrl: string
  slug: string
}

export const ProjectCard = ({ date, role, company, tinyDescription, thumbnailUrl, slug }: ProjectCard) => {
  return (
    <div className="flex items-center gap-16 min-w-layout max-w-layout pr-16">
      <Atropos shadowScale={0.9}>
        <a href={`/project/${slug}`}>
          <img
            className="min-w-[681px] max-w-[681px] h-[464px] object-cover rounded-6"
            src={thumbnailUrl}
            alt="pepiswap"
          />
        </a>
      </Atropos>

      <div>
        <p className="text-3 text-dark-500">{date}</p>
        <p className="text-white font-semibold text-6 mt-1">{role}</p>
        <p className="text-4 text-dark-500 mt-1">@{company}</p>
        <p className="text-4 text-dark-300 mt-6 text-justify">{tinyDescription}</p>
      </div>
    </div>
  )
}
