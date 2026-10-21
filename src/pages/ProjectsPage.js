'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProjectsPage = void 0;
const ProjectsObject_1 = require('@objects/ProjectsObject');
class ProjectsPage {
  constructor(page) {
    this.page = page;
  }
  async areProjectsVisible() {
    await this.page.waitForTimeout(10000);
    return await this.page.locator(ProjectsObject_1.ProjectsObject.projectElements.css).isVisible();
  }
  async filterByProjectName(projectName) {
    await this.selectFilterOption(1, projectName);
  }
  async filterByProjectCode(projectCode) {
    await this.selectFilterOption(2, projectCode);
  }
  async filterByRegion(region) {
    await this.selectFilterOption(3, region);
  }
  async filterByCity(city) {
    await this.selectFilterOption(4, city);
  }
  async filterByBedroomsNumber(bedroomsNumber) {
    await this.page.locator(ProjectsObject_1.ProjectsObject.bedroomsNumberDropdown).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(ProjectsObject_1.ProjectsObject.bedroomsNumberDropdown).click();
    await this.page.locator(ProjectsObject_1.ProjectsObject.optionWithTitle(bedroomsNumber.toString()).css).waitFor({
      state: 'visible',
      timeout: 10000,
    });
    await this.page.locator(ProjectsObject_1.ProjectsObject.optionWithTitle(bedroomsNumber.toString()).css).click();
    await this.page.waitForTimeout(2000);
  }
  async filterByUnitState(unitState) {
    await this.page.locator(ProjectsObject_1.ProjectsObject.unitStateDropdown).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(ProjectsObject_1.ProjectsObject.unitStateDropdown).click();
    await this.page.locator(ProjectsObject_1.ProjectsObject.stateDropdownOption(unitState)).waitFor({
      state: 'visible',
      timeout: 10000,
    });
    await this.page.locator(ProjectsObject_1.ProjectsObject.stateDropdownOption(unitState)).click();
    await this.page.waitForTimeout(2000);
  }
  async filterByBeneficiaryState(isBeneficiary) {
    if (isBeneficiary) {
      await this.page.locator(ProjectsObject_1.ProjectsObject.beneficiaryButton).waitFor({ state: 'visible', timeout: 10000 });
      await this.page.locator(ProjectsObject_1.ProjectsObject.beneficiaryButton).click();
    } else {
      await this.page.locator(ProjectsObject_1.ProjectsObject.nonBeneficiaryButton).waitFor({ state: 'visible', timeout: 10000 });
      await this.page.locator(ProjectsObject_1.ProjectsObject.nonBeneficiaryButton).click();
    }
    await this.page.waitForTimeout(2000);
  }
  async clickOnApplyFilter() {
    await this.page.locator(ProjectsObject_1.ProjectsObject.filterApplyButton).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(ProjectsObject_1.ProjectsObject.filterApplyButton).click();
    await this.page.waitForTimeout(3000);
  }
  async clearAllFilters() {
    await this.page.locator(ProjectsObject_1.ProjectsObject.filterClearButton).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(ProjectsObject_1.ProjectsObject.filterClearButton).click();
    await this.page.waitForTimeout(3000);
  }
  async clickOnFilterButton() {
    await this.page.locator(ProjectsObject_1.ProjectsObject.filterButton).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(ProjectsObject_1.ProjectsObject.filterButton).click();
    await this.page.waitForTimeout(2000);
  }
  async getSelectedProjectDetails() {
    let projectDetails = [];
    projectDetails.push(
      await this.page.textContent(ProjectsObject_1.ProjectsObject.visibleTextAt(2).css),
      await this.page.textContent(ProjectsObject_1.ProjectsObject.visibleTextAt(1).css),
      await this.page.textContent(ProjectsObject_1.ProjectsObject.visibleTextAt(4).css),
      await this.page.textContent(ProjectsObject_1.ProjectsObject.visibleTextAt(5).css)
    );
    projectDetails = projectDetails.map((element) => element.toString().trim());
    return projectDetails;
  }
  async clickOnViewDetails() {
    await this.page.locator(ProjectsObject_1.ProjectsObject.projectShowDetailsButton).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(ProjectsObject_1.ProjectsObject.projectShowDetailsButton).click();
    await this.page.waitForTimeout(10000);
  }
  async clickOnProjectUnits() {
    await this.page.locator(ProjectsObject_1.ProjectsObject.projectUnitsButton).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(ProjectsObject_1.ProjectsObject.projectUnitsButton).click();
    await this.page.waitForTimeout(10000);
  }
  async isProjectDetailsContentVisible() {
    await this.page.locator(ProjectsObject_1.ProjectsObject.projectDetailsContent).waitFor({ state: 'visible', timeout: 30_000 });
    return await this.page.locator(ProjectsObject_1.ProjectsObject.projectDetailsContent).isVisible();
  }
  async areAllProjectUnitsVisible() {
    await this.page.locator(ProjectsObject_1.ProjectsObject.projectUnitsTable).waitFor({ state: 'visible', timeout: 30_000 });
    return await this.page.locator(ProjectsObject_1.ProjectsObject.projectUnitsTable).isVisible();
  }
  async filterByUnitCode(unitCode) {
    await this.page.locator(ProjectsObject_1.ProjectsObject.unitCodeSearchField).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(ProjectsObject_1.ProjectsObject.unitCodeSearchField).fill(unitCode);
    await this.page.waitForTimeout(30000);
  }
  async getVisibleUnitCode() {
    await this.page.locator(ProjectsObject_1.ProjectsObject.visibleUnitCodeText).waitFor({ state: 'visible', timeout: 30_000 });
    return await this.page.locator(ProjectsObject_1.ProjectsObject.visibleUnitCodeText).textContent();
  }
  async getAllUnitsBedroomsNumber() {
    const items = this.page.locator(ProjectsObject_1.ProjectsObject.visibleBedroomsNumberForAllUnits);
    await items.first().waitFor({ state: 'visible', timeout: 30_000 });
    return (await items.allInnerTexts()).map((t) => t.trim());
  }
  async getAllUnitsStates() {
    const items = this.page.locator(ProjectsObject_1.ProjectsObject.visibleUnitStatesText);
    await items.first().waitFor({ state: 'visible', timeout: 30_000 });
    return (await items.allInnerTexts()).map((t) => t.trim());
  }
  async getAllBeneficiaryStates() {
    const items = this.page.locator(ProjectsObject_1.ProjectsObject.visibleBeneficiaryStatesText);
    await items.first().waitFor({ state: 'visible', timeout: 30_000 });
    return (await items.allInnerTexts()).map((t) => t.trim());
  }
  async areUnitDetailsVisible() {
    await this.page.locator(ProjectsObject_1.ProjectsObject.unitDetailsTable).waitFor({ state: 'visible', timeout: 30_000 });
    return await this.page.locator(ProjectsObject_1.ProjectsObject.unitDetailsTable).isVisible();
  }
  async areProjectFiltersVisible() {
    await this.page.locator(ProjectsObject_1.ProjectsObject.projectSearchFilters).waitFor({ state: 'visible', timeout: 30_000 });
    return await this.page.locator(ProjectsObject_1.ProjectsObject.projectSearchFilters).isVisible();
  }
  async areUnitFiltersVisible() {
    await this.page.locator(ProjectsObject_1.ProjectsObject.unitsFilters).waitFor({ state: 'visible', timeout: 30_000 });
    return await this.page.locator(ProjectsObject_1.ProjectsObject.unitsFilters).isVisible();
  }
  async selectFilterOption(dropDownIndex, optionTitle) {
    const dropDownList = this.page.locator(ProjectsObject_1.ProjectsObject.dropDownList(dropDownIndex).css);
    const option = this.page.locator(ProjectsObject_1.ProjectsObject.optionWithTitle(optionTitle).css);
    await dropDownList.waitFor({ state: 'visible', timeout: 30_000 });
    await dropDownList.click();
    await option.waitFor({ state: 'visible', timeout: 30_000 });
    await option.click();
  }
}
exports.ProjectsPage = ProjectsPage;
