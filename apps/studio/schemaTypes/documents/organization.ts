import { CaseIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const organization = defineType({
  name: "organization",
  title: "Organization",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Name",
      type: "string",
      description: "The organization name",
      validation: (Rule) => Rule.required().error("Organization name is required"),
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["https", "http"],
        }),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "addresses",
      title: "Addresses",
      type: "array",
      of: [defineArrayMember({ type: "address" })],
    }),
    defineField({
      name: "contact",
      title: "Contact",
      type: "object",
      fields: [
        defineField({ name: "contactName", title: "Contact name", type: "string" }),
        defineField({ name: "phone", title: "Phone", type: "string" }),
        defineField({ name: "email", title: "Email", type: "string" }),
      ],
    }),
    defineField({
      name: "parentOrganizations",
      title: "Parent organizations",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "organization" }] })],
    }),
    defineField({
      name: "linkedInUrl",
      title: "LinkedIn URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["https", "http"],
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "logo",
    },
    prepare: ({ title, media }) => ({
      title: title || "Untitled organization",
      media,
    }),
  },
});
