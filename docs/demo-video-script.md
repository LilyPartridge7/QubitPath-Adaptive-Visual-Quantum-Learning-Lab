# QubitPath Demonstration Video Script (5–10 Minutes)

**WISER Summer Program 2026 Industry Challenge Submission**  
**Video Title:** QubitPath: An Adaptive Visual Quantum Learning Lab

---

## Recording & Setup Checklist
- [ ] Screen resolution set to 1920x1080 (1080p 60fps)
- [ ] Browser zoom at 100%, dark theme active
- [ ] Audio input checked with clean microphone
- [ ] Demo Data ready for presentation section

---

## Script Breakdown

### 1. Challenge & Problem Statement (0:00 – 1:00)
- **Visual:** QubitPath Landing Page (`/`) with glowing quantum laboratory hero banner.
- **Narration:** "Welcome! Traditional quantum computing education suffers from a steep barrier: beginners are forced to navigate either abstract matrix algebra or isolated code snippets, memorizing terms like superposition without understanding state changes. QubitPath is an adaptive visual learning lab created for the WISER Summer Program 2026 Industry Challenge."

### 2. Pre-Assessment Diagnostic (1:00 – 2:00)
- **Visual:** Navigating to `/pre-assessment`, answering Question 1 (confusing amplitude with probability).
- **Narration:** "Learners start with an 8-question pre-assessment. Here, selecting 0.8 instead of 0.64 triggers our diagnostic misconception engine, calling out the amplitude-vs-probability misconception and providing instant formative feedback."

### 3. Module 1: From Bits to Qubits (2:00 – 3:30)
- **Visual:** Module 1 (`/module/m1`), interacting with the 3D Bloch sphere sliders and state presets ($|0\rangle, |1\rangle, |+\rangle, |-\rangle$).
- **Narration:** "In Module 1, students explore single-qubit state vectors, Dirac notation, normalization $| \alpha |^2 + | \beta |^2 = 1$, and an interactive 3D Bloch sphere vector."

### 4. Module 2 & 3: Gates & Measurement Sampling (3:30 – 5:30)
- **Visual:** Module 2 (`/module/m2`) prediction challenge and Module 3 (`/module/m3`) measurement shot buttons ($1, 10, 100, 1,000$ shots).
- **Narration:** "Module 2 teaches gates through prediction-before-observation prompts. In Module 3, shot sampling demonstrates statistical collapse, showing how 1,000 shots converge to theoretical probability histograms."

### 5. Module 4: Bell State Entanglement (5:30 – 7:00)
- **Visual:** Module 4 (`/module/m4`), auto-preparing the Bell state $(|00\rangle + |11\rangle)/\sqrt{2}$ with $H$ and $CNOT$.
- **Narration:** "Module 4 guides learners through two-qubit entanglement. We prepare the canonical Bell state and debunk faster-than-light communication using the No-Communication Theorem."

### 6. Quantum Playground & Analytics (7:00 – 8:30)
- **Visual:** Quantum Playground (`/playground`) 2-qubit canvas and Educator Analytics page (`/educator-analytics`).
- **Narration:** "In the Quantum Playground, students construct custom circuits and step through gate executions with 'Why did this happen?' panels. The Educator Analytics view summarizes progress and score gains."

### 7. Conclusion & Architecture (8:30 – 9:30)
- **Visual:** Results page (`/results`) showing $+50\%$ score gain and 15 passing Vitest tests.
- **Narration:** "QubitPath is open-source, fully tested with Vitest, and hosted on GitHub Pages. Thank you!"
