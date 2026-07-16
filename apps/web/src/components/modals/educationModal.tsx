"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { stegaClean } from "next-sanity";

import {
  CertificateLinks,
  type CertificateItem,
} from "../certificate-links";
import { RichText } from "../richtext";
import { SanityImage } from "../sanity-image";

export type EducationEntry = {
  _id?: string;
  title?: string | null;
  entryType?: string | null;
  credentialType?: string | null;
  fieldOfStudy?: string | null;
  status?: string | null;
  startYear?: number | null;
  completionYear?: number | null;
  expectedCompletionYear?: number | null;
  description?: unknown;
  parentEducation?: Array<{
    _id?: string;
    title?: string | null;
  }> | null;
  organization?: Array<{
    _id?: string;
    title?: string | null;
    website?: string | null;
    linkedInUrl?: string | null;
    logo?: unknown;
  }> | null;
  accreditationOrganization?: Array<{
    _id?: string;
    title?: string | null;
    website?: string | null;
    linkedInUrl?: string | null;
    logo?: unknown;
  }> | null;
  relatedBlogPosts?: Array<{
    _id?: string;
    title?: string | null;
    slug?: string | null;
  }> | null;
  certificates?: CertificateItem[] | null;
};


const CREDENTIAL_COLOR: Record<string, string> = {
  formal_degree: "#38bdf8",
  graduate_certificate: "#34d399",
  professional_certificate: "#fbbf24",
  online_learning: "#c084fc",
  bootcamp: "#fb7185",
};

const CREDENTIAL_LABEL: Record<string, string> = {
  formal_degree: "Formal degree",
  graduate_certificate: "Graduate certificate",
  professional_certificate: "Professional certificate",
  online_learning: "Online learning",
  bootcamp: "Bootcamp",
};

const DEFAULT_COLOR = "#94a3b8";

export function credentialColor(credentialType?: string | null) {
  const key = stegaClean(credentialType);
  if (!key) return DEFAULT_COLOR;
  return CREDENTIAL_COLOR[key] ?? DEFAULT_COLOR;
}

export function credentialLabel(credentialType?: string | null) {
  const key = stegaClean(credentialType);
  if (!key) return "Other";
  return CREDENTIAL_LABEL[key] ?? key;
}

export function formatEducationPeriod(entry: EducationEntry) {
  const start = entry.startYear;
  if (!start) return null;

  const status = stegaClean(entry.status);
  if (status === "in_progress" && entry.expectedCompletionYear) {
    return `${start} – est. ${entry.expectedCompletionYear}`;
  }
  if (entry.completionYear) {
    return `${start} – ${entry.completionYear}`;
  }
  return `${start}`;
}

function CredentialLabel({ credentialType }: { credentialType?: string | null }) {
  const clean = stegaClean(credentialType);
  if (!clean) return null;
  return (
    <span className="text-xs font-semibold uppercase tracking-wide text-gray-900">
      {credentialLabel(credentialType)}
    </span>
  );
}

function CourseworkBadge({ title }: { title: string }) {
  return (
    <span
      className="inline-block rounded-lg border border-gray-300 px-2 py-1 text-sm text-blue-800 transition-colors duration-150 hover:bg-blue-100"
      title={title}
    >
      {title}
    </span>
  );
}

export function EducationModal({
  entry,
  coursework = [],
  compact = false,
}: {
  entry: EducationEntry;
  coursework?: EducationEntry[];
  compact?: boolean;
}) {
  if (!entry?.title) return null;

  const org = entry.organization?.[0];
  const accreditor = entry.accreditationOrganization?.[0];
  const period = formatEducationPeriod(entry);
  const isInProgress = stegaClean(entry.status) === "in_progress";
  const isCoursework = stegaClean(entry.entryType) === "coursework";

  if (compact) {
    return (
      <Dialog>
        <DialogTrigger
          className="flex w-full items-start gap-2 rounded-md border border-white/10 bg-white/5 p-2 text-left outline-none transition-colors duration-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40"
          title="Click for more details"
        >
          <span className="block text-xs font-medium text-white">{entry.title}</span>
        </DialogTrigger>
        <EducationModalContent
          entry={entry}
          org={org}
          accreditor={accreditor}
          period={period}
          isInProgress={isInProgress}
          isCoursework={isCoursework}
          coursework={coursework}
        />
      </Dialog>
    );
  }

  return (
    <Dialog>
      <span className="block w-full">
        <DialogTrigger
          className="flex w-full items-start rounded-lg px-2 py-1 text-left text-base font-bold text-white outline-none transition-colors duration-150 ease-in-out hover:bg-violet-300/25 focus-visible:ring-2 focus-visible:ring-white/40"
          title="Click for more info"
        >
          <GraduationCap className="mr-4 mt-1 h-5 w-5 shrink-0 text-white/80" />
          <span>{entry.title}</span>
        </DialogTrigger>
      </span>
      {period && (
        <span className="block w-full text-sm text-white/70 ml-12">{period}</span>
      )}

      <EducationModalContent
        entry={entry}
        org={org}
        accreditor={accreditor}
        period={period}
        isInProgress={isInProgress}
        isCoursework={isCoursework}
        coursework={coursework}
      />
    </Dialog>
  );
}

