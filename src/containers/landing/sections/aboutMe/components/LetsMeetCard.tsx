export const LetsMeetCard = () => {
  return (
    <div className="border-[1px] relative border-dark-700 col-span-2 rounded-6 p-5 overflow-hidden backdrop-blur-md">
      <div className="relative z-10">
        <p className="text-6 text-center font-bold">Let's meet!</p>
        <p className="text-4 text-center mt-3">Book a call with me and let's talk together</p>
      </div>
      <img
        src="/elements/calendar2.svg"
        alt=""
        className="absolute hover:-bottom-5 cursor-pointer transition-all -bottom-12 left-1/2 -translate-x-1/2 duration-500"
      />
    </div>
  )
}
