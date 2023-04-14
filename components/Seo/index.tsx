import Head from "next/head";

import defaultImage from "@/assets/images/default.jpg";
import favicon from "@/assets/favicons/favicon.ico";

export const SEO = ({
  page,
  description = "I'm a full-time software engineer and a technical writer. It comes natural to me to make things easy.",
  image = defaultImage.src,
  type = "website",
}: {
  page?: string;
  description?: string;
  image?: string;
  type?: "article" | "website";
}) => {
  const title = !page
    ? "Jeffrey Nwankwo - Software Engineer"
    : `${page} - Jeffrey Nwankwo`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width; initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="jeffrey nwankwo, software engineer, web developer, react, nextjs, expert, high-value"
      />
      <meta name="author" content="Jeffrey Nwankwo" />
      <meta name="robots" content="index, follow" />
      <meta name="color-scheme" content="dark" />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_ROOT_URL} />
      <meta property="og:image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="Jeffrey Nwankwo" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="692" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@JeffreySunny1" />
      <meta name="twitter:creator" content="@JeffreySunny1" />
      <meta name="twitter:image" content={image} />
      <meta
        name="twitter:image:alt"
        content="Jeffrey Nwankwo - Software Engineer"
      />
      <meta name="twitter:description" content="Full-time Software Engineer" />

      <link rel="shortcut icon" href={favicon.src} />
    </Head>
  );
};
