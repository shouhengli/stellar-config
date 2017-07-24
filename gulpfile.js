const gulp = require('gulp');
const webpack = require('gulp-webpack');
const named = require('vinyl-named');
const del = require('del');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');

const paths = {
  src: {
    client: {
      root: 'src/client/',
      js: 'src/client/**/*.js',
      sass: 'src/client/**/*.scss',
    },
    server: 'src/server/**/*',
  },
  dest: {
    root: 'dist/',
    client: 'dist/public/',
    server: 'dist/',
  },
};

gulp.task('client-clean', () => {
  return del(paths.dest.client);
});

gulp.task('client-js', ['client-clean'], () => {
  return gulp.src(paths.src.client.js)
             .pipe(eslint())
             .pipe(eslint.format())
             .pipe(eslint.failAfterError())
             .pipe(named())
             .pipe(webpack({
               module: {
                 rules: [
                   {
                     test: /\.jsx?$/,
                     loader: 'babel-loader',
                   },
                 ],
               },
             }))
             .pipe(gulp.dest(paths.dest.client));
});

gulp.task('client-sass', ['client-clean'], () => {
  return gulp.src(paths.src.client.sass)
             .pipe(sass().on('error', sass.logError))
             .pipe(gulp.dest(paths.dest.client));
});

gulp.task('client', ['client-js', 'client-sass']);

gulp.task('server', () => {
  return del(paths.dest.server).then(() =>
    gulp.src(paths.src.server)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(gulp.dest(paths.dest.server))
  );
});

gulp.task('default', ['client', 'server']);

gulp.task('clean', () => del(paths.dest.root));

gulp.task('watch', () => {
  gulp.watch(paths.src.client.root, ['client']);
  gulp.watch(paths.src.server, ['server']);
});
