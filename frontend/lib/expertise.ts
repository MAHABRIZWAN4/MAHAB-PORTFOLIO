import { client } from './sanity'

export interface Expertise {
  _id: string
  title: string
  subtitle: string
  description: string
  icon: 'ai' | 'fullstack' | 'devops'
  accentColor: 'indigo' | 'teal' | 'amber'
  order: number
}

export async function getExpertise(): Promise<Expertise[]> {
  const query = `*[_type == "expertise"] | order(order asc) {
    _id,
    title,
    subtitle,
    description,
    icon,
    accentColor,
    order
  }`

  return client.fetch(query)
}
