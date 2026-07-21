/**
 * Sanity reference picker sort (requires search.strategy: "groq2024").
 */
export type ReferenceSort = {
  field: string;
  direction: "asc" | "desc";
};

export function alphabeticalSort(field = "title"): ReferenceSort[] {
  return [{ field, direction: "asc" }];
}

/** Merge existing reference options with ascending alphabetical sort. */
export function withAlphabeticalSort<
  T extends Record<string, unknown> | undefined,
>(options?: T, field = "title"): NonNullable<T> & { sort: ReferenceSort[] } {
  return {
    ...(options ?? ({} as T)),
    sort: alphabeticalSort(field),
  } as NonNullable<T> & { sort: ReferenceSort[] };
}

/** Sort string option lists by display title (A–Z). */
export function sortOptionList<T extends { title: string; value: string }>(
  list: readonly T[] | T[],
): T[] {
  return [...list].sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
  );
}
