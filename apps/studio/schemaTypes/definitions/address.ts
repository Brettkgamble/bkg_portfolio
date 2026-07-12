import { defineField, defineType } from "sanity";

export const address = defineType({
  name: "address",
  title: "Address",
  type: "object",
  fields: [
    defineField({
      name: "address1",
      title: "Address line 1",
      type: "string",
    }),
    defineField({
      name: "address2",
      title: "Address line 2",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
    }),
    defineField({
      name: "state",
      title: "State / Province",
      type: "string",
    }),
    defineField({
      name: "postCode",
      title: "Post code",
      type: "string",
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
    }),
  ],
});
