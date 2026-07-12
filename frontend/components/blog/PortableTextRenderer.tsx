"use client";

import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const components = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6 bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90 mt-8 mb-3">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 dark:text-white/70 text-lg leading-relaxed mb-6">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-3 mb-6 text-gray-700 dark:text-white/70 text-lg ml-4">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-3 mb-6 text-gray-700 dark:text-white/70 text-lg ml-4">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    underline: ({ children }: any) => <u className="underline">{children}</u>,
    code: ({ children }: any) => (
      <code className="px-2 py-1 rounded-md font-mono text-sm bg-indigo-500/10 text-indigo-700 dark:bg-violet-500/20 dark:text-violet-300">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-violet-600 dark:text-violet-400 hover:text-cyan-600 dark:hover:text-cyan-400 underline transition-colors duration-200"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      return (
        <div className="my-10 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg">
          <img
            src={urlFor(value).width(1200).url()}
            alt={value.alt || "Blog image"}
            className="w-full h-auto"
          />
          {value.caption && (
            <p className="text-center text-sm text-gray-500 dark:text-white/50 mt-3 px-4 pb-4">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    code: ({ value }: any) => {
      const language = value?.language || "javascript";
      return (
        <div className="my-8 rounded-2xl overflow-hidden shadow-lg" style={{
          background: "#0d1117",
          border: "1px solid rgba(255,255,255,0.08)"
        }}>
          {value?.filename && (
            <div className="px-6 py-3 border-b" style={{
              background: "#0d1117",
              borderColor: "rgba(255,255,255,0.08)"
            }}>
              <span className="text-sm font-mono" style={{ color: "rgba(255,255,255,0.6)" }}>
                {value.filename}
              </span>
            </div>
          )}
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              padding: "1.5rem",
              fontSize: "0.95rem",
              background: "#0d1117",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            {value?.code || ""}
          </SyntaxHighlighter>
        </div>
      );
    },
  },
};

interface PortableTextRendererProps {
  content: any[];
}

export default function PortableTextRenderer({ content }: PortableTextRendererProps) {
  return <PortableText value={content} components={components} />;
}
