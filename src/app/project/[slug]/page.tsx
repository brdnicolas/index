import { SEOHead } from '@/components/atoms/SEOHead'
import { EXPERIENCES } from '@/data/projects'
import { ProjectContainer } from '@/containers/project/ProjectContainer'

export const dynamicParams = false

export async function generateStaticParams() {
  return EXPERIENCES.map((experience) => ({ slug: experience.slug }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const pathName = params.slug
  const project = EXPERIENCES.find(({ slug }) => slug === pathName)!

  return (
    <main className="bg-black">
      <SEOHead
        description={`Find out what we've done together!`}
        title={`${project.company} x Nicolas B.`}
        previewUrl={`${project.thumbnail}`}
        url={`https://brdnicolas.com/${project.slug}`}
      />
      <ProjectContainer project={project} />
    </main>
  )
}
