import { Button } from './atoms/Button'

export const Header = () => {
  return (
    <header className="fixed w-full z-10 backdrop-blur-md">
      <div className="py-4 flex justify-between items-center  max-w-layout mx-auto">
        <a href="/" className="text-white text-4 font-bold">
          Nicolas B.
        </a>
        <div className="flex items-center gap-2">
          <Button.Secondary icon="solar:arrow-right-up-linear">Resume</Button.Secondary>
          <Button.Primary>Let's talk</Button.Primary>
        </div>
      </div>
    </header>
  )
}
