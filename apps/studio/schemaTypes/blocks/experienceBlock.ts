import { CaseIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const experienceBlock = defineType({
  name: "experienceBlock",
  title: "Work Experience",
  type: "object",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Section title",
      type: "string",
      description: 'Heading shown above the list, e.g. "Work Experience"',
      initialValue: "Work Experience",
    }),
    defineField({
      name: "entries",
      title: "Work experience",
      description:
        "Employers to display in this section (drag to reorder)",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "workExperience" }],
          options: { disableNew: true },
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("Add at least one work experience entry"),
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
        title: title || "Work Experience",
        subtitle: `${count} employer${count === 1 ? "" : "s"}`,
      };
    },
  },
});
