var fs = require('fs');
var expandTilde = require('expand-tilde');
var gulp = require('gulp');
var Handlebars = require('handlebars');
var tap = require('gulp-tap');
var rimraf = require('rimraf');
var hljs = require('highlight.js');
var marked = require('marked');
var mkToc = require('markdown-toc');

var renderer = new marked.Renderer();

function slugify(str) {
  return str.toLowerCase().replace(/[^\w]+/g, '-').replace(/-$/, '');
}

renderer.heading = function(text, level, raw) {
  return '<h' + level + ' id="' + this.options.headerPrefix + slugify(raw) + '">' + text + '</h' + level + '>\n';
};

marked.setOptions({
  renderer: renderer,
  langPrefix: '',
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
          slugify: slugify
        }).content;
      } catch(e) {
        toc = e.toString();
      }
      file.contents = new Buffer(file.contents.toString().replace('[TOC]', toc));
    }))
    .pipe(tap(function(file) {
      var m;
      var fileContent;
      s = file.contents.toString()
      while (m = s.match('<<include +([^>]+)>>')) {
        fileContent = fs.readFileSync(expandTilde(m[1])).toString()
        s = s.replace(m[0], () => fileContent); // Use a funciton to avoid $ substitution
      }
      file.contents = new Buffer(s);
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
