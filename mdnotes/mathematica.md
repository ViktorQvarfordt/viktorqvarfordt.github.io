# Mathematica

```
Clear["Global`*"]
$PrePrint = If[MatrixQ[#], MatrixForm[#], #] &;
```


## No notebook

Write code in your favorite editor and run your code from a mathematica notebook by `Get["/path/to/file.wl"];`. Or, run mathematica from console (cannot show `MatrixForm[..]` etc by using.

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

Mathematica support for Sublime Text: [https://github.com/ViktorQvarfordt/Sublime-Mathematica](https://github.com/ViktorQvarfordt/Sublime-Mathematica).


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

### Tensor products

```mathematica
CircleTimes[x__] := KroneckerProduct[x];
i = IdentityMatrix[2];
σ1 = PauliMatrix[1];
σ2 = PauliMatrix[2];
σ3 = PauliMatrix[3];
σ1⊗σ3
```


### Direct sum

```mathematica
DirectSum[list_] := ArrayFlatten[ReleaseHold[DiagonalMatrix[Hold /@ list]]]
```

### Plot complex eigenvalues

```mathematica
ComplexToPolar[z_] /; z \[Element] Complexes :=
  Module[{w}, w = FullSimplify[z]; Abs[w] Exp[I Arg[w]]];
ShowEV[A_] := Module[{ev, evNoDupes, p},
   ev = Eigenvalues[A];
   evNoDupes = DeleteDuplicates[ev];
   Print[Length[evNoDupes], " of ", Length[ev], " distinct ",
    ComplexToPolar[evNoDupes]];
   p = ListPlot[{Re[#], Im[#]} & /@ evNoDupes, AxesOrigin -> {0, 0},
     PlotRange -> {{-1.2, 1.2}, {-1.2, 1.2}}, AspectRatio -> 1,
     Frame -> True, PlotStyle -> Directive[Red, PointSize[.025]]];
   Show[p, Graphics[{Thickness[0.003], Circle[{0, 0}, 1]}]]
   ];
```


### Partial trace

WARNING: This gives is wring by a factor of 2, sometimes?

The partial trace $\mathrm{tr}\_\alpha(\rho)$ can be computed with

\begin{equation}
  \operatorname{tr}\_1(A\_{12}) = \sum\_i \langle i \rvert\_1 A\_{12} \lvert i \rangle\_1 = \sum\_i (\langle i \rvert \otimes I) \rvert A\_{12} (\lvert i \rangle \otimes I)
\end{equation}

which can be implemented as

```mathematica
pTr[A_, k_] := Module[{n, indices, bbra, kket},
  n = Log[2, Dimensions[A][[1]]];
  indices = Characters[Table[IntegerString[j, 2, n-1], {j, 0, 2^(n-1) - 1}]];
  (* bbra = |i>⊗I *)
  bbra[i_] := Module[{jj},
    jj = 0;
    Apply[KroneckerProduct, Table[
      If[
        MemberQ[k, j] ∨ j == k,
        jj++; bra[i[[jj]]],
        IdentityMatrix[2]
      ], {j, 1, n}]]];
  FullSimplify[Sum[bbra[i] . A . ConjugateTranspose[bbra[i]], {i, indices}]]];
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



<!--

```mathematica
(* Text mode printing for matrices *)
printmatrix[x_] := Module[{str="", widths, prepad, postpad, prepadstr, postpadstr},
  widths = Array[0&, Length[x[[1]]]];
  Do[
    Do[
      widths[[k]] = Max[widths[[k]], StringLength[ToString[row[[k]]]]],
      {k, Length[row]}
    ],
    {row, x}
  ];
  Do[
    Do[
      prepad =  Floor[(widths[[k]] - StringLength[ToString[row[[k]]]])/2];
      If[prepad > 0, prepadstr = StringRepeat[" ", prepad], prepadstr = ""];
      postpad = Ceiling[  (widths[[k]] - StringLength[ToString[row[[k]]]])/2];
      If[postpad > 0, postpadstr = StringRepeat[" ", postpad], postpadstr = ""];
      str = str <>
            " ∣ " <>
            prepadstr <>
            ToString[row[[k]]] <>
            postpadstr
      , {k, Length[row]}];
    str = str <> " ∣\n",
    {row, x}
  ];
  WriteString[$Output, str, "\n"]
]
printmatrix[{
  {11111,222},
  {3,444444}}
]
```

-->
