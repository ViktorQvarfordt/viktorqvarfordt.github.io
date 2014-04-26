# Controlling floats

## `\FloatBarrier` from placeins

Using the [placeins](http://ctan.uib.no/macros/latex/contrib/placeins/placeins-doc.pdf) package to force floats (figures and tables) to only appear inside the (sub)sections where they are defined:

```latex
  % Force floats inside respective (sub)sections.
  \usepackage[section]{placeins}
  \let\oldsubsection\subsection
  \renewcommand\subsection{\FloatBarrier\oldsubsection}
```

## `\clearpage`

The command `\clearpage` will not only start a new page, but will also force any unset floats to be set before the page break. Read [more about `\clearpage`](http://tex.stackexchange.com/a/281).

## I want my float *exactly here*!

Consult [this](http://en.wikibooks.org/wiki/LaTeX/Floats,_Figures_and_Captions#Figures) resource, the shown table applies for any float, not only figure.

[Often](http://tex.stackexchange.com/a/1527) it's satifsying to specify all possible placement options `!htbp`.