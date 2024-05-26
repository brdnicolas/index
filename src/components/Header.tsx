import { Button } from './atoms/Button'
import { Icon } from '@iconify/react'

export const Header = () => {
  return (
    <header className="fixed w-full z-50 backdrop-blur-md">
      <div className="py-4 flex justify-between items-center  max-w-layout mx-auto">
        <p className="text-white text-4 font-bold">Nicolas B.</p>
        <div className="flex items-center gap-2">
          <Button.Secondary icon="solar:arrow-right-up-linear">Resume</Button.Secondary>
          <Button.Primary>Let's talk</Button.Primary>
        </div>
      </div>
    </header>
  )
}
