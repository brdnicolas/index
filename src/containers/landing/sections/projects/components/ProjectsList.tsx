'use client'
import { MAX_LAYOUT_WIDTH } from '@/shared/constants'
import { ProjectCard } from './ProjectCard'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { EXPERIENCES } from '@/data/projects'
import { useWindowSize } from '@/shared/hooks/useWindowSize'

export const ProjectsList = () => {
  const size = useWindowSize()
  const containerRef = useRef<HTMLDivElement>(null)
  const horizontalScrollRef = useRef<HTMLDivElement>(null)
  const [firstPaddingCard, setFirstPaddingCard] = useState(0)

  useEffect(() => {
    setFirstPaddingCard(size.width <= MAX_LAYOUT_WIDTH ? 16 : (size.width - MAX_LAYOUT_WIDTH) / 2)
  }, [size])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current
      const horizontalScroll = horizontalScrollRef.current

      if (!container || !horizontalScroll) {
        return
      }

      const horizontalScrollLength = horizontalScroll.scrollWidth - container.offsetWidth + firstPaddingCard

      gsap.to(horizontalScroll, {
        x: -horizontalScrollLength,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'center center',
          end: () => `+=${horizontalScrollLength}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          // snap: {
          //   snapTo: 1 / (EXPERIENCES.length - 1),
          //   duration: 0.75
          // },
          invalidateOnRefresh: true
        }
      })
    })
    return () => {
      ctx.revert()
    }
  })

  return (
    <div ref={containerRef} style={{ overflow: 'hidden' }}>
      <div className="max-w-layout mx-auto px-4 desktop:px-0">
        <h2 className="text-14 desktop:text-20 font-semibold">Projects</h2>
        <p className="mt-2 text-dark-300 font-manrope">Each project is made with love ♥</p>
      </div>
      <div
        ref={horizontalScrollRef}
        className="flex items-center gap-8 mt-10"
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
        <ProjectCard
          date="Now"
          tinyDescription="This could be the beginning of something amazing...
          Imagine a world where your brilliant ideas meet my creativity. The possibilities? Endless. The results? Legendary."
          company="Your company"
          role="Our futur project"
          thumbnailUrl="/projects/placeholder.svg"
          slug=""
        />
      </div>
    </div>
  )
}
