# User scripts

Consult [this](http://wiki.greasespot.net/Metadata_Block) for how to customize the meta block, in particular the include and exclude [rules](http://wiki.greasespot.net/Include_and_exclude_rules).

[TOC]

## MathJax on any website

```js
// ==UserScript==
// @name        MathJax Trello
// @description Apply Mathjax to Trello
// @include     https://trello.com/*
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
              // Run mathjax every second (the overhead is very low).
              + '(function doMathJax() {'
              + '  window.setTimeout(doMathJax, 1000);'
              + '  window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);'
              + '})();';
  document.getElementsByTagName("head")[0].appendChild(script);
} else {
  MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}
```
