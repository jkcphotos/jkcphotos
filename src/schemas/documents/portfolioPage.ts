import { defineField, defineType } from "sanity";

export const portfolioPage = defineType({
  name: "portfolioPage",
  title: "Portfolio Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 64
      },
      validation: (Rule) => Rule.required(),
      description: "Use `portraits` or `nightlife` to drive the matching public route."
    }),
    defineField({
      name: "lede",
      title: "Intro Copy",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "bannerImage",
      title: "Banner Image",
      type: "imageWithAlt"
    }),
    defineField({
      name: "featuredImages",
      title: "Featured Grid (3-up)",
      type: "array",
      of: [{ type: "galleryImage" }],
      description: "Top featured selection. 3 images typical."
    }),
    defineField({
      name: "expandedHeadline",
      title: "Expanded Gallery Headline",
      type: "string",
      initialValue: "Expanded Gallery"
    }),
    defineField({
      name: "expandedDescription",
      title: "Expanded Gallery Description",
      type: "string"
    }),
    defineField({
      name: "gallery",
      title: "Expanded Gallery Images",
      type: "array",
      of: [{ type: "galleryImage" }]
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string"
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
      media: "bannerImage"
    }
  }
});
