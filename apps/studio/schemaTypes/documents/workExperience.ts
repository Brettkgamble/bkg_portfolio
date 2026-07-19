import { CaseIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const ROLE_STATUS = [
  { title: "Current", value: "current" },
  { title: "Completed", value: "completed" },
] as const;

export const workExperience = defineType({
  name: "workExperience",
  title: "Work Experience",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        "Optional Studio label for this entry (e.g. employer shorthand). Role job titles on the site come from each Role below.",
    }),
    defineField({
      name: "organization",
      title: "Employer",
      description: "The company or organization for this employment",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "organization" }],
          options: { disableNew: true },
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(1).max(1).error("Select one employer organization"),
    }),
    defineField({
      name: "roles",
      title: "Roles",
      description:
        "Positions held at this employer (drag to reorder). Each role has its own job title shown on the site.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "workExperienceRole",
          title: "Role",
          fields: [
            defineField({
              name: "title",
              title: "Job title",
              type: "string",
              description:
                'e.g. "Information Technology Reporting Analysts" — shown on the site under the tenure dates',
              validation: (Rule) =>
                Rule.required().error("Job title is required"),
            }),
            defineField({
              name: "status",
              title: "Status",
              type: "string",
              options: {
                list: [...ROLE_STATUS],
                layout: "radio",
              },
              initialValue: "completed",
              validation: (Rule) =>
                Rule.required().error("Role status is required"),
            }),
            defineField({
              name: "startDate",
              title: "Start date",
              type: "date",
              description: "Start month and year",
              validation: (Rule) =>
                Rule.required().error("Start date is required"),
            }),
            defineField({
              name: "endDate",
              title: "End date",
              type: "date",
              description: "End month and year",
              hidden: ({ parent }) => parent?.status === "current",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const status = (context.parent as { status?: string })?.status;
                  if (status === "completed" && !value) {
                    return "End date is required for completed roles";
                  }
                  return true;
                }),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "richText",
              description: "Short summary of this role",
            }),
          ],
          preview: {
            select: {
              title: "title",
              status: "status",
              startDate: "startDate",
              endDate: "endDate",
            },
            prepare: ({ title, status, startDate, endDate }) => ({
              title: title || "Untitled role",
              subtitle: [
                startDate,
                status === "current" ? "Present" : endDate,
              ]
                .filter(Boolean)
                .join(" – "),
            }),
          },
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("Add at least one role"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      organization: "organization.0->title",
      media: "organization.0->logo",
      roleTitle: "roles.0.title",
      startDate: "roles.0.startDate",
      endDate: "roles.0.endDate",
      status: "roles.0.status",
    },
    prepare: ({
      title,
      organization,
      media,
      roleTitle,
      startDate,
      endDate,
      status,
    }) => ({
      title: title || organization || roleTitle || "Untitled work experience",
      media,
      subtitle: [
        roleTitle && title ? roleTitle : organization,
        [startDate, status === "current" ? "Present" : endDate]
          .filter(Boolean)
          .join(" – "),
      ]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
