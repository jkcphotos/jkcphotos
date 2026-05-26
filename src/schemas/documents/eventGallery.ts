import { defineField, defineType } from "sanity";

export const eventGallery = defineType({
  name: "eventGallery",
  title: "Event Gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Example: Festival Coverage, Concert Coverage, Kansas City Live!"
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Example: Kansas City, MO"
    }),
    defineField({
      name: "eventDate",
      title: "Event Date",
      type: "date"
    }),
    defineField({
      name: "yearLabel",
      title: "Year Label",
      type: "string",
      description: "Example: 2025. Use this if you don't want to show the exact date."
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "galleryImage" }],
      validation: (Rule) => Rule.min(6)
    }),
    defineField({
      name: "isFeatured",
      title: "Show Near Top",
      type: "boolean",
      initialValue: false
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first on the Events page."
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
      subtitle: "subtitle",
      media: "coverImage"
    }
  }
});
