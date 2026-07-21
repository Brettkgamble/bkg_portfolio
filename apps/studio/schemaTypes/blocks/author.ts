import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { withAlphabeticalSort } from "../../utils/reference-sort";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      description: "Full name",
      validation: (Rule) => Rule.required().error("Author name is required"),
    }),
    defineField({
      name: "position",
      type: "string",
      title: "Position",
      description: "Current position",
      validation: (Rule) => Rule.required().error("Position is required"),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Bio Portratit",
      description:
        "A photo of the author that will appear next to their articles",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'introduction',
      title: 'Bio',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'bioBlock' },
          options: withAlphabeticalSort({}, "name"),
        },
      ],
    }),
    defineField({
      name: 'cv',
      title: 'Resume',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'resume' },
          options: withAlphabeticalSort({}, "name"),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      position: "position",
      media: "image",
      bio: "bio",
    },
    prepare: ({ title, position, media, bio }) => {
      // Create a playful subtitle with emojis
      const positionInfo = position ? `💼 ${position}` : "🎭 Mystery Writer";

      return {
        title: `${title || "Unnamed Author"}`,
        subtitle: `${positionInfo}`,
        media,
      };
    },
  },
});
