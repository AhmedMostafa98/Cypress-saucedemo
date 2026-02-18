import { CheckoutOverviewPageLocators } from '../locators/CheckoutOverviewPageLocators';

class CheckoutOverviewPage {
  constructor() {
    this.locators = CheckoutOverviewPageLocators;
    this.pageTitle = this.locators.pageTitle;
    this.cartItem = this.locators.cartItem;
    this.cartItemName = this.locators.cartItemName;
    this.cartItemDesc = this.locators.cartItemDesc;
    this.cartItemPrice = this.locators.cartItemPrice;
    this.cartItemQuantity = this.locators.cartItemQuantity;
    this.summarySubtotal = this.locators.summarySubtotal;
    this.summaryTax = this.locators.summaryTax;
    this.summaryTotal = this.locators.summaryTotal;
    this.finishButton = this.locators.finishButton;
    this.cancelButton = this.locators.cancelButton;
    this.cartBadge = this.locators.cartBadge;
  }

  // Verify page title - Checkout: Overview
  verifyPageTitle() {
    cy.get(this.pageTitle).should('contain', 'Checkout: Overview');
    return this;
  }

  // Get all cart items
  getAllCartItems() {
    return cy.get(this.cartItem);
  }

  // Get cart items count
  getCartItemsCount() {
    return cy.get(this.cartItem).then((items) => items.length);
  }

  // Verify cart items count
  verifyCartItemsCount(expectedCount) {
    this.getCartItemsCount().should('eq', expectedCount);
    return this;
  }

  // Verify item exists in overview by name
  verifyItemInOverview(productName) {
    cy.contains(this.cartItemName, productName).should('be.visible');
    return this;
  }

  // Verify item quantity
  verifyItemQuantity(productName, expectedQuantity) {
    cy.contains(this.cartItemName, productName)
      .closest(this.cartItem)
      .find(this.cartItemQuantity)
      .should('have.text', expectedQuantity);
    return this;
  }

  // Get item price by name
  getItemPriceByName(productName) {
    return cy.contains(this.cartItemName, productName)
      .closest(this.cartItem)
      .find(this.cartItemPrice)
      .invoke('text');
  }

  // Get subtotal
  getSubtotal() {
    return cy.get(this.summarySubtotal).invoke('text');
  }

  // Get tax
  getTax() {
    return cy.get(this.summaryTax).invoke('text');
  }

  // Get total
  getTotal() {
    return cy.get(this.summaryTotal).invoke('text');
  }

  // Verify subtotal
  verifySubtotal(expectedValue) {
    cy.get(this.summarySubtotal).should('contain', expectedValue);
    return this;
  }

  // Verify tax
  verifyTax(expectedValue) {
    cy.get(this.summaryTax).should('contain', expectedValue);
    return this;
  }

  // Verify total
  verifyTotal(expectedValue) {
    cy.get(this.summaryTotal).should('contain', expectedValue);
    return this;
  }

  // Click finish button to complete order
  clickFinish() {
    cy.get(this.finishButton).click();
    return this;
  }

  // Click cancel button
  clickCancel() {
    cy.get(this.cancelButton).click();
    return this;
  }

  // Verify cart badge count
  verifyCartBadgeCount(expectedCount) {
    cy.get(this.cartBadge).should('have.text', expectedCount);
    return this;
  }
}

export default CheckoutOverviewPage;
