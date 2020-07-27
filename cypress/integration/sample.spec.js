import name from "../fixtures/example.json";

describe("Login", function () {
  it("Successful redirected to home page  when enter correct user name and password", function () {
    cy.visit("http://localhost:3000");

    cy.get(".login-email").type("abc@gmail.com");

    cy.get(".login-password").type("123456");

    cy.get(".login-button").click();

    cy.url().should("include", "/home");
  });

  it(" Error when password emty", function () {
    cy.visit("http://localhost:3000");
    cy.get(".login-email").type("abc@gmail.com");

    cy.get(".login-button").click();

    cy.get(".error-message").should("be.visible");

    cy.get(".error-message").should("contain", "Password can not be emty");
  });

  it("Error when enter incorrect email or password", function () {
    cy.visit("http://localhost:3000");
    cy.get(".login-email").type("abc@gmail.com");
    cy.get(".login-password").type("123457");

    cy.get(".login-button").click();

    cy.get(".error-message").should("be.visible");

    cy.get(".error-message").should("contain", "Server Error Please try again");
  });
});

describe("Sign up", function () {
  //   it("Successful registerd user redirect to home page", function () {
  //     cy.visit("http://localhost:3001");
  //     cy.get(".name").type("newuser");

  //     cy.get(".register-email").type("newuser2@gmail.com");

  //     cy.get(".register-password").type("123456");
  //     cy.get(".confirm-password").type("123456");

  //     cy.get(".register-button").click();

  //     cy.url().should("include", "/home");
  //   });

  it("Error when name field is empty", function () {
    cy.visit("http://localhost:3000");

    cy.get(".name");

    cy.get(".register-button").click();

    cy.get(".error-message-register").should("be.visible");

    cy.get(".error-message-register").should("contain", "Please fill out name");
  });

  it("Error when email field is empty", function () {
    cy.visit("http://localhost:3000");
    cy.get(".name").type("new user");

    cy.get(".register-button").click();

    cy.get(".error-message-register").should("be.visible");

    cy.get(".error-message-register").should(
      "contain",
      "Email can not be emty"
    );
  });
  it("Error when password field is empty", function () {
    cy.visit("http://localhost:3000");
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
    cy.visit("http://localhost:3000");
    cy.get(".name").type("new user");
    cy.get(".register-email").type("newuser@gmail.com");
    cy.get(".register-password").type("123456");
    cy.get(".confirm-password").type("123467");

    cy.get(".register-button").click();

    cy.get(".error-message-register").should("be.visible");

    cy.get(".error-message-register").should(
      "contain",
      "Password does not matched"
    );
  });
});

describe("Create Post", function () {
  it("Successful redirected to home when using correct user name and password", function () {
    cy.visit("http://localhost:3000");

    cy.get(".login-email").type("abc@gmail.com");

    cy.get(".login-password").type("123456");

    cy.get(".login-button").click();

    cy.url().should("include", "/home");
  });

  it("login user can create a post", function () {
    cy.visit("http://localhost:3000");

    cy.get(".login-email").type("abc@gmail.com");

    cy.get(".login-password").type("123456");

    cy.get(".login-button").click();

    cy.url().should("include", "/home");

    cy.get(".create-post").type("create new post");
    cy.get("[data-cy=post-button]").click();
    cy.get("[data-cy=post]");
  });
});
