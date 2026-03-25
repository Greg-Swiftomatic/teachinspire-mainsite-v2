/**
 * PageMeta — React 19 native metadata hoisting.
 * Renders <title>, <meta>, <link> tags that React 19 automatically
 * moves to <head>. No external library required.
 */

const BASE_URL = 'https://teachinspire.me';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

interface PageMetaProps {
  title: string;
  description: string;
  /** Absolute path e.g. "/formation" — will be prefixed with BASE_URL */
  path: string;
  /** Overrides the OG/Twitter image. Defaults to /og-image.png */
  image?: string;
  /** noindex pages (e.g. legal) — defaults to false */
  noindex?: boolean;
}

export function PageMeta({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  noindex = false,
}: PageMetaProps) {
  const canonicalUrl = `${BASE_URL}${path}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="TeachInspire" />

      {/* Twitter / X Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
