import clsx from 'clsx'
import { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  className?: string
}

export const Tag = ({ children, className }: TagProps) => {
  return (
    <div className={clsx('py-[2px] px-2 text-2.5 text-[#989898] font-normal rounded-full bg-[#262626]', className)}>
      {children}
    </div>
  )
}
