# Mathematica

```
Clear["Global`*"]
```

Separate contexts/scopes for notebooks: http://stackoverflow.com/a/4897013


## Quantum information

### Bras and kets

```mathematica
bra[str_] := {Flatten[Apply[TensorProduct, Map[If[#1 == "0", {1, 0}, {0, 1}] &, Characters[str]]]]};
ket[str_] := Transpose[bra[str]];
```

Usage example:

```mathematica
bra["000"].ket["001"] (* 0 *)
bra["000"].ket["000"] (* 1 *)
ket["000"].bra["000"] (* the correct matrix *)
ConjugateTranspose[ket["010"]] == bra["010"] (* True *)
```

### Partial transpose

```mathematica
pTr[mat_, k_] := Module[{n, indices, bbra, kket},
  n = Log[2, Dimensions[mat][[1]]];
  indices = Characters[Table[IntegerString[j, 2, n - 1], {j, 0, 2^(n - 1) - 1}]];
  bbra[i_] := Module[{inner, j, jj},
    inner = {};
    jj = 0;
    For[j = 1, j <= n, j++,
      inner = Append[inner, If[j == k, IdentityMatrix[2], jj++; bra[i[[jj]]]]]];
    Apply[KroneckerProduct, inner]
  ];
  Total[Table[bbra[i].mat.ConjugateTranspose[bbra[i]], {i, indices}]]
];
```

Usage example:

```mathematica
$Assumptions = {\[Alpha] \[Element] Reals, \[Beta] \[Element] Reals};
\[Psi] = Sqrt[2/3] (\[Alpha] ket["000"] - \[Beta] ket["111"]) -
         \[Alpha]/Sqrt[6] (ket["011"] + ket["101"]) +
         \[Beta]/Sqrt[6] (ket["010"] + ket["100"]);
\[Rho] = \[Psi].ConjugateTranspose[\[Psi]] // FullSimplify;
\[Rho] // MatrixForm
pTr[\[Rho], 1] // FullSimplify // Expand // MatrixForm
```
