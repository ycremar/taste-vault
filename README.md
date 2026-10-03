# Taste Vault

Turn intuitive choices into an evidence-backed, reusable context for your AI.

[中文说明](README.zh-CN.md) · [Start here](prompts/00-bootstrap.md) · [Architecture](docs/architecture.md) · [Sources](SOURCES.md)

Taste is what you notice, prioritize and trade off when multiple answers are reasonable. A Taste Vault records examples, your actual reactions, provisional interpretations and context-specific rubrics. It helps an assistant understand your standards for writing, design, research questions or decisions.

## The loop

1. **Discover:** the assistant brings 3–4 comparable examples, including a wildcard.
2. **Choose:** you react intuitively. Likes, dislikes, ties, partial likes and “not sure” all count. Reasons are optional.
3. **Calibrate:** the assistant proposes explanations and seeks counterexamples. Your words and its hypotheses stay separate.
4. **Apply:** approved, scoped rubrics plus supporting examples become context for a new task. Feedback starts another round.

This kit implements an external context harness. It does not fine-tune model weights, call an API, browse automatically or run a scheduler. Those capabilities belong to the host assistant. The same workflow works manually in a chat or in a coding agent with file access. It reproduces the mechanism, not identical model outputs or a scientifically validated measure of taste.

## Start in a chat — no code required

Paste [the bootstrap prompt](prompts/00-bootstrap.md). Choose one domain and audience. Ask the assistant to show the actual examples, not just links or descriptions. After each round, save the raw references and response before summarizing. If your chat cannot write files, copy its output into the templates yourself.

Use [discovery](prompts/01-discover.md), [feedback](prompts/02-calibrate.md), [rubric compilation](prompts/03-compile.md), [application](prompts/04-apply.md) and [holdout evaluation](prompts/05-evaluate.md) as needed. These prompts work with whichever assistant you use; capabilities and results vary.

## Start with files — Python 3.10+, no dependencies or API keys

```bash
python3 scripts/vault.py init vaults/me --domain writing
python3 scripts/vault.py import-round vaults/me examples/writing/round-001.json
python3 scripts/vault.py feedback vaults/me examples/writing/feedback-001.json
python3 scripts/vault.py validate vaults/me
python3 scripts/vault.py context vaults/me --task "Draft a post about learning a new skill" > /tmp/taste-context.md
```

Give the exported context and the task to your assistant. The first example only creates tentative evidence: it deliberately has **no approved rubric**. The synthetic demo includes a complete two-round sequence:

```bash
python3 scripts/vault.py validate examples/writing/complete-vault
python3 scripts/vault.py context examples/writing/complete-vault --task "Write a new opening about practicing guitar"
python3 -m unittest discover -s tests -v
```

All demo preferences and feedback are fictional teaching examples. They are not a profile of the repository author or a benchmark. [Walkthrough](examples/writing/README.md).

## What is included

| Path | Purpose |
| --- | --- |
| `prompts/` | Portable instruction harness and each stage of the loop |
| `templates/` | JSON and Markdown contracts for evidence, hypotheses, rubrics and decisions |
| `scripts/vault.py` | Initialize, import, validate and export context; no network/model calls |
| `examples/` | Original writing examples, fictional feedback and a completed vault |
| `docs/architecture.md` | Folder ownership, state transitions and agent handoff |
| `docs/protocol.md` | Selection design, uncertainty, conflict handling and review criteria |
| `docs/scheduling.md` | Optional daily/weekly orchestration instructions |
| `SOURCES.md`, `sources.json` | Inspiration, theory and optional candidate pools |
| `AGENTS.md` | Repository instructions for coding/agent tools |

Personal data lives under `vaults/`, ignored by Git. The public repo is a reusable scaffold; it does not contain the author's private vault, business documents, private links or downloaded third-party images.

## Why keep the raw examples?

A summary is lossy. “Clean and distinctive” is too vague to reconstruct what someone actually liked. A good rubric links to positive evidence, counterevidence, exceptions and the task where it applies. A favorite homepage is not automatically a preferred report layout. A preferred research question is not proof the hypothesis is true. Rationale can be a post-hoc explanation; check it against new choices and outcomes.

Confidence describes a working interpretation, not a probability calibrated by this software. Start tentative. Promote a rule only after explicit user approval, retain contradictions and evaluate on unseen examples. See [the protocol](docs/protocol.md).

## Sharing and attribution

Fork or clone this repository, then create your own ignored vault. Publish only examples you have permission to redistribute. External sources are pointers, not bundled assets or endorsements. Host scheduling and saved memory must be verified rather than assumed.

Original code, prompts and templates are MIT licensed. External works retain their own rights. See [LICENSE](LICENSE), [SOURCES.md](SOURCES.md) and [CONTRIBUTING.md](CONTRIBUTING.md).

## Optional cloud library

The [editable web app](docs/cloud-library.md) adds a persistent gallery, comparison, revision history, evidence-linked rules and portable exports. Its code is in `web/`; it needs Node.js and a private cloud deployment. Personal selections are not included. Convert the file demo with `python3 scripts/web_export.py examples/writing/complete-vault > /tmp/taste-library-demo.json`, then import it in the app.
