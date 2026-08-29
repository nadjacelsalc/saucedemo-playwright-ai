AI-ASSISTED QA TEST DESIGN PROMPT LIBRARY SauceDemo – Playwright POM
Project

Purpose

This document is a reusable prompt library for the AI-assisted QA
workflow of the SauceDemo Playwright project.

The existing Cypress project was used as the functional baseline. The
repository contains these E2E areas: - login.cy.js - products.cy.js -
cart.cy.js - checkoutone.cy.js - checkouttwo.cy.js -
checkoutcomplete.cy.js - menu.cy.js

The Page Object Model contains: - loginPage.js - productsPage.js -
cartPage.js - checkoutonePage.js - checkouttwoPage.js -
checkoutcompletePage.js - menuPages.js

The purpose is NOT to blindly reproduce the existing Cypress tests. The
AI should use them as a baseline, identify what is already covered, then
propose stronger, broader and non-redundant coverage for the Playwright
project.

IMPORTANT QA PRINCIPLE

AI suggestions are recommendations, not automatically accepted
requirements. The QA engineer should review every generated test case,
verify that the proposed behavior is supported by the application,
distinguish defects from incorrect assumptions, remove duplicates,
prioritize by risk, and only then implement tests.

RECOMMENDED OUTPUT FORMAT

Whenever a prompt asks for test cases, request this structure:

TC ID Title Requirement / feature Preconditions Test data Steps Expected
result Priority (Critical / High / Medium / Low) Test type Risk covered
Automation candidate (Yes / No / Maybe) Dependencies Notes / assumptions

For exploratory or heuristic prompts, additionally request: - Why this
scenario matters - What existing test(s) it complements - Whether it is
genuinely new or redundant - Suggested oracle / assertion - Potential
defect it could reveal

PROJECT-SPECIFIC BASELINE

Login POM: - visit() - enterUsername(username) -
enterPassword(password) - clickLogin() - getError()

Products POM: - getTitle() - addProductToCart(productName) -
removeProductFromCart(productName) - openCart() - getSortDropdown() -
selectSort(optionText)

Cart POM: - getTitle() - getCartItems() - getQuantity() - getPrice() -
removeProductFromCart(productName) - continueShopping()

Checkout One POM: - getTitle() - enterFirstName(firstName) -
getFirstName() - getLastName() - getZipCode() -
enterLastName(lastName) - enterZipCode(zipCode) - clickContinue() -
clickCancel()

Checkout Two POM: - getTitle() - getItems() - getInventoryItemPrice() -
getInventoryPaymentInfo() - getInventorySubtotalLabel() -
getInventoryTax() - getTotal() - clickCancel() - clickFinish()

Checkout Complete POM: - getTitle() - getCompleteHeader() -
getCompleteText() - getPonyExpressImage() - getBackHomeButton() -
clickBackHome()

Menu POM: - openMenu() - closeMenu() - getMenu() - allItems() -
about() - logout() - resetAppState()

The existing Cypress implementation also provides a useful baseline of
currently covered scenarios. For example, the login suite covers
successful login, invalid credentials, locked-out user, empty fields and
invalid password. Products covers product display/interactions and
sorting. Cart covers cart contents, quantities, prices, removal and
navigation. Checkout is split into information entry, order review and
completion. Menu covers opening/closing the menu, navigation, logout and
reset behavior.

============================================================ 1. MASTER
PROMPT – UNDERSTAND THE EXISTING POM AND TEST SUITE
============================================================

PROMPT

Act as a Senior QA Engineer and Test Architect.

I am migrating an existing Cypress UI automation project to Playwright
using the Page Object Model (POM). I will provide: 1. The Page Object
for the feature. 2. The existing Cypress E2E tests for that feature. 3.
Any available application requirements or expected behavior.

Your task is to analyze the POM and existing tests before proposing new
tests.

Do NOT simply reproduce the existing test cases.

First: - identify all user-facing functionality represented by the
POM; - map each POM method to the functionality it represents; - map
existing tests to those POM methods; - identify which behaviors are
already covered; - identify duplicate or overlapping tests; - identify
weak assertions; - identify missing assertions; - identify missing
negative cases; - identify missing edge cases; - identify assumptions
that are not supported by the supplied information.

Then produce: A. Existing coverage summary B. Coverage gaps C.
Recommended new test cases D. Recommended tests that should be modified
rather than duplicated E. Tests that should be removed or merged because
they are redundant F. Suggested priority and risk level for every
recommendation

Do not invent application behavior. If a requirement is unknown,
explicitly label it as an assumption and suggest how a QA engineer could
verify it.

============================================================ 2. LOGIN
PAGE – BASIC TEST GENERATION
============================================================

POM: loginPage.js

Known POM behavior: - visit() - enterUsername(username) -
enterPassword(password) - clickLogin() - getError()

PROMPT – BASIC LOGIN TEST CASE GENERATION

Act as a Senior QA Engineer.

Analyze the SauceDemo login page and the supplied LoginPage POM.
Generate a comprehensive functional test suite for the login feature.

Use the existing Cypress login tests only as a baseline. Do not
duplicate tests that are already covered unless you are proposing a
stronger replacement.

At minimum evaluate: - successful login; - invalid username; - invalid
password; - invalid username + invalid password; - locked-out user; -
empty username; - empty password; - both fields empty; - error message
content; - error message visibility; - user remaining on login page
after unsuccessful login; - successful navigation after valid login; -
password field behavior; - username field behavior; - repeated login
attempts; - logout/login cycle if relevant to the application flow.

For every test provide: TC ID, title, preconditions, test data, steps,
expected result, priority, test type, risk, and automation suitability.

Do not assume that a feature exists merely because it is common in other
login systems. Clearly distinguish observed behavior from recommended
testing.

PROMPT – LOGIN TEST SUITE REVIEW

Review the following login test cases as a Senior QA Engineer.

Look for: - missing scenarios; - duplicate scenarios; - weak expected
results; - assertions that prove only that “something happened” instead
of proving the correct outcome; - missing URL/page-state assertions; -
missing error-message assertions; - missing field-level validation; -
insufficient distinction between authentication failure and UI
validation; - tests that are too implementation-specific; - tests that
would be flaky; - tests that should be combined or parameterized.

