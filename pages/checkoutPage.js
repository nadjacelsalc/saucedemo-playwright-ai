class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.title = page.locator('.title');

    // Checkout information fields
   // this.firstNameInput = page.getByLabel('First Name');
    //this.lastNameInput = page.getByLabel('Last Name');
    //this.postalCodeInput = page.getByLabel('Postal Code');
    this.firstNameInput = page.locator('[data-test="firstName"]');
this.lastNameInput = page.locator('[data-test="lastName"]');
this.postalCodeInput = page.locator('[data-test="postalCode"]');

    // Actions
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });

    // Validation
    this.errorMessage = page.locator('.error-message-container');
  }

  getTitle() {
    return this.title;
  }

  async enterFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async enterLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async enterPostalCode(postalCode) {
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  getError() {
    return this.errorMessage;
  }
}

export default CheckoutPage;