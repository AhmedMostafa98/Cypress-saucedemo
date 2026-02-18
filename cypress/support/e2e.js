// Cypress support file
// This file is executed before each spec file

// Import commands
import './commands';

// Add mochawesome reporter
import 'cypress-mochawesome-reporter/register';

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent Cypress from failing the test
  return false;
});

afterEach(() => {
  // This will take a screenshot after every test
  cy.screenshot(`Result - ${Cypress.currentTest.title}`);
});
