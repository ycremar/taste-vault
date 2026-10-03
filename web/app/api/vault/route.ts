import { database, latest } from "@/lib/vault-db";
import { effectiveRecords, type VaultRecord } from "@/lib/vault-types";
export const dynamic = "force-dynamic";
// Owner-private Sites dispatch authenticates all requests. Do not make this app public.
function fail(message:string,status=400) { return Response.json({error:message},{status}); }
export async function GET(request:Request) {
 try {
  const id=new URL(request.url).searchParams.get('history');
  if(id) {
   const rows=await database().prepare('SELECT payload, revision, saved_at FROM vault_events WHERE id=? ORDER BY revision DESC').bind(id).all<{payload:string;revision:number;saved_at:string}>();
   return Response.json({history:rows.results.map(r=>({...JSON.parse(r.payload),revision:r.revision,savedAt:r.saved_at}))},{headers:{'Cache-Control':'no-store'}});
  }
  return Response.json({records:effectiveRecords(await latest())},{headers:{'Cache-Control':'no-store'}});
 } catch(error) { console.error('vault read failed',error);return fail('Could not load your library. Please try again.',503); }
}
export async function POST(request:Request) {
 // A custom header prevents cross-origin form submissions; no CORS is enabled.
 if(request.headers.get('x-taste-vault')!=='1') return fail('Request not accepted',403);
 const origin=request.headers.get('origin');
 if(origin && origin!==new URL(request.url).origin) return fail('Request origin not accepted',403);
 try {
  const raw=await request.text();if(raw.length>150000) return fail('This record is too large.');
  const input=JSON.parse(raw);const records:VaultRecord[]=await latest();
  const id=input.id || crypto.randomUUID();
  if(typeof id!=='string'||!/^[a-zA-Z0-9_-]{1,100}$/.test(id)) return fail('Invalid record ID');
  const previous=records.find(r=>r.id===id);
  if((input.revision??0)!==(previous?.revision??0)) return fail('A newer version exists. Reload before saving.',409);
  if(!['selection','interpretation','rubric'].includes(input.kind)) return fail('Choose a record type.');
  if(previous && previous.kind!==input.kind) return fail('Record type cannot change.');
  const r:VaultRecord={id,revision:(previous?.revision??0)+1,kind:input.kind,title:'',domain:'',content:'',source:'',image:'',reaction:'',notes:'',scope:'',evidence:[],counterevidence:[],status:''};
  for(const key of ['title','domain','content','source','image','reaction','notes','scope','status'] as const) {
   if(typeof input[key]!=='string'||input[key].length>30000) return fail('Invalid '+key);
   r[key]=input[key].trim();
  }
  if(!r.title||!r.domain||!r.content) return fail('Title, domain and content are required.');
  for(const key of ['source','image'] as const) if(r[key]) {
   let url;try {url=new URL(r[key]);} catch {return fail('Use a full http or https URL.');}
   if(!['http:','https:'].includes(url.protocol)) return fail('Unsupported URL.');
  }
  if(!['unreviewed','favorite','like','dislike','mixed','uncertain'].includes(r.reaction)) return fail('Invalid reaction');
  if(!['tentative','proposed','approved','retired'].includes(r.status)) return fail('Invalid status');
  for(const key of ['evidence','counterevidence'] as const) {
   if(!Array.isArray(input[key])||input[key].length>100||input[key].some((v:unknown)=>typeof v!=='string'))return fail('Invalid evidence');
   r[key]=Array.from(new Set(input[key])) as string[];
   if(r[key].some(v=>v===id||!records.some(x=>x.id===v&&x.kind==='selection')))return fail('Evidence must refer to saved selections.');
  }
  if(r.kind==='rubric' && r.status==='approved') {
   if(input.confirmApproval!==true) return fail('Explicit approval is required.');
   if(!r.scope||!r.evidence.length) return fail('An approved rule needs scope and supporting selections.');
   r.evidenceVersions=Object.fromEntries([...r.evidence,...r.counterevidence].map(id=>[id,records.find(x=>x.id===id)!.revision]));
  }
  await database().prepare('INSERT INTO vault_events (id,revision,payload,saved_at) VALUES (?,?,?,?)').bind(id,r.revision,JSON.stringify(r),new Date().toISOString()).run();
  return Response.json({record:r},{status:201});
 } catch(error) {
  if(error instanceof SyntaxError)return fail('Invalid JSON.');
  if(String(error).includes('UNIQUE constraint'))return fail('A newer version exists. Reload before saving.',409);
  console.error('vault save failed',error);return fail('Could not save. Your edits are still here; try again.',503);
 }
}
