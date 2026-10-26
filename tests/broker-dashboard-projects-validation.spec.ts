import { expect, test } from '@playwright/test';
import { WebApp } from '@base/web-app';
import { logStep } from '@helpers/log-steps';
import { DataHelper } from '@helpers/data-helper';

const SERVICE = 'broker-dashboard-projects';

const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;

test.describe('Individual Broker Dashboard/Projects [Data panel]', () => {
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
    'TC-01 Verify the user view the dashboard',
    {
      annotation: [
        {
          product: 'Digitar Broker',
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

      await logStep('Step 02: Check that all dashboard elements are visible', async () => {
        expect(await app.dashboardPage.isDashboardVisible()).toBe(true);
      });
    }
  );

  test(
    'TC-02 Verify the bookings indicators is present in the dashboard',
    {
      annotation: [
        {
          product: 'Digitar Broker',
          type: 'non-critical',
        } as any,
      ],
    },
    async () => {
      await logStep('Step 01: Switch the language && dismiss popups', async () => {
        await app.homePage.clickOnLanguageSwitcher();
        await app.homePage.closeCloseSurveyModel();
        await app.homePage.closeRecommendationModel();
        await app.homePage.closeNewServiceModel();
      });

      await logStep('Step 02: Check booking indicator is visible', async () => {
        await app.homePage.clickOnDashboard();
        expect(await app.dashboardPage.isBookingIndicatorVisible()).toBe(true);
      });
    }
  );

  test(
    'TC-03 Verify the user navigate to the all projects page',
    {
      annotation: [
        {
          product: 'Digitar Broker',
          type: 'non-critical',
        } as any,
      ],
    },
    async () => {
      await logStep('Step 01: Switch the language && dismiss popups', async () => {
        await app.homePage.clickOnLanguageSwitcher();
        await app.homePage.closeCloseSurveyModel();
        await app.homePage.closeRecommendationModel();
        await app.homePage.closeNewServiceModel();
      });

      await logStep('Step 02: check all projects are visible', async () => {
        await app.homePage.clickOnProjects();
        expect(await app.projectsPage.areProjectsVisible()).toBe(true);
      });
    }
  );

  test(
    'TC-04 Verify the project filters are visible',
    {
      annotation: [
        {
          product: 'Digitar Broker',
          type: 'non-critical',
        } as any,
      ],
    },
    async () => {
      await logStep('Step 01: Switch the language && dismiss popups', async () => {
        await app.homePage.clickOnLanguageSwitcher();
        await app.homePage.closeCloseSurveyModel();
        await app.homePage.closeRecommendationModel();
        await app.homePage.closeNewServiceModel();
      });

      await logStep('Step 02: check the project filters are visible ', async () => {
        const filter = data.projectFilter;
        await app.homePage.clickOnProjects();
        expect(await app.projectsPage.areProjectFiltersVisible()).toBe(true);
      });
    }
  );

  test(
    'TC-05 Verify the user can filter in the projects page',
    {
      annotation: [
        {
          product: 'Digitar Broker',
          type: 'non-critical',
        } as any,
      ],
    },
    async () => {
      await logStep('Step 01: Switch the language && dismiss popups', async () => {
        await app.homePage.clickOnLanguageSwitcher();
        await app.homePage.closeCloseSurveyModel();
        await app.homePage.closeRecommendationModel();
        await app.homePage.closeNewServiceModel();
      });

      await logStep('Step 02: filter project visibility based on project name , project code , region and city  ', async () => {
        const filter = data.projectFilter;
        await app.homePage.clickOnProjects();
        await app.projectsPage.filterByProjectName(filter.projectName);
        await app.projectsPage.filterByProjectCode(filter.projectCode);
        await app.projectsPage.filterByRegion(filter.region);
        await app.projectsPage.filterByCity(filter.city);
        expect(await app.projectsPage.getSelectedProjectDetails()).toEqual([filter.projectName, filter.projectCode, filter.region, filter.city]);
      });
    }
  );

  test(
    'TC-06 Verify the user can view the project details',
    {
      annotation: [
        {
          product: 'Digitar Broker',
          type: 'non-critical',
        } as any,
      ],
    },
    async () => {
      await logStep('Step 01: Switch the language && dismiss popups', async () => {
        await app.homePage.clickOnLanguageSwitcher();
        await app.homePage.closeCloseSurveyModel();
        await app.homePage.closeRecommendationModel();
        await app.homePage.closeNewServiceModel();
      });

      await logStep('Step 02: open projects page and view the first project details', async () => {
        await app.homePage.clickOnProjects();
        await app.projectsPage.clickOnViewDetails();
        expect(await app.projectsPage.isProjectDetailsContentVisible()).toBe(true);
      });
    }
  );

  test(
    'TC-07 Verify the unit filters are visible',
    {
      annotation: [
        {
          product: 'Digitar Broker',
          type: 'non-critical',
        } as any,
      ],
    },
    async () => {
      await logStep('Step 01: Switch the language && dismiss popups', async () => {
        await app.homePage.clickOnLanguageSwitcher();
        await app.homePage.closeCloseSurveyModel();
        await app.homePage.closeRecommendationModel();
        await app.homePage.closeNewServiceModel();
      });

      await logStep('Step 02: open projects page and view the project details', async () => {
        await app.homePage.clickOnProjects();
        await app.projectsPage.filterByProjectName(data.projectFilter.projectName);
        await app.projectsPage.clickOnViewDetails();
      });

      await logStep('Step 03: filter using unit code > assert that are unit filters are visible', async () => {
        await app.projectsPage.clickOnProjectUnits();
        expect(await app.projectsPage.areUnitFiltersVisible()).toBe(true);
      });
    }
  );

  test(
    'TC-08 Verify user can filter units based unit code',
    {
      annotation: [
        {
          product: 'Digitar Broker',
          type: 'non-critical',
        } as any,
      ],
    },
    async () => {
      await logStep('Step 01: Switch the language && dismiss popups', async () => {
        await app.homePage.clickOnLanguageSwitcher();
        await app.homePage.closeCloseSurveyModel();
        await app.homePage.closeRecommendationModel();
        await app.homePage.closeNewServiceModel();
      });

      await logStep('Step 02: open projects page and view the project details', async () => {
        await app.homePage.clickOnProjects();
        await app.projectsPage.filterByProjectName(data.projectFilter.projectName);
        await app.projectsPage.clickOnViewDetails();
        await app.projectsPage.clickOnProjectUnits();
        expect(await app.projectsPage.areAllProjectUnitsVisible()).toBe(true);
      });

      await logStep('Step 03: filter using unit code > assert the unit codes are the same', async () => {
        await app.projectsPage.filterByUnitCode(data.unitCode);
        expect(await app.projectsPage.getVisibleUnitCode()).toMatch(data.unitCode);
      });
    }
  );

  test(
    'TC-09 Verify user can filter units based on bedrooms number',
    {
      annotation: [
        {
          product: 'Digitar Broker',
          type: 'non-critical',
        } as any,
      ],
    },
    async () => {
      await logStep('Step 01: Switch the language && dismiss popups', async () => {
        await app.homePage.clickOnLanguageSwitcher();
        await app.homePage.closeCloseSurveyModel();
        await app.homePage.closeRecommendationModel();
        await app.homePage.closeNewServiceModel();
      });

      await logStep('Step 02: open projects page and view the project details', async () => {
        await app.homePage.clickOnProjects();
        await app.projectsPage.filterByProjectName(data.projectFilter.projectName);
        await app.projectsPage.clickOnViewDetails();
        await app.projectsPage.clickOnProjectUnits();
        expect(await app.projectsPage.areAllProjectUnitsVisible()).toBe(true);
      });

      await logStep("Step 03: filter using bedrooms number > assert units' bedrooms filter applied", async () => {
        await app.projectsPage.filterByBedroomsNumber(Number(data.unitFilter.unitBedroomsNumber));
        const unitsBedroomsNumber = await app.projectsPage.getAllUnitsBedroomsNumber();
        expect(unitsBedroomsNumber.every((t) => t === data.unitFilter.unitBedroomsNumber)).toBe(true);
      });
    }
  );

  test(
    'TC-10 Verify user can filter by unit state',
    {
      annotation: [
        {
          product: 'Digitar Broker',
          type: 'non-critical',
        } as any,
      ],
    },
    async () => {
      await logStep('Step 01: Switch the language && dismiss popups', async () => {
        await app.homePage.clickOnLanguageSwitcher();
        await app.homePage.closeCloseSurveyModel();
        await app.homePage.closeRecommendationModel();
        await app.homePage.closeNewServiceModel();
      });

      await logStep('Step 02: open projects page and view the project details', async () => {
        await app.homePage.clickOnProjects();
        await app.projectsPage.filterByProjectName(data.projectFilter.projectName);
        await app.projectsPage.clickOnViewDetails();
        await app.projectsPage.clickOnProjectUnits();
        expect(await app.projectsPage.areAllProjectUnitsVisible()).toBe(true);
      });

      await logStep("Step 03: filter using unit state > assert units' state filter applied", async () => {
        await app.projectsPage.filterByUnitState(data.unitFilter.unitState);
        const unitStates = await app.projectsPage.getAllUnitsStates();
        expect(unitStates.every((t) => t === data.unitFilter.unitState)).toBe(true);
      });
    }
  );

  test(
    'TC-11 Verify user can apply advanced filters',
    {
      annotation: [
        {
          product: 'Digitar Broker',
          type: 'non-critical',
        } as any,
      ],
    },
    async () => {
      await logStep('Step 01: Switch the language && dismiss popups', async () => {
        await app.homePage.clickOnLanguageSwitcher();
        await app.homePage.closeCloseSurveyModel();
        await app.homePage.closeRecommendationModel();
        await app.homePage.closeNewServiceModel();
      });

      await logStep('Step 02: open projects page and view the project details', async () => {
        await app.homePage.clickOnProjects();
        await app.projectsPage.filterByProjectName(data.projectFilter.projectName);
        await app.projectsPage.clickOnViewDetails();
        await app.projectsPage.clickOnProjectUnits();
        expect(await app.projectsPage.areAllProjectUnitsVisible()).toBe(true);
      });

      await logStep('Step 03: filter using non-beneficiary users', async () => {
        await app.projectsPage.clickOnFilterButton();
        await app.projectsPage.filterByBeneficiaryState(false);
        await app.projectsPage.clickOnApplyFilter();
        const beneficiaryStates = await app.projectsPage.getAllBeneficiaryStates();
        expect(beneficiaryStates.every((t) => t.includes(data.unitFilter.beneficiaryState))).toBe(true);
      });
    }
  );

  test(
    'TC-12 Verify user can clear all filters',
    {
      annotation: [
        {
          product: 'Digitar Broker',
          type: 'non-critical',
        } as any,
      ],
    },
    async () => {
      await logStep('Step 01: Switch the language && dismiss popups', async () => {
        await app.homePage.clickOnLanguageSwitcher();
        await app.homePage.closeCloseSurveyModel();
        await app.homePage.closeRecommendationModel();
        await app.homePage.closeNewServiceModel();
      });

      await logStep('Step 02: Open projects page and view the project details', async () => {
        await app.homePage.clickOnProjects();
        await app.projectsPage.filterByProjectName(data.projectFilter.projectName);
        await app.projectsPage.clickOnViewDetails();
        await app.projectsPage.clickOnProjectUnits();
        expect(await app.projectsPage.areAllProjectUnitsVisible()).toBe(true);
      });

      await logStep('Step 03: Clear all filters', async () => {
        await app.projectsPage.clickOnFilterButton();
        await app.projectsPage.filterByBeneficiaryState(false);
        await app.projectsPage.clearAllFilters();
        expect(await app.projectsPage.areAllProjectUnitsVisible()).toBe(true);
      });
    }
  );

  test(
    'TC-13 Verify the user view a unit details',
    {
      annotation: [
        {
          product: 'Digitar Broker',
          type: 'non-critical',
        } as any,
      ],
    },
    async () => {
      await logStep('Step 01: Switch the language && dismiss popups', async () => {
        await app.homePage.clickOnLanguageSwitcher();
        await app.homePage.closeCloseSurveyModel();
        await app.homePage.closeRecommendationModel();
        await app.homePage.closeNewServiceModel();
      });

      await logStep('Step 02: open projects page and view the project details', async () => {
        await app.homePage.clickOnProjects();
        await app.projectsPage.filterByProjectName(data.projectFilter.projectName);
        await app.projectsPage.clickOnViewDetails();
        await app.projectsPage.clickOnProjectUnits();
        expect(await app.projectsPage.areAllProjectUnitsVisible()).toBe(true);
      });

      await logStep('Step 03: filter using unit code > view the unit details', async () => {
        await app.projectsPage.filterByUnitCode(data.unitCode);
        expect(await app.projectsPage.getVisibleUnitCode()).toMatch(data.unitCode);
        await app.projectsPage.clickOnViewDetails();
        expect(await app.projectsPage.areUnitDetailsVisible()).toBe(true);
      });
    }
  );
});
