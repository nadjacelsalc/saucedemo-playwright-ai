class ProductsPage {
  constructor(page) {
    this.page = page;

    // Inventory page
    this.title = page.locator('.title');
    this.products = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');

    // Sorting
    this.sortDropdown = page.getByTestId('product-sort-container');

    // Cart
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  getTitle() {
    return this.title;
  }

  getProductCount() {
    return this.products.count();
  }

  async addProductToCart(productName) {
    const product = this.products.filter({
      hasText: productName,
    });

    await product
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async removeProductFromCart(productName) {
    const product = this.products.filter({
      hasText: productName,
    });

    await product
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async selectSort(option) {
    await this.sortDropdown.selectOption({ label: option });
  }

  async openCart() {
    await this.cartLink.click();
  }

  getFirstProductName() {
    return this.productNames.first();
  }

  getCartBadge() {
    return this.cartBadge;
  }
}

export default ProductsPage;

