# Folder architecture and ownership

A vault belongs to one person and one domain. A domain is a namespace, not a claim that preferences never transfer. Ask before transferring a rule. Use a new vault for another person.

| Runtime path | Owner / purpose | Update rule |
| --- | --- | --- |
| `profile.json` | Person's domain, audience and goal | Explicit user instructions |
| `rounds/R001.json` | Candidate content, context and provenance | Immutable after import |
| `feedback/F001.json` | Raw response plus explicit mapping to candidates | Immutable; correction adds `supersedes` |
| `hypotheses.json` | Assistant's interpretations and next tests | Revise with evidence and contradictions |
| `rubric.json` | Proposed, approved or retired scoped rules | Approval needs a linked explicit feedback event |
| `assets/` | Optional locally authorized reference media | Preserve provenance; don't redistribute blindly |
| `decisions/` | Goals, evidence, assumptions, rationale and outcomes | Append outcomes without rewriting the original decision |
| `exports/` | Task-specific context packs | Rebuild from source records |

The repo includes templates; `init` creates this runtime structure under ignored `vaults/`. Positive/negative examples are indexed through feedback rather than duplicated into folders. A candidate may be liked for one aspect and disliked for another; a single folder label would lose that distinction.

## State transitions

Discovered → inspected → presented → feedback recorded → hypothesis proposed → discriminating comparison → proposed rubric → explicit user approval → application → new feedback.

Discovery cannot stand in for inspection. Silence leaves a candidate unreviewed. A new vote can contradict an older vote; retain both. A correction is a new feedback event with `supersedes`; compilation and export exclude superseded feedback as active evidence. If an approved rule's evidence is superseded, revise or retire that rule before exporting.

## Host versus local runner

The host assistant retrieves/inspects candidates, asks questions, interprets replies and drafts rubrics. The human chooses and approves. The local runner validates relationships and exports context. It makes no network/model calls and cannot verify that an assistant truthfully inspected a source or that an approval was genuinely human. Review the raw quote and provenance.

`context` exports HARNESS.md plus validated profile, rules, hypotheses, raw rounds and feedback inside an explicit untrusted-data boundary. It is a complete small-vault export, not a retrieval engine. For large vaults, curate a scoped vault/export rather than silently truncating evidence. All content, including user quotes, remains available in the source files.

The information flow is encode (examples → scoped hypotheses/rubrics), decode (context → task output), calibrate (new feedback → revisions). These are workflow metaphors, not descriptions of neural representations.
