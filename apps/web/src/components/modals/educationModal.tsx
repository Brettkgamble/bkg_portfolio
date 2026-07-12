"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { stegaClean } from "next-sanity";

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
    <span
      className="text-xs font-semibold uppercase tracking-wide"
      style={{ color: credentialColor(credentialType) }}
    >
      {credentialLabel(credentialType)}
    </span>
  );
}

export function EducationModal({
  entry,
  compact = false,
}: {
  entry: EducationEntry;
  compact?: boolean;
}) {
  if (!entry?.title) return null;

  const org = entry.organization?.[0];
  const period = formatEducationPeriod(entry);
  const isInProgress = stegaClean(entry.status) === "in_progress";
  const isCoursework = stegaClean(entry.entryType) === "coursework";

  return (
    <Dialog>
      <DialogTrigger
        className={
          compact
            ? "flex w-full items-start gap-2 rounded-md border border-white/10 bg-white/5 p-2 text-left outline-none transition-colors duration-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40"
            : "flex w-full items-start gap-3 rounded-lg border border-white/20 bg-white/5 p-3 text-left outline-none transition-colors duration-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40"
        }
        title="Click for more details"
      >
        {org?.logo && !compact && (
          <SanityImage
            asset={org.logo}
            alt={org.title ?? "Organization logo"}
            width={40}
            height={40}
            className="mt-0.5 h-10 w-10 shrink-0 rounded object-contain bg-white p-1"
          />
        )}
        <span className="min-w-0 flex-1">
          <span
            className={
              compact
                ? "block text-xs font-medium text-white"
                : "block text-sm font-semibold text-white"
            }
          >
            {entry.title}
          </span>
          {!compact && org?.title && (
            <span className="mt-0.5 block text-xs text-white/70">
              {org.title}
            </span>
          )}
          <span className="mt-2 flex flex-wrap items-center gap-2">
            {period && (
              <span className="text-xs text-white/60">{period}</span>
            )}
            {!compact && entry.credentialType && (
              <CredentialLabel credentialType={entry.credentialType} />
            )}
            {isInProgress && (
              <span className="text-xs font-medium text-sky-300">
                In progress
              </span>
            )}
            {isCoursework && (
              <span className="text-xs text-white/50">Module</span>
            )}
          </span>
        </span>
      </DialogTrigger>

      <DialogContent className="max-w-[40rem] border border-blue-700/60 bg-zinc-950 text-white shadow-lg [&>button]:text-white/70 [&>button]:hover:text-white">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-white">
            {entry.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Details for {entry.title}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-start gap-3">
          {org?.logo && (
            <SanityImage
              asset={org.logo}
              alt={org.title ?? "Organization logo"}
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded object-contain bg-white p-1"
            />
          )}
          <div className="min-w-0">
            {org?.title && (
              <p className="text-base font-semibold text-white">{org.title}</p>
            )}
            {entry.fieldOfStudy && (
              <p className="text-sm text-white/80">{entry.fieldOfStudy}</p>
            )}
            {period && <p className="mt-1 text-sm text-white/70">{period}</p>}
          </div>
        </div>

        {entry.parentEducation?.[0]?.title && (
          <p className="text-sm text-white/70">
            Part of: {entry.parentEducation[0].title}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          {entry.credentialType && (
            <div className="flex items-center gap-2">
              <span className="text-base leading-7 text-white/80">Type:</span>
              <CredentialLabel credentialType={entry.credentialType} />
            </div>
          )}
          {isInProgress && entry.expectedCompletionYear && (
            <span className="text-sm text-sky-300">
              Expected completion: {entry.expectedCompletionYear}
            </span>
          )}
        </div>

        {entry.description && (
          <RichText
            richText={entry.description}
            className="prose-invert max-w-none prose-p:text-white/80 prose-headings:text-white prose-li:text-white/80 prose-strong:text-white"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
