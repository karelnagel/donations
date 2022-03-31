import Head from "next/head";
import React from "react";

export function CustomHead({ name, description, url, image }: { name?: string; description?: string; url?: string; image?: string }) {
  return (
    <Head>
      {name && <title>{name}</title>}
      {description && <meta name="description" content={description} />}

      {name && <meta name="og:title" content={name} />}
      {url && <meta name="og:url" content={url} />}
      {description && <meta name="og:description" content={description} />}
      {image && <meta name="og:image" content={image} />}

      {image && <meta name="twitter:card" content="summary_large_image" />}
      {name && <meta name="twitter:title" content={name} />}
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
    </Head>
  );
}
