var fs = require('fs');
var gulp = require('gulp');
var Handlebars = require('handlebars');
var tap = require('gulp-tap');
var rimraf = require('rimraf');
var hljs = require('highlight.js');
var marked = require('marked');
var mkToc = require('markdown-toc');

marked.setOptions({
  // langPrefix: '',
  smartypants: true,
  highlight: function (code, lang) {
    if (lang)
      return hljs.highlight(lang, code).value;
    // else
    //   return hljs.highlightAuto(code).value;
  }
});

gulp.task('default', function() {

  rimraf.sync('../notes');

  var template = Handlebars.compile(fs.readFileSync('template.hbs').toString());

  return gulp.src('pages/**/*.md')
    .pipe(tap(function(file) {
      var toc;
      try {
        toc = mkToc(file.contents.toString(), {
          firsth1: false,
          slugify: function(str) {
            return str.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          }
        }).content;
      } catch(e) {
        toc = e.toString();
      }
      file.contents = new Buffer(file.contents.toString().replace('[TOC]', toc));
    }))
    .pipe(tap(function(file) {
      file.contents = new Buffer(marked(file.contents.toString()));
      file.path = file.path.replace(/md$/, 'html');
    }))
    .pipe(tap(function(file) {
      file.contents = new Buffer(template({
        content: file.contents.toString()
      }));
    }))
    .pipe(gulp.dest('../notes'));
});

gulp.task('watch', function() {
  gulp.watch('pages/**/*.md', ['default']);
  gulp.watch('assets/**/*', ['default']);
});
