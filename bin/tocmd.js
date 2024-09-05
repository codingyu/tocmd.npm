#!/usr/bin/env node

/**
 * Module dependencies.
 */
function isDefined(x) { return x !== null && x !== undefined }
Array.prototype.contain = function (obj) {
	return this.indexOf(obj) !== -1
}

var program = require('commander')
var version = require("../package.json").version

program
	.version(version)
	.usage(" a node npm wrapper of i5ting_ztree_toc https://github.com/i5ting/i5ting_ztree_toc ")
	.option('-f, --file [filename]', ' default is README.md ')
	.option('-o, --open', 'open in browser')
	.option('-v, --verbose', '打印详细日志')
	.option('-T, --title [title]', 'HTML title')
	.option('-M, --root_menu_name [root_menu_name]', 'root node name')
	.parse(process.argv)

var pwd = process.cwd()
var filename = "README.md"
var is_open = false
var extend = {}

if (program.file) {
	filename = program.file
}

if (program.open) {
	is_open = program.open
}

var verbose = false
if (program.verbose) {
	verbose = program.verbose
}

var _verbose = verbose
function log(str) {
	if (_verbose == true) {
		console.log(str)
	}
}
if (program.title) {
	extend.title = program.title
}

if (program.root_menu_name) {
	extend.root_menu_name = program.root_menu_name
}

log('filename = ' + filename)
log('verbose = ' + verbose)

var source_file = filename

var markd_config = {
	debug: false
}

var source_file_name = pwd + '/' + source_file
var file_name = source_file_name.split('/').pop()
var _file_name = file_name.split('.')[0]

if (file_name.indexOf('\\') > 0) {
	_file_name = file_name.substring(file_name.lastIndexOf("\\")).split('.')[0]
}
// var dest_file_path = pwd + '/preview/' + _file_name + '.html'
var dest_file_path = pwd + '/preview/index.html'

console.log('pwd=' + pwd)
console.log('source_file_name=' + source_file_name)
console.log('dest_file_path=' + dest_file_path)

require('../index')(pwd, source_file_name, dest_file_path, is_open, markd_config, extend)
