import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Membre de l'équipe",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom complet",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "role",
      title: "Rôle",
      type: "object",
      fields: [
        defineField({ name: "fr", title: "Français", type: "string", validation: (R) => R.required() }),
        defineField({ name: "en", title: "English", type: "string", validation: (R) => R.required() }),
      ],
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "object",
      fields: [
        defineField({ name: "fr", title: "Français", type: "text", rows: 3 }),
        defineField({ name: "en", title: "English", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "linkedin",
      title: "URL LinkedIn",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      validation: (R) => R.required().integer().positive(),
    }),
  ],
  orderings: [{ title: "Ordre", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "role.fr", media: "photo" },
  },
});
