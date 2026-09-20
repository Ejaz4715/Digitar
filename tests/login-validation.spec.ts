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

    await logStep("Step 01: Click login button from main page", async () => {
      await app.loginPage.clickLoginButtonFromMain();
    });

    await logStep("Step 01: Click login button from main page", async () => {
      await app.loginPage.clickLoginButtonFromMain();
    });

    await logStep("Step 02: Accept application cookies", async () => {
      await app.loginPage.acceptCookies();
    });

    await logStep("Step 03: Enter user ID", async () => {
      await app.loginPage.enterUserId(data.userId);
    });

    await logStep("Step 04: Click primary login button", async () => {
      await app.loginPage.clickLoginButton();
    });

    await logStep("Step 05: Click continue button", async () => {
      await app.loginPage.clickContinueButton();
    });

    await logStep("Step 06: Wait for Nafath prompt to disappear", async () => {
      await app.loginPage.waitForNafathPromptToDisappear();
    });
  });

  test("TC-02: Login attempt with invalid user ID", { annotation: [{ product: 'Digitar', type: 'non-critical' } as any] }, async () => {
    await logStep("update existing data in json under 'login' service", async () => {
      DataHelper.updateServiceData('login', 'name', 'Ahmed');
    });
  });

  test("TC-03: Accept cookies and verify main landing page", { annotation: [{ product: 'Digitar', type: 'non-critical' } as any] }, async () => {
    await logStep("Add new data under the 'login' service", async () => {
      DataHelper.updateServiceData('login', 'lastLoginTimestamp', new Date().toISOString());
    });
  });
});