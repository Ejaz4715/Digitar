import { test } from '@playwright/test';
const path = require('path');
import { WebApp } from '@base/web-app';
import { DataHelper } from '@helpers/data-helper';
import { logStep } from '@helpers/log-steps';
import { LoginObjects } from '@objects/LoginObjects';

const SERVICE = 'rental-behaviour';
const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;
const writeServiceData = (key: string, value: any) => DataHelper.updateServiceData(SERVICE, key, value);

test.describe('Rental Behaviour', () => {
  test('TC-01 User submit rental behaviour request', { annotation: [{ product: 'Digitar Broker', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
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
    await logStep('Step 05: Navigate to rental behaviour > Click on new request button');
    await app.rentalBehaviourPage.clickOnRentalBehaviourButton();
    await app.rentalBehaviourPage.clickOnNewRequestButton();
    await logStep('Step 06: Enter tenant id > Click on send request button');
    await app.rentalBehaviourPage.enterNationalId(tenantId);
    await app.rentalBehaviourPage.clickOnSendRequestButton();
    await logStep('Step 07: Verify the successful message > Take request number');
    await app.rentalBehaviourPage.verifySuccessfullMessage();
    await app.rentalBehaviourPage.clickOnViewRequestButton();
    const requestNumber = await app.rentalBehaviourPage.getTheRequestNumber();
    writeServiceData('requestNumber', requestNumber);
  });
  test('TC-02 User approve the rental behavior request', { annotation: [{ product: 'Digitar Broker', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    //read data from json relative to the service
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const tenantId = data.tenantId;
    const tenantPassword = data.tenantPassword;
    const ejarUrl = environment.ejar;
    const requestNumber = data.requestNumber;

    await logStep('Step 01: Login to ejar portal as tenant');
    await app.loginPage.gotoHomePage(ejarUrl);
    await app.rentalBehaviourPage.enterUsernameOrNationalId(tenantId);
    await app.rentalBehaviourPage.enterPassword(tenantPassword);
    await app.rentalBehaviourPage.clickOnLoginButton();
    await app.rentalBehaviourPage.enterOTPCode(1234);
    await app.rentalBehaviourPage.clickOnVerifyButton();
    await app.rentalBehaviourPage.handlePopupCloseButtons();
    await logStep('Step 02: Change role to tenant');
    await app.rentalBehaviourPage.selectRoleIfNeeded('مستأجر');
    await logStep('Step 03: Navigate to the requests');
    await app.rentalBehaviourPage.clickOnTheRequestsTabButton();
    const referenceResponse = DataHelper.recordReferenceResponse(page, String(requestNumber));
    await app.rentalBehaviourPage.clickOnViewRequestsOption();
    await referenceResponse;
    await logStep('Step 04: Filter by request number > Navigate to it');
    await app.rentalBehaviourPage.clickOnFilterButton();
    const ejarReference = readServiceData().ejarReference;
    if (!ejarReference) {
      throw new Error(`No ejarReference was saved for request "${requestNumber}".`);
    }
    await app.rentalBehaviourPage.enterRequestNumber(ejarReference);
    await app.rentalBehaviourPage.clickOnKebabutton();
    await app.rentalBehaviourPage.selectViewTheRequest();
    await logStep('Step 05: Check on the terms and condition > Approve and confirm > Veriy the successful message');
    await app.rentalBehaviourPage.checkOnTermsAndConditions();
    await app.rentalBehaviourPage.clickOnApproveButton();
    await app.rentalBehaviourPage.clickOnConfirmButton();
    await app.rentalBehaviourPage.enterOTPCode(1234);
    await app.rentalBehaviourPage.clickOnVerifyButton();
    await app.rentalBehaviourPage.handlePopupCloseButtons();
    await app.rentalBehaviourPage.verifySuccessfullApprovalMessage();
  });
  test('TC-03 User pay rental behavior request', { annotation: [{ product: 'Digitar Broker', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
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
    await logStep('Step 05: Navigate to rental behaviour > Click on new request button');
    await app.rentalBehaviourPage.clickOnRentalBehaviourButton();
    await app.rentalBehaviourPage.clickOnReportsButton();
    await app.rentalBehaviourPage.searchForRequestNumber(requestNumber);
    await app.rentalBehaviourPage.clickOnDotsButton();
    await app.rentalBehaviourPage.clickOnPayFeesOptionButton();
    await app.rentalBehaviourPage.clickOnProceedToPayButton();
    await app.issueAdLicensePage.fillCardDetails();
  });
});
