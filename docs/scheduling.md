# Optional proactive rounds

This repository does not run in the background. A prompt or a folder does not create an automation.

In a host with scheduled tasks, request a daily or weekly round and specify local time, timezone, domain, file location and candidate count. Verify the task was created and that its execution environment can read/write the same vault. If a host cannot access the files in scheduled runs, use a reminder to open the vault rather than claiming synchronized automation.

Suggested scheduled instruction:

> Read this vault's profile, latest raw feedback, hypotheses and rubric. Follow HARNESS.md. Bring 3–4 inspected comparable references for the next test, including one counterexample or wildcard. Show actual content and ask for intuitive choices without predicting the favorite. If the previous round has no feedback, leave it unreviewed; do not invent a vote. Save candidate provenance and report the saved location. Do not compile new preferences without feedback.

Use at most one unresolved diagnostic round per domain unless the user wants broader discovery. A delivery is not a response. Continue when the user returns.

No scheduled workflow is bundled in GitHub Actions. The included Actions job validates the public kit only; it does not collect candidates, access user accounts or send notifications.
