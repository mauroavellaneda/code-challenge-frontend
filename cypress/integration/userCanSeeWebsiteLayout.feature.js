describe("Website interface", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders header component", () => {
    cy.get('[data-cy="header-container"]').should("be.visible");
    cy.get('[data-cy="header-title"]').should("contain", "Unsplash Challenge");
    cy.get('[data-cy="header-container"]').should(
      "have.css",
      "background-color",
      "rgb(255,255,255,255)"
    );
  });
});
