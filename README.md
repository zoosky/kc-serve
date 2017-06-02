> Create and serve [reveal.js](https://github.com/hakimel/reveal.js/) presentations with ease.

Inspired by [reveal-md](https://github.com/webpro/reveal-md).

## Install
```
npm i -g @infosupport/kc-cli
```

## Usage
Just 3 simple steps:

1. Open Visual Studio Code (or any other lightweight IDE)
1. Start `kc serve` from the (integrated) terminal
1. Create a `./slides` folder and add markdown slides 

## Options

### Serve
option               | description
---------------------|--------------
`kc serve`           | host presentation from current directory on default port
`kc serve -o`        | open presentation in default browser
`kc serve -p`        | host presentation on random free port
`kc serve -p <port>` | host presentation on specificed `<port>`
`kc serve [dir]`     | host presentation from specified directory

### Print

option                  | description
------------------------|--------------
`kc print`              | print presentation from current directory to pdf 
`kc print -o`           | open pdf after printing
`kc print [file]`       | print presentation using specified filename
`kc print [file] [dir]` | print presenation using specified filename from directory

### Help
option         | description
---------------|--------------
`kc help`      | open help presentation with examples and usage

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

For more examples and usage see `kc help`!

## Notes
The only supported theme currently is designed for [Info Support b.v.](http://infosupport.com) and the non-configurable highlight theme is `vs.css`.