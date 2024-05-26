import { SectionLayout } from '@/components/SectionLayout'

export const Landing = () => {
  return (
    <SectionLayout isFullScreen className="flex flex-col items-center justify-center h-screen">
      <h1 className="flex items-center text-6 gap-1 text-dark-300">
        Hi! <img src="/emoji/victory.png" className="h-6" /> I'm Nicolas Brouard
      </h1>
      <h2 className="text-[92px] font-bold text-center">
        I'm just a <br />
        React Engineer
      </h2>
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
        </span>
        <h3 className="text-dark-300 text-4">Open for opportunities based on Paris</h3>
      </div>
    </SectionLayout>
  )
}
