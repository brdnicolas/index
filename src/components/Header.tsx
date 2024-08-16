import { Button } from './atoms/Button'

export const Header = () => {
  return (
    <header className="fixed w-full z-40 backdrop-blur-md px-4 md-0 font-manrope border-b-[1px] border-[#1E1D1D] bg-black tablet:bg-transparent">
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
