# SauceDemo Playwright AI

End-to-end UI test automation project for [SauceDemo](https://www.saucedemo.com/) built with **Playwright** and JavaScript, using the **Page Object Model (POM)** design pattern and an AI-assisted QA analysis workflow.

The project was created as a separate Playwright implementation alongside an existing Cypress test project. The goal was not simply to convert Cypress tests to Playwright, but to use the migration as an opportunity to improve test coverage, reduce redundant scenarios, strengthen test architecture, and demonstrate AI-assisted QA decision-making.

---

## Project Goals

The main goals of this project were to:

* build a Playwright-based E2E automation framework from an existing Cypress testing baseline;
* apply the Page Object Model to separate test logic from page interactions;
* analyze existing test coverage before adding new tests;
* identify redundant test scenarios instead of increasing test count unnecessarily;
* introduce meaningful additional coverage based on risk and state transitions;
* use stable and accessible Playwright locators;
* execute tests across Chromium, Firefox, and WebKit;
* integrate automated execution through GitHub Actions;
* demonstrate how AI can support QA analysis and test design rather than simply generate test code.

---

## Technology Stack

* **Playwright Test**
* **JavaScript**
* **Node.js / npm**
* **Page Object Model (POM)**
* **Git / GitHub**
* **GitHub Actions**
* **Chromium**
* **Firefox**
* **WebKit**
* **AI-assisted test analysis and test generation**

Playwright is currently used as the primary automation framework, with the project configured to execute the test suite across three browser engines.

---

## Project Structure

```text
saucedemo-playwright-ai/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── pages/
│   ├── loginPage.js
│   ├── productsPage.js
│   └── cartPage.js
│
├── tests/
│   ├── login.spec.js
│   ├── products.spec.js
│   └── cart.spec.js
│
├── documents/
│
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

The `pages` directory contains reusable Page Object classes, while the `tests` directory contains the corresponding test specifications.

---

# QA Approach

A key objective of this project was to avoid treating test automation as a simple exercise of writing as many test cases as possible.

The workflow used for each page was:

```text
Existing test baseline
        ↓
Coverage analysis
        ↓
Equivalence partitioning
        ↓
Boundary analysis
        ↓
State-transition analysis
        ↓
Risk-based test selection
        ↓
Identify redundant scenarios
        ↓
Implement high-value tests
        ↓
Execute across browsers
        ↓
Review failures
        ↓
Fix and re-run
```

This approach was intentionally used instead of blindly reproducing every existing Cypress test.

---

# AI-Assisted QA Workflow

AI was used as a **QA analysis and test-design assistant**, not only as a code generator.

For each application area, the existing implementation and test coverage were analyzed first.

The analysis considered:

* current functional coverage;
* equivalence partitions;
* boundary conditions;
* state transitions;
* negative scenarios;
* accessibility;
* usability;
* security-related boundaries;
* browser compatibility;
* potential test redundancy;
* automation value versus test maintenance cost.

The resulting scenarios were then classified into categories such as:

* existing coverage;
* genuinely new coverage;
* exploratory candidates;
* redundant scenarios;
* scenarios that should belong to another test suite.

This helped prevent unnecessary test duplication.

---

# Login Testing

The Login suite was initially based on the existing Cypress coverage.

The original functional scenarios included:

* valid credentials;
* invalid username;
* invalid password;
* invalid username + invalid password;
* locked-out user;
* empty username and password;
* empty username;
* empty password;
* failed login followed by successful login.

Instead of adding more variations of invalid credentials, the coverage analysis identified missing **behavioral boundaries**.

Five additional high-value scenarios were implemented:

| ID             | Scenario                                                        |
| -------------- | --------------------------------------------------------------- |
| `AI-SEC-001`   | Unauthenticated user cannot access the protected Inventory page |
| `AI-STATE-001` | Validation failure followed by successful login                 |
| `AI-UX-001`    | Login using the Enter key                                       |
| `AI-UX-002`    | Keyboard-only login                                             |
| `AI-ACC-001`   | Login controls expose meaningful accessible names               |

This increased the Login suite from 9 scenarios to 14 meaningful scenarios.

The suite is executed across three browser engines, resulting in 42 browser executions for the Login suite.

The project deliberately did **not** add arbitrary whitespace, Unicode, long-input, mobile, or other exploratory scenarios without first establishing expected application behavior.

---

# Inventory / Products Testing

The Inventory page was implemented as `productsPage.js`.

The tests focus on meaningful user and state transitions rather than repeating similar add-to-cart scenarios.

Current coverage includes:

* Inventory page loading;
* expected product count;
* product sorting;
* adding a product to the cart;
* adding multiple products;
* removing a product from the cart.

The state transitions covered include:

```text
Inventory loaded
      ↓
6 products displayed
```

```text
No products in cart
      ↓
1 product
```

```text
0 products
      ↓
1 product
      ↓
2 products
```

```text
1 product
      ↓
0 products
```

This provides stronger behavioral coverage than simply testing multiple different products independently.

---

# Cart Testing

The Cart page is represented by `cartPage.js`.

The Page Object encapsulates cart-specific elements and actions such as:

* cart title;
* cart items;
* quantity;
* price;
* Remove;
* Continue Shopping;
* Checkout.

The Page Object also exposes actions for:

* removing products;
* returning to shopping;
* proceeding to Checkout.

This keeps cart interaction logic out of the test specifications and maintains separation between page behavior and test intent.

---

# Page Object Model

The project uses the Page Object Model to separate:

### Test intent

from:

### UI implementation details

For example, tests express actions such as:

```javascript
await productsPage.addProductToCart('Sauce Labs Backpack');
```

rather than directly interacting with the underlying CSS selectors.

The current Page Objects are:

```text
LoginPage
ProductsPage
CartPage
```

The Login Page also uses accessibility-oriented locators where appropriate:

```javascript
page.getByRole('textbox', { name: 'Username' })
page.getByRole('textbox', { name: 'Password' })
page.getByRole('button', { name: 'Login' })
```

This allows the same locators to support both functional interaction and objective accessibility assertions.

---

# Locator Strategy

The project uses a combination of:

### Role-based locators

```javascript
page.getByRole()
```

Preferred where the element has a meaningful accessible role and name.

### Test IDs

```javascript
page.getByTestId()
```

Used where SauceDemo provides stable `data-test` attributes.

### CSS locators

```javascript
page.locator()
```

Used for stable structural elements where appropriate.

The goal is to avoid unnecessarily fragile selectors and keep selectors centralized inside Page Objects.

---

# Browser Coverage

The Playwright configuration supports:

* Chromium
* Firefox
* WebKit

The same functional suite is therefore exercised across multiple browser engines.

This is particularly useful for interaction-focused scenarios such as:

* keyboard submission;
* keyboard navigation;
* focus behavior;
* form interaction.

Mobile browser projects were intentionally not added because mobile testing was outside the current project scope.

---

# CI/CD

The repository includes a GitHub Actions workflow.

The workflow runs on:

* pushes to `main` / `master`;
* pull requests targeting `main` / `master`.

The CI pipeline:

1. checks out the repository;
2. installs Node.js;
3. installs npm dependencies;
4. installs Playwright browsers;
5. executes the Playwright test suite;
6. uploads the Playwright HTML report as a workflow artifact.

This allows the test suite to be executed automatically rather than relying only on local execution.

---

# Test Execution

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Run the complete test suite:

```bash
npx playwright test
```

Run a specific browser:

```bash
npx playwright test --project=chromium
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.js
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Open the HTML report:

```bash
npx playwright show-report
```

---

# Test Reporting

Playwright's HTML reporter is used to provide:

* test execution results;
* failed test details;
* execution traces where configured;
* browser/project information;
* failure context.

The CI workflow also uploads the generated Playwright report as an artifact.

---

# Test Design Principles

The project intentionally follows several QA principles.

### 1. Coverage over test count

Adding more tests does not automatically mean better coverage.

A new test should represent a genuinely different behavior, equivalence partition, boundary, state transition, or risk.

### 2. Avoid redundant scenarios

For example, once invalid username + valid password is covered, adding five different arbitrary invalid usernames generally does not provide five new meaningful equivalence classes.

### 3. Separate exploratory testing from regression automation

Unknown behavior should not automatically become a permanent automated assertion.

Exploration should first establish:

```text
What does the application actually do?
```

and, where necessary:

```text
What should the application do?
```

Only then should stable behavior or confirmed defects be converted into regression tests.

### 4. Prefer state transitions

Examples:

```text
0 → 1 → 2 cart items
```

or:

```text
validation failure → successful login
```

provide more meaningful behavioral coverage than repeating similar static tests.

### 5. Keep Page Objects focused

Page Objects should encapsulate:

* locators;
* page actions;
* page-specific behavior.

They should not contain unrelated business logic or assertions that belong in the test layer.

---

# Why This Project Exists Separately From the Cypress Project

This repository was intentionally created as a separate Playwright project rather than modifying the existing Cypress automation project.

The purpose was to:

* preserve the original Cypress implementation;
* compare two automation frameworks;
* experiment with a different automation architecture;
* practice Playwright independently;
* demonstrate framework migration and refactoring skills;
* avoid introducing risk into the existing Cypress project.

The Playwright project therefore represents an independent automation implementation rather than a destructive replacement of the Cypress suite.

---

# What Was Deliberately Not Added

The project does not attempt to test every theoretically possible input or user behavior.

The following areas were intentionally left outside the current regression scope unless supported by an established requirement or exploratory finding:

* arbitrary whitespace combinations;
* Unicode permutations;
* arbitrary special-character combinations;
* undocumented input length boundaries;
* mobile-specific testing;
* performance testing;
* rapid repeated submissions;
* extensive session/history testing;
* known SauceDemo defect-user scenarios as part of the core regression suite.

This keeps the regression suite focused and maintainable.

---

# Current Scope

The current project provides Playwright coverage for the core SauceDemo shopping flow:

```text
Login
  ↓
Inventory / Products
  ↓
Cart
```

The architecture is designed to continue expanding the flow into additional application areas while preserving the same POM and risk-based test-design approach.

---

# Future Improvements

Potential future improvements include:

* Checkout Page Object and checkout test coverage;
* order completion / confirmation coverage;
* broader session and logout testing;
* additional accessibility checks;
* test data centralization;
* authentication fixtures or storage state;
* improved test reporting;
* environment-based configuration;
* expanded CI quality gates.

These are intentionally future improvements rather than requirements for the current baseline.

---

# Conclusion

This project demonstrates more than basic Playwright syntax.

It demonstrates an end-to-end QA automation workflow:

```text
Analyze
  ↓
Design
  ↓
Prioritize
  ↓
Automate
  ↓
Execute
  ↓
Debug
  ↓
Refine
```

The central goal was to use AI as a **QA reasoning and test-design aid** while retaining human judgment over:

* what should be tested;
* what should not be tested;
* which scenarios are redundant;
* which risks deserve automation;
* which behaviors require exploratory testing;
* and how the automation should be architected.

The result is a maintainable Playwright POM project focused on meaningful functional coverage rather than maximizing the number of automated tests.
