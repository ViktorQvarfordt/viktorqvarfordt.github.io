# Web

[TOC]


# [JS](js)


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



## CSS

### Flexbox

- http://demo.agektmr.com/flexbox/
- https://gist.github.com/cimmanon/727c9d558b374d27c5b6

### Animations and transitions

- http://css3.bradshawenterprises.com/

### Clearfix

http://nicolasgallagher.com/micro-clearfix-hack/, this is also whats used by [twitter bootstrap](https://github.com/twbs/bootstrap/blob/master/less/mixins.less).