Return a revised test suite and explain every change.

============================================================ 3. LOGIN –
EXPLORATORY TESTING PROMPTS
============================================================

PROMPT – EXPLORATORY LOGIN TESTING

Act as an experienced exploratory tester performing a focused
exploratory testing session against the SauceDemo login page.

Review the existing login test suite first.

Then deliberately search for scenarios that the existing tests do NOT
cover.

Think beyond the obvious happy path and standard invalid-credential
cases.

Explore: - unusual input combinations; - unexpected input formats; -
whitespace; - leading/trailing spaces; - case sensitivity; - very long
values; - repeated submissions; - rapid repeated clicks; - browser
refresh at different states; - back/forward navigation; - keyboard-only
interaction; - focus behavior; - tab order; - Enter key submission; -
visible versus hidden password; - error persistence and dismissal; -
state after failed login; - state after successful login; - behavior
after logout and returning to login; - browser reload; - direct
navigation to protected pages while unauthenticated.

For each NEW scenario: 1. explain why it was not covered previously; 2.
provide a test case; 3. provide expected behavior; 4. identify the risk; 5. state whether it should be automated.

Do not repeat scenarios already covered.

PROMPT – LOGIN EQUIVALENCE PARTITIONING

Analyze login inputs using equivalence partitioning.

Identify meaningful input classes for: - username; - password; -
credential combinations.

Consider classes such as: - valid credentials; - invalid credentials; -
empty; - whitespace-only; - very short; - unusually long; -
valid-looking but nonexistent; - special characters; - mixed case; -
malformed input.

Do not invent undocumented length limits. If a boundary is unknown, mark
it as unknown and recommend exploratory testing to discover the
behavior.

Select the minimum representative set that gives useful coverage without
creating unnecessary duplicate tests.

PROMPT – LOGIN BOUNDARY VALUE ANALYSIS

Perform boundary value analysis for all login inputs where a meaningful
boundary can be inferred or experimentally discovered.

Identify: - minimum accepted length; - maximum accepted length; - values
immediately below a boundary; - values at the boundary; - values
immediately above the boundary; - empty input; - whitespace-only input.

If the application does not expose a documented boundary, do not invent
one. Instead, propose an exploratory boundary-discovery test and explain
what should be observed.

PROMPT – LOGIN NEGATIVE TESTING

Generate additional negative tests for login that are not already
present.

Consider: - missing username; - missing password; - both missing; -
whitespace; - invalid credential combinations; - unexpected
characters; - excessively long input; - repeated invalid attempts; -
navigation after failed login; - direct access to authenticated pages
without authentication.

Separate genuine application behavior from generic security assumptions.

PROMPT – LOGIN STATE TRANSITIONS

Model login as a state machine.

Possible states may include: - Login page, unauthenticated; -
credentials entered; - validation error; - authentication failure; -
authenticated/inventory page; - logged out.

Generate tests for valid and invalid transitions between states.

Pay special attention to: - failed login followed by corrected
credentials; - successful login followed by logout; - logout followed by
back navigation; - refresh after login; - refresh after failed login; -
direct navigation to protected content without authentication.

============================================================ 4. PRODUCTS
PAGE – BASIC TEST GENERATION
============================================================

POM: productsPage.js

Known behavior: - getTitle() - addProductToCart(productName) -
removeProductFromCart(productName) - openCart() - getSortDropdown() -
selectSort(optionText)

PROMPT – BASIC PRODUCTS TEST GENERATION

Act as a Senior QA Engineer.

Generate a comprehensive functional test suite for the SauceDemo
Products page based on the ProductsPage POM and existing products.cy.js
tests.

Cover: - correct Products page loaded; - product list is displayed; -
product names are displayed; - product prices are displayed; - product
images are displayed; - add one product to cart; - add multiple
products; - remove a product from cart; - add then remove the same
product; - cart badge/count behavior; - open cart; - sorting by every
supported sort option; - sorting correctness, not merely dropdown
selection; - product order after sorting; - product data consistency
before and after sorting; - interaction with the correct product when
selecting by product name; - behavior when the cart is empty; - behavior
when the cart contains multiple products.

Do not assume unsupported sorting options. Derive supported options from
the application or supplied test data.

For each test include exact expected outcomes and strong assertions.

PROMPT – PRODUCTS TEST REVIEW

Review the existing Products tests.

Identify: - whether sorting tests verify actual order; - whether
add-to-cart tests verify the cart state; - whether remove tests verify
the cart state; - whether tests depend on another test’s state; -
whether product selection is robust; - whether the same product is
repeatedly used unnecessarily; - missing empty-cart scenarios; - missing
multi-product scenarios; - missing state-transition coverage.

Provide an improved test suite.

============================================================ 5. PRODUCTS
– EXPLORATORY AND HEURISTIC PROMPTS
============================================================

PROMPT – EXPLORATORY PRODUCTS TESTING

Act as an exploratory tester.

Review all existing Products tests and the ProductsPage POM. Then
actively search for untested scenarios.

Explore: - adding different products; - adding every available
product; - removing products in different orders; - adding and removing
the same product repeatedly; - adding multiple products and verifying
independent state; - sorting before adding to cart; - sorting after
adding to cart; - sorting after removing products; - opening the cart
after sorting; - product information consistency; - product image
loading; - product button text/state changes; - cart badge changes; -
browser refresh after cart changes; - back/forward navigation; - direct
navigation to the Products page; - empty cart state; - large cart
state; - repeated clicks; - fast repeated interactions; - keyboard
interaction; - responsive layout if supported.

Only return scenarios that are not already covered.

PROMPT – PRODUCTS EQUIVALENCE PARTITIONING

Use equivalence partitioning for: - product selection; - cart state; -
sort options; - number of products selected.

Consider: - one valid product; - multiple valid products; - all
products; - no products; - valid sort option; - unsupported/invalid sort
value if the UI permits such a state.

Identify representative cases and avoid testing every permutation unless
risk justifies it.

PROMPT – PRODUCTS BOUNDARY VALUE ANALYSIS

Perform boundary analysis around: - zero products; - one product; -
maximum available product count; - first product; - last product; -
first/last position after sorting; - repeated add/remove operations.

Where no formal numeric boundary exists, identify practical UI/state
boundaries.

