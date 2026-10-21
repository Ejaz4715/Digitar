'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.LoginPage = void 0;
const path = require('path');
const test_1 = require('@playwright/test');
const LoginObjects_1 = require('@objects/LoginObjects');
class LoginPage {
  constructor(page) {
    this.page = page;
  }
  async gotoHomePage(url) {
    await this.page.goto(url);
  }
  async clickLoginButtonFromMain() {
    const loginButtonFromMain = this.page.getByRole(LoginObjects_1.LoginObjects.loginButtonFromMain.role, { name: LoginObjects_1.LoginObjects.loginButtonFromMain.name });
    await (0, test_1.expect)(loginButtonFromMain).toBeVisible({ timeout: 90000 });
    await loginButtonFromMain.click();
    await this.page.waitForTimeout(20000);
  }
  async clickLoginButton() {
    const loginButton = this.page.locator(LoginObjects_1.LoginObjects.loginButton.xpath);
    await (0, test_1.expect)(loginButton).toBeVisible({ timeout: 90000 });
    await loginButton.click();
  }
  async acceptCookies() {
    const acceptCookiesButton = this.page.getByRole(LoginObjects_1.LoginObjects.acceptCookiesButton.role, { name: LoginObjects_1.LoginObjects.acceptCookiesButton.name });
    await acceptCookiesButton.click();
  }
  async enterUserId(userId) {
    const userIdInput = this.page.locator(LoginObjects_1.LoginObjects.userIdInput.xpath);
    await (0, test_1.expect)(userIdInput).toBeVisible({ timeout: 90000 });
    await userIdInput.fill(userId);
  }
  async clickContinueButton() {
    const continueButton = this.page.locator(LoginObjects_1.LoginObjects.continueButton.xpath);
    await (0, test_1.expect)(continueButton).toBeVisible({ timeout: 90000 });
    await continueButton.click();
  }
  async waitForNafathPromptToDisappear() {
    const nafathPromptHeading = this.page.getByRole(LoginObjects_1.LoginObjects.nafathPromptHeading.role, { name: LoginObjects_1.LoginObjects.nafathPromptHeading.name });
    try {
      await (0, test_1.expect)(nafathPromptHeading).toBeVisible({ timeout: 10000 });
      await (0, test_1.expect)(nafathPromptHeading).toBeHidden({ timeout: 10000 });
    } catch {
      console.log('Nafath prompt took too long to pass');
    }
  }
  async clickOnContinue() {
    const continueButton = this.page.locator(LoginObjects_1.LoginObjects.continueButton2.xpath);
    await (0, test_1.expect)(continueButton).toBeVisible({ timeout: 90000 });
    await continueButton.click();
  }
}
exports.LoginPage = LoginPage;
