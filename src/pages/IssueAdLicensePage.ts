import { Page, expect } from '@playwright/test';
import { IssueAdLicenseObjects } from '@objects/IssueAdLicenseObjects';
import { CommonMethods } from '@pages/util/CommonMethod';
import { Locator } from '@playwright/test';
import { PropertiesAndUnitsObjects } from '@objects/PropertiesAndUnitsObjects';

export class IssueAdLicensePage {
  page: Page;

  readonly commonMethod: CommonMethods;

  constructor(page: Page) {
    this.page = page;
    this.commonMethod = new CommonMethods(page);
  }

  //Click on issue button from dashboard
  async clickOnIssueButton() {
    this.commonMethod.clickElement(IssueAdLicenseObjects.issueButton);
  }
  //Click on ad license buttom
  async clickOnAdLicenseButton() {
    this.commonMethod.clickElement(IssueAdLicenseObjects.adLicenseButton);
  }

  //Searh for brokerage contract number or second party name
  async SearchForBrokerageContractNumberOrSecondPartyNameAndSelect(search: string) {
    this.commonMethod.fill(IssueAdLicenseObjects.searchInputfield, search);
    await this.page.waitForTimeout(5000);
    this.commonMethod.clickElement(IssueAdLicenseObjects.searchedResultCard);
  }

