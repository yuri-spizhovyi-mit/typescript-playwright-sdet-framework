import { test, expect } from "../../../src/core/fixtures/apiFixtures";
import { JsonPlaceholderClient } from "../../../src/api/jsonplaceholder/client";

test.describe("JSONPlaceholder - PATCH post", () => {
  test("should partially update post", async ({ request }) => {
    const client = new JsonPlaceholderClient(request);

    const response = await client.patchPost(1, {
      title: "patched title",
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.title).toBe("patched title");
    expect(body.id).toBe(1);
  });
});
