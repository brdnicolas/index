'use client'
import { SEOHead } from '@/components/atoms/SEOHead'
import { EXPERIENCES } from '@/data/projects'
import { ProjectContainer } from '@/pages/project/ProjectContainer'
import { usePathname } from 'next/navigation'

export default function ProjectPage() {
  const pathName = usePathname()
  const splitSlug = pathName?.split('/') || []
  const project = EXPERIENCES.find(({ slug }) => slug === splitSlug[1] || slug === splitSlug[2])

  if (!project) {
    window.location.href = '/'
    return <></>
  }

  return (
    <main className="bg-black">
      <SEOHead
        description={`Discover my project for ${project.company}!`}
        title={`${project.company} - Nicolas B.`}
        previewUrl={`${project.thumbnail}`}
        url={`https://brdnicolas.com/${project.slug}`}
      />
      <ProjectContainer project={project} />
    </main>
  )
}

export async function getStaticPaths() {
  const paths = EXPERIENCES.map((experience) => ({ slug: experience.slug }))

  return { paths, fallback: false }
}
