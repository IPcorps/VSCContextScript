
// A few 'require'
const { src, dest } = require('gulp'),
    ts = require('gulp-typescript'),
    terser = require('gulp-terser'),
    gulpif = require('gulp-if'),
    gulprename = require("gulp-rename");

// Preparation for acceleration
let wdsOpt = require('./config-wds.js').ts,
    tsOpt = require('./config/config-ts.js'),
    tersOpt = require('./config/config-ters.js');

let tsProject = ts.createProject(tsOpt);

exports.change = path => {

    // TypeScript processing
    src(path)                                                                               // Reading the file 
        .pipe(tsProject())                                                                  // TypeScript -> JavaScript
        .on('error', console.log)                                                           // For oops caught a mistake 🙀
        .pipe(gulpif(wdsOpt.middle, dest('.')))                                             // Saving an intermediate file
        .pipe(gulpif(wdsOpt.mini, terser(tersOpt)))                                         // Javascript minifier and ... what else you want
        .pipe(gulpif(wdsOpt.extjs, gulprename({ extname: wdsOpt.extjs })))                  // Output file extension
        .pipe(gulpif(!!wdsOpt.dirFrom, gulprename(                                          // Checking and setting the path
            dir => dir.dirname = dir.dirname.replace(wdsOpt.dirFrom, wdsOpt.dirTo))))
        .pipe(dest('.'));                                                                   // Saving the file

    // To see something happen
    console.log('\x1b[36m%s\x1b[0m', path, 'processed');

}
