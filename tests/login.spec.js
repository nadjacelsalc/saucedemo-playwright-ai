import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';

test.describe('Login Tests', () => {

  test('LOGIN-POS-001 - Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.visit();
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLogin();

    await expect(page).toHaveURL(/inventory.html/);
  });

  test('LOGIN-NEG-001 - Login with incorrect password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.visit();
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('wrong_password');
    await loginPage.clickLogin();

    await expect(loginPage.getError()).toBeVisible();
  });

});