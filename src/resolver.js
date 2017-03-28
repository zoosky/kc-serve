var fs = require('fs');
var path = require('path');
var debug = require('debug')('kc:resolve')
var slideObject = require('./slideObject')

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

function readTree(root, dir) {
   return fs
    .readdirSync(path.join(root, dir))
    .map(m => path.join(dir, m))
    .map(m => fs.lstatSync(path.join(root, m)).isDirectory() ? readTree(root, m) : slideObject(m))
    .filter(m => Array.isArray(m) || m.isImage || m.isMarkdown || m.isHtml)
}

module.exports.reveal = () => path.resolve(require.resolve('reveal.js'), '..', '..');
module.exports.highlight = () => path.resolve(require.resolve('highlight.js'), '..', '..');