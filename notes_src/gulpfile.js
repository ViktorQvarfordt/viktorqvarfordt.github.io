var fs = require('fs');
var gulp = require('gulp');
var markdown = require('gulp-markdown');
var Handlebars = require('handlebars');
var tap = require('gulp-tap');
var rimraf = require('rimraf');
var hljs = require('highlight.js');

gulp.task('default', function() {

  rimraf.sync('../notes');

  var template = Handlebars.compile(fs.readFileSync('template.hbs').toString());

  return gulp.src('pages/**/*.md')
    .pipe(markdown({
      langPrefix: '',
      highlight: function (code, lang) {
        if (lang)
          return hljs.highlight(lang, code).value;
        // else
        //   return hljs.highlightAuto(code).value;
      }
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