PROMPT – PRODUCTS STATE TRANSITIONS

Model: - empty cart -> one product; - one product -> multiple
products; - multiple products -> one; - one -> zero; - sorted -> cart
interaction; - cart interaction -> sorted; - product added -> product
removed; - page refresh -> persisted or reset state.

Generate tests for important transitions not already covered.

PROMPT – PRODUCTS DATA VALIDATION

Validate that: - product names are consistent; - prices are numeric and
correctly formatted; - product data remains consistent after sorting; -
the product selected for add/remove is the intended product; - cart item
data matches the source product data.

Do not rely solely on CSS selectors as proof of correctness.

============================================================ 6. CART
PAGE – BASIC TEST GENERATION
============================================================

POM: cartPage.js

Known behavior: - getTitle() - getCartItems() - getQuantity() -
getPrice() - removeProductFromCart(productName) - continueShopping()

PROMPT – BASIC CART TEST GENERATION

Generate a comprehensive functional test suite for the SauceDemo Cart
page.

Use the existing cart.cy.js tests as the baseline.

Cover: - opening an empty cart; - opening cart with one item; - opening
cart with multiple items; - correct item names; - correct item
quantities; - correct item prices; - remove one item; - remove the last
item; - remove one item from multiple items; - verify remaining items
are unchanged; - continue shopping; - returning from cart to products; -
cart badge/count consistency; - cart state after navigation; - cart
state after refresh where applicable; - checkout navigation if
represented in the application flow.

For every test require an explicit oracle proving the cart state is
correct.

PROMPT – CART TEST REVIEW

Review the existing cart test suite for: - item-count assertions; -
quantity assertions; - price assertions; - empty-cart coverage; -
multi-item coverage; - removal correctness; - navigation correctness; -
independence between tests; - state leakage; - missing checkout
transition coverage.

Identify weak or redundant tests and propose replacements.

============================================================ 7. CART –
EXPLORATORY AND HEURISTIC PROMPTS
============================================================

PROMPT – EXPLORATORY CART TESTING

Act as an exploratory tester focusing on shopping-cart state management.

Review the existing tests and generate only new scenarios.

Explore: - empty cart; - one item; - multiple items; - all products; -
remove first/last/middle item; - remove items in reverse order; -
add/remove/re-add; - sorting products before opening cart; - cart after
browser refresh; - back/forward navigation; - continue shopping and
return to cart; - stale cart state; - repeated removal; - repeated
clicks; - quantity consistency; - price consistency; - item order; -
transition into checkout.

For every scenario explain what defect it could reveal.

PROMPT – CART EQUIVALENCE PARTITIONING

Partition cart states into: - empty; - one item; - multiple items; - all
available items.

For removal: - only item; - first of multiple; - middle of multiple; -
last of multiple.

Generate representative tests for each meaningful class.

PROMPT – CART BOUNDARY VALUE ANALYSIS

Analyze: - zero items; - one item; - maximum available items; -
first/last item; - transitions from 1 -> 0 and 2 -> 1.

Identify whether the cart count, item count, and displayed quantity
remain correct at these boundaries.

PROMPT – CART STATE TRANSITIONS

Create a state-transition model for: Empty -> Item Item -> Multiple
Multiple -> Item Item -> Empty Cart -> Products Products -> Cart Cart ->
Checkout

Generate missing transition tests and identify invalid transitions that
should be blocked.

PROMPT – CART DATA VALIDATION

Validate: - product name; - quantity; - price; - item count; - cart
badge; - consistency between Products and Cart; - consistency after
removal; - consistency after returning to Products.

For each assertion, explain why it is an effective oracle.

============================================================ 8. CHECKOUT
ONE – INFORMATION FORM
============================================================

POM: checkoutonePage.js

Known behavior: - getTitle() - enterFirstName() - getFirstName() -
getLastName() - getZipCode() - enterLastName() - enterZipCode() -
clickContinue() - clickCancel()

PROMPT – BASIC CHECKOUT ONE TEST GENERATION

Generate a comprehensive test suite for the first checkout step.

Cover: - page title; - valid first name; - valid last name; - valid
postal code; - all fields valid; - missing first name; - missing last
name; - missing postal code; - all fields empty; - invalid postal-code
formats; - whitespace; - special characters; - numeric values where
inappropriate; - unusually long values; - leading/trailing spaces; -
continue behavior; - cancel behavior; - preservation or clearing of
entered values when appropriate; - correct navigation after valid
submission; - correct error handling after invalid submission.

Do not invent validation rules. Clearly distinguish observed behavior,
documented behavior and exploratory recommendations.

PROMPT – CHECKOUT ONE FORM REVIEW

Review the test suite specifically for form-testing quality.

Check: - required-field coverage; - input-type validation; - boundary
coverage; - whitespace; - special characters; - data persistence; -
validation timing; - error-message specificity; - navigation; - cancel
behavior; - duplicate tests; - weak assertions.

Recommend missing tests.

============================================================ 9. CHECKOUT
ONE – EXPLORATORY AND HEURISTIC PROMPTS
============================================================

PROMPT – EXPLORATORY CHECKOUT FORM TESTING

Act as an exploratory tester focused on form validation.

Look for scenarios not covered by the current suite: - whitespace-only
input; - leading/trailing whitespace; - mixed case; - numbers; -
punctuation; - Unicode characters; - very long strings; - pasted
input; - keyboard-only entry; - tab order; - Enter key; - repeated
submit; - submit with one field corrected after an error; - correcting
errors sequentially; - cancel after entering data; - browser
back/forward; - refresh; - navigation after validation failure.

Do not repeat already covered tests.

PROMPT – CHECKOUT ONE EQUIVALENCE PARTITIONING

Partition: First Name - valid text; - empty; - whitespace; - numeric; -
special characters; - Unicode; - excessively long.

Last Name - same meaningful classes.

Postal Code - valid; - empty; - whitespace; - alphabetic; -
alphanumeric; - special characters; - too short; - too long; -
documented valid format.

Generate representative cases.

PROMPT – CHECKOUT ONE BOUNDARY VALUE ANALYSIS

Identify all possible boundaries for: - first name length; - last name
length; - postal code length; - allowed character classes.

If limits are undocumented, propose tests designed to discover the
limits rather than assuming a specific number.

