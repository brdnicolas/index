import React from 'react'
import Atropos from 'atropos/react'
import Image from 'next/image'
import useIsMobile from '@/shared/hooks/useIsMobile'

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
        <a href={`/${slug}`} className="project__img__wrapper skeleton">
          <img src={previewUrl} alt={title} />
        </a>
      ) : (
        <Atropos shadowScale={0.9}>
          <a href={`/${slug}`} className="project__img__wrapper skeleton">
            <Image fill src={previewUrl} alt={title} />
          </a>
        </Atropos>
      )}
      <p className="project__title">{title}</p>
    </div>
  )
}
