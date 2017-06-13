import { expect } from 'chai';
import template from '../../src/template/Theme';

describe('Theme template', () => {
    it('includes css', () => {
        expect(new template('theme/custom.css').head()).to.eq('<link rel="stylesheet" href="theme/custom.css" id="theme">');
    });
});