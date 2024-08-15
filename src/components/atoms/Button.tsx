import { ReactNode } from 'react'
import { Icon } from '@iconify/react'
import clsx from 'clsx'

interface ButtonProps {
  children: ReactNode
  icon?: string
  className?: string
}

const Primary = ({ children, icon, className }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'px-4 py-2 text-4 rounded-2 hover:opacity-50 transition-all flex items-center gap-2 font-manrope font-medium bg-white text-black',
        className
      )}
    >
      {children}
      {icon ? <Icon className="text-5 text-black" icon={icon} /> : null}
    </button>
  )
}

const Secondary = ({ children, icon, className }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'px-4 py-2 text-4 rounded-2 hover:opacity-50 transition-all flex items-center gap-2 font-manrope font-medium text-white',
        className
      )}
    >
      {children}
      {icon ? <Icon className="text-5 text-white" icon={icon} /> : null}
    </button>
  )
}

const Tertiary = ({ children, icon, className }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'group hover:text-white px-4 py-2 text-4 bg-[#262626] rounded-2 transition-all flex items-center gap-2 font-manrope font-medium text-[#A0A0A0]',
        className
      )}
    >
      {children}
      {icon ? <Icon className="text-5 text-[#A0A0A0] group-hover:text-white transition-all" icon={icon} /> : null}
    </button>
  )
}

export const Button = ({ children, icon, className }: ButtonProps) => {
  return (
    <Primary className={className} icon={icon}>
      {children}
    </Primary>
  )
}

Button.Primary = Primary
Button.Secondary = Secondary
Button.Tertiary = Tertiary
