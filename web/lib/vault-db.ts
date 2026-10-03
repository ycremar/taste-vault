import { env } from "cloudflare:workers";
export function database() {
 if (!env.DB) throw new Error("Storage unavailable");
 return env.DB;
}
export async function latest() {
 const result = await database().prepare(`SELECT e.payload, e.revision, e.saved_at FROM vault_events e
 WHERE e.revision = (SELECT MAX(v.revision) FROM vault_events v WHERE v.id=e.id)
 ORDER BY e.saved_at DESC`).all<{payload:string;revision:number;saved_at:string}>();
 return result.results.map(row => ({...JSON.parse(row.payload), revision:row.revision, savedAt:row.saved_at}));
}
