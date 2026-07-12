import { BookIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const educationGroup = defineType({
  name: "educationGroup",
  title: "Education Group",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        'Group name, e.g. "Formal Education" or "Online Learning"',
      validation: (Rule) => Rule.required().error("A title is required"),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Optional introduction shown above the group's entries",
    }),
    defineField({
      name: "entries",
      title: "Education entries",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "higherEducation" }],
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(1).unique().error("Add at least one education entry"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      entries: "entries",
    },
    prepare: ({ title, entries }) => {
      const count = Array.isArray(entries) ? entries.length : 0;
      return {
        title: title || "Untitled group",
        subtitle: `${count} entr${count === 1 ? "y" : "ies"}`,
      };
    },
  },
});
