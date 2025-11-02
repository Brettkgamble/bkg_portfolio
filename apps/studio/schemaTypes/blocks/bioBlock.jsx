import { GrSubscript, GrSuperscript } from 'react-icons/gr';
import {
  AiOutlineAlignCenter,
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
  AiOutlineOrderedList

} from 'react-icons/ai';
import { defineField, defineType } from "sanity";


const textAlignCenter = () => (
    <span style={{textAlign: "center"}}>{props.children}</span>
)

const textAlignLeft = () => (
    <span style={{textAlign: "left"}}>{props.children}</span>
)

const textAlignRight = () => (
    <span style={{textAlign: "right"}}>{props.children}</span>
)

const subScript= () => (
    <sup>{props.children}</sup>
)

const superScript= () => (
    <sup>{props.children}</sup>
)

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export const bioBlock = defineType({
  name: "bioBlock",
  type: "document",
  title: 'BioBlock',
  // name: 'bioBlock',
  // type: 'document',
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
          // Styles let you set what your user can mark up blocks with. These
          // correspond with HTML tags, but you can set any title or value
          // you want and decide how you want to deal with it where you want to
          // use your content.
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {
              title: 'Numbered',
              value: 'number',
              icon: <AiOutlineOrderedList/>
            }
          ],
          // Marks let you mark up inline text in the block editor.
          marks: {
            // Decorators usually describe a single property – e.g. a typographic
            // preference or highlighting by editors.
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {
                title: "Superscript",
                value: "sup",
                icon: <GrSuperscript/>,
                component: subScript
              },
              {
                title: "Subscript",
                value: "sub",
                icon: <GrSubscript/>,
                component: superScript
              },
              {
                title: "Text Align Left",
                value: "textAlignLeft",
                icon: <AiOutlineAlignLeft/>,
                component: textAlignLeft,
              },
              {
                title: "Text Align Center",
                value: "textAlignCenter",
                icon: <AiOutlineAlignCenter/>,
                component: textAlignCenter,
              },
              {
                title: "Text Align Right",
                value: "textAlignRight",
                icon: <AiOutlineAlignRight/>,
                component: textAlignRight,
              }
            ],
            // Annotations can be any object structure – e.g. a link or a footnote.
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        },
        // You can add additional types here. Note that you can't use
        // primitive types such as 'string' and 'number' in the same array
        // as a block type.
        // {
        //   type: 'code',
        // },

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