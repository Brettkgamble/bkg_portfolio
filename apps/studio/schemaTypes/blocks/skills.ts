import { defineField, defineType } from "sanity";

export const skills = defineType({
    type: 'document',
    name: 'skills',
    title: 'Skills',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
         {
          name: 'skillProficiency',
          title: 'Skill Proficiency',
          type: 'array',
          of: [{ type: 'reference', to: {type: 'skillProficiency'}}]
        },
    ]
})