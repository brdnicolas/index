import { CodeBlock } from '@/components/molecules/CodeBlock/CodeBlock'
import { SEOHead } from '@/components/atoms/SEOHead'
import { SectionLayout } from '@/components/SectionLayout'
import { Tag } from '@/containers/landing/sections/whoAmI/components/Tag'
import { getAllSlugs, getPostBySlug } from '@/services/contentful/posts/post'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import dayjs from 'dayjs'

export const dynamicParams = false

export async function generateStaticParams() {
  return await getAllSlugs()
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const post = await getPostBySlug(slug)

  if (!post) return

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
        const { language, code } = node.data.target.fields
        return <CodeBlock language={language}>{code}</CodeBlock>
      },
      'embedded-asset-block': (node: any) => {
        const { file, title, description } = node.data.target.fields
        const imageUrl = file.url ? `https:${file.url}` : ''
        return (
          <img
            className="rounded-3 max-w-[700px] my-5 border-[1px] border-[#232323]"
            src={imageUrl}
            alt={title || description || 'Image'}
            width="100%"
            height="auto"
          />
        )
      }
    }
  }

  return (
    <main className="bg-black">
      <SEOHead
        description={post.description + ''}
        title={post.title + ''}
        previewUrl=""
        url={`https://brdnicolas.com/blog/${slug}`}
      />
      <SectionLayout className="pt-27">
        <img
          alt="cover"
          src={`https:${post.cover.fields.file.url}`}
          className="w-full h-[300px] object-cover object-center rounded-3"
        />
        <div className="w-[900px] mx-auto p-7 mt-9">
          <div className="flex gap-3 mb-2">
            {post.tags.map((tag) => (
              <Tag className="text-3">{tag.fields.title}</Tag>
            ))}
          </div>
          <h1 className="text-11 font-semibold mb-7">{post.title}</h1>
          <div className="mb-15">
            <time dateTime={post.date}>{dayjs(post.date).format('DD MMM YYYY')}</time>
          </div>
          <article className="[&>ul]:text-[#bdc5d1] [&>code]:m-10 [&>ul]:flex [&>ul]:flex-col [&>ul]:gap-5 [&>ul]:pl-4 [&>ul]:list-disc [&>p]:text-[#bdc5d1] [&>p]:text-[16px] [&>ul]:mb-6 [&>h5]:mb-6 [&>h4]:text-[18px] [&>h5]:font-bold [&>h4]:font-bold [&>h4]:mb-6 [&>p]:mb-6 [&>h2]:mb-3 [&>h2]:mt-20 [&>h3]:mb-3 [&>h3]:mt-15 [&>h2]:font-extrabold [&>h2]:text-7 [&>h3]:font-extrabold [&>h3]:text-5">
            {documentToReactComponents(post.content, options)}
          </article>
        </div>
      </SectionLayout>
    </main>
  )
}
