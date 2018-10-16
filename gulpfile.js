/*
 * @Author: 黄彦松 
 * @Date: 2018-10-15 08:46:03 
 * @Last Modified by: 黄彦松
 * @Last Modified time: 2018-10-15 10:01:32
 */


var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var path = require('path');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');

var data = require('./mork/data.json');

gulp.task('devCss', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    return gulp.watch('./src/sass/*.scss', gulp.series('devCss'))
})

gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8080,
            middleware: function(req, res) {
                var pathname = url.parse(req.url).pathname;
                console.log(1, pathname);
                if (pathname == '/favicon.ico') {
                    res.end();
                    return;
                }

                if (pathname == '/api/data') {
                    res.end(JSON.stringify(data));
                } else if (pathname == '/api/tj') {
                    var arr = [];
                    req.on('data', function(chunk) {
                        arr.push(chunk);
                    })
                    req.on('end', function() {
                        var Data = querystring.parse(Buffer.concat(arr).toString());
                        data.unshift(Data);
                        fs.writeFileSync('./mork/data.json', JSON.stringify(data));
                        res.end(JSON.stringify({ code: 1 }))
                    })
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})

gulp.task('dev', gulp.series('devCss', 'server', 'watch'));