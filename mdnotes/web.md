# Web

<!-- toc -->


# [JS](js)
# [Node.js](node)


# HTML

## Mobile

Make page behave nicely on mobile devices:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
```
- Miscellaneous useful information http://www.html5rocks.com/en/mobile/


## MathJax

Force LaTeX font and use `$` for equations.

```html
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
  MathJax.Hub.Config({
    messageStyle: 'none',
    tex2jax: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      processEscapes: true
    },
    'HTML-CSS': {
      availableFonts: ['TeX'],
      linebreaks: { automatic: true, width: "container" }
    }
  });
</script>
```

Re-render

```js
(function reRender() {
  window.setTimeout(reRender, 1000)
  window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub])
})()
```

## KaTeX

[KaTeX](https://github.com/Khan/KaTeX) renders much faster than MathJax. However, KaTeX (still) has some [limitations](http://meta.mathoverflow.net/questions/1908/katex-vs-mathjax) such as not supporting `align`.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.6.0/katex.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.6.0/katex.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.6.0/contrib/auto-render.min.js"></script>
<script>
 renderMathInElement(document.body, {
  delimiters: [
    {left: "$$", right: "$$", display: true},
    {left: "\\[", right: "\\]", display: true},
    {left: "$", right: "$", display: false},
    {left: "\\(", right: "\\)", display: false}
  ]
 });
</script>
```


## CSS

### Flexbox

```css
.wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}
```

- http://demo.agektmr.com/flexbox/
- https://gist.github.com/cimmanon/727c9d558b374d27c5b6

### Animations and transitions

- http://css3.bradshawenterprises.com/

### Clearfix

http://nicolasgallagher.com/micro-clearfix-hack/, this is also whats used by [twitter bootstrap](https://github.com/twbs/bootstrap/blob/master/less/mixins.less).


## Servers

[node](node)
[apache](apache)
[nginx](nginx)
