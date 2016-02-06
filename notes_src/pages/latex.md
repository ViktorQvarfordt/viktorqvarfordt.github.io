# $\LaTeX$

[TOC]

External links:

- [Wikibooks LaTeX](http://en.wikibooks.org/wiki/LaTeX)
- [The Not So Short Introduction to LaTeX](http://tobi.oetiker.ch/lshort/lshort.pdf)


## Basic template

```tex
\documentclass[a4paper,10pt]{article}

\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage{geometry,amsmath,amssymb,lastpage,embedfile}
\usepackage[hidelinks]{hyperref}

% Show page number as thispage / lastpage
\makeatletter
\def\ps@plain{ % Redefine plain to also override titlepage pagestyle.
  \renewcommand{\@oddfoot}{\hfill\thepage/\pageref*{LastPage}\hfill}
  \renewcommand{\@evenfoot}{\@oddfoot}
}
\makeatother

\begin{document}

% Embed latex source in pdf
\embedfile{index.tex}
\begingroup
\renewcommand\thefootnote{}
\footnotetext{This document contains its \LaTeX{} source embedded as PDF attachment.}
\endgroup

\title{...}
\author{...}
\maketitle

\section{Introduction}

Hello World!

\end{document}

```





## Automagically compile document

Basic version:

```bash
while inotifywait -qq -e modify *.tex; do
  clear && pdflatex -interaction=nonstopmode *.tex | grep "^\!\|^l."
done
```

Extended with more features: [auto-tex-compile](https://github.com/ViktorQvarfordt/auto-tex-compile)





## Code highlighting with `minted`

https://code.google.com/p/minted/

```tex
% Import package
\usepackage{minted}

% Line numbers; gray and smaller
\renewcommand{\theFancyVerbLine}{
  \sffamily\textcolor[rgb]{0.5,0.5,0.5}{\scriptsize\arabic{FancyVerbLine}}}

% Provides `matlabcode` command.
\newminted{matlab}{linenos,numbersep=5pt,frame=lines,framesep=2mm}

% Provides `matlabfile` command.
\newmintedfile{matlab}{linenos,numbersep=5pt}

% Colored background
\definecolor{bg}{rgb}{0.95,0.95,0.95}
\newminted{matlab}{bgcolor=bg}
```





## Embed file as PDF attachment

```tex
\usepackage{embedfile}
\embedfile{index.tex}
```





## Minimal pdf document

Create a pdf with no margins and page breaks. PDF document dimensions adapted to content size.


### `standalone` package

The `varwidth` parameter makes line-break behave normally.

```tex
\documentclass[varwidth]{standalone}
\begin{document}
  Hello minimal world!
\end{document}
```


### `pdfcrop` command

This is a command (included in the texlive latex distribution for linux) that crops margins from pdf documents. The command does not remove page breaks. Page numbers have to be explicitly suppressed.

```tex
\documentclass[a4paper]{article}
\thispagestyle{none}
\begin{document}
  Hello cropped world!
\end{document}
```

After compiling the document, simply run the command `pdfcrop` on the resulting pdf.






## Images, figures and floats

`\usepackage{graphicx}`

```tex
\begin{figure}
  \centering
  \includegraphics[width=0.8\linewidth]{filename}
  \caption{Descriptive text.}
  \label{fig:foo}
\end{figure}
```

[Figure positioning.](http://en.wikibooks.org/wiki/LaTeX/Floats,_Figures_and_Captions#Figures)
[Keeping_floats_in_their_place](https://en.wikibooks.org/wiki/LaTeX/Floats,_Figures_and_Captions#Keeping_floats_in_their_place)


### Full-page image

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

### [Centering figure that is wider than `\textwidth`](http://tex.stackexchange.com/questions/16582/center-figure-that-is-wider-than-textwidth)

Example:

```tex
\begin{figure}[!htbp]
  \centering
  \makebox[1pt][c]{\includegraphics[width=\paperwidth]{imgpath}}
  \caption{Descriptive text}
  \label{fig:myfig}
\end{figure}
```

Alternatively, using `\centerfloat` from the memoir-class:

```tex
\makeatletter
\newcommand*{\centerfloat}{%
  \parindent \z@
  \leftskip \z@ \@plus 1fil \@minus \textwidth
  \rightskip\leftskip
  \parfillskip \z@skip}
\makeatother

% Use just as \centering
\begin{figure}[!htbp]
  \centerfloat
  \includegraphics[width=\paperwidth]{imgpath}
  \caption{Descriptive text}
  \label{fig:myfig}
\end{figure}
```

Yet another alternative:

```tex
\newcommand{\forcecenter}[1]{%
  \makebox[0pt][c]{#1}%
}
```





## Bibliography


### Basic

```tex
...
\newpage
\begin{thebibliography}{99}
  \bibitem{biblabel1} \url{http://www.example.com/}, 2012-12-09
\end{thebibliography}

\end{document}
```


### Biblatex

```tex
\documentclass{article}

\usepackage[backend=biber]{biblatex}
\addbibresource{refs.bib}

\begin{document}

\cite{<some-ref>}
% \nocite{*} % to print all references from databse

\printbibliography

\end{document}
```

```
$ pdflatex document.tex && biber document.bcf && pdflatex document.tex
```

Where `refs.bib` may look like [this](http://ctan.space-pro.be/tex-archive/macros/latex/contrib/biblatex/doc/examples/biblatex-examples.bib).

More info:

- http://mirrors.ctan.org/macros/latex/contrib/biblatex/doc/biblatex.pdf
- http://www.ctan.org/tex-archive/macros/latex/exptl/biblatex/doc/examples
- http://tex.stackexchange.com/questions/13509/biblatex-for-idiots
- http://tex.stackexchange.com/questions/5091/what-to-do-to-switch-to-biblatex







## Mathematics


### Theorems, lemmatas, definitions, etc.

```tex
\usepackage{amsthm}

\theoremstyle{plain}
\newtheorem{theorem}{Theorem}[section]
\newtheorem{proposition}[theorem]{Proposition}
\newtheorem{lemma}[theorem]{Lemma}
\newtheorem{corollary}[theorem]{Corollary}

\theoremstyle{definition}
\newtheorem{definition}{Definition}[section]
\newtheorem{example}{Example}[section]

\theoremstyle{remark}
\newtheorem{remark}{Remark}[section]
```


### Equation numbering based on section number

```tex
\numberwithin{equation}{section}
\numberwithin{table}{section}
\numberwithin{figure}{section}

%% Hide section numbers
\setcounter{secnumdepth}{0}
```


### Macros

```tex
%% QED square-symbol properly floating to the right.
\newcommand{\qed}{\hspace*{0pt}\hfill\ensuremath{\square}}

%% Symbols
\newcommand{\N}{\mathbb{N}}
\newcommand{\Z}{\mathbb{Z}}
\newcommand{\R}{\mathbb{R}}
\newcommand{\C}{\mathbb{C}}

%% Differential operators
\newcommand{\D}[2]{\frac{d#1}{d#2}}
\newcommand{\pD}[2]{\frac{\partial#1}{\partial#2}}

\newcommand{\Dn}[3]{\frac{d^#3#1}{d#2^#3}}
\newcommand{\pDn}[3]{\frac{\partial^#3#1}{\partial#2^#3}}

\newcommand{\Dop}[1]{\frac{d}{d#1}}
\newcommand{\pDop}[1]{\frac{\partial}{\partial#1}}

\newcommand{\Dopn}[2]{\frac{d^#2}{d#1^#2}}
\newcommand{\pDopn}[2]{\frac{\partial^#2}{\partial#1^#2}}

%% Notation
\newcommand{\norm}[1]{\left\lVert#1\right\rVert}
\newcommand{\abs}[1]{\left\lvert#1\right\rvert}
\newcommand{\ip}[2]{\ensuremath{\langle #1, #2 \rangle}}

%% Operators
\newcommand{\Dom}{\operatorname{Dom}}
\newcommand{\Ker}{\operatorname{Ker}}

%% Vectors
\renewcommand{\vec}[1]{\boldsymbol{#1}}
%\renewcommand{\vec}[1]{\mathbf{#1}}
```


### Comma separated arguments

```tex
% Inner product: \ip{u,v}
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

$\ip{u}{v} \ip{u,v} \ip u,v \ip uv$

\end{document}
```


### Other

- [Plus-minus symbol with parenthesis around the minus sign](http://tex.stackexchange.com/a/17553)
- [Equation system](http://tex.stackexchange.com/a/47563)










## Misc


### Margins

```tex
\usepackage[top=1cm, bottom=2cm, left=3cm, right=4cm]{geometry}
```


### European style paragraph newline (no indentation)

```tex
\usepackage{parskip}
```


### Fancy headers with `fancyhdr`

[More info](http://en.wikibooks.org/wiki/LaTeX/Page_Layout#Page_styles)

```tex
\usepackage{fancyhdr}

\lhead{\textsc{Title}
\chead{}
\rhead{\thepage}

\lfoot{}
\cfoot{}
\rfoot{\textsl{Author}}

\pagestyle{fancy}

% hline in the footer, just like header.
\renewcommand{\footrulewidth}{0.4pt}
```



### Margin notes

`\usepackage{marginnote}`


### Table of contents dots for sections:

```tex
\usepackage{tocloft}
\renewcommand{\cftsecleader}{\cftdotfill{\cftdotsep}}
```


### [Tables](http://en.wikibooks.org/wiki/LaTeX/Tables)

Table spacing:

```tex
\renewcommand{\arraystretch}{1.4}
\renewcommand{\tabcolsep}{0.2cm}
```

#### [Booktabs](http://en.wikibooks.org/wiki/LaTeX/Tables#Using_booktabs)

Superfacny tables with aligned numbers using [`siunitx`](http://ctan.uib.no/macros/latex/contrib/siunitx/siunitx.pdf):

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


### Force `\hfill`

`lefttext \hfill righttext` might fail to right-align `righttext` if `lefttext` takes up the entire text width. Solve this by using `lefttext \hspace*{0pt}\hfill righttext`.









## Titlepage template

```tex
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

```tex
\documentclass[..., titlepage, ...]{article}

% ...

\def\title{Title}
\def\course{Course}
\def\author{Author}
\def\examiner{Examiner}
\def\school{School}

\begin{document}

\begin{titlepage}
  \thispagestyle{empty}
  \null
  \vskip -2em%
  \noindent \large{\textbf{\school \hfill \today}}
  \vskip 10em
  \begin{center}
    \vskip 2em
    \Huge{\textbf{\title}} \\
    \vskip 2em
    \Large{\course} \\
    \vskip 10em
    \begin{large}
      \begin{tabular}{ll}
    \textbf{Authors} & \author \\
    \textbf{Examiner} & \examiner \rule{0pt}{1.5em}
      \end{tabular}
    \end{large}
    \vfill
  \end{center}
\end{titlepage}

% ...
```

```tex
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
