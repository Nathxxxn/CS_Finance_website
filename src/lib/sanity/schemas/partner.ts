import { defineField, defineType } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partenaire",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "tier",
      title: "Niveau",
      type: "string",
      options: {
        list: [
          { title: "Gold", value: "gold" },
          { title: "Silver", value: "silver" },
          { title: "Bronze", value: "bronze" },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "url",
      title: "Site web",
      type: "url",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        defineField({ name: "fr", title: "Français", type: "text", rows: 3 }),
        defineField({ name: "en", title: "English", type: "text", rows: 3 }),
      ],
    }),
  ],
  orderings: [
    { title: "Niveau", name: "tierAsc", by: [{ field: "tier", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "tier", media: "logo" },
  },
});
