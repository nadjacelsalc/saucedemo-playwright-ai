import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';

test.describe('SauceDemo Login Tests', () => {
  let loginPage;

  const validUsername = 'standard_user';
  const validPassword = 'secret_sauce';

  const invalidUsername = 'invalid_user';
  const invalidPassword = 'invalid_password';

  const lockedOutUsername = 'locked_out_user';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.visit();
  });

  test('LOGIN-POS-001 - valid credentials login successfully', async ({ page }) => {
    await loginPage.enterUsername(validUsername);
    await loginPage.enterPassword(validPassword);
    await loginPage.clickLogin();

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page).toHaveTitle(/Swag Labs/);
  });

  test('LOGIN-NEG-001 - invalid username + valid password', async ({ page }) => {
    await loginPage.enterUsername(invalidUsername);
    await loginPage.enterPassword(validPassword);
    await loginPage.clickLogin();

    await expect(loginPage.getError()).toBeVisible();
    await expect(loginPage.getError()).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );
    await expect(page).not.toHaveURL(/\/inventory\.html$/);
  });

  test('LOGIN-NEG-002 - valid username + invalid password', async ({ page }) => {
    await loginPage.enterUsername(validUsername);
    await loginPage.enterPassword(invalidPassword);
    await loginPage.clickLogin();

    await expect(loginPage.getError()).toBeVisible();
    await expect(loginPage.getError()).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );
    await expect(page).not.toHaveURL(/\/inventory\.html$/);
  });

  test('LOGIN-NEG-003 - invalid username + invalid password', async ({ page }) => {
    await loginPage.enterUsername(invalidUsername);
    await loginPage.enterPassword(invalidPassword);
    await loginPage.clickLogin();

    await expect(loginPage.getError()).toBeVisible();
    await expect(loginPage.getError()).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );
    await expect(page).not.toHaveURL(/\/inventory\.html$/);
  });

  test('LOGIN-NEG-004 - locked-out user cannot login', async ({ page }) => {
    await loginPage.enterUsername(lockedOutUsername);
    await loginPage.enterPassword(validPassword);
    await loginPage.clickLogin();

    await expect(loginPage.getError()).toBeVisible();
    await expect(loginPage.getError()).toContainText(
      'Sorry, this user has been locked out.'
    );
    await expect(page).not.toHaveURL(/\/inventory\.html$/);
  });

  test('LOGIN-VAL-001 - both username and password empty', async ({ page }) => {
    await loginPage.clickLogin();

    await expect(loginPage.getError()).toBeVisible();
    await expect(loginPage.getError()).toContainText(
      'Epic sadface: Username is required'
    );
    await expect(page).not.toHaveURL(/\/inventory\.html$/);
  });

  test('LOGIN-VAL-002 - empty username + valid password', async ({ page }) => {
    await loginPage.enterPassword(validPassword);
    await loginPage.clickLogin();

    await expect(loginPage.getError()).toBeVisible();
    await expect(loginPage.getError()).toContainText(
      'Epic sadface: Username is required'
    );
    await expect(page).not.toHaveURL(/\/inventory\.html$/);
  });

  test('LOGIN-VAL-003 - valid username + empty password', async ({ page }) => {
    await loginPage.enterUsername(validUsername);
    await loginPage.clickLogin();

    await expect(loginPage.getError()).toBeVisible();
    await expect(loginPage.getError()).toContainText(
      'Epic sadface: Password is required'
    );
    await expect(page).not.toHaveURL(/\/inventory\.html$/);
  });

  test('LOGIN-REC-001 - failed login followed by successful login', async ({ page }) => {
    await loginPage.enterUsername(invalidUsername);
    await loginPage.enterPassword(invalidPassword);
    await loginPage.clickLogin();

    await expect(loginPage.getError()).toBeVisible();
    await expect(loginPage.getError()).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );
    await expect(page).not.toHaveURL(/\/inventory\.html$/);

    await loginPage.enterUsername(validUsername);
    await loginPage.enterPassword(validPassword);
    await loginPage.clickLogin();

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page).toHaveTitle(/Swag Labs/);
  });

  test('AI-SEC-001 - unauthenticated user cannot access protected inventory page', async ({ page }) => {
    await page.goto('/inventory.html');

    await expect(page).not.toHaveURL(/\/inventory\.html$/);
    await expect(loginPage.getError()).toBeVisible();
    await expect(loginPage.getError()).toHaveText(
      "Epic sadface: You can only access '/inventory.html' when you are logged in."
    );
  });

  test('AI-STATE-001 - validation error followed by successful login', async ({ page }) => {
    await loginPage.clickLogin();

    await expect(loginPage.getError()).toBeVisible();
    await expect(loginPage.getError()).toContainText(
      'Epic sadface: Username is required'
    );
    await expect(page).not.toHaveURL(/\/inventory\.html$/);

    await loginPage.enterUsername(validUsername);
    await loginPage.enterPassword(validPassword);
    await loginPage.clickLogin();

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page).toHaveTitle(/Swag Labs/);
  });

  test('AI-UX-001 - valid credentials can be submitted with Enter', async ({ page }) => {
    await loginPage.enterUsername(validUsername);
    await loginPage.enterPassword(validPassword);
    await loginPage.passwordInput.press('Enter');

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page).toHaveTitle(/Swag Labs/);
  });

 test('AI-UX-002 - login can be completed using keyboard-only navigation', async ({ page }) => {
  await loginPage.usernameInput.focus();
  await expect(loginPage.usernameInput).toBeFocused();

  await page.keyboard.type(validUsername);

  await page.keyboard.press('Tab');
  await expect(loginPage.passwordInput).toBeFocused();

  await page.keyboard.type(validPassword);

  await page.keyboard.press('Tab');
  await expect(loginPage.loginButton).toBeFocused();

  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page).toHaveTitle(/Swag Labs/);
});

  test('AI-ACC-001 - login controls have meaningful accessible names', async ({ page }) => {
    await expect(loginPage.usernameInput).toHaveAccessibleName('Username');
    await expect(loginPage.passwordInput).toHaveAccessibleName('Password');
    await expect(loginPage.loginButton).toHaveAccessibleName('Login');
  });
});