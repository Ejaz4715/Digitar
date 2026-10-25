import { test } from '@playwright/test';
const path = require('path');
import { WebApp } from '@base/web-app';
import { DataHelper } from '@helpers/data-helper';
import { logStep } from '@helpers/log-steps';
import { LoginObjects } from '@objects/LoginObjects';

const SERVICE = 'rental-behavior';
const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;
const writeServiceData = (key: string, value: any) => DataHelper.updateServiceData(SERVICE, key, value);

test.describe('Rental Behavior', () => {
  test('TC-01 User submit rental behavior request', { annotation: [{ product: 'Digitar Broker', type: 'critical' }] as any }, async ({ page }) => {
    //read data from json relative to the service
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const boId = data.boId;
    const tenantId = data.tenantId;
    const digitarUrl = environment.broker;

    await logStep('Step 01: Login to digitar portal as a broker');
    await app.loginPage.gotoHomePage(digitarUrl);
    await app.loginPage.clickLoginButtonFromMain();
    await logStep('Step 02: Accept cookies');
    await app.loginPage.acceptCookies();
    await logStep('Step 03: Enter user id and login');
    await app.commonMethods.clickElement(LoginObjects.continueWithNafathButton);
    await app.commonMethods.fill(LoginObjects.nafathIdInput, boId);
    await app.loginPage.clickContinueButton();
    await app.loginPage.waitForNafathPromptToDisappear();
    await logStep('Step 04: Check the pop ups if exist');
    await app.commonMethods.clickIfVisible(LoginObjects.cancelButton, { timeout: 20000 });
    await app.commonMethods.clickIfVisible(LoginObjects.laterButton);
    await app.commonMethods.clickIfVisible(LoginObjects.doneButton);
    await logStep('Step 05: Navigate to rental behavior > Click on new request button');
    await app.rentalBehaviorPage.clickOnRentalBehaviorButton();
    await app.rentalBehaviorPage.clickOnNewRequestButton();
    await logStep('Step 06: Enter tenant id > Click on send request button');
    await app.rentalBehaviorPage.enterNationalId(tenantId);
    await app.rentalBehaviorPage.clickOnSendRequestButton();
    await logStep('Step 07: Verify the successful message > Take request number');
    await app.rentalBehaviorPage.verifySuccessfulMessage();
    await app.rentalBehaviorPage.clickOnViewRequestButton();
    const requestNumber = await app.rentalBehaviorPage.getTheRequestNumber();
    writeServiceData('requestNumber', requestNumber);
  });
  test('TC-02 User approve the rental behavior request', { annotation: [{ product: 'Digitar Broker', type: 'critical' }] as any }, async ({ page }) => {
    //read data from json relative to the service
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const tenantId = data.tenantId;
    const tenantPassword = data.tenantPassword;
    const ejarUrl = environment.ejar;
    const requestNumber = data.requestNumber;
    const role = data.role;

    await logStep('Step 01: Login to ejar portal as tenant');
    await app.loginPage.gotoHomePage(ejarUrl);
    await app.rentalBehaviorPage.enterUsernameOrNationalId(tenantId);
    await app.rentalBehaviorPage.enterPassword(tenantPassword);
    await app.rentalBehaviorPage.clickOnLoginButton();
    await app.rentalBehaviorPage.enterOTPCode(1234);
    await app.rentalBehaviorPage.clickOnVerifyButton();
    await app.rentalBehaviorPage.handlePopupCloseButtons();
    await logStep('Step 02: Change role to tenant');
    await app.rentalBehaviorPage.selectRoleIfNeeded(role);
    await logStep('Step 03: Navigate to the requests');
    await app.rentalBehaviorPage.clickOnTheRequestsTabButton();
    const referenceResponse = DataHelper.recordReferenceResponse(page, String(requestNumber));
    await app.rentalBehaviorPage.clickOnViewRequestsOption();
    await referenceResponse;
    await logStep('Step 04: Filter by request number > Navigate to it');
    await app.rentalBehaviorPage.clickOnFilterButton();
    const ejarReference = readServiceData().ejarReference;
    if (!ejarReference) {
      throw new Error(`No ejarReference was saved for request "${requestNumber}".`);
    }
    await app.rentalBehaviorPage.enterRequestNumber(ejarReference);
    await app.rentalBehaviorPage.clickOnKebabButton();
    await app.rentalBehaviorPage.selectViewTheRequest();
    await logStep('Step 05: Check on the terms and condition > Approve and confirm > Verify the successful message');
    await app.rentalBehaviorPage.checkOnTermsAndConditions();
    await app.rentalBehaviorPage.clickOnApproveButton();
    await app.rentalBehaviorPage.clickOnConfirmButton();
    await app.rentalBehaviorPage.enterOTPCode(1234);
    await app.rentalBehaviorPage.clickOnVerifyButton();
    await app.rentalBehaviorPage.handlePopupCloseButtons();
    await app.rentalBehaviorPage.verifySuccessfulApprovalMessage();
  });
  test('TC-03 User pay rental behavior request', { annotation: [{ product: 'Digitar Broker', type: 'critical' }] as any }, async ({ page }) => {
    //read data from json relative to the service
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const boId = data.boId;
    const tenantId = data.tenantId;
    const digitarUrl = environment.broker;
    const requestNumber = data.requestNumber;

    await logStep('Step 01: Login to digitar portal as a broker');
    await app.loginPage.gotoHomePage(digitarUrl);
    await app.loginPage.clickLoginButtonFromMain();
    await logStep('Step 02: Accept cookies');
    await app.loginPage.acceptCookies();
    await logStep('Step 03: Enter user id and login');
    await app.commonMethods.clickElement(LoginObjects.continueWithNafathButton);
    await app.commonMethods.fill(LoginObjects.nafathIdInput, boId);
    await app.loginPage.clickContinueButton();
    await app.loginPage.waitForNafathPromptToDisappear();
    await logStep('Step 04: Check the pop ups if exist');
    await app.commonMethods.clickIfVisible(LoginObjects.cancelButton, { timeout: 20000 });
    await app.commonMethods.clickIfVisible(LoginObjects.laterButton);
    await app.commonMethods.clickIfVisible(LoginObjects.doneButton);
    await logStep('Step 05: Navigate to rental behavior > Click on new request button');
    await app.rentalBehaviorPage.clickOnRentalBehaviorButton();
    await app.rentalBehaviorPage.clickOnReportsButton();
    await app.rentalBehaviorPage.searchForRequestNumber(requestNumber);
    await app.rentalBehaviorPage.clickOnDotsButton();
    await app.rentalBehaviorPage.clickOnPayFeesOptionButton();
    await app.rentalBehaviorPage.clickOnProceedToPayButton();
    await app.issueAdLicensePage.fillCardDetails();
  });
});
