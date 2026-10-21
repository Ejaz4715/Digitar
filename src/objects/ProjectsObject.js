'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProjectsObject = void 0;
exports.ProjectsObject = {
  projectElements: { css: 'app-projects' },
  projectShowDetailsButton: 'tbody > tr:nth-child(1) button',
  projectDetailsContent: '.section-content',
  projectUnitsButton: "//button[contains(text(),'وحدات المشروع')]",
  projectUnitsTable: 'app-project-units',
  unitDetailsTable: 'app-project-unit-detail',
  unitCodeSearchField: "input[formcontrolname='code_or_number__match']",
  visibleUnitCodeText: 'tbody >tr:nth-child(1) > td:nth-child(1)',
  bedroomsNumberDropdown: "//span[contains(text(),'غرف النوم')]/..",
  unitStateDropdown: "//span[contains(text(),'حالة الوحدة')]/..",
  visibleBedroomsNumberForAllUnits: 'tbody > tr > td:nth-child(3)',
  visibleUnitStatesText: 'tbody > tr > td:nth-child(5)',
  visibleBeneficiaryStatesText: 'tbody > tr > td:nth-child(7)',
  filterButton: 'app-filter-modal >button',
  beneficiaryButton: '(//app-project-units/app-project-unit-filters//button)[4]',
  nonBeneficiaryButton: '(//app-project-units/app-project-unit-filters//button)[5]',
  filterApplyButton: "//button[contains(text(),' تطبيق ')]",
  filterClearButton: "//button[contains(text(),' مسح الكل ')]",
  projectSearchFilters: '//app-dropdown-filter/..',
  unitsFilters: 'app-project-unit-filters',
  stateDropdownOption: (option) => `//li/button[normalize-space()='${option}']`,
  dropDownList: (n) => ({ css: `app-projects app-dropdown-filter:nth-child(${n})` }),
  optionWithTitle: (title) => ({ css: `button[title*='${title}']` }),
  visibleTextAt: (n) => ({ css: `tbody > tr >td:nth-child(${n})` }),
};
