# QubitPath: An Adaptive Visual Quantum Learning Lab

> **WISER Summer Program 2026 Industry Challenge Submission**  
> *An accessible, browser-based visual educational platform connecting plain-language explanations, Dirac math, quantum circuits, state vectors, probability amplitudes, relative phase, and real-time misconception-driven feedback.*

---

## 1. Project Title & Short Description
**QubitPath** is an adaptive, visual quantum learning application designed to demystify quantum computing for beginners. Rather than relying solely on matrix algebra or static code snippets, QubitPath bridges mathematical representations, 3D Bloch sphere projections, state-vector simulation, and probability distributions with a transparent **misconception-driven feedback engine**.

---

## 2. Challenge Overview
Submitted for the **WISER Education Challenge (2026)**. The challenge invites innovative educational technologies that make complex technical subjects accessible to diverse student audiences without compromising mathematical rigor.

---

## 3. Problem Statement
Beginners often memorize terms such as *superposition* and *entanglement* without developing intuitive mental models of how quantum states change when gates are applied. Existing tools are split between high-level conceptual analogies (which lack precision) and advanced quantum SDKs (which present high mathematical barriers). Furthermore, standard quantum circuit simulators act as blank slates without providing diagnostic feedback when a learner's intuition fails.

---

## 4. Proposed Solution
QubitPath delivers an end-to-end interactive visual learning path featuring:
- A 1- and 2-qubit state-vector simulator built in TypeScript.
- Four scaffolded learning modules (Bits to Qubits, Gates, Measurement, Entanglement).
- A 3D Bloch sphere visualizer and state vector space display.
- An interactive Quantum Playground with example circuit presets.
- An 8-category rule-based misconception diagnostic engine.
- Measurable pre- vs post-assessment evaluation metrics.

---

## 5. Target Audience
- **Undergraduate STEM Students:** Building foundational intuition before advanced quantum mechanics courses.
- **High-School Students:** With basic high-school algebra knowledge.
- **Software Developers:** Transitioning from classical algorithms into quantum software development.
- **Educators:** Seeking interactive visual classroom demonstrations.

---

## 6. Learning Objectives
By completing QubitPath, learners will be able to:
1. Express single-qubit states using Dirac notation $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$ and enforce normalization $|\alpha|^2 + |\beta|^2 = 1$.
2. Calculate measurement probabilities $|\alpha|^2, |\beta|^2$ from complex probability amplitudes.
3. Predict and observe state transformations under single-qubit gates ($X, Y, Z, H, S, T$).
4. Distinguish between theoretical probabilities and empirical shot sampling frequencies over $1$ to $1,000$ shots.
5. Construct the canonical Bell state $(|00\rangle + |11\rangle)/\sqrt{2}$ using $H$ and $CNOT$ gates and explain why entanglement does not permit faster-than-light communication.

---

## 7. Key Features
- **Scaffolded Learning Flow:** 4 interactive modules with prediction challenges.
- **Rule-Based Adaptive Engine:** Formative feedback explaining *why* a prediction was incorrect based on 8 tracked misconception categories.
- **Interactive Quantum Playground:** 1- and 2-qubit canvas with step forward/backward execution and "Why did this happen?" panels.
- **Visual State Space:** Simultaneous rendering of Dirac equations, amplitude bars, phase wheels, and 3D Bloch sphere projections.
- **Deterministic Seedable Sampling:** Simulated shot sampling ($1$ to $1,000$ shots) powered by a Mulberry32 PRNG.
- **Presentation Demo Mode:** One-click "Load Demo Data" toggle for live presentations and stakeholder reviews.

---

## 8. Screenshots Section

> **Notice for Repository Owner:** Replace the image placeholder paths below with actual screenshots of your deployed application before final submission.

| Landing Page & Hero | 3D Bloch Sphere & State Vector |
| :---: | :---: |
| ![Landing Page](docs/screenshots/landing.png) | ![Bloch Sphere](docs/screenshots/bloch.png) |

| Quantum Playground | Measurement Histogram |
| :---: | :---: |
| ![Playground](docs/screenshots/playground.png) | ![Histogram](docs/screenshots/histogram.png) |

---

## 9. Live-Demo Placeholder
- **GitHub Repository:** `https://github.com/LilyPartridge7/QubitPath-Adaptive-Visual-Quantum-Learning-Lab`
- **Live Application URL (GitHub Pages):** `https://lilypartridge7.github.io/QubitPath-Adaptive-Visual-Quantum-Learning-Lab/`
- **Demonstration Video:** `[INSERT VIDEO LINK HERE - 5-10 Minute Demo Video]`

---

## 10. Educational Methodology
QubitPath applies ten core pedagogical principles:
- Scaffolded concept progression
- Prediction before observation
- Immediate formative feedback
- Multiple simultaneous representations
- Active learning & retrieval practice
- Misconception correction & low-stakes assessment

---

