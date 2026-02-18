import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';

describe('Login Tests', () => {
  let loginPage;
  let productsPage;
  let testData;

  beforeEach(() => {
    cy.fixture('data.json').then((data) => {
      testData = data;
      loginPage = new LoginPage();
      productsPage = new ProductsPage(data);
    });
  });

  it('Scenario 1: Successful login with standard user should land on Products page', () => {
    loginPage.visit();
    loginPage.login(testData.login.username, testData.login.password);

    productsPage.verifyPageTitle();
    cy.url().should('include', '/inventory.html');
  });

  it('Scenario 2: Failed login with locked_out_user should show locked-out message', () => {
    loginPage.visit();
    loginPage.login(testData.login.lockedOutUsername, testData.login.password);

    loginPage.verifyErrorMessage();
    loginPage.verifyErrorText(testData.login.loginlockedMessage);
  });
});