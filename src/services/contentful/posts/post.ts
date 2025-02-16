import { Asset } from 'contentful'
import { client } from '../client'

export const getAllSlugs = () => {
  return client.withoutUnresolvableLinks
    .getEntries({
      content_type: 'post',
      select: ['fields.slug']
    })
    .then((entries) => {
      return entries.items.map((post) => post.fields)
    })
}

interface Post {
  slug: string
  cover: {
    fields: {
      file: {
        url: string
      }
    }
  }
  date: string
  description: string
  title: string
  content: any
  tags: {
    fields: {
      title: string
    }
  }[]
}

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const entries = await client.getEntries({
    content_type: 'post',
    'fields.slug': slug
  })

  return entries.items[0].fields as unknown as Post
}
