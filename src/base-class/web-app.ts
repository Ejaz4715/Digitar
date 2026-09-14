
const path = require("path");
import type { Page } from "@playwright/test";
const { LoginPage } = require(
  path.join(process.cwd(), "src", "pages", "LoginPage")
);
class WebApp {
  page: Page;

  loginPage: InstanceType<typeof LoginPage>;

constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
  }

   
}

module.exports = { WebApp };