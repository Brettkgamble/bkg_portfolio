import { WrenchIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { withAlphabeticalSort } from "../../utils/reference-sort";

export const skillsList = defineType({
  name: "skillsList",
  title: "Skill Group",
  type: "document",
  icon: WrenchIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        'The name of this group of skills, e.g. "Languages" or "Frameworks"',
      validation: (Rule) => Rule.required().error("A title is required"),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Optional short description shown above the group's skills",
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: { type: "skills" },
          options: withAlphabeticalSort(),
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(1).unique().error("Add at least one skill"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      skills: "skills",
    },
    prepare: ({ title, skills }) => {
      const count = Array.isArray(skills) ? skills.length : 0;
      return {
        title: title || "Untitled group",
        subtitle: `${count} skill${count === 1 ? "" : "s"}`,
      };
    },
  },
});
