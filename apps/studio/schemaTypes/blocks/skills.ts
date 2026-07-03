import { defineField, defineType } from "sanity";
import { WrenchIcon } from "@sanity/icons";

export const skills = defineType({
    name: 'skills',
    title: 'Skill',
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
        name: 'proficiency',
        title: 'Proficiency',
        description: 'The proficiency level for this skill',
        type: 'string',
        options: {
          list: [
            { title: 'Beginner', value: 'beginner' },
            { title: 'Intermediate', value: 'intermediate' },
            { title: 'Advanced', value: 'advanced' },
            { title: 'Expert', value: 'expert' },
          ],
          layout: 'radio',
        },
      })
    ]
})