# Cloud Taste Library

The optional `web/` app is an editable viewing layer for the same evidence → interpretation → rubric loop. The Python harness works independently; the web app requires Node.js and cloud hosting with a database.

## What it does

- Store examples as text with source links and optional remote image previews.
- Filter by domain, search, compare up to three references, and revise reactions.
- Keep every saved revision. Concurrent stale edits receive a conflict instead of silently overwriting a newer version.
- Link interpretations and rules to supporting and contradicting selections.
- Require explicit approval, scope and supporting evidence for an active rule.
- Mark approved rules as needing review after linked evidence changes. Those rules leave the active context export until reapproved.
- Export the current library as JSON, or a scoped Markdown context for an AI session.
- Import a JSON snapshot without overwriting existing IDs. Imported rules require fresh approval. History remains in the original database; snapshot import/export does not migrate historical revisions.

The app does not call a model, invent explanations, browse new examples, or schedule rounds. The assistant proposes interpretations in your AI session; you can add/edit them in the library. Source and preview URLs may expire. Images are not copied or archived by this version. Rendered previews use external URLs without an outgoing referrer.

## Public code, private evidence

Publish the source kit; keep the personal library private. The app is a **single-owner workspace**, not a multi-user SaaS. Its production authorization boundary is the owner-only Sites access policy. The API intentionally supports platform service access for imports. Do not deploy it on a public origin or change its audience until you add authentication and per-user authorization on every endpoint. A static GitHub Pages deployment cannot run its API or durable storage.

`vault_events` stores append-only JSON revisions in D1, keyed by `(id, revision)`. The latest revision is the current view. Approval captures evidence revisions; changes invalidate the derived active status. User content is rendered as text. URL fields accept only http(s). No keys or personal seed data are in the source.

## Reproduce it

See [web/README.md](../web/README.md) for local and hosted setup. Deploy your own owner-private copy, then use **Add example** or **Import JSON**. Never import another person's demo as your own real preference history.

For the included file-vault example:

```bash
python3 scripts/web_export.py examples/writing/complete-vault > /tmp/taste-library-demo.json
```

Import that file in the browser. It contains fictional writing examples. The adapter retains context and raw quotes in notes, preserves the original file vault in the JSON's `source_vault` field, and demotes rules to proposed. The browser imports records only; keep the original JSON if you need the complete file-vault archive. The cloud interface and CLI have different record formats: per-example revisions versus round-based feedback. Cloud JSON is not a direct `vault.py` input. Both can export AI context; a lossless cloud-to-CLI round reconstruction is not implemented.

## A useful rhythm

Collect examples in chat → save selections in the library → compare ambiguous cases → propose a small interpretation → approve a scoped rule → export context for the next task. Revisit surprising misses, not just favorites. A wildcard round keeps the collection from becoming a mirror of its existing labels.

Interface inspiration: the [article supplied by the author](https://www.searchenginejournal.com/karpathy-llm-aircraft-manual-writing/591813/) discusses using HTML and diagrams to make model output easier to inspect. This implementation turns evidence into something you can compare and revise; it does not reproduce the article's text.
