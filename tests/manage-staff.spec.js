'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const test_1 = require('@playwright/test');
const web_app_1 = require('@base/web-app');
const log_steps_1 = require('@helpers/log-steps');
const data_helper_1 = require('@helpers/data-helper');
const LoginObjects_1 = require('@objects/LoginObjects');
const SERVICE = 'manage-staff';
const readServiceData = () => data_helper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => data_helper_1.DataHelper.readData().environments;
test_1.test.describe('Manage Staff', () => {
  let app;
  const environments = readEnvironments();
  const data = readServiceData();
  test_1.test.beforeEach(async ({ page }) => {
    app = new web_app_1.WebApp(page);
    await app.loginPage.gotoHomePage(environments.broker);
    await app.loginPage.clickLoginButtonFromMain();
    await app.loginPage.acceptCookies();
    await app.loginPage.enterUserId(data.userId);
    await app.loginPage.clickOnContinue();
    await app.loginPage.clickContinueButton();
    await app.loginPage.waitForNafathPromptToDisappear();
    await app.homePage.clickOnLanguageSwitcher();
  });
  (0, test_1.test)(
    'TC-01 Verify the user add a team member',
    {
      annotation: [
        {
          product: 'Digitar',
          type: 'non-critical',
        },
      ],
    },
    async () => {
      await (0, log_steps_1.logStep)('Step 01: Switch the language && dismiss popups');
      await app.homePage.clickOnLanguageSwitcher();
      await app.homePage.closeCloseSurveyModel();
      await app.homePage.closeRecommendationModel();
      await app.commonMethods.clickIfVisible(LoginObjects_1.LoginObjects.doneButton);
      await (0, log_steps_1.logStep)('Step 02: Switch to company profile details');
      await app.profileDetailsPage.switchToCompany(data.companyProfileName);
      await (0, log_steps_1.logStep)('Step 04: Open profile details');
      await app.profileDetailsPage.openProfileDetails();
      await (0, log_steps_1.logStep)('Step 05: Open company and team page');
      await app.profileDetailsPage.clickOnCompanyAndTeam();
      await (0, log_steps_1.logStep)('Step 06: Add new member');
      await app.employeesManagementPage.clickOnAddNewMember();
      await (0, log_steps_1.logStep)('Step 07: Select first user to add');
      await app.employeesManagementPage.selectFirstUserToAdd();
      await (0, log_steps_1.logStep)('Step 08: Select all roles and regions');
      await app.employeesManagementPage.selectAllRoles();
      await app.employeesManagementPage.selectAllRegions();
      await (0, log_steps_1.logStep)('Step 08: Confirm adding the user');
      await app.employeesManagementPage.clickOnAddMemberToControlPanel();
      await (0, log_steps_1.logStep)('Step 08: User added successfully');
      (0, test_1.expect)(await app.employeesManagementPage.isAddMemberSuccessMessageVisible()).toBe(true);
    }
  );
  (0, test_1.test)(
    'TC-02 Verify the user can remove a team member',
    {
      annotation: [
        {
          product: 'Digitar',
          type: 'non-critical',
        },
      ],
    },
    async () => {
      await (0, log_steps_1.logStep)('Step 01: Switch the language && dismiss popups');
      await app.homePage.clickOnLanguageSwitcher();
      await app.homePage.closeCloseSurveyModel();
      await app.homePage.closeRecommendationModel();
      await app.commonMethods.clickIfVisible(LoginObjects_1.LoginObjects.doneButton);
      await (0, log_steps_1.logStep)('Step 02: Switch to company profile details');
      await app.profileDetailsPage.switchToCompany(data.companyProfileName);
      await (0, log_steps_1.logStep)('Step 03: Open profile details');
      await app.profileDetailsPage.openProfileDetails();
      await (0, log_steps_1.logStep)('Step 04: Open company and team page');
      await app.profileDetailsPage.clickOnCompanyAndTeam();
      await (0, log_steps_1.logStep)('Step 05: Remove the team member');
      await app.employeesManagementPage.waitForMemberToBeAdded(data.memberToRemove);
      (0, test_1.expect)(await app.employeesManagementPage.isMemberListed(data.memberToRemove)).toBe(true);
      await app.employeesManagementPage.deactivateUser(data.memberToRemove);
      await app.employeesManagementPage.removeMember(data.memberToRemove);
      await (0, log_steps_1.logStep)('Step 06: Member should no longer be listed');
      await app.employeesManagementPage.waitForMemberToBeRemoved(data.memberToRemove);
      (0, test_1.expect)(await app.employeesManagementPage.isMemberListed(data.memberToRemove)).toBe(false);
    }
  );
  (0, test_1.test)(
    'TC-03 Verify the user can sort using region and last login',
    {
      annotation: [
        {
          product: 'Digitar',
          type: 'non-critical',
        },
      ],
    },
    async () => {
      await (0, log_steps_1.logStep)('Step 01: Switch the language && dismiss popups');
      await app.homePage.clickOnLanguageSwitcher();
      await app.homePage.closeCloseSurveyModel();
      await app.homePage.closeRecommendationModel();
      await app.commonMethods.clickIfVisible(LoginObjects_1.LoginObjects.doneButton);
      await (0, log_steps_1.logStep)('Step 02: Switch to company profile details');
      await app.profileDetailsPage.switchToCompany(data.companyProfileName);
      await (0, log_steps_1.logStep)('Step 03: Open profile details');
      await app.profileDetailsPage.openProfileDetails();
      await (0, log_steps_1.logStep)('Step 04: Open company and team page');
      await app.profileDetailsPage.clickOnCompanyAndTeam();
      await (0, log_steps_1.logStep)('Step 05: Sort by region');
      await app.employeesManagementPage.sortBy(data.sortOptions.region);
      // members without a region show "-", they are not part of the sort check
      const regions = (await app.employeesManagementPage.getRegions()).filter((region) => region !== '' && region !== '-');
      const expectedRegions = [...regions].sort((a, b) => b.localeCompare(a, 'ar'));
      (0, test_1.expect)(regions).toEqual(expectedRegions);
      await (0, log_steps_1.logStep)('Step 06: Sort by last login');
      await app.employeesManagementPage.sortBy(data.sortOptions.lastLogin);
      const lastLogins = (await app.employeesManagementPage.getLastLoginDates()).map((date) => date.getTime());
      (0, test_1.expect)(lastLogins).toEqual([...lastLogins].sort((a, b) => b - a));
    }
  );
  (0, test_1.test)(
    'TC-04 Verify the user can not add team member without roles and regions',
    {
      annotation: [
        {
          product: 'Digitar',
          type: 'non-critical',
        },
      ],
    },
    async () => {
      await (0, log_steps_1.logStep)('Step 01: Switch the language && dismiss popups');
      await app.homePage.clickOnLanguageSwitcher();
      await app.homePage.closeCloseSurveyModel();
      await app.homePage.closeRecommendationModel();
      await app.commonMethods.clickIfVisible(LoginObjects_1.LoginObjects.doneButton);
      await (0, log_steps_1.logStep)('Step 02: Switch to company profile details');
      await app.profileDetailsPage.switchToCompany(data.companyProfileName);
      await (0, log_steps_1.logStep)('Step 03: Open profile details');
      await app.profileDetailsPage.openProfileDetails();
      await (0, log_steps_1.logStep)('Step 04: Open company and team page');
      await app.profileDetailsPage.clickOnCompanyAndTeam();
      await (0, log_steps_1.logStep)('Step 05: Add new team member');
      await app.employeesManagementPage.clickOnAddNewMember();
      await app.employeesManagementPage.selectFirstUserToAdd();
      await app.employeesManagementPage.clickOnAddMemberToControlPanel();
      await (0, log_steps_1.logStep)('Step 05: Error message should be without adding user regions and roles');
      (0, test_1.expect)(await app.employeesManagementPage.isAddMemberErrorMessageVisible()).toBe(true);
    }
  );
  (0, test_1.test)(
    'TC-05 Verify the user can cancel adding a new team member',
    {
      annotation: [
        {
          product: 'Digitar',
          type: 'non-critical',
        },
      ],
    },
    async () => {
      await (0, log_steps_1.logStep)('Step 01: Switch the language && dismiss popups');
      await app.homePage.clickOnLanguageSwitcher();
      await app.homePage.closeCloseSurveyModel();
      await app.homePage.closeRecommendationModel();
      await app.commonMethods.clickIfVisible(LoginObjects_1.LoginObjects.doneButton);
      await (0, log_steps_1.logStep)('Step 02: Switch to company profile details');
      await app.profileDetailsPage.switchToCompany(data.companyProfileName);
      await (0, log_steps_1.logStep)('Step 04: Open profile details');
      await app.profileDetailsPage.openProfileDetails();
      await (0, log_steps_1.logStep)('Step 05: Open company and team page');
      await app.profileDetailsPage.clickOnCompanyAndTeam();
      await (0, log_steps_1.logStep)('Step 06: Add new member');
      await app.employeesManagementPage.clickOnAddNewMember();
      await (0, log_steps_1.logStep)('Step 07: Select first user to add');
      await app.employeesManagementPage.selectFirstUserToAdd();
      await (0, log_steps_1.logStep)('Step 07: Click on back button');
      await app.employeesManagementPage.clickOnBackButton();
      await (0, log_steps_1.logStep)('Step 08: User is not added');
      (0, test_1.expect)(await app.employeesManagementPage.isMemberListed(data.memberToRemove)).toBe(false);
    }
  );
});
