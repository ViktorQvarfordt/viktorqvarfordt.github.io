# HTML

## Mobile

Make page behave nicely on mobile devices:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
```
- Miscellaneous useful information http://www.html5rocks.com/en/mobile/


## MathJax

Force LaTeX font and use $ for equations.

```html
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
  MathJax.Hub.Config({
    messageStyle: 'none',
    tex2jax: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      processEscapes: true
    },
    'HTML-CSS': {
      availableFonts: ['TeX']
    }
  });
</script>
```



