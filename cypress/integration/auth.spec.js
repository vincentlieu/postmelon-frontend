import { baseUrl } from "../../cypress.json";
import { auth } from "../fixtures/testData.json";

describe("Login", () => {
  it("Verify that login is SUCCESSFUL when valid credentials are provided.", () => {
    cy.visit(baseUrl);

    cy.get(".login-email").type(auth.validEmail);

    cy.get(".login-password").type(auth.validPassword);

    cy.get(".login-button").click();

    cy.url().should("include", "/home");
  });

  it("Verify that login is UNSUCCESSFUL when email is not provided.", () => {
    cy.visit(baseUrl);

    cy.get(".login-button").click();

    cy.get(".error-message").should("be.visible");

    cy.get(".error-message").should("contain", "Email can not be emty");
  });

  it("Verify that login is UNSUCCESSFUL when password is not provided.", () => {
    cy.visit(baseUrl);

    cy.get(".login-email").type(auth.validEmail);

    cy.get(".login-button").click();

    cy.get(".error-message").should("be.visible");

    cy.get(".error-message").should("contain", "Password can not be emty");
  });

  it("Verify that login is UNSUCCESSFUL when credentials are INVALID.", function () {
    cy.visit(baseUrl);

    cy.get(".login-email").type(auth.invalidEmail);

    cy.get(".login-password").type(auth.invalidPassword);

    cy.get(".login-button").click();

    cy.get(".error-message").should("be.visible");

    cy.get(".error-message").should("contain", "Server Error Please try again");
  });

  it("Verify that when SUCCESSFUL login can sign out", function () {
    cy.visit(baseUrl);

    cy.get(".login-email").type(auth.validEmail);

    cy.get(".login-password").type(auth.validPassword);

    cy.get(".login-button").click();

    cy.url().should("include", "/home");
    cy.get(".drop-down").click();

    cy.get(".signout-button").click();
    cy.url().should("include", "/");
  });
});
