var fs = require('fs');
var path = require('path');
var includes = require('array-includes');

module.exports.slides = (root) =>  {
    var folder = path.join(root, 'slides');
    if (fs.existsSync(folder))  {
        return readTree(folder, '');
    }

    return [];
}

module.exports.css = (root) => {
    var folder = path.join(root, 'css');
    if (fs.existsSync(folder))  {
        return fs.readdirSync(folder);
    }

    return [];
} 

function readTree(root, dir) {
   return fs
    .readdirSync(path.join(root, dir))
    .map(m => path.join(dir, m))
    .map(m => fs.lstatSync(path.join(root, m)).isDirectory() ? readTree(root, m) : filter(m))
    .filter(m => m)
}

function filter(file) {
    if ((b = isImage(file)) || includes(['.md'], path.extname(file))) {
        return { path: file, isImage: b };
    }
}

function isImage(file) {
    return includes(['.png', '.gif', '.jpg', '.jpeg', '.svg'], path.extname(file));
}
module.exports.isImage = isImage;