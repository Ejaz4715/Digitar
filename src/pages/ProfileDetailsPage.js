'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProfileDetailsPage = void 0;
const test_1 = require('@playwright/test');
const ProfileDetailsObjects_1 = require('@objects/ProfileDetailsObjects');
const LONG_TIMEOUT = 90_000;
const DEFAULT_TIMEOUT = 30_000;
class ProfileDetailsPage {
  constructor(page) {
    this.page = page;
  }
  async areProfileDetailsVisible() {
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.profileDetailsContent).waitFor({ state: 'attached', timeout: LONG_TIMEOUT });
    return await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.profileDetailsContent).isVisible();
  }
  async openProfileDetails() {
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.userDropdownIcon).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.userDropdownIcon).click();
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.userProfileManagementButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.userProfileManagementButton).click();
  }
  async clickOnEditProfile() {
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.profileEditButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.profileEditButton).click();
  }
  async selectExperienceOption(option) {
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.experienceDropdown).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.experienceDropdown).click();
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.selectOptionWithText(option)).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.selectOptionWithText(option)).click();
  }
  async selectEmploymentState(employmentStatus) {
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.employmentStatusDropdown).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.employmentStatusDropdown).click();
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.selectOptionWithText(employmentStatus)).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.selectOptionWithText(employmentStatus)).click();
  }
  async enterCompanyName(companyName) {
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.companyName).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.companyName).fill(companyName);
  }
  async enterDescription(description) {
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.descriptionTextArea).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.descriptionTextArea).fill(description);
  }
  async selectPropertySpecifications(propertySpecifications) {
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.propertySpecificationDropdown).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.propertySpecificationDropdown).click();
    for (const specification of propertySpecifications) {
      await this.clickOnCheckboxWithText(specification);
    }
    // close the open panel so it does not cover the next field
    await this.page.keyboard.press('Escape');
  }
  async selectBrokerageSpecifications(propertySpecifications) {
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.brokerageSpecificationDropdown).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.brokerageSpecificationDropdown).click();
    for (const specification of propertySpecifications) {
      await this.clickOnCheckboxWithText(specification);
    }
    // close the open panel so it does not cover the next field
    await this.page.keyboard.press('Escape');
  }
  async clickOnSave() {
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.saveButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.saveButton).click();
  }
  async isEditProfileSuccessMessageVisible() {
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.profileEditSuccessMessage).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.profileEditSuccessMessage).isVisible();
  }
  async openEditProfileImage() {
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.profileImageEditIcon).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.profileImageEditIcon).click();
  }
  async uploadProfileImage(imagePath) {
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.profileImageFileInput).waitFor({ state: 'attached', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.profileImageFileInput).setInputFiles(imagePath);
  }
  async clickOnDeleteProfileImage() {
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.profileImageDeleteButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.profileImageDeleteButton).click();
  }
  async clickOnSaveProfileImage() {
    const saveButton = this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.profileImageSaveButton);
    await saveButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    // save stays disabled until the image is changed
    await (0, test_1.expect)(saveButton).toBeEnabled({ timeout: DEFAULT_TIMEOUT });
    await saveButton.click();
  }
  async clickOnGoToProfile() {
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.goToProfileButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.goToProfileButton).click();
  }
  async switchToCompany(companyProfileName) {
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.userDropdownIcon).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.userDropdownIcon).click();
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.usernameItem).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.usernameItem).click();
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.navigateToCompany(companyProfileName)).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.navigateToCompany(companyProfileName)).click();
  }
  async clickOnCompanyAndTeam() {
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.companyAndTeamButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.companyAndTeamButton).click();
  }
  async enterCompanyWebsite(companyWebsite) {
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.companyWebsiteField).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.companyWebsiteField).fill(companyWebsite);
  }
  async enterCompanyDescription(companyDescription) {
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.descriptionTextArea).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.descriptionTextArea).fill(companyDescription);
  }
  async clickOnCheckboxWithText(checkboxLabel) {
    const option = this.page.locator(ProfileDetailsObjects_1.ProfileDetailsObjects.clickOCheckboxWithText(checkboxLabel));
    await option.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    // clicking an already-selected option would unselect it
    if ((await option.getAttribute('aria-selected')) !== 'true') {
      await option.click();
    }
  }
}
exports.ProfileDetailsPage = ProfileDetailsPage;
