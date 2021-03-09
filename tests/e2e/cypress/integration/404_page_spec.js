describe('404 Page', () => {
    beforeEach(() => cy.visit('/a-page-that-does-not-exist', {failOnStatusCode: false}));

    it("successfully loads", () => {
        cy.get("h1").should("contain", "404 - Page not found 😦");
        cy.get("p").should("contain", "There's no place like home!");
        cy.get("p a").then((linkElement) =>
            cy.linkElementShouldContain(linkElement, "home", "/"));
    });
});