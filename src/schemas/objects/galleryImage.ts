import { defineField, defineType } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "displayRole",
      title: "Display Role",
      type: "string",
      options: {
        list: [
          { title: "Normal", value: "normal" },
          { title: "Featured / Larger", value: "featured" },
          { title: "Wide", value: "wide" },
          { title: "Portrait", value: "portrait" }
        ],
        layout: "radio"
      },
      initialValue: "normal"
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first."
    }),
    defineField({
      name: "hideFromGallery",
      title: "Hide From Gallery",
      type: "boolean",
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: "image.alt",
      media: "image"
    }
  }
});
