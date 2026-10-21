'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProfileDetailsObjects = void 0;
exports.ProfileDetailsObjects = {
  userDropdownIcon: '#userDropdown > img',
  userProfileManagementButton: "//p[contains(text(),'إدارة الملف الشخصي')]/..",
  profileDetailsContent: 'app-view-profile',
  profileEditButton: 'button.edit-btn',
  experienceDropdown: '#experiences',
  employmentStatusDropdown: '#employmentStatus',
  companyName: '#companyName',
  descriptionTextArea: '.input-group textarea',
  propertySpecificationDropdown: "app-multi-select[formcontrolname='propertySpec'] ng-select",
  brokerageSpecificationDropdown: "app-multi-select[formcontrolname='brokerageSpec'] ng-select",
  saveButton: "//button[contains(text(),'حفظ')]",
  profileEditSuccessMessage: "//p[contains(text(),'تم تحديث ملفك الشخصي بنجاح.')]",
  selectOptionWithText: (option) => `//ng-dropdown-panel//span[contains(text(),'${option}')]`,
  profileImageEditIcon: "app-view-profile img[alt='editProfile']",
  profileImageFileInput: "app-edit-profile-picture input[type='file']",
  profileImageDeleteButton: "//app-edit-profile-picture//button[contains(text(),'حذف الصورة')]",
  profileImageSaveButton: 'app-edit-profile-picture button.save-btn',
  goToProfileButton: "//button[contains(text(),'انتقل إلى الملف الشخصي')]",
  usernameItem: 'app-profile-menu ul> li:nth-child(4) button.dropdown-item',
  companyAndTeamButton: '#company-tab',
  companyWebsiteField: "input[formcontrolname='website']",
  clickOCheckboxWithText: (checkboxLabel) => `//ng-dropdown-panel//*[@role='option'][.//*[normalize-space(text())='${checkboxLabel}']]`,
  navigateToCompany: (companyName) => `//p[contains(text(),'${companyName}')]/..`,
};
