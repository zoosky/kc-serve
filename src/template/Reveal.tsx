import * as elements from 'typed-html';
import { TemplatePart } from './Index';

export class Css implements TemplatePart {
    constructor(private path: string) {
    }

    public head(): string {
        return <link rel="stylesheet" href={`${this.path}/css/reveal.css`}></link>;
    }
}

export class PdfScript implements TemplatePart {
    constructor(private path: string) {
    }

    public head(): string {
        return <script>
            {`
                // Printing and PDF exports
                var link = document.createElement( 'link' );
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = window.location.search.match( /print-pdf/gi ) ? '${this.path}/css/print/pdf.css' : '${this.path}/css/print/paper.css';
                document.getElementsByTagName( 'head' )[0].appendChild( link );
          `}
        </script>;
    }
}

export class MainScript implements TemplatePart {
    constructor(private path: string) {
    }

    public body(): string {
        return <p>
            <script src={`${this.path}/lib/js/head.min.js`}></script>
            <script src={`${this.path}/js/reveal.js`}></script>

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
                        { src: '${this.path}/lib/js/classList.js', condition: function() { return !document.body.classList; } },
                        { src: '${this.path}/plugin/markdown/marked.js', condition: function() { return !!document.querySelector('[data-markdown]'); } },
                        { src: '${this.path}/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector('[data-markdown]'); } },
                        { src: '${this.path}/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
                        { src: '${this.path}/plugin/zoom-js/zoom.js', async: true },
                        { src: '${this.path}/plugin/notes/notes.js', async: true },
                        { src: '${this.path}/plugin/math/math.js', async: true }
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
                    Reveal.initialize(options);
                    `}
            </script>
        </p>;
    }
}
