# Macros and commands

## Misc.

```tex
%% Plus-minus symbol with parenthesis around the minus sign
%% http://tex.stackexchange.com/a/17553
\newcommand\varpm{\mathbin{\vcenter{\hbox{%
  \oalign{\hfil$\scriptstyle+$\hfil\cr
          \noalign{\kern-.3ex}
          $\scriptscriptstyle({-})$\cr}}}}}

%% Create a system of equations. Similar to cases environment, but
%% with brace on the right and spacing like in align environment.
%% http://tex.stackexchange.com/a/47563
\newenvironment{eqsys}
  {\left.\begin{aligned}}
  {\end{aligned}\right\rbrace}
```

## Figures

Convenience command for inserting figures. Usage:

```tex
\fig[<position>]{<label>}{<path/to/img>}{<scalefactor relative \linewidth>}{<caption>}
```

Code:

```tex
\newcommand{\fig}[5][!htbp]{%
  \begin{figure}[#1]
    \centering
    \includegraphics[width=#4\linewidth]{#3}
    \caption{#5}
    \label{#2}
  \end{figure}%
}
```

More aggressive method, the figure will really end up where you put it, no matter what.

```tex
\newcommand{\fig}[4][]{%
  \begin{minipage}{\linewidth}
    % Yes, not \centering, minipage provides no extra spacing of its own.
    \begin{center}
      \includegraphics[width=#3\linewidth]{#2}
      \captionof{figure}{#4}
      \ifthenelse{\isempty{#1}}{}{\label{#1}}
    \end{center}
  \end{minipage}%
}
```

## Comma separated arguments

```tex
% inner product: \ip{u,v}
\def\ip#1{\ipinner(#1)}
\def\ipinner(#1,#2){\ensuremath{\langle #1, #2 \rangle}}
```

Allow both normal and comma separated style:

```tex
\documentclass{article}

\usepackage{amsmath}

% Inner product.
\makeatletter
\def\ip#1{\expandafter\iphelp#1}
\def\iphelp#1{\@ifnextchar,{\ipinner#1}{\ipinner#1,}}
\def\ipinner#1,#2{\langle #1, #2 \rangle}
\makeatletter

\begin{document}
$\ip u,v \ip uv \ip{u}{v} \ip {u,v}$
\end{document}
```
