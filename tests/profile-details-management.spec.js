'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const test_1 = require('@playwright/test');
const web_app_1 = require('@base/web-app');
const log_steps_1 = require('@helpers/log-steps');
const data_helper_1 = require('@helpers/data-helper');
const LoginObjects_1 = require('@objects/LoginObjects');
const SERVICE = 'profile-management';
const readServiceData = () => data_helper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => data_helper_1.DataHelper.readData().environments;
test_1.test.describe('Profile Details Management', () => {
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
    'TC-01 verify the navigate to his profile',
    {
      annotation: [
        {
          product: 'Digitar',
          type: 'non-critical',
        },
      ],
    },
    async () => {
      await (0, log_steps_1.logStep)('Step 01: Switch the language && dismiss popups', async () => {
        await app.homePage.clickOnLanguageSwitcher();
        await app.homePage.closeCloseSurveyModel();
        await app.homePage.closeRecommendationModel();
      });
      await (0, log_steps_1.logStep)('Step 02: check user profile is visible');
      await app.profileDetailsPage.openProfileDetails();
      //verify the user able to view his information in overview
      (0, test_1.expect)(app.profileDetailsPage.areProfileDetailsVisible()).toBe(true);
    }
  );
  (0, test_1.test)(
    'TC-02 Verify the user can edit the profile details',
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
      await (0, log_steps_1.logStep)('Step 02: Open profile details');
      await app.profileDetailsPage.openProfileDetails();
      await app.profileDetailsPage.clickOnEditProfile();
      await app.profileDetailsPage.selectExperienceOption(data.experience);
      await app.profileDetailsPage.selectEmploymentState(data.employmentStatus);
      await app.profileDetailsPage.enterCompanyName(data.companyName);
      await app.profileDetailsPage.enterDescription(data.description);
      await app.profileDetailsPage.selectPropertySpecifications(data.propertySpecifications);
      await app.profileDetailsPage.selectBrokerageSpecifications(data.brokerageSpecifications);
      await app.profileDetailsPage.clickOnSave();
      (0, test_1.expect)(await app.profileDetailsPage.isEditProfileSuccessMessageVisible()).toBe(true);
    }
  );
  (0, test_1.test)(
    'TC-03 Verify the user can upload a profile image',
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
      await (0, log_steps_1.logStep)('Step 02: Open profile details');
      await app.profileDetailsPage.openProfileDetails();
      await (0, log_steps_1.logStep)('Step 03: Upload a new profile image and save');
      await app.profileDetailsPage.openEditProfileImage();
      await app.profileDetailsPage.uploadProfileImage(data.profileImage);
      await app.profileDetailsPage.clickOnSaveProfileImage();
      await (0, log_steps_1.logStep)('Step 04: Success message should be visible');
      (0, test_1.expect)(await app.profileDetailsPage.isEditProfileSuccessMessageVisible()).toBe(true);
    }
  );
  (0, test_1.test)(
    'TC-04 Verify the user can remove the profile image',
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
      await (0, log_steps_1.logStep)('Step 02: Open profile details');
      await app.profileDetailsPage.openProfileDetails();
      await (0, log_steps_1.logStep)('Step 03: Upload a profile image so there is one to remove');
      await app.profileDetailsPage.openEditProfileImage();
      await app.profileDetailsPage.uploadProfileImage(data.profileImage);
      await app.profileDetailsPage.clickOnSaveProfileImage();
      await app.profileDetailsPage.clickOnGoToProfile();
      await (0, log_steps_1.logStep)('Step 04: Remove the profile image and save');
      await app.profileDetailsPage.openEditProfileImage();
      await app.profileDetailsPage.clickOnDeleteProfileImage();
      await app.profileDetailsPage.clickOnSaveProfileImage();
      await (0, log_steps_1.logStep)('Step 05: Success message should be visible');
      (0, test_1.expect)(await app.profileDetailsPage.isEditProfileSuccessMessageVisible()).toBe(true);
    }
  );
  (0, test_1.test)(
    'TC-05 Verify company user edit his profile',
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
      await (0, log_steps_1.logStep)('Step 03: Open company and team page');
      await app.profileDetailsPage.clickOnCompanyAndTeam();
      await (0, log_steps_1.logStep)('Step 03: Edit company profile details');
      await app.profileDetailsPage.clickOnEditProfile();
      await app.profileDetailsPage.enterCompanyWebsite(data.companyWebsite);
      await app.profileDetailsPage.enterCompanyDescription(data.description);
      await (0, log_steps_1.logStep)('Step 04: Save company profile details');
      await app.profileDetailsPage.clickOnSave();
      (0, test_1.expect)(await app.profileDetailsPage.isEditProfileSuccessMessageVisible()).toBe(true);
    }
  );
});
