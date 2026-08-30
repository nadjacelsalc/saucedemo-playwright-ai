import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import ProductsPage from '../pages/productsPage';
import CartPage from '../pages/cartPage';
import CheckoutPage from '../pages/checkoutPage';
import CheckoutTwoPage from '../pages/checkoutTwoPage';
import CheckoutCompletePage from '../pages/checkoutCompletePage';

test.describe('Checkout Complete Page', () => {
  let loginPage;
  let productsPage;
  let cartPage;
  let checkoutPage;
  let checkoutTwoPage;
  let checkoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    checkoutTwoPage = new CheckoutTwoPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);

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
    await checkoutPage.enterFirstName('Nadja');
    await checkoutPage.enterLastName('Celik');
    await checkoutPage.enterPostalCode('71780');
    await checkoutPage.clickContinue();

    // Checkout Step Two → Checkout Complete
    await checkoutTwoPage.finish();
  });

  test('CHECKOUT-COMPLETE-001: Verify Checkout Complete page loads successfully', async ({
    page,
  }) => {
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/checkout-complete.html'
    );
  });

  test('CHECKOUT-COMPLETE-002: Verify Checkout Complete page title', async () => {
    await expect(checkoutCompletePage.getTitle()).toBeVisible();
    await expect(checkoutCompletePage.getTitle()).toContainText(
      'Checkout: Complete!'
    );
  });

  test('CHECKOUT-COMPLETE-003: Verify success header message', async () => {
    await expect(checkoutCompletePage.getCompleteHeader()).toBeVisible();
    await expect(checkoutCompletePage.getCompleteHeader()).toContainText(
      'Thank you for your order!'
    );
  });

  test('CHECKOUT-COMPLETE-004: Verify success description text', async () => {
    await expect(checkoutCompletePage.getCompleteText()).toBeVisible();
    await expect(checkoutCompletePage.getCompleteText()).toContainText(
      'Your order has been dispatched'
    );
  });

  test('CHECKOUT-COMPLETE-005: Verify success image is displayed', async () => {
    await expect(checkoutCompletePage.getPonyExpressImage()).toBeVisible();
  });

  test('CHECKOUT-COMPLETE-006: Verify Back Home button is displayed', async () => {
    await expect(checkoutCompletePage.getBackHomeButton()).toBeVisible();
    await expect(checkoutCompletePage.getBackHomeButton()).toContainText(
      'Back Home'
    );
  });

  test('CHECKOUT-COMPLETE-007: Verify Back Home returns to Inventory', async ({
    page,
  }) => {
    await checkoutCompletePage.backHome();

    await expect(page).toHaveURL(/inventory\.html/);
  });
});
