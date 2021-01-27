describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
});

describe("should navigate to Tuesday", () => {
  it("should visit root", () => {
    cy.visit("/");
    cy.get("li");
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  });
});


