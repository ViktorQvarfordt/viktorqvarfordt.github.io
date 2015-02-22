# Mathematics

## Formatting theorems, definitions, etc.

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

## Formatting homework problems

```tex
\newcommand{\problem}[3]{%
\section*{#1}%
{\itshape#2}%
\ifvmode\else\\[1em]\fi%
\noindent#3}
```

## Equation numbering

```tex
\numberwithin{equation}{section}
```

## Macros

```tex
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
