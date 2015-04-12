mock-gulp-dest
=================

> Mock gulp.dest/vinyl-fs.dest for testing purposes. Useful when writing slush generators.

## Installation

```bash
npm install --save mock-gulp-dest
```

## Usage

Within your test do:

```javascript
var gulp = require('gulp'),
    mockGulpDest = require('mock-gulp-dest')(gulp);

// Load all slush generator tasks:
require('../slushfile');

describe('a slush generator test', function() {
  it('should generate project files', function(done) {
    // Run the default task in the current slush generator:
    gulp.start('default')
      .on('stop', function () {
        // Taking a file path as a string:
        mockGulpDest.assertDestContains('package.json');
        // Multiple files as array:
        mockGulpDest.assertDestContains([
          'package.json',
          'src/index.js'
        ]);
        // Multiple files as a file tree:
        mockGulpDest.assertDestContains({
          src: 'index.js',
          lib: {
            module: [
              'file1.js',
              'file2.js'
            ],
            _: 'lib-file.js'
          },
          _: [
            'package.json',
            'bower.json'
          ]
        });
        done();
      });
  });
});
```

## API

### cwd()

*Returns* `String`

Get current working directory that `gulp.dest` uses, i.e. either `process.cwd()` or set with `gulp.dest(folder, {cwd: newCwd})`.

### basePath()

*Returns* `String`

Get base path that `gulp.dest` uses, i.e. `cwd() + gulp.dest folder`.

### assertDestContains(filePath)

*Param* `String|Array|Object` filePath

Assert that `gulp.dest` will create given file(s). See example usage above.

### assertDestNotContains(filePath)

*Param* `String|Array|Object` filePath

Assert that `gulp.dest` will not create given file(s). Used in the same way as `assertDestContains()`.

## License

MIT
