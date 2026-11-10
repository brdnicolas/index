import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PROJECTS } from '@/site/data/content'
import { CaseStudy } from '@/site/work/CaseStudy'
import { JsonLd } from '@/site/components/JsonLd'
import { PERSON, absolute, breadcrumb, graph } from '@/site/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }))
}

// a clean meta description: plain text, cut on a word, ≤ 155 chars
const snippet = (text: string, max = 155) => {
  const plain = text.replace(/\s+/g, ' ').trim()
  if (plain.length <= max) return plain
  return `${plain.slice(0, plain.lastIndexOf(' ', max - 1))}…`
}

// "2024.04.11 - Now" → "2024-04-11"
const isoDate = (date: string) => date.split(' ')[0].replace(/\./g, '-')

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = PROJECTS.find((item) => item.slug === slug)
  if (!project) return {}
  const title = `${project.company} · ${project.job}`
  const description = snippet(project.description)
  return {
    title,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: 'article',
      url: `/work/${slug}`,
      title,
      description,
      siteName: 'Nicolas Brouard',
      locale: 'en_US',
      images: [{ url: project.thumbnail, alt: `${project.company} — ${project.job}` }]
    },
    twitter: { card: 'summary_large_image', title, description, images: [project.thumbnail] }
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

  const structuredData = graph(
    PERSON,
    {
      '@type': 'CreativeWork',
      '@id': absolute(`/work/${slug}#project`),
      name: `${project.company} — ${project.job}`,
      description: snippet(project.description, 300),
      url: absolute(`/work/${slug}`),
      image: absolute(project.thumbnail),
      dateCreated: isoDate(project.date),
      inLanguage: 'en',
      keywords: project.techs.join(', '),
      creator: { '@id': PERSON['@id'] },
      about: { '@type': 'Organization', name: project.company }
    },
    breadcrumb([
      { name: 'Nicolas Brouard', path: '/' },
      { name: project.company, path: `/work/${slug}` }
    ])
  )

  return (
    <>
      <JsonLd data={structuredData} />
      <CaseStudy
        project={{ ...project, subProjects }}
        index={index}
        total={PROJECTS.length}
        next={{ slug: next.slug, company: next.company, thumbnail: next.thumbnail, role: next.job }}
      />
    </>
  )
}