PROMPT – CHECKOUT ONE DATA VALIDATION

Verify that submitted values: - are accepted only when valid; - remain
associated with the correct field; - are not silently transformed in an
unsafe or surprising way; - produce appropriate validation feedback; -
are preserved correctly when expected; - do not corrupt subsequent
checkout data.

============================================================ 10.
CHECKOUT TWO – ORDER REVIEW
============================================================

POM: checkouttwoPage.js

Known behavior: - getTitle() - getItems() - getInventoryItemPrice() -
getInventoryPaymentInfo() - getInventorySubtotalLabel() -
getInventoryTax() - getTotal() - clickCancel() - clickFinish()

PROMPT – BASIC CHECKOUT TWO TEST GENERATION

Generate a comprehensive test suite for the checkout overview page.

Cover: - correct page title; - correct products; - correct product
prices; - payment information; - subtotal; - tax; - total; - arithmetic
consistency; - finish behavior; - cancel behavior; - empty/invalid
checkout state if reachable; - consistency between Cart and Overview; -
order information persistence from previous step.

For totals, explicitly test the relationship:

subtotal + tax = total

where the application displays these values and rounding rules permit
it.

Do not merely assert that the total element is visible.

PROMPT – CHECKOUT TWO REVIEW

Review existing checkout overview tests.

Look for: - missing arithmetic validation; - missing product-to-cart
consistency; - missing price consistency; - missing tax validation; -
missing total validation; - weak finish/cancel assertions; - missing
multi-item order coverage; - missing single-item order coverage; - state
leakage.

Recommend stronger assertions.

============================================================ 11.
CHECKOUT TWO – EXPLORATORY AND HEURISTIC PROMPTS
============================================================

PROMPT – EXPLORATORY CHECKOUT REVIEW TESTING

Search for scenarios that could reveal: - incorrect subtotal; -
incorrect tax; - incorrect total; - missing items; - duplicated items; -
wrong prices; - stale cart data; - changed cart data; - incorrect
payment information; - cancel navigation defects; - finish navigation
defects; - order-summary inconsistency.

Explore one-item, multi-item and maximum-item scenarios where practical.

PROMPT – CHECKOUT TWO EQUIVALENCE PARTITIONING

Partition order summaries by: - zero items if reachable; - one item; -
multiple items; - all products; - different price combinations.

Generate representative tests that validate calculations and item
consistency.

PROMPT – CHECKOUT TWO BOUNDARY VALUE ANALYSIS

Focus on: - zero/one/many items; - first/last item; - smallest/largest
product price; - tax rounding boundaries; - total rounding boundaries.

If exact price or tax boundaries are not documented, identify them as
exploratory checks rather than assumed requirements.

PROMPT – CHECKOUT TWO DATA VALIDATION

Cross-check: Products -> Cart -> Checkout Overview.

For every product: - same name; - same price; - correct item count.

For financial values: - subtotal is consistent with item prices; - tax
follows the application’s displayed rule; - total equals subtotal + tax
subject to documented rounding.

============================================================ 12.
CHECKOUT COMPLETE – CONFIRMATION
============================================================

POM: checkoutcompletePage.js

Known behavior: - getTitle() - getCompleteHeader() - getCompleteText() -
getPonyExpressImage() - getBackHomeButton() - clickBackHome()

PROMPT – BASIC CHECKOUT COMPLETE TEST GENERATION

Generate tests for the completed-order confirmation page.

Cover: - correct page title; - success header; - confirmation text; -
confirmation image; - Back Home button; - navigation back to Products; -
order completion after a valid checkout; - prevention of duplicate
completion if applicable; - browser refresh behavior; - back navigation
behavior; - consistency of the final state.

Require meaningful assertions for content, navigation and final
application state.

PROMPT – CHECKOUT COMPLETE EXPLORATORY TESTING

Act as an exploratory tester.

Look for missing scenarios involving: - refresh after completion; -
browser back; - browser forward; - repeated Back Home clicks; - direct
navigation to completion URL; - completion page after incomplete
checkout; - session state after order completion; - cart state after
successful order; - ability to start a new order; - confirmation content
consistency.

Do not assume direct URL access is valid; test it as an exploratory
security/state scenario.

============================================================ 13. MENU
PAGE – BASIC TEST GENERATION
============================================================

POM: menuPages.js

Known behavior: - openMenu() - closeMenu() - getMenu() - allItems() -
about() - logout() - resetAppState()

PROMPT – BASIC MENU TEST GENERATION

Generate a comprehensive functional test suite for the SauceDemo side
menu.

Cover: - open menu; - close menu; - menu visibility; - all
items/products navigation; - About navigation; - logout; - reset
application state; - menu contents; - correct destination after each
menu action; - menu state after navigation; - menu behavior after
repeated open/close operations; - menu behavior after logout; - menu
behavior across different application states.

Verify actual destinations and resulting application state.

PROMPT – MENU TEST REVIEW

Review the existing menu tests.

Check: - every menu item; - actual destination assertions; - visibility
assertions; - open/close state; - logout state; - reset-state
behavior; - navigation from different pages; - duplicate tests; - state
dependencies.

============================================================ 14. MENU –
EXPLORATORY AND HEURISTIC PROMPTS
============================================================

PROMPT – EXPLORATORY MENU TESTING

Search for scenarios not covered by the current menu tests.

Explore: - opening and closing repeatedly; - closing without opening; -
navigation through each menu item; - opening menu from Products, Cart
and Checkout where reachable; - menu after browser refresh; - menu after
logout; - menu after reset; - rapid clicks; - keyboard interaction; -
Escape key if supported; - focus behavior; - menu overlay behavior; -
navigation using browser back/forward.

Identify only genuinely new scenarios.

PROMPT – MENU STATE TRANSITIONS

Model: Closed -> Open Open -> Closed Open -> Navigation Navigation ->
Open Authenticated -> Logout -> Unauthenticated

Generate missing transition tests and identify invalid or unsafe
transitions.

============================================================ 15.
CROSS-PAGE END-TO-END PROMPT
============================================================

The individual POMs are: Login -> Products -> Cart -> Checkout One ->
Checkout Two -> Checkout Complete.

PROMPT – COMPLETE PURCHASE FLOW

