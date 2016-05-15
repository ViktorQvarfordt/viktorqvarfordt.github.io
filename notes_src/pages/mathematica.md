# Mathematica

```
Clear["Global`*"]
```


## No notebook

```sh
$ math -noprompt -run < code.txt
$ math -noprompt -run "<<test.txt; Exit[];"
$ math -noprompt -run "Print[TeXForm[Integrate[Cos[x], x]]]; Exit[];"
$ echo -e "TeXForm[Integrate[Cos[x], x]]\nExit[]" | math -noprompt -run
$ math -script code.txt
```

- `-run` treats `code.txt` as a notebook while `-script` treats `code.txt` like "ordinary code".
- `-script` requires `Print[..]` for output while `-run` does not if reading from file (not stdinput).
- `-script` does not support `TeXForm` and `MatrixForm`.



## Quantum information

### Bras and kets

```mathematica
bra[str_] := {Flatten[Apply[TensorProduct, Map[If[#1 == "0", {1, 0}, {0, 1}] &, Characters[str]]]]};
ket[str_] := Transpose[bra[str]];
```

**Usage example:**

```mathematica
bra["010"] (* row vector: {{0, 0, 1, 0, 0, 0, 0, 0}} *)
ket["010"] (* col vector: {{0}, {0}, {1}, {0}, {0}, {0}, {0}, {0}} *)
bra["000"].ket["001"] (* 0 *)
bra["000"].ket["000"] (* 1 *)
ket["000"].bra["000"] (* the correct matrix *)
ConjugateTranspose[ket["010"]] == bra["010"] (* True *)
```

### Partial transpose

The partial trace $\mathrm{tr}_\alpha(\rho)$ can be computed with

\begin{equation}
  \operatorname{tr}_1(A_{12}) = \sum_i \langle_1 i \rvert A_{12} \lvert i \rangle_1 = \sum_i (\langle_1 \otimes I) \rvert A_{12} (\lvert i \rangle \otimes I)
\end{equation}

```mathematica
pTr[mat_, k_] := Module[{n, indices, bbra, kket},
  n = Log[2, Dimensions[mat][[1]]];
  indices = Characters[Table[IntegerString[j, 2, n - 1], {j, 0, 2^(n - 1) - 1}]];
  (* bbra = |i>⊗I *)
  bbra[i_] := Module[{jj},
    jj = 0;
    Apply[KroneckerProduct, Table[
      If[
        MemberQ[k, j] \[Or] j == k,
        jj++; bra[i[[jj]]],
        IdentityMatrix[2]
      ], {j, 1, n}]]];
  Sum[bbra[i] . mat . ConjugateTranspose[bbra[i]], {i, indices}]];
```

**Usage:**

```mathematica
pTr(\[Rho], 2)     (* trace out subsystem 2 *)
pTr(\[Rho], {2})   (* trace out subsystem 2 *)
pTr(\[Rho], {1,2}) (* trace out subsystem 1 and 2)
```

**Example:**

Consider three qubits. The state space is the hilbert space $\mathcal{H}1\otimes\mathcal{H}2\otimes\mathcal{H}3$. A state can be written $\ket{\psi} = c0\ket{000} + c1\ket{001} + \cdots + c7\ket{111}$. The corresponding (pure) density matrix is then $\rho = \ket{\psi}\bra{\psi}$. The corresponding reduced density operator $\rho1 = \mathrm{tr}{23}(\rho)$ is

```mathematica
$Assumptions = {\[Alpha] \[Element] Reals, \[Beta] \[Element] Reals};
\[Psi] = Sqrt[2/3] (\[Alpha] ket["000"] - \[Beta] ket["111"]) -
         \[Alpha]/Sqrt[6] (ket["011"] + ket["101"]) +
         \[Beta]/Sqrt[6] (ket["010"] + ket["100"]);
\[Rho] = \[Psi].ConjugateTranspose[\[Psi]] // FullSimplify;
\[Rho] // MatrixForm
\[Rho]1 = pTr[\[Rho], {2,3}] // FullSimplify // Expand // MatrixForm
```


## Misc.

Parse LaTeX:

```mathematica
ToExpression["\\sqrt{x y}", TeXForm]
```

Separate contexts/scopes for notebooks: http://stackoverflow.com/a/4897013
