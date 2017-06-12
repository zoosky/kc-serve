> Create and serve [reveal.js](https://github.com/hakimel/reveal.js/) presentations with ease.

Inspired by [reveal-md](https://github.com/webpro/reveal-md).

## Usage

```typescript
import serve from '@infosupport/kc-serve';
let url = await serve(
        process.cwd(), 
        'title',
        'reveal.js/css/theme/beige.css',
        'highlight.js/styles/darkula.css')
    .listen(port);
```

## Options
option          | description
----------------|--------------
cwd             | working folder
title           | presentation title
theme           | resolve to `reveal.js` theme (can be custom package, like `'@infosupport/kc-cli-theme'`)
highlight       | resolve to `highlight.js` style

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
This package only is a **library** for serving presentations. You'll need a CLI (like [@infosupport/kc-cli](https://www.npmjs.com/package/@infosupport/kc-cli)) to do the actual hosting.