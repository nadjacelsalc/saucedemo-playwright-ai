class MenuPage {
  constructor(page) {
    this.page = page;

    // Menu controls
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.closeMenuButton = page.locator('#react-burger-cross-btn');

    // Menu container
    this.menu = page.locator('.bm-menu');

    // Menu options
    this.allItemsLink = page.locator(
      '[data-test="inventory-sidebar-link"]'
    );

    this.aboutLink = page.locator(
      '[data-test="about-sidebar-link"]'
    );

    this.logoutLink = page.locator(
      '[data-test="logout-sidebar-link"]'
    );

    this.resetAppStateLink = page.locator(
      '[data-test="reset-sidebar-link"]'
    );
  }

  getMenu() {
    return this.menu;
  }

  getMenuButton() {
  return this.menuButton;
    }

getFirstName() {
  return this.firstName;
}

getLastName() {
  return this.lastName;
}

getPostalCode() {
  return this.postalCode;
}
  async openMenu() {
    await this.menuButton.click();
  }

  async closeMenu() {
    await this.closeMenuButton.click();
  }

  async allItems() {
    await this.allItemsLink.click();
  }

  async about() {
    await this.aboutLink.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async resetAppState() {
    await this.resetAppStateLink.click();
  }
}

export default MenuPage;
