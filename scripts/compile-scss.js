const sass = require("sass");
const fs = require("fs");

function get_suffix(filepath) {
    return filepath.substring(filepath.lastIndexOf('.'), filepath.length) || filepath;
}

function check_suffix(filepath, suffix) {
    const actual_suffix = get_suffix(filepath);
    if (actual_suffix != suffix) {
        throw new Error(`Expected ${suffix} file, got ${filepath}`);
    }
}

function compile(infile, outfile) {
    check_suffix(infile, ".scss");
    check_suffix(outfile, ".css");
    fs.writeFileSync(outfile, sass.compile(infile).css)
}

const [node, script, infile, outfile] = process.argv;
console.log(`Compiling ${infile} to ${outfile}...`);
compile(infile, outfile);