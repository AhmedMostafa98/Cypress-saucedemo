// Custom commands for Cypress tests
import { LoginPageLocators } from '../locators/LoginPageLocators';
import { ProductsPageLocators } from '../locators/ProductsPageLocators';
import { CartPageLocators } from '../locators/CartPageLocators';
import { CheckoutPageLocators } from '../locators/CheckoutPageLocators';
import { CheckoutOverviewPageLocators } from '../locators/CheckoutOverviewPageLocators';

// Login command
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  cy.get(LoginPageLocators.usernameInput).type(username);
  cy.get(LoginPageLocators.passwordInput).type(password);
  cy.get(LoginPageLocators.loginButton).click();
});

// Add item to cart by product name
Cypress.Commands.add('addItemToCart', (productName) => {
  cy.contains(ProductsPageLocators.inventoryItemName, productName)
    .closest(ProductsPageLocators.inventoryItems)
    .find(ProductsPageLocators.addToCartButton)
    .click();
});

// Remove item from cart by product name
Cypress.Commands.add('removeItemFromCart', (productName) => {
  cy.contains(ProductsPageLocators.inventoryItemName, productName)
    .closest(ProductsPageLocators.inventoryItem)
    .find(ProductsPageLocators.removeFromCartButton)
    .click();
});

// Get cart badge count
Cypress.Commands.add('getCartBadgeCount', () => {
  return cy.get(ProductsPageLocators.cartBadge).invoke('text');
});

// Go to cart
Cypress.Commands.add('goToCart', () => {
  cy.get(ProductsPageLocators.cartLink).click();
});

// Proceed to checkout
Cypress.Commands.add('proceedToCheckout', () => {
  cy.get(CartPageLocators.checkoutButton).click();
});

// Fill checkout information
Cypress.Commands.add('fillCheckoutInfo', (firstName, lastName, postalCode) => {
  cy.get(CheckoutPageLocators.firstNameInput).type(firstName);
  cy.get(CheckoutPageLocators.lastNameInput).type(lastName);
  cy.get(CheckoutPageLocators.postalCodeInput).type(postalCode);
  cy.get(CheckoutPageLocators.continueButton).click();
});

// Complete checkout
Cypress.Commands.add('completeCheckout', () => {
  cy.get(CheckoutOverviewPageLocators.finishButton).click();
});
