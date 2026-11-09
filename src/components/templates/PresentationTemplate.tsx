import { useRef } from 'react'
import Image from 'next/image'

type PresentationTemplatePropsType = {
  title: string
  url?: string
  description: string
  images: string[]
  isReversed?: boolean
  device?: 'desktop' | 'mobile'
  onClickOnImage: (urlImage: string) => void
}

export const PresentationTemplate = ({
  title,
  url,
  description,
  images,
  isReversed = false,
  device = 'desktop',
  onClickOnImage
}: PresentationTemplatePropsType) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const galleryClassName = [
    'projects-gallery',
    device === 'mobile' ? 'mobile' : '',
    device === 'desktop' && isReversed ? 'reversed' : ''
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section ref={containerRef} className="font-manrope">
      <div className="subtitle">
        <h2>{title}</h2>
        {url && (
          <a href={url} target="_blank" rel="noopener, noreferrer" className="live flex items-center gap-2">
            Live access
            <span className="relative flex h-1 w-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1 w-1 bg-white"></span>
            </span>
          </a>
        )}
      </div>
      <p className="subtitle-description">{description}</p>

      <div className={galleryClassName}>
        {images.map((image) => (
          <div key={image} className="project_gallery_wrapper skeleton">
            <Image
              onClick={() => onClickOnImage(image)}
              fill
              sizes={device === 'mobile' ? '(max-width: 990px) 70vw, 320px' : '(max-width: 990px) 100vw, 50vw'}
              src={image}
              alt={`${title} view`}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
