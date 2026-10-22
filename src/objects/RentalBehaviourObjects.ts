export const RentalBehaviourObjects = {
  rentalBehaviourButton: {
    xpath: "//span[contains(text(),'السلوك الإيجاري')]/parent::button",
  },
  newRequestButton: {
    xpath: "//span[contains(text(),'طلب جديد')]/parent::button",
  },
  nationalIdInputfield: {
    xpath: "//input[@id='nationalIdInput']",
  },
  sendRequestButton: {
    role: 'button',
    name: 'إرسال الطلب',
  },
  succesfulMessage: {
    text: 'تم إرسال الطلب بنجاح',
  },
  viewRequestsButton: {
    role: 'button',
    name: 'عرض الطلبات',
  },
  requestNumber: {
    xpath: "(//div[@class='datatable-body-cell-label'])[1]",
  },
  //Payment
  reportsButton: {
    xpath: "//button[text()=' التقارير ']",
  },
  requestSearchInputfield: {
    xpath: "//input[@type='text']",
  },
  dotsButton: {
    xpath: "//button[contains(@class,'action-button')]",
  },
  payFeesOptionButton: {
    xpath: "//button[text()=' دفع الرسوم ']",
  },
  proceedToPayButton: {
    xpath: "//span[text()=' المتابعة إلى الدفع ']",
  },
  //EJAR
  userNameOrIdInputfield: {
    xpath: "//input[@data-name='username']",
  },
  passwordInputfield: {
    xpath: "//input[@data-name='password']",
  },
  loginButton: {
    xpath: "(//button/span[text()=' تسجيل الدخول '])[2]",
  },
  otpCodeInputfield: {
    xpath: "//input[@formcontrolname='otpCode']",
  },
  verifyButton: {
    xpath: "//button/span[text()=' تحقق ']",
  },
  role: {
    xpath: '(//app-user-menu-button/descendant::p)[2]',
  },
  roles: {
    xpath: "//div[@class='menu-list-item__content']/span",
  },
  requestsTabButton: {
    xpath: "//app-dropdown-menu/descendant::span[text()='الطلبات']",
  },
  viewRequestsOption: {
    xpath: "//app-dropdown-menu/descendant::span[text()='عرض الطلبات']",
  },
  filterButton: {
    xpath: "//span[text()=' التصفية ']",
  },
  requestNumberInputfield: {
    xpath: "//input[@data-name='reference']",
  },
  kebabButton: {
    xpath: '//app-single-rental-behavior-inquiry-request//app-button',
  },
  viewRequesKebabOption: {
    xpath: "//span[text()='عرض الطلب']",
  },
  termsAndConditionCheckbox: {
    xpath: "//input[@data-name='consent']",
  },
  appproveButton: {
    xpath: "//span[text()=' الموافقة ']",
  },
  confirmButton: {
    xpath: "//span[text()=' تأكيد ']",
  },
  successfulApprovalMessage: {
    text: 'رسالة نجاح',
  },
} as const;
