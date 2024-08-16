import { Icon } from '@iconify/react/dist/iconify.mjs'

export const Articles = () => {
  return (
    <div className="card rounded-6">
      <div className="card-content relative bg-[#171717] font-manrope border-[1px] border-[#232323] p-7 overflow-hidden">
        <p className="text-5">I also write articles!</p>
        <div className="flex items-center justify-between mt-4">
          <a
            href="#"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 hover:text-white text-[#989898] text-4"
          >
            <p className="font-normal">On my own portfolio</p>
            <Icon
              icon="solar:arrow-right-up-linear"
              className="w-4 h-4 pt-[2px] group-hover:rotate-45 transition-all"
            />
          </a>
          <a
            href="https://dev.to/brdnicolas"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 hover:text-white text-[#989898] text-4"
          >
            <p className="font-normal">On Dev.to</p>
            <Icon
              icon="solar:arrow-right-up-linear"
              className="w-4 h-4 pt-[2px] group-hover:rotate-45 transition-all"
            />
          </a>
        </div>
      </div>
    </div>
  )
}
