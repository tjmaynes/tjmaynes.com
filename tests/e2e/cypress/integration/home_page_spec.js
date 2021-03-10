describe('Home Page', () => {
    beforeEach(() => cy.visit('/'));

    it("successfully loads", () => {
        cy.fetchConfigData().then((data) => {
            shouldHaveTitle(data["title"]);
            shouldContainALinkInTheHeader();
            shouldContainAboutSection(data["about"]);
            shouldContainExpertiseSection(data["expertise"]);
        });
    });

    const shouldHaveTitle = (title) => cy.title().should("eq", title);

    const shouldContainALinkInTheHeader = () => {
        cy
            .get("header h1 a")
            .should("contain", "TJ Maynes")
            .and('have.attr', 'href', "/links");
    }

    const shouldContainAboutSection = (about) => cy.getEachElementByIndex(
        ".about > p", (item, index) => cy.elementShouldContainText(item, about[index])
    );

    const shouldContainExpertiseSection = (expertise) => cy.getEachElementByIndex(
        ".expertise > li", (item, index) => cy.elementShouldContainText(item, expertise[index])
    );
});