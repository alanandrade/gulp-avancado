
//https://css-tricks.com/gulp-for-beginners/

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	stylus = require('gulp-stylus'),
	cleanCSS = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync').create();
	

gulp.task('sass', function(){
	return gulp.src('dist/css/style.css')
	.pipe (sass())
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(autoprefixer())
	.pipe(concat('style.min.css'))
	.pipe(gulp.dest('dist/css/'))
	.pipe(browserSync.reload({
		stream: true
	}))
});


gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: 'dist'
		},
			port: 8080,
   			startPath: 'index.html',
	});
});


gulp.task('watch', ['browserSync', 'sass' /*'stylus'*/], function(){
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/stylus/**/*.styl', ['stylus']);
	// Recarrega o navegador sempre que os arquivos HTML ou JS forem alterados
	gulp.watch('dist/*.html', browserSync.reload); 
  	gulp.watch('dist/js/**/*.js', browserSync.reload);
  	gulp.watch('dist/css/**/*.css', browserSync.reload);
  	gulp.watch('dist/css/**/*.min', browserSync.reload);
});