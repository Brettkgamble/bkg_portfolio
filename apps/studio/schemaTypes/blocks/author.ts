import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

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
      description: "The full name of the person who wrote the content",
      validation: (Rule) => Rule.required().error("Author name is required"),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      description:
        "A photo of the author that will appear next to their articles",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'array',
      of: [{ type: 'reference', to: {type: 'bioBlock'}}]
    }),
    defineField({
      name: 'cv',
      title: 'Resume',
      type: 'array',
      of: [{ type: 'reference', to: {type: 'resume'}}]
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
