import Atropos from 'atropos/react'
import 'atropos/css'
import { useState } from 'react'

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
    <div className="project-card snap-center flex items-center gap-16 min-w-layout max-w-layout pr-16">
      <a href={`/project/${slug}`}>
        <div className="group min-w-[681px] max-w-[681px] h-[464px] object-cover rounded-6 overflow-hidden relative">
          <img
            className="w-full h-full object-cover absolute top-0 left-0 group-hover:scale-110 duration-150"
            src={thumbnailUrl}
            alt="pepiswap"
          />
        </div>
      </a>

      <div>
        <p className="text-3 text-dark-500">{date}</p>
        <p className="text-white font-semibold text-6 mt-1">{role}</p>
        <p className="text-4 text-dark-500 mt-1">@{company}</p>
        <p className="text-4 text-dark-300 mt-6 text-justify">{tinyDescription}</p>
      </div>
    </div>
  )
}
