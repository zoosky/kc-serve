import { expect } from 'chai';
import * as templates from '../../src/template/all';
import { TemplatePart } from '../../src/template/Index';

describe('Template', () => {
    it('includes specified highlight theme', () => {
        // let dirs.highlight = 'css/highlight';
        // let highlightTheme = 'zenburn';
        // expect(revealTemplate.html(context)).to.match(/<link rel="stylesheet" href="css\/highlight\/zenburn.css">/m);
    });

    it('invokes extensions inside the head-element', async () => {
        let head = [{ render: () => Promise.resolve('CUSTOM HEAD') }];
        let body: TemplatePart[] = [];

        // Using \s and \S because in JavaScript the . does not match newlines (http://stackoverflow.com/a/1068308/129269)
        expect(await new templates.Index('test', head, body).render()).to.match(/<head>[\s\S]*CUSTOM HEAD[\s\S]*<\/head>/i);
    });

    it('invokes also accepts sync extensions as head plugin', async () => {
        let head = [{ render: () => 'CUSTOM HEAD' }];
        let body: TemplatePart[] = [];

        // Using \s and \S because in JavaScript the . does not match newlines (http://stackoverflow.com/a/1068308/129269)
        expect(await new templates.Index('test', head, body).render()).to.match(/<head>[\s\S]*CUSTOM HEAD[\s\S]*<\/head>/i);
    });

    it('invokes extensions inside the body-element', async () => {
        let head: TemplatePart[] = [];
        let body = [{ render: () => Promise.resolve('CUSTOM BODY') }];

        // Using \s and \S because in JavaScript the . does not match newlines (http://stackoverflow.com/a/1068308/129269)
        expect(await new templates.Index('test', head, body).render()).to.match(/<body>[\s\S]*CUSTOM BODY[\s\S]*<\/body>/i);
    });
});