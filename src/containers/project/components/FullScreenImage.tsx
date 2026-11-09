import Image from 'next/image'
import { CSSProperties, SyntheticEvent, useEffect, useState } from 'react'

type FullScreenImagePropsType = {
  imageUrl: string
  onClickOutside: () => void
}

export const FullScreenImage = ({ imageUrl, onClickOutside }: FullScreenImagePropsType) => {
  const [ratio, setRatio] = useState<number | null>(null)

  useEffect(() => {
    const html = document.querySelector('html')
    if (!html) {
      return
    }
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = 'unset'
    }
  }, [])

  const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget
    if (naturalWidth && naturalHeight) {
      setRatio(naturalWidth / naturalHeight)
    }
  }

  return (
    <div className="fullscreen-image z-50">
      <div onClick={onClickOutside} className="backdrop" />
      <div
        className={`img-container ${ratio ? 'ready' : ''}`}
        style={ratio ? ({ '--ratio': ratio } as CSSProperties) : undefined}
      >
        <Image fill src={imageUrl} alt="" onLoad={handleLoad} />
      </div>
    </div>
  )
}
