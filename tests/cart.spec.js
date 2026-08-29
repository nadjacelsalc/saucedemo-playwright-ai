import { test, expect } from '@playwright/test';

import LoginPage from '../pages/loginPage.js';
import ProductsPage from '../pages/productsPage.js';
import CartPage from '../pages/cartPage.js';

test.describe('Cart Page', () => {
  let loginPage;
  let productsPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);

    await loginPage.visit();
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLogin();

    await expect(productsPage.getTitle()).toHaveText('Products');
  });

  test('CART-001: Verify Cart page loads with selected product', async () => {
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.openCart();

    await expect(cartPage.getTitle()).toHaveText('Your Cart');
    await expect(cartPage.getCartItems()).toHaveCount(1);
  });

  test('CART-002: Verify added product appears in Cart', async () => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.openCart();

    const cartItem = cartPage.getCartItems().filter({
      hasText: 'Sauce Labs Backpack',
    });

    await expect(cartItem).toBeVisible();
  });

  test('CART-003: Verify product quantity is displayed correctly', async () => {
  await productsPage.addProductToCart('Sauce Labs Backpack');
  await productsPage.openCart();

  const cartItem = cartPage.getCartItems().filter({
    hasText: 'Sauce Labs Backpack',
  });

  await expect(cartItem.locator('.cart_quantity')).toHaveText('1');
});

test('CART-004: Verify product price is displayed correctly', async () => {
  await productsPage.addProductToCart('Sauce Labs Backpack');
  await productsPage.openCart();

  const cartItem = cartPage.getCartItems().filter({
    hasText: 'Sauce Labs Backpack',
  });

  await expect(cartItem.locator('.inventory_item_price')).toHaveText('$29.99');
});

  test('CART-005: Verify removing the product empties the Cart', async () => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.openCart();

    await expect(cartPage.getCartItems()).toHaveCount(1);

    await cartPage.removeProductFromCart('Sauce Labs Backpack');

    await expect(cartPage.getCartItems()).toHaveCount(0);
  });

  test('CART-006: Verify multiple products are displayed in Cart', async () => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');

    await productsPage.openCart();

    await expect(cartPage.getCartItems()).toHaveCount(2);

    await expect(
      cartPage.getCartItems().filter({
        hasText: 'Sauce Labs Backpack',
      })
    ).toBeVisible();

    await expect(
      cartPage.getCartItems().filter({
        hasText: 'Sauce Labs Bike Light',
      })
    ).toBeVisible();
  });

  test('CART-007: Verify Continue Shopping returns to Inventory', async ({
    page,
  }) => {
    await productsPage.openCart();

    await expect(cartPage.getTitle()).toHaveText('Your Cart');

    await cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(productsPage.getTitle()).toHaveText('Products');
  });

  test('CART-008: Verify Checkout navigates to Checkout Information page', async ({
    page,
  }) => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.openCart();

    await cartPage.checkout();

    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(page.locator('.title')).toHaveText(
      'Checkout: Your Information'
    );
  });
});

