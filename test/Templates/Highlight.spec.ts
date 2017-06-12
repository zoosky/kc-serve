import { expect } from 'chai';
import template from '../../src/template/Highlight';

describe('Highlight template', () => {
    it('includes css', () => {
        expect(new template('theme/custom.css').render()).to.eq('<link rel="stylesheet" href="theme/custom.css">');
    });
});