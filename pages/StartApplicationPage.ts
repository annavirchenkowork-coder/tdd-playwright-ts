import { Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class StartApplicationPage extends BasePage {
  
  public readonly startApplicationText: Locator = this.locator(
    "(//div[@class = 'step-title'])[1]"
  );

  public readonly paymentPlanText: Locator = this.locator(
    "(//div[@class = 'step-title'])[2]"
  );

  public readonly reviewText: Locator = this.locator(
    "(//div[@class = 'step-title'])[3]"
  );

  public readonly startApplicationStepCircle: Locator = this.locator(
    "(//*[@class='step-circle'])[1]"
  );

  public readonly paymentPlanStepCircle: Locator = this.locator(
    "(//*[@class='step-circle'])[2]"
  );

  public readonly reviewStepCircle: Locator = this.locator(
    "(//*[@class='step-circle'])[3]"
  );

  public readonly firstNameInputBox: Locator = this.locator(
    "//input[@formcontrolname='firstName']"
  );

  public readonly lastNameInputBox: Locator = this.locator(
    "//input[@formcontrolname='lastName']"
  );

  public readonly emailInputBox: Locator = this.locator(
    "//input[@formcontrolname='email']"
  );

  public readonly phoneNumberInputBox: Locator = this.locator(
    "//input[@formcontrolname='phoneNumber']"
  );

  public readonly howDidYouHearAboutUsDropDown: Locator = this.locator(
    "//mat-label[text()='How did you hear about us?']"
  );

  public readonly emailOptionFromDropDown: Locator = this.locator(
    "//mat-option/span[contains(text(), 'Email')]"
  );

  public readonly facebookOptionFromDropDown: Locator = this.locator(
    "//mat-option/span[contains(text(), 'Facebook')]"
  );

  public readonly googleOption: Locator = this.locator(
    "//mat-option/span[contains(text(), 'Google')]"
  );

  public readonly instagramOptionFromDropDown: Locator = this.locator(
    "//mat-option/span[contains(text(), 'Instagram')]"
  );

  public readonly linkedInOptionFromDropDown: Locator = this.locator(
    "//mat-option/span[contains(text(), 'LinkedIN')]"
  );

  public readonly twitterOptionFromDropDown: Locator = this.locator(
    "//mat-option/span[contains(text(), 'Twitter')]"
  );

  public readonly referredByFriedOptionFromDropDown: Locator = this.locator(
    "//mat-option/span[contains(text(), 'Referred by a friend')]"
  );

  public readonly otherOptionFromDropDown: Locator = this.locator(
    "//mat-option/span[contains(text(), 'Other')]"
  );

  public readonly firstNameInputBoxForParents: Locator = this.locator(
    "(//input[@formcontrolname='firstName'])[2]"
  );

  public readonly lastNameInputBoxForParents: Locator = this.locator(
    "(//input[@formcontrolname='lastName'])[2]"
  );

  public readonly emailInputBoxForParents: Locator = this.locator(
    "(//input[@formcontrolname='email'])[2]"
  );

  public readonly phoneNumberInputBoxForParents: Locator = this.locator(
    "(//input[@formcontrolname='phoneNumber'])[2]"
  );

  public readonly flexiblePaymentsPlanAvailableText: Locator = this.locator(
    "//p[text() = 'Flexible payments plan available']"
  );

  public readonly programStartDate: Locator = this.locator(
    "//div[contains(text(), 'Program Start Date')]/b[@class='info-value']"
  );

  public readonly refundEndDate: Locator = this.locator(
    "(//b[@class='info-value'])[2]"
  );

  public readonly programNameOnInfoCard: Locator = this.locator(
    "//p[@class='program-title primary-color']"
  );

  public readonly programPrice: Locator = this.locator(
    "//div[@class='col-sm']/b[@class = 'info-primary']"
  );

  public readonly footer: Locator = this.locator(
    "//p[@class = 'footer-text' and contains(text(), 'Need help?')]"
  );

  public readonly nextButton: Locator = this.locator(
    "//button[@class = 'next-button'][contains(text(), 'Next')]"
  );

  public readonly programBasePrice: Locator = this.locator(
    "//span[@class='ng-star-inserted']/s"
  );

  public readonly enterPersonalDetails: Locator = this.locator(
    "//b[contains(.,'Enter personal details')]"
  );

  public readonly discountedPrice: Locator = this.locator(
    "//b[@class='info-primary']"
  );

  public readonly originalPrice: Locator = this.locator("//s[contains(.,'$')]");

  public async enterFirstName(firstName: string) {
    await this.firstNameInputBox.fill(firstName);
  }
  public async enterLastName(lastName: string) {
    await this.lastNameInputBox.fill(lastName);
  }

  public async enterEmail(email: string) {
    await this.emailInputBox.fill(email);
  }

  public async enterPhoneNumber(phoneNumber: string) {
    await this.phoneNumberInputBox.fill(phoneNumber);
  }
  public async selectHowDidYouHearAboutUs(howDidYouHear: string) {
    howDidYouHear = howDidYouHear.toLowerCase();
    await this.howDidYouHearAboutUsDropDown.click();
    switch (howDidYouHear) {
      case "email":
        await this.emailOptionFromDropDown.click();
        break;
      case "facebook":
        await this.facebookOptionFromDropDown.click();
        break;
      case "google":
        await this.googleOption.click();
        break;
      case "instagram":
        await this.instagramOptionFromDropDown.click();
        break;
      case "linkedin":
        await this.linkedInOptionFromDropDown.click();
        break;
      case "twitter":
        await this.twitterOptionFromDropDown.click();
        break;
    }
  }

  public async clickNextButton(){
    await this.nextButton.click();
  }
  
}
