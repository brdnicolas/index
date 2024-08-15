export const LetsMeet = () => {
  return (
    <div className="card rounded-6">
      <div className="card-content relative bg-[#171717] font-manrope border-[1px] border-[#232323] p-7 pb-0 overflow-hidden">
        <p className="text-center text-5">Let's meet!</p>
        <p className="text-center mt-3 text-4 pb-[160px]">Book a call with me and let's talk together</p>
        <img
          src="/elements/calendar2.svg"
          alt=""
          className="absolute w-5/6 hover:-bottom-5 cursor-pointer transition-all -bottom-12 left-1/2 -translate-x-1/2 duration-500"
        />
      </div>
    </div>
  )
}
