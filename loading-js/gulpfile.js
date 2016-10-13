(function() {

    var baseDir = __dirname + '/app/index.html';

    var gulp = require('gulp');
    var sonar = require('gulp-sonar');
    var concat = require('gulp-concat');
    var minify = require('gulp-minify');
    var packageJson = require('./package.json');
    var embedTemplates = require('gulp-angular-embed-templates');
    var uglify = require("gulp-uglify");
    var minifyCss = require('gulp-minify-css');
    var gulpif = require('gulp-if');
    var bump = require('gulp-bump');


    gulp.task('compress', function() {
        gulp.src('app/**/*.js')
            .pipe(gulpif('*.js', embedTemplates({
                basePath: __dirname + '/'
            })))
            .pipe(concat('loading.js'))
            .pipe(minify({
                'mangle': false
            }))
            .pipe(gulp.dest('dist/loading'));

        gulp.src('app/assets/loading.css')
            .pipe(minifyCss())
            .pipe(gulp.dest('dist/loading'));
    });


    gulp.task('upgrade-version', function(value) {
        gulp.src('./package.json')
            .pipe(bump({
                version: process.env.npm_config_value
            }))
            .pipe(gulp.dest('./'));
    });

    gulp.task('sonar', function() {
        var options = {
            sonar: {
                host: {
                    url: process.env.npm_config_sonarUrl,
                },
                jdbc: {
                    url: process.env.npm_config_sonarDatabaseUrl,
                    username: process.env.npm_config_sonarDatabaseUsername,
                    password: process.env.npm_config_sonarDatabasePassword
                },
                projectKey: 'sonar:loading-js',
                projectName: 'loading-js',
                projectVersion: packageJson.version,
                // comma-delimited string of source directories
                sources: 'app',
                language: 'js',
                sourceEncoding: 'UTF-8',
                exec: {
                    maxBuffer: 1024 * 1024
                },
                javascript: {
                    lcov: {
                        reportPath: 'target/test-coverage/report-lcov/lcov.info'
                    }
                }
            }
        };

        return gulp.src('thisFileDoesNotExist.js', {
                read: false
            })
            .pipe(sonar(options));
    });
}());
