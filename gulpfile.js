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
      jsEntries: ['src/client/index.js', 'src/client/force-layout-worker.js'],
      sass: 'src/client/**/*.scss',
      staticFiles: [
        'src/client/**/*.html',
        'node_modules/font-awesome/css/font-awesome.min.css'
      ],
      fontFiles: 'node_modules/font-awesome/fonts/*'
    },
    server: {
      js: ['src/server/**/*.js', '!src/server/coverage/**/*'],
      staticFiles: [
        'src/server/**/*.json',
        'src/server/**/*.yaml',
        'package.json',
        'yarn.lock'
      ]
    }
  },
  dest: {
    root: 'dist/',
    client: {
      js: 'dist/public/',
      sass: 'dist/public/',
      staticFiles: 'dist/public/',
      fontFiles: 'dist/public/fonts/'
    },
    server: {
      js: 'dist/',
      staticFiles: 'dist/'
    }
  }
};

gulp.task('client-js-lint', () =>
  gulp
    .src(paths.src.client.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

const fs = require('fs');
const babelrc = JSON.parse(fs.readFileSync('.babelrc', { encoding: 'utf8' }));

gulp.task('client-js', ['client-js-lint'], () =>
  gulp
    .src(paths.src.client.jsEntries)
    .pipe(named())
    .pipe(
      gulpWebpack(
        {
          module: {
            rules: [
              {
                test: /\.jsx?$/,
                use: {
                  loader: 'babel-loader',
                  options: babelrc
                }
              }
            ]
          }
        },
        webpack
      )
    )
    .pipe(gulp.dest(paths.dest.client.js))
);

gulp.task('client-sass', () =>
  gulp
    .src(paths.src.client.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dest.client.sass))
);

gulp.task('client-static-files', () =>
  gulp
    .src(paths.src.client.staticFiles)
    .pipe(gulp.dest(paths.dest.client.staticFiles))
);

gulp.task('client-font-files', () =>
  gulp
    .src(paths.src.client.fontFiles)
    .pipe(gulp.dest(paths.dest.client.fontFiles))
);

gulp.task('server-js-lint', () =>
  gulp
    .src(paths.src.server.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('server-js', ['server-js-lint'], () =>
  gulp.src(paths.src.server.js).pipe(gulp.dest(paths.dest.server.js))
);

gulp.task('server-static-files', () =>
  gulp
    .src(paths.src.server.staticFiles)
    .pipe(gulp.dest(paths.dest.server.staticFiles))
);

gulp.task('server', ['server-static-files', 'server-js']);

gulp.task('client', [
  'client-static-files',
  'client-font-files',
  'client-js',
  'client-sass'
]);

gulp.task('default', ['client', 'server']);

gulp.task('clean', () => del(paths.dest.root));

gulp.task('watch', () => {
  gulp.watch(paths.src.client.js, ['client-js']);
  gulp.watch(paths.src.client.sass, ['client-sass']);
  gulp.watch(paths.src.client.staticFiles, ['client-static-files']);
  gulp.watch(paths.src.client.fontFiles, ['client-font-files']);
  gulp.watch(paths.src.server.js, ['server-js']);
  gulp.watch(paths.src.server.staticFiles, ['server-static-files']);
});
