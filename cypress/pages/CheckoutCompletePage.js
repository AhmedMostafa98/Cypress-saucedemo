import { CheckoutCompletePageLocators } from '../locators/CheckoutCompletePageLocators';

class CheckoutCompletePage {
  constructor(data) {
    this.locators = CheckoutCompletePageLocators;
    this.pageTitle = this.locators.pageTitle;
    this.completeHeader = this.locators.completeHeader;
    this.completeText = this.locators.completeText;
    this.backHomeButton = this.locators.backHomeButton;
    this.testData = data;
  }

  // Verify page title - Checkout: Complete
  verifyPageTitle() {
    cy.get(this.pageTitle).should('contain', this.testData.checkoutCompleteHeader);
    return this;
  }

  // Verify "Thank you" message
  verifyThankYouMessage() {
    cy.get(this.completeHeader).should('contain', this.testData.thankYouMessage);
    return this;
  }

  // Get thank you message text
  getThankYouMessageText() {
    return cy.get(this.completeHeader).invoke('text');
  }

  // Verify order confirmation message
  verifyOrderConfirmation() {
    cy.get(this.completeText).should('contain', this.testData.orderConfirmationMessage);
    return this;
  }

  // Verify complete text message
  verifyCompleteText(expectedText) {
    cy.get(this.completeText).should('contain', expectedText);
    return this;
  }

  // Click back to products button
  backToProducts() {
    cy.get(this.backHomeButton).click();
    return this;
  }

  // Verify success page is displayed
  verifySuccessPageDisplayed() {
    cy.get(this.pageTitle).should('be.visible');
    cy.get(this.completeHeader).should('be.visible');
    cy.get(this.completeText).should('be.visible');
    cy.get(this.backHomeButton).should('be.visible');
    return this;
  }

  // Verify all success indicators
  verifyCheckoutSuccess() {
    this.verifyPageTitle();
    this.verifyThankYouMessage();
    this.verifySuccessPageDisplayed();
    return this;
  }
}

export default CheckoutCompletePage;
