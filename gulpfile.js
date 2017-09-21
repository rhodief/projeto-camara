var gulp = require('gulp'), imagemin = require('gulp-imagemin'), clean = require('gulp-clean'), minJs = require('gulp-uglify'), minCss = require('gulp-cssnano'); minHtml = require('gulp-htmlmin');

const DEST = 'public-dist';
const SRC = 'public';

gulp.task('copy', ['clean'], function(){
    return gulp.src(SRC + '/**/*')
        .pipe(gulp.dest(DEST));
});

gulp.task('clean', function(){
    return gulp.src(DEST)
        .pipe(clean());
});

gulp.task('build-img', ['copy'], function(){
    return gulp.src(SRC + '/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ]
        }))
        .pipe(gulp.dest(DEST + '/img'));
})

/* Minificação */
gulp.task('minify-js', ['copy'], function() {
    return gulp.src(DEST + '/**/*.js')
      .pipe(minJs())
      .pipe(gulp.dest(DEST))
  });
  
  gulp.task('minify-css', ['copy'], function() {
    return gulp.src(DEST + '/**/*.css')
      .pipe(minCss({safe: true}))
      .pipe(gulp.dest(DEST))
  });
  
  gulp.task('minify-html', ['copy'], function() {
    return gulp.src(SRC + '/**/*.html')
      .pipe(minHtml({collapseWhitespace: true}))
      .pipe(gulp.dest(DEST))
  });

  gulp.task('build-all', ['minify-js', 'minify-css', 'minify-html', 'build-img']);