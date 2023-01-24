import App from "../../src/App";

describe("<App />", () => {
  it("renders app correctly on initial load", () => {
    cy.intercept("http://localhost:8080/api/sessions/metadata", {
      fixture: "session-metadata",
    }).as("getSessionMetadata");

    cy.mount(<App />);

    cy.wait("@getSessionMetadata");

    cy.get('[data-cy="sessionMetadataSelectLabel"]').contains("Session List");
  });
});