## 11. Quantum Concepts Covered
- Computational basis states $|0\rangle, |1\rangle, |00\rangle, |01\rangle, |10\rangle, |11\rangle$
- Complex probability amplitudes $\alpha, \beta$
- State vector normalization $\sum |\alpha_i|^2 = 1$
- Relative phase angles $\phi$ and complex phase factors $i, e^{i\pi/4}$
- Unitary gate operations ($X, Y, Z, H, S, T, CNOT$)
- Measurement state collapse in computational basis
- Law of Large Numbers in quantum shot sampling
- Two-qubit product states vs non-factorable entangled Bell states
- No-Communication Theorem (debunking FTL messaging)

---

## 12. System Architecture
Client-side zero-backend architecture built with React 19, TypeScript, Vite, Tailwind CSS v4, and Recharts. Session metrics and misconception states are persisted locally in browser `LocalStorage`.

---

## 13. Quantum Simulator Explanation
The simulator library (`src/lib/quantum/simulator.ts`) computes exact 2D (1-qubit) and 4D (2-qubit) complex state vectors. It applies 2x2 and 4x4 matrix-vector transformations, re-normalizes state vectors, and samples measurement outcomes using a seedable Mulberry32 PRNG.

---

## 14. Adaptive Learning Explanation
The adaptive engine (`src/lib/adaptive/engine.ts`) maps quiz options to 8 misconception categories. When a learner makes an incorrect prediction, the engine identifies the underlying misconception, delivers a tailored explanation, and recommends a review activity.

---

## 15. Technologies Used
- React 19 & React DOM
- TypeScript 5
- Vite 6
- Tailwind CSS v4
- Recharts
- Lucide React Icons
- Vitest & React Testing Library

---

## 16. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/LilyPartridge7/QubitPath-Adaptive-Visual-Quantum-Learning-Lab.git
cd QubitPath-Adaptive-Visual-Quantum-Learning-Lab
npm install
```

---

## 17. Development Commands

Run the local development server:

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 18. Testing Instructions

Run the unit test suite with Vitest:

```bash
npm run test
```

All 15 tests should pass cleanly.

---

## 19. Production Build Instructions

Build the production bundle:

```bash
npm run build
```

The optimized static assets will be output to the `dist/` directory.

---

## 20. Deployment Instructions

### GitHub Pages
1. Ensure `vite.config.ts` includes `base: './'`.
2. Run `npm run build`.
3. Deploy the `dist/` directory to your `gh-pages` branch.

### Vercel / Netlify
1. Connect your repository.
2. Set Build Command to `npm run build` and Output Directory to `dist`.

---

## 21. Evaluation Metrics
QubitPath tracks:
- Pre-assessment baseline score (%)
- Post-assessment final score (%)
- Absolute percentage-point gain
- Relative percentage improvement
- Misconception resolution count
- Time engaged

---

## 22. Current Findings from Technical Verification
- **Unit Testing:** 15/15 unit tests passing cleanly in Vitest.
- **Simulator Correctness:** Verified exact expected outputs for $X|0\rangle = |1\rangle$, $H|0\rangle = |+\rangle$, $H^2 = I$, $Z|+\rangle = |-\rangle$, and Bell state preparation $(|00\rangle + |11\rangle)/\sqrt{2}$.
- **Build Status:** Clean TypeScript compilation (`tsc -b`) and Vite production build.

---

## 23. Limitations
- Simulator supports 1 and 2 qubits (higher qubits $N \ge 3$ not implemented in prototype).
- Idealized state vectors without physical quantum noise ($T_1/T_2$ relaxation).
- Data persisted locally in `LocalStorage`.

---

## 24. Future Work
- 3-qubit simulation & quantum teleportation lessons.
- Customizable physical quantum noise models.
- Hardware execution backend integration.

---

## 25. Ethical & Accessibility Considerations
- Dark high-contrast theme conforming to WCAG AA guidelines.
- ARIA landmarks and keyboard accessibility.
- Respect for user privacy with zero data transmission to external servers.

---

## 26. AI Tool Usage Disclosure
An AI coding assistant (Antigravity AI) was used during development to assist with initial code scaffolding, test generation, and documentation drafting. The human development team reviewed, verified, and tested all code and documentation. See `docs/ai-use-disclosure.md` for full details.

---

## 27. Team Contributions
- **Author:** **Yoon Yati Linn**
- **Role:** Individual Project Author, Lead Software Engineer & Educational Researcher
- **Affiliation:** Third-Year Computer Science Student, University of Information Technology (UIT), Myanmar
- **GitHub:** [LilyPartridge7](https://github.com/LilyPartridge7)
- **Repository:** [QubitPath-Adaptive-Visual-Quantum-Learning-Lab](https://github.com/LilyPartridge7/QubitPath-Adaptive-Visual-Quantum-Learning-Lab)

See `TEAM.md` for full details.

---

## 28. References
1. Nielsen, M. A., & Chuang, I. L. (2010). *Quantum Computation and Quantum Information*. Cambridge University Press.
2. Qiskit Textbook Development Team. (2023). *Learn Quantum Computing with Qiskit*. IBM Quantum.
3. Rieffel, E. G., & Polak, W. H. (2011). *Quantum Computing: A Gentle Introduction*. MIT Press.
4. Kaye, P., Laflamme, R., & Mosca, M. (2007). *An Introduction to Quantum Computing*. Oxford University Press.

---

## 29. License
Distributed under the **MIT License**. See `LICENSE` for details.
