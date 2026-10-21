'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.IssueAdLicenseObjects = void 0;
exports.IssueAdLicenseObjects = {
  issueButton: {
    xpath: "//span[text()='إصدار']/ancestor::button",
  },
  adLicenseButton: {
    xpath: "//span[text()='رخصة إعلان']/ancestor::button",
  },
  searchInputfield: {
    xpath: "//input[@type='text']",
  },
  searchedResultCard: {
    xpath: '(//app-brokerage-contract-select/descendant::button)[1]',
  },
  confirmAndContinueButton: {
    xpath: "//button[text()=' تأكيد والاستمرار ']",
  },
  listingChannelDropdownList: {
    xpath: "//label[text()=' قناة العرض ']/following::app-multi-select/ng-select",
  },
  listingChannelOption: {
    xpath: "//div[text()='لوح إعلاني']",
  },
  priceInputfield: {
    xpath: "//input[@formcontrolname='price']",
  },
  comunicationMethodCheckbox: {
    xpath: "//span[text()='واتساب']/preceding-sibling::input",
  },
  prefferedTimeRadioButton: {
    xpath: "(//input[@name='showPreferredContactTime'])[2]",
  },
  kitchenFacility: {
    xpath: "//div[text()=' مطبخ ']",
  },
  swimmingPoolFacility: {
    xpath: "//div[text()=' مسبح ']",
  },
  waterFacility: {
    xpath: "//div[text()=' مياه ']",
  },
  createDescreptionByAIbutton: {
    xpath: "//button[@aria-describedby='description']",
  },
  descriptionTextarea: {
    xpath: "//textarea[@id='description']",
  },
  frontImage: {
    xpath: "//div[text()=' إضافة صورة واجهة المبنى ']/preceding-sibling::input[@type='file']",
  },
  addtionalImage: {
    xpath: "//div[text()=' إضافة صور إضافية ']/preceding-sibling::input[@type='file']",
  },
  agreedToTermsCheckbox: {
    xpath: "//input[@formcontrolname='agreedToTerms']",
  },
  invalidImageMessage: {
    text: 'فشل التحقق من صحة الصورة',
  },
  rejectButton: {
    xpath: "//button[text()=' رفض ']",
  },
  disclaimerCheckbox: {
    xpath: "//input[@formcontrolname='disclaimer']",
  },
  payButton: {
    xpath: "//button[text()=' الذهاب للدفع ']",
  },
  adLicneseNumber: {
    xpath: "//b[contains(text(),'تم إنشاء ترخيص الإعلان')]",
  },
  cardNumberFrame: 'iframe[name="card.number"]',
  cardNumberInput: {
    role: 'textbox',
    name: 'رقم البطاقة',
  },
  expiryDateInput: {
    role: 'textbox',
    name: 'تاريخ الانتهاء',
  },
  cardHolderNameInput: {
    role: 'textbox',
    name: 'اسم حامل البطاقة',
  },
  cvvFrame: 'iframe[name="card.cvv"]',
  cvvInput: {
    role: 'textbox',
    name: 'رمز الحماية CVV',
  },
  payNowButton: {
    role: 'button',
    name: 'إدفع الأن',
  },
  madaPaymentTitle: {
    title: 'الدفع بواسطة مدى',
  },
  listingButton: {
    xpath: "//span[contains(text(),'الاعلانات')]/parent::button",
  },
  publishedOption: {
    xpath: "//button[@id='ENUMS.LISTING_STATUS.PUBLISHED']",
  },
  underUpdatOption: {
    xpath: "//button[@id='ENUMS.LISTING_STATUS.UNDER_UPDATE']",
  },
  rejectedOption: {
    xpath: "//button[@id='ENUMS.LISTING_STATUS.REJECTED']",
  },
  hiddenOption: {
    xpath: "//button[@id='ENUMS.LISTING_STATUS.HIDDEN']",
  },
  draftOption: {
    xpath: "//button[@id='ENUMS.LISTING_STATUS.DRAFT']",
  },
  viewListingDetailsButton: {
    xpath: "//span[(text()='عرض تفاصيل الاعلان')]",
  },
  editListingButton: {
    xpath: "//span[(text()='تعديل الإعلان')]",
  },
  hideFromSakaniButton: {
    xpath: "//span[(text()='إخفاء من سكني')]",
  },
  listingDetailsPage: {
    xpath: '//app-listing-detail-view',
  },
  viewThePropertyInSakaniButton: {
    xpath: "//span[text()='عرض العقار على سكني']",
  },
  adLicenseNubmerInSakani: {
    xpath: "//span[text()='رقم رخصة الاعلان']/following-sibling::div/descendant::span[2]",
  },
  reasonHiddenDropddownList: {
    xpath: "//div[text()=' اختر سبب إجراء الاخفاء ']/following::app-single-select-dropdown",
  },
  reasonHiddenOption: {
    xpath: "//span[text()='اكتملت الصفقة']",
  },
  sendRequestButton: {
    xpath: "//button[text()=' إرسال الطلب ']",
  },
  republishToSakaniButton: {
    xpath: "//span[text()='اعادة النشر في سكني']",
  },
  saveAndConfirmButton: {
    xpath: "//button[text()=' حفظ & تاكيد ']",
  },
  successEditMessage: {
    text: 'تم تحديث الإعلان بنجاح',
  },
  closeButton: {
    xpath: "//button[contains(@class,'close-button')]",
  },
  editDescriptionText: {
    xpath: "//div[text()=' الوصف ']/following-sibling::div",
  },
};
