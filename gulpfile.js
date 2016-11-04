'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const named = require('vinyl-named');
const sourcemaps = require('gulp-sourcemaps');
const through = require('through2');
const webpack = require('webpack-stream');
const nodemon = require('gulp-nodemon');
const imagemin = require('gulp-imagemin');
const notify = require("gulp-notify");
var exec = require('child_process').exec;

const MAIN_SCRIPT = 'resources/js/main.js';
const MAIN_STYLE = 'resources/sass/main.scss';
const SCRIPTS_DEST = 'public/js';
const STYLES_DEST = 'public/css';

/**
 * STYLES COMPILATION
 */
gulp.task('sass', () => {
    return gulp.src(MAIN_STYLE)
        .pipe(named())
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: 'node_modules/bootstrap-sass/assets/stylesheets'}).on('error', sass.logError)) 
        .pipe(sourcemaps.write('.'))

        .pipe(gulp.dest(STYLES_DEST))
        .pipe(notify("Styles compiled!"));
});

/**
 * SCRIPTS COMPILATION
 */
gulp.task('scripts', () => {
    return gulp.src(MAIN_SCRIPT)
        .pipe(named())
        .pipe(webpack(require('./webpack.config')))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(through.obj(function (file, enc, cb) {
            // Dont pipe through any source map files as it will be handled
            // by gulp-sourcemaps
            var isSourceMap = /\.map$/.test(file.path);
            if (!isSourceMap) this.push(file);
            cb();
        }))
        //.pipe(gulpif(argv.production, uglify())) // Minify only if --production exists
        //.pipe(gulpif(argv.production, rename({suffix: '.min'}))) // Add .min suffix only if --production
        .pipe(notify("Scripts compiled"))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(SCRIPTS_DEST));
});

/**
 * Copy Fonts from node_modules to the public folder
 */
gulp.task('fonts', function() {
    gulp.src('./node_modules/bootstrap-sass/assets/fonts/bootstrap/*')
        .pipe(gulp.dest('public/fonts/bootstrap'));

    gulp.src('./node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('public/fonts/font-awesome'));
});

/**
 * Copy Images to the public folder
 */
gulp.task('images', function() {
    gulp.src('./resources/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images'));
});

/**
 * Gulp Nodemon!
 * It watches all files from backend
 */
gulp.task('nodemon', () => {
    nodemon({ script: './bin/www'
        , ignore: ['./public', './node_modules']
        , watch: ['app.js', './server']
        , ext: 'js scss'});
        //.on('start', ['scripts', 'sass', 'fonts']);
});

/**
 * This task will populate the database by calling and executing DataBaseSeeder.js file
 */
gulp.task('seed', (cb) => {
    exec('node ./database/seeds/DataBaseSeeder.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    })
});

/**
 * Default
 */
gulp.task('default', ['sass', 'scripts', 'fonts', 'images']);