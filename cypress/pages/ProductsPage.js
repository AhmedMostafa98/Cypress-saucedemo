import { ProductsPageLocators } from '../locators/ProductsPageLocators';

class ProductsPage {
  constructor(data) {
    this.locators = ProductsPageLocators;
    this.pageTitle = this.locators.pageTitle;
    this.inventory = this.locators.inventory;
    this.inventoryItems = this.locators.inventoryItems;
    this.inventoryItemName = this.locators.inventoryItemName;
    this.inventoryItemDesc = this.locators.inventoryItemDesc;
    this.inventoryItemPrice = this.locators.inventoryItemPrice;
    this.addToCartButton = this.locators.addToCartButton;
    this.removeButton = this.locators.removeButton;
    this.cartLink = this.locators.cartLink;
    this.cartBadge = this.locators.cartBadge;
    this.sortDropdown = this.locators.sortDropdown;
    this.menuButton = this.locators.menuButton;
    this.logoutLink = this.locators.logoutLink;
    this.allItems = this.locators.allItems;
    this.About = this.locators.About;
    this.ResetAppState = this.locators.ResetAppState;
    this.testData = data;
  }

  // Verify page title
  verifyPageTitle() {
    cy.get(this.pageTitle).should('contain', this.testData.productsHeader);
    return this;
  }

  // Get all inventory items
  getAllInventoryItems() {
    return cy.get(this.inventoryItems);
  }

  // Get item count
  getItemCount() {
    return cy.get(this.inventoryItems).then((items) => items.length);
  }

  // Add item to cart by index
  addItemToCartByIndex(index) {
    cy.get(this.inventoryItems).eq(index).find(this.addToCartButton).click();
    return this;
  }

  // Add item to cart by partial name
  addItemToCartByName(productName) {
    cy.contains(this.inventoryItemName, productName)
      .closest(this.inventoryItems)
      .find(this.addToCartButton)
      .click();
    return this;
  }

  // Remove item from cart by partial name
  removeItemFromCartByName(productName) {
    cy.contains(this.inventoryItemName, productName)
      .closest(this.inventoryItems)
      .find(this.removeButton)
      .click();
    return this;
  }

  // Remove item from cart by index
  removeItemFromCartByIndex(index) {
    cy.get(this.inventoryItems).eq(index).find(this.removeButton).click();
    return this;
  }

  // Get cart badge count
  getCartBadgeCount() {
    return cy.get(this.cartBadge).invoke('text');
  }

  // Verify cart badge count
  verifyCartBadgeCount(expectedCount) {
    cy.get(this.cartBadge).should('have.text', expectedCount);
    return this;
  }

  // Verify cart badge is visible
  verifyCartBadgeVisible() {
    cy.get(this.cartBadge).should('be.visible');
    return this;
  }

  // Verify cart badge is not visible
  verifyCartBadgeNotVisible() {
    cy.get(this.cartBadge).should('not.exist');
    return this;
  }

  // Click on cart link
  goToCart() {
    cy.get(this.cartLink).click();
    return this;
  }

  // Verify item is in cart page by name
  verifyItemInCart(productName) {
    cy.contains(this.inventoryItemName, productName).should('be.visible');
    return this;
  }

  // Verify item is not shown in products (removed from cart visually indicator)
  verifyItemAddedToCart(productName) {
    cy.contains(this.inventoryItemName, productName)
      .closest(this.inventoryItems)
      .find(this.removeButton)
      .should('be.visible');
    return this;
  }

  // Sort products
  sortBy(option) {
    cy.get(this.sortDropdown).select(option);
    return this;
  }

  // Open menu
  openMenu() {
    cy.get(this.menuButton).click();
    return this;
  }

  // Click logout
  logout() {
    this.openMenu();
    cy.get(this.logoutLink).click();
    return this;
  }

  // Get product price by name
  getProductPriceByName(productName) {
    return cy.contains(this.inventoryItemName, productName)
      .closest(this.inventoryItems)
      .find(this.inventoryItemPrice)
      .invoke('text');
  }

  // Click on product by name to view details
  clickProductByName(productName) {
    cy.contains(this.inventoryItemName, productName).click();
    return this;
  }

  // Add all products to cart
  addAllProductsToCart() {
    cy.get(this.addToCartButton).each((button) => {
      cy.wrap(button).click();
    });
    return this;
  }
}
export default ProductsPage;
