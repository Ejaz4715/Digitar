import { test } from '@playwright/test';
const path = require('path');
import { WebApp } from '@base/web-app';
import { DataHelper } from '@helpers/data-helper';
import { logStep } from '@helpers/log-steps';
import { PropertiesAndUnitsObjects } from '@objects/PropertiesAndUnitsObjects';
import { LoginObjects } from '@objects/LoginObjects';

const SERVICE = 'properties-and-units';

const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;
const writeServiceData = (key: string, value: any) => DataHelper.updateServiceData(SERVICE, key, value);

test.describe('View Properties and Units', () => {
  test('TC-01 Verify the user view the propertires', { annotation: [{ product: 'Self-Construction', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    //read data from json relative to the service
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const userId = data.userId;
    const digitarUrl = environment.broker;

    await logStep('Step 01: Login to digitar portal as a broker');
    await app.loginPage.gotoHomePage(digitarUrl);
    await app.loginPage.clickLoginButtonFromMain();
    await logStep('Step 02: Accept cookies');
    await app.loginPage.acceptCookies();
    await logStep('Step 03: Enter user id and login');
    await app.commonMethods.clickElement(LoginObjects.continueWithNafathButton);
    await app.commonMethods.fill(LoginObjects.nafathIdInput, userId);
    await app.loginPage.clickContinueButton();
    await app.loginPage.waitForNafathPromptToDisappear();
    await logStep('Step 04: Check the pop ups if exist');
    await app.commonMethods.clickIfVisible(LoginObjects.cancelButton);
    await app.commonMethods.clickIfVisible(LoginObjects.laterButton);
    await logStep('Step 05: Navigate to properties and units page > Verify proeprties page is present');
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsButton);
    await app.commonMethods.verifyElementVisible(PropertiesAndUnitsObjects.propertiesAndUnitsDropdwonList);
  });
  test('TC-02 Verify the user filter the properties', { annotation: [{ product: 'Self-Construction', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    //read data from json relative to the service
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const userId = data.userId;
    const digitarUrl = environment.broker;

    await logStep('Step 01: Login to digitar portal as a broker');
    await app.loginPage.gotoHomePage(digitarUrl);
    await app.loginPage.clickLoginButtonFromMain();
    await logStep('Step 02: Accept cookies');
    await app.loginPage.acceptCookies();
    await logStep('Step 03: Enter user id and login');
    await app.commonMethods.clickElement(LoginObjects.continueWithNafathButton);
    await app.commonMethods.fill(LoginObjects.nafathIdInput, userId);
    await app.loginPage.clickContinueButton();
    await app.loginPage.waitForNafathPromptToDisappear();
    await page.pause();
    await logStep('Step 04: Check the pop ups if exist');
    await app.commonMethods.clickIfVisible(LoginObjects.cancelButton);
    await app.commonMethods.clickIfVisible(LoginObjects.laterButton);
    await logStep('Step 05: Navigate to properties and units page > Verify the user filter for property');
  });
});
