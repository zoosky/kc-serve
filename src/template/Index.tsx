import * as elements from 'typed-html';

export interface TemplatePart {
   render(): Promise<string> | string;
}

export class Index implements TemplatePart {
    constructor(private title: string, 
      private head: TemplatePart[],
      private body: TemplatePart[]) {

    }
    async render(): Promise<string> {
      return <html lang="en">
        <head>
          <meta charset="utf-8"></meta>
          <title>{this.title}</title>
          {await Promise.all(this.head.map(_ => _.render()))}
          <link rel="stylesheet" href="css/highlight/vs.css"></link>
        </head>
        <body>
          {await Promise.all(this.body.map(_ => _.render()))}
        </body>
      </html>;
  }
}