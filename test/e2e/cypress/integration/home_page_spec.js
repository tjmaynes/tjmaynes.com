describe('Home Page', () => {
    beforeEach(() => { cy.visit('/'); });

    it("successfully loads", () => {
        cy.title().should('eq', "TJ Maynes");
    });
});