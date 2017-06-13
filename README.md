> Create and serve [reveal.js](https://github.com/hakimel/reveal.js/) presentations with ease.

Inspired by [reveal-md](https://github.com/webpro/reveal-md).

## Usage

### Global
```cli
npm i -g @infosupport/kc-serve
kc-serve --theme @infosupport/kc-cli-theme --highlight darkula
```

### Local
```cli
npm i --save @infosupport/kc-serve
```

package.json:
```json
  "scripts": {
    "start": "kc-serve --theme @infosupport/kc-cli-theme --highlight darkula"
  }
```

### Library
TypeScript:
```typescript
import serve from '@infosupport/kc-serve';

serve({
    cwd: process.cwd(), 
    title: 'title',
    theme: 'beige', // or a package
    highlight: 'darkula.css'
}).listen(port)
.then(url => console.log(url))
.catch(err => console.error(err.message));
```

## Options
option          | description
----------------|--------------
cwd             | working folder
title           | presentation title
theme           | resolve to `reveal.js` theme (can be custom package, like `'@infosupport/kc-cli-theme'`)
highlight       | resolve to `highlight.js` style
port            | serve from specified port (use 0 for random free port)

## Special Folders
folder         | description
---------------|--------------
`./slides`     | root folder for slides (md, jpg, gif, svg)
`./slides/sub` | group for vertical slides
`./css`        | custom css, injected into served html
`./img`        | images
## Tips

* Order slides with a number prefix (you may use prefix numbers although not required)
* Group slides in subdirectories (creating [vertical slides](https://github.com/hakimel/reveal.js/#markup))
* Make image slides directly from `jpg`, `gif` and `svg`
* Inject custom css from the `./css` folder
* Put images in an `./img` folder and refer from a markdown slide with `![description](img/your-image.jpg)`
* Style images from the custom-css with a selector on the alt-text `img[alt='description']` or filename `img[src='img/your-image.jpg']`

## Notes
Wrap your own CLI around the library to create a tool with a custom default theme and/or highlight style.