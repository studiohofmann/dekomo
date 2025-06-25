import { PortableText } from "@portabletext/react";

interface PortableTextComponentProps {
  children?: React.ReactNode;
}

const portableTextComponents = {
  block: {
    normal: ({ children }: PortableTextComponentProps) => (
      <p className="mb-4">{children}</p>
    ),
    h1: ({ children }: PortableTextComponentProps) => (
      <h1 className="text-3xl font-bold mb-4">{children}</h1>
    ),
    h2: ({ children }: PortableTextComponentProps) => (
      <h2 className="text-2xl font-bold mb-3">{children}</h2>
    ),
    h3: ({ children }: PortableTextComponentProps) => (
      <h3 className="text-xl font-bold mb-2">{children}</h3>
    ),
    blockquote: ({ children }: PortableTextComponentProps) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: PortableTextComponentProps) => (
      <ul className="list-disc list-outside mb-4 space-y-2 ml-6">{children}</ul>
    ),
    number: ({ children }: PortableTextComponentProps) => (
      <ol className="list-decimal list-outside mb-4 space-y-2 ml-6">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: PortableTextComponentProps) => (
      <li className="mb-2">{children}</li>
    ),
    number: ({ children }: PortableTextComponentProps) => (
      <li className="mb-2">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: PortableTextComponentProps) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: PortableTextComponentProps) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: PortableTextComponentProps) => (
      <code className="bg-gray-100 px-1 rounded">{children}</code>
    ),
  },
};

interface PortableTextRendererProps {
  value: unknown; // Changed from PortableTextBlock[] to unknown
}

export default function PortableTextRenderer({
  value,
}: PortableTextRendererProps) {
  return (
    <PortableText value={value as any} components={portableTextComponents} />
  );
}
