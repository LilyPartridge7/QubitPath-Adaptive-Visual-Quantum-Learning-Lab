# QubitPath: Technical & Architectural Report

**WISER Summer Program 2026 Industry Challenge Submission**  
*Project Name:* QubitPath — An Adaptive Visual Quantum Learning Lab  
*Target Audience:* High-school/undergraduate students, software developers, and educators.  
*Architecture:* Zero-backend client-side web application built with React, TypeScript, Tailwind CSS, Recharts, and Vitest.

---

## 1. Executive Summary

Quantum computing represents a paradigm shift in computation, yet beginner learning pathways remain severely hindered by high abstraction barriers. Traditional educational resources lean heavily on complex matrix mathematics or isolated code snippets (e.g., Qiskit/Cirq), causing learners to memorize definitions without forming intuitive mental models of state transformations.

**QubitPath** addresses the **WISER Education Challenge** by introducing a zero-dependency, browser-based, adaptive visual quantum learning lab. It unifies plain-language scaffolded lessons, Dirac notation, matrix algebra, 3D Bloch sphere projections, state vectors, probability distributions, phase representations, and seedable measurement shot sampling.

Crucially, QubitPath features a transparent, **rule-based adaptive diagnostic engine** that evaluates learner predictions against eight documented quantum misconceptions (e.g., confusing probability amplitudes with measurement probabilities, assuming Hadamard always produces state |+⟩, or believing entanglement allows faster-than-light communication). Instead of simply marking answers correct or incorrect, QubitPath explains *why* a prediction was flawed, delivers corrective physical reasoning, and generates personalized module recommendations.

---

## 2. Problem Statement & Learning Gap

Beginners face two distinct instructional barriers:
1. **Mathematical Disconnect:** Abstract state vectors $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$ are presented without real-time visual feedback connecting amplitudes $(\alpha, \beta)$ to probability $| \alpha |^2$ and relative phase $\phi$.
2. **Lack of Diagnostic Guidance:** Traditional circuit simulators act as blank slates without diagnostic feedback. Learners can construct invalid circuits or misinterpret probabilistic measurement collapse without learning *why* their intuition failed.

QubitPath solves this by combining interactive state visualization with active prediction-before-observation prompts and formative misconception feedback.

---

## 3. System Architecture & Tech Stack

QubitPath follows a pure frontend client-side architecture hostable on GitHub Pages, Vercel, or Netlify with zero external API dependencies or backend servers.

```
+-------------------------------------------------------------------+
|                        QubitPath Frontend                         |
|                                                                   |
|   +-------------------+   +------------------+   +------------+   |
|   |  React Components |   |  Visual Layer    |   | Router     |   |
|   |  (Modules 1-4,    |   |  (Bloch Sphere,  |   | (Hash      |   |
|   |   Playground,     |   |   Recharts,      |   |  Router)   |   |
|   |   Assessments)    |   |   Dirac State)   |   |            |   |
|   +---------+---------+   +--------+---------+   +-----+------+   |
|             |                      |                   |          |
|             v                      v                   v          |
|   +-----------------------------------------------------------+   |
|   |              Adaptive Diagnostic Engine                   |   |
|   |   (Rule-based evaluation of 8 quantum misconceptions)    |   |
|   +----------------------------+------------------------------+   |
|                                |                                  |
|                                v                                  |
|   +-----------------------------------------------------------+   |
|   |            TypeScript Quantum Simulator Engine            |   |
|   |   (1- & 2-Qubit State Vectors, Complex Math, Normalization) |   |
|   +----------------------------+------------------------------+   |
|                                |                                  |
|                                v                                  |
|   +-----------------------------------------------------------+   |
|   |                  Browser LocalStorage                      |   |
|   |         (Learner Progress & Misconception State)          |   |
|   +-----------------------------------------------------------+   |
+-------------------------------------------------------------------+
```

### Technology Stack Specifications
- **Core Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 + Glassmorphism Custom Theme
- **Data Visualization:** Recharts + Custom 2D/3D SVG Bloch Sphere
- **Testing:** Vitest + React Testing Library + JSDOM
- **Persistence:** LocalStorage API with Demo Data toggle support

---

## 4. Quantum Simulator Engine Design

The quantum simulation library (`src/lib/quantum/simulator.ts`) is written purely in TypeScript without external quantum packages.

