import { BookIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { withAlphabeticalSort } from "../../utils/reference-sort";

export const educationBlock = defineType({
  name: "educationBlock",
  title: "Education",
  type: "object",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      title: "Section title",
      type: "string",
      description: 'Heading shown in the sidebar, e.g. "Education"',
      initialValue: "Education",
    }),
    defineField({
      name: "educationGroups",
      title: "Education groups",
      description:
        "Groups of education entries (e.g. Formal Education, Online Learning)",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "educationGroup" }],
          options: withAlphabeticalSort({ disableNew: true }),
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("Add at least one education group"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      groups: "educationGroups",
    },
    prepare: ({ title, groups }) => {
      const count = Array.isArray(groups) ? groups.length : 0;
      return {
        title: title || "Education",
        subtitle: `${count} group${count === 1 ? "" : "s"}`,
      };
    },
  },
});
