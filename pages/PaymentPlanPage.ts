import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PaymentPlanPage extends BasePage {
  public readonly chooseAPaymentPlanText: Locator;
  public readonly upfrontPaymentOption: Locator;
  public readonly upfrontPaymentAmount: Locator;
  public readonly payOnceTextUpFront: Locator;
  public readonly upfrontPaymentFrame: Locator;
  public readonly upfrontPanelContent: Locator;
  public readonly installmentsPanelContent: Locator;

  public readonly greenBadgeUpfrontDiscount: Locator;
  public readonly greenBadgeElectricBoltUpfrontDiscount: Locator;
  public readonly greenBadgeTextUpfrontDiscount: Locator;
  public readonly couponAvailableBadgeUpfrontDiscount: Locator;
  public readonly couponBoxCloseBtnX: Locator;

  public readonly basePriceTextUnderUpfront: Locator;
  public readonly basePriceAmountUnderUpfront: Locator;
  public readonly upfrontDiscountTextUnderUpfront: Locator;
  public readonly upfrontDiscountAmountUnderUpfront: Locator;
  public readonly iHaveAPromoCodeButtonUnderUpfront: Locator;
  public readonly subtotalTextUnderUpfront: Locator;
  public readonly subtotalAmountUnderUpfront: Locator;
  public readonly excludingFeesTextUnderUpfront: Locator;

  public readonly installmentsPaymentOption: Locator;
  public readonly installmentsPaymentFrame: Locator;
  public readonly installmentsPaymentAmount: Locator;
  public readonly perMonthTextInstallments: Locator;
  public readonly couponAvailableBadgeInstallments: Locator;
  public readonly basePriceTextUnderInstallments: Locator;
  public readonly basePriceAmountUnderInstallments: Locator;
  public readonly installmentsTextUnderInstallments: Locator;
  public readonly installmentsNumberUnderInstallments: Locator;
  public readonly pricePerInstallmentsTextUnderInstallments: Locator;
  public readonly pricePerInstallmentsAmountUnderInstallments: Locator;
  public readonly dueTodayTextUnderInstallments: Locator;
  public readonly firstMonthPaymentTextUnderInstallments: Locator;
  public readonly firstMonthPaymentAmountUnderInstallments: Locator;
  public readonly excludingFeesTextUnderInstallments: Locator;
  public readonly iHaveAPromoCodeButtonUnderInstallments: Locator;

  public readonly inactiveNextButton: Locator;
  public readonly activeNextButton: Locator;
  public readonly backButton: Locator;
  public readonly footerText: Locator;
  public readonly paymentPlanBoxes: Locator;
  public readonly step1: Locator;
  public readonly step2: Locator;
  public readonly step3: Locator;
  public readonly upfrontText: Locator;

  constructor(page: Page) {
    super(page);

    this.chooseAPaymentPlanText = this.locator(
      "//*[text()='Choose a payment plan']"
    );

    this.upfrontPaymentOption = this.locator(
      "//span[@class='payment-type'][contains(text(),'Upfront')]"
    );

    this.upfrontPaymentAmount = this.locator(
      "//span[@class='discount-price']"
    );

    this.payOnceTextUpFront = this.locator(
      "//span[@class='discount-price']/span"
    );

    this.upfrontPaymentFrame = this.locator(
      "(//mat-expansion-panel-header[@role='button'])[1]"
    );

    this.upfrontPanelContent = this.locator(
      "(//mat-expansion-panel)[1]//div[contains(@class,'mat-expansion-panel-content')]"
    );

    this.installmentsPanelContent = this.locator(
      "(//mat-expansion-panel)[2]//div[contains(@class,'mat-expansion-panel-content')]"
    );

    this.greenBadgeUpfrontDiscount = this.locator(
      "//span[@class='chip-content']"
    );

    this.greenBadgeElectricBoltUpfrontDiscount = this.locator(
      "//span[@class='chip-content']/span[@class='material-symbols-outlined light-icon']"
    );

    this.greenBadgeTextUpfrontDiscount = this.locator(
      "//span[@class='chip-content']"
    );

    this.couponAvailableBadgeUpfrontDiscount = this.locator(
      "//mat-chip[contains(@class, 'coupon-badge')]"
    );

    this.couponBoxCloseBtnX = this.locator(
      '//*[@id="cdk-accordion-child-0"]/div/div/div[3]/mat-form-field/div[1]/div[2]/div[2]/button/span[3]'
    );

    this.basePriceTextUnderUpfront = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Base price')]"
    );

    this.basePriceAmountUnderUpfront = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Base price')]/following-sibling::span"
    );

    this.upfrontDiscountTextUnderUpfront = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Upfront')]"
    );

    this.upfrontDiscountAmountUnderUpfront = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Upfront')]/following-sibling::span"
    );

    this.iHaveAPromoCodeButtonUnderUpfront = this.locator(
      "//button[contains(text(), 'I have a promo code')]"
    );

    this.subtotalTextUnderUpfront = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/div/span[contains(text(), 'Subtotal')]"
    );

    this.subtotalAmountUnderUpfront = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/div/span[contains(text(), 'Subtotal')]/following-sibling::span"
    );

    this.excludingFeesTextUnderUpfront = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/i[contains(text(), 'excluding fees')]"
    );

    this.installmentsPaymentOption = this.locator(
      "//span[@class='payment-type'][contains(text(),'Installments')]"
    );

    this.installmentsPaymentFrame = this.locator(
      "(//mat-expansion-panel-header[@role='button'])[2]"
    );

    this.installmentsPaymentAmount = this.locator(
      "//span[@class='discount-price ng-star-inserted']"
    );

    this.perMonthTextInstallments = this.locator(
      "//span[@class='discount-price ng-star-inserted']/span"
    );

    this.couponAvailableBadgeInstallments = this.locator(
      "(//mat-chip[contains(@class, 'coupon-badge')])[2]"
    );

    this.basePriceTextUnderInstallments = this.locator(
      "//div[@class='content-panel-item coupon-section ng-star-inserted']/div/span[contains(text(), 'Base price')]"
    );

    this.basePriceAmountUnderInstallments = this.locator(
      "//div[@class='content-panel-item coupon-section ng-star-inserted']/div/span[contains(text(), 'Base price')]/following-sibling::span"
    );

    this.installmentsTextUnderInstallments = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installments')]"
    );

    this.installmentsNumberUnderInstallments = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installments')]/following-sibling::span"
    );

    this.pricePerInstallmentsTextUnderInstallments = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Price per installment')]"
    );

    this.pricePerInstallmentsAmountUnderInstallments = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Price per installment')]/following-sibling::span"
    );

    this.dueTodayTextUnderInstallments = this.locator(
      "//span[@class='sub-item-panel ng-star-inserted' and contains(text(), 'Due Today')]"
    );

    this.firstMonthPaymentTextUnderInstallments = this.locator(
      "//div[@class='fee-items-holder']/span[contains(text(), 'First month')]"
    );

    this.firstMonthPaymentAmountUnderInstallments = this.locator(
      "//div[@class='fee-items-holder']/span[contains(text(), 'First month')]/following-sibling::span"
    );

    this.excludingFeesTextUnderInstallments = this.locator(
      "(//div[@class='content-panel-item ng-star-inserted']/i[contains(text(), 'excluding fees')])[2]"
    );

    this.iHaveAPromoCodeButtonUnderInstallments = this.locator(
      "(//button[contains(text(), 'I have a promo code')])[2]"
    );

    this.inactiveNextButton = this.locator(
      "//button[text()='Next' and @disabled]"
    );

    this.activeNextButton = this.locator(
      "//button[@class='next-button' and text()='Next']"
    );

    this.backButton = this.locator("//span[@class='back-button']");

    this.footerText = this.locator(
      "(//p[@class = 'footer-text' and contains(text(), 'Need help?')])[2]"
    );

    this.paymentPlanBoxes = this.locator(
      "//mat-accordion[@class='mat-accordion']/div/mat-expansion-panel/mat-expansion-panel-header"
    );

    this.step1 = this.locator("//div[@class='step-circle'][contains(.,'1')]");
    this.step2 = this.locator("//div[@class='step-circle'][contains(.,'2')]");
    this.step3 = this.locator("//div[@class='step-circle'][contains(.,'3')]");

    this.upfrontText = this.locator("//span[@class='payment-type']");
  }

  public async selectPaymentPlan(paymentPlan: string): Promise<void> {
    const plan = paymentPlan.toLowerCase();

    switch (true) {
      case plan.includes("upfront"):
        await this.upfrontPaymentOption.click();
        break;
      case plan.includes("installments"):
        await this.installmentsPaymentOption.click();
        break;
      default:
        throw new Error(`Invalid payment plan: ${paymentPlan}`);
    }
  }

  public async clickNextButton(): Promise<void> {
    await this.activeNextButton.click();
  }
}