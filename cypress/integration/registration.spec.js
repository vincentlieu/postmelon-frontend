import { baseUrl } from '../../cypress.json';
import { registration } from '../fixtures/testData.json';

describe('Sign up', function () {
  it('Verify that registration is UNSUCCESSFUL when name is not provided.', () => {
    cy.visit(baseUrl);
      
    cy.get('.name');

    cy.get('.register-button').click();

    cy.get('.error-message-register').should('be.visible');

    cy.get('.error-message-register').should('contain', 'Please fill out name');
  });

  it('Verify that registration is UNSUCCESSFUL when email is not provided.', () => {
    cy.visit(baseUrl);

    cy.get('.name').type(registration.name);

    cy.get('.register-button').click();

    cy.get('.error-message-register').should('be.visible');

    cy.get('.error-message-register').should(
      'contain',
      'Email can not be emty'
    );
  });

  it('Verify that registration is UNSUCCESSFUL when password is not provided.', () => {
    cy.visit(baseUrl);

    cy.get('.name').type(registration.name);

    cy.get('.register-email').type(registration.email);

    cy.get('.register-button').click();

    cy.get('.error-message-register').should('be.visible');

    cy.get('.error-message-register').should(
      'contain',
      'Password can not be emty'
    );
  });
  it('Verify that registration is UNSUCCESSFUL when password confirmation is mismatched.', () => {
    cy.visit(baseUrl);

    cy.get('.name').type('new user');

    cy.get('.register-email').type('newuser@gmail.com');

    cy.get('.register-password').type(registration.password);

    cy.get('.confirm-password').type(registration.invalidPassword);

    cy.get('.register-button').click();

    cy.get('.error-message-register').should('be.visible');

    cy.get('.error-message-register').should(
      'contain',
      'Password does not matched'
    );
  });

  it('Verify that new SUCCESSFUL users registration are redirected to home ', () => {
    cy.visit(baseUrl);

    cy.get('.name').type(registration.name);

    cy.get('.register-email').type(registration.email);

    cy.get('.register-password').type(registration.password);
    cy.get('.confirm-password').type(registration.passwordConfirm);

    cy.get('.register-button').click();

    cy.url().should('include', '/home');
  });
});
