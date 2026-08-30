import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import ProductsPage from '../pages/productsPage';
import CartPage from '../pages/cartPage';
import CheckoutPage from '../pages/checkoutPage';
import MenuPage from '../pages/menuPage';

test.describe('Menu Page', () => {
  let loginPage;
  let productsPage;
  let cartPage;
  let checkoutPage;
  let menuPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    menuPage = new MenuPage(page);

    await loginPage.visit();

    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLogin();

    await expect(productsPage.getTitle()).toHaveText('Products');
  });

  test('MENU-001: Verify menu can be opened', async () => {
    await menuPage.openMenu();

    await expect(menuPage.getMenu()).toBeVisible();
  });

  test('MENU-002: Verify menu can be closed', async () => {
    await menuPage.openMenu();
    await menuPage.closeMenu();

    await expect(menuPage.getMenu()).not.toBeVisible();
  });

  test('MENU-003: Verify All Items navigates to Products page', async ({ page }) => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.openCart();

    await expect(cartPage.getTitle()).toHaveText('Your Cart');

    await menuPage.openMenu();
    await menuPage.allItems();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(productsPage.getTitle()).toHaveText('Products');
  });

  test('MENU-004: Verify About redirects to Sauce Labs website', async ({
    page,
  }) => {
    await menuPage.openMenu();

    await menuPage.about();

    await expect(page).toHaveURL(/saucelabs\.com/);
  });

  test('MENU-005: Verify Logout returns to login page', async ({ page }) => {
    await menuPage.openMenu();

    await menuPage.logout();

    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('MENU-006: Verify Reset App State clears cart', async () => {
    await productsPage.addProductToCart('Sauce Labs Backpack');

    await expect(productsPage.getCartBadge()).toHaveText('1');

    await menuPage.openMenu();
    await menuPage.resetAppState();

    await expect(productsPage.getCartBadge()).not.toBeVisible();
  });

  test('MENU-007: Verify menu is not available on login page', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(menuPage.getMenuButton()).not.toBeVisible();
  });

  test('MENU-008: Verify Reset App State clears checkout progress', async ({
    page,
  }) => {
    await productsPage.openCart();

    await cartPage.checkout();

    await checkoutPage.enterFirstName('Test');
    await checkoutPage.enterLastName('User');
    await checkoutPage.enterPostalCode('71780');

    await menuPage.openMenu();
    await menuPage.resetAppState();

    await menuPage.closeMenu();

    await productsPage.openCart();

    await expect(page).toHaveURL(/cart\.html/);

    await cartPage.checkout();

    await expect(checkoutPage.getFirstName()).toHaveValue('');
    await expect(checkoutPage.getLastName()).toHaveValue('');
    await expect(checkoutPage.getPostalCode()).toHaveValue('');
  });
});