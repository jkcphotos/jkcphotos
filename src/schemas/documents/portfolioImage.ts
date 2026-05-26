import { defineField, defineType } from "sanity";

export const portfolioImage = defineType({
  name: "portfolioImage",
  title: "Portfolio Image",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string"
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Portraits", value: "portraits" },
          { title: "Nightlife", value: "nightlife" },
          { title: "Headliners", value: "headliners" },
          { title: "Experience", value: "experience" },
          { title: "Featured", value: "featured" }
        ]
      }
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" }
    })
  ],
  preview: {
    select: {
      title: "title",
      media: "image"
    }
  }
});
