export const LoginObjects = {
  loginButtonFromMain: {
    role: 'button',
    name: 'تسجيل الدخول',
  },
  loginButton: { xpath: "(//button[contains(text(),'تسجيل الدخول')])[2]" },
  acceptCookiesButton: {
    role: 'button',
    name: 'قبول ملفات تعريف الارتباط',
  },
  nafathPromptHeading: { role: 'heading', name: 'افتح تطبيق نفاذ' },
  userIdInput: {
    xpath: "//input[@id='username']",
  },
  continueButton: {
    xpath: "(//button[contains(text(),'المتابعة')])[2]",
  },
  continueWithNafathButton: {
    role: 'button',
    name: 'المتابعة مع نفاذ',
  },
  nafathIdInput: {
    role: 'textbox',
    name: 'e.g:',
  },
  cancelButton: {
    role: 'button',
    name: 'إلغاء',
    exact: true,
  },
  laterButton: {
    role: 'button',
    name: 'لاحقاً',
    exact: true,
  },
  doneButton: {
    role: 'button',
    name: 'تم',
    exact: true,
  },
} as const;
