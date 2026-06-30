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
          name: 'description',
          title: 'Description',
          type: 'array',
          of: [{ type: 'reference', to: {type: 'skillBlock'}}]
        },
    ]
})