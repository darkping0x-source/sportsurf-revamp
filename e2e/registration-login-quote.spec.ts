import { test, expect } from "@playwright/test";

// Registration itself (signUp -> verification email -> /auth/confirm) was
// verified manually against the live project during Phase 3 (see commit
// f825d28) and again during Phase 6 admin testing — repeated automated runs
// here would trip Supabase's shared-SMTP rate limit (~2 signup emails/hour
// on the free tier), which is an account-level protection against abuse,
// not something to work around by weakening it. So this test creates the
// account directly via the admin API (the same "already verified" state a
// user reaches after clicking the email link) and focuses automated,
// repeatable coverage on login -> quote request -> profile display.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const TEST_EMAIL = `crkz49crkz+e2e${Date.now()}@gmail.com`;
const TEST_PASSWORD = "E2ETestPass123";
const TEST_NAME = "E2E Test User";

async function adminFetch(path: string, init?: RequestInit) {
  return fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}

let testUserId: string | null = null;

test.beforeAll(async () => {
  const res = await adminFetch("/auth/v1/admin/users", {
    method: "POST",
    body: JSON.stringify({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: TEST_NAME },
    }),
  });
  const body = await res.json();
  expect(res.ok, `failed to create test user: ${JSON.stringify(body)}`).toBe(true);
  testUserId = body.id;
});

test.afterAll(async () => {
  // Deleting the auth user only nulls quote_requests.user_id (ON DELETE SET
  // NULL) — the row itself survives, so it's removed explicitly here too.
  await fetch(
    `${SUPABASE_URL}/rest/v1/quote_requests?email=eq.${encodeURIComponent(TEST_EMAIL)}`,
    {
      method: "DELETE",
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      },
    },
  );
  if (testUserId) {
    await adminFetch(`/auth/v1/admin/users/${testUserId}`, { method: "DELETE" });
  }
});

test("login -> quote request -> shows on profile", async ({ page }) => {
  // 1. Log in with the pre-verified account through the real form.
  await page.goto("/login");
  await page.fill("#email", TEST_EMAIL);
  await page.fill("#password", TEST_PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\/profile/);
  await expect(page.getByText(TEST_NAME)).toBeVisible();

  // 2. Submit a quote request while logged in.
  await page.goto("/quote");
  await page.fill("#name", TEST_NAME);
  await page.fill("#email", TEST_EMAIL);
  await page.fill("#phone", "9876543210");
  await page.fill("#location", "Hyderabad");
  await page.fill("#estimatedArea", "3000 sqft");
  await page.click('button[type="submit"]');
  await expect(page.getByText(/we've received your details/i)).toBeVisible();

  // 3. Confirm it shows up on the profile page, tied to this user.
  await page.goto("/profile");
  await expect(page.getByText("Hyderabad")).toBeVisible();
  await expect(page.getByText(/pending/i)).toBeVisible();

  // 4. Wrong password on this same account should still be rejected.
  await page.goto("/login");
  await page.fill("#email", TEST_EMAIL);
  await page.fill("#password", "WrongPassword999");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/error=/);
});
