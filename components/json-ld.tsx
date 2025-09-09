// components/json-ld.tsx
type Props = { data: Record<string, unknown> | Record<string, unknown>[] };

export default function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be a raw string inside the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
