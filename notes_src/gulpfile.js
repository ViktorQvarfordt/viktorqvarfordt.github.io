var fs = require('fs');
var rimraf = require('rimraf');
var wrench = require('wrench');
var gulp = require('gulp');
var markdown = require('gulp-markdown');
var Handlebars = require('handlebars');
var tap = require('gulp-tap');

gulp.task('default', function() {

  rimraf.sync('../notes');
  fs.mkdirSync('../notes');
  wrench.copyDirRecursive('assets', '../notes/assets', function(err) { if (err) throw err; });

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