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

  beforeEach(() => {
    loginPage = new LoginPage();
    productsPage = new ProductsPage();
    cartPage = new CartPage();
    checkoutPage = new CheckoutPage();
    checkoutOverviewPage = new CheckoutOverviewPage();
    checkoutCompletePage = new CheckoutCompletePage();

    // Login before each test
    cy.login('standard_user', 'secret_sauce');
  });

  it('Scenario 1: Complete checkout with valid data should show THANK YOU message', () => {
    productsPage.addItemToCartByIndex(0);
    productsPage.addItemToCartByIndex(1);

    productsPage.goToCart();
    cartPage.verifyPageTitle();
    cartPage.verifyCartItemsCount(2);

    cartPage.proceedToCheckout();
    checkoutPage.verifyPageTitle();
    checkoutPage.fillCheckoutInfo('Ahmed', 'Mostafa', '12777');
    checkoutPage.clickContinue();

    checkoutOverviewPage.verifyPageTitle();
    checkoutOverviewPage.verifyCartItemsCount(2);
    checkoutOverviewPage.clickFinish();

    checkoutCompletePage.verifyCheckoutSuccess();
    checkoutCompletePage.verifyThankYouMessage();
    checkoutCompletePage.verifyCompleteText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  });

  it('Scenario 2 (Optional): Try checkout without first name - should show validation error', () => {
    productsPage.addItemToCartByIndex(0);

    productsPage.goToCart();
    cartPage.verifyPageTitle();
    
    cartPage.proceedToCheckout();
    checkoutPage.verifyPageTitle();
    checkoutPage.typeLastName('Mostafa');
    checkoutPage.typePostalCode('12777');
    checkoutPage.clickContinue();

    checkoutPage.verifyErrorMessage();
    checkoutPage.verifyErrorText('First Name is required');
  });
});