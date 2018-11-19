import modulo from "modulo";

describe('App', () => {
    it('should be able to run tests', () => {
        expect(1 + 2).toEqual(3);
    });
});

describe('modulo', () => {
    it('debe mostrar el valor del modulo', () => {
        expect(modulo.key).toMatch('valor');
    });
});
