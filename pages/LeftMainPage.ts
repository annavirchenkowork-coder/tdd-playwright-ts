import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LeftMainPage extends BasePage {
  public readonly cydeoImageAtLeftWindow: Locator;
  public readonly secureCheckout: Locator;
  public readonly footerElements: Locator;
  public readonly programName: Locator;

  constructor(page: Page) {
    super(page);

    this.cydeoImageAtLeftWindow = this.locator(
      "(//img[@src = 'assets/images/logo.svg'])[2]"
    );

    this.secureCheckout = this.locator("//p[@class='checkout-title']");

    this.footerElements = this.locator(
      "//a[contains(@href, 'https://cydeo.com/')]"
    );

    this.programName = this.locator("//p[@class='course-name']/a");
  }
}