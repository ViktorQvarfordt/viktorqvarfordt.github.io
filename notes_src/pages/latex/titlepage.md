# Titlepage

```latex
\begin{titlepage}
  \thispagestyle{empty}
  % \null\vskip{-2em}
  \noindent \large{\textbf{Stockholm University \hfill Fysikum}}
  \vskip 7em
  \centering
  \vskip 2em
  \Huge{{Laboration 1}} \\
  \Huge{\textbf{Geometrical Optics}} \\
  \vskip 2em
  \Large{\textsc{Waves and Optics, FK4009, 10.5 hp}} \\
  \vfill
  \LARGE{\textsl{Viktor Qvarfordt}}
  \vfill
  \large
  %% Ugly trick to center the table perfectly regardless of the width of the columns.
  \makebox[\textwidth][c]{\begin{tabular}{rl}
    \makebox[\textwidth][r]{\textbf{Laboration performed}} & \makebox[\textwidth][l]{April 3, 2013} \\
    \textbf{Report handed in}     & April 11, 2013 \\
    \textbf{Grade aim}            & .. \\
    \\
    \textbf{Lab. partners}        & .. \\
                                  & .. \\
    \textbf{Lab. assistants}      & .. \\
                                  & .. \\
    \textbf{Submitted to}         & .. \\
    \textbf{Course examinator}    & ..
  \end{tabular}}
\end{titlepage}
```
