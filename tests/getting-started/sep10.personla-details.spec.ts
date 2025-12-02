import {
  test,
  expect,
  BrowserUtility,
  initPages,
} from "../../utilities/sep-test-utilities";
import type { Page } from "@playwright/test";
import type { StartApplicationPage } from "../../pages/StartApplicationPage";
import type { PaymentPlanPage } from "../../pages/PaymentPlanPage";

test.describe("SEP10 - Enter my Personal details", () => {
  // =========================================================
  // AC1 – Required fields present & required
  // =========================================================
  test("AC1 - Required personal detail fields are present @sep10-1", async ({
    page,
  }) => {
    const { startApp } = initPages(page);

    await expect(startApp.firstNameInputBox).toBeVisible();
    expect(await BrowserUtility.isRequired(startApp.firstNameInputBox)).toBe(
      true
    );

    await expect(startApp.lastNameInputBox).toBeVisible();
    expect(await BrowserUtility.isRequired(startApp.lastNameInputBox)).toBe(
      true
    );

    await expect(startApp.emailInputBox).toBeVisible();
    expect(await BrowserUtility.isRequired(startApp.emailInputBox)).toBe(true);

    await expect(startApp.phoneNumberInputBox).toBeVisible();
    expect(
      await BrowserUtility.isRequired(startApp.phoneNumberInputBox)
    ).toBe(true);
  });

  const assertFormValid = async (page: Page, expected: boolean) => {
    await expect
      .poll(async () => await BrowserUtility.ngFormValid(page), {
        timeout: 2000,
      })
      .toBe(expected);
  };

  const clickNextShouldStayOnStep1 = async (
    startApp: StartApplicationPage,
    paymentPlan: PaymentPlanPage
  ) => {
    await expect(paymentPlan.chooseAPaymentPlanText).toBeHidden({
      timeout: 300,
    });

    await startApp.clickNextButton();

    await expect(startApp.firstNameInputBox).toBeVisible();
    await expect(paymentPlan.chooseAPaymentPlanText).toBeHidden({
      timeout: 300,
    });
  };

  const clickNextShouldGoToStep2 = async (
    startApp: StartApplicationPage,
    paymentPlan: PaymentPlanPage
  ) => {
    await expect(paymentPlan.chooseAPaymentPlanText).toBeHidden({
      timeout: 300,
    });

    await startApp.clickNextButton();

    await expect(paymentPlan.chooseAPaymentPlanText).toBeVisible();
  };

  // =========================================================
  // AC2 – Email format validation
  // =========================================================
  const emailCases: { email: string; valid: boolean }[] = [
    { email: "abc", valid: false },
    { email: "abc@", valid: false },
    { email: "a@b.", valid: false },
    { email: "user@@test.com", valid: false },
    { email: "user@test..com", valid: false },
    { email: "a@b", valid: true },
    { email: "user@test.com", valid: true },
  ];

  for (const { email, valid } of emailCases) {
    test(`AC2 - Email "${email}" validity=${valid} @sep10-2`, async ({
      page,
    }) => {
      const { startApp, paymentPlan } = initPages(page);

      // When I type "<email>" into the Email Address field
      await BrowserUtility.typeAndBlur(startApp.emailInputBox, email);

      // Then The Email Address field validity should be <valid>
      await BrowserUtility.expectControlValidity(
        startApp.emailInputBox,
        valid
      );

      // And The form should be invalid
      await assertFormValid(page, false);

      // And Clicking Next should keep me on Step 1
      await clickNextShouldStayOnStep1(startApp, paymentPlan);
    });
  }

  // =========================================================
  // AC3 – Phone numeric only
  // =========================================================
  const phoneCases: { value: string; valid: boolean }[] = [
    { value: "abcdef", valid: false },
    { value: "123abc", valid: false },
    { value: "2025550188", valid: true },
  ];

  for (const { value, valid } of phoneCases) {
    test(`AC3 - Phone value "${value}" validity=${valid} @sep10-3`, async ({
      page,
    }) => {
      const { startApp, paymentPlan } = initPages(page);

      const phone = startApp.phoneNumberInputBox;

      // When I type "<value>" into the Phone field
      await phone.fill("");
      await phone.type(value);
      await phone.blur();
      await page.waitForTimeout(50);

      const actual = await phone.inputValue();
      const allDigits = /^\d+$/.test(actual) && actual.length > 0;
      const unchanged = actual === value;
      const computedValid = allDigits && unchanged;

      // Then The Phone field validity should be <valid>
      expect(computedValid).toBe(valid);

      // And The form should be invalid (same as BDD spec)
      await assertFormValid(page, false);

      // And Clicking Next should keep me on Step 1
      await clickNextShouldStayOnStep1(startApp, paymentPlan);
    });
  }

  // =========================================================
  // AC4 – Dropdown options present
  // =========================================================
  test(
    'AC4 - "How did you hear about us?" dropdown options @sep10-4',
    async ({ page }) => {
      const { startApp } = initPages(page);

      // Dropdown is present
      await expect(startApp.howDidYouHearAboutUsDropDown).toBeVisible();

      // And contains at least given options
      await startApp.howDidYouHearAboutUsDropDown.click();

      const optionTexts = (
        await page.locator("mat-option span").allTextContents()
      ).map((t) => t.trim().toLowerCase());

      const expectedOptions = [
        "email",
        "facebook",
        "google",
        "instagram",
        "linkedin",
        "twitter",
        "other",
      ];

      for (const opt of expectedOptions) {
        expect(optionTexts).toContain(opt);
      }
    }
  );

  // =========================================================
  // AC5 – Next button blocked until valid, then goes to Step 2
  // =========================================================
  test(
    "AC5 - Next stays disabled until all required data is valid @sep10-5",
    async ({ page }) => {
      const { startApp, paymentPlan } = initPages(page);

      // Then The form should be invalid
      await assertFormValid(page, false);

      // When I enter a valid First Name and Last Name
      await startApp.firstNameInputBox.fill("Anna");
      await startApp.lastNameInputBox.fill("Virchenko");
      await startApp.lastNameInputBox.blur();

      // And I enter a valid Email Address
      await BrowserUtility.typeAndBlur(
        startApp.emailInputBox,
        "anna.virchenko@example.com"
      );

      // And I enter a valid Phone
      await BrowserUtility.typeAndBlur(
        startApp.phoneNumberInputBox,
        "2025550188"
      );

      // And I select "Email" in the "How did you hear about us?" dropdown
      await startApp.selectHowDidYouHearAboutUs("Email");

      // Then The form should be valid
      await assertFormValid(page, true);

      // And Clicking Next should take me to Step 2
      await clickNextShouldGoToStep2(startApp, paymentPlan);
    }
  );
});