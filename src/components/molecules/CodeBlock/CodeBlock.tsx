import { BundledLanguage, codeToHtml } from 'shiki'
import './codeblock.scss'
import { CopyButton } from '../../atoms/CopyButton'
import { Icon } from '@iconify/react/dist/iconify.mjs'

interface CodeBlockProps {
  children: string
  language: BundledLanguage
}

export async function CodeBlock({ children, language }: CodeBlockProps) {
  const out = await codeToHtml(children, {
    lang: language,
    theme: 'material-theme-darker'
  })

  return (
    <div className="codeblock relative">
      <CopyButton
        onCopyChildren={<Icon className="text-5 text-green-600" icon="solar:check-read-outline" />}
        className="absolute z-10 top-3 right-3 bg-[#212121] rounded-3 p-2"
        text={children}
      >
        <Icon className="text-5 text-gray-400" icon="solar:copy-linear" />
      </CopyButton>
      <div className="[&>pre]:p-5 [&>pre]:rounded-2 mb-5" dangerouslySetInnerHTML={{ __html: out }} />
    </div>
  )
}
