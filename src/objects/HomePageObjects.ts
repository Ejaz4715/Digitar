export const HomePageObjects = {
  surveyCloseButton: { css: '.survey-modal .survey-modal__close' },
  surveyCancelButton: { css: '.survey-modal button.survey-btn--secondary' },
  recommendationSurveyLaterButton: { css: 'app-survey-popup > div > div > div.survey-modal__footer > button.btn.button-outline-secondary.survey-btn.survey-btn--secondary' },
  recommendationSurveyCloseButton: { css: '.survey-modal__header .survey-modal__close' },
  newServiceModelCloseButton: { css: '.new-service-popup-content button.close-button' },
  languageSwitcherButton: { css: 'app-header > header > nav button.language-switcher' },
  dashboardIconButton: { xpath: "//span[contains(text(),'لوحة التحكم')]/.." },
  projectsIconButton: { xpath: "//span[contains(text(),'المشاريع')]/.." },
  availableOpportunities: "//img[@alt='الفرص المتاحة']/..",
} as const;
