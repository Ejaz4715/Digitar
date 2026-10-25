import { expect, Page } from '@playwright/test';
import { ProfileDetailsObjects } from '@objects/ProfileDetailsObjects';

const LONG_TIMEOUT = 90_000;
const DEFAULT_TIMEOUT = 30_000;

export class ProfileDetailsPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async areProfileDetailsVisible() {
    await this.page.locator(ProfileDetailsObjects.profileDetailsContent).waitFor({ state: 'attached', timeout: LONG_TIMEOUT });
    return await this.page.locator(ProfileDetailsObjects.profileDetailsContent).isVisible();
  }

  async openProfileDetails() {
    await this.page.locator(ProfileDetailsObjects.userDropdownIcon).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.userDropdownIcon).click();

    await this.page.locator(ProfileDetailsObjects.userProfileManagementButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.userProfileManagementButton).click();
    await this.page.waitForTimeout(3000);
  }

  async clickOnEditProfile() {
    await this.page.locator(ProfileDetailsObjects.profileEditButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.profileEditButton).click();
  }

  async selectExperienceOption(option: string) {
    await this.page.locator(ProfileDetailsObjects.experienceDropdown).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.experienceDropdown).click();

    await this.page.locator(ProfileDetailsObjects.selectOptionWithText(option)).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.selectOptionWithText(option)).click();
  }

  async selectEmploymentState(employmentStatus: string) {
    await this.page.locator(ProfileDetailsObjects.employmentStatusDropdown).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.employmentStatusDropdown).click();

    await this.page.locator(ProfileDetailsObjects.selectOptionWithText(employmentStatus)).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.selectOptionWithText(employmentStatus)).click();
  }

  async enterCompanyName(companyName: string) {
    await this.page.locator(ProfileDetailsObjects.companyName).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.companyName).fill(companyName);
  }

  async enterDescription(description: string) {
    await this.page.locator(ProfileDetailsObjects.descriptionTextArea).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.descriptionTextArea).fill(description);
  }

  async selectPropertySpecifications(propertySpecifications: string[]) {
    await this.page.locator(ProfileDetailsObjects.propertySpecificationDropdown).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.propertySpecificationDropdown).click();

    for (const specification of propertySpecifications) {
      await this.clickOnCheckboxWithText(specification);
    }
    // close the open panel so it does not cover the next field
    await this.page.keyboard.press('Escape');
  }

  async selectBrokerageSpecifications(propertySpecifications: string[]) {
    await this.page.locator(ProfileDetailsObjects.brokerageSpecificationDropdown).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.brokerageSpecificationDropdown).click();

    for (const specification of propertySpecifications) {
      await this.clickOnCheckboxWithText(specification);
    }
    // close the open panel so it does not cover the next field
    await this.page.keyboard.press('Escape');
  }

  async clickOnSave() {
    await this.page.locator(ProfileDetailsObjects.saveButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.saveButton).click();
  }

  async isEditProfileSuccessMessageVisible() {
    await this.page.locator(ProfileDetailsObjects.profileEditSuccessMessage).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await this.page.locator(ProfileDetailsObjects.profileEditSuccessMessage).isVisible();
  }

  async openEditProfileImage() {
    await this.page.locator(ProfileDetailsObjects.profileImageEditIcon).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.profileImageEditIcon).click();
  }

  async uploadProfileImage(imagePath: string) {
    await this.page.locator(ProfileDetailsObjects.profileImageFileInput).waitFor({ state: 'attached', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.profileImageFileInput).setInputFiles(imagePath);
  }

  async clickOnDeleteProfileImage() {
    await this.page.locator(ProfileDetailsObjects.profileImageDeleteButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.profileImageDeleteButton).click();
  }

  async clickOnSaveProfileImage() {
    const saveButton = this.page.locator(ProfileDetailsObjects.profileImageSaveButton);
    await saveButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    // save stays disabled until the image is changed
    await expect(saveButton).toBeEnabled({ timeout: DEFAULT_TIMEOUT });
    await saveButton.click();
  }

  async clickOnGoToProfile() {
    await this.page.locator(ProfileDetailsObjects.goToProfileButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.goToProfileButton).click();
  }

  async switchToCompany(companyProfileName: string) {
    await this.page.locator(ProfileDetailsObjects.userDropdownIcon).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.userDropdownIcon).click();

    await this.page.locator(ProfileDetailsObjects.usernameItem).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.usernameItem).click();

    await this.page.locator(ProfileDetailsObjects.navigateToCompany(companyProfileName)).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.navigateToCompany(companyProfileName)).click();
  }

  async clickOnCompanyAndTeam() {
    await this.page.locator(ProfileDetailsObjects.companyAndTeamButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.companyAndTeamButton).click();
  }

  async enterCompanyWebsite(companyWebsite: string) {
    await this.page.locator(ProfileDetailsObjects.companyWebsiteField).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.companyWebsiteField).fill(companyWebsite);
  }

  async enterCompanyDescription(companyDescription: string) {
    await this.page.locator(ProfileDetailsObjects.descriptionTextArea).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects.descriptionTextArea).fill(companyDescription);
  }

  private async clickOnCheckboxWithText(checkboxLabel: string) {
    const option = this.page.locator(ProfileDetailsObjects.clickOCheckboxWithText(checkboxLabel));
    await option.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });

    // clicking an already-selected option would unselect it
    if ((await option.getAttribute('aria-selected')) !== 'true') {
      await option.click();
    }
  }
}
