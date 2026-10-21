'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CommonMethods = void 0;
const test_1 = require('@playwright/test');
class CommonMethods {
  constructor(page) {
    this.page = page;
  }
  getElement(elementObject) {
    return 'xpath' in elementObject
      ? this.page.locator(elementObject.xpath)
      : 'role' in elementObject
        ? this.page.getByRole(elementObject.role, {
            name: elementObject.name,
            exact: elementObject.exact,
          })
        : this.page.getByText(elementObject.text, {
            exact: elementObject.exact,
          });
  }
  /**
   * Clicks on a locator if it is visible.
   * @param elementObject The page object describing the element to click.
   * @param options Timeout options.
   */
  async clickIfVisible(elementObject, options = {}) {
    const element = this.getElement(elementObject);
    try {
      await element.waitFor({ state: 'visible', timeout: options.timeout ?? 5000 });
    } catch (error) {
      if (error instanceof Error && error.name === 'TimeoutError') {
        return;
      }
      throw error;
    }
    await element.click(options);
  }
  async clickElement(elementObject) {
    const element = this.getElement(elementObject);
    await this.page.waitForTimeout(2000);
    await element.waitFor({ state: 'visible' });
    await element.click();
  }
  async verifyElementVisible(elementObject) {
    const element = this.getElement(elementObject);
    await element.waitFor({ state: 'visible' });
  }
  async verifyElementHasText(elementObject, value) {
    await (0, test_1.expect)(this.getElement(elementObject)).toContainText(value);
  }
  async getText(elementObject) {
    return this.getElement(elementObject).innerText();
  }
  async verifyEitherElementVisible(firstElement, secondElement) {
    const first = this.getElement(firstElement);
    const second = this.getElement(secondElement);
    await test_1.expect.poll(async () => (await first.isVisible()) || (await second.isVisible())).toBe(true);
  }
  async fill(inputField, value) {
    const input = this.getElement(inputField);
    await this.page.waitForTimeout(3000);
    await (0, test_1.expect)(input).toBeVisible();
    await input.fill(value);
  }
  async press(inputField, key) {
    const input = this.getElement(inputField);
    await (0, test_1.expect)(input).toBeVisible();
    await input.press(key);
  }
  async uploadFile(inputField, file) {
    const input = this.getElement(inputField);
    await input.setInputFiles(file);
  }
}
exports.CommonMethods = CommonMethods;
