import { UserIcon } from "@sanity/icons";
import { defineField, defineType, defineArrayMember } from "sanity";

export const resume = defineType({
  name: "resume",
  title: "Resume",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      description: "The name of the person whose resume this is",
      validation: (Rule) => Rule.required().error("Name is required"),
    }),
    
    defineField({
          name: "author",
          type: "array",
          title: "Author",
          description: "The person associated with this resume",
          of: [
            defineArrayMember({
              type: "reference",
              to: [
                {
                  type: "author",
                  options: {
                    disableNew: true,
                  },
                },
              ],
              options: {
                disableNew: true,
              },
            }),
          ],
          validation: (Rule) => [
            Rule.required(),
            Rule.max(1),
            Rule.min(1),
            Rule.unique(),
          ],
        }),
        defineField({
          name: 'skillGroups',
          title: 'Skill Groups',
          description:
            'Groups of skills (e.g. Languages, Frameworks, Tools) to display on this resume',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'reference',
              to: [{ type: 'skillsList' }],
              options: { disableNew: true },
            }),
          ],
          validation: (Rule) =>
            Rule.required().min(1).error('Add at least one skill group'),
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
      const bioPreview = bio
        ? `📝 ${bio.substring(0, 20)}${bio.length > 20 ? "..." : ""}`
        : "📝 No bio yet";

      return {
        title: `✍️ ${title || "Unnamed Author"}`,
        subtitle: `${positionInfo} | ${bioPreview}`,
        media,
      };
    },
  },
});
