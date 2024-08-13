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
    <section ref={containerRef}>
      <div className="subtitle">
        <h2>{title}</h2>
        {url && (
          <a href={url} target="_blank" rel="noopener, noreferrer" className="live">
            Live access
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
