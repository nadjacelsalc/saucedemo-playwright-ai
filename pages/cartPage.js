class CartPage {
  constructor(page) {
    this.page = page;

    // Cart page
    this.title = page.locator('.title');
    this.cartItems = page.locator('.cart_item');

    // Cart item information
    this.quantity = page.locator('.cart_quantity');
    this.price = page.locator('.inventory_item_price');

    // Cart actions
    this.continueShoppingButton = page.getByRole('button', {
      name: 'Continue Shopping',
    });
    this.checkoutButton = page.getByRole('button', {
      name: 'Checkout',
    });
  }

  getTitle() {
    return this.title;
  }

  getCartItems() {
    return this.cartItems;
  }

  getCartItemCount() {
    return this.cartItems.count();
  }

  getQuantity() {
    return this.quantity;
  }

  getPrice() {
    return this.price;
  }

  async removeProductFromCart(productName) {
    const product = this.cartItems.filter({
      hasText: productName,
    });

    await product.getByRole('button', { name: 'Remove' }).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

export default CartPage;
