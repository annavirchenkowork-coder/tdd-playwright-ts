import {
  test,
  expect,
  BrowserUtility,
  goToStep2,
} from "../../utilities/sep-test-utilities";

test.describe("SEP14 - Selecting a Payment Plan @sep14", () => {
  // =========================================================
  // AC1 – Selecting Upfront highlights it & activates Next
  // =========================================================
  test(
    "AC1 - Selecting Upfront plan highlights it & activates Next @sep14-1",
    async ({ page }) => {
      const { paymentPlan } = await goToStep2(page);

      // Next disabled by default
      await expect(paymentPlan.inactiveNextButton).toBeVisible();
      await expect(paymentPlan.inactiveNextButton).toBeDisabled();

      // Select Upfront
      await paymentPlan.selectPaymentPlan("upfront");

      const upfront = BrowserUtility.panelFor("upfront", paymentPlan);
      const installments = BrowserUtility.panelFor("installments", paymentPlan);

      // Upfront expanded (summary visible), installments collapsed (summary hidden)
      await expect(upfront.summaryProbe).toBeVisible();
      await expect(installments.summaryProbe).toBeHidden();

      // Next enabled
      await expect(paymentPlan.activeNextButton).toBeVisible();
      await expect(paymentPlan.activeNextButton).toBeEnabled();
    }
  );

  // =========================================================
  // AC2 – Selecting Installments highlights it & activates Next
  // =========================================================
  test(
    "AC2 - Selecting Installments highlights it & activates Next @sep14-2",
    async ({ page }) => {
      const { paymentPlan } = await goToStep2(page);

      // Next disabled by default
      await expect(paymentPlan.inactiveNextButton).toBeVisible();
      await expect(paymentPlan.inactiveNextButton).toBeDisabled();

      // Select Installments
      await paymentPlan.selectPaymentPlan("installments");

      const upfront = BrowserUtility.panelFor("upfront", paymentPlan);
      const installments = BrowserUtility.panelFor("installments", paymentPlan);

      // Installments expanded, upfront collapsed
      await expect(installments.summaryProbe).toBeVisible();
      await expect(upfront.summaryProbe).toBeHidden();

      // Next enabled
      await expect(paymentPlan.activeNextButton).toBeVisible();
      await expect(paymentPlan.activeNextButton).toBeEnabled();
    }
  );

  // =========================================================
  // AC3 – User can change selection before proceeding
  // =========================================================
  test(
    "AC3 - User can change selection before proceeding @sep14-3",
    async ({ page }) => {
      const { paymentPlan } = await goToStep2(page);

      // First select Upfront
      await paymentPlan.selectPaymentPlan("upfront");
      // Then switch to Installments
      await paymentPlan.selectPaymentPlan("installments");

      const upfront = BrowserUtility.panelFor("upfront", paymentPlan);
      const installments = BrowserUtility.panelFor("installments", paymentPlan);

      // Final state: Installments expanded, Upfront collapsed
      await expect(installments.summaryProbe).toBeVisible();
      await expect(upfront.summaryProbe).toBeHidden();

      // Next must be enabled
      await expect(paymentPlan.activeNextButton).toBeVisible();
      await expect(paymentPlan.activeNextButton).toBeEnabled();
    }
  );
});