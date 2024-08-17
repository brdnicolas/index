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
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    setFirstPaddingCard(size.width <= MAX_LAYOUT_WIDTH ? 16 : (size.width - MAX_LAYOUT_WIDTH) / 2)
  }, [size])

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.fromTo(
  //       titleRef.current,
  //       { opacity: 0, y: 50 },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         scrollTrigger: {
  //           trigger: titleRef.current,
  //           scrub: 0.5,
  //           start: 'top-=50% 85%',
  //           end: 'bottom 85%'
  //         }
  //       }
  //     )
  //   })
  //   return () => {
  //     ctx.revert()
  //   }
  // }, [])

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
          start: size.width <= 1204 ? 'top 72px' : 'center center',
          end: () => `+=${horizontalScrollLength}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      })
    })
    return () => {
      ctx.revert()
    }
  }, [firstPaddingCard])

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div className="max-w-layout mx-auto px-4 desktop:px-0" ref={titleRef}>
        <h2 className="text-14 desktop:text-20 font-semibold">Projects</h2>
        <p className="mt-2 text-dark-300 font-manrope">Turning dreams into reality, one epic project at a time.</p>
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
