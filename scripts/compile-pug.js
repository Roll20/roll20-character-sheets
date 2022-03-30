const pug = require("pug");
const fs = require("fs");

function get_suffix(filepath) {
    return filepath.substring(filepath.lastIndexOf('.'), filepath.length) || filepath;
}

function parent(filepath) {
    return filepath.substring(0, filepath.lastIndexOf('/') + 1) || "";
}

function with_suffix(filepath, suffix) {
    const path = filepath.substring(0, filepath.lastIndexOf('/') + 1) || "";
    const filename = filepath.substring(filepath.lastIndexOf('/') + 1, filepath.length) || filepath;
    const stem = filename.substring(0, filename.lastIndexOf('.')) || filename;
    // const suffix = filename.substring(filename.lastIndexOf('.'), filename.length) || "";
    return `${path}${stem}${suffix}`
}


function check_suffix(filepath, suffix) {
    const actual_suffix = get_suffix(filepath);
    if (actual_suffix != suffix) {
        throw new Error(`Expected ${suffix} file, got ${filepath}`);
    }
}

function compile(infile, outfile) {
    check_suffix(infile, ".pug");
    check_suffix(outfile, ".html");
    fs.writeFileSync(
        outfile,
        pug.renderFile(infile, {
            "require": require,
            "sourcefile": infile,
            "sourcedir": parent(infile),
        })
    )
}

const [node, script, infile, outfile] = process.argv;
console.log(`Compiling ${infile} to ${outfile}...`);
compile(infile, outfile);