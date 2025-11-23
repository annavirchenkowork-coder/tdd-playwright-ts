import { FrameLocator, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ReviewPaymentPage extends BasePage {

  public readonly paymentForm: Locator 
    = this.locator("//form[@id='payment-form']");

  public readonly paymentFrame: FrameLocator 
    = this.frameLocator("(//iframe[contains(@title, 'Secure payment')])[1]");

  public readonly cardNumberInput: Locator 
    = this.paymentFrame.locator("(//input[@type='text'])[1]");

  public readonly expiryDateInput: Locator 
    = this.paymentFrame.locator("(//input[@type='text'])[2]");

  public readonly cvcInput: Locator 
    = this.paymentFrame.locator("(//input[@type='text'])[3]");

  public readonly countryDropDown: Locator 
    = this.paymentFrame.locator("//select[@name = 'country']");

  public readonly zipCodeInput: Locator 
    = this.paymentFrame.locator("(//input[@type='text'])[4]");

  public readonly byProvidingCardInformationText: Locator 
    = this.locator("//p[contains(., 'By providing your card information')]");

  public readonly productPriceText: Locator 
    = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Product Price')]");

  public readonly productPriceAmount: Locator 
    = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Product Price')]/following-sibling::span");

  public readonly installmentPriceText: Locator 
    = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installment Price')]");

  public readonly installmentPriceAmount: Locator 
    = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installment Price')]/following-sibling::span");

  public readonly subtotalText: Locator 
    = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Subtotal')]");

  public readonly subtotalAmount: Locator 
    = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Subtotal')]/following-sibling::span");

  public readonly processingFeeText: Locator 
    = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Processing')]");

  public readonly processingFeeAmount: Locator 
    = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Processing')]/following-sibling::span");

  public readonly totalText: Locator 
    = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Total')]");

  public readonly totalAmount: Locator 
    = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Total')]/following-sibling::span");

  public readonly termsAndConditionsCheckbox: Locator 
    = this.locator("//input[@type = 'checkbox']");

  public readonly termsAndConditionsLink: Locator 
    = this.locator("//u[normalize-space()='Terms and Conditions']");

  public readonly payButton: Locator 
    = this.locator("//button[@type='button']");

  public readonly cardNumberErrorMessage: Locator 
    = this.paymentFrame.locator("//p[@id='Field-numberError' and @class='p-FieldError Error' and @role='alert']");

  public readonly backButton: Locator 
    = this.locator("(//span[@class='back-button'])[2]");

  public readonly footerText: Locator 
    = this.locator("(//p[@class = 'footer-text' and contains(text(), 'Need help?')])[3]");

  public readonly cardExpiryErrorMessage: Locator 
    = this.paymentFrame.locator("//p[@id='Field-expiryError' and @class='p-FieldError Error' and @role='alert']");

  public readonly cardCVCErrorMessage: Locator 
    = this.paymentFrame.locator("//p[@id='Field-cvcError' and @class='p-FieldError Error' and @role='alert']");

  public readonly zipCodeErrorMessage: Locator 
    = this.paymentFrame.locator("//p[@id='Field-postalCodeError' and @class='p-FieldError Error' and @role='alert']");

  public readonly progressBar: Locator 
    = this.locator("//mat-spinner[@role='progressbar']");

  public readonly termsAndConditionsCheckBox: Locator 
    = this.locator("//input[@type='checkbox']");

    /*
    <input _ngcontent-ng-c3758746842="" type="checkbox" id="defaultCheck2" class="form-check-input ng-untouched ng-pristine ng-valid" ng-reflect-model="false">
    */

  public readonly readAgreeTerms: Locator 
    = this.locator("//div[3]/div[4]/div[1]/div[2]/div/div[6]");

  public readonly termsAgreementTextPop: Locator 
    = this.locator("//h1[@id='mat-mdc-dialog-title-0']");

  public async enterCardNumber(cardNumber: string = process.env.CARD_NUMBER as string) {
    await this.cardNumberInput.fill(cardNumber);
  }

  public async enterExpiryDate(expiryDate: string = process.env.CARD_EXPIRATION_DATE as string) {
    await this.expiryDateInput.fill(expiryDate);
  }

  public async enterCVC(cvc: string = process.env.CARD_SECURITY_CODE as string) {
    await this.cvcInput.fill(cvc);
  }

  public async enterZipCode(zipCode: string = process.env.ZIP_CODE as string) {
    await this.zipCodeInput.fill(zipCode);
  }

  public async clickTermsAndConditionsCheckbox() {
    await this.termsAndConditionsCheckbox.click();
  }

  public async clickBackButton() {
    await this.backButton.click();
  }

  public async clickPayButton() {
    await this.payButton.click();
  }




}