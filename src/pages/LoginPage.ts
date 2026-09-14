
const path = require("path");
import { Page, expect} from "@playwright/test";

const { LoginObjects } = require(
  path.join(process.cwd(), "src","objects", "LoginObjects")
);

const testData = require(
  path.join(process.cwd(), "src","data", "test-data.json"),
);




class LoginPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async gotoHomePage(url = testData.userPortalUrl) {
    await this.page.goto(url);
  }
async clickLoginButtonFromMain() {
    const loginButtonFromMain = this.page.getByRole(
      LoginObjects.loginButtonFromMain.role,
        { name: LoginObjects.loginButtonFromMain.name },
    );
    await expect(loginButtonFromMain).toBeVisible({ timeout: 90000 });
    
    await (loginButtonFromMain).click();
  }

  async clickLoginButton() {
    const loginButton = this.page.locator(
      LoginObjects.loginButton.xpath,   
    );
    await expect(loginButton).toBeVisible({ timeout: 90000 });

    await (loginButton).click();
  }


  async acceptCookies() {
    // const acceptCookiesModal = this.page.locator(LoginObjects.acceptCookiesModal);
    // await this.click(acceptCookiesModal);

    const acceptCookiesButton = this.page.getByRole(
      LoginObjects.acceptCookiesButton.role,
      { name: LoginObjects.acceptCookiesButton.name },
    );
    await (acceptCookiesButton).click();

    // const closeCookiesModal = this.page.locator(LoginObjects.closeCookiesModal);
    // await this.click(closeCookiesModal);
  }

  async enterUserId(userId: string) {
    const userIdInput = this.page.locator(LoginObjects.userIdInput.xpath);
    await expect(userIdInput).toBeVisible({ timeout: 90000 });
    await userIdInput.fill(userId);
  }

async clickContinueButton() {
    const continueButton = this.page.locator(LoginObjects.continueButton.xpath);
    await expect(continueButton).toBeVisible({ timeout: 90000 });
    await (continueButton).click();
  }

async waitForNafathPromptToDisappear() {
    const nafathPromptHeading = this.page.getByRole(
      LoginObjects.nafathPromptHeading.role,
      { name: LoginObjects.nafathPromptHeading.name },
    );

    try {
        await expect (nafathPromptHeading).toBeVisible({timeout: 10000});
        await expect (nafathPromptHeading).toBeHidden({timeout: 10000});
    //   await nafathPromptHeading.waitFor({ state: "visible", timeout: 90000 });
    //   await nafathPromptHeading.waitFor({ state: "hidden", timeout: 90000 });
    } catch {
      // If the prompt never appears or is already gone, continue.
    }
  }
}



  module.exports = { LoginPage };