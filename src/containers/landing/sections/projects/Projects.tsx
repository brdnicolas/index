import { SectionLayout } from '@/components/SectionLayout'
import { ProjectsList } from './components/ProjectsList'

export const Projects = () => {
  return (
    <SectionLayout isFullWidth className="pb-[112px]">
      <ProjectsList />
    </SectionLayout>
  )
}
