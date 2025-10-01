// Frontend/e2e/edit-profile.spec.js
import { test, expect } from "@playwright/test";

test("Edit StudentProfile", async ({ page }) => {
  let userData = {
    studentId: 1,
    firstName: "John",
    lastName: "Doe",
    preferredName: "JD",
    degree: "Bachelor of IT",
    major: "Software Development",
    description: "Hello!",
    academicRecord: 5.5,
    credit: 80,
  };
  // Stub endpoints the Home page calls
  await page.addInitScript(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        studentId: 1,
        firstName: "John",
        lastName: "Doe",
        preferredName: "JD",
        degree: "Bachelor of IT",
        major: "Software Development",
        description: "Hello!",
        academicRecord: 5.5,
        credit: 80,
      })
    );
  });

  await page.route("**/studentProfile/loggedInUser", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(userData),
    });
  });
  await page.route("**/studentProfile/MembershipList**", (r) =>
    r.fulfill({ status: 200, contentType: "application/json", body: "[]" })
  );
  await page.route("**/studentProfile/events**", (r) =>
    r.fulfill({ status: 200, contentType: "application/json", body: "[]" })
  );
  await page.route("**/studentProfile/appointments**", (r) =>
    r.fulfill({ status: 200, contentType: "application/json", body: "[]" })
  );

  await page.route("**/studentProfile/updateInfo", async (route) => {
    const request = route.request();
    const postData = request.postDataJSON();

    // userData 업데이트
    userData = { ...userData, ...postData };

    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(userData),
    });
  });
  await page.goto("http://localhost:5173/main/home");
  await expect(page.getByText("John Doe")).toBeVisible({ timeout: 10000 });

  await expect(page.getByText("Profile")).toBeVisible({ timeout: 10000 });
  // click the edit button (you added data-testid="profile-edit")

  await page.getByTestId("profile-edit").first().click();

  // fill by your data-testids from EditAcademicRecord.jsx
  await page.getByTestId("first-name-input").fill("Will");
  await page.getByTestId("gpa-input").fill("6.1");
  await page.getByTestId("credit-input").fill("100");

  await page.getByTestId("profile-save").first().click();

  await expect(page.getByText(/GPA:\s*6\.1/i)).toBeVisible();
  await expect(page.getByText(/Credits:\s*100/i)).toBeVisible();
});
