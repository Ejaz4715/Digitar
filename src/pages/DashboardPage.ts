import { Page } from '@playwright/test';
import { DashboardObjects } from '@objects/DashboardObjects';

export class DashboardPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isDashboardVisible(): Promise<boolean> {
    await this.page.locator(DashboardObjects.dashboardElements.css).waitFor({ state: 'attached', timeout: 90000 });
    return await this.page.locator(DashboardObjects.dashboardElements.css).isVisible();
  }

  async isBookingIndicatorVisible(): Promise<boolean> {
    await this.page.locator(DashboardObjects.bookingIndicatorImage.css).waitFor({ state: 'attached', timeout: 90000 });
    return await this.page.locator(DashboardObjects.bookingIndicatorImage.css).isVisible();
  }
}
