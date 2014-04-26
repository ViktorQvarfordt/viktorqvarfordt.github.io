# Minimal pdf document

After having tested several methods the conclusion is that the `standalone` package provides the most satisfactory result, also with less effort.

If this package is not available (it is rather new, and thus not included in the default set of packages, but should be easily installed) you can resort to using the `pdfcrop` command.

## `standalone` package

The result of the folowing document is a pdf with no margins and no page breaks. The size of the document is adapted exactly to the size of your content (no page numbers etc). The `varwidth` parameter makes line-break behave normally.

```latex
\documentclass[varwidth]{standalone}
\begin{document}
  Hello minimal world!
\end{document}
```

## `pdfcrop` command

This is a command (included in the texlive latex distribution for linux) that crops margins from pdf documents. The command does not remove page breaks. You have to suppress page numbers explicitly.

```latex
  \documentclass[a4paper]{article}
  \thispagestyle{none}
  \begin{document}
    Hello cropped world!
  \end{document}
  ```

After compiling the document, simply run the command `pdfcrop` on the resulting pdf.