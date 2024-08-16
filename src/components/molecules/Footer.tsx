import { SectionLayout } from '../SectionLayout'
import { Button } from '../atoms/Button'

export const Footer = () => {
  return (
    <div className="pb-4 pt-6 tablet:py-13 border-t-[1px] border-t-dark-400 bg-black relative z-10 mt-[112px] font-manrope">
      <SectionLayout>
        <footer className="flex flex-col tablet:flex-row tablet:justify-between tablet:items-center">
          <div>
            <p className="text-4 font-bold">&copy; Folio {new Date().getFullYear()}</p>
            <p className="text-3 text-dark-500 mt-2">Designed and developed with love by Nicolas B.</p>
            <div className="mt-1 flex items-center gap-1">
              <p className="text-3 text-dark-500">Thanks to Melanie J. for the extra sprinkle of magic!</p>
              <img className="h-3 w-3" src="/emoji/sparkles.png" alt="sparkles" />
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-x-18 gap-y-4 mt-10 tablet:mt-0">
              <Button.Secondary href="https://linkedin.com/in/brdnicolas" icon="solar:arrow-right-up-linear">
                Linkedin
              </Button.Secondary>
              <Button.Secondary href="/resume/Nicolas BROUARD CV.pdf" icon="solar:arrow-right-up-linear">
                Resume
              </Button.Secondary>
              <Button.Secondary href="https://www.malt.fr/profile/brdnicolas" icon="solar:arrow-right-up-linear">
                Malt
              </Button.Secondary>
              <Button.Secondary href="https://cal.com/brdnicolas" icon="solar:arrow-right-up-linear">
                Let's meet
              </Button.Secondary>
            </div>
          </div>
        </footer>
      </SectionLayout>
    </div>
  )
}
