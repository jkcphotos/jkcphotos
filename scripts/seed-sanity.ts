/**
 * Seed Sanity with all images and documents from the jkc_site/ legacy folder.
 * Run: npm run seed
 *
 * Requires SANITY_WRITE_TOKEN in .env (never committed).
 * Idempotent: uses deterministic _id values so re-running updates rather than duplicates.
 */

import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import { createClient } from "@sanity/client";

dotenv.config();

const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.SANITY_STUDIO_DATASET || process.env.PUBLIC_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_WRITE_TOKEN;

if (!PROJECT_ID) {
  console.error("❌  SANITY_STUDIO_PROJECT_ID not set in .env");
  process.exit(1);
}
if (!TOKEN) {
  console.error("❌  SANITY_WRITE_TOKEN not set in .env");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const LEGACY = path.resolve(process.cwd(), "jkc_site", "assets");

// ─── helpers ────────────────────────────────────────────────────────────────

function imageFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
    .sort()
    .map((f) => path.join(dir, f));
}

async function uploadImage(
  filePath: string,
  label: string
): Promise<{ _type: "reference"; _ref: string }> {
  console.log(`  ↑ ${label}`);
  const stream = fs.createReadStream(filePath);
  const filename = path.basename(filePath);
  const asset = await client.assets.upload("image", stream, { filename });
  return { _type: "reference", _ref: asset._id };
}

function makeImageWithAlt(
  ref: { _type: "reference"; _ref: string },
  alt: string
) {
  return {
    _type: "imageWithAlt",
    asset: ref,
    alt,
  };
}

function makeGalleryImage(
  ref: { _type: "reference"; _ref: string },
  alt: string,
  sortOrder: number,
  role: "normal" | "featured" | "wide" | "portrait" = "normal"
) {
  return {
    _type: "galleryImage",
    _key: `img-${sortOrder}-${ref._ref.slice(-8)}`,
    image: makeImageWithAlt(ref, alt),
    displayRole: role,
    sortOrder,
    hideFromGallery: false,
  };
}

// ─── event metadata ──────────────────────────────────────────────────────────

const EVENT_META: Record<
  string,
  {
    title: string;
    subtitle: string;
    location: string;
    yearLabel: string;
    description: string;
    sortOrder: number;
    sourceDir?: string;
  }
> = {
  "kelce-jam": {
    title: "Kelce Jam",
    subtitle: "Festival Coverage",
    location: "Kansas City, MO",
    yearLabel: "2025",
    description:
      "Full-event coverage focused on headliners, crowd energy, stage production, atmosphere, and social-ready moments.",
    sortOrder: 1,
  },
  "shaqs-fun-house": {
    title: "Shaq's Fun House",
    subtitle: "Event + Concert Coverage",
    location: "Kansas City, MO",
    yearLabel: "2025",
    description:
      "Event gallery focused on celebrity-driven party energy, crowd reactions, stage moments, lighting, and atmosphere.",
    sortOrder: 2,
  },
  "big-12-fan-fest-dj-khaled-shaq-dj-diesel": {
    title: "Big 12 Fan Fest ft. DJ Khaled + Shaq / DJ Diesel",
    subtitle: "ft. DJ Khaled + Shaq / DJ Diesel",
    location: "Kansas City, MO",
    yearLabel: "2025",
    description:
      "Full-event fan fest coverage featuring celebrity performance moments, crowd energy, sponsor-friendly atmosphere, and production scale.",
    sortOrder: 3,
    sourceDir: "big-12-fan-fest-dj-khaled-dj-diesel",
  },
  "two-friends-kansas-city-live": {
    title: "Two Friends – Kansas City Live",
    subtitle: "Kansas City Live!",
    location: "Kansas City, MO",
    yearLabel: "2025",
    description:
      "Coverage focused on high-energy production, crowd reaction, stage scale, and fast-turnaround moments for social and marketing use.",
    sortOrder: 4,
  },
  "tacos-and-tequila-festival": {
    title: "Tacos and Tequila Festival",
    subtitle: "Festival Coverage",
    location: "Kansas City, MO",
    yearLabel: "2025",
    description:
      "Festival coverage showing artist moments, crowd atmosphere, venue energy, production details, and brand-friendly event storytelling.",
    sortOrder: 5,
  },
  "wiz-khalifa-day": {
    title: "Wiz Khalifa Day",
    subtitle: "Concert Coverage",
    location: "Kansas City, MO",
    yearLabel: "2025",
    description:
      "Performance coverage centered on headliner presence, crowd response, production scale, and polished images for promotion.",
    sortOrder: 6,
  },
};

// ─── seed events ─────────────────────────────────────────────────────────────

