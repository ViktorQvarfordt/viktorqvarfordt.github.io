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

### Partial trace

The partial trace $\mathrm{tr}\_\alpha(\rho)$ can be computed with

\begin{equation}
  \operatorname{tr}\_1(A\_{12}) = \sum\_i \langle i \rvert\_1 A\_{12} \lvert i \rangle\_1 = \sum\_i (\langle i \rvert \otimes I) \rvert A\_{12} (\lvert i \rangle \otimes I)
\end{equation}

which can be implemented as

```mathematica
pTr[mat_, k_] := Module[{n, indices, bbra, kket},
  n = Log[2, Dimensions[mat][[1]]];
  indices = Characters[Table[IntegerString[j, 2, n - 1], {j, 0, 2^(n - 1) - 1}]];
  (* bbra = |i>⊗I *)
  bbra[i_] := Module[{jj},
    jj = 0;
    Apply[KroneckerProduct, Table[
      If[
        MemberQ[k, j] ∨ j == k,
        jj++; bra[i[[jj]]],
        IdentityMatrix[2]
      ], {j, 1, n}]]];
  Sum[bbra[i] . mat . ConjugateTranspose[bbra[i]], {i, indices}]];
```

**Usage:**

```mathematica
pTr(ρ, 2)     (* trace out subsystem 2 *)
pTr(ρ, {2})   (* trace out subsystem 2 *)
pTr(ρ, {1,2}) (* trace out subsystem 1 and 2)
```

**Example:**

Consider three qubits. The state space is the hilbert space $\mathcal{H}\_1\otimes\mathcal{H}\_2\otimes\mathcal{H}\_3$. A state can be written $\lvert\psi\rangle = c\_0\lvert 000\rangle + c\_1\lvert 001\rangle + \cdots + c\_7\lvert 111\rangle$. The corresponding (pure) density matrix is then $\rho = \lvert\psi\rangle \langle\psi\rvert$. The corresponding reduced density operator $\rho\_1 = \operatorname{tr}\_{23}(\rho)$ is

```mathematica
$Assumptions = {α ∈ Reals, β ∈ Reals};
ψ = Sqrt[2/3] (α ket["000"] - β ket["111"]) -
         α/Sqrt[6] (ket["011"] + ket["101"]) +
         β/Sqrt[6] (ket["010"] + ket["100"]);
ρ = ψ.ConjugateTranspose[ψ] // FullSimplify;
ρ // MatrixForm
ρ1 = pTr[ρ, {2,3}] // FullSimplify // Expand // MatrixForm
```


## Misc.

Parse LaTeX:

```mathematica
ToExpression["\\sqrt{x y}", TeXForm]
```

Separate contexts/scopes for notebooks: http://stackoverflow.com/a/4897013
