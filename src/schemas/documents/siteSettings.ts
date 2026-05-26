import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      initialValue: "JKC Photos"
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "Concert + Event Photography"
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      initialValue: "hello@jkcphotos.com"
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url"
    }),
    defineField({
      name: "defaultSeoTitle",
      title: "Default SEO Title",
      type: "string"
    }),
    defineField({
      name: "defaultSeoDescription",
      title: "Default SEO Description",
      type: "text",
      rows: 2
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default Open Graph Image",
      type: "imageWithAlt"
    }),
    defineField({
      name: "aboutLede",
      title: "About Page Lede",
      type: "text",
      rows: 3,
      initialValue:
        "Concert and event photographer based in Kansas City. Documenting live music, festivals, and brand moments with an eye for energy and scale."
    }),
    defineField({
      name: "aboutImages",
      title: "About Page Images",
      type: "array",
      of: [{ type: "galleryImage" }]
    })
  ],
  preview: {
    select: {
      title: "siteTitle"
    }
  }
});
