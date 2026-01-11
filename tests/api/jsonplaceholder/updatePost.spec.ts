import { test, expect } from "../../../src/core/fixtures/apiFixtures";
import { JsonPlaceholderClient } from "../../../src/api/jsonplaceholder/client";

test.describe("JSONPlaceholder - UPDATE post (PUT)", () => {
  test("should update entire post", async ({ request }) => {
    const client = new JsonPlaceholderClient(request);

    const payload = {
      id: 1,
      title: "updated title",
      body: "updated body",
      userId: 1,
    };

    const response = await client.updatePost(1, payload);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body).toMatchObject(payload);
  });
});
