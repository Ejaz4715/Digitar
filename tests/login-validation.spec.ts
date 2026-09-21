import { test, expect } from "@playwright/test";
import { WebApp } from "@base/web-app";
import { DataHelper } from '@helpers/data-helper'
import { logStep } from "@helpers/log-steps";
import testData from "@data/test-data.json";

test.describe("Digitar Authentication Test Suite", () => {
  let app: WebApp;
  const env = testData.environments;
  const data = testData.services.login;

  test.beforeEach(async ({ page }) => {
    app = new WebApp(page);
    await app.loginPage.gotoHomePage(env.broker);
  });

  test("TC-01: Successful login to Digitar", { annotation: [{ product: 'Digitar', type: 'non-critical' } as any] }, async () => {

    await logStep("Step 01: Click login button from main page");
    await app.loginPage.clickLoginButtonFromMain();
    await app.loginPage.clickLoginButtonFromMain();
    await logStep("Step 02: Accept cookies");
    await app.loginPage.acceptCookies();

    await logStep("Step 03: Enter user id and login");
    await app.loginPage.enterUserId(data.userId);
    await app.loginPage.clickLoginButton();
    await app.loginPage.clickContinueButton();
    await app.loginPage.waitForNafathPromptToDisappear();
  });

  test("TC-02: Login attempt with invalid user ID", { annotation: [{ product: 'Digitar', type: 'non-critical' } as any] }, async () => {
    await logStep("Step 01: Update");
    DataHelper.updateServiceData('login', 'name', 'Ahmed');
  });

  test("TC-03: Accept cookies and verify main landing page", { annotation: [{ product: 'Digitar', type: 'non-critical' } as any] }, async () => {
    await logStep("Step 03: Add new");
    DataHelper.updateServiceData('login', 'lastLoginTimestamp', new Date().toISOString());
  });
});