import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'

// Fonts of the site, shared by the English (portfolio) and French (CDA toolbox) root layouts.
const sans = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap'
})

export const fontVariables = `${sans.variable} ${mono.variable} ${serif.variable}`
