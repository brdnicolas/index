import { Tooltip } from '@/components/atoms/Tooltip'

export const Stacks = () => {
  return (
    <div className="card rounded-6">
      <div className="card-content bg-[#171717] font-manrope border-[1px] border-[#232323] p-7 text-5 overflow-hidden h-fit">
        <p>My favorite stacks & tools</p>
        <div className="mt-4 w-full flex items-center gap-3 flex-wrap">
          <Tooltip content="Next.js">
            <img id="next" src="/icons/next.svg" alt="nextjs" />
          </Tooltip>
          <Tooltip content="React.js & React Native">
            <img src="/icons/react.svg" alt="reactjs" />
          </Tooltip>
          <Tooltip content="Javascript">
            <img src="/icons/js.svg" alt="javascript" />
          </Tooltip>
          <Tooltip content="Typescript">
            <img src="/icons/ts.svg" alt="typescript" />
          </Tooltip>
          <Tooltip content="Nest.js">
            <img src="/icons/nest.svg" alt="nestjs" />
          </Tooltip>
          <Tooltip content="Figma">
            <img src="/icons/figma.svg" alt="figma" />
          </Tooltip>
          <Tooltip content="Github">
            <img src="/icons/github.svg" alt="github" />
          </Tooltip>
          <Tooltip content="Docker">
            <img src="/icons/docker.svg" alt="docker" />
          </Tooltip>
          <Tooltip content="Fastlane">
            <img src="/icons/fastlane.svg" alt="fastlane" />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
