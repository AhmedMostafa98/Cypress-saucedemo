import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import CheckoutOverviewPage from '../pages/CheckoutOverviewPage';
import CheckoutCompletePage from '../pages/CheckoutCompletePage';

describe('Checkout Tests', () => {
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
      productsPage = new ProductsPage(data);
      cartPage = new CartPage(data);
      checkoutPage = new CheckoutPage(data);
      checkoutOverviewPage = new CheckoutOverviewPage(data);
      checkoutCompletePage = new CheckoutCompletePage(data);

      // Login before each test
      cy.login(testData.login.username, testData.login.password);
    });
  });

  it('Scenario 1: Complete checkout with valid data should show THANK YOU message', () => {
    productsPage.addItemToCartByIndex(0);
    productsPage.addItemToCartByIndex(1);

    productsPage.goToCart();
    cartPage.verifyPageTitle();
    cartPage.verifyCartItemsCount(2);

    cartPage.proceedToCheckout();
    checkoutPage.verifyPageTitle();
    checkoutPage.fillCheckoutInfo(testData.firstName, testData.lastName, testData.postalCode);
    checkoutPage.clickContinue();

    checkoutOverviewPage.verifyPageTitle();
    checkoutOverviewPage.verifyCartItemsCount(2);
    checkoutOverviewPage.clickFinish();

    checkoutCompletePage.verifyCheckoutSuccess();
    checkoutCompletePage.verifyThankYouMessage();
    checkoutCompletePage.verifyCompleteText(testData.orderConfirmationMessage);
  });

  it('Scenario 2 (Optional): Try checkout without first name - should show validation error', () => {
    productsPage.addItemToCartByIndex(0);

    productsPage.goToCart();
    cartPage.verifyPageTitle();
    
    cartPage.proceedToCheckout();
    checkoutPage.verifyPageTitle();
    checkoutPage.typeLastName(testData.lastName);
    checkoutPage.typePostalCode(testData.postalCode);
    checkoutPage.clickContinue();

    checkoutPage.verifyErrorMessage();
    checkoutPage.verifyErrorText(testData.expectedErrorMessageFirstName);
  });
});