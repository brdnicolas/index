import { Button } from './atoms/Button'

export const Header = () => {
  return (
    <header className="fixed w-full z-40 !px-0 backdrop-blur-md font-manrope border-b-[1px] border-[#1E1D1D] bg-black tablet:bg-transparent">
      <div className="py-4 flex justify-between items-center w-full max-w-layout px-4 desktop:px-0 mx-auto">
        <a href="/" className="text-white text-4 font-bold cursor-pointer">
          Nicolas B.
        </a>
        <div className="flex items-center gap-2">
          <Button.Secondary href="/resume/Nicolas BROUARD CV.pdf" icon="solar:arrow-right-up-linear">
            Resume
          </Button.Secondary>
          <Button.Primary href="https://cal.com/brdnicolas">Let's talk</Button.Primary>
        </div>
      </div>
    </header>
  )
}
