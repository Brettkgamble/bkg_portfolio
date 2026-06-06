import {mediaAssetSource} from "sanity-plugin-media";
import { defineField, defineType } from "sanity";

export const skillBlock = defineType({
    type: 'document',
    name: 'skillBlock',
    title: 'Skill Block',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'Some frontends will require a slug to be set to be able to show the category',
            options: {
                source: 'name',
                maxLength: 96
            }
        },
         {
          name: 'description',
          title: 'Description',
          type: 'array',
          of: [{ type: 'reference', to: {type: 'skillBlock'}}]
        },
        {
          name: 'image',
          title: 'Image',
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
              }
            },
            {
              type: 'url',
              name: 'attribution_url',
              title: 'Attribution Url',
              description: 'Link to the creator for copyright attribution',
              validation: Rule => Rule.uri({
                scheme: ['http', 'https', 'mailto', 'tel']
              })
            }
          ],
          options: {
            sources: [mediaAssetSource],
            hotspot: true,
          }
      } ,
    ]
})