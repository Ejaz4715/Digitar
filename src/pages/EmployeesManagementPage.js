'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.EmployeesManagementPage = void 0;
const EmployeesManagementObjects_1 = require('@objects/EmployeesManagementObjects');
const ProfileDetailsPage_1 = require('@pages/ProfileDetailsPage');
const DEFAULT_TIMEOUT = 30_000;
class EmployeesManagementPage {
  constructor(page) {
    this.page = page;
  }
  async clickOnAddNewMember() {
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.addNewMemberButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.addNewMemberButton).click();
  }
  async sortBy(option) {
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.sortButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.sortButton).click();
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.sortBy(option)).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.sortBy(option)).click();
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.sortOptionsPanel).waitFor({ state: 'hidden', timeout: DEFAULT_TIMEOUT });
  }
  async getRegions() {
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.allRegionCells).first().waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    const allRegions = this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.allRegionCells);
    return (await allRegions.allInnerTexts()).map((t) => t.trim());
  }
  async getLastLoginDates() {
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.allLastLoginDates).first().waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    const texts = await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.allLastLoginDates).allInnerTexts();
    return texts.map((text) => {
      const [day, month, year, hour, minute] = text
        .trim()
        .split(/[.\s:]+/)
        .map(Number);
      return new Date(year, month - 1, day, hour, minute);
    });
  }
  async removeMember(name) {
    const row = this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.memberRowByName(name));
    await row.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await row.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.rowActionsButton).click();
    await row.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.rowDeactivateUserButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await row.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.rowDeactivateUserButton).click();
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.confirmDeactivateUserButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.confirmDeactivateUserButton).click();
  }
  async deactivateUser(name) {
    const row = this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.memberRowByName(name));
    await row.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await row.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.rowActionsButton).click();
    await row.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.deactivateUserButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await row.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.deactivateUserButton).click();
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.applyChangesButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.applyChangesButton).click();
  }
  async isMemberListed(name) {
    return await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.memberRowByName(name)).isVisible();
  }
  async waitForMemberToBeRemoved(name) {
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.memberRowByName(name)).waitFor({ state: 'detached', timeout: DEFAULT_TIMEOUT });
  }
  async waitForMemberToBeAdded(name) {
    await this.page.reload();
    await new ProfileDetailsPage_1.ProfileDetailsPage(this.page).clickOnCompanyAndTeam();
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.memberRowByName(name)).waitFor({
      state: 'attached',
      timeout: DEFAULT_TIMEOUT,
    });
  }
  async selectFirstUserToAdd() {
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.allUsersRadioButtons).first().waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.allUsersRadioButtons).first().click();
  }
  async clickOnAddMemberToControlPanel() {
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.addMemberToControlPanelButton).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.addMemberToControlPanelButton).click();
  }
  async clickOnBackButton() {
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.backButton).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.backButton).click();
  }
  async selectAllRoles() {
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.allRolesCheckbox).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.allRolesCheckbox).click();
  }
  async selectAllRegions() {
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.allRegionsCheckbox).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.allRegionsCheckbox).click();
  }
  async isAddMemberErrorMessageVisible() {
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.addUserErrorMessage).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.addUserErrorMessage).isVisible();
  }
  async isAddMemberSuccessMessageVisible() {
    await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.addMemberSuccessMessage).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    return await this.page.locator(EmployeesManagementObjects_1.EmployeesManagementObjects.addMemberSuccessMessage).isVisible();
  }
}
exports.EmployeesManagementPage = EmployeesManagementPage;
