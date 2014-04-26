# Code highlighting with minted

<https://code.google.com/p/minted/>

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
