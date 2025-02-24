'use client'
import { ReactNode, useState } from 'react'

interface CopyButtonProps {
  children: ReactNode
  onCopyChildren?: ReactNode
  text: string
  className?: string
}

export const CopyButton = ({ children, className, text, onCopyChildren }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    if (isCopied) {
      return
    }

    setIsCopied(true)
    navigator.clipboard.writeText(text)
    setTimeout(() => {
      setIsCopied(false)
    }, 1_000)
  }

  return (
    <button className={className} onClick={handleCopy}>
      {isCopied && onCopyChildren ? onCopyChildren : null}
      {!isCopied ? children : null}
    </button>
  )
}
