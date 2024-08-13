'use client'
import { MAX_LAYOUT_WIDTH } from '@/shared/constants'
import { ProjectCard } from './ProjectCard'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { EXPERIENCES } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

export const ProjectsList = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const horizontalScrollRef = useRef<HTMLDivElement>(null)
  const [firstPaddingCard, setFirstPaddingCard] = useState(0)

  useEffect(() => {
    setFirstPaddingCard((window.innerWidth - MAX_LAYOUT_WIDTH) / 2)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const horizontalScroll = horizontalScrollRef.current

    if (!container || !horizontalScroll) {
      return
    }

    const horizontalScrollLength = horizontalScroll.scrollWidth - container.offsetWidth

    gsap.to(horizontalScroll, {
      x: -horizontalScrollLength,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: '-5% top',
        end: () => `+=${horizontalScrollLength}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} style={{ height: '100vh', overflow: 'hidden' }}>
      <div
        ref={horizontalScrollRef}
        className="flex items-center gap-8 h-screen"
        style={{ paddingLeft: firstPaddingCard }}
      >
        {EXPERIENCES.map((project) => (
          <ProjectCard
            date={project.date}
            tinyDescription={project.description}
            company={project.company}
            role={project.role}
            thumbnailUrl={project.thumbnail}
            slug={project.slug}
          />
        ))}
      </div>
    </div>
  )
}
