import { type Page } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { CommonMethods } from '@pages/util/CommonMethod';
import { HomePage } from '@pages/HomePage';
import { DashboardPage } from '@pages/DashboardPage';
import { ProjectsPage } from '@pages/ProjectsPage';
import { EmployeesManagementPage } from '@pages/EmployeesManagementPage';
import { IssueAdLicensePage } from '@pages/IssueAdLicensePage';
import { ReservationManagementPage } from '@pages/ReservationManagementPage';
import { RentalBehaviorPage } from '@pages/RentalBehaviorPage';
import { ProfileDetailsPage } from '@pages/ProfileDetailsPage';

export class WebApp {
  page: Page;
  loginPage: InstanceType<typeof LoginPage>;
  commonMethods: InstanceType<typeof CommonMethods>;
  homePage: InstanceType<typeof HomePage>;
  dashboardPage: InstanceType<typeof DashboardPage>;
  projectsPage: InstanceType<typeof ProjectsPage>;
  employeesManagementPage: InstanceType<typeof EmployeesManagementPage>;
  profileDetailsPage: InstanceType<typeof ProfileDetailsPage>;
  issueAdLicensePage: InstanceType<typeof IssueAdLicensePage>;
  reservationManagementPage: InstanceType<typeof ReservationManagementPage>;
  rentalBehaviorPage: InstanceType<typeof RentalBehaviorPage>;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.commonMethods = new CommonMethods(page);
    this.dashboardPage = new DashboardPage(page);
    this.projectsPage = new ProjectsPage(page);
    this.employeesManagementPage = new EmployeesManagementPage(page);
    this.profileDetailsPage = new ProfileDetailsPage(page);
    this.issueAdLicensePage = new IssueAdLicensePage(page);
    this.reservationManagementPage = new ReservationManagementPage(page);
    this.rentalBehaviorPage = new RentalBehaviorPage(page);
  }
}
