import Session from "../../../src/Session/Session";

describe("<Session />", () => {
  it("renders correctly when no session is selected", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Session />);
  });

  it("renders correctly when a session is selected", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Session />);
  });
});
