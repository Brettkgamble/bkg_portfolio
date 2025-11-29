import { defineField, defineType } from "sanity";

export const bioBlock = defineType({
  name: "bioBlock",
  type: "document",
  title: 'BioBlock',
  fields: [
      {
          name: 'name',
          title: 'unique name',
          type: 'string'
      },
    {
      name:'bio',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative Text',
              description: `Some of your visitors cannot see images, be they blind, color-blind, low-sighted; 
              alternative text is of great help for those people that can rely on it to have a good idea of 
              what\'s on your page.`,
              options: {
                hotspot: true
              },

            },
            {
              type: 'string',
              name: 'caption',
              title: 'Caption',
              description: `Image Caption`,
            }
          ]
        }
      ]
    }]
})