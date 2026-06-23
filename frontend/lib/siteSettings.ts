import { client } from "./sanity";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

export interface SiteSettings {
  logoUrl: string;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const query = `*[_type == "siteSettings"][0] {
    "logoUrl": logo.asset->url
  }`;

  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}
