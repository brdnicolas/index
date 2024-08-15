export const Stacks = () => {
  return (
    <div className="card rounded-6">
      <div className="card-content bg-[#171717] font-manrope border-[1px] border-[#232323] p-7 text-5 overflow-hidden h-fit">
        <p>My favorite stacks & tools</p>
        <div className="mt-4 w-full flex items-center gap-3 flex-wrap">
          <img src="/icons/next.svg" alt="nextjs" />
          <img src="/icons/react.svg" alt="reactjs" />
          <img src="/icons/js.svg" alt="javascript" />
          <img src="/icons/ts.svg" alt="typescript" />
          <img src="/icons/nest.svg" alt="nestjs" />
          <img src="/icons/figma.svg" alt="figma" />
          <img src="/icons/github.svg" alt="github" />
          <img src="/icons/docker.svg" alt="docker" />
        </div>
      </div>
    </div>
  )
}
