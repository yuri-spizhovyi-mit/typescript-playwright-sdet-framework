import { test, expect } from "../../../src/core/fixtures/apiFixtures";
import postSchema from "../../../src/api/jsonplaceholder/schemas/post.schema.json";
import { validateSchema } from "../../../src/core/api/schemaValidator";

test.describe("JSONPlaceholder API", () => {
  test("GET /posts/:id returns a post matching schema", async ({ jsonPlaceholder }) => {
    const res = await jsonPlaceholder.getPost(1);
    expect(res.ok()).toBeTruthy();

    const post = await res.json();
    validateSchema(postSchema as unknown as object, post, "post.schema.json");

    expect(post.id).toBe(1);
  });
});
