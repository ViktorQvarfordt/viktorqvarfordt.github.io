echo "\paper {
  indent = 0\mm
  line-width = 200\mm
  oddHeaderMarkup = \"\"
  evenHeaderMarkup = \"\"
  oddFooterMarkup = \"\"
  evenFooterMarkup = \"\"
}

\header {
  tagline = \"\"  % removed
}

{
  \override Staff.TimeSignature #'stencil = ##f
  $1
}
" > note.ly

lilypond note.ly

pdfcrop --hires note.pdf
pdf2svg note-crop.pdf ../img/$1.svg
