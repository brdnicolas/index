import Image from 'next/image'
import { useEffect } from 'react'

type FullScreenImagePropsType = {
  imageUrl: string
  onClickOutside: () => void
}

export const FullScreenImage = ({ imageUrl, onClickOutside }: FullScreenImagePropsType) => {
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

  return (
    <div className="fullscreen-image">
      <div onClick={onClickOutside} className="backdrop" />
      <div className="img-container">
        <Image fill src={imageUrl} alt="" />
      </div>
    </div>
  )
}