Act as a Senior QA Engineer.

Design a comprehensive end-to-end test suite for the SauceDemo purchase
journey.

Use these Page Objects: LoginPage ProductsPage CartPage CheckoutonePage
CheckouttwoPage CheckoutCompletePage

Cover: - valid login; - product selection; - cart validation; - checkout
information; - checkout overview; - calculation validation; - order
completion; - confirmation; - return to Products.

Test at least: - one product; - multiple products; - different product
combinations; - remove-before-checkout; - cancel checkout; - correct
cart-to-overview propagation; - correct overview-to-completion
transition.

Avoid repeating page-level tests unnecessarily. Explain which scenarios
belong at unit/page level and which are justified as end-to-end tests.

============================================================ 16.
EXPLORATORY CROSS-PAGE TESTING
============================================================

PROMPT

Act as a senior exploratory tester investigating the entire SauceDemo
user journey.

Review all existing page-level and E2E tests.

Then search for workflows that cross page boundaries and are NOT already
covered.

Think about: - Login -> Products - Products -> Cart - Cart -> Products -
Cart -> Checkout - Checkout One -> Checkout Two - Checkout Two ->
Complete - Complete -> Products - Logout -> Login - Reset -> Products -
Back/forward navigation between states - Refresh at each stage - invalid
action followed by recovery - state persistence between pages - state
reset after logout - cart persistence - data consistency across pages.

Return only new, non-redundant scenarios.

============================================================ 17.
EQUIVALENCE PARTITIONING – WHOLE APPLICATION
============================================================

PROMPT

Apply equivalence partitioning across the SauceDemo application.

Identify partitions for: - authentication state; - user type; - cart
size; - product selection; - sort selection; - checkout form data; -
postal-code input; - order-summary state; - menu state; - navigation
state.

For every partition: 1. explain the partition; 2. identify
representative data; 3. identify the expected behavior; 4. determine
whether existing tests already cover it; 5. propose a new test only when
coverage is missing.

Prioritize partitions by risk.

============================================================ 18.
BOUNDARY VALUE ANALYSIS – WHOLE APPLICATION
============================================================

PROMPT

Perform boundary value analysis across the SauceDemo UI.

Look for meaningful boundaries in: - text input length; - postal-code
length; - number of cart items; - number of products; - first/last
product; - first/last cart item; - empty/non-empty state; - one/multiple
item state; - price and total calculations; - tax/rounding; - navigation
state; - authentication state.

For every boundary propose: - just below; - at; - just above; where a
numeric boundary exists.

Do not invent undocumented constraints.

============================================================ 19.
NEGATIVE TESTING – WHOLE APPLICATION
============================================================

PROMPT

Act as a negative-testing specialist.

Review all current tests and generate missing negative scenarios.

Consider: - invalid credentials; - missing required fields; - malformed
input; - unsupported values; - invalid navigation; - unauthorized
access; - incomplete workflows; - repeated actions; - invalid state
transitions; - stale state; - empty collections; - direct URL access; -
browser back/forward into invalid states; - refresh at
invalid/incomplete states.

For each negative test state: - what invalid condition is introduced; -
what the application should prevent; - what message/state should
result; - what must NOT happen.

============================================================ 20. STATE
TRANSITION TESTING – WHOLE APPLICATION
============================================================

PROMPT

Build a state-transition model for SauceDemo.

Identify states such as: - unauthenticated; - authenticated; - products
with empty cart; - products with items; - cart empty; - cart
populated; - checkout information incomplete; - checkout information
valid; - checkout overview; - order completed; - logged out; - reset
state.

Identify valid transitions and potential invalid transitions.

Then: 1. map existing tests to transitions; 2. identify untested
transitions; 3. generate new test cases for important missing
transitions; 4. prioritize transitions by risk.

============================================================ 21. ERROR
HANDLING PROMPT
============================================================

PROMPT

Review the entire test suite from an error-handling perspective.

For every user action that can fail, identify: - expected error
condition; - error message; - error visibility; - error placement; -
whether the user can recover; - whether previously entered data remains
intact; - whether the application prevents the invalid action; - whether
the user can retry successfully.

Look for error handling in: Login Checkout form Cart Navigation Checkout
overview Menu Logout/reset

Do not assume an error should exist. Base the recommendation on observed
or documented behavior.

============================================================ 22. DATA
VALIDATION / CONSISTENCY PROMPT
============================================================

PROMPT

Act as a data-integrity-focused QA engineer.

Trace data across the complete user journey:

Product listing -> Cart -> Checkout One -> Checkout Two -> Completion

Identify all values that should remain consistent: - product name; -
product price; - item count; - cart count; - subtotal; - tax; - total; -
customer information where visible; - final order state.

Generate cross-page consistency tests that detect data corruption, stale
state, missing items, duplicated items, incorrect calculations or
mismatched values.

============================================================ 23.
USABILITY PROMPT
============================================================

PROMPT

Act as a usability-focused QA engineer.

Review the SauceDemo flows and existing automated tests.

Generate test cases for: - clear labels; - understandable error
messages; - logical navigation; - visible primary actions; - consistent
button behavior; - keyboard navigation; - tab order; - focus behavior; -
readable content; - clear confirmation after actions; - predictable
Back/Cancel behavior; - understandable sorting controls; - menu
usability; - checkout flow clarity.

Separate functional assertions from subjective usability observations.

Identify which usability checks can be reliably automated and which
require manual review.

============================================================ 24.
SECURITY PROMPT
============================================================

PROMPT

Act as an application-security-aware QA engineer.

Generate safe, non-destructive security-oriented UI test scenarios for
SauceDemo.

Consider: - unauthenticated access to protected pages; - session
handling; - logout effectiveness; - back-button access after logout; -
direct URL access; - session persistence after refresh; - sensitive
information exposure; - password field behavior; - credential handling
in the UI; - client-side validation bypass considerations; -
unauthorized state transitions.

Do not invent backend vulnerabilities. Clearly label scenarios that
require API, network or server-side testing rather than UI automation.

Do not include destructive attacks or exploit instructions.

============================================================ 25.
COMPATIBILITY PROMPT
============================================================

PROMPT

Act as a cross-browser and compatibility QA engineer.

Review the current functional test suite and identify tests that have
high value for compatibility testing.

