const { src, dest } = require('gulp');
const { paths } = require('./settings');
const browserSync = require('browser-sync');

function localization() {
  // Используем glob pattern для выбора всех JSON файлов из папки
  return src(`${paths.src.localization}/*.json`)
    .pipe(dest(paths.build.localization))
    .pipe(browserSync.reload({ stream: true }));
}

module.exports = localization;
