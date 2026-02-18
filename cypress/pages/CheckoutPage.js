import { CheckoutPageLocators } from '../locators/CheckoutPageLocators';

class CheckoutPage {
  constructor(data) {
    this.locators = CheckoutPageLocators;
    this.pageTitle = this.locators.pageTitle;
    this.firstNameInput = this.locators.firstNameInput;
    this.lastNameInput = this.locators.lastNameInput;
    this.postalCodeInput = this.locators.postalCodeInput;
    this.continueButton = this.locators.continueButton;
    this.cancelButton = this.locators.cancelButton;
    this.errorMessage = this.locators.errorMessage;
    this.errorButton = this.locators.errorButton;
    this.testData = data;
  }

  // Verify page title - Checkout: Your Information
  verifyPageTitle() {
    cy.get(this.pageTitle).should('contain', this.testData.checkoutInformationHeader);
    return this;
  }

  // Get first name input
  getFirstNameInput() {
    return cy.get(this.firstNameInput);
  }

  // Get last name input
  getLastNameInput() {
    return cy.get(this.lastNameInput);
  }

  // Get postal code input
  getPostalCodeInput() {
    return cy.get(this.postalCodeInput);
  }

  // Type first name
  typeFirstName(firstName) {
    cy.get(this.firstNameInput).type(firstName);
    return this;
  }

  // Type last name
  typeLastName(lastName) {
    cy.get(this.lastNameInput).type(lastName);
    return this;
  }

  // Type postal code
  typePostalCode(postalCode) {
    cy.get(this.postalCodeInput).type(postalCode);
    return this;
  }

  // Fill checkout information
  fillCheckoutInfo(firstName, lastName, postalCode) {
    this.typeFirstName(firstName);
    this.typeLastName(lastName);
    this.typePostalCode(postalCode);
    return this;
  }

  // Click continue button
  clickContinue() {
    cy.get(this.continueButton).click();
    return this;
  }

  // Click cancel button
  clickCancel() {
    cy.get(this.cancelButton).click();
    return this;
  }

  // Proceed to next step
  proceedToNextStep(firstName, lastName, postalCode) {
    this.fillCheckoutInfo(firstName, lastName, postalCode);
    this.clickContinue();
    return this;
  }

  // Verify error message is displayed
  verifyErrorMessage() {
    cy.get(this.errorMessage).should('be.visible');
    return this;
  }

  // Verify specific error text
  verifyErrorText(expectedText) {
    cy.get(this.errorMessage).should('contain', expectedText);
    return this;
  }

  // Verify error container is visible
  verifyErrorContainerVisible() {
    cy.get(this.errorMessage).should('be.visible');
    return this;
  }

  // Verify first name field has error (required field)
  verifyFirstNameFieldError() {
    this.verifyErrorText(this.testData.firstNameRequiredError);
    return this;
  }

    // Verify last name field has error (required field)
  verifyLastNameFieldError() {
    this.verifyErrorText(this.testData.lastNameRequiredError);
    return this;
  }

    // Verify postal code field has error (required field)
  verifyPostalCodeFieldError() {
    this.verifyErrorText(this.testData.postalCodeRequiredError);
    return this;
  }

  // Clear all inputs
  clearInputs() {
    cy.get(this.firstNameInput).clear();
    cy.get(this.lastNameInput).clear();
    cy.get(this.postalCodeInput).clear();
    return this;
  }

  // Verify input values
  verifyFirstNameValue(expectedValue) {
    cy.get(this.firstNameInput).should('have.value', expectedValue);
    return this;
  }

  verifyLastNameValue(expectedValue) {
    cy.get(this.lastNameInput).should('have.value', expectedValue);
    return this;
  }

  verifyPostalCodeValue(expectedValue) {
    cy.get(this.postalCodeInput).should('have.value', expectedValue);
    return this;
  }
}

export default CheckoutPage;
