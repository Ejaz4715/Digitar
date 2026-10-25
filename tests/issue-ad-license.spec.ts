import { test } from '@playwright/test';
const path = require('path');
import { WebApp } from '@base/web-app';
import { DataHelper } from '@helpers/data-helper';
import { logStep } from '@helpers/log-steps';
import { PropertiesAndUnitsObjects } from '@objects/PropertiesAndUnitsObjects';
import { LoginObjects } from '@objects/LoginObjects';

const SERVICE = 'issue-ad-license';

const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;
const writeServiceData = (key: string, value: any) => DataHelper.updateServiceData(SERVICE, key, value);

test.describe('Issue Ad License And Publish', () => {
  test('TC-01 Verify the user issue an Ad license and publish it', { annotation: [{ product: 'Digitar Broker', type: 'critical' }] as any }, async ({ page }) => {
    //read data from json relative to the service
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const userId = data.userId;
    const digitarUrl = environment.broker;
    const searchValue = data.searchValue;
    const validImage = path.join(process.cwd(), 'src', 'data', 'Sample image 2.png');
    const invalidImage = path.join(process.cwd(), 'src', 'data', 'stamp.png');

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
    await logStep('Step 05: Navigate to issue ad license');
    await app.issueAdLicensePage.clickOnIssueButton();
    await app.issueAdLicensePage.clickOnAdLicenseButton();
    await logStep('Step 06: Search for brokerage contract number or second party name > Click on confirm and continue');
    await app.issueAdLicensePage.SearchForBrokerageContractNumberOrSecondPartyNameAndSelect(searchValue);
    await app.issueAdLicensePage.clickOnConfirmAndContinueButton();
    await logStep('Step 07: Fill the information for the purpose of the ad > Click on confirm and continue');
    await app.issueAdLicensePage.selectListingChannel();

    await app.issueAdLicensePage.enterPrice(5000);
    await app.issueAdLicensePage.clickOnConfirmAndContinueButton();
    await logStep('Step 08: Select communication method and preferred time? > Click on confirm and continue');
    await app.issueAdLicensePage.selectCommunicationMethod();
    await app.issueAdLicensePage.selectPreferredTime();
    await app.issueAdLicensePage.clickOnConfirmAndContinueButton();
    await logStep('Step 09: Select any multiples facilities > Click on confirm and continue');
    await app.issueAdLicensePage.selectMultipleFacility();
    await app.issueAdLicensePage.clickOnConfirmAndContinueButton();
    await logStep('Step 09: Upload invalid front image > Verify the validation message');
    await app.issueAdLicensePage.uploadInvalidImageAndValidateTheMessage(invalidImage);
    //generate by AI step-----------------------------------------------------------------
    await logStep('Step 10: Enter description and upload required images > Check on agreed terms > Click on confirm and continue');
    await app.issueAdLicensePage.enterDescription('Test Description Property With Facilities');
    await app.issueAdLicensePage.uploadFroAndAdditionalImages(validImage);
    await app.issueAdLicensePage.checkOnAgreeToTerms();
    await app.issueAdLicensePage.clickOnConfirmAndContinueButton();
    await logStep('Step 11: Check on disclaimer > Click on confirm and continue');
    await app.issueAdLicensePage.checkOnDisclaimer();
    await app.issueAdLicensePage.clickOnConfirmAndContinueButton();
    await logStep('Step 12: Click on proceed to pay > Fill bank info');
    await app.issueAdLicensePage.clickOnProceedToPay();
    await app.issueAdLicensePage.fillCardDetails();
    await logStep('Step 11: Verify success message > Take ad license number');
    const adLicenseNumber = await app.issueAdLicensePage.verifySuccessMessageAndGetAdLicenseNumber();
    writeServiceData('adLicenseNumber', adLicenseNumber);
  });
  test('TC-02 Verify the user filter by advertisement status options', { annotation: [{ product: 'Digitar Broker', type: 'critical' }] as any }, async ({ page }) => {
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
    await logStep('Step 05: Navigate to listing > Filter by ad status then verify are selected');
    await app.issueAdLicensePage.clickOnListingsButton();
    await app.issueAdLicensePage.verifyTheOptionsAreSelected();
  });
  test('TC-03 Verify the user view the advertisement details', { annotation: [{ product: 'Digitar Broker', type: 'critical' }] as any }, async ({ page }) => {
    //read data from json relative to the service
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const userId = data.userId;
    const digitarUrl = environment.broker;
    const adLicenseNumber = data.adLicenseNumber;

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
    await logStep('Step 05: Navigate to listing > Search by ad license');
    await app.issueAdLicensePage.clickOnListingsButton();
    await app.issueAdLicensePage.SearchForAdLicenseOrDeedNumbers(adLicenseNumber);
    await logStep('Step 06: Verify user view listing details');
    await app.issueAdLicensePage.viewListingDetails();
  });
  test('TC-04 Verify the user view the advertisement in housing sakani platform', { annotation: [{ product: 'Digitar Broker', type: 'critical' }] as any }, async ({ page }) => {
    //read data from json relative to the service
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const userId = data.userId;
    const digitarUrl = environment.broker;
    const adLicenseNumber = data.adLicenseNumber;

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
    await logStep('Step 05: Navigate to listing > Search by ad license');
    await app.issueAdLicensePage.clickOnListingsButton();
    await app.issueAdLicensePage.SearchForAdLicenseOrDeedNumbers(adLicenseNumber);
    await logStep('Step 06: Navigate to listing details page > Verify the listing in present in sakani');
    await app.issueAdLicensePage.viewListingDetails();
    await app.issueAdLicensePage.viewListingInSakani(adLicenseNumber);
  });
  test('TC-05 Verify the user hide an Ad', { annotation: [{ product: 'Digitar Broker', type: 'critical' }] as any }, async ({ page }) => {
    //read data from json relative to the service
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const userId = data.userId;
    const digitarUrl = environment.broker;
    const adLicenseNumber = data.adLicenseNumber;

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
    await logStep('Step 05: Navigate to listing > Search by ad license');
    await app.issueAdLicensePage.clickOnListingsButton();
    await app.issueAdLicensePage.SearchForAdLicenseOrDeedNumbers(adLicenseNumber);
    await logStep('Step 06: Click hide from sakani > Select reason then send > Verify the successful message');
    await app.issueAdLicensePage.hideListing();
    await app.issueAdLicensePage.verifyTheSuccessfulHideMessage();
  });

  test('TC-06 Verify the user re-publish the Ad', { annotation: [{ product: 'Digitar Broker', type: 'critical' }] as any }, async ({ page }) => {
    //read data from json relative to the service
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const userId = data.userId;
    const digitarUrl = environment.broker;
    const adLicenseNumber = data.adLicenseNumber;

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
    await logStep('Step 05: Navigate to listing > Search by ad licennse');
    await app.issueAdLicensePage.clickOnListingsButton();
    await app.issueAdLicensePage.SearchForAdLicenseOrDeedNumbers(adLicenseNumber);
    await logStep('Step 06: Navigate to listing details page > Click on republish > Verify the listing in republished in sakani');
    await app.issueAdLicensePage.viewListingDetails();
    await app.issueAdLicensePage.clickOnRepublishToSakaniButton();
    await app.issueAdLicensePage.verifyTheSuccessfulRepublishMessage();
  });
  test('TC-07 Verify user edit the Ad', { annotation: [{ product: 'Digitar Broker', type: 'critical' }] as any }, async ({ page }) => {
    //read data from json relative to the service
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const userId = data.userId;
    const digitarUrl = environment.broker;
    const adLicenseNumber = data.adLicenseNumber;
    const editDescription = data.editDescription;

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
    await logStep('Step 05: Navigate to listing > Search by ad license');
    await app.issueAdLicensePage.clickOnListingsButton();
    await app.issueAdLicensePage.SearchForAdLicenseOrDeedNumbers(adLicenseNumber);
    await logStep('Step 06: Cick on edit ad > Click on save and confirm > Verify the successful message');
    await app.issueAdLicensePage.clickOnKebabButton();
    await app.issueAdLicensePage.clickOnEditListingButton();
    await app.issueAdLicensePage.editDescription(editDescription);
    await app.issueAdLicensePage.clickOnSaveAndConfirmButton();
    await app.issueAdLicensePage.verifyTheSuccessfulEditMessage();
    await app.issueAdLicensePage.clickOnCloseButton();
    await logStep('Step 07: Verify the ad has been edit');
    await app.issueAdLicensePage.SearchForAdLicenseOrDeedNumbers(adLicenseNumber);
    await app.issueAdLicensePage.viewListingDetails();
    await app.issueAdLicensePage.verifySameEditDescription(editDescription);
  });
});
