import fs from 'fs'
import path from 'path'

export default function CDAPage() {
  const html = fs.readFileSync(path.join(process.cwd(), 'public/cda', 'schemas.html'), 'utf-8')

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export const metadata = {
  title: 'Anti-sèche CDA — MERISE & UML'
}