async function seedEvents() {
  const eventSlugs = Object.keys(EVENT_META);

  for (const slug of eventSlugs) {
    const meta = EVENT_META[slug];
    const dir = path.join(LEGACY, "events", meta.sourceDir || slug);
    const files = imageFiles(dir);

    if (files.length === 0) {
      console.log(`⚠️  No images found for event: ${slug} — skipping`);
      continue;
    }

    console.log(`\n📸 Seeding event: ${meta.title} (${files.length} images)`);

    // Find cover: prefer file named "cover.*", then first image
    const coverFile =
      files.find((f) => /^cover\./i.test(path.basename(f))) || files[0];
    const galleryFiles = files.filter((f) => f !== coverFile);

    const coverRef = await uploadImage(coverFile, `cover → ${slug}`);

    const galleryItems = [];
    for (let i = 0; i < galleryFiles.length; i++) {
      const ref = await uploadImage(galleryFiles[i], `gallery[${i + 1}] → ${slug}`);
      const basename = path.basename(galleryFiles[i], path.extname(galleryFiles[i]));
      galleryItems.push(makeGalleryImage(ref, `${meta.title} — ${basename}`, i + 1));
    }

    const docId = `eventGallery-${slug}`;
    const doc = {
      _id: docId,
      _type: "eventGallery",
      title: meta.title,
      slug: { _type: "slug", current: slug },
      subtitle: meta.subtitle,
      location: meta.location,
      yearLabel: meta.yearLabel,
      shortDescription: meta.description,
      coverImage: makeImageWithAlt(coverRef, `${meta.title} cover`),
      gallery: galleryItems,
      isFeatured: meta.sortOrder <= 3,
      sortOrder: meta.sortOrder,
    };

    await client.createOrReplace(doc);
    console.log(`  ✅ ${meta.title}`);
  }
}

// ─── seed homepage ────────────────────────────────────────────────────────────

async function seedHomepage() {
  console.log("\n🏠 Seeding homepage...");

  const featuredDir = path.join(LEGACY, "portfolio", "squarespace", "featured");
  const headlinersDir = path.join(LEGACY, "portfolio", "squarespace", "headliners");
  const experienceDir = path.join(LEGACY, "portfolio", "squarespace", "experience");
  const heroFile = path.join(LEGACY, "hero.webp");

  const featuredFiles = imageFiles(featuredDir);
  const headlinersFiles = imageFiles(headlinersDir);
  const experienceFiles = imageFiles(experienceDir);

  // Hero image — use hero.webp if present, otherwise first featured image
  let heroRef: { _type: "reference"; _ref: string };
  if (fs.existsSync(heroFile)) {
    heroRef = await uploadImage(heroFile, "hero.webp");
  } else if (featuredFiles.length > 0) {
    heroRef = await uploadImage(featuredFiles[0], "hero (first featured)");
  } else {
    console.log("  ⚠️  No hero image found — skipping heroImage field");
  }

  // Featured work grid
  const featuredWork = [];
  for (let i = 0; i < featuredFiles.length; i++) {
    const ref = await uploadImage(featuredFiles[i], `featured[${i + 1}]`);
    const basename = path.basename(featuredFiles[i], path.extname(featuredFiles[i]));
    const role: "normal" | "featured" | "wide" | "portrait" =
      i === 0 ? "featured" : i % 4 === 3 ? "wide" : "normal";
    featuredWork.push(makeGalleryImage(ref, `Featured work — ${basename}`, i + 1, role));
  }

  // Headliners
  const headlinersImages = [];
  for (let i = 0; i < headlinersFiles.length; i++) {
    const ref = await uploadImage(headlinersFiles[i], `headliners[${i + 1}]`);
    const basename = path.basename(headlinersFiles[i], path.extname(headlinersFiles[i]));
    headlinersImages.push(makeGalleryImage(ref, `Headliner — ${basename}`, i + 1));
  }

  // Experience
  const experienceImages = [];
  for (let i = 0; i < experienceFiles.length; i++) {
    const ref = await uploadImage(experienceFiles[i], `experience[${i + 1}]`);
    const basename = path.basename(experienceFiles[i], path.extname(experienceFiles[i]));
    experienceImages.push(makeGalleryImage(ref, `Experience — ${basename}`, i + 1));
  }

  const doc: Record<string, unknown> & { _id: string; _type: "homepage" } = {
    _id: "homepage",
    _type: "homepage",
    headline: "Show the scale. Capture the moment.",
    subheadline:
      "For venues, promoters, and artists who need crowd energy, stage moments, and clean deliverables fast.",
    featuredWork,
    headlinersBanner: makeImageWithAlt(
      headlinersImages[0]?.image?.asset || featuredWork[0]?.image?.asset,
      "Headliners banner"
    ),
    headlinersImages,
    experienceBanner: makeImageWithAlt(
      experienceImages[0]?.image?.asset || featuredWork[0]?.image?.asset,
      "Experience banner"
    ),
    experienceImages,
    services: [
      {
        _key: "service-event",
        title: "Event Coverage",
        bullets: [
          "Concerts, festivals, and fan events",
          "Full-event documentation from doors-open to final encore",
          "Social-ready selects and polished gallery delivery",
        ],
      },
      {
        _key: "service-brand",
        title: "Brand + Venue",
        bullets: [
          "Venue walkthroughs and sponsor activations",
          "Brand moments captured cleanly and consistently",
          "Fast delivery for marketing and recap use",
        ],
      },
      {
        _key: "service-portraits",
        title: "Portraits",
        bullets: [
          "Artist press shots and DJ promos",
          "Creative lifestyle work for posters and profiles",
          "Simple setups with striking results",
        ],
      },
    ],
    contactHeadline: "Ready to book?",
    contactSubhead:
      "Reach out to discuss your event, venue, or portrait project.",
    proofItems: [
      { _key: "proof-1", value: "24-48h", label: "Fast turnaround" },
      { _key: "proof-2", value: "Social", label: "Ready files" },
      { _key: "proof-3", value: "KC + Travel", label: "Event coverage" },
    ],
  };

  if (heroRef!) {
    doc.heroImage = makeImageWithAlt(heroRef, "JKC Photos hero");
  }

  await client.createOrReplace(doc);
  console.log("  ✅ Homepage");
}

