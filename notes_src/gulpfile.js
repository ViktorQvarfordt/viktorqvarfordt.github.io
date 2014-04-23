var fs = require('fs');
var rimraf = require('rimraf');
var gulp = require('gulp');
var markdown = require('gulp-markdown');
var Handlebars = require('handlebars');
var tap = require('gulp-tap');

gulp.task('default', function() {

  rimraf.sync('../notes');

  var template = Handlebars.compile(fs.readFileSync('template.hbs').toString());

  return gulp.src('pages/**/*.md')
    .pipe(markdown())
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