# Evaluate generalization

Use new examples not used to form the rule. Prefer an A/B comparison with matched content and one controlled difference. Hide your prediction until after the user chooses. Record the prediction, choice, confidence, ties and abstentions; then discuss the discrepancy without explaining away every miss.

For an informal baseline comparison, ask the same model/task to produce one output with and one without the vault; keep generation settings/content comparable and randomize presentation order. This is an exploratory individual comparison, not a population-level result. Do not reuse test feedback as training evidence and still call the next test held out.

For judgement, record predicted outcome and update conditions before learning the result. Evaluate preference alignment separately from actual outcomes. Keep factual failure visible even if the user likes the output.
