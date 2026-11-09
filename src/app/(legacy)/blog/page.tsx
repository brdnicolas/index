import { TransitionLink } from '@/components/atoms/TransitionLink'
import { SectionLayout } from '@/components/SectionLayout'
import { Tag } from '@/containers/landing/sections/whoAmI/components/Tag'
import { getAllMinimalPosts } from '@/services/contentful/posts/post'

export default async function BlogPage() {
  const allPosts = await getAllMinimalPosts()
  const firstPost = allPosts[0]

  return (
    <SectionLayout className="mt-22 tablet:mt-28">
      <div className="max-w-[900px] mx-auto">
        {firstPost ? (
          <TransitionLink
            href={`/blog/${firstPost.slug}`}
            className="hidden tablet:flex cursor-pointer hover:border-gray-800 transition-all duration-200 border-[1px] border-[#232323] rounded-3 overflow-hidden"
          >
            <div className="w-1/2 p-10">
              <Tag className="text-3 w-fit mb-2">My last article</Tag>
              <h1 className="font-bold text-5">{firstPost.title}</h1>
              <p className="mt-2 text-3 text-gray-500">{firstPost.description}</p>
            </div>
            <div className="w-1/2 mt-auto px-10">
              <img
                alt="cover"
                src={`https:${firstPost.cover.fields.file.url}`}
                className="object-cover w-full h-[180px] rounded-t-2"
              />
            </div>
          </TransitionLink>
        ) : null}

        <div className="flex flex-col tablet:grid grid-cols-2 mt-5 gap-5">
          {allPosts.map((post, i) => (
            <TransitionLink
              href={`/blog/${post.slug}`}
              className={`${i === 0 ? 'block tablet:hidden' : ''} cursor-pointer hover:border-gray-800 h-[250px] transition-all duration-200 w-full border-[1px] border-[#232323] rounded-3 overflow-hidden relative`}
            >
              <div className="absolute bottom-4 z-20 left-4">
                <h2 className="text-5 font-bold w-full">{post.title}</h2>
              </div>
              <div
                style={{ background: 'linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(0 0 0) 100%)' }}
                className="absolute flex h-full w-full top-0 left-0 z-10"
              />
              <img
                alt="cover"
                src={`https:${post.cover.fields.file.url}`}
                className="object-cover object-center w-full h-full rounded-t-2"
              />
            </TransitionLink>
          ))}
        </div>
      </div>
    </SectionLayout>
  )
}
