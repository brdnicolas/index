import { Button } from '@/components/atoms/Button'
import { Icon } from '@iconify/react/dist/iconify.mjs'

export const Quote = () => {
  return (
    <div className="card rounded-6">
      <div className="card-content bg-[#171717] p-7 text-4 overflow-hidden border-[1px] border-[#232323]">
        <p>
          Front-end engineer with 3+ years of experience, I create the websites of tomorrow—designed to impress both you
          and your users.
        </p>
        <p className="mt-6">Coding isn't just a skill, it's my way of turning ideas into reality.</p>

        <div className="flex items-center justify-between mt-6">
          <address className="flex items-center gap-4">
            <a
              className="bg-dark-600 group h-9 w-9 flex justify-center items-center rounded-2"
              href="https://wa.me/0767939258"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                className="w-5 h-5 text-dark-500 group-hover:text-white transition-all"
                icon="basil:linkedin-solid"
              />
            </a>
            <a
              className="bg-dark-600 group h-9 w-9 flex justify-center items-center rounded-2"
              href="https://wa.me/0767939258"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                className="w-5 h-5 text-dark-500 group-hover:text-white transition-all"
                icon="basil:envelope-solid"
              />
            </a>
            <a
              className="bg-dark-600 group h-9 w-9 flex justify-center items-center rounded-2"
              href="https://wa.me/0767939258"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                className="w-5 h-5 text-dark-500 group-hover:text-white transition-all"
                icon="basil:whatsapp-outline"
              />
            </a>
            <a
              className="bg-dark-600 group h-9 w-9 flex justify-center items-center rounded-2"
              href="https://wa.me/0767939258"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                className="w-5 h-5 text-dark-500 group-hover:text-white transition-all"
                icon="basil:twitter-solid"
              />
            </a>
          </address>
          <Button.Tertiary icon="solar:arrow-right-up-linear">Resume</Button.Tertiary>
        </div>
      </div>
    </div>
  )
}
