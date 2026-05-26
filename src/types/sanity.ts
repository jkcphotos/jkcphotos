import type { SanityImageValue, GalleryImageValue } from "../lib/sanityImage";

export type ProofItem = {
  value?: string;
  label?: string;
};

export type ServiceCard = {
  title?: string;
  bullets?: string[];
};

export type HomepageDoc = {
  headline?: string;
  subheadline?: string;
  proofItems?: ProofItem[];
  contactHeadline?: string;
  contactSubhead?: string;
  servicesTagline?: string;
  services?: ServiceCard[];
  heroImage?: SanityImageValue;
  featuredWork?: GalleryImageValue[];
  headlinersBanner?: SanityImageValue;
  headlinersImages?: GalleryImageValue[];
  experienceBanner?: SanityImageValue;
  experienceImages?: GalleryImageValue[];
};

export type SiteSettingsDoc = {
  siteTitle?: string;
  tagline?: string;
  email?: string;
  instagramUrl?: string;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  defaultOgImage?: SanityImageValue;
  aboutLede?: string;
  aboutImages?: GalleryImageValue[];
};

export type EventGalleryCard = {
  title: string;
  slug: string;
  subtitle?: string;
  location?: string;
  eventDate?: string;
  yearLabel?: string;
  shortDescription?: string;
  photoCount?: number;
  coverImage?: SanityImageValue;
};

export type EventGalleryDoc = EventGalleryCard & {
  seoTitle?: string;
  seoDescription?: string;
  gallery?: GalleryImageValue[];
};

export type PortfolioPageDoc = {
  title: string;
  slug: string;
  lede?: string;
  expandedHeadline?: string;
  expandedDescription?: string;
  seoTitle?: string;
  seoDescription?: string;
  bannerImage?: SanityImageValue;
  featuredImages?: GalleryImageValue[];
  gallery?: GalleryImageValue[];
};
