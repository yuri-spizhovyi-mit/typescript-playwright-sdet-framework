import { test, expect } from "../../../src/core/fixtures/apiFixtures";
import Ajv from "ajv";
import postSchema from "../../../src/api/jsonplaceholder/schemas/post.schema.json";

test.describe("JSONPlaceholder API", () => {
  test("should fetch posts and validate schema", async ({ jsonPlaceholder }) => {
    const response = await jsonPlaceholder.getPosts();

    expect(response.ok()).toBeTruthy();
    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();

    const ajv = new Ajv();
    const validate = ajv.compile(postSchema);
    expect(validate(posts[0])).toBeTruthy();
  });
});
