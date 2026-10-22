import { expect, test } from '@playwright/test';
import { WebApp } from '@base/web-app';
import { logStep } from '@helpers/log-steps';
import { DataHelper } from '@helpers/data-helper';
import { LoginObjects } from '@objects/LoginObjects';

const SERVICE = 'opportunities-pool';

const readServiceData = () => DataHelper.readData().services[SERVICE];

const readEnvironments = () => DataHelper.readData().environments;

test.describe('Opportunities Pool', () => {
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
    'TC-01 Verify user can navigate to opportunities page ',
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

      await app.homePage.navigateToAvailableOpportunities();

      expect(await app.opportunitiesPoolPage.isOpportunitiesPoolVisible()).toBe(true);
    }
  );

  test(
    'TC-02 Verify the user reserve an opportunity and view in opportunities cart',
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

      await logStep('Step 02: Open available opportunities and filter by project');
      await app.homePage.navigateToAvailableOpportunities();
      await app.opportunitiesPoolPage.clickOnProjectFilterDropdown();
      await app.opportunitiesPoolPage.selectProjectFromDropdown(data.projectName);

      await logStep('Step 03: Reserve the first opportunity');
      const opportunityNumber = await app.opportunitiesPoolPage.getFirstOpportunityNumber();
      await app.opportunitiesPoolPage.clickOnFirstReserveButton();
      expect(await app.opportunitiesPoolPage.isReservationSuccessMessageVisible()).toBe(true);

      await logStep('Step 04: Reserved opportunity should be in the opportunities cart');
      await app.opportunitiesPoolPage.clickOnCartFromSuccessMessage();
      expect(await app.opportunitiesPoolPage.isOpportunityInCart(opportunityNumber)).toBe(true);
    }
  );

  test(
    'TC-03 Verify the user can not reserve more than 5 opportunities',
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

      await logStep('Step 02: Open available opportunities');
      await app.homePage.navigateToAvailableOpportunities();

      await logStep('Step 03: Keep reserving until the reservation limit blocks it');
      // the user may already hold some reservations, so reserve until the app refuses -
      // at most one attempt more than the limit
      let reserved = true;
      for (let attempt = 1; reserved && attempt <= data.maxReservations + 1; attempt++) {
        expect(await app.opportunitiesPoolPage.getReservableOpportunitiesCount(), 'no opportunity left to try reserving').toBeGreaterThan(0);
        reserved = await app.opportunitiesPoolPage.tryToReserveFirstOpportunity();
        if (reserved) {
          await app.opportunitiesPoolPage.closeReservationSuccessMessage();
        }
      }

      await logStep('Step 04: Reservation limit message should be visible');
      expect(await app.opportunitiesPoolPage.isReservationLimitMessageVisible(data.reservationLimitMessage)).toBe(true);
    }
  );

  test(
    'TC-04 Verify the user update the reserved opportunity status',
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

      await logStep('Step 02: Open the opportunities cart');
      await app.homePage.navigateToAvailableOpportunities();
      await app.opportunitiesPoolPage.clickOnOpportunitiesCartButton();

      const statuses: string[] = data.statuses;
      const opportunityNumbers = await app.opportunitiesPoolPage.getUpdatableOpportunityNumbers();
      expect(opportunityNumbers.length, `need ${statuses.length} reserved opportunities without a status in the cart`).toBeGreaterThanOrEqual(statuses.length);

      for (const [index, status] of statuses.entries()) {
        const opportunityNumber = opportunityNumbers[index];
        await app.opportunitiesPoolPage.updateOpportunityStatus(opportunityNumber, status, data.statusReason);
        expect(await app.opportunitiesPoolPage.isStatusUpdateSuccessMessageVisible()).toBe(true);
        await app.opportunitiesPoolPage.closeStatusUpdateSuccessMessage();
      }
    }
  );
});
