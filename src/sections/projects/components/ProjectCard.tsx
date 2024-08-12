export const ProjectCard = () => {
  return (
    <div className="flex items-center gap-16 min-w-layout max-w-layout pr-16">
      <a href="#">
        <img
          className="min-w-[681px] max-w-[681px] h-[464px] object-cover rounded-6"
          src="/projects/pepiswap.png"
          alt="pepiswap"
        />
      </a>
      <div>
        <p className="text-3 text-dark-500">2023.09.12</p>
        <p className="text-white font-semibold text-6 mt-1">Front-End Engineer</p>
        <p className="text-4 text-dark-500 mt-1">@Pepiswap</p>
        <p className="text-4 text-dark-300 mt-6 text-justify">
          Pepiswap is a 100% french DEX (Decentralized Exchange) designed to make cryptocurrency trading easy and
          accessible
        </p>
      </div>
    </div>
  )
}
