var fs = require('fs');
var path = require('path');
var includes = require('array-includes');
var debug = require('debug')('kc:resolve')

module.exports = (root) =>  { 
    debug(root);

    return {
        slides: () => {
            var folder = path.join(root, 'slides');
            debug(folder)
            
            if (fs.existsSync(folder))  {
                var items = readTree(folder, '');
                
                debug(items)
                return items;
            }

            return [];
        },

        css: () => {
            var folder = path.join(root, 'css');
            if (fs.existsSync(folder))  {
                return fs.readdirSync(folder);
            }

            return [];
        }
    }
}

module.exports.reveal = () => path.resolve(require.resolve('reveal.js'), '..', '..');
module.exports.highlight = () => path.resolve(require.resolve('highlight.js'), '..', '..');

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