import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Mahab Rizwan - AI & Web Development Insights",
  description: "Deep dives into AI agents, web development, and the future of software engineering. Real experiences from building in the trenches.",
  openGraph: {
    title: "Blog | Mahab Rizwan",
    description: "Deep dives into AI agents, web development, and the future of software engineering.",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
