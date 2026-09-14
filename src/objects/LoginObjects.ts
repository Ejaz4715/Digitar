const LoginObjects = {
loginButtonFromMain: { role: "button", name: "تسجيل الدخول" },
loginButton: { xpath:"(//button[contains(text(),'تسجيل الدخول')])[2]"},
acceptCookiesButton: { role: "button", name: "قبول ملفات تعريف الارتباط" },
nafathPromptHeading: { role: "heading", name: "افتح تطبيق نفاذ" },
userIdInput: { xpath: "//input[@id='username']"},
continueButton: {xpath: "//button[contains(text(),'المتابعة')]"},
cancelButton: { role: "button", name: "إلغاء" },
laterButton: { role: "button", name: "لاحقاً" },
}
module.exports = { LoginObjects };