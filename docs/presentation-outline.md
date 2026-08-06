# QubitPath Presentation Slide Outline (7 Slides)

**WISER Summer Program 2026 Industry Challenge Submission**

---

## Slide 1: Problem & Target Audience
- **Title:** The Quantum Learning Barrier
- **Key Points:**
  - Beginners encounter quantum computing through steep matrix math or unguided code.
  - Abstract terms (*superposition*, *entanglement*) are memorized without intuitive mental models.
  - **Target Audience:** High-school & undergraduate students, software developers, and educators.

---

## Slide 2: Proposed Solution
- **Title:** QubitPath — Adaptive Visual Quantum Learning Lab
- **Key Points:**
  - Browser-based, zero-backend interactive application.
  - Unifies plain-language scaffolded lessons, Dirac notation, matrix math, 3D Bloch spheres, state vectors, and measurement histograms.
  - Core Differentiator: Misconception-driven diagnostic engine explaining *why* predictions fail.

---

## Slide 3: Educational Methodology
- **Title:** Evidence-Based Pedagogical Design
- **Key Points:**
  - Scaffolded modules (Bits to Qubits → Gates → Measurement → Entanglement).
  - Prediction before observation & immediate formative feedback.
  - Multiple simultaneous state representations & retrieval practice.

---

## Slide 4: Technical Architecture
- **Title:** Lightweight Client-Side Technology Stack
- **Key Points:**
  - React 19 + TypeScript + Vite + Tailwind CSS + Recharts + Vitest.
  - Custom local TypeScript quantum engine (1 & 2 qubits, complex math, state vector normalization).
  - Seedable Mulberry32 PRNG for reproducible measurement sampling.

---

## Slide 5: Product Demonstration
- **Title:** Interactive Modules & Quantum Playground
- **Key Points:**
  - 3D Bloch sphere vector manipulation & preset states ($|0\rangle, |1\rangle, |+\rangle, |-\rangle$).
  - 1- to 1,000-shot measurement histograms comparing theoretical vs empirical frequencies.
  - Bell state preparation $(|00\rangle + |11\rangle)/\sqrt{2}$ and interactive Quantum Playground.

---

## Slide 6: Verification, Findings & Limitations
- **Title:** Verification & Honest Scope Assessment
- **Key Points:**
  - **Verification:** 100% test pass rate across 15 Vitest unit tests; clean production build.
  - **Limitations:** 1-2 qubit capacity, classical state-vector simulation, rule-based adaptive logic.

---

## Slide 7: Recommendations & Future Development
- **Title:** Next Steps & Roadmap
- **Key Points:**
  - Expand to 3-qubit algorithms (GHZ state, quantum teleportation).
  - Physical quantum noise visualization ($T_1/T_2$ relaxation).
  - Empirical classroom user study with student cohorts.
