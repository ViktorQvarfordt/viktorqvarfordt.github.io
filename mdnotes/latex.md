<!-- title: LaTeX -->

# $\LaTeX$

<!-- toc -->

External links:

- [Wikibooks LaTeX](http://en.wikibooks.org/wiki/LaTeX)
- [The Not So Short Introduction to LaTeX](http://tobi.oetiker.ch/lshort/lshort.pdf)


## Macros etc.


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


## Unicode

XeTeX

```tex
\documentclass{article}
\usepackage{unicode-math}
\begin{document}
$a≠b ⇔ a⊨a↑Ω π π$
\end{document}
```

https://github.com/olivierverdier/Unixode

```tex
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}

\usepackage[hidelinks,unicode=true]{hyperref}

\usepackage{newunicodechar}
\newunicodechar{α}{\alpha}

```



### Commands

```tex
\newcommand{\N}{\mathbb{N}}
\newcommand{\Z}{\mathbb{Z}}
\newcommand{\Q}{\mathbb{Q}}
\newcommand{\R}{\mathbb{R}}
\newcommand{\C}{\mathbb{C}}
\newcommand{\M}{\mathcal{M}}
\newcommand{\bm}[1]{\boldsymbol{\mathbf{#1}}}
\newcommand{\id}{\mathrm{id}}
\newcommand{\ip}[2]{\ensuremath{\langle #1, #2 \rangle}}
\DeclareMathOperator{\tr}{tr}
\DeclareMathOperator{\diag}{diag}
\DeclareMathOperator{\Dom}{Dom}
\DeclareMathOperator{\Ker}{Ker}
\DeclarePairedDelimiter\abs{\lvert}{\rvert}
\DeclarePairedDelimiter\norm{\lVert}{\rVert}
\DeclarePairedDelimiter\bra{\langle}{\rvert}
\DeclarePairedDelimiter\ket{\lvert}{\rangle}
\DeclarePairedDelimiterX\braket[2]{\langle}{\rangle}{#1 \delimsize\vert #2}
\newcommand\ketbra[2]{\ket{#1}\bra{#2}}
```



### Equation numbering based on section number

```tex
\numberwithin{equation}{section}
\numberwithin{table}{section}
\numberwithin{figure}{section}

%% Hide section numbers
\setcounter{secnumdepth}{0}
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


### Commutative diagrams

```
\usepackage{tikz-cd}
\tikzset{ % see http://tex.stackexchange.com/questions/169512/tikz-style-arrow-tips-missing-when-using-tikz-cd-crossing-over
  commutative diagrams/.cd,
  arrow style=tikz,
  diagrams={>=latex}
}
```

Commutative square

```
\begin{center}
  \begin{tikzcd}
    A \ar{r}{f} \ar{d}{g} & B \ar{d}{h} \\
    C \ar{r}{i} & D
  \end{tikzcd}
\end{center}
```

Eequalizer

```
\begin{tikzcd}[cramped]
  E \ar[r, "e"] & X \ar[r, shift left, "f"] \ar[r, shift right, "g"'] & Y
\end{tikzcd}
```

Slanted arrows

```
\begin{center}
  \begin{tikzcd}
    \cdot \ar[dr] \ar[rr, shift left] \ar[rr, shift right] && \cdot \ar[dl] \\
    & X
  \end{tikzcd}
\end{center}
```



## SublimeText


### Misc. improvements

#### Improve symbol goto

This will make `ctrl+r` (symbol goto) show an overview of the document layout, for easy navigation

Create `Symbol List.tmPreferences` in `.../subl/Packages/User/` and populate it with

```
<?xml version="1.0" encoding="UTF-8"?>
<plist version="1.0">
<dict>
  <key>name</key>
  <string>Symbol List</string>
  <key>scope</key>
  <string>meta.section</string>
  <key>settings</key>
  <dict>
    <key>showInSymbolList</key>
    <integer>1</integer>
    <key>showInIndexedSymbolList</key>
    <integer>1</integer>
    <key>symbolTransformation</key>
    <string>
      s/(\\chapter.*)/$1/;
      s/(\\section.*)/    $1/;
      s/(\\subsection.*)/        $1/;
      s/(\\subsubsection.*)/            $1/;
    </string>
    <key>symbolIndexTransformation</key>
    <string>
      s/(\\chapter.*)/$1/;
      s/(\\section.*)/    $1/;
      s/(\\subsection.*)/        $1/;
      s/(\\subsubsection.*)/            $1/;
    </string>
  </dict>
</dict>
</plist>

```

Disable default symbol goto (because they are mostly useless) by changing `<key>scope</key>` to

```
<key>scope</key>
<string>NULL</string>
```

in the following files of the default package LaTeX (which can be modified by the package PackageResourceViewer)

```
Symbol List - Commands.tmPreferences
Symbol List - Labels.tmPreferences
Symbol List - Sections.tmPreferences
```


### LaTeXTools

1. Install LaTeXTools via PackageControl.
3. Install `latexmk python-dbus`.
2. Preferences -> Package Settings -> LaTeXTools -> Settings - User

```
"sublime": "subl", // or whatever you have
"output_directory": "/tmp/LaTeXToolsTmp", // avoid cluttering. think about how this can be a different path for each project
"preview_math_color": "white",
"preview_math_background_color": "black",
"preview_math_density": 300,
```



### Source-embedded PDFs

See [this](https://github.com/ViktorQvarfordt/Sublime-LaTeX-Extra).



## Web

Embed math as image in html http://tex.stackexchange.com/questions/44486/pixel-perfect-vertical-alignment-of-image-rendered-tex-snippets


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

Basic usage:

```tex
\usepackage{minted} % NB: Load minted after hyperref

...

\begin{minted}{python}
def f(x):
  return 2*x
\end{minted}
```

```tex
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


### [PDF→SVG](/notes/pdf)



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

### Center cell in `alignat`

```
\newcommand*\centermathcell[1]{\omit\hfil$\displaystyle#1$\hfil\ignorespaces}
```


### Centering equation or figure that is wider than `\textwidth`

**Equation:**

```
\newcommand{\centermath}[1]{\par\centerline{\begin{minipage}{\linewidth}#1\end{minipage}}\par}
```

Example:

```
\centermath{\begin{align*}
  very long
\end{align*}}
```

**Figure:**

http://tex.stackexchange.com/questions/16582/center-figure-that-is-wider-than-textwidth

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









## Misc

### Other

- [Plus-minus symbol with parenthesis around the minus sign](http://tex.stackexchange.com/a/17553)
- [Equation system](http://tex.stackexchange.com/a/47563)


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



### Enumerate interitemtext

```tex
\documentclass[a4paper]{article}

\usepackage{lipsum}

\newcommand{\interitemtext}[1]{
  \item[] \hspace{-\labelwidth}\hspace{-\labelsep}#1
}

\begin{document}

\lipsum[1]

\begin{enumerate}
  \item First item
  \item Second item
  \interitemtext{This is some inter-item text}
  \item Third item
\end{enumerate}

\lipsum[2]

\end{document}
```



### Margin notes

```tex
\usepackage[left=3.175cm, marginparwidth=2.825cm, marginparsep=3mm]{geometry}
\usepackage{marginnote}
\reversemarginpar
```



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


```tex
%% QED square-symbol properly floating to the right.
\newcommand{\qed}{\hspace*{0pt}\hfill\ensuremath{\square}}
```



### References

#### Showkeys

```
\usepackage{showkeys}
```

Show labels for `\ref` and `\cite` etc. in document, for use when drafting document. The following snippet enables `showkeys` with `cleveref`

```tex
% Enable showkeys for \cref and \Cref
% tex.stackexchange.com/questions/139698/usiong-showkes-and-cleveref-together
\makeatletter
  \SK@def\cref#1{\SK@\SK@@ref{#1}\SK@cref{#1}}%
  \SK@def\Cref#1{\SK@\SK@@ref{#1}\SK@Cref{#1}}%
\makeatother
```

Tweaking of `showkeys`:

```
% \renewcommand*\showkeyslabelformat[1]{%
%   \parbox[t]{\marginparwidth}{\raggedright\normalfont\footnotesize\ttfamily#1}}
```



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
