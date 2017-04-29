# Manipulating pdf files

`pdftk` does merging, splitting, meta data manipulations and other fancy things.

```
pdftk file1.pdf file2.pdf cat output mergedfile.pdf
```

`pdfcrop` removes margins.


## pdf to img

See also [this page](latex/minimal) for notes on making minimal pdf documents with latex (no margins, page numbers etc).

### crop

```
pdfcrop --hires document.pdf document-cropped.pdf
```

(The option `--hires` makes the cropping more precies, it has nothing to do with pdf resolution, the pdf is kept as-is except the removal of margins.)

### png

```
convert -density 130 document.pdf document.png
```

### svg

```
pdf2svg output.pdf output.svg
```

or Inkscape.



## Extract images from pdf

[Inkscape](http://inkscape.org/) is the solution to most things dealing with vector graphics (which is what pdf's mostly are), although it can also be used to extract ordinary images from pdfs.

1. Open the PDF in Inkscape.
2. Select and copy the image.
3. Past the image into a new Inkscape document.
4. File -> Document Properties...
5. Resize page to content... -> Resize page to drawing or selection
6. Save as... PDF (Best to use PDF when including images in LaTeX)
