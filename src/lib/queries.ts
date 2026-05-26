export const SITE_SETTINGS_QUERY = `
*[_type == "siteSettings"][0]{
  siteTitle,
  tagline,
  email,
  instagramUrl,
  defaultSeoTitle,
  defaultSeoDescription,
  defaultOgImage{
    ...,
    alt,
    asset->{ url, metadata { dimensions, lqip } }
  },
  aboutLede,
  aboutImages[]{
    displayRole,
    sortOrder,
    image{
      ...,
      alt,
      asset->{ url, metadata { dimensions, lqip } }
    }
  }
}
`;

export const HOMEPAGE_QUERY = `
*[_type == "homepage"][0]{
  headline,
  subheadline,
  proofItems[]{
    value,
    label
  },
  contactHeadline,
  contactSubhead,
  servicesTagline,
  services[]{
    title,
    bullets
  },
  heroImage{
    ...,
    alt,
    asset->{
      url,
      metadata { dimensions, lqip }
    }
  },
  featuredWork[]{
    displayRole,
    sortOrder,
    image{
      ...,
      alt,
      asset->{
        url,
        metadata { dimensions, lqip }
      }
    }
  },
  headlinersBanner{
    ...,
    alt,
    asset->{ url, metadata { dimensions, lqip } }
  },
  headlinersImages[]{
    displayRole,
    sortOrder,
    image{
      ...,
      alt,
      asset->{ url, metadata { dimensions, lqip } }
    }
  },
  experienceBanner{
    ...,
    alt,
    asset->{ url, metadata { dimensions, lqip } }
  },
  experienceImages[]{
    displayRole,
    sortOrder,
    image{
      ...,
      alt,
      asset->{ url, metadata { dimensions, lqip } }
    }
  },
  seo
}
`;

export const EVENTS_INDEX_QUERY = `
*[_type == "eventGallery"] | order(sortOrder asc, eventDate desc) {
  title,
  "slug": slug.current,
  subtitle,
  location,
  eventDate,
  yearLabel,
  shortDescription,
  "photoCount": count(gallery[hideFromGallery != true]),
  coverImage{
    ...,
    alt,
    asset->{ url, metadata { dimensions, lqip } }
  }
}
`;

export const EVENT_SLUGS_QUERY = `
*[_type == "eventGallery" && defined(slug.current)]{
  "slug": slug.current
}
`;

export const EVENT_BY_SLUG_QUERY = `
*[_type == "eventGallery" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  subtitle,
  location,
  eventDate,
  yearLabel,
  shortDescription,
  seoTitle,
  seoDescription,
  coverImage{
    ...,
    alt,
    asset->{ url, metadata { dimensions, lqip } }
  },
  gallery[hideFromGallery != true] | order(sortOrder asc) {
    displayRole,
    sortOrder,
    image{
      ...,
      alt,
      caption,
      asset->{ url, metadata { dimensions, lqip } }
    }
  }
}
`;

export const PORTFOLIO_PAGE_QUERY = `
*[_type == "portfolioPage" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  lede,
  expandedHeadline,
  expandedDescription,
  seoTitle,
  seoDescription,
  bannerImage{
    ...,
    alt,
    asset->{ url, metadata { dimensions, lqip } }
  },
  featuredImages[]{
    displayRole,
    sortOrder,
    image{
      ...,
      alt,
      asset->{ url, metadata { dimensions, lqip } }
    }
  },
  gallery[hideFromGallery != true] | order(sortOrder asc) {
    displayRole,
    sortOrder,
    image{
      ...,
      alt,
      asset->{ url, metadata { dimensions, lqip } }
    }
  }
}
`;
