import { test, expect } from '@playwright/test';
import { PostmanEchoClient } from '../../../src/api/postman-echo/client';

test.describe('Postman Echo API', () => {
  test('should echo posted data', async ({ request }) => {
    const client = new PostmanEchoClient(request);
    const payload = { message: 'Hello World', timestamp: Date.now() };
    
    const response = await client.postEcho(payload);
    expect(response.ok()).toBeTruthy();
    
    const body = await response.json();
    expect(body.json).toEqual(payload);
  });
});
