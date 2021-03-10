describe('Links Page', () => {
    beforeEach(() => cy.visit('/links'));

    it("successfully loads", () => {
        cy.fetchConfigData().then((data) => {
            Object.keys(data["links"]).forEach(sectionName =>
                shouldContainSectionWithLinks(sectionName, data["links"][sectionName])
            );
        });
    });

    const shouldContainSectionWithLinks = (sectionClassName, links) => cy.getEachElementByIndex(
        `.${sectionClassName} > ul li a`, (linkElement, index) => {
            const { name, link } = links[index];
            cy.linkElementShouldContain(linkElement, name, link)
        }
    );
});