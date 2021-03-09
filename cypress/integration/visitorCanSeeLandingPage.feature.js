describe("Landing page interface", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("renders landing page", () => {
    cy.get('[data-cy="landing"]', { timeout: 10000 }).should("be.visible");
  });
  it("finds 10 images on load", () => {
    cy.get('[data-cy="landing"]').children().should("have.length", 10);
  });
  it("should scroll to bottom and load more images", () => {
    cy.scrollTo("bottom", { duration: 4000 });
    cy.get('[data-cy="landing"]').children().should("have.length", 20);
  });
  it("modal opens on click", () => {
    cy.get('[data-cy="image"]', { timeout: 10000 }).should("be.visible");

    cy.get('[data-cy="image"]', { timeout: 20000 }).click(
      { multiple: true },
      { force: true }
    );
    cy.get('[data-cy="modal"]', { timeout: 10000 }).should("be.visible");
  });
});
