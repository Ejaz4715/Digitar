import { test } from '@playwright/test';
const path = require('path');
import { WebApp } from '@base/web-app';
import { DataHelper } from '@helpers/data-helper';
import { logStep } from '@helpers/log-steps';
import { LoginObjects } from '@objects/LoginObjects';

const SERVICE = 'reservation-management';

const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;
const writeServiceData = (key: string, value: any) => DataHelper.updateServiceData(SERVICE, key, value);

test.describe('Reservation Management', () => {
  test('TC-01 User create new reservation', { annotation: [{ product: 'Digitar Broker', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    //read data from json relative to the service
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const userId = data.userId;
    const digitarUrl = environment.broker;
    const userForBook = data.userForBook;

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
    await logStep('Step 05: Navigate to reservation management > Click on new reservation button');
    await app.reservationManagementPage.clickOnReservationManagementButton();
    await app.reservationManagementPage.clickOnNewReservationButton();
    await logStep('Step 06: Search for user > Click on next button');
    await app.reservationManagementPage.enterNationalId(userForBook);
    await app.reservationManagementPage.clickOnSearchButton();
    await app.reservationManagementPage.clickOnNextButton();
    await logStep('Step 07: Select unit > Click on next button');
    await app.reservationManagementPage.selectUnit();
    await app.reservationManagementPage.clickOnNextButton();
    await logStep('Step 08: Select bank > Click on next button');
    await app.reservationManagementPage.selectBank();
    await app.reservationManagementPage.clickOnNextButton();
    await logStep('Step 09 Take unit code > Click on confirm reservation button > Verfiy the successful reservation message');
    const unitCode = await app.reservationManagementPage.takeTheUnitCode();
    writeServiceData('unitCode', unitCode);
    await app.reservationManagementPage.clickOnConfirmReservationButton();
    await app.reservationManagementPage.verifySuccessfullReservationMessage();
  });
  test('TC-02 Verify user view the reserved unit in Partener side', { annotation: [{ product: 'Digitar Broker', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    //read data from json relative to the service
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const developerId = data.developerId;
    const sapaUrl = environment.developer;
    const unitCode = data.unitCode;

    await logStep('Step 01: Navigate to partners portal > Login as developer');
    await app.loginPage.gotoHomePage(sapaUrl);
    await app.reservationManagementPage.loginDeveloper(developerId);
    // await app.reservationManagementPage.switchRoleToDeveloper();
    await logStep('Step 02: Navigate to individual bookings > Search for unit code');
    await app.reservationManagementPage.navigateToIndividualBookings();
    await app.reservationManagementPage.searchBookingByUnitCode(unitCode);
    await app.reservationManagementPage.filterBookingsByStatus('عرض السعر');
    await app.reservationManagementPage.verifyTheReservedUnitIsReflectInPartners(unitCode);
  });
  test('TC-03 Verify user cancel the reserved unit', { annotation: [{ product: 'Digitar Broker', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    //read data from json relative to the service
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const userId = data.userId;
    const digitarUrl = environment.broker;
    const unitCode = data.unitCode;

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
    await logStep('Step 05: Navigate to reservation management > Search for the unit > View unit details');
    await app.reservationManagementPage.clickOnReservationManagementButton();
    await app.reservationManagementPage.searchForUnitCode(unitCode);
    await app.reservationManagementPage.clickOnViewDetailsnButton();
    await logStep('Step 06: Navigate to reservation details > Select reason to cancel');
    await app.reservationManagementPage.clickOnReservationDetailsnTabButton();
    await app.reservationManagementPage.selectCancelReservationReason();
    await logStep('Step 07: Click cancel reservation > Click on yes cnacel');
    await app.reservationManagementPage.clickOnCancelReservationButton();
    await app.reservationManagementPage.clickOnYesCancelButton();
    await logStep('Step 08: Enter otp then confrim code > Verify the reservation status is canceled');
    await app.reservationManagementPage.enterOTPCode();
    await app.reservationManagementPage.clickOnConfirmCodeButton();
    await app.reservationManagementPage.verifyTheReservationStatusIsCanceled('ملغي');
  });
});
