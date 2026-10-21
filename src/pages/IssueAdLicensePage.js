'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.IssueAdLicensePage = void 0;
const test_1 = require('@playwright/test');
const IssueAdLicenseObjects_1 = require('@objects/IssueAdLicenseObjects');
const CommonMethod_1 = require('@pages/util/CommonMethod');
const PropertiesAndUnitsObjects_1 = require('@objects/PropertiesAndUnitsObjects');
class IssueAdLicensePage {
  constructor(page) {
    this.page = page;
    this.commonMethod = new CommonMethod_1.CommonMethods(page);
  }
  //Click on issue button from dashboard
  async clickOnIssueButton() {
    this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.issueButton);
  }
  //Click on ad license buttom
  async clickOnAdLicenseButton() {
    this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.adLicenseButton);
  }
  //Searh for brokerage contract number or second party name
  async SearchForBrokerageContractNumberOrSecondPartyNameAndSelect(search) {
    this.commonMethod.fill(IssueAdLicenseObjects_1.IssueAdLicenseObjects.searchInputfield, search);
    await this.page.waitForTimeout(5000);
    this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.searchedResultCard);
  }
  //Click on confirm and continue
  async clickOnConfirmAndContinueButton() {
    await this.page.waitForTimeout(5000);
    this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.confirmAndContinueButton);
  }
  //Select listing channel - liscensed platform
  async selectListingChannel() {
    this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.listingChannelDropdownList);
    this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.listingChannelOption);
  }
  //Enter price - more than 40000
  async enterPrice(price) {
    await this.commonMethod.fill(IssueAdLicenseObjects_1.IssueAdLicenseObjects.priceInputfield, String(price));
  }
  //Select communication method -whatsapp
  async selectComunicationMethod() {
    this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.comunicationMethodCheckbox);
  }
  //Select preefered time -no
  async selectPrefferedTime() {
    this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.prefferedTimeRadioButton);
  }
  //Select any facility - kitchen - swimming pool - water
  async selectMultipleFacility() {
    this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.kitchenFacility);
    this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.swimmingPoolFacility);
    this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.waterFacility);
  }
  //Generating description by AI
  async generatDescriptionByAI() {
    this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.createDescreptionByAIbutton);
  }
  //Enter description
  async enterDescription(description) {
    this.commonMethod.fill(IssueAdLicenseObjects_1.IssueAdLicenseObjects.descriptionTextarea, description);
  }
  //Upalod invalid image and validate then click on reject
  async uploadInvalidImageAndValidateTheMessage(invalidImage) {
    this.commonMethod.uploadFile(IssueAdLicenseObjects_1.IssueAdLicenseObjects.frontImage, invalidImage);
    this.commonMethod.verifyElementVisible(IssueAdLicenseObjects_1.IssueAdLicenseObjects.invalidImageMessage);
    this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.rejectButton);
  }
  //Upalod fron image and addtional images
  async uploadFronAndAdditionalImages(images) {
    await this.page.waitForTimeout(5000);
    this.commonMethod.uploadFile(IssueAdLicenseObjects_1.IssueAdLicenseObjects.frontImage, images);
    await this.page.waitForTimeout(8000);
    this.commonMethod.uploadFile(IssueAdLicenseObjects_1.IssueAdLicenseObjects.addtionalImage, images);
  }
  //Check on terms agreements
  async checkOnAgrreToTerms() {
    this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.agreedToTermsCheckbox);
  }
  //Check on disclaimer
  async checkOnDisclaimer() {
    this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.disclaimerCheckbox);
  }
  //Click on proceed to pay
  async clickOnProceedToPay() {
    await this.page.waitForTimeout(5000);
    this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.payButton);
  }
  //Verify the message and take the ad license number
  async verifySuccessMessageAndGetAdLicenseNumber() {
    await this.commonMethod.verifyElementVisible(IssueAdLicenseObjects_1.IssueAdLicenseObjects.adLicneseNumber);
    const licenseText = await this.commonMethod.getText(IssueAdLicenseObjects_1.IssueAdLicenseObjects.adLicneseNumber);
    const licenseNumber = licenseText.match(/رقم\s*#?(\d+)/)?.[1];
    if (!licenseNumber) {
      throw new Error(`Could not find the ad license number in text: "${licenseText}"`);
    }
    return licenseNumber;
  }
  async click(locator) {
    await locator.click();
  }
  //Click on listings button
  async clickOnListingsButton() {
    this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.listingButton);
  }
  //Click on filter options and verify are selected
  async verifyTheOptionsAreSelected() {
    await this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.publishedOption);
    await this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.underUpdatOption);
    await this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.rejectedOption);
    await this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.hiddenOption);
    await this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.draftOption);
    const options = [
      IssueAdLicenseObjects_1.IssueAdLicenseObjects.publishedOption,
      IssueAdLicenseObjects_1.IssueAdLicenseObjects.underUpdatOption,
      IssueAdLicenseObjects_1.IssueAdLicenseObjects.rejectedOption,
      IssueAdLicenseObjects_1.IssueAdLicenseObjects.hiddenOption,
      IssueAdLicenseObjects_1.IssueAdLicenseObjects.draftOption,
    ];
    for (const option of options) {
      const isSelected = await this.page.locator(option.xpath).evaluate((element) => element.classList.contains('selected'));
      if (isSelected) {
        return true;
      }
    }
    return false;
  }
  //Searh for ad liscnes or deed numbers
  async SearchForAdLiscenseOrDeedNumbers(search) {
    await this.page.waitForTimeout(3000);
    this.commonMethod.fill(IssueAdLicenseObjects_1.IssueAdLicenseObjects.searchInputfield, search);
  }
  //View the listing details
  async viewListingDetails() {
    await this.page.waitForTimeout(3000);
    await this.commonMethod.clickElement(PropertiesAndUnitsObjects_1.PropertiesAndUnitsObjects.kebabButton);
    await this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.viewListingDetailsButton);
    await this.commonMethod.verifyElementVisible(IssueAdLicenseObjects_1.IssueAdLicenseObjects.listingDetailsPage);
  }
  //View the listing in sakani and verify
  async viewListingInSakani(adLicenseNumber) {
    const popupPromise = this.page.waitForEvent('popup');
    await this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.viewThePropertyInSakaniButton);
    const sakaniPage = await popupPromise;
    await (0, test_1.expect)(sakaniPage.locator(IssueAdLicenseObjects_1.IssueAdLicenseObjects.adLicenseNubmerInSakani.xpath)).toHaveText(adLicenseNumber);
  }
  //Edit description
  async editDescription(description) {
    this.commonMethod.press(IssueAdLicenseObjects_1.IssueAdLicenseObjects.descriptionTextarea, 'Control+A');
    this.commonMethod.fill(IssueAdLicenseObjects_1.IssueAdLicenseObjects.descriptionTextarea, description);
  }
  //Click on kebab button
  async clickOnKebabButton() {
    await this.page.waitForTimeout(3000);
    this.commonMethod.clickElement(PropertiesAndUnitsObjects_1.PropertiesAndUnitsObjects.kebabButton);
  }
  //Click on edit listing
  async clickOnEditListingButton() {
    await this.page.waitForTimeout(3000);
    this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.editListingButton);
  }
  //Click on save and confirm
  async clickOnSaveAndConfrimButton() {
    await this.page.waitForTimeout(3000);
    this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.saveAndConfirmButton);
  }
  //Verify successful edit message
  async verifyTheSuccessfulEditMessage() {
    await this.page.waitForTimeout(3000);
    this.commonMethod.verifyElementVisible(IssueAdLicenseObjects_1.IssueAdLicenseObjects.successEditMessage);
  }
  //Click on close X button
  async clickOnCloseButton() {
    await this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.closeButton);
  }
  //Verify same edit description
  async verifySameEditDescription(editedDescription) {
    const element = this.page.locator(IssueAdLicenseObjects_1.IssueAdLicenseObjects.editDescriptionText.xpath);
    await (0, test_1.expect)(element).toHaveText(editedDescription);
  }
  //Click on republish to sakani
  async clickOnRepublishToSakaniButton() {
    await this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.republishToSakaniButton);
  }
  //Hide the ad
  async hideListing() {
    await this.page.waitForTimeout(3000);
    await this.commonMethod.clickElement(PropertiesAndUnitsObjects_1.PropertiesAndUnitsObjects.kebabButton);
    await this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.hideFromSakaniButton);
    await this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.reasonHiddenDropddownList);
    await this.page.waitForTimeout(3000);
    await this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.reasonHiddenOption);
    await this.commonMethod.clickElement(IssueAdLicenseObjects_1.IssueAdLicenseObjects.sendRequestButton);
  }
  async fillCardDetails() {
    const madaPaymentTitle = this.page.getByTitle(IssueAdLicenseObjects_1.IssueAdLicenseObjects.madaPaymentTitle.title);
    await (0, test_1.expect)(madaPaymentTitle).toBeVisible({ timeout: 120000 });
    await this.click(madaPaymentTitle);
    const cardNumber = this.page.locator(IssueAdLicenseObjects_1.IssueAdLicenseObjects.cardNumberFrame).contentFrame().getByRole(IssueAdLicenseObjects_1.IssueAdLicenseObjects.cardNumberInput.role, {
      name: IssueAdLicenseObjects_1.IssueAdLicenseObjects.cardNumberInput.name,
    });
    await cardNumber.fill('4464040000000007');
    const expiryDateInput = this.page.getByRole(IssueAdLicenseObjects_1.IssueAdLicenseObjects.expiryDateInput.role, { name: IssueAdLicenseObjects_1.IssueAdLicenseObjects.expiryDateInput.name });
    await expiryDateInput.fill('10 / 52');
    const cardHolderNameInput = this.page.getByRole(IssueAdLicenseObjects_1.IssueAdLicenseObjects.cardHolderNameInput.role, {
      name: IssueAdLicenseObjects_1.IssueAdLicenseObjects.cardHolderNameInput.name,
    });
    await cardHolderNameInput.fill('cvv2');
    const cvvInput = this.page.locator(IssueAdLicenseObjects_1.IssueAdLicenseObjects.cvvFrame).contentFrame().getByRole(IssueAdLicenseObjects_1.IssueAdLicenseObjects.cvvInput.role, {
      name: IssueAdLicenseObjects_1.IssueAdLicenseObjects.cvvInput.name,
    });
    await cvvInput.fill('222');
    const payNowButton = this.page.getByRole(IssueAdLicenseObjects_1.IssueAdLicenseObjects.payNowButton.role, { name: IssueAdLicenseObjects_1.IssueAdLicenseObjects.payNowButton.name });
    await this.click(payNowButton);
  }
}
exports.IssueAdLicensePage = IssueAdLicensePage;
