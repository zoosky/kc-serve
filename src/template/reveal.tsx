import { Slide, SlideObject } from '../SlideObject';
import * as elements from 'typed-html';
import * as slideTemplate from './slide';
export interface TemplateContext {
    slides: SlideObject[];
    css: string[];
    title: string;
    highlightTheme: string;
    dirs: {
        slides: string;
        css: string;
        theme: string;
        reveal: string;
        highlight: string;
    };
}

export function html(context: TemplateContext) {
  const { dirs, highlightTheme, css, slides } = context;
  const slideHtml = (slide: Slide) => slideTemplate.html(dirs.slides, slide);
  return <html lang="en">
    <head>
      <meta charset="utf-8"></meta>
      <title>{context.title}</title>
      <link rel="stylesheet" href={`${dirs.reveal}/css/reveal.css`}></link>
      <link rel="stylesheet" href={`${dirs.theme}/infosupport.css`} id="theme"></link>
      <link rel="stylesheet" href={`${dirs.highlight}/${highlightTheme}.css`}></link>
      {css.map(cssFile => <link rel="stylesheet" href={`${dirs.css}/${cssFile}`}></link>)}
      <script>
        {`
        // Printing and PDF exports
        var link = document.createElement( 'link' );
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = window.location.search.match( /print-pdf/gi ) ? '${dirs.reveal}/css/print/pdf.css' : '${dirs.reveal}/css/print/paper.css';
        document.getElementsByTagName( 'head' )[0].appendChild( link );
    `}</script>
    </head>
    <body>
      <div class="reveal">
        <div class="slides">
          {slides.map(_ => {
            if (_.isFolder) {
              return <section>
                {_.slides.map(slideHtml)}
              </section>;
            } else {
              return slideHtml(_);
            }
          })}
        </div>
      </div>

      <script src={`${dirs.reveal}/lib/js/head.min.js`}></script>
      <script src={`${dirs.reveal}/js/reveal.js`}></script>

      <script>
        {`
            function extend() {
              var target = {};
              for (var i = 0; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                  if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                  }
                }
              }
              return target;
            }

            // Optional libraries used to extend on reveal.js
            var deps = [
              { src: '${dirs.reveal}/lib/js/classList.js', condition: function() { return !document.body.classList; } },
              { src: '${dirs.reveal}/plugin/markdown/marked.js', condition: function() { return !!document.querySelector('[data-markdown]'); } },
              { src: '${dirs.reveal}/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector('[data-markdown]'); } },
              { src: '${dirs.reveal}/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
              { src: '${dirs.reveal}/plugin/zoom-js/zoom.js', async: true },
              { src: '${dirs.reveal}/plugin/notes/notes.js', async: true },
              { src: '${dirs.reveal}/plugin/math/math.js', async: true }
            ];

            // default options to init reveal.js
            var defaultOptions = {
              controls: true,
              progress: true,
              history: true,
              center: true,
              transition: 'default', // none/fade/slide/convex/concave/zoom
              dependencies: deps
            };

            // options from URL query string
            var queryOptions = Reveal.getQueryHash() || {};

            var options = {};
            options = extend(defaultOptions, options, queryOptions);
            Reveal.initialize(options);`}
      </script>
    </body>
  </html>;
}