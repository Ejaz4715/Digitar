import { Page } from '@playwright/test';
import { OpportunitiesPoolObjects } from '@objects/OpportunitiesPoolObjects';

const DEFAULT_TIMEOUT = 30_000;

export class OpportunitiesPoolPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isOpportunitiesPoolVisible() {
    await this.page.locator(OpportunitiesPoolObjects.opportunitiesPoolPage).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    return await this.page.locator(OpportunitiesPoolObjects.opportunitiesPoolPage).isVisible();
  }

  async clickOnProjectFilterDropdown() {
    await this.page.locator(OpportunitiesPoolObjects.projectFilterDropdown).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(OpportunitiesPoolObjects.projectFilterDropdown).click();
  }

  async clickOnOpportunitiesCartButton() {
    await this.page.locator(OpportunitiesPoolObjects.opportunitiesCartButton).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(OpportunitiesPoolObjects.opportunitiesCartButton).click();
  }

  async selectProjectFromDropdown(projectName: string) {
    await this.page.locator(OpportunitiesPoolObjects.selectProject(projectName)).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(OpportunitiesPoolObjects.selectProject(projectName)).click();
    await this.page.waitForTimeout(10000);
  }

  async getFirstOpportunityNumber(): Promise<string> {
    const firstRow = this.page.locator(OpportunitiesPoolObjects.reservableOpportunityRows).first();
    await firstRow.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return (await firstRow.locator('td').first().innerText()).trim();
  }

  async clickOnFirstReserveButton() {
    const reserveButton = this.page.locator(OpportunitiesPoolObjects.firstReserveButton).first();
    await reserveButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    // Playwright's hit-test wrongly reports <app-opportunities-pool> covering the button and retries forever,
    // although the button is the top element - so skip the actionability check
    await reserveButton.click({ force: true });
  }

  async getReservableOpportunitiesCount(): Promise<number> {
    await this.page.locator(OpportunitiesPoolObjects.opportunitiesPoolPage).locator('tbody').waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await this.page.locator(OpportunitiesPoolObjects.reservableOpportunityRows).count();
  }

  async closeReservationSuccessMessage() {
    await this.page.locator(OpportunitiesPoolObjects.successMessageCloseButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(OpportunitiesPoolObjects.successMessageCloseButton).click();
    await this.page.locator(OpportunitiesPoolObjects.successMessageCloseButton).waitFor({ state: 'hidden', timeout: DEFAULT_TIMEOUT });
  }

  async tryToReserveFirstOpportunity(): Promise<boolean> {
    await this.clickOnFirstReserveButton();
    const successMessage = this.page.locator(OpportunitiesPoolObjects.reservationSuccessMessage);
    const anyPopup = this.page.locator(OpportunitiesPoolObjects.visibleMessagePopup);
    await successMessage.or(anyPopup).first().waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await successMessage.isVisible();
  }

  async isReservationLimitMessageVisible(limitMessage: string): Promise<boolean> {
    const popup = this.page.locator(OpportunitiesPoolObjects.visibleMessagePopup).filter({ hasText: limitMessage });
    await popup.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await popup.isVisible();
  }

  async clickOnCartFromSuccessMessage() {
    await this.page.locator(OpportunitiesPoolObjects.successMessageCartButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(OpportunitiesPoolObjects.successMessageCartButton).click();
  }

  async isOpportunityInCart(opportunityNumber: string): Promise<boolean> {
    await this.page.locator(OpportunitiesPoolObjects.cartTable).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await this.page.locator(OpportunitiesPoolObjects.cartRowByOpportunity(opportunityNumber)).isVisible();
  }

  async getUpdatableOpportunityNumbers(): Promise<string[]> {
    await this.page.locator(OpportunitiesPoolObjects.cartTable).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    const numbers = await this.page.locator(OpportunitiesPoolObjects.updatableCartRows).locator('td:first-child').allInnerTexts();
    return numbers.map((number) => number.trim());
  }

  async updateOpportunityStatus(opportunityNumber: string, status: string, reason: string) {
    const row = this.page.locator(OpportunitiesPoolObjects.cartRowByOpportunity(opportunityNumber));
    await row.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    // the status menu opens at a fixed position under the row, so for lower rows it ends up below the viewport
    // where it can not be scrolled to - centre the row first and click the option directly
    await row.evaluate((element) => element.scrollIntoView({ block: 'center' }));
    await row.locator(OpportunitiesPoolObjects.statusTrigger).click();

    await row.locator(OpportunitiesPoolObjects.statusOption(status)).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await row.locator(OpportunitiesPoolObjects.statusOption(status)).dispatchEvent('click');

    await row.locator(OpportunitiesPoolObjects.statusReasonTextarea).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await row.locator(OpportunitiesPoolObjects.statusReasonTextarea).fill(reason);
    await row.locator(OpportunitiesPoolObjects.statusReasonSubmitButton).click();
  }

  async isStatusUpdateSuccessMessageVisible(): Promise<boolean> {
    await this.page.locator(OpportunitiesPoolObjects.statusUpdateSuccessMessage).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await this.page.locator(OpportunitiesPoolObjects.statusUpdateSuccessMessage).isVisible();
  }

  async closeStatusUpdateSuccessMessage() {
    await this.page.locator(OpportunitiesPoolObjects.statusUpdateSuccessCloseButton).click();
    await this.page.locator(OpportunitiesPoolObjects.statusUpdateSuccessMessage).waitFor({ state: 'hidden', timeout: DEFAULT_TIMEOUT });
  }

  async isReservationSuccessMessageVisible() {
    await this.page.locator(OpportunitiesPoolObjects.reservationSuccessMessage).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    return await this.page.locator(OpportunitiesPoolObjects.reservationSuccessMessage).isVisible();
  }
}
