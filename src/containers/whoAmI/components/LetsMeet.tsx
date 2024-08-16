export const LetsMeet = () => {
  return (
    <div className="card rounded-6">
      <div className="card-content relative bg-[#171717] font-manrope border-[1px] border-[#232323] p-7 pb-0 overflow-hidden">
        <p className="text-center text-5">Let's meet!</p>
        <p className="text-center mt-3 text-4 pb-[160px]">Book a call with me and let's talk together</p>
        <a
          href="https://cal.com/brdnicolas"
          rel="noopener noreferrer"
          className="absolute w-5/6 hover:-mt-[135px] cursor-pointer transition-all top-full -mt-[80px] left-1/2 -translate-x-1/2 duration-500"
        >
          <img src="/elements/calendar2.svg" alt="calendar" />
        </a>
      </div>
    </div>
  )
}
