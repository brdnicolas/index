import { Fragment } from 'react'

type SplitProps = {
  text: string
  by?: 'chars' | 'words'
  mask?: boolean
  wordClassName?: string
  charClassName?: string
}

// Hand-rolled text splitter: words > chars, accessible (screen readers get the plain string).
export const Split = ({ text, by = 'chars', mask = false, wordClassName = '', charClassName = '' }: SplitProps) => {
  const words = text.split(' ')

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <Fragment key={`${word}-${wordIndex}`}>
            <span className={`split-word ${mask ? 'is-masked' : ''} ${wordClassName}`}>
              {by === 'chars'
                ? Array.from(word).map((char, charIndex) => (
                    <span key={`${char}-${charIndex}`} className={`split-char ${charClassName}`}>
                      {char}
                    </span>
                  ))
                : word}
            </span>
            {wordIndex < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </span>
    </>
  )
}
