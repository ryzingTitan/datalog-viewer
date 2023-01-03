import Session from "../../../src/Session/Session";

describe("<Session />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Session />);
  });
});
