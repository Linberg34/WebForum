const gulp = require('gulp');
const less = require('gulp-less');


const paths = {
    styles: {
        src: 'public/assets/css/less/main.less', 
        dest: 'public/assets/css' 
    }
};

function styles() {
    return gulp
        .src(paths.styles.src)
        .pipe(less())
        .on('error', console.error) // Ловим ошибки
        .pipe(gulp.dest(paths.styles.dest))
        .on('end', () => console.log('CSS скомпилирован в:', paths.styles.dest));
}

function watchFiles() {
    gulp.watch('public/assets/css/less/**/*.less', styles); 
}

exports.styles = styles;
exports.watch = gulp.series(styles, watchFiles);
