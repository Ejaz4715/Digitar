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

test.describe('View Properties and Units', () => {
  test('TC-01 Verify the user view the propertires', { annotation: [{ product: 'Digitar Broker', type: 'Non-critical' }] as any }, async ({ page }) => {
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
    await app.commonMethods.clickIfVisible(LoginObjects.cancelButton, { timeout: 20000 });
    await app.commonMethods.clickIfVisible(LoginObjects.laterButton);
    await app.commonMethods.clickIfVisible(LoginObjects.doneButton);
    await logStep('Step 05: Navigate to properties and units page > Verify properties page is present');
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsButton);
    await app.commonMethods.verifyElementVisible(PropertiesAndUnitsObjects.propertiesAndUnitsDropdownList);
  });
  test('TC-02 Verify the user filter the properties', { annotation: [{ product: 'Digitar Broker', type: 'Non-critical' }] as any }, async ({ page }) => {
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
    await app.commonMethods.clickIfVisible(LoginObjects.cancelButton, { timeout: 20000 });
    await app.commonMethods.clickIfVisible(LoginObjects.laterButton);
    await app.commonMethods.clickIfVisible(LoginObjects.doneButton);
    await logStep('Step 05: Navigate to properties and units page > Verify the user filter for property');
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.filterButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.schoolOption);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.applyButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.filterButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.schoolOption);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.landOption);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.applyButton);
    await app.commonMethods.verifyElementVisible(PropertiesAndUnitsObjects.propertyUnitCard);
  });
  test('TC-03 Verify the user search with name and search with deed number', { annotation: [{ product: 'Digitar Broker', type: 'Non-critical' }] as any }, async ({ page }) => {
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
    await app.commonMethods.clickIfVisible(LoginObjects.cancelButton, { timeout: 20000 });
    await app.commonMethods.clickIfVisible(LoginObjects.laterButton);
    await app.commonMethods.clickIfVisible(LoginObjects.doneButton);
    await logStep('Step 05: Navigate to properties and units page > Verify the user search by deed number');
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsButton);
    await app.commonMethods.fill(PropertiesAndUnitsObjects.searchInputfield, '916760000493');
    await app.commonMethods.verifyElementVisible(PropertiesAndUnitsObjects.propertyUnitCard);
  });
  test('TC-04 Verify the user search for properties with invalid data or data not exist', { annotation: [{ product: 'Digitar Broker', type: 'Non-critical' }] as any }, async ({ page }) => {
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
    await app.commonMethods.clickIfVisible(LoginObjects.cancelButton, { timeout: 20000 });
    await app.commonMethods.clickIfVisible(LoginObjects.laterButton);
    await app.commonMethods.clickIfVisible(LoginObjects.doneButton);
    await logStep('Step 05: Navigate to properties and units page > Verify the user search by invalid data');
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsButton);
    await app.commonMethods.fill(PropertiesAndUnitsObjects.searchInputfield, 'testNodata101001');
    await app.commonMethods.verifyElementVisible(PropertiesAndUnitsObjects.noDataFoundMessage);
  });
  test('TC-05 Verify the user can view property details from More details button', { annotation: [{ product: 'Digitar Broker', type: 'Non-critical' }] as any }, async ({ page }) => {
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
    await app.commonMethods.clickIfVisible(LoginObjects.cancelButton, { timeout: 20000 });
    await app.commonMethods.clickIfVisible(LoginObjects.laterButton);
    await app.commonMethods.clickIfVisible(LoginObjects.doneButton);
    await logStep('Step 05: Navigate to properties and units page > Verify the user view property details from more details button');
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.moreDetailsButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertyUnitCard);
    await app.commonMethods.verifyElementVisible(PropertiesAndUnitsObjects.propertyDetailsPage);
  });
  test('TC-06 Verify the user can view property from click on kebab button', { annotation: [{ product: 'Digitar Broker', type: 'Non-critical' }] as any }, async ({ page }) => {
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
    await app.commonMethods.clickIfVisible(LoginObjects.cancelButton, { timeout: 20000 });
    await app.commonMethods.clickIfVisible(LoginObjects.laterButton);
    await app.commonMethods.clickIfVisible(LoginObjects.doneButton);
    await logStep('Step 05: Navigate to properties and units page > Verify the user view property details from kebab button');
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.kebabButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.viewPropertyDetailsButton);
    await app.commonMethods.verifyElementVisible(PropertiesAndUnitsObjects.propertyDetailsPage);
  });
  test('TC-07 Verify the user view the units', { annotation: [{ product: 'Digitar Broker', type: 'Non-critical' }] as any }, async ({ page }) => {
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
    await app.commonMethods.clickIfVisible(LoginObjects.cancelButton, { timeout: 20000 });
    await app.commonMethods.clickIfVisible(LoginObjects.laterButton);
    await app.commonMethods.clickIfVisible(LoginObjects.doneButton);
    await logStep('Step 05: Navigate to properties and units page > Verify the user view units');
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsDropdownList);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.unitsOption);
    await app.commonMethods.verifyElementVisible(PropertiesAndUnitsObjects.propertyUnitCard);
  });
  test('TC-08 Verify the user filter the units', { annotation: [{ product: 'Digitar Broker', type: 'Non-critical' }] as any }, async ({ page }) => {
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
    await app.commonMethods.clickIfVisible(LoginObjects.cancelButton, { timeout: 20000 });
    await app.commonMethods.clickIfVisible(LoginObjects.laterButton);
    await app.commonMethods.clickIfVisible(LoginObjects.doneButton);
    await logStep('Step 05: Navigate to properties and units page > Verify the user filter for unit');
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsDropdownList);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.unitsOption);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.filterButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.hotelOption);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.applyButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.filterButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.apartmentOption);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.hotelOption);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.applyButton);
    await app.commonMethods.verifyElementVisible(PropertiesAndUnitsObjects.propertyUnitCard);
  });
  test('TC-09 Verify the user can view unit details from More details button', { annotation: [{ product: 'Digitar Broker', type: 'Non-critical' }] as any }, async ({ page }) => {
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
    await app.commonMethods.clickIfVisible(LoginObjects.cancelButton, { timeout: 20000 });
    await app.commonMethods.clickIfVisible(LoginObjects.laterButton);
    await app.commonMethods.clickIfVisible(LoginObjects.doneButton);
    await logStep('Step 05: Navigate to properties and units page > Verify the user view unit details from more details button');
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsDropdownList);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.unitsOption);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.moreDetailsButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertyUnitCard);
    await app.commonMethods.verifyElementVisible(PropertiesAndUnitsObjects.unitDetailsPage);
  });
  test('TC-10 Verify the user can view unit from click on kebab button', { annotation: [{ product: 'Digitar Broker', type: 'Non-critical' }] as any }, async ({ page }) => {
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
    await app.commonMethods.clickIfVisible(LoginObjects.cancelButton, { timeout: 20000 });
    await app.commonMethods.clickIfVisible(LoginObjects.laterButton);
    await app.commonMethods.clickIfVisible(LoginObjects.doneButton);
    await logStep('Step 05: Navigate to properties and units page > Verify the user view unit details from kebab button');
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsDropdownList);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.unitsOption);
    await page.waitForTimeout(2000);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.kebabButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.viewUnitDetailsButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertyUnitCard);
    await app.commonMethods.verifyElementVisible(PropertiesAndUnitsObjects.unitDetailsPage);
  });
  test('TC-11 Verify the user search with unit type and search with deed number', { annotation: [{ product: 'Digitar Broker', type: 'Non-critical' }] as any }, async ({ page }) => {
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
    await app.commonMethods.clickIfVisible(LoginObjects.cancelButton, { timeout: 20000 });
    await app.commonMethods.clickIfVisible(LoginObjects.laterButton);
    await app.commonMethods.clickIfVisible(LoginObjects.doneButton);
    await logStep('Step 05: Navigate to properties and units page > Verify the user search by deed number');
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsDropdownList);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.unitsOption);
    await page.waitForTimeout(2000);
    await app.commonMethods.fill(PropertiesAndUnitsObjects.searchInputfield, '916760000493');
    await app.commonMethods.verifyElementVisible(PropertiesAndUnitsObjects.propertyUnitCard);
  });
  test('TC-12 Verify the user search for units with invalid data or data not exist', { annotation: [{ product: 'Digitar Broker', type: 'Non-critical' }] as any }, async ({ page }) => {
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
    await app.commonMethods.clickIfVisible(LoginObjects.cancelButton, { timeout: 20000 });
    await app.commonMethods.clickIfVisible(LoginObjects.laterButton);
    await app.commonMethods.clickIfVisible(LoginObjects.doneButton);
    await logStep('Step 05: Navigate to properties and units page > Verify the user search by invalid data');
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsDropdownList);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.unitsOption);
    await page.waitForTimeout(2000);
    await app.commonMethods.fill(PropertiesAndUnitsObjects.searchInputfield, 'testNodata101001');
    await app.commonMethods.verifyElementVisible(PropertiesAndUnitsObjects.noDataFoundMessage);
  });
  test('TC-13 Verify user able to Clear the filtration for property and unit', { annotation: [{ product: 'Digitar Broker', type: 'Non-critical' }] as any }, async ({ page }) => {
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
    await app.commonMethods.clickIfVisible(LoginObjects.cancelButton, { timeout: 20000 });
    await app.commonMethods.clickIfVisible(LoginObjects.laterButton);
    await app.commonMethods.clickIfVisible(LoginObjects.doneButton);
    await logStep('Step 05: Navigate to properties and units page > Verify the user clear all filtration for both properties and units');
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.filterButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.schoolOption);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.clearAllButton);
    await app.commonMethods.verifyElementVisible(PropertiesAndUnitsObjects.propertyUnitCard);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsDropdownList);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.unitsOption);
    await page.waitForTimeout(2000);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.filterButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.hotelOption);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.clearAllButton);
    await app.commonMethods.verifyElementVisible(PropertiesAndUnitsObjects.propertyUnitCard);
  });
  test('TC-14 Verify the of property source is form wasata/ejar', { annotation: [{ product: 'Digitar Broker', type: 'Non-critical' }] as any }, async ({ page }) => {
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
    await app.commonMethods.clickIfVisible(LoginObjects.cancelButton, { timeout: 20000 });
    await app.commonMethods.clickIfVisible(LoginObjects.laterButton);
    await app.commonMethods.clickIfVisible(LoginObjects.doneButton);
    await logStep('Step 05: Navigate to properties and units page > Verify the market insight section is present');
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertyUnitCard);
    await app.commonMethods.verifyEitherElementVisible(PropertiesAndUnitsObjects.wasataSource, PropertiesAndUnitsObjects.ejarSource);
  });
  test('TC-15 Verify view a property by select from the map', { annotation: [{ product: 'Digitar Broker', type: 'Non-critical' }] as any }, async ({ page }) => {
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
    await app.commonMethods.clickIfVisible(LoginObjects.cancelButton, { timeout: 20000 });
    await app.commonMethods.clickIfVisible(LoginObjects.laterButton);
    await app.commonMethods.clickIfVisible(LoginObjects.doneButton);
    await logStep('Step 05: Navigate to properties and units page > Verify the user view unit details from more details button');
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.viewMapButton);
    await page.waitForTimeout(2000);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertyUnitCard);
    await app.commonMethods.verifyElementVisible(PropertiesAndUnitsObjects.propertyDetailsPage);
  });
  test('TC-16 Verify the market insight section/data statestics is exists', { annotation: [{ product: 'Digitar Broker', type: 'Non-critical' }] as any }, async ({ page }) => {
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
    await app.commonMethods.clickIfVisible(LoginObjects.cancelButton, { timeout: 20000 });
    await app.commonMethods.clickIfVisible(LoginObjects.laterButton);
    await app.commonMethods.clickIfVisible(LoginObjects.doneButton);
    await logStep('Step 05: Navigate to properties and units page > Verify the market insight section is present');
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertiesAndUnitsButton);
    await app.commonMethods.clickElement(PropertiesAndUnitsObjects.propertyUnitCard);
    await app.commonMethods.verifyElementVisible(PropertiesAndUnitsObjects.marketInsightSection);
  });
});
