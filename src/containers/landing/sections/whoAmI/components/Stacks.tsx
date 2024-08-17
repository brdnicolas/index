import 'tippy.js/dist/tippy.css'
import Tippy from '@tippyjs/react'
import 'tippy.js/animations/scale.css'

export const Stacks = () => {
  return (
    <div className="card rounded-6">
      <div className="card-content bg-[#171717] font-manrope border-[1px] border-[#232323] p-7 text-5 overflow-hidden h-fit">
        <p>My favorite stacks & tools</p>
        <div className="mt-4 w-full flex items-center gap-3 flex-wrap">
          <Tippy content="Next.js" animation="scale">
            <img id="next" src="/icons/next.svg" alt="nextjs" />
          </Tippy>
          <Tippy content="React.js" animation="scale">
            <img src="/icons/react.svg" alt="reactjs" />
          </Tippy>
          <Tippy content="Javascript" animation="scale">
            <img src="/icons/js.svg" alt="javascript" />
          </Tippy>
          <Tippy content="Typescript" animation="scale">
            <img src="/icons/ts.svg" alt="typescript" />
          </Tippy>
          <Tippy content="Nest.js" animation="scale">
            <img src="/icons/nest.svg" alt="nestjs" />
          </Tippy>
          <Tippy content="Figma" animation="scale">
            <img src="/icons/figma.svg" alt="figma" />
          </Tippy>
          <Tippy content="Github" animation="scale">
            <img src="/icons/github.svg" alt="github" />
          </Tippy>
          <Tippy content="Docker" animation="scale">
            <img src="/icons/docker.svg" alt="docker" />
          </Tippy>
        </div>
      </div>
    </div>
  )
}
