
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
    const tsRes = src(path)                                                                 // Reading the file 
        .pipe(tsProject())                                                                  // TypeScript -> JavaScript
        .on('error', console.log);                                                          // For oops caught a mistake 🙀

    tsRes.js.pipe(gulpif(wdsOpt.middle, dest('.')))                                         // Saving an intermediate file
        .pipe(gulpif(file => file.path.match(/\\app\\/) && wdsOpt.mini, terser(tersOpt)))   // Javascript minifier and ... what else you want
        .pipe(gulpif(!!wdsOpt.extjs, gulprename({ extname: wdsOpt.extjs })))                // Output file extension
        .pipe(gulpif(file => file.path.match(/\\app\\/), gulprename(                        // Checking and setting the path
            dir => dir.dirname = dir.dirname.replace(wdsOpt.dirFrom, wdsOpt.dirTo))))
        .pipe(dest('.'))                                                                    // Saving the file
        .on('end', () => {                                                                  // Updating the debugger
            // console.log('end')
        });

    if (wdsOpt.dts) tsRes.dts.pipe(dest('.'));                                              // Saving the d.ts file

    // To see something happen
    console.log('\x1b[36m%s\x1b[0m', path, 'processed');

}
