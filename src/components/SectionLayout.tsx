import clsx from 'clsx'
import { CSSProperties, ReactNode } from 'react'

interface SectionLayout {
  children: ReactNode
  className?: string
  isFullScreen?: boolean
  isFullWidth?: boolean
  hidePaddingX?: boolean
  style?: CSSProperties
}

export const SectionLayout = ({
  children,
  className,
  isFullScreen,
  style,
  isFullWidth,
  hidePaddingX
}: SectionLayout) => {
  return (
    <section
      style={style}
      className={clsx(
        isFullScreen ? 'min-h-dvh' : 'h-auto',
        isFullWidth ? '' : `px-4 desktop:px-0 desktop:max-w-layout ${hidePaddingX ? '' : 'mx-auto'}`,
        className
      )}
    >
      {children}
    </section>
  )
}
