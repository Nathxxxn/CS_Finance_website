import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Événement",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "object",
      fields: [
        defineField({ name: "fr", title: "Français", type: "string", validation: (R) => R.required() }),
        defineField({ name: "en", title: "English", type: "string", validation: (R) => R.required() }),
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title.fr", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Conférence", value: "conference" },
          { title: "Formation", value: "formation" },
          { title: "Networking", value: "networking" },
          { title: "Autre", value: "autre" },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        defineField({ name: "fr", title: "Français", type: "text", rows: 5, validation: (R) => R.required() }),
        defineField({ name: "en", title: "English", type: "text", rows: 5, validation: (R) => R.required() }),
      ],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "registerUrl",
      title: "Lien d'inscription",
      type: "url",
    }),
  ],
  orderings: [{ title: "Date (récent)", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title.fr", subtitle: "date", media: "image" },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString("fr-FR") : "",
        media,
      };
    },
  },
});
