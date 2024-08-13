'use client'
import './marquee.scss'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { SectionLayout } from '@/components/SectionLayout'

export const Marquee = () => {
  const WORDS = ['design', 'react', 'freelance', 'developer', 'engineer', 'creative', 'passionate']
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.to('.marquee-left .marquee__content', {
        translateX: '-=800',
        scrollTrigger: {
          trigger: containerRef.current,
          start: '0 bottom',
          end: '+=200%',
          scrub: true
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.to('.marquee-right .marquee__content', {
        translateX: '+=500',
        scrollTrigger: {
          trigger: containerRef.current,
          start: '0 bottom',
          end: '+=200%',
          scrub: true
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <SectionLayout hidePaddingX isFullWidth className="py-[120px]">
      <section ref={containerRef} className="marquees-wrapper">
        <div className="marquee marquee-left">
          <ul className="marquee__content scroll">
            {WORDS.map((word, i) => (
              <div key={`${word}-${i}`}>
                <li className={`${i % 2 === 0 ? 'transparent font-bold' : 'font-medium'}`} key={word}>
                  {word}
                </li>
                {i < word.length - 1 && (
                  <li>
                    <img src="/icons/star.svg" alt="star icon" />
                  </li>
                )}
              </div>
            ))}
          </ul>
          <ul className="marquee__content scroll" aria-hidden="true">
            {WORDS.map((word, i) => (
              <div key={`${word}-${i}`}>
                <li className={`${i % 2 === 0 ? 'transparent font-bold' : 'font-medium'}`} key={word}>
                  {word}
                </li>
                {i < word.length - 1 && (
                  <li>
                    <img src="/icons/star.svg" alt="star icon" />
                  </li>
                )}
              </div>
            ))}
          </ul>
        </div>
        <div className="marquee marquee-right">
          <ul className="marquee__content scroll" style={{ transform: 'translateX(-50%)' }}>
            {WORDS.map((word, i) => (
              <div key={`${word}-${i}`}>
                <li className={`${i % 2 === 0 ? 'transparent font-bold' : 'font-medium'}`} key={word}>
                  {word}
                </li>
                {i < word.length - 1 && (
                  <li>
                    <img src="/icons/star.svg" alt="star icon" />
                  </li>
                )}
              </div>
            ))}
          </ul>
          <ul className="marquee__content scroll" aria-hidden="true">
            {WORDS.map((word, i) => (
              <div key={`${word}-${i}`}>
                <li className={`${i % 2 === 0 ? 'transparent font-bold' : 'font-medium'}`} key={word}>
                  {word}
                </li>
                {i < word.length - 1 && (
                  <li>
                    <img src="/icons/star.svg" alt="star icon" />
                  </li>
                )}
              </div>
            ))}
          </ul>
        </div>
      </section>
    </SectionLayout>
  )
}