// ─── seed portfolio pages ─────────────────────────────────────────────────────

async function seedPortfolioPage(
  slug: "portraits" | "nightlife",
  meta: { title: string; lede: string; expandedHeadline: string; expandedDescription: string }
) {
  console.log(`\n🖼️  Seeding portfolio page: ${slug}...`);

  const dir = path.join(LEGACY, "portfolio", "imported", slug);
  const files = imageFiles(dir);

  if (files.length === 0) {
    console.log(`  ⚠️  No images found in ${dir} — skipping`);
    return;
  }

  // First 6 as featured grid, rest as expanded gallery
  const featuredFiles = files.slice(0, 6);
  const galleryFiles = files.slice(6);

  const featuredImages = [];
  for (let i = 0; i < featuredFiles.length; i++) {
    const ref = await uploadImage(featuredFiles[i], `${slug} featured[${i + 1}]`);
    const basename = path.basename(featuredFiles[i], path.extname(featuredFiles[i]));
    featuredImages.push(makeGalleryImage(ref, `${meta.title} — ${basename}`, i + 1));
  }

  const gallery = [];
  for (let i = 0; i < galleryFiles.length; i++) {
    const ref = await uploadImage(galleryFiles[i], `${slug} gallery[${i + 1}]`);
    const basename = path.basename(galleryFiles[i], path.extname(galleryFiles[i]));
    gallery.push(makeGalleryImage(ref, `${meta.title} — ${basename}`, i + 1));
  }

  // Use first featured image as banner
  const bannerRef = await uploadImage(featuredFiles[0], `${slug} banner`);

  const doc = {
    _id: `portfolioPage-${slug}`,
    _type: "portfolioPage",
    title: meta.title,
    slug: { _type: "slug", current: slug },
    lede: meta.lede,
    bannerImage: makeImageWithAlt(bannerRef, `${meta.title} banner`),
    featuredImages,
    expandedHeadline: meta.expandedHeadline,
    expandedDescription: meta.expandedDescription,
    gallery,
  };

  await client.createOrReplace(doc);
  console.log(`  ✅ ${meta.title}`);
}

// ─── seed site settings ───────────────────────────────────────────────────────

async function seedSiteSettings() {
  console.log("\n⚙️  Seeding site settings...");

  const doc = {
    _id: "siteSettings",
    _type: "siteSettings",
    siteTitle: "JKC Photos",
    tagline: "Concert and event photographer based in Kansas City.",
    email: "hello@jkcphotos.com",
    instagramUrl: "https://www.instagram.com/jkcphotos",
    aboutLede:
      "Concert and event photographer based in Kansas City. Documenting live music, festivals, and brand moments with an eye for energy and scale.",
  };

  await client.createOrReplace(doc);
  console.log("  ✅ Site settings");
}

// ─── main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🚀 Seeding Sanity project: ${PROJECT_ID} / ${DATASET}\n`);

  await seedSiteSettings();
  await seedEvents();
  await seedHomepage();
  await seedPortfolioPage("portraits", {
    title: "Portraits",
    lede:
      "Artist portraits, press shots, and creative lifestyle work. Simple setups, striking results.",
    expandedHeadline: "Portrait Gallery",
    expandedDescription:
      "Extended portrait and headshot work for artists, DJs, and creative professionals.",
  });
  await seedPortfolioPage("nightlife", {
    title: "Nightlife",
    lede:
      "Club nights, DJ sets, and late-night energy. The vibe, the crowd, the moment.",
    expandedHeadline: "Nightlife Gallery",
    expandedDescription:
      "Extended nightlife coverage — venues, events, and atmosphere from across Kansas City.",
  });

  console.log("\n✨ Seed complete!\n");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
