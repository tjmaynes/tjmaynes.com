describe('Home Page', () => {
    beforeEach(() => cy.visit('/'));

    it("successfully loads", () => {
        cy.fetchJsonData("../../common/data.json")
            .then((data) => {
                shouldHaveTitle(data["title"]);
                shouldContainSocialLinks(data["social"]);
                shouldContainAboutSection(data["about"]);
                shouldContainExpertiseSection(data["expertise"]);
            });
    });

    const shouldHaveTitle = (title) => cy.title().should("eq", title);

    const shouldContainSocialLinks = (social) => cy.getEachElementByIndex(
        ".social > li a", (socialElement, index) => {
            const {name, link} = social[index];
            cy.linkElementShouldContain(socialElement, name, link)
        }
    );

    const shouldContainAboutSection = (about) => cy.getEachElementByIndex(
        ".about > p", (item, index) => cy.elementShouldContainText(item, about[index])
    );

    const shouldContainExpertiseSection = (expertise) => cy.getEachElementByIndex(
        ".expertise > li", (item, index) => cy.elementShouldContainText(item, expertise[index])
    );
});