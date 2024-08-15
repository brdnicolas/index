import { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
}

export const Tag = ({ children }: TagProps) => {
  return <div className="py-[2px] px-2 text-2.5 text-[#989898] font-normal rounded-full bg-[#262626]">{children}</div>
}
