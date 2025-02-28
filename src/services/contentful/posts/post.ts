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

export interface MinimalPost {
  slug: string
  cover: {
    fields: {
      file: {
        url: string
      }
    }
  }
  description: string
  title: string
}

export const getAllMinimalPosts = async (): Promise<MinimalPost[]> => {
  const entries = await client.withoutUnresolvableLinks
    .getEntries({
      content_type: 'post',
      select: ['fields.cover', 'fields.title', 'fields.description', 'fields.date', 'fields.slug'],
      order: ['-fields.date']
    })
    .then((entries) => {
      return entries.items.map((post) => post.fields)
    })

  return entries as unknown as MinimalPost[]
}

export const getTheLatestMinimalPost = async (): Promise<MinimalPost> => {
  const entry = await client.withoutUnresolvableLinks
    .getEntries({
      content_type: 'post',
      select: ['fields.cover', 'fields.title', 'fields.description', 'fields.date', 'fields.slug'],
      order: ['fields.date'],
      limit: 1
    })
    .then((entries) => {
      return entries.items.map((post) => post.fields)
    })

  return entry[0] as unknown as MinimalPost
}
