import type { APIRequestContext, APIResponse } from "@playwright/test";
import { Config } from "../../core/config/env";

export class JsonPlaceholderClient {
  constructor(private readonly request: APIRequestContext) {}

  async getPosts(): Promise<APIResponse> {
    return this.request.get("/posts");
  }

  async getPost(id: number): Promise<APIResponse> {
    return this.request.get(`/posts/${id}`);
  }

  async createPost(data: {
    title: string;
    body: string;
    userId: number;
  }): Promise<APIResponse> {
    return this.request.post("/posts", { data });
  }

  async updatePost(
    id: number,
    data: {
      title: string;
      body: string;
      userId: number;
    }
  ) {
    return this.request.put(`/posts/${id}`, { data });
  }
  async patchPost(id: number, data: Partial<{ title: string; body: string }>) {
    return this.request.patch(`/posts/${id}`, { data });
  }
  async deletePost(id: number) {
    return this.request.delete(`/posts/${id}`);
  }
}
