import { defineField, defineType } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image with Alt Text",
  type: "image",
  options: {
    hotspot: true,
    metadata: ["dimensions", "lqip", "palette"] as any
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string"
    }),
    defineField({
      name: "credit",
      title: "Photo Credit",
      type: "string",
      initialValue: "JKC Photos"
    })
  ]
});
