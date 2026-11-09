import { ReactNode } from 'react'

// Tiny CSS tooltip (replaces @tippyjs/react, which reads element.ref and breaks under React 19)
export const Tooltip = ({ content, children }: { content: string; children: ReactNode }) => (
  <span className="relative inline-flex group">
    {children}
    <span
      role="tooltip"
      className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 scale-90 whitespace-nowrap rounded-2 bg-white px-2 py-1 text-3 font-medium text-black opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 z-50"
    >
      {content}
    </span>
  </span>
)
