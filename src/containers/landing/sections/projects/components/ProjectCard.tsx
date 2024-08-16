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
  const isLastProject = slug === ''

  return (
    <div
      className={
        'project-card flex flex-col desktop:flex-row items-center gap-16 pr-4 tablet:pr-16 min-w-[calc(100vw-32px)] tablet:min-w-[calc(100vw/2)] max-w-[calc(100vw-32px)] desktop:min-w-layout tablet:max-w-[calc(100vw/2)] desktop:max-w-layout font-manrope'
      }
    >
      {isLastProject ? (
        <div className="group min-w-full w-full desktop:min-w-[50vw] desktop:max-w-[50vw] aspect-[14/9] object-cover rounded-6 overflow-hidden relative">
          <img
            className="w-full h-full object-cover absolute top-0 left-0 group-hover:scale-110 duration-150"
            src={thumbnailUrl}
            alt="pepiswap"
          />
        </div>
      ) : (
        <a href={`/project/${slug}`} className="w-full">
          <div className="group min-w-full w-full desktop:min-w-[50vw] desktop:max-w-[50vw] aspect-[14/9] object-cover rounded-6 overflow-hidden relative">
            <img
              className="w-full h-full object-cover absolute top-0 left-0 group-hover:scale-110 duration-150"
              src={thumbnailUrl}
              alt="pepiswap"
            />
          </div>
        </a>
      )}

      <div>
        <p className="text-3 text-dark-500">{date}</p>
        <p className="text-white font-bold text-6 mt-1">{role}</p>
        <p className="text-4 text-dark-500 mt-1">@{company}</p>
        <p className="text-4 text-dark-300 mt-6 text-justify line-clamp-4">{tinyDescription}</p>
      </div>
    </div>
  )
}
