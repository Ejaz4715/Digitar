'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReservationManagementObjects = void 0;
exports.ReservationManagementObjects = {
  reservationManagementButton: {
    xpath: "//span[contains(text(),'إدارة الحجوزات')]/parent::button",
  },
  newReservationButton: {
    xpath: "//span[contains(text(),'حجز جديد')]/parent::button",
  },
  nationalIdInputfield: {
    xpath: "//input[@id='nationalIdInput']",
  },
  searchButton: {
    role: 'button',
    name: 'بحث',
  },
  nextButton: {
    role: 'button',
    name: 'التالي',
  },
  firstUnitCheckbox: {
    xpath: "(//input[@type='checkbox'])[1]",
  },
  bankDropddownList: {
    xpath: "//select[@id='bankSelect']",
  },
  bankOption: {
    xpath: "//option[text()=' بنك البلاد ']",
  },
  unitCode: {
    xpath: "//div[text()=' رمز الوحدة ']/following-sibling::div",
  },
  confirmReservationButton: {
    role: 'button',
    name: 'تأكيد الحجز',
  },
  successReservationMessage: {
    text: 'تم تأكيد الحجز بنجاح',
  },
  searchInputfield: {
    xpath: "//input[@placeholder='ابحث برمز الوحدة أو رقم الهوية']",
  },
  viewDetailsButton: {
    xpath: "(//button[text()=' عرض التفاصيل '])[1]",
  },
  reservationDetailsTabButton: {
    role: 'button',
    name: 'تفاصيل الحجز',
  },
  reservationCancelReasonDrodpwnList: {
    xpath: "//span[text()=' إلغاء الحجز ']/parent::div/descendant::select",
  },
  reservationCancelReasonOption: {
    xpath: "//option[text()=' الانتقال لمشروع آخر ']",
  },
  reservationCancelButton: {
    role: 'button',
    name: 'إلغاء الحجز',
  },
  yesCancelButton: {
    role: 'button',
    name: 'نعم، إلغاء',
  },
  otpInputField: {
    xpath: "//div[contains(@class,'otp-inputs')]/input",
  },
  confirmCodeButton: {
    role: 'button',
    name: 'تأكيد الرمز',
  },
  reservationStatus: {
    xpath: "//span[text()=' حالة عقد البيع ']/following-sibling::span",
  },
  //Parteners
  bookingSearchInput: {
    role: 'textbox',
    name: 'ابحث برمز الوحدة أو رقم الهوية',
  },
  manageReservationsButton: "//span[contains(text(),' إدارة الحجوزات')]/../..",
  individualBooking: "//span[contains(text(),'الحجوزات الفردية')]/../..",
  bookingFilterStatusDropdown: "//div[normalize-space() = 'الحالة']/ancestor::app-sapa-dropdown-v2",
  bookingFilterStatusOptions(option) {
    return `//div[@role='option']/descendant::span[normalize-space() = '${option}']`;
  },
  loginButton: {
    xpath: "//a[text()='تسجيل الدخول']",
  },
  acceptCookiesModal: '#acceptCookiesModal',
  acceptCookiesButton: {
    role: 'button',
    name: 'قبول ملفات تعريف الارتباط',
  },
  closeCookiesModal: '.svg-icon.icon-close-dark',
  usernameInput: {
    xpath: "//input[@id='username']",
  },
  nafathModel: '//app-nafath-login-modal',
  loginToButton: {
    xpath: "(//button[text()=' تسجيل الدخول '])[2]",
  },
  continueButton: {
    xpath: "//button[text()=' المتابعة ']",
  },
  profileIcon: '.svg-icon.svg-icon-v2-24.icon-profile-white-v2',
  switchRoleButton: {
    role: 'button',
    name: 'التبديل إلى',
  },
  developerRoleText: 'شركة تطوير عقارية',
  menuIcon: '.svg-icon.svg-icon-v2-24.icon-menu-v2',
  verifyOTPButton: {
    role: 'button',
    name: 'تحقق',
  },
  otpDigitInput: {
    role: 'spinbutton',
    name: 'X',
  },
  confirmAndContinueButton: {
    role: 'button',
    name: 'تأكيد ومتابعة',
  },
  goToDashboardButton: {
    role: 'button',
    name: 'انتقل إلى لوحة المعلومات',
  },
  reservedUniCode: {
    xpath: '(//datatable-body-cell)[7]/descendant::div[2]',
  },
};
