import { APIRequestContext } from '@playwright/test';
import { Config } from '../../core/config/env';

export class JsonPlaceholderClient {
  constructor(private readonly request: APIRequestContext) {}

  async getPosts() {
    return await this.request.get(${Config.JSONPLACEHOLDER_URL}/posts);
  }

  async getPost(id: number) {
    return await this.request.get(${Config.JSONPLACEHOLDER_URL}/posts/);
  }

  async createPost(data: { title: string; body: string; userId: number }) {
    return await this.request.post(${Config.JSONPLACEHOLDER_URL}/posts, {
      data,
    });
  }
}
