import { test, expect } from "@playwright/test";
import { JsonPlaceholderClient } from "../../../src/api/jsonplaceholder/client";

test.describe("JSONPlaceholder - GET posts", () => {
  test("should return list of posts", async ({ request }) => {
    const client = new JsonPlaceholderClient(request);

    const response = await client.getPosts();
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);

    expect(body[0]).toMatchObject({
      id: expect.any(Number),
      userId: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    });
  });
});
