export const ParisCard = () => {
  return (
    <div className="border-[1px] relative bg-white/5 border-dark-700 rounded-6 p-5 aspect-square overflow-hidden group backdrop-blur-md">
      <div className="overflow-hidden w-full h-full rounded-4 relative z-10">
        <img
          src="/illustrations/paris.jpg"
          className="w-full h-full object-cover group-hover:scale-125 transition-all duration-500"
        />
        <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full">
          <p className="text-6 font-semibold">Based on Paris</p>
        </div>
      </div>
    </div>
  )
}
