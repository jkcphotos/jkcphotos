import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "./sanityClient";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export type SanityImageAsset = {
  _id?: string;
  url?: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
      aspectRatio: number;
    };
    lqip?: string;
  };
};

export type SanityImageValue = {
  _type?: "image" | "imageWithAlt";
  asset?: SanityImageAsset | { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
  credit?: string;
  hotspot?: { x: number; y: number; height?: number; width?: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type GalleryImageValue = {
  _key?: string;
  image: SanityImageValue;
  displayRole?: "normal" | "featured" | "wide" | "portrait";
  sortOrder?: number;
  hideFromGallery?: boolean;
};
