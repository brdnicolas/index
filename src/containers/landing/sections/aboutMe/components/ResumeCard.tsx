import { Button } from '@/components/atoms/Button'

export const ResumeCard = () => {
  return (
    <div className="border-[1px] relative bg-white/5 border-dark-700 rounded-6 p-5 overflow-hidden backdrop-blur-md">
      <div className="relative z-10 flex flex-col items-center h-full">
        <img src="/pictures/me.jpeg" className="w-24 h-24 rounded-full" alt="me" />
        <p className="text-6 font-bold mt-3">Nicolas B.</p>
        <Button.Primary className="mt-auto w-fit  duration-500" icon="solar:arrow-right-up-linear">
          My Resume
        </Button.Primary>
      </div>
    </div>
  )
}
