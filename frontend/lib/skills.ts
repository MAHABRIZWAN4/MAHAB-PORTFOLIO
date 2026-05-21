import { client } from "./sanity";

export interface SkillItem {
  pkg: string;
  note: string;
}

export interface Skill {
  _id: string;
  category: string;
  categoryLabel: string;
  command: string;
  color: string;
  items: SkillItem[];
  order: number;
}

export async function getSkills(): Promise<Skill[]> {
  const query = `*[_type == "skill"] | order(order asc) {
    _id,
    category,
    categoryLabel,
    command,
    color,
    items,
    order
  }`;

  return client.fetch(query);
}
