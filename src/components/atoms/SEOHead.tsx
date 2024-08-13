type SEOHeadPropsType = {
  description: string
  title: string
  previewUrl: string
  url: string
}

export const SEOHead = ({ description, title, previewUrl, url }: SEOHeadPropsType) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Facebook */}
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={previewUrl} />
      <meta property="og:image:alt" content="Nicolas Brouard - Portfolio" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:description" content={description} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@exiosys" />
      <meta name="twitter:creator" content="@exiosys" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={previewUrl} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:domain" content="https://brdnicolas.com/" />
      <meta name="twitter:label1" content="Degree of need" />
      <meta name="twitter:data1" content="100%" />
      <meta name="twitter:label2" content="Should I click ?" />
      <meta name="twitter:data2" content="sure" />

      {/* Images */}
      <link rel="apple-touch-icon" sizes="180x180" href="/seo/180.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/seo/32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/seo/16.png" />
      <link rel="favicon" type="image/png" sizes="16x16" href="/seo/32.png" />
      <link rel="manifest" href="/seo/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#FFFFFF" />
      <meta name="msapplication-TileImage" content="/seo/192.png" />
      <meta name="theme-color" content="#000000" />
    </>
  )
}
