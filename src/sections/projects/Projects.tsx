import { SectionLayout } from '@/components/SectionLayout'
import { ProjectsList } from './components/ProjectsList'

export const Projects = () => {
  return (
    <SectionLayout isFullWidth className="pb-[112px]">
      <div className="max-w-layout mx-auto">
        <h2 className="text-20 font-semibold">About Me</h2>
        <p className="mt-8 text-dark-300">Each project is made with love ♥</p>
      </div>
      <div>
        <ProjectsList />
      </div>
    </SectionLayout>
  )
}
