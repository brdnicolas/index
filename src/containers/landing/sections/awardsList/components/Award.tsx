interface AwardProps {
  delivredBy: string
  title: string
  year: number
}

export const Award = ({ delivredBy, title, year }: AwardProps) => {
  const splitedTitle = title.split(/(\*\*[^*]+\*\*)/).map((part) => part.replace(/\*\*/g, ''))

  return (
    <div className="relative z-10 flex rounded-full w-full items-center bg-[#141414]/40 py-6 px-8 border-[1px] border-[#2E2A2A] backdrop-blur-md	">
      <p className="uppercase text-5 w-[200px]">{delivredBy}</p>
      <div className="flex items-center gap-2">
        {splitedTitle.map((word, index) => {
          if (word) {
            return (
              <>
                <p
                  key={word}
                  className={`${index === 1 ? 'special-award-word text-6 font-bold' : 'text-5 font-semibold'} uppercase`}
                >
                  {word}
                </p>
              </>
            )
          }
        })}
      </div>
      <p className="uppercase text-5 ml-auto">{year}</p>
    </div>
  )
}
