import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import ProductsPage from '../pages/productsPage';
import CartPage from '../pages/cartPage';
import CheckoutPage from '../pages/checkoutPage';
import CheckoutTwoPage from '../pages/checkoutTwoPage';

test.describe('Checkout Two Page', () => {
  let loginPage;
  let productsPage;
  let cartPage;
  let checkoutPage;
  let checkoutTwoPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    checkoutTwoPage = new CheckoutTwoPage(page);

    // Login
    await loginPage.visit();
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLogin();

    // Inventory → Cart
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.openCart();

    // Cart → Checkout Step One
    await cartPage.checkout();

    // Checkout Step One → Checkout Step Two
    await checkoutPage.enterFirstName('Test');
    await checkoutPage.enterLastName('User');
    await checkoutPage.enterPostalCode('71000');
    await checkoutPage.clickContinue();
  });

  test('CHECKOUT-TWO-001: Verify Checkout Overview page is displayed', async () => {
    await expect(checkoutTwoPage.getTitle()).toHaveText('Checkout: Overview');
  });

  test('CHECKOUT-TWO-002: Verify selected product is displayed in the order summary', async () => {
    await expect(checkoutTwoPage.getItems()).toContainText(
      'Sauce Labs Bike Light'
    );
  });

  test('CHECKOUT-TWO-003: Verify product price is displayed correctly', async () => {
    await expect(checkoutTwoPage.getItemPrices()).toContainText('$9.99');
  });

  test('CHECKOUT-TWO-004: Verify payment information is displayed', async () => {
    await expect(checkoutTwoPage.getPaymentInfo()).toHaveText(
      'SauceCard #31337'
    );
  });

  test('CHECKOUT-TWO-005: Verify subtotal is displayed correctly', async () => {
    await expect(checkoutTwoPage.getSubtotal()).toContainText('$9.99');
  });

  test('CHECKOUT-TWO-006: Verify tax is displayed correctly', async () => {
    await expect(checkoutTwoPage.getTax()).toContainText('$0.80');
  });

  test('CHECKOUT-TWO-007: Verify total is displayed correctly', async () => {
    await expect(checkoutTwoPage.getTotal()).toContainText('$10.79');
  });

  test('CHECKOUT-TWO-008: Verify Cancel returns to Inventory', async ({ page }) => {
    await checkoutTwoPage.cancel();

    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('CHECKOUT-TWO-009: Verify Finish proceeds to Checkout Complete', async ({
    page,
  }) => {
    await checkoutTwoPage.finish();

    await expect(page).toHaveURL(/checkout-complete\.html/);
  });
});

