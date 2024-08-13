export const Award = () => {
  const word = '**React Author** top each week'

  const parts = word.split(/(\*\*[^*]+\*\*)/).map((part) => part.replace(/\*\*/g, ''))

  return (
    <div className="flex rounded-full w-full items-center bg-[#141414] py-6 px-8 border-[1px] border-[#2E2A2A]">
      <p className="uppercase text-5 w-[200px]">DEV.TO</p>
      <div className="flex items-center gap-2">
        {parts.map((word, index) => {
          if (word) {
            return (
              <p
                key={word}
                className={`${index === 1 ? 'special-award-word text-6 font-bold' : 'text-5 font-semibold'} uppercase`}
              >
                {word}
              </p>
            )
          }
        })}
      </div>
      <p className="uppercase text-5 ml-auto">2024</p>
    </div>
  )
}
