import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import { stegaClean } from "next-sanity";

import {
  credentialColor,
  credentialLabel,
  EducationModal,
  type EducationEntry,
} from "../modals/educationModal";

type EducationGroup = {
  _id?: string;
  title?: string | null;
  description?: string | null;
  entries?: EducationEntry[] | null;
};

type EducationListProps = {
  title?: string | null;
  educationGroups?: EducationGroup[] | null;
};

const CREDENTIAL_ORDER = [
  "formal_degree",
  "graduate_certificate",
  "professional_certificate",
  "online_learning",
  "bootcamp",
] as const;

function isTopLevelEntry(entry: EducationEntry) {
  return !entry.parentEducation?.[0]?._id;
}

function getCourseworkForParent(
  entries: EducationEntry[],
  parentId?: string,
) {
  if (!parentId) return [];
  return entries.filter(
    (entry) => entry.parentEducation?.[0]?._id === parentId,
  );
}

function buildCredentialSections(entries: EducationEntry[]) {
  const topLevelEntries = entries.filter(isTopLevelEntry);

  const sections = [
    ...CREDENTIAL_ORDER.map((type) => ({
      key: type,
      label: credentialLabel(type),
      entries: topLevelEntries.filter(
        (entry) => stegaClean(entry?.credentialType) === type,
      ),
    })),
    {
      key: "other",
      label: "Other",
      entries: topLevelEntries.filter((entry) => {
        const type = stegaClean(entry?.credentialType);
        return (
          !type || !(CREDENTIAL_ORDER as readonly string[]).includes(type)
        );
      }),
    },
  ];

  return sections.filter((section) => section.entries.length > 0);
}

function EducationEntryList({
  entry,
  allEntries,
  entryIndex,
}: {
  entry: EducationEntry;
  allEntries: EducationEntry[];
  entryIndex: number;
}) {
  const coursework = getCourseworkForParent(allEntries, entry._id);

  return (
    <EducationModal
      key={`${entry?._id ?? "entry"}-${entryIndex}`}
      entry={entry}
      coursework={coursework}
    />
  );
}

export function EducationList({ title, educationGroups }: EducationListProps) {
  const groups = (educationGroups ?? []).filter(
    (group) => (group?.entries?.length ?? 0) > 0,
  );

  if (groups.length === 0) return null;

  const sectionTitle = title ?? "Education";
  const firstValue = groups[0]?._id ?? "group-0";

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12 lg:gap-16">
      <aside className="flex flex-col items-center text-center md:items-start md:text-left">
        <h1 className="font-roboto-600 text-2xl font-bold uppercase tracking-widest lg:text-3xl">
          {sectionTitle}
        </h1>
        <hr className="mt-2 h-1 w-full border-0 bg-foreground/20 dark:bg-blue-700" />
      </aside>

      <Accordion type="multiple" defaultValue={[firstValue]} className="w-full md:mt-12">
        {groups.map((group, index) => {
          const value = group?._id ?? `group-${index}`;
          const allEntries = group?.entries ?? [];
          const count = allEntries.filter(isTopLevelEntry).length;
          const sections = buildCredentialSections(allEntries);

          return (
            <AccordionItem
              key={value}
              value={value}
              className="border-white/10"
            >
              <AccordionTrigger className="text-base font-semibold no-underline hover:no-underline">
                <span className="flex items-center gap-3">
                  {group?.title ?? sectionTitle}
                  <span className="rounded-full border border-white/15 px-2 py-0.5 text-xs font-normal text-muted-foreground">
                    {count}
                  </span>
                </span>
              </AccordionTrigger>

              <AccordionContent>
                {group?.description && (
                  <p className="mb-4 text-base leading-7 text-foreground/80">
                    {group.description}
                  </p>
                )}

                <div className="flex flex-col gap-4">
                  {sections.map((section) => (
                    <div key={section.key}>
                      <h4
                        className="mb-2 text-xs font-semibold uppercase tracking-wide"
                        style={{ color: credentialColor(section.key) }}
                      >
                        {section.label}
                      </h4>
                      <div className="flex flex-col gap-2">
                        {section.entries.map((entry, entryIndex) => (
                          <EducationEntryList
                            key={`${entry?._id ?? "entry"}-${entryIndex}`}
                            entry={entry}
                            allEntries={allEntries}
                            entryIndex={entryIndex}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="mt-6 h-px w-full border-0 bg-foreground/20 dark:bg-blue-700" />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
