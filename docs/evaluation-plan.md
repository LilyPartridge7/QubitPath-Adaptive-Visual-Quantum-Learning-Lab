# QubitPath Evaluation & Validation Plan

This evaluation plan establishes procedures for both technical software verification and future educational user studies.

---

## 1. Technical Evaluation (Completed & Verified)

- **Mathematical Correctness:** 15/15 unit tests passing via Vitest.
- **Simulator Accuracy:** Verified $X|0\rangle = |1\rangle$, $H|0\rangle = |+\rangle$, $H^2 = I$, $Z|+\rangle = |-\rangle$, Bell state preparation, and probability normalization.
- **Deterministic Sampling:** Verified seedable PRNG shot frequencies converge to theoretical probabilities.
- **Production Build:** Production build verified with Vite and TypeScript compiler clean pass.

---

## 2. Proposed Educational Controlled Evaluation (Future Work)

To evaluate instructional efficacy in classroom settings, future research should execute the following controlled evaluation protocol:

1. **Participant Selection:** $N = 60$ undergraduate STEM students with basic algebra background and no prior quantum experience.
2. **Design:** Pre-test / Intervention / Post-test design across two cohorts (QubitPath adaptive lab vs static textbook reading).
3. **Metrics Collected:**
   - Pre- to post-assessment score gain ($\Delta \text{Score}$)
   - Misconception reduction rate across 8 categories
   - Time to completion & task engagement
   - Usability satisfaction (System Usability Scale - SUS)
4. **Ethical Protocols:** Institutional IRB approval, informed consent, and anonymous data collection.
