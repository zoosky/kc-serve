import * as elements from 'typed-html';

export interface TemplatePart {
  head?(): Promise<string> | string;
  body?(): Promise<string> | string;
}

export default class {
  constructor(private title: string,
    private parts: TemplatePart[]) {
  }

  async render(): Promise<string> {
    return <html lang="en">
      <head>
        <meta charset="utf-8"></meta>
        <title>{this.title}</title>
        {await Promise.all(this.parts.map(_ => _.head ? _.head() : Promise.resolve('')))}
      </head>
      <body>
        {await Promise.all(this.parts.map(_ => _.body ? _.body() : Promise.resolve('')))}
      </body>
    </html>;
  }
}