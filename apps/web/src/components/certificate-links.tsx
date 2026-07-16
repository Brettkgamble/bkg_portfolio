"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { ExternalLink } from "lucide-react";

import type { SanityImageProps } from "@/types";

import { SanityImage } from "./sanity-image";

export type CertificateItem = {
  _id?: string;
  title?: string | null;
  verificationUrl?: string | null;
  credentialId?: string | null;
  issuedDate?: string | null;
  image?: SanityImageProps | null;
  issuingOrganization?: Array<{
    _id?: string;
    title?: string | null;
  }> | null;
};


export function CertificateLinks({
  certificates,
  compact = false,
}: {
  certificates?: CertificateItem[] | null;
  compact?: boolean;
}) {
  const items = certificates?.filter(Boolean) ?? [];
  if (items.length === 0) return null;

  return (
    <ul className={compact ? "space-y-3" : "space-y-4"}>
      {items.map((certificate, index) => (
        <CertificateLinkItem
          key={certificate._id ?? `certificate-${index}`}
          certificate={certificate}
          compact={compact}
        />
      ))}
    </ul>
  );
}

function CertificateLinkItem({
  certificate,
  compact,
}: {
  certificate: CertificateItem;
  compact: boolean;
}) {
  const title = certificate.title ?? "Certificate";
  const hasImage = Boolean(certificate.image?.asset);

  const verificationUrl = certificate.verificationUrl ?? null;
  const issuer = certificate.issuingOrganization?.[0]?.title;

  return (
    <li
      className={
        compact
          ? "flex flex-col gap-2 border-b border-border/60 pb-3 last:border-b-0 last:pb-0"
          : "flex flex-col gap-2"
      }
    >
      <div>
        <p
          className={
            compact
              ? "text-sm font-medium text-foreground"
              : "text-sm font-semibold text-gray-900"
          }
        >
          {title}
        </p>
        {issuer && (
          <p className="text-xs text-muted-foreground">{issuer}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {hasImage && (
          <Dialog>
            <DialogTrigger className="text-sm font-medium text-blue-700 underline-offset-2 outline-none transition-colors hover:text-blue-900 hover:underline focus-visible:ring-2 focus-visible:ring-blue-400/50">
              View certificate
            </DialogTrigger>
            <DialogContent className="max-w-3xl border border-gray-200 bg-white text-gray-900 shadow-lg [&>button]:text-gray-500 [&>button]:hover:text-gray-900">
              <DialogTitle className="pr-8 text-base font-semibold">
                {title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Certificate image for {title}
              </DialogDescription>
              <div className="relative w-full overflow-hidden rounded-md bg-gray-50">
                <SanityImage
                  asset={certificate.image}
                  alt={title}
                  width={1600}
                  height={1200}
                  className="h-auto w-full object-contain"
                />

              </div>
              <div className="flex justify-end">
                <DialogClose className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50">
                  Close
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {verificationUrl && (
          <a
            href={verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 underline-offset-2 transition-colors hover:text-blue-900 hover:underline"
          >
            Verify
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        )}
      </div>
    </li>
  );
}
