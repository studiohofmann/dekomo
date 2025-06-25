import { PortableText } from "@portabletext/react";

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p className="mb-4">{children}</p>,
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mb-2">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    // Changed from list-inside to list-outside with proper margins
    bullet: ({ children }: any) => (
      <ul className="list-disc list-outside mb-4 space-y-2 ml-6">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-outside mb-4 space-y-2 ml-6">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="mb-2">{children}</li>,
    number: ({ children }: any) => <li className="mb-2">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-gray-100 px-1 rounded">{children}</code>
    ),
  },
};

export default function PortableTextRenderer({ value }: { value: any }) {
  return (
    <PortableText value={value ?? []} components={portableTextComponents} />
  );
}
