# User scripts

[TOC]

## MathJax on any website (trello)

```js
// ==UserScript==
// @name        MathJax Trello
// @description Apply Mathjax to Trello
// @namespace   https://trello.com/*
// @grant       none
// ==/UserScript==

if (window.MathJax === undefined) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
  script.text = 'MathJax.Hub.Config({'
              + '  messageStyle: "none",'
              + '  tex2jax: {'
              + '    inlineMath: [["$", "$"], ["\\\\(", "\\\\)"]],'
              + '    processEscapes: true'
              + '  },'
              + '  "HTML-CSS": {'
              + '    availableFonts: ["TeX"]'
              + '  }'
              + '});'
              + '// Run mathjax every second (the overhead is very low).'
              + '(function doMathJax() {'
              + '  window.setTimeout(doMathJax, 1000);'
              + '  window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);'
              + '})();';
  document.getElementsByTagName("head")[0].appendChild(script);
} else {
  MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}
```
