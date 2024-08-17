export const MyTopSongs = () => {
  return (
    <div className="card rounded-6">
      <div className="card-content bg-[#171717] font-manrope border-[1px] border-[#232323] p-7 text-5 overflow-hidden">
        <p>My top songs</p>
        <div className="mt-4 w-full flex items-center flex-wrap gap-4">
          <iframe
            style={{ borderRadius: 12 }}
            src="https://open.spotify.com/embed/track/4gE7KmvipFX7w8MAEUwhq2?utm_source=generator&theme=0"
            width="100%"
            height="80"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
          <iframe
            style={{ borderRadius: 12 }}
            src="https://open.spotify.com/embed/track/7wZnwgGkwpJ8EYJ6VEJD2A?utm_source=generator&theme=0"
            width="100%"
            height="80"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
          <iframe
            style={{ borderRadius: 12 }}
            src="https://open.spotify.com/embed/track/2KOvNaMJcuaYTciDe2TmCP?utm_source=generator&theme=0"
            width="100%"
            height="80"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
