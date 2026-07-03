import { defineField, defineType } from "sanity";
import { WrenchIcon } from "@sanity/icons";

export const skillsList = defineType({
    name: 'skillsList',
    title: 'Skills List',
    type: 'document',
    icon: WrenchIcon,
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string'
      }),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'text'
      }),
      defineField({
        name: 'skills',
        title: 'Skills',
        type: 'array',
        of: [{ type: 'reference', to: {type: 'skills'}}]
        }),
    ],
})