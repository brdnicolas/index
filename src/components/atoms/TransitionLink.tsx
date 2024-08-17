'use client'
import { usePathname, useRouter } from 'next/navigation'
import { animatePageOut } from '@/shared/utils/animations'
import { MouseEvent, ReactNode } from 'react'

interface TransitionLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export const TransitionLink = ({ href, children, className }: TransitionLinkProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    if (pathname !== href) {
      animatePageOut(href, router)
    }
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
