import { expect, Page } from '@playwright/test';
import { CommonMethods } from '@pages/util/CommonMethod';
import { RentalBehaviourObjects } from '@objects/RentalBehaviourObjects';

export class RentalBehaviourPage {
  page: Page;

  readonly commonMethod: CommonMethods;

  constructor(page: Page) {
    this.page = page;
    this.commonMethod = new CommonMethods(page);
  }
  //Click on rental behaviour from side menu
  async clickOnRentalBehaviourButton() {
    this.commonMethod.clickElement(RentalBehaviourObjects.rentalBehaviourButton);
  }
  //Click on new request button
  async clickOnNewRequestButton() {
    this.commonMethod.clickElement(RentalBehaviourObjects.newRequestButton);
  }
  //Enter national id as Tenant
  async enterNationalId(id: string | number) {
    await this.commonMethod.fill(RentalBehaviourObjects.nationalIdInputfield, String(id));
  }
  //Click on send request button
  async clickOnSendRequestButton() {
    await this.page.waitForTimeout(2000);
    this.commonMethod.clickElement(RentalBehaviourObjects.sendRequestButton);
  }
  //Verify the successfull message
  async verifySuccessfullMessage() {
    await this.page.waitForTimeout(10000);
    this.commonMethod.verifyElementVisible(RentalBehaviourObjects.succesfulMessage);
  }
  //Click on view requests button
  async clickOnViewRequestButton() {
    await this.page.waitForTimeout(2000);
    this.commonMethod.clickElement(RentalBehaviourObjects.viewRequestsButton);
  }
  //Take the request number - first
  async getTheRequestNumber() {
    return this.commonMethod.getText(RentalBehaviourObjects.requestNumber);
  }
  //EJAR
  //Enter username national id as Tenant
  async enterUsernameOrNationalId(id: string | number) {
    await this.commonMethod.fill(RentalBehaviourObjects.userNameOrIdInputfield, String(id));
  }
  //Enter passowrd
  async enterPassword(password: string | number) {
    await this.commonMethod.fill(RentalBehaviourObjects.passwordInputfield, String(password));
  }
  //Click on login button
  async clickOnLoginButton() {
    this.commonMethod.clickElement(RentalBehaviourObjects.loginButton);
  }
  //Enter otp
  async enterOTPCode(otp: string | number) {
    await this.commonMethod.fill(RentalBehaviourObjects.otpCodeInputfield, String(otp));
  }
  //Click on verify button
  async clickOnVerifyButton() {
    await this.commonMethod.clickElement(RentalBehaviourObjects.verifyButton);
  }
  //Change the active role only when it differs from the requested role
  async selectRoleIfNeeded(roleName: string) {
    const activeRole = this.page.locator(RentalBehaviourObjects.role.xpath);
    const requestedRole = roleName.replace(/\s+/g, ' ').trim();

    await activeRole.waitFor({ state: 'visible' });
    const currentRole = (await activeRole.innerText()).replace(/\s+/g, ' ').trim();
    if (currentRole === requestedRole) {
      return;
    }

    await activeRole.click();
    const roleOptions = this.page.locator(RentalBehaviourObjects.roles.xpath);
    await roleOptions.first().waitFor({ state: 'visible' });

    const optionCount = await roleOptions.count();
    for (let index = 0; index < optionCount; index++) {
      const option = roleOptions.nth(index);
      const optionText = (await option.innerText()).replace(/\s+/g, ' ').trim();
      if (optionText === requestedRole) {
        await option.click();
        await expect(activeRole).toHaveText(requestedRole);
        return;
      }
    }

    throw new Error(`Role "${roleName}" was not found in the role menu.`);
  }
  //Click on requests tab button
  async clickOnTheRequestsTabButton() {
    await this.commonMethod.clickElement(RentalBehaviourObjects.requestsTabButton);
  }
  //Click on view requests option
  async clickOnViewRequestsOption() {
    await this.commonMethod.clickElement(RentalBehaviourObjects.viewRequestsOption);
  }
  //Click on filter button
  async clickOnFilterButton() {
    await this.page.waitForTimeout(3000);
    this.commonMethod.clickElement(RentalBehaviourObjects.filterButton);
  }
  //Enter request number
  async enterRequestNumber(requestNumber: string | number) {
    await this.commonMethod.fill(RentalBehaviourObjects.requestNumberInputfield, String(requestNumber));
  }
  //Click on kebab button
  async clickOnKebabutton() {
    this.commonMethod.clickElement(RentalBehaviourObjects.kebabButton);
  }
  //Select view requset kebab button
  async selectViewTheRequest() {
    this.commonMethod.clickElement(RentalBehaviourObjects.viewRequesKebabOption);
  }
  //Check on terms and conditions
  async checkOnTermsAndConditions() {
    this.commonMethod.clickElement(RentalBehaviourObjects.termsAndConditionCheckbox);
  }
  //Click on approve button
  async clickOnApproveButton() {
    this.commonMethod.clickElement(RentalBehaviourObjects.appproveButton);
  }
  //Click on confirm button
  async clickOnConfirmButton() {
    this.commonMethod.clickElement(RentalBehaviourObjects.confirmButton);
  }
  //Verify the successfull approval message
  async verifySuccessfullApprovalMessage() {
    this.commonMethod.verifyElementVisible(RentalBehaviourObjects.successfulApprovalMessage);
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
