import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';

describe('Login Tests', () => {
  let loginPage;
  let productsPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    productsPage = new ProductsPage();
  });

  it('Scenario 1: Successful login with standard user should land on Products page', () => {
    loginPage.visit();
    loginPage.login('standard_user', 'secret_sauce');

    productsPage.verifyPageTitle();
    cy.url().should('include', '/inventory.html');
  });

  it('Scenario 2: Failed login with locked_out_user should show locked-out message', () => {
    loginPage.visit();
    loginPage.login('locked_out_user', 'secret_sauce');

    loginPage.verifyErrorMessage();
    loginPage.verifyErrorText('Sorry, this user has been locked out');
  });
});