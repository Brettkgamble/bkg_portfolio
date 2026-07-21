import { DocumentIcon, ImageIcon, LinkIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { withAlphabeticalSort } from "../../utils/reference-sort";

const richTextMembers = [
  defineArrayMember({
    name: "block",
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      { title: "H2", value: "h2" },
      { title: "H3", value: "h3" },
      { title: "H4", value: "h4" },
      { title: "H5", value: "h5" },
      { title: "H6", value: "h6" },
      { title: "Inline", value: "inline" },
    ],
    lists: [
      { title: "Numbered", value: "number" },
      { title: "Bullet", value: "bullet" },
    ],
    marks: {
      annotations: [
        {
          name: "customLink",
          type: "object",
          title: "Internal/External Link",
          icon: LinkIcon,
          fields: [
            defineField({
              name: "customLink",
              type: "customUrl",
            }),
          ],
        },
      ],
      decorators: [
        { title: "Strong", value: "strong" },
        { title: "Emphasis", value: "em" },
        { title: "Code", value: "code" },
      ],
    },
  }),
  defineArrayMember({
    name: "image",
    title: "Image",
    type: "image",
    icon: ImageIcon,
    options: {
      hotspot: true,
    },
    fields: [
      defineField({
        name: "caption",
        type: "string",
        title: "Caption Text",
      }),
    ],
  }),
  defineArrayMember({
    name: "certificate",
    title: "Certificate",
    type: "object",
    icon: DocumentIcon,
    fields: [
      defineField({
        name: "certificate",
        type: "reference",
        description: "Certificate to insert into the article",
        to: [{ type: "certificate" }],
        options: withAlphabeticalSort({ disableNew: true }),
        validation: (Rule) =>
          Rule.required().error("Select a certificate to insert"),
      }),
    ],
    preview: {
      select: {
        title: "certificate->title",
        media: "certificate->image",
      },
      prepare: ({ title, media }) => ({
        title: title || "Certificate",
        subtitle: "Certificate block",
        media,
      }),
    },
  }),
];


export const richText = defineType({
  name: "richText",
  type: "array",
  of: richTextMembers,
});

export const memberTypes = richTextMembers.map((member) => member.name);

type Type = NonNullable<(typeof memberTypes)[number]>;

export const customRichText = (
  type: Type[],
  options?: { name?: string; title?: string; group?: string },
) => {
  const { name } = options ?? {};
  const customMembers = richTextMembers.filter(
    (member) => member.name && type.includes(member.name),
  );
  return defineField({
    ...options,
    name: name ?? "richText",
    type: "array",
    of: customMembers,
  });
};
