import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class StartApplicationPage extends BasePage {
  public readonly startApplicationText: Locator;
  public readonly paymentPlanText: Locator;
  public readonly reviewText: Locator;

  public readonly startApplicationStepCircle: Locator;
  public readonly paymentPlanStepCircle: Locator;
  public readonly reviewStepCircle: Locator;

  public readonly firstNameInputBox: Locator;
  public readonly lastNameInputBox: Locator;
  public readonly emailInputBox: Locator;
  public readonly phoneNumberInputBox: Locator;

  public readonly howDidYouHearAboutUsDropDown: Locator;
  public readonly emailOptionFromDropDown: Locator;
  public readonly facebookOptionFromDropDown: Locator;
  public readonly googleOption: Locator;
  public readonly instagramOptionFromDropDown: Locator;
  public readonly linkedInOptionFromDropDown: Locator;
  public readonly twitterOptionFromDropDown: Locator;
  public readonly referredByFriedOptionFromDropDown: Locator;
  public readonly otherOptionFromDropDown: Locator;

  public readonly firstNameInputBoxForParents: Locator;
  public readonly lastNameInputBoxForParents: Locator;
  public readonly emailInputBoxForParents: Locator;
  public readonly phoneNumberInputBoxForParents: Locator;

  public readonly flexiblePaymentsPlanAvailableText: Locator;
  public readonly programStartDate: Locator;
  public readonly refundEndDate: Locator;
  public readonly programNameOnInfoCard: Locator;
  public readonly programPrice: Locator;

  public readonly footer: Locator;
  public readonly nextButton: Locator;

  public readonly programBasePrice: Locator;
  public readonly enterPersonalDetails: Locator;
  public readonly discountedPrice: Locator;
  public readonly originalPrice: Locator;

  constructor(page: Page) {
    super(page);

    this.startApplicationText = this.locator(
      "(//div[@class = 'step-title'])[1]"
    );
    this.paymentPlanText = this.locator("(//div[@class = 'step-title'])[2]");
    this.reviewText = this.locator("(//div[@class = 'step-title'])[3]");

    // less brittle step circles
    const circles = this.locator(".step-circle");
    this.startApplicationStepCircle = circles.nth(0);
    this.paymentPlanStepCircle = circles.nth(1);
    this.reviewStepCircle = circles.nth(2);

    this.firstNameInputBox = this.locator(
      "//input[@formcontrolname='firstName']"
    );
    this.lastNameInputBox = this.locator(
      "//input[@formcontrolname='lastName']"
    );
    this.emailInputBox = this.locator("//input[@formcontrolname='email']");
    this.phoneNumberInputBox = this.locator(
      "//input[@formcontrolname='phoneNumber']"
    );

    this.howDidYouHearAboutUsDropDown = this.locator(
      "//mat-label[text()='How did you hear about us?']"
    );
    this.emailOptionFromDropDown = this.locator(
      "//mat-option/span[contains(text(), 'Email')]"
    );
    this.facebookOptionFromDropDown = this.locator(
      "//mat-option/span[contains(text(), 'Facebook')]"
    );
    this.googleOption = this.locator(
      "//mat-option/span[contains(text(), 'Google')]"
    );
    this.instagramOptionFromDropDown = this.locator(
      "//mat-option/span[contains(text(), 'Instagram')]"
    );
    this.linkedInOptionFromDropDown = this.locator(
      "//mat-option/span[contains(text(), 'LinkedIN')]"
    );
    this.twitterOptionFromDropDown = this.locator(
      "//mat-option/span[contains(text(), 'Twitter')]"
    );
    this.referredByFriedOptionFromDropDown = this.locator(
      "//mat-option/span[contains(text(), 'Referred by a friend')]"
    );
    this.otherOptionFromDropDown = this.locator(
      "//mat-option/span[contains(text(), 'Other')]"
    );

    this.firstNameInputBoxForParents = this.locator(
      "(//input[@formcontrolname='firstName'])[2]"
    );
    this.lastNameInputBoxForParents = this.locator(
      "(//input[@formcontrolname='lastName'])[2]"
    );
    this.emailInputBoxForParents = this.locator(
      "(//input[@formcontrolname='email'])[2]"
    );
    this.phoneNumberInputBoxForParents = this.locator(
      "(//input[@formcontrolname='phoneNumber'])[2]"
    );

    this.flexiblePaymentsPlanAvailableText = this.locator(
      "//p[text() = 'Flexible payments plan available']"
    );
    this.programStartDate = this.locator(
      "//div[contains(text(), 'Program Start Date')]/b[@class='info-value']"
    );
    this.refundEndDate = this.locator("(//b[@class='info-value'])[2]");
    this.programNameOnInfoCard = this.locator(
      "//p[@class='program-title primary-color']"
    );
    this.programPrice = this.locator(
      "//div[@class='col-sm']/b[@class = 'info-primary']"
    );

    this.footer = this.locator(
      "//p[@class = 'footer-text' and contains(text(), 'Need help?')]"
    );
    this.nextButton = this.locator(
      "//button[@class = 'next-button'][contains(text(), 'Next')]"
    );

    this.programBasePrice = this.locator("//span[@class='ng-star-inserted']/s");
    this.enterPersonalDetails = this.locator(
      "//b[contains(.,'Enter personal details')]"
    );
    this.discountedPrice = this.locator("//b[@class='info-primary']");
    this.originalPrice = this.locator("//s[contains(.,'$')]");
  }

  public async enterFirstName(firstName: string): Promise<void> {
    await this.firstNameInputBox.fill(firstName);
  }

  public async enterLastName(lastName: string): Promise<void> {
    await this.lastNameInputBox.fill(lastName);
  }

  public async enterEmail(email: string): Promise<void> {
    await this.emailInputBox.fill(email);
  }

  public async enterPhoneNumber(phoneNumber: string): Promise<void> {
    await this.phoneNumberInputBox.fill(phoneNumber);
  }

  public async selectHowDidYouHearAboutUs(
    howDidYouHear: string
  ): Promise<void> {
    const option = howDidYouHear.toLowerCase();
    await this.howDidYouHearAboutUsDropDown.click();

    switch (option) {
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
      // you can add "other", "referred", etc., later if needed
    }
  }

  public async clickNextButton(): Promise<void> {
    await this.nextButton.click();
  }

  // Optional convenience helper – mirrors JS version but typed
  public async fillPersonalInformation(data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    howDidYouHear?: string;
  } = {}): Promise<void> {
    const { firstName, lastName, email, phone, howDidYouHear } = data;

    if (firstName) await this.firstNameInputBox.fill(firstName);
    if (lastName) await this.lastNameInputBox.fill(lastName);
    if (email) await this.emailInputBox.fill(email);
    if (phone) await this.phoneNumberInputBox.fill(phone);
    if (howDidYouHear) {
      await this.selectHowDidYouHearAboutUs(howDidYouHear);
    }
  }
}