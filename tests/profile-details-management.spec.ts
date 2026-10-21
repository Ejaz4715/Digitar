import { expect, test } from '@playwright/test';
import { WebApp } from '@base/web-app';
import { logStep } from '@helpers/log-steps';
import { DataHelper } from '@helpers/data-helper';
import { LoginObjects } from '@objects/LoginObjects';

const SERVICE = 'profile-management';

const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;

test.describe('Profile Details Management', () => {
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
    'TC-01 verify the navigate to his profile',
    {
      annotation: [
        {
          product: 'Digitar',
          type: 'non-critical',
        } as any,
      ],
    },
    async () => {
      await logStep('Step 01: Switch the language && dismiss popups', async () => {
        await app.homePage.clickOnLanguageSwitcher();
        await app.homePage.closeCloseSurveyModel();
        await app.homePage.closeRecommendationModel();
      });

      await logStep('Step 02: check user profile is visible');
      await app.profileDetailsPage.openProfileDetails();

      //verify the user able to view his information in overview
      expect(app.profileDetailsPage.areProfileDetailsVisible()).toBe(true);
    }
  );
  test(
    'TC-02 Verify the user can edit the profile details',
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

      await logStep('Step 02: Open profile details');
      await app.profileDetailsPage.openProfileDetails();

      await app.profileDetailsPage.clickOnEditProfile();

      await app.profileDetailsPage.selectExperienceOption(data.experience);
      await app.profileDetailsPage.selectEmploymentState(data.employmentStatus);
      await app.profileDetailsPage.enterCompanyName(data.companyName);
      await app.profileDetailsPage.enterDescription(data.description);
      await app.profileDetailsPage.selectPropertySpecifications(data.propertySpecifications);
      await app.profileDetailsPage.selectBrokerageSpecifications(data.brokerageSpecifications);
      await app.profileDetailsPage.clickOnSave();

      expect(await app.profileDetailsPage.isEditProfileSuccessMessageVisible()).toBe(true);
    }
  );
  test(
    'TC-03 Verify the user can upload a profile image',
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

      await logStep('Step 02: Open profile details');
      await app.profileDetailsPage.openProfileDetails();

      await logStep('Step 03: Upload a new profile image and save');
      await app.profileDetailsPage.openEditProfileImage();
      await app.profileDetailsPage.uploadProfileImage(data.profileImage);
      await app.profileDetailsPage.clickOnSaveProfileImage();

      await logStep('Step 04: Success message should be visible');
      expect(await app.profileDetailsPage.isEditProfileSuccessMessageVisible()).toBe(true);
    }
  );
  test(
    'TC-04 Verify the user can remove the profile image',
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

      await logStep('Step 02: Open profile details');
      await app.profileDetailsPage.openProfileDetails();

      await logStep('Step 03: Upload a profile image so there is one to remove');
      await app.profileDetailsPage.openEditProfileImage();
      await app.profileDetailsPage.uploadProfileImage(data.profileImage);
      await app.profileDetailsPage.clickOnSaveProfileImage();
      await app.profileDetailsPage.clickOnGoToProfile();

      await logStep('Step 04: Remove the profile image and save');
      await app.profileDetailsPage.openEditProfileImage();
      await app.profileDetailsPage.clickOnDeleteProfileImage();
      await app.profileDetailsPage.clickOnSaveProfileImage();

      await logStep('Step 05: Success message should be visible');
      expect(await app.profileDetailsPage.isEditProfileSuccessMessageVisible()).toBe(true);
    }
  );
  test(
    'TC-05 Verify company user edit his profile',
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

      await logStep('Step 03: Open company and team page');
      await app.profileDetailsPage.clickOnCompanyAndTeam();

      await logStep('Step 03: Edit company profile details');
      await app.profileDetailsPage.clickOnEditProfile();
      await app.profileDetailsPage.enterCompanyWebsite(data.companyWebsite);
      await app.profileDetailsPage.enterCompanyDescription(data.description);

      await logStep('Step 04: Save company profile details');
      await app.profileDetailsPage.clickOnSave();

      expect(await app.profileDetailsPage.isEditProfileSuccessMessageVisible()).toBe(true);
    }
  );
});
