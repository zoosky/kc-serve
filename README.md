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

try {
    serve({
        cwd: process.cwd(), 
        title: 'title',
        theme: 'beige', // or a package
        highlight: 'darkula.css'
    }).listen(port)
    .then(url => console.log(url))
    .catch(err => console.error(err.message));
} catch (err) {
    console.error(err.message)
}
```

## Special folders:
folder          | description
----------------|--------------
  ./slides      | slides (markdown, png, gif, jpg & svg)
  ./img         | image files (from markdown: `![alt-text](img/your-image.jpg)`)
  ./css         | custom css

## Options:
The options are the same for the library as the command line except the first accepts a working directory and the latter default opens the presentation in the browser.

option          | description
----------------|--------------
  --theme       | resolve to reveal.js theme
  --highlight   | resolve to highlight.js style
  --port        | serve from specified port
  --no-open     | don't open presentation in browser

  * Pick a highlight style from [demo](https://highlightjs.org/static/demo/)
    or use the css file name from [source](https://github.com/isagalaev/highlight.js/tree/master/src/styles)

  * Use a default reveal.js theme: black, white, league, beige, sky, night, serif, simple or solarized (see: [reveal.js#theming](https://github.com/hakimel/reveal.js#theming))
    or use a package containing a custom theme (it should resolve to the css via 'main' or explicitly),
    or override (parts of) a theme with a custom css in the ./css folder

## Tips:
  * Order slides with a number prefix (leading zeros may be omitted)
  * Group slides in subdirectories to create vertical slides, see: [reveal.js/#markup](https://github.com/hakimel/reveal.js/#markup)
  * Make image slides directly from 'png', jpg', 'gif' and 'svg'
  * Inject custom css in the './css' folder
  * Put images in the './img' folder and include from a markdown slide using `![alt-text](img/your-image.jpg)`
  * Style images from custom-css with a selector on the alt-text `img[alt='alt-text']` or filename `img[src='img/your-image.jpg']`

## Notes
Wrap your own CLI around the library to create a tool with a custom default theme and/or highlight style. Take a look at `bin/cli.ts` for inspiration.

The main differences with [reveal-md](https://github.com/webpro/reveal-md) are:
* The way subdirectories are treated. I want to break-up my presentation in small markdown files to make large presentations more maintainable and git-friendly.
* The way how custom themes are resolved. I didn't want to include a copy of my company theme in each and every presentation.
* Less configuration options.

Why not contribute to or fork [reveal-md](https://github.com/webpro/reveal-md)? When I tried to cut down the source I found it very entangled. It was a great start to find out what I needed but it was more easy to rebuild it from scratch.