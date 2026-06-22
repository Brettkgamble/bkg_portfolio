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
      description: "The full name of the person who wrote the content",
      validation: (Rule) => Rule.required().error("Author name is required"),
    }),
    defineField({
          name: "Author",
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
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'reference', to: {type: 'skillBlock'}}]
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