### Mathematical Specifications
1. **Complex Arithmetic:** Represented as $\{ \text{re: number, im: number} \}$ supporting addition, subtraction, multiplication, magnitude, phase angle $\phi = \text{atan2}(\text{im}, \text{re})$, and complex conjugation.
2. **State Vectors:**
   - Single Qubit: 2D vector $[\alpha, \beta]^T$ representing $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$.
   - Two Qubits: 4D vector $[\alpha_{00}, \alpha_{01}, \alpha_{10}, \alpha_{11}]^T$ representing basis states $|00\rangle, |01\rangle, |10\rangle, |11\rangle$.
3. **Normalization Constraint:** Enforces $\sum_i |\alpha_i|^2 = 1.0 \pm 10^{-4}$ after every gate application.
4. **Gates Implemented:**
   - Single-qubit: Pauli $X, Y, Z$, Hadamard $H = \frac{1}{\sqrt{2}}\begin{bmatrix}1 & 1\\ 1 & -1\end{bmatrix}$, Phase $S$, $\pi/4$ Phase $T$.
   - Two-qubit: Controlled-NOT ($CNOT$), supporting selectable control and target indices.
5. **Seedable Measurement Sampling:** Incorporates a Mulberry32 Pseudo-Random Number Generator (PRNG) to simulate repeated shots ($1, 10, 100, 1,000$) deterministically for unit testing and visual histograms.

---

## 5. Adaptive Diagnostic Engine Design

QubitPath incorporates a transparent, rule-based diagnostic engine (`src/lib/adaptive/engine.ts`).

### Tracked Misconception Categories
1. `AMPLITUDE_VS_PROBABILITY`: Confusing complex amplitudes $\alpha, \beta$ with real measurement probabilities $|\alpha|^2, |\beta|^2$.
2. `SUPERPOSITION_COLLAPSE_CONFUSION`: Believing a qubit is physically simultaneously 0 and 1 before measurement.
3. `HADAMARD_ALWAYS_PLUS`: Assuming the Hadamard gate always turns any input qubit into $|+\rangle$.
4. `IGNORING_PHASE`: Treating relative phase as physically irrelevant because $|+\rangle$ and $|-\rangle$ share equal 50/50 measurement probabilities.
5. `EXACT_HALF_HALF_SAMPLING`: Expecting finite sampling shots (e.g. 10 shots) to yield exactly 5 zeros and 5 ones.
6. `ENTANGLEMENT_FTL`: Thinking entanglement enables instant faster-than-light data transmission.
7. `CORRELATION_VS_CAUSATION`: Confusing entangled Bell pairs with simple unentangled product states.
8. `CNOT_APPLICATION`: Misunderstanding control vs target qubit roles in CNOT operations.

---

## 6. Software Verification & Test Results

The software suite was verified using Vitest.

### Unit Test Summary
- **Total Test Suites:** 3 passed
- **Total Tests Passed:** 15 / 15 (100%)
- **Test Categories:**
  - `simulator.test.ts`: Verified $X|0\rangle = |1\rangle$, $H|0\rangle = |+\rangle$, $H^2 = I$, $Z|+\rangle = |-\rangle$, Bell state preparation $(|00\rangle + |11\rangle)/\sqrt{2}$, normalization checks, seedable measurement sampling, and numerical exception handling.
  - `adaptive.test.ts`: Verified misconception scoring, resolution tracking, diagnostic recommendation sorting, and misconception metadata.
  - `assessment.test.ts`: Verified pre- and post-assessment question bank structures, option uniqueness, and correct answer mapping.

---

## 7. Limitations & Scalability

1. **Simulator Scope:** Limited to 1- and 2-qubit state vectors. Higher-qubit systems ($N \ge 3$) require $2^N$-dimensional complex tensor products.
2. **Noise Model:** Uses idealized unitary transformations; physical quantum noise (decoherence, relaxation $T_1$, dephasing $T_2$) is not modeled.
3. **Storage Scope:** Session data is persisted locally in browser `LocalStorage`.

---

## 8. Academic References

1. Nielsen, M. A., & Chuang, I. L. (2010). *Quantum Computation and Quantum Information* (10th Anniversary ed.). Cambridge University Press.
2. Qiskit Textbook Development Team. (2023). *Learn Quantum Computing with Qiskit*. IBM Quantum.
3. Rieffel, E. G., & Polak, W. H. (2011). *Quantum Computing: A Gentle Introduction*. MIT Press.
4. Kaye, P., Laflamme, R., & Mosca, M. (2007). *An Introduction to Quantum Computing*. Oxford University Press.
