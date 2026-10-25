import { expect, Page } from '@playwright/test';
import { CommonMethods } from '@pages/util/CommonMethod';
import { RentalBehaviorObjects } from '@objects/RentalBehaviorObjects';

export class RentalBehaviorPage {
  page: Page;

  readonly commonMethod: CommonMethods;

  constructor(page: Page) {
    this.page = page;
    this.commonMethod = new CommonMethods(page);
  }
  //Click on rental behavior from side menu
  async clickOnRentalBehaviorButton() {
    await this.commonMethod.clickElement(RentalBehaviorObjects.rentalBehaviorButton);
  }
  //Click on new request button
  async clickOnNewRequestButton() {
    await this.commonMethod.clickElement(RentalBehaviorObjects.newRequestButton);
  }
  //Enter national id as Tenant
  async enterNationalId(id: string | number) {
    await this.commonMethod.fill(RentalBehaviorObjects.nationalIdInputfield, String(id));
  }
  //Click on send request button
  async clickOnSendRequestButton() {
    await this.page.waitForTimeout(2000);
    await this.commonMethod.clickElement(RentalBehaviorObjects.sendRequestButton);
  }
  //Verify the successful message
  async verifySuccessfulMessage() {
    await this.page.waitForTimeout(10000);
    await this.commonMethod.verifyElementVisible(RentalBehaviorObjects.successfulMessage);
  }
  //Click on view requests button
  async clickOnViewRequestButton() {
    await this.page.waitForTimeout(2000);
    await this.commonMethod.clickElement(RentalBehaviorObjects.viewRequestsButton);
  }
  //Take the request number - first
  async getTheRequestNumber() {
    return await this.commonMethod.getText(RentalBehaviorObjects.requestNumber);
  }
  //EJAR
  //Enter username national id as Tenant
  async enterUsernameOrNationalId(id: string | number) {
    await this.commonMethod.fill(RentalBehaviorObjects.userNameOrIdInputfield, String(id));
  }
  //Enter password
  async enterPassword(password: string | number) {
    await this.commonMethod.fill(RentalBehaviorObjects.passwordInputfield, String(password));
  }
  //Click on login button
  async clickOnLoginButton() {
    await this.commonMethod.clickElement(RentalBehaviorObjects.loginButton);
  }
  //Enter otp
  async enterOTPCode(otp: string | number) {
    await this.commonMethod.fill(RentalBehaviorObjects.otpCodeInputfield, String(otp));
  }
  //Click on verify button
  async clickOnVerifyButton() {
    await this.commonMethod.clickElement(RentalBehaviorObjects.verifyButton);
  }
  //Change the active role only when it differs from the requested role
  async selectRoleIfNeeded(roleName: string) {
    const activeRole = this.page.locator(RentalBehaviorObjects.role.xpath);
    const requestedRole = roleName.replace(/\s+/g, ' ').trim();

    await activeRole.waitFor({ state: 'visible' });
    const currentRole = (await activeRole.innerText()).replace(/\s+/g, ' ').trim();
    if (currentRole === requestedRole) {
      return;
    }

    await activeRole.click();
    const roleOptions = this.page.locator(RentalBehaviorObjects.roles.xpath);
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
    await this.commonMethod.clickElement(RentalBehaviorObjects.requestsTabButton);
  }
  //Click on view requests option
  async clickOnViewRequestsOption() {
    await this.commonMethod.clickElement(RentalBehaviorObjects.viewRequestsOption);
  }
  //Click on filter button
  async clickOnFilterButton() {
    await this.page.waitForTimeout(3000);
    await this.commonMethod.clickElement(RentalBehaviorObjects.filterButton);
  }
  //Enter request number
  async enterRequestNumber(requestNumber: string | number) {
    await this.page.waitForTimeout(3000);
    await this.commonMethod.fill(RentalBehaviorObjects.requestNumberInputfield, String(requestNumber));
  }
  //Click on kebab button
  async clickOnKebabButton() {
    await this.commonMethod.clickElement(RentalBehaviorObjects.kebabButton);
  }
  //Select view request kebab button
  async selectViewTheRequest() {
    await this.page.waitForTimeout(3000);
    await this.commonMethod.clickElement(RentalBehaviorObjects.viewRequestKebabOption);
  }
  //Check on terms and conditions
  async checkOnTermsAndConditions() {
    await this.commonMethod.clickElement(RentalBehaviorObjects.termsAndConditionCheckbox);
  }
  //Click on approve button
  async clickOnApproveButton() {
    await this.commonMethod.clickElement(RentalBehaviorObjects.approveButton);
  }
  //Click on confirm button
  async clickOnConfirmButton() {
    await this.commonMethod.clickElement(RentalBehaviorObjects.confirmButton);
  }
  //Verify the successful approval message
  async verifySuccessfulApprovalMessage() {
    await this.commonMethod.verifyElementVisible(RentalBehaviorObjects.successfulApprovalMessage);
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
  //Payment
  //Click on reports button
  async clickOnReportsButton() {
    await this.page.waitForTimeout(2000);
    await this.commonMethod.clickElement(RentalBehaviorObjects.reportsButton);
  }
  //Search request number
  async searchForRequestNumber(searchFoRequestNumber: string | number) {
    await this.page.waitForTimeout(3000);
    await this.commonMethod.fill(RentalBehaviorObjects.requestSearchInputfield, String(searchFoRequestNumber));
  }
  //Click on dots button
  async clickOnDotsButton() {
    await this.page.waitForTimeout(2000);
    await this.commonMethod.clickElement(RentalBehaviorObjects.dotsButton);
  }
  //Click on pay fees option button
  async clickOnPayFeesOptionButton() {
    await this.page.waitForTimeout(2000);
    await this.commonMethod.clickElement(RentalBehaviorObjects.payFeesOptionButton);
  }
  //Click on proceed to pay button
  async clickOnProceedToPayButton() {
    await this.page.waitForTimeout(2000);
    await this.commonMethod.clickElement(RentalBehaviorObjects.proceedToPayButton);
  }
}
