'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const test_1 = require('@playwright/test');
const web_app_1 = require('@base/web-app');
const log_steps_1 = require('@helpers/log-steps');
const data_helper_1 = require('@helpers/data-helper');
const SERVICE = 'broker-dashboard-projects';
const readServiceData = () => data_helper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => data_helper_1.DataHelper.readData().environments;
test_1.test.describe('Individual Broker Dashboard/Projects [Data panel]', () => {
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
    'TC-01 Verify the user view the dashboard',
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
      await (0, log_steps_1.logStep)('Step 02: Check that all dashboard elements are visible', async () => {
        (0, test_1.expect)(await app.dashboardPage.isDashboardVisible()).toBe(true);
      });
    }
  );
  (0, test_1.test)(
    'TC-02 Verify the bookings indicators is present in the dashboard',
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
        await app.homePage.closeNewServiceModel();
      });
      await (0, log_steps_1.logStep)('Step 02: Check booking indicator is visible', async () => {
        await app.homePage.clickOnDashboard();
        (0, test_1.expect)(await app.dashboardPage.isBookingIndicatorVisible()).toBe(true);
      });
    }
  );
  (0, test_1.test)(
    'TC-03 Verify the user navigate to the all projects page',
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
        await app.homePage.closeNewServiceModel();
      });
      await (0, log_steps_1.logStep)('Step 02: check all projects are visible', async () => {
        await app.homePage.clickOnProjects();
        (0, test_1.expect)(await app.projectsPage.areProjectsVisible()).toBe(true);
      });
    }
  );
  (0, test_1.test)(
    'TC-04 Verify the project filters are visible',
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
        await app.homePage.closeNewServiceModel();
      });
      await (0, log_steps_1.logStep)('Step 02: check the project filters are visible ', async () => {
        const filter = data.projectFilter;
        await app.homePage.clickOnProjects();
        (0, test_1.expect)(await app.projectsPage.areProjectFiltersVisible()).toBe(true);
      });
    }
  );
  (0, test_1.test)(
    'TC-05 Verify the user can filter in the projects page',
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
        await app.homePage.closeNewServiceModel();
      });
      await (0, log_steps_1.logStep)('Step 02: filter project visibility based on project name , project code , region and city  ', async () => {
        const filter = data.projectFilter;
        await app.homePage.clickOnProjects();
        await app.projectsPage.filterByProjectName(filter.projectName);
        await app.projectsPage.filterByProjectCode(filter.projectCode);
        await app.projectsPage.filterByRegion(filter.region);
        await app.projectsPage.filterByCity(filter.city);
        (0, test_1.expect)(await app.projectsPage.getSelectedProjectDetails()).toEqual([filter.projectName, filter.projectCode, filter.region, filter.city]);
      });
    }
  );
  (0, test_1.test)(
    'TC-06 Verify the user can view the project details',
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
        await app.homePage.closeNewServiceModel();
      });
      await (0, log_steps_1.logStep)('Step 02: open projects page and view the first project details', async () => {
        await app.homePage.clickOnProjects();
        await app.projectsPage.clickOnViewDetails();
        (0, test_1.expect)(await app.projectsPage.isProjectDetailsContentVisible()).toBe(true);
      });
    }
  );
  (0, test_1.test)(
    'TC-07 Verify the unit filters are visible',
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
        await app.homePage.closeNewServiceModel();
      });
      await (0, log_steps_1.logStep)('Step 02: open projects page and view the project details', async () => {
        await app.homePage.clickOnProjects();
        await app.projectsPage.filterByProjectName(data.projectFilter.projectName);
        await app.projectsPage.clickOnViewDetails();
      });
      await (0, log_steps_1.logStep)('Step 03: filter using unit code > assert that are unit filters are visible', async () => {
        await app.projectsPage.clickOnProjectUnits();
        (0, test_1.expect)(await app.projectsPage.areUnitFiltersVisible()).toBe(true);
      });
    }
  );
  (0, test_1.test)(
    'TC-08 Verify user can filter units based unit code',
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
        await app.homePage.closeNewServiceModel();
      });
      await (0, log_steps_1.logStep)('Step 02: open projects page and view the project details', async () => {
        await app.homePage.clickOnProjects();
        await app.projectsPage.filterByProjectName(data.projectFilter.projectName);
        await app.projectsPage.clickOnViewDetails();
        await app.projectsPage.clickOnProjectUnits();
        (0, test_1.expect)(await app.projectsPage.areAllProjectUnitsVisible()).toBe(true);
      });
      await (0, log_steps_1.logStep)('Step 03: filter using unit code > assert the unit codes are the same', async () => {
        await app.projectsPage.filterByUnitCode(data.unitCode);
        (0, test_1.expect)(await app.projectsPage.getVisibleUnitCode()).toMatch(data.unitCode);
      });
    }
  );
  (0, test_1.test)(
    'TC-09 Verify user can filter units based on bedrooms number',
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
        await app.homePage.closeNewServiceModel();
      });
      await (0, log_steps_1.logStep)('Step 02: open projects page and view the project details', async () => {
        await app.homePage.clickOnProjects();
        await app.projectsPage.filterByProjectName(data.projectFilter.projectName);
        await app.projectsPage.clickOnViewDetails();
        await app.projectsPage.clickOnProjectUnits();
        (0, test_1.expect)(await app.projectsPage.areAllProjectUnitsVisible()).toBe(true);
      });
      await (0, log_steps_1.logStep)("Step 03: filter using bedrooms number > assert units' bedrooms filter applied", async () => {
        await app.projectsPage.filterByBedroomsNumber(Number(data.unitFilter.unitBedroomsNumber));
        const unitsBedroomsNumber = await app.projectsPage.getAllUnitsBedroomsNumber();
        (0, test_1.expect)(unitsBedroomsNumber.every((t) => t === data.unitFilter.unitBedroomsNumber)).toBe(true);
      });
    }
  );
  (0, test_1.test)(
    'TC-10 Verify user can filter by unit state',
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
        await app.homePage.closeNewServiceModel();
      });
      await (0, log_steps_1.logStep)('Step 02: open projects page and view the project details', async () => {
        await app.homePage.clickOnProjects();
        await app.projectsPage.filterByProjectName(data.projectFilter.projectName);
        await app.projectsPage.clickOnViewDetails();
        await app.projectsPage.clickOnProjectUnits();
        (0, test_1.expect)(await app.projectsPage.areAllProjectUnitsVisible()).toBe(true);
      });
      await (0, log_steps_1.logStep)("Step 03: filter using unit state > assert units' state filter applied", async () => {
        await app.projectsPage.filterByUnitState(data.unitFilter.unitState);
        const unitStates = await app.projectsPage.getAllUnitsStates();
        (0, test_1.expect)(unitStates.every((t) => t === data.unitFilter.unitState)).toBe(true);
      });
    }
  );
  (0, test_1.test)(
    'TC-11 Verify user can apply advanced filters',
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
        await app.homePage.closeNewServiceModel();
      });
      await (0, log_steps_1.logStep)('Step 02: open projects page and view the project details', async () => {
        await app.homePage.clickOnProjects();
        await app.projectsPage.filterByProjectName(data.projectFilter.projectName);
        await app.projectsPage.clickOnViewDetails();
        await app.projectsPage.clickOnProjectUnits();
        (0, test_1.expect)(await app.projectsPage.areAllProjectUnitsVisible()).toBe(true);
      });
      await (0, log_steps_1.logStep)('Step 03: filter using non-beneficiary users', async () => {
        await app.projectsPage.clickOnFilterButton();
        await app.projectsPage.filterByBeneficiaryState(false);
        await app.projectsPage.clickOnApplyFilter();
        const beneficiaryStates = await app.projectsPage.getAllBeneficiaryStates();
        (0, test_1.expect)(beneficiaryStates.every((t) => t.includes(data.unitFilter.beneficiaryState))).toBe(true);
      });
    }
  );
  (0, test_1.test)(
    'TC-12 Verify user can clear all filters',
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
        await app.homePage.closeNewServiceModel();
      });
      await (0, log_steps_1.logStep)('Step 02: Open projects page and view the project details', async () => {
        await app.homePage.clickOnProjects();
        await app.projectsPage.filterByProjectName(data.projectFilter.projectName);
        await app.projectsPage.clickOnViewDetails();
        await app.projectsPage.clickOnProjectUnits();
        (0, test_1.expect)(await app.projectsPage.areAllProjectUnitsVisible()).toBe(true);
      });
      await (0, log_steps_1.logStep)('Step 03: Clear all filters', async () => {
        await app.projectsPage.clickOnFilterButton();
        await app.projectsPage.filterByBeneficiaryState(false);
        await app.projectsPage.clearAllFilters();
        (0, test_1.expect)(await app.projectsPage.areAllProjectUnitsVisible()).toBe(true);
      });
    }
  );
  (0, test_1.test)(
    'TC-13 Verify the user view a unit details',
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
        await app.homePage.closeNewServiceModel();
      });
      await (0, log_steps_1.logStep)('Step 02: open projects page and view the project details', async () => {
        await app.homePage.clickOnProjects();
        await app.projectsPage.filterByProjectName(data.projectFilter.projectName);
        await app.projectsPage.clickOnViewDetails();
        await app.projectsPage.clickOnProjectUnits();
        (0, test_1.expect)(await app.projectsPage.areAllProjectUnitsVisible()).toBe(true);
      });
      await (0, log_steps_1.logStep)('Step 03: filter using unit code > view the unit details', async () => {
        await app.projectsPage.filterByUnitCode(data.unitCode);
        (0, test_1.expect)(await app.projectsPage.getVisibleUnitCode()).toMatch(data.unitCode);
        await app.projectsPage.clickOnViewDetails();
        (0, test_1.expect)(await app.projectsPage.areUnitDetailsVisible()).toBe(true);
      });
    }
  );
});
