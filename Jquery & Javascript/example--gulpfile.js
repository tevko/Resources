// Include gulp
var gulp = require('gulp'), 
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin');

// autoprefix Task
gulp.task('autoprefix', function() {
    gulp.src('library/css/*.css')
    .pipe(prefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('library/css'));
});

//browser sync Task
gulp.task('browser-sync', function() {
    browserSync.init(['library/css/*.css', '*.php','library/js/*.js']);
});

//image optimization

gulp.task('images', function() {
  return gulp.src('library/img/*.{png,jpg,gif}')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('library/img'));
});

// Default Task
gulp.task('default', function(){
    gulp.run('browser-sync');
    gulp.watch('library/img/*.{png,jpg,gif}', function(){
	    gulp.run('images');
	});
    gulp.watch('library/css/*.css', function(){
	    gulp.run('autoprefix');
	});
});


//cd into project dir and run NPM install theplugin --save-dev to add to project and package.json file e.g) npm install gulp --save-dev