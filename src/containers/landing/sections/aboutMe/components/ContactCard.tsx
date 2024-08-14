import { Icon } from '@iconify/react/dist/iconify.mjs'

export const ContactCard = () => {
  return (
    <div className="border-[1px] relative bg-white/5 border-dark-700 col-span-2 rounded-6 p-5 overflow-hidden backdrop-blur-md">
      <div className="flex justify-center items-center flex-col h-full">
        <p className="text-6 text-center font-bold">Contact me</p>
        <p className="text-4 text-center mt-2">I will answer you as soon as possible!</p>
        <address className="flex items-center gap-4 mt-6">
          <a
            className="bg-dark-600 group h-11 w-11 flex justify-center items-center rounded-2"
            href="https://wa.me/0767939258"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon className="w-7 h-7 text-dark-500 group-hover:text-white transition-all" icon="basil:linkedin-solid" />
          </a>
          <a
            className="bg-dark-600 group h-11 w-11 flex justify-center items-center rounded-2"
            href="https://wa.me/0767939258"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon className="w-7 h-7 text-dark-500 group-hover:text-white transition-all" icon="basil:envelope-solid" />
          </a>
          <a
            className="bg-dark-600 group h-11 w-11 flex justify-center items-center rounded-2"
            href="https://wa.me/0767939258"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              className="w-7 h-7 text-dark-500 group-hover:text-white transition-all"
              icon="basil:whatsapp-outline"
            />
          </a>
          <a
            className="bg-dark-600 group h-11 w-11 flex justify-center items-center rounded-2"
            href="https://wa.me/0767939258"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon className="w-7 h-7 text-dark-500 group-hover:text-white transition-all" icon="basil:twitter-solid" />
          </a>
        </address>
      </div>
    </div>
  )
}
