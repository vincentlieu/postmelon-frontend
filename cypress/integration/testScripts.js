import {
  url,
  email,
  password,
  incorrectPassword,
} from "../fixtures/testData.json";

describe("Login", function () {
  it("Successful redirected to home page  when enter correct user name and password", function () {
    cy.visit(url);

    cy.get(".login-email").type(email);

    cy.get(".login-password").type(password);

    cy.get(".login-button").click();

    cy.url().should("include", "/home");
  });

  it(" Error when password emty", function () {
    cy.visit(url);
    cy.get(".login-email").type(email);

    cy.get(".login-button").click();

    cy.get(".error-message").should("be.visible");

    cy.get(".error-message").should("contain", "Password can not be emty");
  });

  it("Error when enter incorrect email or password", function () {
    cy.visit(url);
    cy.get(".login-email").type(email);
    cy.get(".login-password").type(incorrectPassword);

    cy.get(".login-button").click();

    cy.get(".error-message").should("be.visible");

    cy.get(".error-message").should("contain", "Server Error Please try again");
  });
});

describe("Sign up", function () {
  //     it("Successful registerd user redirect to home page", function () {
  //       cy.visit(url)
  //       cy.get(".name").type("newuser");

  //       function rand() {
  //         const random = Math.random() * 100;
  //         return random
  //       }

  //       cy.get(".register-email").type(`newuser${rand()}@gmail.com`);

  //       cy.get(".register-password").type("123456");
  //       cy.get(".confirm-password").type("123456");

  //       cy.get(".register-button").click();

  //       cy.url().should("include", "/home");
  //     });

  it("Error when name field is empty", function () {
    cy.visit(url);

    cy.get(".name");

    cy.get(".register-button").click();

    cy.get(".error-message-register").should("be.visible");

    cy.get(".error-message-register").should("contain", "Please fill out name");
  });

  it("Error when email field is empty", function () {
    cy.visit(url);
    cy.get(".name").type("new user");

    cy.get(".register-button").click();

    cy.get(".error-message-register").should("be.visible");

    cy.get(".error-message-register").should(
      "contain",
      "Email can not be emty"
    );
  });
  it("Error when password field is empty", function () {
    cy.visit(url);
    cy.get(".name").type("new user");
    cy.get(".register-email").type("newuser@gmail.com");

    cy.get(".register-button").click();

    cy.get(".error-message-register").should("be.visible");

    cy.get(".error-message-register").should(
      "contain",
      "Password can not be emty"
    );
  });
  it("Error when password does not match confirm password", function () {
    cy.visit(url);
    cy.get(".name").type("new user");
    cy.get(".register-email").type("newuser@gmail.com");
    cy.get(".register-password").type(password);
    cy.get(".confirm-password").type(incorrectPassword);

    cy.get(".register-button").click();

    cy.get(".error-message-register").should("be.visible");

    cy.get(".error-message-register").should(
      "contain",
      "Password does not matched"
    );
  });
});

describe("Create Post", function () {
  it("Successful Login user can create post", function () {
    cy.visit(url);

    cy.get(".login-email").type(email);

    cy.get(".login-password").type(password);

    cy.get(".login-button").click();

    cy.url().should("include", "/home");
    cy.get(".create-post").type("create new post");
    cy.get("[data-cy=post-button]").click();
    cy.get("h6").first().should("contain", "patricia");
  });
  it("Post filed can not be empty", function () {
    cy.visit(url);

    cy.get(".login-email").type(email);

    cy.get(".login-password").type(password);

    cy.get(".login-button").click();

    cy.url().should("include", "/home");

    cy.get("[data-cy=post-button]").click();
    cy.get("label").should("contain", "Post content required.");
  });
});