  //Click on confirm and continue
  async clickOnConfirmAndContinueButton() {
    await this.page.waitForTimeout(5000);
    this.commonMethod.clickElement(IssueAdLicenseObjects.confirmAndContinueButton);
  }
  //Select listing channel - liscensed platform
  async selectListingChannel() {
    this.commonMethod.clickElement(IssueAdLicenseObjects.listingChannelDropdownList);
    this.commonMethod.clickElement(IssueAdLicenseObjects.listingChannelOption);
  }
  //Enter price - more than 40000
  async enterPrice(price: string | number) {
    await this.commonMethod.fill(IssueAdLicenseObjects.priceInputfield, String(price));
  }
  //Select communication method -whatsapp
  async selectComunicationMethod() {
    this.commonMethod.clickElement(IssueAdLicenseObjects.comunicationMethodCheckbox);
  }
  //Select preefered time -no
  async selectPrefferedTime() {
    this.commonMethod.clickElement(IssueAdLicenseObjects.prefferedTimeRadioButton);
  }
  //Select any facility - kitchen - swimming pool - water
  async selectMultipleFacility() {
    this.commonMethod.clickElement(IssueAdLicenseObjects.kitchenFacility);
    this.commonMethod.clickElement(IssueAdLicenseObjects.swimmingPoolFacility);
    this.commonMethod.clickElement(IssueAdLicenseObjects.waterFacility);
  }
  //Generating description by AI
  async generatDescriptionByAI() {
    this.commonMethod.clickElement(IssueAdLicenseObjects.createDescreptionByAIbutton);
  }
  //Enter description
  async enterDescription(description: string) {
    this.commonMethod.fill(IssueAdLicenseObjects.descriptionTextarea, description);
  }
  //Upalod invalid image and validate then click on reject
  async uploadInvalidImageAndValidateTheMessage(invalidImage: string) {
    this.commonMethod.uploadFile(IssueAdLicenseObjects.frontImage, invalidImage);
    this.commonMethod.verifyElementVisible(IssueAdLicenseObjects.invalidImageMessage);
    this.commonMethod.clickElement(IssueAdLicenseObjects.rejectButton);
  }
  //Upalod fron image and addtional images
  async uploadFronAndAdditionalImages(images: string) {
    await this.page.waitForTimeout(5000);
    this.commonMethod.uploadFile(IssueAdLicenseObjects.frontImage, images);
    await this.page.waitForTimeout(8000);
    this.commonMethod.uploadFile(IssueAdLicenseObjects.addtionalImage, images);
  }
  //Check on terms agreements
  async checkOnAgrreToTerms() {
    this.commonMethod.clickElement(IssueAdLicenseObjects.agreedToTermsCheckbox);
  }
  //Check on disclaimer
  async checkOnDisclaimer() {
    this.commonMethod.clickElement(IssueAdLicenseObjects.disclaimerCheckbox);
  }
  //Click on proceed to pay
  async clickOnProceedToPay() {
    await this.page.waitForTimeout(5000);
    this.commonMethod.clickElement(IssueAdLicenseObjects.payButton);
  }
  //Verify the message and take the ad license number
  async verifySuccessMessageAndGetAdLicenseNumber() {
    await this.commonMethod.verifyElementVisible(IssueAdLicenseObjects.adLicneseNumber);
    const licenseText = await this.commonMethod.getText(IssueAdLicenseObjects.adLicneseNumber);
    const licenseNumber = licenseText.match(/رقم\s*#?(\d+)/)?.[1];

    if (!licenseNumber) {
      throw new Error(`Could not find the ad license number in text: "${licenseText}"`);
    }

    return licenseNumber;
  }

  async click(locator: Locator) {
    await locator.click();
  }

  //Click on listings button
  async clickOnListingsButton() {
    this.commonMethod.clickElement(IssueAdLicenseObjects.listingButton);
  }
  //Click on filter options and verify are selected
  async verifyTheOptionsAreSelected() {
    await this.commonMethod.clickElement(IssueAdLicenseObjects.publishedOption);
    await this.commonMethod.clickElement(IssueAdLicenseObjects.underUpdatOption);
    await this.commonMethod.clickElement(IssueAdLicenseObjects.rejectedOption);
    await this.commonMethod.clickElement(IssueAdLicenseObjects.hiddenOption);
    await this.commonMethod.clickElement(IssueAdLicenseObjects.draftOption);
    const options = [
      IssueAdLicenseObjects.publishedOption,
      IssueAdLicenseObjects.underUpdatOption,
      IssueAdLicenseObjects.rejectedOption,
      IssueAdLicenseObjects.hiddenOption,
      IssueAdLicenseObjects.draftOption,
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
  async SearchForAdLiscenseOrDeedNumbers(search: string) {
    await this.page.waitForTimeout(3000);
    this.commonMethod.fill(IssueAdLicenseObjects.searchInputfield, search);
  }
  //View the listing details
  async viewListingDetails() {
    await this.page.waitForTimeout(3000);
    await this.commonMethod.clickElement(PropertiesAndUnitsObjects.kebabButton);
    await this.commonMethod.clickElement(IssueAdLicenseObjects.viewListingDetailsButton);
    await this.commonMethod.verifyElementVisible(IssueAdLicenseObjects.listingDetailsPage);
  }
  //View the listing in sakani and verify
  async viewListingInSakani(adLicenseNumber: string) {
    const popupPromise = this.page.waitForEvent('popup');
    await this.commonMethod.clickElement(IssueAdLicenseObjects.viewThePropertyInSakaniButton);
    const sakaniPage = await popupPromise;
    await expect(sakaniPage.locator(IssueAdLicenseObjects.adLicenseNubmerInSakani.xpath)).toHaveText(adLicenseNumber);
  }
  //Edit description
  async editDescription(description: string) {
    this.commonMethod.press(IssueAdLicenseObjects.descriptionTextarea, 'Control+A');
    this.commonMethod.fill(IssueAdLicenseObjects.descriptionTextarea, description);
  }
  //Click on kebab button
  async clickOnKebabButton() {
    await this.page.waitForTimeout(3000);
    this.commonMethod.clickElement(PropertiesAndUnitsObjects.kebabButton);
  }
  //Click on edit listing
  async clickOnEditListingButton() {
    await this.page.waitForTimeout(3000);
    this.commonMethod.clickElement(IssueAdLicenseObjects.editListingButton);
  }
  //Click on save and confirm
  async clickOnSaveAndConfrimButton() {
    await this.page.waitForTimeout(3000);
    this.commonMethod.clickElement(IssueAdLicenseObjects.saveAndConfirmButton);
  }
  //Verify successful edit message
  async verifyTheSuccessfulEditMessage() {
    await this.page.waitForTimeout(3000);
    this.commonMethod.verifyElementVisible(IssueAdLicenseObjects.successEditMessage);
  }
  //Click on close X button
  async clickOnCloseButton() {
    await this.commonMethod.clickElement(IssueAdLicenseObjects.closeButton);
  }
  //Verify same edit description
  async verifySameEditDescription(editedDescription: string) {
    const element = this.page.locator(IssueAdLicenseObjects.editDescriptionText.xpath);
    await expect(element).toHaveText(editedDescription);
  }
  //Click on republish to sakani
  async clickOnRepublishToSakaniButton() {
    await this.commonMethod.clickElement(IssueAdLicenseObjects.republishToSakaniButton);
  }

  //Hide the ad
  async hideListing() {
    await this.page.waitForTimeout(3000);
    await this.commonMethod.clickElement(PropertiesAndUnitsObjects.kebabButton);
    await this.commonMethod.clickElement(IssueAdLicenseObjects.hideFromSakaniButton);
    await this.commonMethod.clickElement(IssueAdLicenseObjects.reasonHiddenDropddownList);
    await this.page.waitForTimeout(3000);
    await this.commonMethod.clickElement(IssueAdLicenseObjects.reasonHiddenOption);
    await this.commonMethod.clickElement(IssueAdLicenseObjects.sendRequestButton);
  }
  async fillCardDetails() {
    const madaPaymentTitle = this.page.getByTitle(IssueAdLicenseObjects.madaPaymentTitle.title);
    await expect(madaPaymentTitle).toBeVisible({ timeout: 120000 });
    await this.click(madaPaymentTitle);

    const cardNumber = this.page.locator(IssueAdLicenseObjects.cardNumberFrame).contentFrame().getByRole(IssueAdLicenseObjects.cardNumberInput.role, {
      name: IssueAdLicenseObjects.cardNumberInput.name,
    });
    await cardNumber.fill('4464040000000007');

    const expiryDateInput = this.page.getByRole(IssueAdLicenseObjects.expiryDateInput.role, { name: IssueAdLicenseObjects.expiryDateInput.name });
    await expiryDateInput.fill('10 / 52');

    const cardHolderNameInput = this.page.getByRole(IssueAdLicenseObjects.cardHolderNameInput.role, { name: IssueAdLicenseObjects.cardHolderNameInput.name });
    await cardHolderNameInput.fill('cvv2');

    const cvvInput = this.page.locator(IssueAdLicenseObjects.cvvFrame).contentFrame().getByRole(IssueAdLicenseObjects.cvvInput.role, {
      name: IssueAdLicenseObjects.cvvInput.name,
    });
    await cvvInput.fill('222');

    const payNowButton = this.page.getByRole(IssueAdLicenseObjects.payNowButton.role, { name: IssueAdLicenseObjects.payNowButton.name });
    await this.click(payNowButton);
  }
}
