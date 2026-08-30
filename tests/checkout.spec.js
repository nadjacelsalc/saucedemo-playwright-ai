import { test, expect } from '@playwright/test';

import LoginPage from '../pages/loginPage';
import ProductsPage from '../pages/productsPage';
import CartPage from '../pages/cartPage';
import CheckoutPage from '../pages/checkoutPage';

test.describe('Checkout One Page', () => {
  let loginPage;
  let productsPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.visit();
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLogin();

    await expect(productsPage.getTitle()).toHaveText('Products');

    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.openCart();

    await expect(cartPage.getTitle()).toHaveText('Your Cart');

    await cartPage.checkout();

    await expect(checkoutPage.getTitle()).toHaveText(
      'Checkout: Your Information'
    );
  });

  test('CHECKOUT-001: Valid checkout information proceeds to Checkout Overview', async ({
    page,
  }) => {
    await checkoutPage.enterFirstName('Nadja');
    await checkoutPage.enterLastName('Celik');
    await checkoutPage.enterPostalCode('71780');

    await checkoutPage.clickContinue();

    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.locator('.title')).toHaveText(
      'Checkout: Overview'
    );
  });

  test('CHECKOUT-002: Submitting empty checkout information displays required-field validation', async () => {
    await checkoutPage.clickContinue();

    await expect(checkoutPage.getError()).toContainText(
      'First Name is required'
    );
  });

  test('CHECKOUT-003: Missing postal code prevents checkout progression', async ({
    page,
  }) => {
    await checkoutPage.enterFirstName('Test');
    await checkoutPage.enterLastName('User');

    await checkoutPage.clickContinue();

    await expect(checkoutPage.getError()).toContainText(
      'Postal Code is required'
    );
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('CHECKOUT-004: Cancel returns from Checkout One to Cart', async ({
    page,
  }) => {
    await checkoutPage.clickCancel();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.getTitle()).toHaveText('Your Cart');
  });

  test('CHECKOUT-005: Checkout can proceed after correcting validation error', async ({
    page,
  }) => {
    await checkoutPage.clickContinue();

    await expect(checkoutPage.getError()).toContainText(
      'First Name is required'
    );

    await checkoutPage.enterFirstName('Test');
    await checkoutPage.enterLastName('User');
    await checkoutPage.enterPostalCode('71780');

    await checkoutPage.clickContinue();

    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.locator('.title')).toHaveText(
      'Checkout: Overview'
    );
  });
});