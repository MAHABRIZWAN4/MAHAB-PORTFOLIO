import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-01-01",
  useCdn: true,
});

export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  techStack: string[];
  category: string;
  coverImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  gradient: string;
  icon: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
}

export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    techStack,
    category,
    coverImage,
    gradient,
    icon,
    githubUrl,
    liveUrl,
    featured,
    order
  }`;

  return client.fetch(query);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const query = `*[_type == "project" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    description,
    techStack,
    category,
    coverImage,
    gradient,
    icon,
    githubUrl,
    liveUrl,
    featured,
    order
  }`;

  return client.fetch(query);
}
