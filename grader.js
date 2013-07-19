#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var sys = require('util'),
    rest = require('restler');

var loadChecks = function(checkfile){
	return JSON.parse(fs.readFileSync(checkfile));
}

var checkHtmlFile = function(htmlfile, checksfile) {

  rest.get(htmlfile).on('complete', function(result) {
   $ = cheerio.load(result);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
        var present = $(checks[ii]).length > 0;
        out[checks[ii]] = present;
    }
	outJSON = JSON.stringify(out,null,4);
	console.log(outJSON);
	return 0;
   });
};

if(require.main == module) {
    program
        .option('-c, --checks <check_file>', 'Path to checks.json')
        .option('-u, --url <html_file>', 'Path to index.html')
        .parse(process.argv);

var checkJson = checkHtmlFile(program.url, program.checks);
} else {
    exports.checkHtmlFile = checkHtmlFile;
}
