# Templates

## Main document

```latex
\documentclass[a4paper, 11pt]{article}

\usepackage{fontspec}
\usepackage[margin=2.5cm]{geometry}
\usepackage[hidelinks]{hyperref}

\begin{document}

\input{titlepage}
\tableofcontents
\clearpage
\input{introduction}

% Bibliography
\newpage
\begin{thebibliography}{99}
  \bibitem{biblabel1} \url{http://www.example.com/}, 2012-12-09
\end{thebibliography}

\end{document}
```

## Titlepage

```latex
\begin{titlepage}
  \thispagestyle{empty}
  % \null\vskip{-2em}
  \noindent \large{\textbf{Stockholm University \hfill Fysikum}}
  \vskip 7em
  \centering
  \vskip 2em
  \Huge{{Laboratory session 3}} \\
  \vskip 0.2em
  \Huge{\textbf{Interference and Diffraction}} \\
  \vskip 1.5em
  \Large{\textsc{Waves and Optics, FK4009, 10.5 hp}} \\
  \vfill
  \LARGE{\textsl{Viktor Qvarfordt}}
  \vfill
  \large
  %% Ugly trick to center the table perfectly regardless of the width of the columns.
  \makebox[\textwidth][c]{\begin{tabular}{rl}
    \makebox[\textwidth][r]{\textbf{Laboration performed}} & \makebox[\textwidth][l]{April 18, 2013} \\
    \textbf{Report handed in}     & April 26, 2013 \\
    \textbf{Grade aim}            & VG \\
    \\
    \textbf{Lab. partners}        & Alice \\
                                  & Bob \\
    \textbf{Lab. assistants}      & Carol \\
                                  & David \\
    \textbf{Submitted to}         & Eva \\
    \textbf{Course examinator}    & Francis
  \end{tabular}}
\end{titlepage}
```
