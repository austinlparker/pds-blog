import {
  type ComAtprotoRepoListRecords,
  type ComWhtwndBlogEntry,
} from "@atcute/client/lexicons";

import { bsky } from "./client";

export interface GetPostsOptions {
  limit?: number;
  cursor?: string;
  reverse?: boolean;
  includeDrafts?: boolean;
}

export async function getPosts(options: GetPostsOptions = {}) {
  const posts = await bsky.get("com.atproto.repo.listRecords", {
    params: {
      repo: process.env.ACCOUNT_DID!,
      collection: "com.whtwnd.blog.entry",
      limit: options.limit,
      cursor: options.cursor,
      reverse: options.reverse,
    },
  });

  return {
    cursor: posts.data.cursor,
    posts: posts.data.records as (ComAtprotoRepoListRecords.Record & {
      value: ComWhtwndBlogEntry.Record;
    })[],
  };
}

export async function getPost(rkey: string) {
  const post = await bsky.get("com.atproto.repo.getRecord", {
    params: {
      repo: process.env.ACCOUNT_DID!,
      rkey: rkey,
      collection: "com.whtwnd.blog.entry",
    },
  });

  return post.data as ComAtprotoRepoListRecords.Record & {
    value: ComWhtwndBlogEntry.Record;
  };
}
