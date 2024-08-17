import React from 'react'
import Atropos from 'atropos/react'
import Image from 'next/image'
import useIsMobile from '@/shared/hooks/useIsMobile'
import { TransitionLink } from '@/components/atoms/TransitionLink'

type ProjectPropsType = {
  title: string
  previewUrl: string
  slug: string
}

export const ProjectView = ({ title, previewUrl, slug }: ProjectPropsType) => {
  const isMobile = useIsMobile()

  return (
    <div className="project">
      {isMobile ? (
        <TransitionLink href={`/${slug}`} className="project__img__wrapper skeleton">
          <img src={previewUrl} alt={title} />
        </TransitionLink>
      ) : (
        <Atropos shadowScale={0.9}>
          <TransitionLink href={`/${slug}`} className="project__img__wrapper skeleton">
            <Image fill src={previewUrl} alt={title} />
          </TransitionLink>
        </Atropos>
      )}
      <p className="project__title font-manrope">{title}</p>
    </div>
  )
}
