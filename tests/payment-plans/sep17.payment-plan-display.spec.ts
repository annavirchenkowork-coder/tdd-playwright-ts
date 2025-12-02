import {
  test,
  expect,
  BrowserUtility,
  goToStep2,
} from "../../utilities/sep-test-utilities";

test.describe("SEP17 - View payment plan options in Step 2 @sep17", () => {
  // =========================================================
  // AC1 – Upfront payment plan displays correct details
  // =========================================================
  test("AC1 - Upfront plan displays correct details @sep17-1", async ({
    page,
  }) => {
    const { paymentPlan } = await goToStep2(page);

    // Get upfront locators via utility
    const upfront = BrowserUtility.planLocators("upfront", paymentPlan);

    // Panel visible
    await expect(upfront.frame).toBeVisible();

    // First row: "Upfront"
    const firstRowText = await BrowserUtility.cleanText(upfront.option);
    expect(firstRowText).toBe("Upfront");

    // Second row: "$400 pay once"
    const secondRowText = await BrowserUtility.cleanText(upfront.amount);
    expect(secondRowText).toBe("$400 pay once");

    // Exactly 1 upfront option
    const optionCount = await upfront.option.count();
    expect(optionCount).toBe(1);
  });

  // =========================================================
  // AC2 – Installments payment plan displays correct details
  // =========================================================
  test("AC2 - Installments plan displays correct details @sep17-2", async ({
    page,
  }) => {
    const { paymentPlan } = await goToStep2(page);

    const installments = BrowserUtility.planLocators(
      "installments",
      paymentPlan
    );

    // Panel visible
    await expect(installments.frame).toBeVisible();

    // First row: "5 Installments"
    const firstRowText = await BrowserUtility.cleanText(installments.option);
    expect(firstRowText).toBe("5 Installments");

    // Second row: "$100 per month"
    const secondRowText = await BrowserUtility.cleanText(installments.amount);
    expect(secondRowText).toBe("$100 per month");

    // Exactly 1 installments option
    const optionCount = await installments.option.count();
    expect(optionCount).toBe(1);
  });

  // =========================================================
  // AC3 – Each plan card includes Coupons badge
  // =========================================================
  test("AC3 - Coupon badge displayed on both plans @sep17-3", async ({
    page,
  }) => {
    const { paymentPlan } = await goToStep2(page);

    const upfront = BrowserUtility.planLocators("upfront", paymentPlan);
    const installments = BrowserUtility.planLocators(
      "installments",
      paymentPlan
    );

    // Upfront: coupon badge
    const upfrontChip = upfront.frame.locator(".coupon-badge");
    await expect(upfrontChip).toHaveCount(1);
    await expect(upfrontChip.first()).toBeVisible();
    await expect(upfrontChip.first()).toHaveText(/Coupons available/i);

    // Installments: coupon badge
    const instChip = installments.frame.locator(".coupon-badge");
    await expect(instChip).toHaveCount(1);
    await expect(instChip.first()).toBeVisible();
    await expect(instChip.first()).toHaveText(/Coupons available/i);
  });
});