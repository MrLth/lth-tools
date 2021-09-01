/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-01 07:41:07
 * @LastEditTime: 2021-09-01 08:24:06
 * @Description: file content
 */
const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');

gulp.task('clean', async function () {
  await del('dist/**');
});

gulp.task('cjs', function () {
  const tsProject = ts.createProject('tsconfig.json', {
    module: 'CommonJS',
  });
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(
      babel({
        configFile: './.babelrc',
      }),
    )
    .pipe(gulp.dest('dist/lib/'));
});

gulp.task('es', function () {
  const tsProject = ts.createProject('tsconfig.json', {
    module: 'ESNext',
  });
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(
      babel({
        configFile: './.babelrc',
      }),
    )
    .pipe(gulp.dest('dist/es/'));
});

gulp.task('declaration', function () {
  const tsProject = ts.createProject('tsconfig.json', {
    declaration: true,
    emitDeclarationOnly: true,
  });
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest('dist/es/')).pipe(gulp.dest('dist/lib/'));
});

gulp.task('packageJson', async function () {
  await gulp.src('./package.json').pipe(gulp.dest('./dist'));
});

exports.default = gulp.series('clean', 'cjs', 'es', 'declaration', 'packageJson');