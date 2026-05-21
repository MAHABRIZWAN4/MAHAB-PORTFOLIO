import { client } from "./sanity";

export interface Contact {
  _id: string;
  heading: string;
  subheading: string;
  description: string;
  email: string;
  location: string;
  responseTime: string;
  githubUrl: string;
  linkedinUrl: string;
  availabilityText: string;
  formRecipientEmail: string;
}

export async function getContact(): Promise<Contact | null> {
  const query = `*[_type == "contact"][0] {
    _id,
    heading,
    subheading,
    description,
    email,
    location,
    responseTime,
    githubUrl,
    linkedinUrl,
    availabilityText,
    formRecipientEmail
  }`;

  return client.fetch(query);
}
