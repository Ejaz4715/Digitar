import { expect, Page } from '@playwright/test';
import { DashboardObjects } from '@objects/DashboardObjects';
import { ProfileDetailsObjects } from '@objects/ProfileDetailsObjects';
import { EmployeesManagementObjects } from '@objects/EmployeesManagementObjects';
import { ProfileDetailsPage } from '@pages/ProfileDetailsPage';

const DEFAULT_TIMEOUT = 30_000;

export class EmployeesManagementPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnAddNewMember() {
    await this.page.locator(EmployeesManagementObjects.addNewMemberButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(EmployeesManagementObjects.addNewMemberButton).click();
  }

  async sortBy(option: string) {
    await this.page.locator(EmployeesManagementObjects.sortButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(EmployeesManagementObjects.sortButton).click();

    await this.page.locator(EmployeesManagementObjects.sortBy(option)).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(EmployeesManagementObjects.sortBy(option)).click();
    await this.page.locator(EmployeesManagementObjects.sortOptionsPanel).waitFor({ state: 'hidden', timeout: DEFAULT_TIMEOUT });
  }

  async getRegions(): Promise<string[]> {
    await this.page.locator(EmployeesManagementObjects.allRegionCells).first().waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    const allRegions = this.page.locator(EmployeesManagementObjects.allRegionCells);
    return (await allRegions.allInnerTexts()).map((t) => t.trim());
  }

  async getLastLoginDates(): Promise<Date[]> {
    await this.page.locator(EmployeesManagementObjects.allLastLoginDates).first().waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    const texts = await this.page.locator(EmployeesManagementObjects.allLastLoginDates).allInnerTexts();
    return texts.map((text) => {
      const [day, month, year, hour, minute] = text
        .trim()
        .split(/[.\s:]+/)
        .map(Number);
      return new Date(year, month - 1, day, hour, minute);
    });
  }

  async removeMember(name: string) {
    const row = this.page.locator(EmployeesManagementObjects.memberRowByName(name));
    await row.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await row.locator(EmployeesManagementObjects.rowActionsButton).click();

    await row.locator(EmployeesManagementObjects.rowDeactivateUserButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await row.locator(EmployeesManagementObjects.rowDeactivateUserButton).click();

    await this.page.locator(EmployeesManagementObjects.confirmDeactivateUserButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(EmployeesManagementObjects.confirmDeactivateUserButton).click();
  }

  async deactivateUser(name: string) {
    const row = this.page.locator(EmployeesManagementObjects.memberRowByName(name));
    await row.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await row.locator(EmployeesManagementObjects.rowActionsButton).click();

    await row.locator(EmployeesManagementObjects.deactivateUserButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await row.locator(EmployeesManagementObjects.deactivateUserButton).click();

    await this.page.locator(EmployeesManagementObjects.applyChangesButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(EmployeesManagementObjects.applyChangesButton).click();
  }

  async isMemberListed(name: string): Promise<boolean> {
    return await this.page.locator(EmployeesManagementObjects.memberRowByName(name)).isVisible();
  }

  async waitForMemberToBeRemoved(name: string) {
    await this.page.locator(EmployeesManagementObjects.memberRowByName(name)).waitFor({ state: 'detached', timeout: DEFAULT_TIMEOUT });
  }

  async waitForMemberToBeAdded(name: string) {
    await this.page.reload();
    await new ProfileDetailsPage(this.page).clickOnCompanyAndTeam();
    await this.page.locator(EmployeesManagementObjects.memberRowByName(name)).waitFor({
      state: 'attached',
      timeout: DEFAULT_TIMEOUT,
    });
  }

  async selectFirstUserToAdd() {
    await this.page.locator(EmployeesManagementObjects.allUsersRadioButtons).first().waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(EmployeesManagementObjects.allUsersRadioButtons).first().click();
  }

  async clickOnAddMemberToControlPanel() {
    await this.page.locator(EmployeesManagementObjects.addMemberToControlPanelButton).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(EmployeesManagementObjects.addMemberToControlPanelButton).click();
  }

  async clickOnBackButton() {
    await this.page.locator(EmployeesManagementObjects.backButton).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(EmployeesManagementObjects.backButton).click();
  }

  async selectAllRoles() {
    await this.page.locator(EmployeesManagementObjects.allRolesCheckbox).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(EmployeesManagementObjects.allRolesCheckbox).click();
  }

  async selectAllRegions() {
    await this.page.locator(EmployeesManagementObjects.allRegionsCheckbox).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(EmployeesManagementObjects.allRegionsCheckbox).click();
  }

  async isAddMemberErrorMessageVisible() {
    await this.page.locator(EmployeesManagementObjects.addUserErrorMessage).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await this.page.locator(EmployeesManagementObjects.addUserErrorMessage).isVisible();
  }

  async isAddMemberSuccessMessageVisible() {
    await this.page.locator(EmployeesManagementObjects.addMemberSuccessMessage).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    return await this.page.locator(EmployeesManagementObjects.addMemberSuccessMessage).isVisible();
  }
}
