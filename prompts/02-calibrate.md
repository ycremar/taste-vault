# Calibrate

Read HARNESS.md. Save the user's exact new response in `templates/feedback.json` before interpreting it. Link it to the round. Map only explicit votes to liked/disliked; use partial reactions for element-only comments. An unmentioned candidate is unreviewed. “Creative” is not automatically a favorite. Corrected feedback becomes a new event with `supersedes`; preserve the old event.

Propose at most three tentative hypotheses in `hypotheses.json`, with source feedback IDs, counterevidence, context/scope, confidence, confounds and next test. Reasons the user offers are valuable but not infallible causal explanations. Do not transfer a preference between domains or people without checking. If the user only likes a photo, don't infer they like the layout.

Explain briefly what changed in your understanding and what remains uncertain. Pick a next round that could falsify your interpretation, not just reinforce it. Validate the vault. Do not claim saving happened if file access is absent.
