const gulp = require('gulp');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const named = require('vinyl-named');
const del = require('del');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');

const paths = {
  src: {
    client: {
      all: 'src/client/**/*',
      js: ['src/client/**/*.js', 'src/client/**/*.jsx'],
      jsEntries: ['src/client/index.js'],
      sass: 'src/client/**/*.scss',
      staticFiles: ['src/client/**/*.html'],
    },
    server: {
      all: 'src/server/**/*',
      js: 'src/server/**/*.js',
      staticFiles: [
        'src/server/**/*.json',
        'package.json',
        'yarn.lock',
      ],
    },
  },
  dest: {
    root: 'dist/',
    client: 'dist/public/',
    server: 'dist/',
  },
};

gulp.task('client-clean', () => del(paths.dest.client));

gulp.task('client-js-lint', () =>
  gulp.src(paths.src.client.js)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
);

gulp.task('client-js', ['client-clean', 'client-js-lint'], () =>
  gulp.src(paths.src.client.jsEntries)
      .pipe(named())
      .pipe(gulpWebpack(
        {
          module: {
            rules: [
              {
                test: /\.jsx?$/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['env', 'react'],
                  },
                },
              },
            ],
          },
        },
        webpack
      ))
      .pipe(gulp.dest(paths.dest.client))
);

gulp.task('client-sass', ['client-clean'], () =>
  gulp.src(paths.src.client.sass)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(paths.dest.client))
);

gulp.task('client-static-files', ['client-clean'], () =>
  gulp.src(paths.src.client.staticFiles).pipe(gulp.dest(paths.dest.client))
);

gulp.task('client', ['client-static-files', 'client-js', 'client-sass']);

gulp.task('server-clean', () => del(paths.dest.server));

gulp.task('server-js', ['client-clean'], () =>
  gulp.src(paths.src.server.js)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
      .pipe(gulp.dest(paths.dest.server))
);

gulp.task('server-static-files', ['client-clean'], () =>
  gulp.src(paths.src.server.staticFiles).pipe(gulp.dest(paths.dest.server))
);

gulp.task('server', ['server-static-files', 'server-js']);

gulp.task('default', ['client', 'server']);

gulp.task('clean', () => del(paths.dest.root));

gulp.task('watch', () => {
  gulp.watch(paths.src.client.all, ['client']);
  gulp.watch(paths.src.server.all, ['server']);
});
