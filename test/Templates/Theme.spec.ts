import { expect } from 'chai';
import template from '../../src/template/Theme';

describe('Theme template', () => {
    it('includes css', () => {
        expect(new template('theme').render()).to.eq('<link rel="stylesheet" href="theme/infosupport.css" id="theme">');
    });
});