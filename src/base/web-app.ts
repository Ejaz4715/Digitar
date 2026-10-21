import { type Page } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { CommonMethods } from '@pages/util/CommonMethod';
import { HomePage } from '@pages/HomePage';
import { DashboardPage } from '@pages/DashboardPage';
import { ProjectsPage } from '@pages/ProjectsPage';
import { IssueAdLicensePage } from '@pages/IssueAdLicensePage';
import { ReservationManagementPage } from '@pages/ReservationManagementPage';
import { RentalBehaviourPage } from '@pages/RentalBehaviourPage';

export class WebApp {
  page: Page;
  loginPage: InstanceType<typeof LoginPage>;
  commonMethods: InstanceType<typeof CommonMethods>;
  homePage: InstanceType<typeof HomePage>;
  dashboardPage: InstanceType<typeof DashboardPage>;
  projectsPage: InstanceType<typeof ProjectsPage>;
  issueAdLicensePage: InstanceType<typeof IssueAdLicensePage>;
  reservationManagementPage: InstanceType<typeof ReservationManagementPage>;
  rentalBehaviourPage: InstanceType<typeof RentalBehaviourPage>;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.commonMethods = new CommonMethods(page);
    this.dashboardPage = new DashboardPage(page);
    this.projectsPage = new ProjectsPage(page);
    this.issueAdLicensePage = new IssueAdLicensePage(page);
    this.reservationManagementPage = new ReservationManagementPage(page);
    this.rentalBehaviourPage = new RentalBehaviourPage(page);
  }
}
