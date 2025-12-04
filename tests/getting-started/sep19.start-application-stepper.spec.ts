import { test, expect } from "../../utilities/sep-test-utilities";
import { generateTestUser } from "../../utilities/qa-data-reader";
import { StartApplicationPage } from "../../pages/StartApplicationPage";

const COMPLETED_GREEN = "rgb(172, 245, 138)";
const ACTIVE_BLUE = "rgb(1, 201, 255)";

// =========================================================
// SEP19 - Proceed to Step 2 after completing Step 1
// =========================================================
test.describe("SEP19 - Start Application - Stepper indicators @sep19", () => {
  // =========================================================
  // Validate with all fields completed (required + optional)
  // =========================================================
  test(
    "User enters valid data in all required and optional fields @sep19-1",
    async ({ page }) => {
      const startApplicationPage = new StartApplicationPage(page);

      // Step 1: Enter all valid information
      const user = generateTestUser();
      await startApplicationPage.fillPersonalInformation(user);

      // Step 2: Click Next button
      await startApplicationPage.clickNextButton();

      // Step 3: Validate stepper indicators
      await expect(
        startApplicationPage.startApplicationStepCircle
      ).toHaveCSS("background-color", COMPLETED_GREEN);

      await expect(
        startApplicationPage.paymentPlanStepCircle
      ).toHaveCSS("background-color", ACTIVE_BLUE);
    }
  );

  // =========================================================
  // Validate with only required fields completed
  // =========================================================
  test(
    "User enters valid data only in required fields @sep19-2",
    async ({ page }) => {
      const startApplicationPage = new StartApplicationPage(page);

      // Step 1: Enter only required fields
      const user = generateTestUser();
      await startApplicationPage.fillPersonalInformation({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        // no optional fields on purpose
      });

      // Step 2: Click Next button
      await startApplicationPage.clickNextButton();

      // Step 3: Validate stepper indicators
      await expect(
        startApplicationPage.startApplicationStepCircle
      ).toHaveCSS("background-color", COMPLETED_GREEN);

      await expect(
        startApplicationPage.paymentPlanStepCircle
      ).toHaveCSS("background-color", ACTIVE_BLUE);
    }
  );
});