import { test, expect } from "@playwright/test";
const fs = require("fs");
const path = require("path");
const { WebApp } = require(path.join(process.cwd(), "src", "base-class", "web-app"));


const testDataPath = path.join(
  process.cwd(), "src",
  "data",
  "test-data.json",
);
const testData = JSON.parse(fs.readFileSync(testDataPath, "utf8"));
test('TC-01-login-to-digitar', async ({ page }) => {
    const app = new WebApp(page); 
    await app.loginPage.gotoHomePage(testData.digitarUrl);
    await app.loginPage.clickLoginButtonFromMain();
    await app.loginPage.acceptCookies();
    await app.loginPage.enterUserId(testData.userId);
    await app.loginPage.clickLoginButton();
    await app.loginPage.clickContinueButton();
    await app.loginPage.waitForNafathPromptToDisappear();
});