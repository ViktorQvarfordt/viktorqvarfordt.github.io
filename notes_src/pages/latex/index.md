# $\LaTeX$

[TOC]

## Sub-pages

- [Mathematics](math)
- [Controlling floats](floats)
- [Minted](minted) – *Source code highlighting*
- [Miscellaneous](misc)
- [Macros and commands](macros)
- [Minimal document](minimal)
- [Biblatex](biblatex)
- [auto-tex-compile](https://github.com/c3l/auto-tex-compile), a script I wrote to automatically compile the document as the source files are saved.
- [Templates](templates)

---

Refactoring content below to sub-pages, new stuff is above.

LaTeX documentation is found at:

- [Wikibooks LaTeX](http://en.wikibooks.org/wiki/LaTeX)
- [The Not So Short Introduction to LaTeX](http://tobi.oetiker.ch/lshort/lshort.pdf)

Those two resources are great! Although it is quite a lot to read, I
promise, life gets better when you've done it!

I frequently use Wikibooks as a reference, and I suggest you do the
same, and maybe even contribute to make it more comprehensive.

This document is merely a compilation of my notes on certain edge
cases and stuff that I tend to forget, along with code snippets. I've
put it all here mainly as a reference for my self.


## Automagically compile document

This short script automagically compiles your tex document when you
modify the source file! Also, no messy output is shown, only error
messages (if any). Requires the `inotify-tools` package.

```bash
while inotifywait -qq -e modify *.tex; do
  clear && pdflatex -interaction=nonstopmode *.tex | grep "^\!\|^l."
done
```

To really benefit from this you need a PDF reader that reloads the
document when it is modified,
[Evince](http://en.wikipedia.org/wiki/Evince) does this.

The above script is quite basic, it does for instance not handle
command line arguments. Have a look at the
[extended version](https://www.dropbox.com/s/t587neki0zgxuw9/latex-autocompile)
directly from my dropbox (it changes and improves slightly over
time). Put it in your
[PATH](http://en.wikipedia.org/wiki/PATH_(variable)) for ease of use.


## Packages

### Internationalization

Hyphenation in your language: `\usepackage[swedish]{babel}`.

LaTeX is really old, so support for modern font encodings is not built
in, so we use packages:

```tex
\usepackage[utf8]{inputenc} % Input can be utf8
\usepackage[T1]{fontenc}    % Output just gets it right
```

Read [this](http://tex.stackexchange.com/a/44699) to clear up
potential confusion about `inputenc` and `fontenc`.
However, you should really consider using
[XeTeX](http://en.wikipedia.org/wiki/XeTeX) or
[LuaTeX](http://en.wikipedia.org/wiki/LuaTeX) instead, they handle
utf8 (among other things) much smoother. They're not very different
from plain LaTeX, they're both part of texlive and so on.


### Math and other sciency stuff

```tex
\usepackage{mathtools} % This is preferred
\usepackage{amsmath}   % Otherwise use this
\usepackage{amssymb}   % Gives more symbols
\usepackage{stmaryrd}  % Even more symbols
\usepackage{siunitx}   % Dealing with units
\usepackage{subdepth}
\usepackage[version=3]{mhchem} % Chemistry.. i don't know
```

- [Most of what you need](http://en.wikibooks.org/wiki/LaTeX/Mathematics)
- [Amsmath doc](ftp://ftp.ams.org/ams/doc/amsmath/amsldoc.pdf)
- [Math symbols](http://en.wikibooks.org/wiki/LaTeX/Mathematics#Formatting_mathematics_symbols)



## Tweaks


### Margins

The default text width might be considered too narrow in some cases, so we make the
margins smaller with the `geometry` package.

```tex
\usepackage[top=1cm, bottom=2cm, left=3cm, right=4cm]{geometry}
```

And you should read
[Page Layout](http://en.wikibooks.org/wiki/LaTeX/Page_Layout) at
Wikibooks.


#### European style paragraph newline (no indentation)

See
[Paragraph Indents](http://en.wikibooks.org/wiki/LaTeX/Paragraph_Formatting#Paragraph_Indents)
at Wikibooks, for more details.

```tex
\usepackage{parskip}
```


### Fancy headers with `fancyhdr`

See
[page styles](http://en.wikibooks.org/wiki/LaTeX/Page_Layout#Page_styles)
for more info.

```tex
\usepackage{fancyhdr}

\lhead{left header}
\chead{center header}
\rhead{right header}

\lfoot{left footer}
\cfoot{center footer}
\rfoot{right footer}

\pagestyle{fancy}

% hline in the footer, just like header.
\renewcommand{\footrulewidth}{0.4pt}
```

An example.

```tex
\usepackage{fancyhdr}
  \lhead{\textsc{Title}}
  \rhead{\thepage}
  \cfoot{}
  \rfoot{\textsl{Author}}
\pagestyle{fancy}
```

### Graphics, images and figures

To include an image you need `\usepackage{graphicx}`, then use:

```tex
\begin{figure}
  \centering
  \includegraphics[width=0.8\linewidth]{filename}
  \caption{Descriptive text.}
  \label{fig:foo}
\end{figure}
```

Note that I use `[width=0.8\linewidth]` to scale the image to 80 \% of
the (usable) width of the document. (See
[this](http://tex.stackexchange.com/questions/16942/difference-between-textwidth-linewidth-and-hsize)
for more info. on `\linewidth` vs. `\textwidth`.)

Normally LaTeX positions your figure in the resulting document where
the typographical rules find it best. This is most usually not where
the figure occurs in the source. If you don't want LaTeX to choose
where to put your figure, use the `float` package and begin the
`figure` environment like this `\begin{figure}[H]`.

However, I recommend letting LaTeX position your figures
automatically -- they might end up on a different page, but it is
usually for the best. Simply be consistent with referencing your
figures in the text  and use meningful captions.

Sometimes LaTeX likes to spread out your figures just a bit too much
-- If you have a section that is rather small, the figures in that
section might actually end up in another section. Sometimes this is
simply not acceptable; then use `\usepackage[section]{placeins}`.

#### Advanced, PGF/TikZ

For more advance usage, coding your vectorized images, the
[PGF/TikZ](http://en.wikibooks.org/wiki/LaTeX/PGF/TikZ) package might
be interesting.


### Fonts

Just go [here](http://en.wikibooks.org/wiki/LaTeX/Text_Formatting#Fonts)


### Hyperref

Use `\autoref{label}` instead of `figure~\ref{label}`, customize automatic reference names as below.

```tex
\usepackage[hidelinks]{hyperref}

\def\equationautorefname~#1\null{Equation~(#1)\null}

\def\figureautorefname{Figure}
```

Link a word to a reference label with `\hyperref[label]{text}`.


### Miscellaneous

Nifty notes in the margins: `\usepackage{marginnote}`

Table of contents dots for sections:

```tex
\usepackage{tocloft}
\renewcommand{\cftsecleader}{\cftdotfill{\cftdotsep}}
```

Tables, have a closer look in
[Tables](http://en.wikibooks.org/wiki/LaTeX/Tables) at Wikibooks. For
not so tight table cells use this:

    \renewcommand{\arraystretch}{1.4}
    \renewcommand{\tabcolsep}{0.2cm}


## Templates

### General document structure

```tex
\documentclass[oneside, a4paper, 11pt]{article}

\usepackage{..all your packages..}

% General configurations goes here, see tweaks above.

\title{Title}
\author{Author}

\begin{document}

\maketitle

% \tableofcontents
% \newpage

\section{Introduction}

Hello world!

% Bibliography
\newpage
\begin{thebibliography}{99}
  \bibitem{biblabel1} \url{http://www.example.com/}, 2012-12-09
\end{thebibliography}

\end{document}
```

### Titlepage

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

## Installing LaTeX and related packages (debian-based)

This is a list the latex-packages that I use on my system.
In a Debian-based distributions they can be installed with this command.

```bash
sudo apt-get install texlive texlive-latex-recommended texlive-latex-extra \
texlive-science texlive-math-extra cm-super texlive-xetex texlive-lang-swedish
```

Other apparently useful packages.

- texlive-latex3
- texlive-publishers
- texlive-fonts-recommended
- texlive-fonts-extra


## Miscellaneous

### Force `\hfill`

`lefttext \hfill righttext` might fail to right-align `righttext` if `lefttext` takes up the entire text width. Solve this by using `lefttext \hspace*{0pt}\hfill righttext`.

### Automated compilation from git
Automated compilation of LaTeX source pulled from a git repository

```bash
cd /path/to/git/repo/
git pull
cd /path/to/new/pdf/
rm -f *
cp /path/to/git/repo/LaTeX-source/* ./
pdflatex -interaction=batchmode main.tex
pdflatex -interaction=batchmode main.tex  # Twice if needed.
```

`/path/to/new/pdf/` might be on a web-server from where the script is
run as a cron-job.

When working with the LaTeX-source in the git repository, it is
convenient to compile with the flag `-output-directory /tmp/` to not
pollute the source dir.

- [Centering figure that is wider than `\textwidth`](http://tex.stackexchange.com/questions/16582/center-figure-that-is-wider-than-textwidth)

### Documentclasses

#### Revtex -- 2-column report style

- <https://authors.aps.org/revtex4/>
- <https://authors.aps.org/revtex4/auguide4-1.pdf>


### Other useful links
- [Typesetting tables with LaTeX](http://www.tug.org/TUGboat/tb28-3/tb90hoeppner.pdf)
- <http://qwone.com/~jason/latex/>
