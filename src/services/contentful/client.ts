import { createClient } from 'contentful'

export const client = createClient({
  space: 'oavqg61dsomd',
  environment: 'master',
  accessToken: 'f1dqZRPbOPe0Z92MKFMYdn0Hg1NDY6dGle0X8roPMmk'
})

export const getOneItem = () => {
  client.getEntry('4vVZ5KGn8GjN8P8vt8Z4WG').catch(console.error)
}
