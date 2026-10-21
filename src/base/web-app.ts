import { type Page } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { CommonMethods } from '@pages/util/CommonMethod';
import { HomePage } from '@pages/HomePage';
import { DashboardPage } from '@pages/DashboardPage';
import { ProjectsPage } from '@pages/ProjectsPage';
import { EmployeesManagementPage } from '@pages/EmployeesManagementPage';
import { IssueAdLicensePage } from '@pages/IssueAdLicensePage';

export class WebApp {
  page: Page;
  loginPage: InstanceType<typeof LoginPage>;
  commonMethods: InstanceType<typeof CommonMethods>;
  homePage: InstanceType<typeof HomePage>;
  dashboardPage: InstanceType<typeof DashboardPage>;
  projectsPage: InstanceType<typeof ProjectsPage>;
  employeesManagementPage: InstanceType<typeof EmployeesManagementPage>;
  issueAdLicensePage: InstanceType<typeof IssueAdLicensePage>;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.commonMethods = new CommonMethods(page);
    this.dashboardPage = new DashboardPage(page);
    this.projectsPage = new ProjectsPage(page);
    this.employeesManagementPage = new EmployeesManagementPage(page);
    this.issueAdLicensePage = new IssueAdLicensePage(page);
  }
}
