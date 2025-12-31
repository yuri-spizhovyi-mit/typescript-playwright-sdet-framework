import type { APIRequestContext, APIResponse } from "@playwright/test";
import { Config } from "../../core/config/env";

export class JsonPlaceholderClient {
  constructor(private readonly request: APIRequestContext) {}

  async getPosts(): Promise<APIResponse> {
    return this.request.get(`${Config.JSONPLACEHOLDER_URL}/posts`);
  }

  async getPost(id: number): Promise<APIResponse> {
    return this.request.get(`${Config.JSONPLACEHOLDER_URL}/posts/${id}`);
  }

  async createPost(data: {
    title: string;
    body: string;
    userId: number;
  }): Promise<APIResponse> {
    return this.request.post(`${Config.JSONPLACEHOLDER_URL}/posts`, { data });
  }
}
