import { Page } from '@playwright/test';
import { HomePageObjects } from '@objects/HomePageObjects';

export class HomePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoHomePage(url: string) {
    await this.page.goto(url);
  }

  async closeCloseSurveyModel() {
    await this.page.locator(HomePageObjects.surveyCloseButton.css).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(HomePageObjects.surveyCloseButton.css).click();
  }

  async closeRecommendationModel() {
    await this.page.locator(HomePageObjects.recommendationSurveyCloseButton.css).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(HomePageObjects.recommendationSurveyCloseButton.css).click();
  }

  async closeNewServiceModel() {
    await this.page.locator(HomePageObjects.newServiceModelCloseButton.css).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(HomePageObjects.newServiceModelCloseButton.css).click();
  }

  async clickOnLanguageSwitcher() {
    await this.page.locator(HomePageObjects.languageSwitcherButton.css).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(HomePageObjects.languageSwitcherButton.css).click();
    await this.page.waitForTimeout(10000);
  }
  async clickOnDashboard() {
    await this.page.locator(HomePageObjects.dashboardIconButton.xpath).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.click(HomePageObjects.dashboardIconButton.xpath);
    await this.page.waitForTimeout(10000);
  }

  async clickOnProjects() {
    await this.page.locator(HomePageObjects.projectsIconButton.xpath).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(HomePageObjects.projectsIconButton.xpath).click();
    await this.page.waitForTimeout(10000);
  }

  async navigateToAvailableOpportunities() {
    await this.page.locator(HomePageObjects.availableOpportunities).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(HomePageObjects.availableOpportunities).click();
    await this.page.waitForTimeout(10000);
  }
}
