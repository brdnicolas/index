// Structured data for search engines (schema.org, JSON-LD). Rendered on the server, invisible on the page.
export const JsonLd = ({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) => (
  <script
    type="application/ld+json"
    // `<` escaped so a string can never close the script tag
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
  />
)
