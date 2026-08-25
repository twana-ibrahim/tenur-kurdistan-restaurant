/**
 * Server-rendered structured data. Sits in the HTML on first response, so a
 * crawler never has to run JavaScript to find it.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from local content, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
