import { test, expect } from "../../../src/core/fixtures/apiFixtures";
import { JsonPlaceholderClient } from "../../../src/api/jsonplaceholder/client";

test.describe("JSONPlaceholder - DELETE post", () => {
  test("should delete post (fake)", async ({ request }) => {
    const client = new JsonPlaceholderClient(request);

    const response = await client.deletePost(1);
    expect(response.status()).toBe(200);
  });
});
