import { baseUrl } from "../../cypress.json";
import { registration } from "../fixtures/testData.json";
import { auth } from "../fixtures/testData.json";

describe("Registration", function () {
  it("Verify that registration is UNSUCCESSFUL when name is not provided.", () => {
    cy.visit(baseUrl);

    cy.get(".registerpipe").click();
    cy.get(".name");

    cy.get(".register-button").click();

    cy.get(".error-message-register").should("be.visible");

    cy.get(".error-message-register").should("contain", "Please fill out name");
  });

  it("Verify that registration is UNSUCCESSFUL when email is not provided.", () => {
    cy.visit(baseUrl);
    cy.get(".registerpipe").click();

    cy.get(".name").type(registration.name);

    cy.get(".register-button").click();

    cy.get(".error-message-register").should("be.visible");

    cy.get(".error-message-register").should(
      "contain",
      "Email can not be emty"
    );
  });

  it("Verify that registration is UNSUCCESSFUL when password is not provided.", () => {
    cy.visit(baseUrl);
    cy.get(".registerpipe").click();

    cy.get(".name").type(registration.name);

    cy.get(".register-email").type(registration.email);

    cy.get(".register-button").click();

    cy.get(".error-message-register").should("be.visible");

    cy.get(".error-message-register").should(
      "contain",
      "Password can not be empty"
    );
  });
  it("Verify that registration is UNSUCCESSFUL when password confirmation is mismatched.", () => {
    cy.visit(baseUrl);
    cy.get(".registerpipe").click();

    cy.get(".name").type("new user");

    cy.get(".register-email").type("newuser@gmail.com");

    cy.get(".password").type(registration.password);

    cy.get(".confirm-password").type(registration.invalidPassword);

    cy.get(".register-button").click();

    cy.get(".error-message-register").should("be.visible");

    cy.get(".error-message-register").should(
      "contain",
      "Password does not matched"
    );
  });

  it("Verify that new SUCCESSFUL users registration are redirected to home ", () => {
    cy.visit(baseUrl);
    cy.get(".registerpipe").click();

    cy.get(".name").type(registration.name);

    cy.get(".register-email").type(registration.email);

    cy.get(".password").type(registration.password);
    cy.get(".confirm-password").type(registration.passwordConfirm);

    cy.get(".register-button").click();

    cy.url().should("include", "/home");
  });

  it("Verify that user can delete account ", () => {
    cy.visit(baseUrl);
    cy.get(".loginpipe").click();

    cy.get(".login-email").type(registration.email);

    cy.get(".login-password").type(registration.password);

    cy.get(".login-button").click();

    cy.url().should("include", "/home");
    cy.get(".drop-down").click();
    cy.get(".view-myprofile").click();
    cy.get(".delete-account").click();
    cy.url().should("include", "/");
  });
});
