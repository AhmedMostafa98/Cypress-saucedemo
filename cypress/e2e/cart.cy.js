import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';

describe('Cart Tests', () => {
  let loginPage;
  let productsPage;
  let cartPage;
  let testData;

  beforeEach(() => {
    cy.fixture('data.json').then((data) => {
      testData = data;
      loginPage = new LoginPage();
      productsPage = new ProductsPage(testData);
      cartPage = new CartPage(testData);
      
      // Login before each test
      cy.login(testData.login.username, testData.login.password);
    });
  });

  it('Scenario 1: Add two items to cart and verify they appear with badge = 2', () => {
    productsPage.addItemToCartByIndex(0);
    productsPage.verifyCartBadgeCount('1');

    productsPage.addItemToCartByIndex(1);
    productsPage.verifyCartBadgeCount('2');

    productsPage.goToCart();
    cartPage.verifyPageTitle();
    cartPage.verifyCartItemsCount(2);
    cartPage.verifyCartBadgeCount('2');
  });

  it('Scenario 2: Add two item to cart, then remove it and verify badge decrements', () => {
    productsPage.addItemToCartByIndex(0);
    productsPage.verifyCartBadgeCount('1');

    productsPage.addItemToCartByIndex(1);
    productsPage.verifyCartBadgeCount('2');

    productsPage.removeItemFromCartByIndex(0);
    productsPage.verifyCartBadgeCount('1');
    
    productsPage.goToCart();
    cartPage.verifyPageTitle();
    cartPage.verifyCartItemsCount(1);
    cartPage.verifyCartBadgeCount('1');
  });
});