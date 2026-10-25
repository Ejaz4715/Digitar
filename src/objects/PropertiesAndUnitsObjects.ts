export const PropertiesAndUnitsObjects = {
  propertiesAndUnitsButton: {
    xpath: "//span[contains(text(),'العقارات والوحدات')]",
  },
  propertiesAndUnitsDropdownList: {
    xpath: '//app-portfolio-selection-dropdown',
  },
  unitsOption: {
    xpath: "//span[(text()='الوحدات')]",
  },
  searchInputfield: {
    xpath: "//input[@type='text']",
  },
  filterButton: {
    xpath: "(//span[(text()=' التصفية ')])[1]",
  },
  schoolOption: {
    xpath: "//span[(text()='مدرسة')]",
  },
  landOption: {
    xpath: "//span[(text()='أرض')]",
  },
  hotelOption: {
    xpath: "//span[(text()='فندق')]",
  },
  apartmentOption: {
    xpath: "//span[(text()='شقة')]",
  },
  clearAllButton: {
    xpath: "//button[(text()=' مسح الكل ')]",
  },
  applyButton: {
    xpath: "//button[(text()=' تطبيق ')]",
  },
  noDataFoundMessage: {
    xpath: '//app-no-data-found',
  },
  viewMapButton: {
    xpath: "//span[(text()='عرض الخريطة')]",
  },
  propertyUnitCard: {
    xpath: '(//app-expendable-card)[1]',
  },
  kebabButton: {
    xpath: "(//app-expendable-card//button[@type='button'])[4]",
  },
  viewPropertyDetailsButton: {
    xpath: "//span[(text()='عرض تفاصيل العقار')]",
  },
  viewUnitDetailsButton: {
    xpath: "//span[(text()='عرض تفاصيل الوحدة')]",
  },
  moreDetailsButton: {
    xpath: "(//span[(text()=' مزيد من التفاصيل ')])[1]",
  },
  fewDetailsButton: {
    xpath: "(//span[(text()=' تفاصيل أقل ')])[1]",
  },
  propertyDetailsPage: {
    xpath: '//app-property-detail-view',
  },
  marketInsightSection: {
    xpath: '//app-detail-view-market-insight/descendant::app-info-banner',
  },
  unitDetailsPage: {
    xpath: '//app-unit-detail-view',
  },
  wasataSource: {
    xpath: "//div[text()='WASSATA']",
  },
  ejarSource: {
    xpath: "//div[text()='EJAR']",
  },
} as const;
