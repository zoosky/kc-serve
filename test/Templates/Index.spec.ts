import { expect } from 'chai';
import template from '../../src/template/Index';
import { TemplatePart } from '../../src/template/Index';

describe('Template', () => {
    it('invokes extensions inside the head-element', async () => {
        let parts: TemplatePart[] = [{ head: () => Promise.resolve('CUSTOM HEAD') }];

        // Using \s and \S because in JavaScript the . does not match newlines (http://stackoverflow.com/a/1068308/129269)
        expect(await new template('test', parts).render()).to.match(/<head>[\s\S]*CUSTOM HEAD[\s\S]*<\/head>/i);
    });

    it('invokes also accepts sync extensions as head plugin', async () => {
        let parts: TemplatePart[] = [{ head: () => 'CUSTOM HEAD' }];

        // Using \s and \S because in JavaScript the . does not match newlines (http://stackoverflow.com/a/1068308/129269)
        expect(await new template('test', parts).render()).to.match(/<head>[\s\S]*CUSTOM HEAD[\s\S]*<\/head>/i);
    });

    it('invokes extensions inside the body-element', async () => {
        let parts: TemplatePart[] = [{ body: () => Promise.resolve('CUSTOM BODY') }];

        // Using \s and \S because in JavaScript the . does not match newlines (http://stackoverflow.com/a/1068308/129269)
        expect(await new template('test', parts).render()).to.match(/<body>[\s\S]*CUSTOM BODY[\s\S]*<\/body>/i);
    });
});