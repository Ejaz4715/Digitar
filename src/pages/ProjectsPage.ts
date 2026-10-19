import { Page } from '@playwright/test';
import { ProjectsObject } from '@objects/ProjectsObject';

export class ProjectsPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async areProjectsVisible(): Promise<boolean> {
    await this.page.waitForTimeout(10000);
    return await this.page.locator(ProjectsObject.projectElements.css).isVisible();
  }

  async filterByProjectName(projectName: string): Promise<void> {
    await this.selectFilterOption(1, projectName);
  }

  async filterByProjectCode(projectCode: string): Promise<void> {
    await this.selectFilterOption(2, projectCode);
  }

  async filterByRegion(region: string): Promise<void> {
    await this.selectFilterOption(3, region);
  }

  async filterByCity(city: string): Promise<void> {
    await this.selectFilterOption(4, city);
  }

  async filterByBedroomsNumber(bedroomsNumber: number): Promise<void> {
    await this.page.locator(ProjectsObject.bedroomsNumberDropdown).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(ProjectsObject.bedroomsNumberDropdown).click();

    await this.page.locator(ProjectsObject.optionWithTitle(bedroomsNumber.toString()).css).waitFor({
      state: 'visible',
      timeout: 10000,
    });
    await this.page.locator(ProjectsObject.optionWithTitle(bedroomsNumber.toString()).css).click();
    await this.page.waitForTimeout(2000);
  }

  async filterByUnitState(unitState: string): Promise<void> {
    await this.page.locator(ProjectsObject.unitStateDropdown).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(ProjectsObject.unitStateDropdown).click();

    await this.page.locator(ProjectsObject.stateDropdownOption(unitState)).waitFor({
      state: 'visible',
      timeout: 10000,
    });
    await this.page.locator(ProjectsObject.stateDropdownOption(unitState)).click();
    await this.page.waitForTimeout(2000);
  }

  async filterByBeneficiaryState(isBeneficiary: boolean): Promise<void> {
    if (isBeneficiary) {
      await this.page.locator(ProjectsObject.beneficiaryButton).waitFor({ state: 'visible', timeout: 10000 });
      await this.page.locator(ProjectsObject.beneficiaryButton).click();
    } else {
      await this.page.locator(ProjectsObject.nonBeneficiaryButton).waitFor({ state: 'visible', timeout: 10000 });
      await this.page.locator(ProjectsObject.nonBeneficiaryButton).click();
    }
    await this.page.waitForTimeout(2000);
  }

  async clickOnApplyFilter() {
    await this.page.locator(ProjectsObject.filterApplyButton).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(ProjectsObject.filterApplyButton).click();
    await this.page.waitForTimeout(3000);
  }

  async clearAllFilters() {
    await this.page.locator(ProjectsObject.filterClearButton).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(ProjectsObject.filterClearButton).click();
    await this.page.waitForTimeout(3000);
  }

  async clickOnFilterButton(): Promise<void> {
    await this.page.locator(ProjectsObject.filterButton).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(ProjectsObject.filterButton).click();
    await this.page.waitForTimeout(2000);
  }

  async getSelectedProjectDetails() {
    let projectDetails: any[] = [];

    projectDetails.push(
      await this.page.textContent(ProjectsObject.visibleTextAt(2).css),
      await this.page.textContent(ProjectsObject.visibleTextAt(1).css),
      await this.page.textContent(ProjectsObject.visibleTextAt(4).css),
      await this.page.textContent(ProjectsObject.visibleTextAt(5).css)
    );

    projectDetails = projectDetails.map((element) => element.toString().trim());
    return projectDetails;
  }

  async clickOnViewDetails() {
    await this.page.locator(ProjectsObject.projectShowDetailsButton).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(ProjectsObject.projectShowDetailsButton).click();
    await this.page.waitForTimeout(10000);
  }

  async clickOnProjectUnits() {
    await this.page.locator(ProjectsObject.projectUnitsButton).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(ProjectsObject.projectUnitsButton).click();
    await this.page.waitForTimeout(10000);
  }

  async isProjectDetailsContentVisible() {
    await this.page.locator(ProjectsObject.projectDetailsContent).waitFor({ state: 'visible', timeout: 30_000 });
    return await this.page.locator(ProjectsObject.projectDetailsContent).isVisible();
  }

  async areAllProjectUnitsVisible() {
    await this.page.locator(ProjectsObject.projectUnitsTable).waitFor({ state: 'visible', timeout: 30_000 });
    return await this.page.locator(ProjectsObject.projectUnitsTable).isVisible();
  }

  async filterByUnitCode(unitCode: string) {
    await this.page.locator(ProjectsObject.unitCodeSearchField).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(ProjectsObject.unitCodeSearchField).fill(unitCode);
    await this.page.waitForTimeout(30000);
  }

  async getVisibleUnitCode() {
    await this.page.locator(ProjectsObject.visibleUnitCodeText).waitFor({ state: 'visible', timeout: 30_000 });
    return await this.page.locator(ProjectsObject.visibleUnitCodeText).textContent();
  }

  async getAllUnitsBedroomsNumber() {
    const items = this.page.locator(ProjectsObject.visibleBedroomsNumberForAllUnits);
    await items.first().waitFor({ state: 'visible', timeout: 30_000 });
    return (await items.allInnerTexts()).map((t) => t.trim());
  }

  async getAllUnitsStates() {
    const items = this.page.locator(ProjectsObject.visibleUnitStatesText);
    await items.first().waitFor({ state: 'visible', timeout: 30_000 });
    return (await items.allInnerTexts()).map((t) => t.trim());
  }

  async getAllBeneficiaryStates() {
    const items = this.page.locator(ProjectsObject.visibleBeneficiaryStatesText);
    await items.first().waitFor({ state: 'visible', timeout: 30_000 });
    return (await items.allInnerTexts()).map((t) => t.trim());
  }

  async areUnitDetailsVisible() {
    await this.page.locator(ProjectsObject.unitDetailsTable).waitFor({ state: 'visible', timeout: 30_000 });
    return await this.page.locator(ProjectsObject.unitDetailsTable).isVisible();
  }

  async areProjectFiltersVisible() {
    await this.page.locator(ProjectsObject.projectSearchFilters).waitFor({ state: 'visible', timeout: 30_000 });
    return await this.page.locator(ProjectsObject.projectSearchFilters).isVisible();
  }

  async areUnitFiltersVisible() {
    await this.page.locator(ProjectsObject.unitsFilters).waitFor({ state: 'visible', timeout: 30_000 });
    return await this.page.locator(ProjectsObject.unitsFilters).isVisible();
  }

  private async selectFilterOption(dropDownIndex: number, optionTitle: string): Promise<void> {
    const dropDownList = this.page.locator(ProjectsObject.dropDownList(dropDownIndex).css);
    const option = this.page.locator(ProjectsObject.optionWithTitle(optionTitle).css);

    await dropDownList.waitFor({ state: 'visible', timeout: 30_000 });
    await dropDownList.click();
    await option.waitFor({ state: 'visible', timeout: 30_000 });
    await option.click();
  }
}
