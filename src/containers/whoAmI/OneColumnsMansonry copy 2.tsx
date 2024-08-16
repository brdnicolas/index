import { Articles } from './components/Articles'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { IAm } from './components/IAm'
import { LetsMeet } from './components/LetsMeet'
import { Me } from './components/Me'
import { MyTopSongs } from './components/MyTopSongs'
import { Quote } from './components/Quote'
import { Stacks } from './components/Stacks'

export const OneColumnsMansonry = () => {
  return (
    <div className="grid grid-cols-1 gap-4 items-start mt-10 px-4 tablet:px-0">
      <div id="col1" className="flex flex-col tablet:grid gap-4 items-start">
        <IAm />
        <Me />
        <Experience />
        <Education />
        <Articles />
        <LetsMeet />
        <Quote />
        <Stacks />
        <MyTopSongs />
      </div>
    </div>
  )
}
