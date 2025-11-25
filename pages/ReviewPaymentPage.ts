import { Page, FrameLocator, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ReviewPaymentPage extends BasePage {
  public readonly paymentForm: Locator;
  public readonly paymentFrame: FrameLocator;

  public readonly cardNumberInput: Locator;
  public readonly expiryDateInput: Locator;
  public readonly cvcInput: Locator;
  public readonly countryDropDown: Locator;
  public readonly zipCodeInput: Locator;

  public readonly byProvidingCardInformationText: Locator;

  public readonly productPriceText: Locator;
  public readonly productPriceAmount: Locator;

  public readonly installmentPriceText: Locator;
  public readonly installmentPriceAmount: Locator;

  public readonly subtotalText: Locator;
  public readonly subtotalAmount: Locator;

  public readonly processingFeeText: Locator;
  public readonly processingFeeAmount: Locator;

  public readonly totalText: Locator;
  public readonly totalAmount: Locator;

  public readonly termsAndConditionsCheckbox: Locator;
  public readonly termsAndConditionsLink: Locator;
  public readonly payButton: Locator;

  public readonly cardNumberErrorMessage: Locator;
  public readonly cardExpiryErrorMessage: Locator;
  public readonly cardCVCErrorMessage: Locator;
  public readonly cardZipErrorMessage: Locator;

  public readonly progressBar: Locator;
  public readonly backButton: Locator;
  public readonly footerText: Locator;

  public readonly readAgreeTerms: Locator;
  public readonly termsAgreementTextPop: Locator;

  public readonly confirmationBox: Locator;
  public readonly confirmationBoxSuccess: Locator;

  public readonly step1Container: Locator;
  public readonly step2Container: Locator;
  public readonly step3Container: Locator;

  constructor(page: Page) {
    super(page);

    this.paymentForm = this.locator("//form[@id='payment-form']");

    this.paymentFrame = this.frameLocator(
      "(//iframe[contains(@title, 'Secure payment')])[1]"
    );

    this.cardNumberInput = this.paymentFrame.locator(
      "(//input[@type='text'])[1]"
    );

    this.expiryDateInput = this.paymentFrame.locator(
      "(//input[@type='text'])[2]"
    );

    this.cvcInput = this.paymentFrame.locator("(//input[@type='text'])[3]");

    this.countryDropDown = this.paymentFrame.locator(
      "//select[@name = 'country']"
    );

    this.zipCodeInput = this.paymentFrame.locator("(//input[@type='text'])[4]");

    this.byProvidingCardInformationText = this.locator(
      "//p[contains(., 'By providing your card information')]"
    );

    this.productPriceText = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Product Price')]"
    );

    this.productPriceAmount = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Product Price')]/following-sibling::span"
    );

    this.installmentPriceText = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installment Price')]"
    );

    this.installmentPriceAmount = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installment Price')]/following-sibling::span"
    );

    this.subtotalText = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Subtotal')]"
    );

    this.subtotalAmount = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Subtotal')]/following-sibling::span"
    );

    this.processingFeeText = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Processing')]"
    );

    this.processingFeeAmount = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Processing')]/following-sibling::span"
    );

    this.totalText = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Total')]"
    );

    this.totalAmount = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Total')]/following-sibling::span"
    );

    this.termsAndConditionsCheckbox = this.locator(
      "//input[@type = 'checkbox']"
    );

    this.termsAndConditionsLink = this.locator(
      "//u[normalize-space()='Terms and Conditions']"
    );

    this.payButton = this.locator("//button[@type='button']");

    this.cardNumberErrorMessage = this.paymentFrame.locator(
      "//p[@id='Field-numberError' and @role='alert']"
    );

    this.cardExpiryErrorMessage = this.paymentFrame.locator(
      "//p[@id='Field-expiryError' and @class='p-FieldError Error' and @role='alert']"
    );

    this.cardCVCErrorMessage = this.paymentFrame.locator(
      "//p[@id='Field-cvcError' and @class='p-FieldError Error' and @role='alert']"
    );

    this.cardZipErrorMessage = this.paymentFrame.locator(
      "//p[@id='Field-postalCodeError' and @class='p-FieldError Error' and @role='alert']"
    );

    this.progressBar = this.locator("//mat-spinner[@role='progressbar']");

    this.backButton = this.locator("(//span[@class='back-button'])[2]");

    this.footerText = this.locator(
      "(//p[@class = 'footer-text' and contains(text(), 'Need help?')])[3]"
    );

    this.readAgreeTerms = this.locator(
      "//div[3]/div[4]/div[1]/div[2]/div/div[6]"
    );

    this.termsAgreementTextPop = this.locator(
      "//h1[@id='mat-mdc-dialog-title-0']"
    );

    this.confirmationBox = this.locator(
      "//div[contains(., 'Payments confirmation')][contains(@class,'ng-star-inserted')]"
    );

    this.confirmationBoxSuccess = this.locator(
      "//div[contains(@class,'success-container') or contains(., 'Payment successful')]"
    );

    this.step1Container = this.locator(
      "//div[contains(concat(' ', normalize-space(@class), ' '), ' step ')][.//div[contains(@class,'step-circle')]/span[normalize-space()='1']]"
    );

    this.step2Container = this.locator(
      "//div[contains(concat(' ', normalize-space(@class), ' '), ' step ')][.//div[contains(@class,'step-circle')]/span[normalize-space()='2']]"
    );

    this.step3Container = this.locator(
      "//div[contains(concat(' ', normalize-space(@class), ' '), ' step ')][.//div[contains(@class,'step-circle')]/span[normalize-space()='3']]"
    );
  }

  public async enterCardNumber(
    cardNumber: string = process.env.CARD_NUMBER as string
  ): Promise<void> {
    await this.cardNumberInput.fill(cardNumber);
  }

  public async enterExpiryDate(
    expiryDate: string = process.env.CARD_EXPIRATION_DATE as string
  ): Promise<void> {
    await this.expiryDateInput.fill(expiryDate);
  }

  public async enterCVC(
    cvc: string = process.env.CARD_SECURITY_CODE as string
  ): Promise<void> {
    await this.cvcInput.fill(cvc);
  }

  public async enterZipCode(
    zipCode: string = process.env.ZIP_CODE as string
  ): Promise<void> {
    await this.zipCodeInput.fill(zipCode);
  }

  public async clickTermsAndConditionsCheckbox(): Promise<void> {
    await this.termsAndConditionsCheckbox.click();
  }

  public async clickBackButton(): Promise<void> {
    await this.backButton.click();
  }

  public async clickPayButton(): Promise<void> {
    await this.payButton.click();
  }
}