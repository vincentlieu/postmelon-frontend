import { baseUrl } from "../../cypress.json";
import { auth } from "../fixtures/testData.json";

describe("Verify that valid user can create post", function () {
  it("Successful Login user can create post", function () {
    cy.visit(baseUrl);

    cy.get(".login-email").type(auth.validEmail);

    cy.get(".login-password").type(auth.validPassword);

    cy.get(".login-button").click();

    cy.url().should("include", "/home");
    cy.get(".create-post").type("create new post");

    cy.get("[data-cy=post-button]").click();

    cy.get(".view-profile").first().should("contain", "patricia");
  });

  it("Post filed can not be empty", function () {
    cy.visit(baseUrl);

    cy.get(".login-email").type(auth.validEmail);

    cy.get(".login-password").type(auth.validPassword);

    cy.get(".login-button").click();

    cy.url().should("include", "/home");

    cy.get("[data-cy=post-button]").click();
    cy.get("label").should("contain", "Post content required.");
  });

  it("Successful Login user can delete post", function () {
    cy.visit(baseUrl);

    cy.get(".login-email").type(auth.validEmail);

    cy.get(".login-password").type(auth.validPassword);

    cy.get(".login-button").click();

    cy.url().should("include", "/home");

    cy.get(".post-dropdown-menu-btn").first().click();
    cy.get(".delete-post").click();
  });
});
