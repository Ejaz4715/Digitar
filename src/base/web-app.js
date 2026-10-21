'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.WebApp = void 0;
const LoginPage_1 = require('@pages/LoginPage');
const CommonMethod_1 = require('@pages/util/CommonMethod');
const HomePage_1 = require('@pages/HomePage');
const DashboardPage_1 = require('@pages/DashboardPage');
const ProjectsPage_1 = require('@pages/ProjectsPage');
const EmployeesManagementPage_1 = require('@pages/EmployeesManagementPage');
const IssueAdLicensePage_1 = require('@pages/IssueAdLicensePage');
const ReservationManagementPage_1 = require('@pages/ReservationManagementPage');
const RentalBehaviourPage_1 = require('@pages/RentalBehaviourPage');
const ProfileDetailsPage_1 = require('@pages/ProfileDetailsPage');
class WebApp {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage_1.LoginPage(page);
    this.homePage = new HomePage_1.HomePage(page);
    this.loginPage = new LoginPage_1.LoginPage(page);
    this.commonMethods = new CommonMethod_1.CommonMethods(page);
    this.dashboardPage = new DashboardPage_1.DashboardPage(page);
    this.projectsPage = new ProjectsPage_1.ProjectsPage(page);
    this.employeesManagementPage = new EmployeesManagementPage_1.EmployeesManagementPage(page);
    this.profileDetailsPage = new ProfileDetailsPage_1.ProfileDetailsPage(page);
    this.issueAdLicensePage = new IssueAdLicensePage_1.IssueAdLicensePage(page);
    this.reservationManagementPage = new ReservationManagementPage_1.ReservationManagementPage(page);
    this.rentalBehaviourPage = new RentalBehaviourPage_1.RentalBehaviourPage(page);
  }
}
exports.WebApp = WebApp;