Consider: - Chromium; - Firefox; - WebKit; - common desktop viewport
sizes; - mobile/responsive viewport if supported; - keyboard
interaction; - different rendering engines; - layout changes; - menu
behavior; - checkout forms; - sorting controls; - buttons and
navigation; - images and content.

Do not duplicate every test for every browser. Recommend a risk-based
compatibility subset.

============================================================ 26.
ACCESSIBILITY PROMPT
============================================================

PROMPT

Act as an accessibility QA specialist.

Review the application flows and identify accessibility test
opportunities.

Consider: - keyboard-only navigation; - focus visibility; - logical tab
order; - accessible names; - button and link semantics; - form labels; -
error association; - heading structure; - image alternative text; -
contrast as a manual/automated candidate; - screen-reader-friendly state
changes; - menu accessibility; - modal/overlay accessibility if
applicable.

Separate: A. assertions that can be automated with
Playwright/accessibility tooling; B. checks requiring manual
assistive-technology validation.

============================================================ 27. VISUAL
REGRESSION PROMPT
============================================================

PROMPT

Identify high-value visual-regression scenarios for SauceDemo.

Focus on: - Login page; - Products page; - Cart; - Checkout One; -
Checkout Two; - Completion page; - Side menu; - error states; -
empty-cart state; - populated-cart state.

Prioritize visual checkpoints where a layout defect could materially
affect usability.

Do not recommend screenshots for every test. Select a small risk-based
visual regression suite.

============================================================ 28.
RESILIENCE / FLAKINESS PROMPT
============================================================

PROMPT

Review the proposed Playwright tests as an automation architect.

Identify possible sources of: - flaky locators; - timing dependencies; -
race conditions; - state leakage; - test ordering dependencies; - shared
mutable data; - brittle CSS selectors; - hard-coded assumptions; -
unnecessary waits; - unreliable assertions.

Recommend Playwright-native improvements: - stable locators; - web-first
assertions; - isolated test state; - fixtures; - Page Objects; -
deterministic test data; - appropriate waiting through Playwright’s
auto-waiting model.

Do not recommend arbitrary sleep/wait statements as a default solution.

============================================================ 29. TEST
ORACLE PROMPT
============================================================

PROMPT

Review every proposed test and ask:

“What evidence would prove this test actually passed?”

Identify weak assertions such as: - element exists; - page did not
crash; - button was clicked; - URL contains a string without validating
state; - generic error is visible.

Replace them with stronger behavioral or data-based assertions where
possible.

For every test: - action; - expected state; - observable evidence; -
strongest practical assertion.

============================================================ 30. TEST
DATA DESIGN PROMPT
============================================================

PROMPT

Act as a test-data architect.

Review all tests and identify opportunities to separate test data from
test logic.

Design reusable test-data structures for: - valid credentials; - invalid
credentials; - locked-out user; - product selections; - sort options; -
checkout form data; - invalid form data; - cart combinations.

Recommend: - fixtures; - parameterized tests; - data builders; -
environment variables for secrets; - readable test-data naming.

Do not hard-code secrets.

============================================================ 31.
RISK-BASED PRIORITIZATION PROMPT
============================================================

PROMPT

Prioritize all generated SauceDemo test cases using risk-based testing.

For each test score: - business impact; - likelihood; - detectability; -
user impact; - automation value.

Classify: P0 – critical; P1 – high; P2 – medium; P3 – low.

Identify: - smoke suite; - critical regression suite; - full regression
suite; - exploratory/manual candidates.

Explain why each test belongs in its assigned layer.

============================================================ 32. TEST
CASE QUALITY REVIEW PROMPT
============================================================

PROMPT

Act as a strict QA test-case reviewer.

Review the following test cases for: - clarity; - atomicity; -
independence; - reproducibility; - correct preconditions; - meaningful
expected results; - absence of implementation details; - absence of
redundant coverage; - correct priority; - realistic test data; -
traceability to requirements; - automation suitability.

Return: 1. Pass – keep as is; 2. Modify – explain exactly what to
change; 3. Merge – identify duplicate/overlapping test; 4. Reject –
explain why; 5. New test required – describe missing coverage.

============================================================ 33. AI
SELF-CRITIQUE PROMPT
============================================================

PROMPT

You previously generated test cases for this feature.

Now ignore your previous conclusions and act as a skeptical Senior QA
Engineer reviewing another tester’s work.

Find: - blind spots; - assumptions; - duplicated tests; -
over-testing; - under-testing; - weak assertions; - missing negative
cases; - missing state transitions; - missing boundary cases; - missing
data consistency checks; - missing usability/accessibility/security
checks; - scenarios that are impossible or unsupported by the
application.

Then provide a revised list containing ONLY tests that add meaningful
coverage.

============================================================ 34. “WHAT
DID WE MISS?” MASTER EXPLORATORY PROMPT
============================================================

PROMPT

You are an expert exploratory tester joining this project after another
QA engineer has already created a substantial automated suite.

Your job is NOT to generate more of the same tests.

Review: - the Page Objects; - all existing E2E tests; - all previously
generated AI test cases; - known application behavior.

Then ask: “What would a skilled human tester try that a conventional
automated regression suite might miss?”

Think creatively about: - unexpected sequences; - invalid transitions; -
recovery after errors; - state persistence; - refresh; - browser
navigation; - unusual data; - timing; - repeated actions; - user
behavior; - usability; - accessibility; - compatibility; - security; -
data integrity; - visual defects; - interaction between features.

Return only genuinely new scenarios.

For every scenario explain: - why conventional testing might miss it; -
what defect it could expose; - how to reproduce it; - what the expected
result should be; - whether automation is appropriate.

============================================================ 35.
METAMORPHIC / RELATIONSHIP TESTING PROMPT
============================================================

PROMPT

Look for relationships between actions where the result should remain
invariant.

Examples: - adding then removing the same product should restore the
previous cart state; - sorting products should not change product
prices; - sorting should not alter which product is in the cart; -
removing one product should not modify unrelated cart items; - changing
checkout input should affect only the relevant field; - canceling
checkout should not accidentally create an order.

Generate metamorphic/relationship-based tests for the application.

============================================================ 36.
PAIRWISE / COMBINATION TESTING PROMPT
============================================================

