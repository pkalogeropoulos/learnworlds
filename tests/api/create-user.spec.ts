import { test, expect, request } from "@playwright/test";
import { AuthorApiClient } from "../../src/api/ApiClient";

test("create user via API as admin", async () => {
  const apiContext = await request.newContext({
    baseURL: "https://pkalogerop.learnworlds.com",
    storageState: "./storage/admin.state.json", // 👈 reuse session
  });

  const api = new AuthorApiClient(apiContext);

  const uniqueEmail = `e2e+${Date.now()}@test.com`;

  const response = await api.createUser({
    email: uniqueEmail,
    first_name: "Test",
    last_name: "User",
    password: "Password123!",
  });

  expect(response.user?.email).toBe(uniqueEmail);

  await apiContext.dispose();
});