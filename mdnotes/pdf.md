# Manipulating pdf files

`pdftk` does merging, splitting, meta data manipulations and other fancy things.

```
pdftk file1.pdf file2.pdf cat output mergedfile.pdf
```

`pdfcrop` removes margins.


## pdf to svg

```
pdfcrop --hires input.pdf output.pdf && pdf2svg output.pdf output.svg
```

See also [this page](latex/minimal) for notes on making minimal pdf documents with latex (no margins, page numbers etc).


## Extract images from pdf

[Inkscape](http://inkscape.org/) is the solution to most things dealing with vector graphics (which is what pdf's mostly are), although it can also be used to extract ordinary images from pdfs.

1. Open the PDF in Inkscape.
2. Select and copy the image.
3. Past the image into a new Inkscape document.
4. File -> Document Properties...
5. Resize page to content... -> Resize page to drawing or selection
6. Save as... PDF (Best to use PDF when including images in LaTeX)


## PDF to SVG

Inkscape.