PROMPT

Identify important combinations of variables in the SauceDemo
application.

Potential dimensions: - product selection; - sort option; - cart size; -
login user; - checkout data validity; - navigation path.

Use pairwise reasoning to identify high-value combinations without
creating a full Cartesian-product test suite.

Explain why each selected combination provides useful coverage.

============================================================ 37.
RECOVERY TESTING PROMPT
============================================================

PROMPT

Act as a recovery-testing specialist.

Generate tests where the user makes a mistake and then attempts to
recover.

Examples: - wrong password -> correct password; - missing checkout field
-> correct field -> continue; - invalid postal code -> valid postal
code; - add product -> remove -> re-add; - cart -> continue shopping ->
cart again; - checkout -> cancel -> return to cart; - failed state ->
refresh -> retry; - logout -> login again.

Only include recovery paths not already covered.

============================================================ 38.
INTERRUPTION TESTING PROMPT
============================================================

PROMPT

Explore interruptions during the SauceDemo workflow.

Consider: - refresh; - browser back; - browser forward; -
closing/reopening the page; - navigation away and back; - repeated
click; - accidental duplicate submission; - interrupted checkout; -
session changes.

Determine which interruptions are meaningful for a UI automation suite
and which are better suited for exploratory/manual testing.

============================================================ 39. TEST
SUITE OPTIMIZATION PROMPT
============================================================

PROMPT

Review the entire generated suite and optimize it for maximum coverage
with minimum redundancy.

Identify: - duplicate tests; - tests with identical risk; - tests that
belong at another level; - tests that can be parameterized; - tests that
should remain manual; - tests that should become smoke tests; - tests
that should be regression-only; - tests that can be replaced by stronger
assertions.

Produce: - Smoke suite; - Critical regression suite; - Full regression
suite; - Exploratory charter list.

============================================================ 40. CONVERT
APPROVED TEST CASES TO PLAYWRIGHT PROMPT
============================================================

PROMPT

Convert ONLY the approved test cases below into Playwright tests.

Project constraints: - JavaScript; - Playwright Test; - Page Object
Model; - Page Objects are stored in pages/; - tests are stored in
tests/; - use the existing POM methods where possible; - do not
duplicate locators in spec files; - use async/await; - use Playwright
web-first assertions; - do not use arbitrary waitForTimeout calls; -
keep tests independent; - use stable locators; - preserve readable test
IDs; - do not invent unsupported application behavior.

Before writing code: 1. identify which Page Objects are needed; 2.
identify any missing POM methods; 3. identify whether a test should be
split or combined; 4. identify the strongest assertion for each case.

Then generate the code.

============================================================ 41. REVIEW
AI-GENERATED PLAYWRIGHT CODE
============================================================

PROMPT

Act as a Senior Playwright Automation Engineer.

Review this AI-generated Playwright test.

Check: - POM adherence; - locator quality; - async/await; -
assertions; - test independence; - state setup; - state cleanup; -
flakiness; - unnecessary waits; - duplicated code; - hard-coded data; -
test naming; - readability; - maintainability; - whether the test
actually proves the intended behavior.

Return: A. Bugs in the test B. Design problems C. Improvements D.
Revised code E. Explanation of important changes

============================================================ 42. FAILURE
ANALYSIS PROMPT
============================================================

PROMPT

Analyze this Playwright test failure as a Senior QA Engineer.

Inputs: - test case; - test code; - failure message; - stack trace; -
screenshot/video if available; - relevant Page Object.

Determine whether the failure is most likely: 1. application defect; 2.
test defect; 3. locator defect; 4. timing/synchronization issue; 5.
test-data issue; 6. environment/configuration issue; 7. flaky behavior.

Do not automatically assume that a failed test means the application is
broken.

Provide: - likely root cause; - evidence; - recommended investigation; -
smallest reliable fix; - whether the test should be changed; - whether a
defect should be reported.

============================================================ 43. DEFECT
DISCOVERY / BUG REPORT PROMPT
============================================================

PROMPT

Based on this failed test and observed application behavior, determine
whether a defect is justified.

Do not label something a bug merely because it differs from generic UX
expectations.

Compare: - requirement; - intended behavior; - observed behavior; - test
expectation.

If it is a defect, generate: - concise title; - environment; -
preconditions; - reproduction steps; - expected result; - actual
result; - severity; - priority; - evidence; - suspected scope.

If it is not a defect, explain why.

============================================================ 44.
TRACEABILITY PROMPT
============================================================

PROMPT

Create a traceability matrix connecting: Requirement -> Feature -> Page
Object -> Test Case -> Playwright Spec -> Assertion.

Identify: - requirements without tests; - tests without clear
requirements; - Page Object methods without meaningful coverage; - tests
whose assertions do not validate the requirement.

Flag gaps and redundancies.

============================================================ 45. FINAL
FULL-SUITE AI AUDIT
============================================================

PROMPT

Perform a final QA audit of the complete SauceDemo Playwright test
suite.

Review: - all Page Objects; - all test specs; - all generated test
cases; - all exploratory scenarios; - all heuristic analyses.

Evaluate: Functional coverage Negative coverage Boundary coverage
Equivalence partitions State transitions Error handling Data validation
Usability Accessibility Security Compatibility Visual regression
Recovery Interruption Cross-page consistency Test independence
Automation quality Flakiness risk Maintainability Risk-based
prioritization Assertion quality

Produce: 1. Coverage summary 2. Major gaps 3. Highest-risk untested
scenarios 4. Redundant tests 5. Weak tests 6. Tests that should be
automated 7. Tests that should remain exploratory/manual 8. Recommended
smoke suite 9. Recommended regression suite 10. Recommended next testing
priorities

Do not generate additional tests simply to increase the number of tests.
Optimize for meaningful risk coverage.

============================================================ 46.
RECOMMENDED AI QA WORKFLOW FOR THIS PROJECT
============================================================

Use the prompts in this order rather than asking AI for everything at
once.

PHASE 1 – BASELINE 1. Master POM/test-suite analysis 2. Page-specific
basic test generation 3. Test-case quality review

PHASE 2 – GAP DISCOVERY 4. Exploratory testing 5. Equivalence
partitioning 6. Boundary value analysis 7. Negative testing 8.
State-transition testing 9. Error handling 10. Data validation

