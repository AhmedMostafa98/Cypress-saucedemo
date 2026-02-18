# Cypress — Sauce Demo (concise)

Overview
--------
This repository contains Cypress end-to-end tests for https://www.saucedemo.com using a Page Object Model (POM) structure. Tests cover login, cart, and checkout flows plus several advanced scenarios.

Project structure
-----------------
```
CypressSauceDemo/
├── cypress/
│   ├── e2e/            # test specs (login, cart, checkout, advanced)
│   ├── pages/          # page objects
│   ├── locators/       # centralized selectors (new)
│   ├── support/        # commands and setup
|   └── reports/        # reports and screenshots
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md           # this file
```

Install & run
---------------
1. Install dependencies:
```bash
npm install
```

2. Run tests (headless):
```bash
npx cypress run
```

Or open interactive runner:
```bash
npx cypress open
```

Generate report
---------------
Run the provided npm script which runs tests and generates a merged Mochawesome report:
```bash
npm run test:report
```

Or generate manually:
```bash
# run tests
npx cypress run --reporter cypress-mochawesome-reporter
```

Where to find results
---------------------
After report generation, open:
```
cypress/reports/index.html
```

That's it — run `npx cypress run` and view the report when finished.
