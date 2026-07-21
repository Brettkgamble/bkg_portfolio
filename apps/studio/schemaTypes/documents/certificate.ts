import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { withAlphabeticalSort } from "../../utils/reference-sort";

export const certificate = defineType({
  name: "certificate",
  title: "Certificate",
  type: "document",
  icon: DocumentTextIcon,
  description:
    "A credential artifact (image and/or public verification URL) that can be attached to education, blogs, or inserted in rich text.",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: 'e.g. "AWS Solutions Architect – Associate"',
      validation: (Rule) => Rule.required().error("Certificate title is required"),
    }),
    defineField({
      name: "image",
      type: "image",
      description: "Scan or photo of the certificate",
      options: { hotspot: true },
    }),
    defineField({
      name: "verificationUrl",
      title: "Verification URL",
      type: "url",
      description: "Public legitimacy or badge URL for this credential",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["https", "http"],
        }),
    }),
    defineField({
      name: "issuingOrganization",
      title: "Issuing organization",
      description:
        "Organization that issued this certificate (may differ from the education delivering organization)",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "organization" }],
          options: withAlphabeticalSort({ disableNew: true }),
        }),
      ],
      validation: (Rule) => Rule.max(1).error("Select at most one issuing organization"),
    }),
    defineField({
      name: "credentialId",
      title: "Credential ID",
      type: "string",
      description: "ID shown on the certificate, if any",
    }),
    defineField({
      name: "issuedDate",
      title: "Issued date",
      type: "date",
    }),
  ],
  validation: (Rule) =>
    Rule.custom((doc) => {
      const hasImage = Boolean(
        (doc as { image?: { asset?: unknown } } | undefined)?.image?.asset,
      );
      const hasUrl = Boolean(
        (doc as { verificationUrl?: string } | undefined)?.verificationUrl,
      );
      if (!hasImage && !hasUrl) {
        return "Add a certificate image or a verification URL";
      }
      return true;
    }),
  preview: {
    select: {
      title: "title",
      media: "image",
      issuer: "issuingOrganization.0->title",
      credentialId: "credentialId",
    },
    prepare: ({ title, media, issuer, credentialId }) => ({
      title: title || "Untitled certificate",
      media,
      subtitle: [issuer, credentialId].filter(Boolean).join(" · ") || undefined,
    }),
  },
});
