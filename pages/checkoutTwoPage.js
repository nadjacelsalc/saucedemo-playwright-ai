
class CheckoutTwoPage {
  constructor(page) {
    this.page = page;

    // Page
    this.title = page.getByText('Checkout: Overview', { exact: true });

    // Order summary
    this.items = page.locator('.cart_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');

    // Payment and summary
    this.paymentInfo = page.locator('.summary_value_label').nth(0);
    this.subtotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');

    // Actions
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
  }

  getTitle() {
    return this.title;
  }

  getItems() {
    return this.itemNames;
  }

  getItemPrices() {
    return this.itemPrices;
  }

  getPaymentInfo() {
    return this.paymentInfo;
  }

  getSubtotal() {
    return this.subtotal;
  }

  getTax() {
    return this.tax;
  }

  getTotal() {
    return this.total;
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }
}

export default CheckoutTwoPage;

