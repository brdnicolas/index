import { SectionLayout } from '../SectionLayout'
import { Button } from '../atoms/Button'

export const Footer = () => {
  return (
    <div className="py-13 border-t-[1px] border-t-dark-400 bg-black relative z-10 mt-[112px]">
      <SectionLayout>
        <footer className="flex justify-between items-center">
          <div>
            <p className="text-4 font-bold">&copy; Nicolas Brouard - All rights reserved</p>
            <p className="text-3 text-dark-500 mt-3">Designed and developed with love by me</p>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-x-18 gap-y-4">
              <Button.Secondary icon="solar:arrow-right-up-linear">Linkedin</Button.Secondary>
              <Button.Secondary icon="solar:arrow-right-up-linear">Whatsapp</Button.Secondary>
              <Button.Secondary icon="solar:arrow-right-up-linear">Resume</Button.Secondary>
              <Button.Secondary icon="solar:arrow-right-up-linear">Let's meet</Button.Secondary>
            </div>
          </div>
        </footer>
      </SectionLayout>
    </div>
  )
}
