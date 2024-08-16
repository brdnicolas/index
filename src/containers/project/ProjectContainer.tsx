'use client'
import './project.scss'
import Image from 'next/image'
import { Parallax } from 'react-parallax'
import 'atropos/css'
import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import useIsMobile from '@/shared/hooks/useIsMobile'
import { PresentationTemplate } from '@/components/templates/PresentationTemplate'
import { FullScreenImage } from './components/FullScreenImage'
import { EXPERIENCES, Experience } from '@/data/projects'
import { ProjectView } from './components/ProjectView'
import { SectionLayout } from '@/components/SectionLayout'
import { Tag } from '../whoAmI/components/Tag'

interface ProjectContainerProps {
  project: Experience
}

export const ProjectContainer = ({ project }: ProjectContainerProps) => {
  const otherProjects = EXPERIENCES.filter((xp) => xp !== project).slice(0, 3)
  const isMobile = useIsMobile()
  const containerRef = useRef<HTMLDivElement>(null)
  const [urlImageToShow, setUrlImageToShow] = useState<string>('')

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.grid-background div',
        {
          y: '-100%'
        },
        {
          y: 0,
          stagger: 0.5,
          delay: 1,
          duration: 3
        }
      )
      gsap.fromTo(
        '.techs li',
        {
          opacity: 0,
          x: -50
        },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {urlImageToShow && <FullScreenImage onClickOutside={() => setUrlImageToShow('')} imageUrl={urlImageToShow} />}
      {/* <Header locale={locale} /> */}
      <div className="grid-background">
        <div className="grid-element" />
        <div className="grid-element" />
        <div className="grid-element" />
        <div className="grid-element" />
      </div>
      <div ref={containerRef}>
        <SectionLayout className="relative">
          <ul className="techs hide-scrollbar">
            {project.techs.map((stack, i) => (
              <Tag className="text-3 py-2 px-3" key={stack}>
                {stack}
              </Tag>
            ))}
          </ul>

          <h1>{project.company}</h1>
          <p className="title-description font-manrope">{project.description}</p>

          {isMobile ? (
            <div style={{ position: 'relative' }} className="preview skeleton">
              <Image fill className="preview" src={project.preview} alt="preview" />
            </div>
          ) : (
            <div className="preview skeleton">
              <Parallax
                bgImage={project.preview}
                style={{ width: '100%', height: '100%' }}
                bgImageAlt="preview"
                strength={200}
              />
            </div>
          )}

          <article>
            {project.subProjects.map((project, i) => (
              <PresentationTemplate
                key={`${project.title}-${i}}`}
                title={project.title}
                images={project.images}
                isReversed={(i + 1) % 2 === 0}
                description={project.description}
                url={project.url}
                onClickOnImage={(urlImage) => setUrlImageToShow(urlImage)}
              />
            ))}
          </article>
        </SectionLayout>
      </div>

      <SectionLayout>
        <h3 className="see-more">See other projects</h3>
        <div className="projects__wrapper">
          {otherProjects.map((project) => (
            <ProjectView
              key={project.slug}
              title={project.company}
              previewUrl={project.thumbnail}
              slug={project.slug}
            />
          ))}
        </div>
      </SectionLayout>
      {/* <Footer /> */}
    </>
  )
}
