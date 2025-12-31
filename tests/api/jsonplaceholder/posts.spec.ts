import { test, expect } from '@playwright/test';
import { JsonPlaceholderClient } from '../../../src/api/jsonplaceholder/client';
import Ajv from 'ajv';
import postSchema from '../../../src/api/jsonplaceholder/schemas/post.schema.json';

test.describe('JSONPlaceholder API', () => {
  test('should fetch posts and validate schema', async ({ request }) => {
    const client = new JsonPlaceholderClient(request);
    const response = await client.getPosts();
    
    expect(response.ok()).toBeTruthy();
    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    
    // Validate first post against schema
    const ajv = new Ajv();
    const validate = ajv.compile(postSchema);
    const valid = validate(posts[0]);
    
    expect(valid).toBeTruthy();
  });
});
