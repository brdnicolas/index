import { useState } from 'react'

export const SpotifyCard = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="border-[1px] relative bg-white/5 border-dark-700 rounded-6 p-5 overflow-hidden group cursor-pointer backdrop-blur-md"
    >
      <div className="relative z-10 flex flex-col justify-between h-full">
        <img src={'/logos/spotify.webp'} className="w-10 h-10" alt="spotify" />
        <div className="mt-auto">
          <div className="flex items-center gap-3">
            <img className="w-8 h-8" src={isHovered ? '/gifs/audio.gif' : '/icons/audio.svg'} alt="" />
            <p className="text-5 text-success font-medium">My favorite song</p>
          </div>
          <p className="font-bold mt-3 text-6">Big Jet Plane</p>
          <p className="mt-1 text-3">Angus & Julia Stone</p>
        </div>
      </div>
    </div>
  )
}
