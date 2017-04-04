const del = require('del');

del(['src/**/*.js', 'test/**/*.js']).then(paths => {
    if (paths.length) {
        console.log('Cleaned:\n', paths.join('\n'));
    } else {
        console.log('Done - nothing cleaned');
    }
});