'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.RentalBehaviourPage = void 0;
const test_1 = require('@playwright/test');
const CommonMethod_1 = require('@pages/util/CommonMethod');
const RentalBehaviourObjects_1 = require('@objects/RentalBehaviourObjects');
class RentalBehaviourPage {
  constructor(page) {
    this.page = page;
    this.commonMethod = new CommonMethod_1.CommonMethods(page);
  }
  //Click on rental behaviour from side menu
  async clickOnRentalBehaviourButton() {
    this.commonMethod.clickElement(RentalBehaviourObjects_1.RentalBehaviourObjects.rentalBehaviourButton);
  }
  //Click on new request button
  async clickOnNewRequestButton() {
    this.commonMethod.clickElement(RentalBehaviourObjects_1.RentalBehaviourObjects.newRequestButton);
  }
  //Enter national id as Tenant
  async enterNationalId(id) {
    await this.commonMethod.fill(RentalBehaviourObjects_1.RentalBehaviourObjects.nationalIdInputfield, String(id));
  }
  //Click on send request button
  async clickOnSendRequestButton() {
    await this.page.waitForTimeout(2000);
    this.commonMethod.clickElement(RentalBehaviourObjects_1.RentalBehaviourObjects.sendRequestButton);
  }
  //Verify the successfull message
  async verifySuccessfullMessage() {
    await this.page.waitForTimeout(10000);
    this.commonMethod.verifyElementVisible(RentalBehaviourObjects_1.RentalBehaviourObjects.succesfulMessage);
  }
  //Click on view requests button
  async clickOnViewRequestButton() {
    await this.page.waitForTimeout(2000);
    this.commonMethod.clickElement(RentalBehaviourObjects_1.RentalBehaviourObjects.viewRequestsButton);
  }
  //Take the request number - first
  async getTheRequestNumber() {
    return this.commonMethod.getText(RentalBehaviourObjects_1.RentalBehaviourObjects.requestNumber);
  }
  //EJAR
  //Enter username national id as Tenant
  async enterUsernameOrNationalId(id) {
    await this.commonMethod.fill(RentalBehaviourObjects_1.RentalBehaviourObjects.userNameOrIdInputfield, String(id));
  }
  //Enter passowrd
  async enterPassword(password) {
    await this.commonMethod.fill(RentalBehaviourObjects_1.RentalBehaviourObjects.passwordInputfield, String(password));
  }
  //Click on login button
  async clickOnLoginButton() {
    this.commonMethod.clickElement(RentalBehaviourObjects_1.RentalBehaviourObjects.loginButton);
  }
  //Enter otp
  async enterOTPCode(otp) {
    await this.commonMethod.fill(RentalBehaviourObjects_1.RentalBehaviourObjects.otpCodeInputfield, String(otp));
  }
  //Click on verify button
  async clickOnVerifyButton() {
    await this.commonMethod.clickElement(RentalBehaviourObjects_1.RentalBehaviourObjects.verifyButton);
  }
  //Change the active role only when it differs from the requested role
  async selectRoleIfNeeded(roleName) {
    const activeRole = this.page.locator(RentalBehaviourObjects_1.RentalBehaviourObjects.role.xpath);
    const requestedRole = roleName.replace(/\s+/g, ' ').trim();
    await activeRole.waitFor({ state: 'visible' });
    const currentRole = (await activeRole.innerText()).replace(/\s+/g, ' ').trim();
    if (currentRole === requestedRole) {
      return;
    }
    await activeRole.click();
    const roleOptions = this.page.locator(RentalBehaviourObjects_1.RentalBehaviourObjects.roles.xpath);
    await roleOptions.first().waitFor({ state: 'visible' });
    const optionCount = await roleOptions.count();
    for (let index = 0; index < optionCount; index++) {
      const option = roleOptions.nth(index);
      const optionText = (await option.innerText()).replace(/\s+/g, ' ').trim();
      if (optionText === requestedRole) {
        await option.click();
        await (0, test_1.expect)(activeRole).toHaveText(requestedRole);
        return;
      }
    }
    throw new Error(`Role "${roleName}" was not found in the role menu.`);
  }
  //Click on requests tab button
  async clickOnTheRequestsTabButton() {
    await this.commonMethod.clickElement(RentalBehaviourObjects_1.RentalBehaviourObjects.requestsTabButton);
  }
  //Click on view requests option
  async clickOnViewRequestsOption() {
    await this.commonMethod.clickElement(RentalBehaviourObjects_1.RentalBehaviourObjects.viewRequestsOption);
  }
  //Click on filter button
  async clickOnFilterButton() {
    await this.page.waitForTimeout(3000);
    this.commonMethod.clickElement(RentalBehaviourObjects_1.RentalBehaviourObjects.filterButton);
  }
  //Enter request number
  async enterRequestNumber(requestNumber) {
    await this.commonMethod.fill(RentalBehaviourObjects_1.RentalBehaviourObjects.requestNumberInputfield, String(requestNumber));
  }
  //Click on kebab button
  async clickOnKebabutton() {
    this.commonMethod.clickElement(RentalBehaviourObjects_1.RentalBehaviourObjects.kebabButton);
  }
  //Select view requset kebab button
  async selectViewTheRequest() {
    this.commonMethod.clickElement(RentalBehaviourObjects_1.RentalBehaviourObjects.viewRequesKebabOption);
  }
  //Check on terms and conditions
  async checkOnTermsAndConditions() {
    this.commonMethod.clickElement(RentalBehaviourObjects_1.RentalBehaviourObjects.termsAndConditionCheckbox);
  }
  //Click on approve button
  async clickOnApproveButton() {
    this.commonMethod.clickElement(RentalBehaviourObjects_1.RentalBehaviourObjects.appproveButton);
  }
  //Click on confirm button
  async clickOnConfirmButton() {
    this.commonMethod.clickElement(RentalBehaviourObjects_1.RentalBehaviourObjects.confirmButton);
  }
  //Verify the successfull approval message
  async verifySuccessfullApprovalMessage() {
    this.commonMethod.verifyElementVisible(RentalBehaviourObjects_1.RentalBehaviourObjects.successfulApprovalMessage);
  }
  async handlePopupCloseButtons() {
    await this.page.locator('.loading-container').waitFor({ state: 'hidden' });
    const alert = this.page.locator('app-alert-modal-v2');
    try {
      await alert.waitFor({ state: 'visible', timeout: 10000 });
    } catch (error) {
      if (error instanceof Error && error.name === 'TimeoutError') {
        return;
      }
      throw error;
    }
    await alert.locator('button.close-button').click({ force: true });
    await alert.waitFor({ state: 'hidden' });
  }
}
exports.RentalBehaviourPage = RentalBehaviourPage;
