import { defineField, defineType } from "sanity";

export const skillProficiency = defineType({
    name: 'skillProficiency',
    title: 'Skill Proficiency',
    type: 'document',
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