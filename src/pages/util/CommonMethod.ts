import { expect, Locator, Page } from '@playwright/test';
type Element =
  | { readonly xpath: string }
  | {
      readonly role: Parameters<Page['getByRole']>[0];
      readonly name: string;
      readonly exact?: boolean;
    }
  | {
      readonly text: string;
      readonly exact?: boolean;
    };
export class CommonMethods {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  private getElement(elementObject: Element): Locator {
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
  async clickIfVisible(elementObject: Element, options: { timeout?: number } = {}) {
    const element = this.getElement(elementObject);
    if (await element.isVisible()) {
      await element.click(options);
    }
  }

  async clickElement(elementObject: Element) {
    const element = this.getElement(elementObject);

    await element.waitFor({ state: 'visible' });
    await element.click();
  }

  async verifyElementVisible(elementObject: Element) {
    const element = this.getElement(elementObject);

    await expect(element).toBeVisible();
  }
  async fill(inputField: Element, value: string) {
    const input = this.getElement(inputField);
    await expect(input).toBeVisible();
    await input.fill(value);
  }
}
