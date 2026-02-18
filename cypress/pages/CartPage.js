import { CartPageLocators } from '../locators/CartPageLocators';

class CartPage {
  constructor(data) {
    this.locators = CartPageLocators;
    this.pageTitle = this.locators.pageTitle;
    this.cartItem = this.locators.cartItem;
    this.cartItemName = this.locators.cartItemName;
    this.cartItemDesc = this.locators.cartItemDesc;
    this.cartItemPrice = this.locators.cartItemPrice;
    this.cartItemQuantity = this.locators.cartItemQuantity;
    this.removeButton = this.locators.removeButton;
    this.continueShoppingButton = this.locators.continueShoppingButton;
    this.checkoutButton = this.locators.checkoutButton;
    this.cartBadge = this.locators.cartBadge;
    this.testData = data;
  }
  
  // Verify page title
  verifyPageTitle() {
    cy.get(this.pageTitle).should('contain', this.testData.cartHeader);
    return this;
  }

  // Get all cart items
  getAllCartItems() {
    return cy.get(this.cartItem);
  }

  // Verify cart items count
  verifyCartItemsCount(expectedCount) {
    cy.get(this.cartItem).should('have.length', expectedCount);
    return this;
  }

  // Get cart items count
  getCartItemsCount() {
    return cy.get(this.cartItem).then((items) => items.length);
  }

  // Verify item exists in cart by name
  verifyItemInCart(productName) {
    cy.contains(this.cartItemName, productName).should('be.visible');
    return this;
  }

  // Verify item does NOT exist in cart by name
  verifyItemNotInCart(productName) {
    cy.contains(this.cartItemName, productName).should('not.exist');
    return this;
  }

  // Remove item from cart by name
  removeItemByName(productName) {
    cy.contains(this.cartItemName, productName)
      .closest(this.cartItem)
      .find(this.removeButton)
      .click();
    return this;
  }

  // Remove item from cart by index
  removeItemByIndex(index) {
    cy.get(this.cartItem).eq(index).find(this.removeButton).click();
    return this;
  }

  // Get item quantity
  getItemQuantity(productName) {
    return cy.contains(this.cartItemName, productName)
      .closest(this.cartItem)
      .find(this.cartItemQuantity)
      .invoke('text');
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

  // Get item price by index
  getItemPriceByIndex(index) {
    return cy.get(this.cartItem)
      .eq(index)
      .find(this.cartItemPrice)
      .invoke('text');
  }

  // Verify cart is empty
  verifyCartEmpty() {
    cy.get(this.cartItem).should('have.length', 0);
    return this;
  }

  // Click continue shopping
  continueShopping() {
    cy.get(this.continueShoppingButton).click();
    return this;
  }

  // Click checkout
  proceedToCheckout() {
    cy.get(this.checkoutButton).click();
    return this;
  }

  // Verify cart badge is not visible (empty cart)
  verifyCartBadgeNotVisible() {
    cy.get(this.cartBadge).should('not.exist');
    return this;
  }

  // Verify cart badge count
  verifyCartBadgeCount(expectedCount) {
    cy.get(this.cartBadge).should('have.text', expectedCount);
    return this;
  }
}

export default CartPage;
