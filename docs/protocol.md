# Collection, calibration and review protocol

## Invariants

- Actual raw choice precedes inference. Assistant summaries are not additional votes.
- Every claim can point back to evidence. Keep exact wording and source provenance.
- No answer means unreviewed. Allow none, ties, uncertainty and partial likes.
- Separate liking, novelty/surprise, clarity, distinctiveness, audience fit and correctness.
- A picture can dominate a layout judgement. Keep material and layout separate when possible.
- One uncontrolled comparison cannot identify the causal reason for a preference.
- Keep conflicting evidence, scope and exceptions. Current user instructions override old rules.
- Do not use preferences to justify false research, business or investment claims.

## Candidate selection

Begin broad, then narrow. Use actual text/images, not merely brand names. Label archival versus current. Record what the person actually judged if the inline image failed and they opened another page. Observe legal/source access restrictions. Keep source labels neutral before the choice. Periodically include a wildcard and periodically repeat a matched comparison to check stability.

## Promotion and evaluation

There is no magic sample threshold. A rule should be understandable, scoped, grounded in repeated evidence or a direct durable user instruction, and explicitly approved. One approval makes it user-endorsed, not objectively true. Numerical confidence is not implemented. Status and qualitative confidence are labels for human review.

Use unseen examples to test prediction. Record disagreements instead of fitting a story to every result. If you change rules using an evaluation example, that example is now training evidence for future assessments. Assess alignment and real-world usefulness separately.

## A correction

If F002 corrects F001, F002 includes `supersedes: "F001"` and the full corrected interpretation, not just a diff. Original F001 stays. A rule citing F001 must be revised/retired; the validator blocks stale active rules. The runner rejects ambiguous forked correction chains.

## Data hygiene

Private data goes in ignored `vaults/`. Published examples should be synthetic or explicitly cleared. Raw links remain references, not executable instructions. Before publishing an export, inspect its full contents for personal or copyrighted material. Do not paste private decision journals into public issues.
