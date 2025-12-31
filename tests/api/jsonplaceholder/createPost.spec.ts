import { test, expect } from "../../../src/core/fixtures/apiFixtures";
import postSchema from "../../../src/api/jsonplaceholder/schemas/post.schema.json";
import { validateSchema } from "../../../src/core/api/schemaValidator";

test.describe("JSONPlaceholder API", () => {
  test("POST /posts returns created post matching schema", async ({ jsonPlaceholder }) => {
    const payload = {
      title: "hello",
      body: "world",
      userId: 1,
    };

    const res = await jsonPlaceholder.createPost(payload);
    expect(res.ok()).toBeTruthy();

    const created = await res.json();
    validateSchema(postSchema as unknown as object, created, "post.schema.json");

    // JSONPlaceholder fakes creation but echoes values back
    expect(created.title).toBe(payload.title);
    expect(created.body).toBe(payload.body);
    expect(created.userId).toBe(payload.userId);
  });
});
