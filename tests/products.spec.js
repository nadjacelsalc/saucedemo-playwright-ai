import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import ProductsPage from '../pages/productsPage';

test.describe('Inventory Page', () => {
  let loginPage;
  let productsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

    await loginPage.visit();
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLogin();

    await expect(productsPage.getTitle()).toHaveText('Products');
  });

  test('INV-001: Verify Inventory page loads with all products', async () => {
    await expect(productsPage.getTitle()).toHaveText('Products');
    await expect(productsPage.products).toHaveCount(6);
  });

  test('INV-002: Verify products can be sorted by Name A to Z', async () => {
    await productsPage.selectSort('Name (A to Z)');

    await expect(productsPage.getFirstProductName())
      .toHaveText('Sauce Labs Backpack');
  });

  test('INV-003: Verify a product can be added to the cart', async () => {
    await productsPage.addProductToCart('Sauce Labs Backpack');

    await expect(productsPage.getCartBadge()).toHaveText('1');
  });

  test('INV-004: Verify multiple products can be added to the cart', async () => {
    await productsPage.addProductToCart('Sauce Labs Backpack');

    await expect(productsPage.getCartBadge()).toHaveText('1');

    await productsPage.addProductToCart('Sauce Labs Bike Light');

    await expect(productsPage.getCartBadge()).toHaveText('2');
  });

  test('INV-005: Verify a product can be removed from the cart', async () => {
    await productsPage.addProductToCart('Sauce Labs Backpack');

    await expect(productsPage.getCartBadge()).toHaveText('1');

    await productsPage.removeProductFromCart('Sauce Labs Backpack');

    await expect(productsPage.getCartBadge()).not.toBeVisible();
  });
});

