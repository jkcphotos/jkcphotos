import { defineField, defineType } from "sanity";

export const seoFields = defineType({
  name: "seoFields",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO Title",
      type: "string",
      description: "Defaults to the page title if blank."
    }),
    defineField({
      name: "description",
      title: "SEO Description",
      type: "text",
      rows: 2
    }),
    defineField({
      name: "ogImage",
      title: "Social / Open Graph Image",
      type: "imageWithAlt"
    })
  ]
});
