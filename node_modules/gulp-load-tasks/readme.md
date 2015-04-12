 Gulp Load Tasks
=================
Loads gulp tasks from a local directory (usually `tasks/`), rather than from
your Gulpfile.


## Usage

In your `Gulpfile.js`:
```javascript
// Tasks are in `tasks/`
require('gulp-load-tasks')();

// Load from a different directory:
// require('gulp-load-tasks')('gulp_tasks');
```

`tasks/uglify.js`:
```javascript
var gulp = require('gulp');
var uglify = require('gulp-uglify');

module.exports = function() {
	return gulp.src('lib/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
};
```

`tasks/default.js`:
```javascript
// Double-brackets required, since the array gets passed directly to `gulp.task()`
module.exports = [[
	'uglify'
]];
```
