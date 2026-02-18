import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import CheckoutOverviewPage from '../pages/CheckoutOverviewPage';
import CheckoutCompletePage from '../pages/CheckoutCompletePage';

describe('My Testcases - Demonstrating Testing Capabilities', () => {
  let loginPage;
  let productsPage;
  let cartPage;
  let checkoutPage;
  let checkoutOverviewPage;
  let checkoutCompletePage;
  let testData;

  beforeEach(() => {
    cy.fixture('data.json').then((data) => {
      testData = data;
      loginPage = new LoginPage();
      productsPage = new ProductsPage(testData);
      cartPage = new CartPage(testData);
      checkoutPage = new CheckoutPage(testData);
      checkoutOverviewPage = new CheckoutOverviewPage(testData);
      checkoutCompletePage = new CheckoutCompletePage(testData);

      // Login before each test
      cy.login(testData.login.username, testData.login.password);
    });
  });

  it('Should add all available products to cart and complete checkout', () => {
    productsPage.addAllProductsToCart();
    productsPage.goToCart();
    cartPage.verifyCartItemsCount(6);
    cartPage.proceedToCheckout();
    checkoutPage.proceedToNextStep(testData.firstName, testData.lastName, testData.postalCode);
    checkoutOverviewPage.verifyCartItemsCount(6);
    checkoutOverviewPage.clickFinish();
    checkoutCompletePage.verifyCheckoutSuccess();
    });

  it('Should sort products by price and add lowest priced items', () => {
    productsPage.sortBy('Price (low to high)');
    productsPage.addItemToCartByIndex('0');
    productsPage.goToCart();
    cartPage.verifyCartItemsCount(1);
    cartPage.getItemPriceByIndex(0).should('eq', '$7.99');
    cartPage.verifyItemInCart("Sauce Labs Onesie");
  });

  it('Should handle complex data: special characters in checkout', () => {
      productsPage.addItemToCartByName('Sauce Labs Backpack');
      productsPage.goToCart();
      cartPage.proceedToCheckout();
      checkoutPage.proceedToNextStep('!@#$%^&*()', '()_+|}{":?><', 'ABCDE');
      checkoutOverviewPage.verifyItemInOverview('Sauce Labs Backpack');
      checkoutOverviewPage.clickFinish();
      checkoutCompletePage.verifyCheckoutSuccess();
  });

  it('Should verify total price calculation is correct', () => {
    productsPage.addItemToCartByName('Sauce Labs Fleece Jacket');
    let productPrices = 0;
    productsPage.getProductPriceByName('Sauce Labs Fleece Jacket').then((priceText) => {
      const price = parseFloat(priceText.replace('$', ''));
      productPrices += price;
    });
    productsPage.addItemToCartByName('Sauce Labs Bolt T-Shirt');
    productsPage.getProductPriceByName('Sauce Labs Bolt T-Shirt').then((priceText) => {
      const price = parseFloat(priceText.replace('$', ''));
      productPrices += price;
    });
    productsPage.goToCart();
    cartPage.proceedToCheckout();
    checkoutPage.proceedToNextStep(testData.firstName, testData.lastName, testData.postalCode);
    checkoutOverviewPage.verifyItemInOverview('Sauce Labs Fleece Jacket');
    checkoutOverviewPage.verifyItemInOverview('Sauce Labs Bolt T-Shirt');
    checkoutOverviewPage.getSubtotal().then((subtotalText) => {
      const subtotal = parseFloat(subtotalText.replace('Item total: $', ''));
      expect(subtotal).to.eq(productPrices);
    });
  });

  it('Testing normal flow with the created commands in commands.js', () => {
    cy.addItemToCart('Sauce Labs Backpack');
    cy.getCartBadgeCount().should('eq', '1');
    cy.goToCart();
    cy.proceedToCheckout();
    cy.fillCheckoutInfo(testData.firstName, testData.lastName, testData.postalCode);
    cy.completeCheckout();
  });
});