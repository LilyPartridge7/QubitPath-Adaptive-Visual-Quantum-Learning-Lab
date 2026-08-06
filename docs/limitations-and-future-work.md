# QubitPath Limitations & Future Work

---

## 1. Realistic Technical & Pedagogical Limitations

1. **Simulator Qubit Capacity:** Current state-vector simulator supports 1 and 2 qubits. Systems with $N \ge 3$ qubits are not implemented in this prototype.
2. **Classical State Simulation:** Quantum states are classically computed using floating-point math rather than physical quantum hardware.
3. **Absence of Quantum Noise:** The simulator models ideal unitary transformations and does not simulate physical noise, relaxation ($T_1$), or dephasing ($T_2$).
4. **Rule-Based Adaptive Engine:** Adaptation relies on explicit rule mappings rather than machine learning models.
5. **Local Session Scope:** Data is persisted in browser `LocalStorage` without centralized multi-user classroom servers.
6. **Controlled User Study Pending:** Learning gains are measured within the prototype framework but require future formal empirical validation with student cohorts.

---

## 2. Recommended Future Work

- **3-Qubit Extension:** Support 3-qubit circuits to demonstrate GHZ state preparation and quantum teleportation algorithms.
- **Noise Visualization:** Introduce customizable physical noise models ($T_1/T_2$ relaxation sliders) to demonstrate real-world hardware challenges.
- **Hardware Backend Integration:** Optional integration with Qiskit Runtime API / IBM Quantum hardware backends.
- **Multilingual Support:** Translation of modules into Spanish, French, and Mandarin.
- **LMS / Classroom Integration:** Exportable student progress reports for LTI/Canvas integration.