PHASE 3 – QUALITY DIMENSIONS 11. Usability 12. Accessibility 13.
Security 14. Compatibility 15. Visual regression 16. Recovery testing 17. Interruption testing

PHASE 4 – ADVANCED COVERAGE 18. Metamorphic/relationship testing 19.
Pairwise/combination testing 20. Cross-page E2E testing 21. “What did we
miss?” exploratory review

PHASE 5 – TEST MANAGEMENT 22. Test-case quality review 23. Risk-based
prioritization 24. Test suite optimization 25. Traceability

PHASE 6 – AUTOMATION 26. Convert approved cases to Playwright 27. Review
AI-generated Playwright code 28. Run tests 29. Failure/root-cause
analysis 30. Defect decision/reporting

PHASE 7 – CONTINUOUS IMPROVEMENT 31. AI self-critique 32. Full-suite AI
audit 33. Add only high-value missing coverage

============================================================ 47.
PAGE-BY-PAGE PROMPT CHECKLIST
============================================================

LOGIN [ ] Basic functional generation [ ] Existing-suite review [ ]
Exploratory [ ] Equivalence partitioning [ ] Boundary value analysis [ ]
Negative testing [ ] State transitions [ ] Error handling [ ] Security [
] Usability/accessibility

PRODUCTS [ ] Basic functional generation [ ] Existing-suite review [ ]
Exploratory [ ] Equivalence partitioning [ ] Boundary value analysis [ ]
State transitions [ ] Data validation [ ] Usability [ ] Compatibility [
] Visual regression

CART [ ] Basic functional generation [ ] Existing-suite review [ ]
Exploratory [ ] Equivalence partitioning [ ] Boundary value analysis [ ]
State transitions [ ] Data validation [ ] Recovery [ ] Interruption

CHECKOUT ONE [ ] Basic functional generation [ ] Form review [ ]
Exploratory [ ] Equivalence partitioning [ ] Boundary value analysis [ ]
Negative testing [ ] Data validation [ ] Usability [ ] Accessibility [ ]
Recovery

CHECKOUT TWO [ ] Basic functional generation [ ] Existing-suite review [
] Exploratory [ ] Equivalence partitioning [ ] Boundary value analysis [
] State transitions [ ] Data validation [ ] Calculation/oracle testing [
] Recovery

CHECKOUT COMPLETE [ ] Basic functional generation [ ] Exploratory [ ]
State transitions [ ] Navigation [ ] Session/state validation [ ]
Recovery [ ] Visual validation

MENU [ ] Basic functional generation [ ] Existing-suite review [ ]
Exploratory [ ] State transitions [ ] Navigation [ ]
Keyboard/accessibility [ ] Security/logout [ ] Compatibility

============================================================ 48.
IMPORTANT RULES FOR AI USE
============================================================

1.  Give the AI the actual POM and existing tests whenever possible.
2.  Tell the AI explicitly what is already covered.
3.  Ask for NEW scenarios, not “more tests”.
4.  Ask the AI to identify duplicates.
5.  Ask for evidence and reasoning.
6.  Do not accept invented requirements.
7.  Separate expected behavior from assumptions.
8.  Prefer risk-based coverage over test-count maximization.
9.  Use strong behavioral assertions.
10. Keep tests independent.
11. Use the Page Object Model consistently.
12. Do not put locators directly into specs when a suitable POM method
    exists.
13. Do not use arbitrary waits to hide synchronization problems.
14. Do not store credentials or secrets in source control.
15. Treat AI-generated code as untrusted until reviewed and executed.
16. Treat AI-generated expected results as hypotheses until verified.
17. Preserve exploratory testing as a human activity even when AI
    assists with scenario generation.
18. Use AI to challenge the suite, not merely expand it.
19. Periodically ask AI to argue against the current test strategy.
20. Keep a record of accepted, modified and rejected AI suggestions.

============================================================ 49.
SUGGESTED PROJECT DOCUMENTATION
============================================================

For the Playwright portfolio project, consider keeping:

docs/ requirements.md test-cases.md ai-prompts.md ai-test-review.md
exploratory-testing.md traceability-matrix.md test-strategy.md

A useful AI review log can contain:

Date Feature Prompt used AI suggestion QA decision: Accepted / Modified
/ Rejected Reason Implemented test Result Follow-up

This demonstrates that AI is being used as a QA reasoning assistant
rather than as a replacement for QA judgment.

============================================================ 50. MASTER
PROMPT – FULL AI QA PARTNER
============================================================

PROMPT

Act as my AI QA co-pilot for the SauceDemo Playwright project.

Your role is to assist with test design, test review, exploratory
thinking, risk analysis and automation quality.

You must: - inspect the supplied Page Objects; - inspect the existing
tests; - understand what is already covered; - avoid redundant tests; -
identify coverage gaps; - challenge assumptions; - reason about risk; -
think like an exploratory tester; - apply equivalence partitioning; -
apply boundary value analysis; - apply negative testing; - apply
state-transition testing; - analyze error handling; - analyze data
validation; - consider usability; - consider accessibility; - consider
security; - consider compatibility; - consider visual regression; -
consider recovery; - consider interruptions; - consider cross-page
consistency; - consider metamorphic relationships; - consider pairwise
combinations; - review test oracles; - review automation quality; -
review Playwright/POM implementation.

When you generate recommendations: 1. distinguish existing coverage from
new coverage; 2. mark assumptions explicitly; 3. explain the risk
addressed; 4. identify whether the scenario is best automated or
exploratory/manual; 5. avoid unnecessary test duplication; 6. prioritize
high-value scenarios; 7. do not invent unsupported application behavior.

When generating Playwright code: - use JavaScript; - use Playwright
Test; - use Page Objects; - use async/await; - use stable locators; -
use web-first assertions; - avoid arbitrary waits; - keep tests
independent; - preserve readable test IDs; - do not expose secrets.

When analyzing failures: - distinguish application defects from test
defects; - identify root cause; - request additional evidence when
necessary; - do not declare a bug without sufficient evidence.

Your goal is not to maximize the number of tests.

Your goal is to maximize meaningful risk coverage, confidence and
maintainability while keeping the test suite understandable and
reliable.
