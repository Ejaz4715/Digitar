import { expect, test } from '@playwright/test';
import { WebApp } from '@base/web-app';
import { logStep } from '@helpers/log-steps';
import { DataHelper } from '@helpers/data-helper';
import { LoginObjects } from '@objects/LoginObjects';

const SERVICE = 'manage-staff';

const readServiceData = () => DataHelper.readData().services[SERVICE];

const readEnvironments = () => DataHelper.readData().environments;

test.describe('Manage Staff', () => {
  let app: WebApp;
  const environments = readEnvironments();
  const data = readServiceData();

  test.beforeEach(async ({ page }) => {
    app = new WebApp(page);
    await app.loginPage.gotoHomePage(environments.broker);
    await app.loginPage.clickLoginButtonFromMain();
    await app.loginPage.acceptCookies();
    await app.loginPage.enterUserId(data.userId);
    await app.loginPage.clickOnContinue();
    await app.loginPage.clickContinueButton();
    await app.loginPage.waitForNafathPromptToDisappear();
    await app.homePage.clickOnLanguageSwitcher();
  });

  test(
    'TC-01 Verify the user add a team member',
    {
      annotation: [
        {
          product: 'Digitar',
          type: 'non-critical',
        } as any,
      ],
    },
    async () => {
      await logStep('Step 01: Switch the language && dismiss popups');
      await app.homePage.clickOnLanguageSwitcher();
      await app.homePage.closeCloseSurveyModel();
      await app.homePage.closeRecommendationModel();
      await app.commonMethods.clickIfVisible(LoginObjects.doneButton);

      await logStep('Step 02: Switch to company profile details');
      await app.profileDetailsPage.switchToCompany(data.companyProfileName);

      await logStep('Step 04: Open profile details');
      await app.profileDetailsPage.openProfileDetails();

      await logStep('Step 05: Open company and team page');
      await app.profileDetailsPage.clickOnCompanyAndTeam();

      await logStep('Step 06: Add new member');
      await app.employeesManagementPage.clickOnAddNewMember();

      await logStep('Step 07: Select first user to add');
      await app.employeesManagementPage.selectFirstUserToAdd();

      await logStep('Step 08: Select all roles and regions');
      await app.employeesManagementPage.selectAllRoles();
      await app.employeesManagementPage.selectAllRegions();

      await logStep('Step 08: Confirm adding the user');
      await app.employeesManagementPage.clickOnAddMemberToControlPanel();

      await logStep('Step 08: User added successfully');
      expect(await app.employeesManagementPage.isAddMemberSuccessMessageVisible()).toBe(true);
    }
  );

  test(
    'TC-02 Verify the user can remove a team member',
    {
      annotation: [
        {
          product: 'Digitar',
          type: 'non-critical',
        } as any,
      ],
    },
    async () => {
      await logStep('Step 01: Switch the language && dismiss popups');
      await app.homePage.clickOnLanguageSwitcher();
      await app.homePage.closeCloseSurveyModel();
      await app.homePage.closeRecommendationModel();
      await app.commonMethods.clickIfVisible(LoginObjects.doneButton);

      await logStep('Step 02: Switch to company profile details');
      await app.profileDetailsPage.switchToCompany(data.companyProfileName);

      await logStep('Step 03: Open profile details');
      await app.profileDetailsPage.openProfileDetails();

      await logStep('Step 04: Open company and team page');
      await app.profileDetailsPage.clickOnCompanyAndTeam();

      await logStep('Step 05: Remove the team member');
      await app.employeesManagementPage.waitForMemberToBeAdded(data.memberToRemove);
      expect(await app.employeesManagementPage.isMemberListed(data.memberToRemove)).toBe(true);

      await app.employeesManagementPage.deactivateUser(data.memberToRemove);
      await app.employeesManagementPage.removeMember(data.memberToRemove);

      await logStep('Step 06: Member should no longer be listed');
      await app.employeesManagementPage.waitForMemberToBeRemoved(data.memberToRemove);
      expect(await app.employeesManagementPage.isMemberListed(data.memberToRemove)).toBe(false);
    }
  );

  test(
    'TC-03 Verify the user can sort using region and last login',
    {
      annotation: [
        {
          product: 'Digitar',
          type: 'non-critical',
        } as any,
      ],
    },
    async () => {
      await logStep('Step 01: Switch the language && dismiss popups');
      await app.homePage.clickOnLanguageSwitcher();
      await app.homePage.closeCloseSurveyModel();
      await app.homePage.closeRecommendationModel();
      await app.commonMethods.clickIfVisible(LoginObjects.doneButton);

      await logStep('Step 02: Switch to company profile details');
      await app.profileDetailsPage.switchToCompany(data.companyProfileName);

      await logStep('Step 03: Open profile details');
      await app.profileDetailsPage.openProfileDetails();

      await logStep('Step 04: Open company and team page');
      await app.profileDetailsPage.clickOnCompanyAndTeam();

      await logStep('Step 05: Sort by region');
      await app.employeesManagementPage.sortBy(data.sortOptions.region);
      // members without a region show "-", they are not part of the sort check
      const regions = (await app.employeesManagementPage.getRegions()).filter((region) => region !== '' && region !== '-');

      const expectedRegions = [...regions].sort((a, b) => b.localeCompare(a, 'ar'));
      expect(regions).toEqual(expectedRegions);

      await logStep('Step 06: Sort by last login');
      await app.employeesManagementPage.sortBy(data.sortOptions.lastLogin);
      const lastLogins = (await app.employeesManagementPage.getLastLoginDates()).map((date) => date.getTime());
      expect(lastLogins).toEqual([...lastLogins].sort((a, b) => b - a));
    }
  );

  test(
    'TC-04 Verify the user can not add team member without roles and regions',
    {
      annotation: [
        {
          product: 'Digitar',
          type: 'non-critical',
        } as any,
      ],
    },
    async () => {
      await logStep('Step 01: Switch the language && dismiss popups');
      await app.homePage.clickOnLanguageSwitcher();
      await app.homePage.closeCloseSurveyModel();
      await app.homePage.closeRecommendationModel();
      await app.commonMethods.clickIfVisible(LoginObjects.doneButton);

      await logStep('Step 02: Switch to company profile details');
      await app.profileDetailsPage.switchToCompany(data.companyProfileName);

      await logStep('Step 03: Open profile details');
      await app.profileDetailsPage.openProfileDetails();

      await logStep('Step 04: Open company and team page');
      await app.profileDetailsPage.clickOnCompanyAndTeam();

      await logStep('Step 05: Add new team member');
      await app.employeesManagementPage.clickOnAddNewMember();

      await app.employeesManagementPage.selectFirstUserToAdd();

      await app.employeesManagementPage.clickOnAddMemberToControlPanel();

      await logStep('Step 05: Error message should be without adding user regions and roles');
      expect(await app.employeesManagementPage.isAddMemberErrorMessageVisible()).toBe(true);
    }
  );

  test(
    'TC-05 Verify the user can cancel adding a new team member',
    {
      annotation: [
        {
          product: 'Digitar',
          type: 'non-critical',
        } as any,
      ],
    },
    async () => {
      await logStep('Step 01: Switch the language && dismiss popups');
      await app.homePage.clickOnLanguageSwitcher();
      await app.homePage.closeCloseSurveyModel();
      await app.homePage.closeRecommendationModel();
      await app.commonMethods.clickIfVisible(LoginObjects.doneButton);

      await logStep('Step 02: Switch to company profile details');
      await app.profileDetailsPage.switchToCompany(data.companyProfileName);

      await logStep('Step 04: Open profile details');
      await app.profileDetailsPage.openProfileDetails();

      await logStep('Step 05: Open company and team page');
      await app.profileDetailsPage.clickOnCompanyAndTeam();

      await logStep('Step 06: Add new member');
      await app.employeesManagementPage.clickOnAddNewMember();

      await logStep('Step 07: Select first user to add');
      await app.employeesManagementPage.selectFirstUserToAdd();

      await logStep('Step 07: Click on back button');
      await app.employeesManagementPage.clickOnBackButton();

      await logStep('Step 08: User is not added');
      expect(await app.employeesManagementPage.isMemberListed(data.memberToRemove)).toBe(false);
    }
  );
});
