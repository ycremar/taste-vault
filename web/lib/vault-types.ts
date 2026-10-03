export type RecordKind = "selection" | "interpretation" | "rubric";
export type VaultRecord = {
 id: string; revision: number; kind: RecordKind; title: string; domain: string;
 content: string; source: string; image: string; reaction: string; notes: string;
 scope: string; evidence: string[]; counterevidence: string[]; status: string;
 evidenceVersions?: Record<string, number>; savedAt?: string; needsReview?: boolean;
};
export function effectiveRecords(records: VaultRecord[]): VaultRecord[] {
 const byId = new Map(records.map(r => [r.id, r]));
 return records.map(r => ({...r, needsReview: r.kind === 'rubric' && r.status === 'approved' &&
  [...r.evidence, ...r.counterevidence].some(id => !byId.has(id) || r.evidenceVersions?.[id] !== byId.get(id)?.revision)}));
}
