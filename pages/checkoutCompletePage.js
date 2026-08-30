class CheckoutCompletePage {
  constructor(page) {
    this.page = page;

    // Page
    this.title = page.locator('.title');

    // Order completion confirmation
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.ponyExpressImage = page.locator('.pony_express');

    // Actions
    this.backHomeButton = page.getByRole('button', {
      name: 'Back Home',
    });
  }

  getTitle() {
    return this.title;
  }

  getCompleteHeader() {
    return this.completeHeader;
  }

  getCompleteText() {
    return this.completeText;
  }

  getPonyExpressImage() {
    return this.ponyExpressImage;
  }

  getBackHomeButton() {
    return this.backHomeButton;
  }

  async backHome() {
    await this.backHomeButton.click();
  }
}

export default CheckoutCompletePage;
