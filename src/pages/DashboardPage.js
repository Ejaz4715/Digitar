'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DashboardPage = void 0;
const DashboardObjects_1 = require('@objects/DashboardObjects');
class DashboardPage {
  constructor(page) {
    this.page = page;
  }
  async isDashboardVisible() {
    await this.page.locator(DashboardObjects_1.DashboardObjects.dashboardElements.css).waitFor({ state: 'attached', timeout: 90000 });
    return await this.page.locator(DashboardObjects_1.DashboardObjects.dashboardElements.css).isVisible();
  }
  async isBookingIndicatorVisible() {
    await this.page.locator(DashboardObjects_1.DashboardObjects.bookingIndicatorImage.css).waitFor({ state: 'attached', timeout: 90000 });
    return await this.page.locator(DashboardObjects_1.DashboardObjects.bookingIndicatorImage.css).isVisible();
  }
}
exports.DashboardPage = DashboardPage;
