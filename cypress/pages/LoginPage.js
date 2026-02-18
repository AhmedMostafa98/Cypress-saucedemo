import { LoginPageLocators } from '../locators/LoginPageLocators';

class LoginPage {
  constructor() {
    this.locators = LoginPageLocators;
    this.usernameInput = this.locators.usernameInput;
    this.passwordInput = this.locators.passwordInput;
    this.loginButton = this.locators.loginButton;
    this.errorMessage = this.locators.errorMessage;
    this.errorContainer = this.locators.errorContainer;
    this.errorButton = this.locators.errorButton;
    this.pageTitle = this.locators.pageTitle;
  }

  // Navigate to login page
  visit() {
    cy.visit('/');
  }

  // Get username input element
  getUsernameInput() {
    return cy.get(this.usernameInput);
  }

  // Get password input element
  getPasswordInput() {
    return cy.get(this.passwordInput);
  }

  // Get login button element
  getLoginButton() {
    return cy.get(this.loginButton);
  }

  // Get error button element
  getErrorButton() {
    return cy.get(this.errorButton);
  }

  // Get error message
  getErrorMessage() {
    return cy.get(this.errorMessage);
  }

  // Type username
  typeUsername(username) {
    cy.get(this.usernameInput).type(username);
    return this;
  }

  // Type password
  typePassword(password) {
    cy.get(this.passwordInput).type(password);
    return this;
  }

  // Click login button
  clickLogin() {
    cy.get(this.loginButton).click();
    return this;
  }

  // Perform login action
  login(username, password) {
    this.typeUsername(username);
    this.typePassword(password);
    this.clickLogin();
    return this;
  }

  // Verify error message is displayed
  verifyErrorMessage() {
    cy.get(this.errorMessage).should('be.visible');
    return this;
  }

  // Verify specific error message text
  verifyErrorText(expectedText) {
    cy.get(this.errorMessage).should('contain', expectedText);
    return this;
  }

  // Verify error container is visible
  verifyErrorContainerVisible() {
    cy.get(this.errorContainer).should('be.visible');
    return this;
  }

  // Verify login page title/header
  verifyLoginPageTitle() {
    cy.contains('Swag Labs').should('be.visible');
    return this;
  }

  closeErrorMessage() {
    cy.get(this.errorButton).click();
    return this;
  }

  // Clear inputs
  clearInputs() {
    cy.get(this.usernameInput).clear();
    cy.get(this.passwordInput).clear();
    return this;
  }
}

export default LoginPage;
