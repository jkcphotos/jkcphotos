import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "imageWithAlt"
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Show the scale. Capture the moment."
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
      rows: 2,
      initialValue:
        "For venues, promoters, and artists who need crowd energy, stage moments, and clean deliverables fast."
    }),
    defineField({
      name: "proofItems",
      title: "Proof Points",
      type: "array",
      description: "Small stat tiles under the hero — keep to 3 items.",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "string" },
            { name: "label", title: "Label", type: "string" }
          ],
          preview: { select: { title: "value", subtitle: "label" } }
        }
      ]
    }),
    defineField({
      name: "featuredWork",
      title: "Featured Work Grid",
      type: "array",
      of: [{ type: "galleryImage" }],
      description: "Use displayRole = Featured for the main fire/smoke headline photo."
    }),
    defineField({
      name: "headlinersBanner",
      title: "Headliners Banner Image",
      type: "imageWithAlt"
    }),
    defineField({
      name: "headlinersImages",
      title: "Headliners Gallery Images",
      type: "array",
      of: [{ type: "galleryImage" }]
    }),
    defineField({
      name: "experienceBanner",
      title: "Experience Banner Image",
      type: "imageWithAlt"
    }),
    defineField({
      name: "experienceImages",
      title: "Experience Gallery Images",
      type: "array",
      of: [{ type: "galleryImage" }]
    }),
    defineField({
      name: "servicesTagline",
      title: "Services Tagline",
      type: "text",
      rows: 2,
      initialValue:
        "Pick what you need, or tell me about the show and I'll recommend the right package."
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            {
              name: "bullets",
              title: "Bullet Points",
              type: "array",
              of: [{ type: "string" }]
            }
          ],
          preview: { select: { title: "title" } }
        }
      ]
    }),
    defineField({
      name: "contactHeadline",
      title: "Contact Section Headline",
      type: "string",
      initialValue: "Let's Work Together"
    }),
    defineField({
      name: "contactSubhead",
      title: "Contact Section Subhead",
      type: "text",
      rows: 2,
      initialValue:
        "Tell me the date, venue, and what you need. I'll reply with availability and a simple next step."
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields"
    })
  ],
  preview: {
    select: { title: "headline" }
  }
});
