export const LastArticleCard = () => {
  return (
    <div className="border-[1px] relative border-dark-700 rounded-6 p-5 aspect-square overflow-hidden group cursor-pointer backdrop-blur-md">
      <div className="overflow-hidden w-full h-full rounded-4 relative z-10">
        <img
          src="/illustrations/last_article.webp"
          className="w-full h-full object-cover group-hover:scale-125 transition-all duration-500"
        />
      </div>
    </div>
  )
}
