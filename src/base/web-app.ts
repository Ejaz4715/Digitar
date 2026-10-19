import { type Page } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { CommonMethods } from '@pages/util/CommonMethod';

export class WebApp {
  page: Page;
  loginPage: InstanceType<typeof LoginPage>;
  commonMethods: InstanceType<typeof CommonMethods>;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.commonMethods = new CommonMethods(page);
  }
}
