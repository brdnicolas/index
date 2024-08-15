import { Icon } from '@iconify/react/dist/iconify.mjs'
import { Tag } from './Tag'

const EDUCATIONS = [
  {
    duration: '2019 — 2023',
    title: 'Master Software Architect Application Developer',
    school: 'ETNA',
    honor: 'Major'
  },
  {
    duration: '2016 — 2019',
    title: 'Scientific Baccalaureate',
    school: 'Sully',
    honor: 'Mention Bien'
  }
] as const

export const Education = () => {
  return (
    <div className="card rounded-6">
      <div className="card-content bg-[#171717] font-manrope border-[1px] border-[#232323] p-7 text-5 overflow-hidden">
        <p>Education</p>
        <div className="mt-4 text-4 w-full flex flex-col gap-6">
          {EDUCATIONS.map((education) => (
            <div className="flex w-full" key={education.school}>
              <div className="w-1/3 text-[#989898] font-normal text-3">
                <p>{education.duration}</p>
              </div>
              <div className="w-2/3 pl-3">
                <p className="font-semibold">{education.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="font-normal text-3 text-[#989898]">@{education.school}</p>
                  {education.honor ? <Tag>{education.honor}</Tag> : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
