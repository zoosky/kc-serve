import { expect } from 'chai';
import Theme from '../../src/template/Theme';

describe('Theme template', () => {
    it('includes css', () => {
        expect(new Theme('theme').render()).to.eq('<link rel="stylesheet" href="theme/infosupport.css" id="theme">');
    });
});