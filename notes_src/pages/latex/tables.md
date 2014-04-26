# Achieving perfect tables

- [Professional tables, using booktabs](http://en.wikibooks.org/wiki/LaTeX/Tables#Using_booktabs)

## Aligning numbers in tables

For an in-depth discussion read the [siunitx-package docummentation](http://ctan.uib.no/macros/latex/contrib/siunitx/siunitx.pdf), below I give an example showing the essential parts.

```tex
\begin{table}
  \centering
  \sisetup{
    table-figures-integer = 3,
    table-figures-decimal = 0,
    table-sign-mantissa  % Include space for minus-sign.
  }
  \begin{tabular}{@{}
                  S
                  S
                  S[table-figures-integer=2,table-figures-decimal=2] % Config row separately.
                  @{}}
    \toprule
    %% Wrap header fields in curly braces so that siunitx
    %% doesn't treat them as numbers.
    {first field}, {second field}, {third field} \\
    \midrule
    %% numbers here, remember \\ also on the last line.
    \bottomrule
  \end{tabular}
  \caption{The caption}
  \label{tab:mytable}
\end{table}
```