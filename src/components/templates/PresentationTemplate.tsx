import { useRef } from 'react'
import Image from 'next/image'

type PresentationTemplatePropsType = {
  title: string
  url?: string
  description: string
  images: string[]
  isReversed: boolean
  onClickOnImage: (urlImage: string) => void
}
export const PresentationTemplate = ({
  title,
  url,
  description,
  images,
  isReversed = false,
  onClickOnImage
}: PresentationTemplatePropsType) => {
  const containerRef = useRef<HTMLDivElement>(null)

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

      <div className={`projects-gallery ${isReversed ? 'reversed' : ''}`}>
        {images.map((image) => (
          <div key={image} className="project_gallery_wrapper skeleton">
            <Image onClick={() => onClickOnImage(image)} fill src={image} alt={`${title} view`} />
          </div>
        ))}
      </div>
    </section>
  )
}
