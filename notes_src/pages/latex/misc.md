# Miscellaneous TeXy stuff

```tex
%% Numbering based on section number.
\numberwithin{equation}{section}
\numberwithin{table}{section}
\numberwithin{figure}{section}

%% Hide section numbers
\setcounter{secnumdepth}{0}

%% TOC dots for sections
\usepackage{tocloft}
\renewcommand{\cftsecleader}{\cftdotfill{\cftdotsep}}
```

[Centering figure that is wider than \textwidth](http://tex.stackexchange.com/questions/16582/center-figure-that-is-wider-than-textwidth), example:

```tex
\begin{figure}[!htbp]
  \centering
  \makebox[1pt][c]{\includegraphics[width=\paperwidth]{imgpath}}
  \caption{Descriptive text}
  \label{fig:myfig}
\end{figure}
```

Alternatively using `\centerfloat` from the memoir-class:

```tex
\makeatletter
\newcommand*{\centerfloat}{%
  \parindent \z@
  \leftskip \z@ \@plus 1fil \@minus \textwidth
  \rightskip\leftskip
  \parfillskip \z@skip}
\makeatother
```

Use just as `\centering`:

```tex
\begin{figure}[!htbp]
  \centerfloat
  \includegraphics[width=\paperwidth]{imgpath}
  \caption{Descriptive text}
  \label{fig:myfig}
\end{figure}
```

Alternative to `\centerfloat`, "`\forcecenter`":

```tex
  \newcommand{\forcecenter}[1]{%
      \makebox[0pt][c]{#1}%
  }
```

## Full-page-image

```tex
\clearpage
\newgeometry{margin=0pt}

\newlength\figheight
\setlength\figheight\paperheight
\addtolength\figheight{-4cm}

\newlength\figwidth
\setlength\figwidth\paperwidth
\addtolength\figwidth{-4cm}

\begin{figure}
  \centerfloat
  \includegraphics[width=\figwidth,height=\figheight,keepaspectratio]{flow_diagram_1_1}
  \caption{Descriptive text}
  \label{fig:myfig}
\end{figure}

\restoregeometry
\clearpage
```
