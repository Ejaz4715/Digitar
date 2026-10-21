'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.HomePage = void 0;
const HomePageObjects_1 = require('@objects/HomePageObjects');
class HomePage {
  constructor(page) {
    this.page = page;
  }
  async gotoHomePage(url) {
    await this.page.goto(url);
  }
  async closeCloseSurveyModel() {
    await this.page.locator(HomePageObjects_1.HomePageObjects.surveyCloseButton.css).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(HomePageObjects_1.HomePageObjects.surveyCloseButton.css).click();
  }
  async closeRecommendationModel() {
    await this.page.locator(HomePageObjects_1.HomePageObjects.recommendationSurveyCloseButton.css).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(HomePageObjects_1.HomePageObjects.recommendationSurveyCloseButton.css).click();
  }
  async closeNewServiceModel() {
    await this.page.locator(HomePageObjects_1.HomePageObjects.newServiceModelCloseButton.css).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(HomePageObjects_1.HomePageObjects.newServiceModelCloseButton.css).click();
  }
  async clickOnLanguageSwitcher() {
    await this.page.locator(HomePageObjects_1.HomePageObjects.languageSwitcherButton.css).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(HomePageObjects_1.HomePageObjects.languageSwitcherButton.css).click();
    await this.page.waitForTimeout(10000);
  }
  async clickOnDashboard() {
    await this.page.locator(HomePageObjects_1.HomePageObjects.dashboardIconButton.xpath).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.click(HomePageObjects_1.HomePageObjects.dashboardIconButton.xpath);
    await this.page.waitForTimeout(10000);
  }
  async clickOnProjects() {
    await this.page.locator(HomePageObjects_1.HomePageObjects.projectsIconButton.xpath).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(HomePageObjects_1.HomePageObjects.projectsIconButton.xpath).click();
    await this.page.waitForTimeout(10000);
  }
}
exports.HomePage = HomePage;
