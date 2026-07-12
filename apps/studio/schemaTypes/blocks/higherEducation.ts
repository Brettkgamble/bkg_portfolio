import { BookIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const CREDENTIAL_TYPES = [
  { title: "Formal degree", value: "formal_degree" },
  { title: "Graduate certificate", value: "graduate_certificate" },
  { title: "Professional certificate", value: "professional_certificate" },
  { title: "Online learning", value: "online_learning" },
  { title: "Bootcamp", value: "bootcamp" },
] as const;

const STATUS_OPTIONS = [
  { title: "Completed", value: "completed" },
  { title: "In progress", value: "in_progress" },
] as const;

const ENTRY_TYPES = [
  { title: "Program", value: "program" },
  { title: "Coursework / module", value: "coursework" },
] as const;

export const higherEducation = defineType({
  name: "higherEducation",
  title: "Education",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      title: "Program title",
      type: "string",
      description:
        'e.g. "B.Sc. Computer Science" or "AWS Solutions Architect Nanodegree"',
      validation: (Rule) => Rule.required().error("Program title is required"),
    }),
    defineField({
      name: "organization",
      title: "Organization",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "organization" }],
          options: { disableNew: true },
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(1).max(1).error("Select one organization"),
    }),
    defineField({
      name: "credentialType",
      title: "Credential type",
      type: "string",
      options: {
        list: [...CREDENTIAL_TYPES],
        layout: "radio",
      },
      validation: (Rule) => Rule.required().error("Credential type is required"),
    }),
    defineField({
      name: "fieldOfStudy",
      title: "Field of study",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [...STATUS_OPTIONS],
        layout: "radio",
      },
      validation: (Rule) => Rule.required().error("Status is required"),
    }),
    defineField({
      name: "startYear",
      title: "Start year",
      type: "number",
      validation: (Rule) =>
        Rule.required()
          .min(1900)
          .max(2100)
          .error("Enter a valid start year"),
    }),
    defineField({
      name: "completionYear",
      title: "Completion year",
      type: "number",
      hidden: ({ parent }) => parent?.status !== "completed",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const status = (context.parent as { status?: string })?.status;
          if (status === "completed" && !value) {
            return "Completion year is required for completed education";
          }
          if (value && (value < 1900 || value > 2100)) {
            return "Enter a valid year";
          }
          return true;
        }),
    }),
    defineField({
      name: "expectedCompletionYear",
      title: "Expected completion year",
      type: "number",
      hidden: ({ parent }) => parent?.status !== "in_progress",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const status = (context.parent as { status?: string })?.status;
          if (status === "in_progress" && !value) {
            return "Expected completion year is required for in-progress education";
          }
          if (value && (value < 1900 || value > 2100)) {
            return "Enter a valid year";
          }
          return true;
        }),
    }),
    defineField({
      name: "entryType",
      title: "Entry type",
      type: "string",
      description:
        "Use Coursework / module for individual modules completed toward a larger program",
      options: {
        list: [...ENTRY_TYPES],
        layout: "radio",
      },
      initialValue: "program",
      validation: (Rule) => Rule.required().error("Entry type is required"),
    }),
    defineField({
      name: "parentEducation",
      title: "Parent program",
      description:
        "The degree or program this coursework contributes toward",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "higherEducation" }],
          options: { disableNew: true },
        }),
      ],
      hidden: ({ parent }) => parent?.entryType !== "coursework",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const entryType = (context.parent as { entryType?: string })?.entryType;
          if (entryType === "coursework" && (!value || value.length === 0)) {
            return "Select the parent program this coursework belongs to";
          }
          if (entryType === "coursework" && value && value.length > 1) {
            return "Select only one parent program";
          }
          return true;
        }),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "richText",
      description: "Optional details about this program or credential",
    }),
  ],
  preview: {
    select: {
      title: "title",
      status: "status",
      entryType: "entryType",
      credentialType: "credentialType",
      organization: "organization.0->title",
      parentTitle: "parentEducation.0->title",
    },
    prepare: ({ title, status, entryType, credentialType, organization, parentTitle }) => ({
      title: title || "Untitled education",
      subtitle: [
        organization,
        entryType === "coursework" && parentTitle
          ? `Module of ${parentTitle}`
          : null,
        credentialType,
        status,
      ]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
