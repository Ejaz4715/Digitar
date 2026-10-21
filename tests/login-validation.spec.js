'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const test_1 = require('@playwright/test');
const web_app_1 = require('@base/web-app');
const data_helper_1 = require('@helpers/data-helper');
const log_steps_1 = require('@helpers/log-steps');
const test_data_json_1 = __importDefault(require('@data/test-data.json'));
test_1.test.describe('Digitar Authentication Test Suite', () => {
  let app;
  const env = test_data_json_1.default.environments;
  const data = test_data_json_1.default.services.login;
  test_1.test.beforeEach(async ({ page }) => {
    app = new web_app_1.WebApp(page);
    await app.loginPage.gotoHomePage(env.broker);
  });
  (0, test_1.test)('TC-01: Successful login to Digitar', { annotation: [{ product: 'Digitar', type: 'non-critical' }] }, async () => {
    await (0, log_steps_1.logStep)('Step 01: Click login button from main page');
    await app.loginPage.clickLoginButtonFromMain();
    await app.loginPage.clickLoginButtonFromMain();
    await (0, log_steps_1.logStep)('Step 02: Accept cookies');
    await app.loginPage.acceptCookies();
    await (0, log_steps_1.logStep)('Step 03: Enter user id and login');
    await app.loginPage.enterUserId(data.userId);
    await app.loginPage.clickLoginButton();
    await app.loginPage.clickContinueButton();
    await app.loginPage.waitForNafathPromptToDisappear();
  });
  (0, test_1.test)('TC-02: Update data to json', { annotation: [{ product: 'Digitar', type: 'non-critical' }] }, async () => {
    await (0, log_steps_1.logStep)('Step 01: Update');
    data_helper_1.DataHelper.updateServiceData('login', 'name', 'Ahmed');
  });
  (0, test_1.test)('TC-03: Write data to json', { annotation: [{ product: 'Digitar', type: 'non-critical' }] }, async () => {
    await (0, log_steps_1.logStep)('Step 03: Add new');
    data_helper_1.DataHelper.updateServiceData('login', 'lastLoginTimestamp', new Date().toISOString());
  });
});
