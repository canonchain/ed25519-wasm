const {series} = require('gulp');

function wasm(cb) {
    let glob, files, functions, optimize, command, exec;
    glob = require('glob');
    exec = require('child_process').exec;
    files = glob.sync('ed25519/src/*.c').join(' ');
    functions = JSON.stringify(['_malloc', '_free', '_ed25519_create_keypair', '_ed25519_sign', '_ed25519_verify']);
    optimize = "-Oz --llvm-lto 1 --closure 1 -s NO_EXIT_RUNTIME=1 -s NO_FILESYSTEM=1 -s EXPORTED_RUNTIME_METHODS=[] -s DEFAULT_LIBRARY_FUNCS_TO_INCLUDE=[]";
    command = "emcc src/ed25519.c " + files + " --post-js src/bytes_allocation.js -o src/ed25519.js -s MODULARIZE=1 -s 'EXPORT_NAME=\"__ed25519wasm\"' -s EXPORTED_FUNCTIONS='" + functions + "' -s WASM=1 " + optimize;
    exec(command, function (error, stdout, stderr) {
        if (stdout) {
            console.log(stdout);
        }
        if (stderr) {
            console.error(stderr);
        }
        cb(error);
    })
}
    function minify() {
        let gulp, rename, uglify
        gulp = require('gulp');
        rename = require('gulp-rename');
        const babel = require('gulp-babel');
        uglify = require('gulp-uglify');
        return gulp.src("src/index.js")
            .pipe(babel())
            .pipe(uglify()).pipe(rename({
                suffix: '.min'
            })).pipe(gulp.dest('src'));
    }

    exports.build = series(wasm,minify);