function EducationModalContent({
  entry,
  org,
  accreditor,
  period,
  isInProgress,
  isCoursework,
  coursework,
}: {
  entry: EducationEntry;
  org?: NonNullable<EducationEntry["organization"]>[number];
  accreditor?: NonNullable<EducationEntry["accreditationOrganization"]>[number];
  period: string | null;
  isInProgress: boolean;
  isCoursework: boolean;
  coursework: EducationEntry[];
}) {
  return (
    <DialogContent className="max-w-[40rem] border border-gray-200 bg-white text-gray-900 shadow-lg [&>button]:text-gray-500 [&>button]:hover:text-gray-900">
      <DialogTitle className="sr-only">{entry.title}</DialogTitle>
      <DialogDescription className="sr-only">
        Details for {entry.title}
      </DialogDescription>

      <div className="text-center">
        {org?.logo && (
          <div className="relative mx-auto h-[100px] w-full max-w-[160px] pt-2">
            <SanityImage
              asset={org.logo}
              alt={org.title ?? "Organization logo"}
              fill
              sizes="160px"
              className="object-contain object-center"
            />
          </div>
        )}

        {org?.title && (
          <h3 className="pt-4 text-xl font-medium text-gray-900">{org.title}</h3>
        )}
        {accreditor?.title && (
          <p className="pt-1 text-sm text-gray-600">
            Accredited by {accreditor.title}
          </p>
        )}
        <h3 className="pt-2 text-base font-medium text-gray-900">{entry.title}</h3>
        {entry.fieldOfStudy && (
          <p className="pt-1 text-sm text-gray-700">{entry.fieldOfStudy}</p>
        )}
        {period && (
          <h5 className="pt-2 text-sm font-medium text-gray-600">{period}</h5>
        )}

        {entry.parentEducation?.[0]?.title && (
          <p className="pt-2 text-sm text-gray-600">
            Part of: {entry.parentEducation[0].title}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
          {entry.credentialType && (
            <CredentialLabel credentialType={entry.credentialType} />
          )}
          {isInProgress && (
            <span className="text-xs font-medium text-sky-600">In progress</span>
          )}
          {isCoursework && (
            <span className="text-xs text-gray-500">Module</span>
          )}
        </div>

        {coursework.length > 0 && (
          <div className="w-full flex-none py-4">
            <div className="flex flex-wrap justify-center gap-2">
              {coursework.map((module, index) => (
                <CourseworkBadge
                  key={`${module._id ?? "module"}-${index}`}
                  title={module.title ?? "Untitled module"}
                />
              ))}
            </div>
          </div>
        )}

        {entry.description && (
          <div className="py-4 text-left">
            <RichText
              richText={entry.description}
              className="max-w-none prose-p:text-gray-700 prose-headings:text-gray-900 prose-li:text-gray-700 prose-strong:text-gray-900"
            />
          </div>
        )}

        {(entry.relatedBlogPosts?.length ?? 0) > 0 && (
          <div className="py-4 text-left">
            <h4 className="mb-2 text-sm font-semibold text-gray-900">
              Related posts
            </h4>
            <ul className="space-y-2">
              {entry.relatedBlogPosts?.map((post, index) => {
                const slug =
                  typeof post.slug === "object"
                    ? (post.slug as { current?: string })?.current ?? null
                    : (post.slug ?? null);

                return (
                  <li key={post._id ?? `post-${index}`}>
                    <Link
                      href={slug ?? "#"}
                      className="text-sm text-blue-700 transition-colors hover:text-blue-900 hover:underline"
                    >
                      {post.title ?? "Untitled post"}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {(entry.certificates?.length ?? 0) > 0 && (
          <div className="py-4 text-left">
            <h4 className="mb-2 text-sm font-semibold text-gray-900">
              Certificates
            </h4>
            <CertificateLinks certificates={entry.certificates} />
          </div>
        )}

        <div className="items-center px-4 py-3">

          <DialogClose className="w-2/5 min-w-[8rem] rounded-md bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm transition-colors hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50">
            Close
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  );
}
