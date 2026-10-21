import { Page, expect, Locator } from '@playwright/test';
import { CommonMethods } from '@pages/util/CommonMethod';
import { ReservationManagementObjects } from '@objects/ReservationManagementObjects';

const DEFAULT_TIMEOUT = 30_000;
const LONG_TIMEOUT = 90_000;
export class ReservationManagementPage {
  page: Page;

  readonly commonMethod: CommonMethods;

  defaultTimeout: number | undefined;
  constructor(page: Page) {
    this.page = page;
    this.defaultTimeout = 60000;
    this.commonMethod = new CommonMethods(page);
  }

  async click(locator: any) {
    await locator.click();
  }
  //Click on reservation management from side menu
  async clickOnReservationManagementButton() {
    this.commonMethod.clickElement(ReservationManagementObjects.reservationManagementButton);
  }
  //Click on new reservation button
  async clickOnNewReservationButton() {
    this.commonMethod.clickElement(ReservationManagementObjects.newReservationButton);
  }
  //Enter national id
  async enterNationalId(id: string | number) {
    await this.commonMethod.fill(ReservationManagementObjects.nationalIdInputfield, String(id));
  }
  //Click on search button
  async clickOnSearchButton() {
    await this.page.waitForTimeout(2000);
    this.commonMethod.clickElement(ReservationManagementObjects.searchButton);
  }
  //Click on next button
  async clickOnNextButton() {
    await this.page.waitForTimeout(2000);
    this.commonMethod.clickElement(ReservationManagementObjects.nextButton);
  }
  //Select first unit
  async selectUnit() {
    await this.page.waitForTimeout(2000);
    this.commonMethod.clickElement(ReservationManagementObjects.firstUnitCheckbox);
  }
  //Select bank - Albilad
  async selectBank() {
    const bankSelect = this.page.locator(ReservationManagementObjects.bankDropddownList.xpath);
    await bankSelect.selectOption({ label: ' بنك البلاد ' });
  }
  //Click on confirm reservation button
  async clickOnConfirmReservationButton() {
    await this.page.waitForTimeout(2000);
    this.commonMethod.clickElement(ReservationManagementObjects.confirmReservationButton);
  }
  //Take the unit code
  async takeTheUnitCode() {
    return this.commonMethod.getText(ReservationManagementObjects.unitCode);
  }

  //Verify the successfull reservation message
  async verifySuccessfullReservationMessage() {
    await this.page.waitForTimeout(10000);
    this.commonMethod.verifyElementVisible(ReservationManagementObjects.successReservationMessage);
  }
  //Search for unit code
  async searchForUnitCode(unitCode: string | number) {
    await this.commonMethod.fill(ReservationManagementObjects.searchInputfield, String(unitCode));
  }

