Cypress.Commands.add("fetchJsonData", (path) => cy.readFile(path));
Cypress.Commands.add("fetchConfigData", () => cy.fetchJsonData("../../data/config.json"));

Cypress.Commands.add("linkElementShouldContain", (linkElement, name, link) =>
    cy
        .wrap(linkElement)
        .should("contain", name)
        .and('have.attr', 'href', link)
);

Cypress.Commands.add("elementShouldContainText", (element, text) =>
    cy
        .wrap(element)
        .should("contain.text", text)
);

Cypress.Commands.add("getEachElementByIndex", (lookup, getItem) => cy.get(lookup).each(getItem));