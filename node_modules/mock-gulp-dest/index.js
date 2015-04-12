
var path = require('path'),
    assert = require('assert'),
    through = require('through2'),
    filesFromTree = require('./lib/files-from-tree');

module.exports = exports = function mockGulpDest (gulpOrVinylFs) {
  var cache = [],
      info = {},
      original = gulpOrVinylFs.dest;

  gulpOrVinylFs.dest = function (outFolder, opt) {
    if (typeof outFolder !== 'string') throw new Error('Invalid output folder');

    if (!opt) opt = {};
    if (!opt.cwd) opt.cwd = process.cwd();

    var cwd = path.resolve(opt.cwd);
    var basePath = path.resolve(cwd, outFolder);

    cache = [];
    info.cwd = cwd;
    info.base = basePath;

    return through({objectMode: true}, function (file, enc, cb) {
      var filePath = path.resolve(basePath, file.relative);

      file.cwd = cwd;
      file.base = basePath;
      file.path = filePath;
      this.push(file);
      cache.push(file);
      cb();
    });
  };

  return {
    restore: function restore () {
      gulpOrVinylFs.dest = original;
    },
    cwd: function cwd () {
      return info.cwd;
    },
    basePath: function basePath () {
      return info.base;
    },
    files: function files () {
      return cache.slice();
    },
    assertDestContains: function assertDestContains (filePath) {
      var files = filesFromTree(filePath);
      files.forEach(function (filePath) {
        assert.ok(cache.some(function (file) {
          return file.relative === path.normalize(filePath);
        }), 'Expected `' + info.base + '` to contain `' + filePath + '`');
      });
    },
    assertDestNotContains: function assertDestNotContains (filePath) {
      var files = filesFromTree(filePath);
      files.forEach(function (filePath) {
        assert.ok(cache.every(function (file) {
          return file.relative !== path.normalize(filePath);
        }), 'Expected `' + info.base + '` to not contain `' + filePath + '`');
      });
    }
  };
};
