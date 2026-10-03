# Compile a rubric

Read HARNESS.md and all cited evidence. Draft a short context-specific rubric: observable rule, scope, positive evidence IDs, counterevidence IDs, exceptions and status. “Premium” or “good taste” alone is not actionable. Avoid assigning numeric weights from sparse votes.

Use `templates/rubric.json`. Show proposed rules to the user. Only move a rule to `approved` after an explicit approval response is recorded; set `approval_feedback` to that feedback ID. Mark incompatible older rules retired rather than deleting their evidence. Review superseded feedback. Keep tentative patterns in hypotheses, not the approved rubric. Compilation here means external context preparation, not training model weights.

Validate after edits. Keep raw examples available so the next assistant can audit the summary.
