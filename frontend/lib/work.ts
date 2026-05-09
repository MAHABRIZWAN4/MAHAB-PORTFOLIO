import { client } from './sanity'

export interface Work {
  _id: string
  heading: string
  description: string
  featuredLabel: string
  buttonText: string
  videoFile?: {
    asset: {
      _ref: string
      url: string
    }
  }
  order?: number
}

export async function getWork(): Promise<Work | null> {
  const query = `*[_type == "work"][0] {
    _id,
    heading,
    description,
    featuredLabel,
    buttonText,
    videoFile {
      asset-> {
        _ref,
        url
      }
    },
    order
  }`

  return client.fetch(query)
}
