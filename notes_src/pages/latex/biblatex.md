# Biblatex

```tex
% document.tex
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

## References

- http://mirrors.ctan.org/macros/latex/contrib/biblatex/doc/biblatex.pdf
- http://www.ctan.org/tex-archive/macros/latex/exptl/biblatex/doc/examples
- http://tex.stackexchange.com/questions/13509/biblatex-for-idiots
- http://tex.stackexchange.com/questions/5091/what-to-do-to-switch-to-biblatex
