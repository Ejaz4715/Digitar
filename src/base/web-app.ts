import { type Page } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { CommonMethods } from '@pages/util/CommonMethod';
import { ProfileDetailsPage } from '@pages/ProfileDetailsPage';
import { HomePage } from '@pages/HomePage';
import { DashboardPage } from '@pages/DashboardPage';
import { ProjectsPage } from '@pages/ProjectsPage';
import { EmployeesManagementPage } from '@pages/EmployeesManagementPage';

export class WebApp {
  page: Page;
  loginPage: InstanceType<typeof LoginPage>;
  commonMethods: InstanceType<typeof CommonMethods>;
  profileDetailsPage: InstanceType<typeof ProfileDetailsPage>;
  homePage: InstanceType<typeof HomePage>;
  dashboardPage: InstanceType<typeof DashboardPage>;
  projectsPage: InstanceType<typeof ProjectsPage>;
  employeesManagementPage: InstanceType<typeof EmployeesManagementPage>;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.profileDetailsPage = new ProfileDetailsPage(page);
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.commonMethods = new CommonMethods(page);
    this.dashboardPage = new DashboardPage(page);
    this.projectsPage = new ProjectsPage(page);
    this.employeesManagementPage = new EmployeesManagementPage(page);
  }
}
