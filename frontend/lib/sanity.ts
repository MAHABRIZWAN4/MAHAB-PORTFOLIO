import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

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

export interface Hero {
  _id: string;
  name: string;
  rotatingTitles: string[];
  techPills: Array<{
    icon: string;
    label: string;
  }>;
  tagline: string;
  availabilityStatus?: string;
  availabilityYear?: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
  githubUrl: string;
  linkedinUrl: string;
  cvFile?: {
    asset: {
      _ref: string;
      url: string;
    };
  };
}

export interface Footer {
  _id: string;
  copyrightName: string;
  githubUrl: string;
  linkedinUrl: string;
  builtWithTech: Array<{
    name: string;
    color: string;
  }>;
}

export interface ProjectsConfig {
  _id: string;
  sectionHeading: string;
  sectionDescription: string;
  terminalPath: string;
  categories: Array<{
    name: string;
    accentColor: string;
    glowColor: string;
    tagColor: string;
  }>;
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

export async function getHero(): Promise<Hero | null> {
  const query = `*[_type == "hero"][0] {
    _id,
    name,
    rotatingTitles,
    techPills,
    tagline,
    availabilityStatus,
    availabilityYear,
    stats,
    githubUrl,
    linkedinUrl,
    cvFile {
      asset-> {
        _ref,
        url
      }
    }
  }`;

  return client.fetch(query);
}

export async function getFooter(): Promise<Footer | null> {
  const query = `*[_type == "footer"][0] {
    _id,
    copyrightName,
    githubUrl,
    linkedinUrl,
    builtWithTech
  }`;

  return client.fetch(query);
}

export async function getProjectsConfig(): Promise<ProjectsConfig | null> {
  const query = `*[_type == "projectsConfig"][0] {
    _id,
    sectionHeading,
    sectionDescription,
    terminalPath,
    categories
  }`;

  return client.fetch(query);
}
