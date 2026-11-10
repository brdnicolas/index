import { HOME_OG_ALT, HOME_OG_SIZE, renderHomeOg } from '@/site/og/home'

export const alt = HOME_OG_ALT
export const size = HOME_OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return renderHomeOg()
}