  //Click on view details button - the first
  async clickOnViewDetailsnButton() {
    await this.page.waitForTimeout(5000);
    this.commonMethod.clickElement(ReservationManagementObjects.viewDetailsButton);
  }
  //Click on resrvation details tab button
  async clickOnReservationDetailsnTabButton() {
    await this.page.waitForTimeout(3000);
    this.commonMethod.clickElement(ReservationManagementObjects.reservationDetailsTabButton);
  }
  //Select reason to canle the resrvation - project moved
  async selectCancelReservationReason() {
    const reasonSelect = this.page.locator(ReservationManagementObjects.reservationCancelReasonDrodpwnList.xpath);
    await reasonSelect.selectOption({ label: ' الانتقال لمشروع آخر ' });
  }
  //Click on cancel resrvation button
  async clickOnCancelReservationButton() {
    await this.page.waitForTimeout(3000);
    this.commonMethod.clickElement(ReservationManagementObjects.reservationCancelButton);
  }
  //Click on yes cancel button
  async clickOnYesCancelButton() {
    await this.page.waitForTimeout(3000);
    this.commonMethod.clickElement(ReservationManagementObjects.yesCancelButton);
  }
  //Enter OTP 1234
  async enterOTPCode(otp = ['1', '2', '3', '4']) {
    const otpInputs = this.page.locator(ReservationManagementObjects.otpInputField.xpath);

    for (let index = 0; index < otp.length; index++) {
      await otpInputs.nth(index).fill(otp[index]);
    }
  }
  //Click on confirm code
  async clickOnConfirmCodeButton() {
    await this.page.waitForTimeout(3000);
    this.commonMethod.clickElement(ReservationManagementObjects.confirmCodeButton);
  }
  //Verify the resrvation status in canceled
  async verifyTheReservationStatusIsCanceled(value: string) {
    await this.page.waitForTimeout(7000);
    this.commonMethod.verifyElementHasText(ReservationManagementObjects.reservationStatus, value);
  }
  //Remaining methods from sakani partenrs
  async clickIfVisible(locator: Locator, options: { timeout?: number } = {}) {
    const timeout = options.timeout ?? 5000;
    const isVisible = await locator.isVisible({ timeout }).catch(() => false);
    if (isVisible) {
      await locator.click();
    }
  }
  //login
  async loginDeveloper(nationalId: string) {
    const loginButton = this.page.locator(ReservationManagementObjects.loginButton.xpath);
    await this.waitForVisible(loginButton);
    await loginButton.click();

    // const acceptCookiesModal = this.page.locator(LoginObjects.acceptCookiesModal);
    // await this.click(acceptCookiesModal);

    const acceptCookiesButton = this.page
      .getByRole(ReservationManagementObjects.acceptCookiesButton.role, { name: ReservationManagementObjects.acceptCookiesButton.name })
      .filter({ visible: true })
      .first();
    await this.click(acceptCookiesButton);

    // The cookie modal fades out; wait for it and its backdrop so they don't block the next click
    await this.page
      .locator(ReservationManagementObjects.acceptCookiesModal)
      .waitFor({ state: 'hidden', timeout: 15000 })
      .catch(() => {});
    await this.page
      .locator('.modal-backdrop')
      .waitFor({ state: 'detached', timeout: 15000 })
      .catch(() => {});

    // const closeCookiesModal = this.page.locator(LoginObjects.closeCookiesModal);
    // await this.click(closeCookiesModal);

    const usernameInput = this.page.locator(ReservationManagementObjects.usernameInput.xpath);
    await this.waitForVisible(usernameInput);
    await usernameInput.fill(nationalId);

    const loginToButton = this.page.locator(ReservationManagementObjects.loginToButton.xpath);
    await this.waitForVisible(loginToButton);
    await loginToButton.click();

    const continueButton = this.page.locator(ReservationManagementObjects.continueButton.xpath);
    await this.waitForVisible(continueButton);
    await continueButton.click();

    const nafathModal = this.page.locator('//app-nafath-login-modal');
    await nafathModal.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});

    while (await nafathModal.isVisible().catch(() => false)) {
      await this.page.waitForTimeout(3000);
    }
    await this.page.waitForTimeout(3000);
    const verificationButton = this.page.getByRole('button', { name: 'تحقق' });
    if (await verificationButton.isVisible({ timeout: 15000 }).catch(() => false)) {
      await verificationButton.click();
      await this.page.getByRole('spinbutton', { name: 'X' }).nth(0).fill('1');
      await this.page.getByRole('spinbutton', { name: 'X' }).nth(1).fill('2');
      await this.page.getByRole('spinbutton', { name: 'X' }).nth(2).fill('3');
      await this.page.getByRole('spinbutton', { name: 'X' }).nth(3).fill('4');
      await this.page.getByRole('button', { name: 'تأكيد ومتابعة' }).click();
      await this.page.getByRole('button', { name: 'انتقل إلى لوحة المعلومات' }).click();
    }
    const profileIcon = this.page.locator(ReservationManagementObjects.profileIcon);
    await this.waitForVisible(profileIcon);
    await this.page.waitForTimeout(3000);
    const cancelButton = this.page.getByRole('button', { name: 'إلغاء' });
    await this.clickIfVisible(cancelButton.first());
  }
  async switchRoleToDeveloper() {
    const profileIcon = this.page.locator(ReservationManagementObjects.profileIcon);
    await this.waitForVisible(profileIcon);
    await profileIcon.click();

    const switchRoleButton = this.page.getByRole(ReservationManagementObjects.switchRoleButton.role, { name: ReservationManagementObjects.switchRoleButton.name });
    await this.waitForVisible(switchRoleButton);
    await switchRoleButton.click();

    const developerRole = this.page.getByText(ReservationManagementObjects.developerRoleText);
    await this.waitForVisible(developerRole);
    await developerRole.click();
    await this.page.waitForTimeout(3000); // Wait for 3 seconds to ensure the page is fully loaded
    const cancelButton = this.page.getByRole('button', { name: 'إلغاء' });
    await this.clickIfVisible(cancelButton.first());
  }

  async waitAndClick(locator: Locator, timeout = DEFAULT_TIMEOUT) {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.click();
  }
  async waitForVisible(locator: any) {
    await expect(locator).toBeVisible({ timeout: this.defaultTimeout });
  }
  async navigateToIndividualBookings() {
    await this.waitAndClick(this.page.locator(ReservationManagementObjects.manageReservationsButton));
    await this.waitAndClick(this.page.locator(ReservationManagementObjects.individualBooking));
  }

  async searchBookingByUnitCode(unitCode: string) {
    const searchInput = this.page.getByRole(ReservationManagementObjects.bookingSearchInput.role, { name: ReservationManagementObjects.bookingSearchInput.name });
    await this.waitForVisible(searchInput);
    await searchInput.fill(unitCode);
    await this.page.waitForTimeout(3000);
  }

  async filterBookingsByStatus(status: string) {
    const statusDropdown = this.page.locator(ReservationManagementObjects.bookingFilterStatusDropdown);
    await statusDropdown.click();
    const statusOption = this.page.locator(ReservationManagementObjects.bookingFilterStatusOptions(status));
    await statusOption.click();
    await this.page.waitForTimeout(3000);
  }
  async verifyTheReservedUnitIsReflectInPartners(value: string) {
    await this.page.waitForTimeout(5000);
    this.commonMethod.verifyElementHasText(ReservationManagementObjects.reservedUniCode, value);
  }
}
