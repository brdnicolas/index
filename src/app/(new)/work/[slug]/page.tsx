import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PROJECTS } from '@/site/data/content'
import { CaseStudy } from '@/site/work/CaseStudy'

export const dynamicParams = false

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = PROJECTS.find((item) => item.slug === slug)
  if (!project) return {}
  return {
    title: `${project.company} — Nicolas Brouard`,
    description: project.description.slice(0, 155),
    alternates: { canonical: `/work/${slug}` },
    openGraph: { images: [project.thumbnail] }
  }
}

const exists = (src: string) => fs.existsSync(path.join(process.cwd(), 'public', src))

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const index = PROJECTS.findIndex((item) => item.slug === slug)
  if (index === -1) notFound()

  const project = PROJECTS[index]
  const next = PROJECTS[(index + 1) % PROJECTS.length]

  const subProjects = project.subProjects
    .map((subProject) => ({ ...subProject, images: subProject.images.filter(exists) }))
    .filter((subProject) => subProject.images.length > 0 || subProject.description)

  return (
    <CaseStudy
      project={{ ...project, subProjects }}
      index={index}
      total={PROJECTS.length}
      next={{ slug: next.slug, company: next.company, thumbnail: next.thumbnail, role: next.job }}
    />
  )
}
