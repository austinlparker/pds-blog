import Link from "next/link";
import { getPosts } from "@/lib/api";

export async function PostList() {
  const { posts } = await getPosts({ limit: 100 });

  return (
    <ul className="space-y-4">
      {posts.map((post) => {
        const rkey = post.uri.split("/").pop()!;
        const date = new Date(post.value.createdAt!).toLocaleDateString();

        return (
          <li key={rkey} className="group">
            <Link
              href={`/post/${rkey}`}
              className="block -mx-2 p-2 rounded transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-green-600 dark:text-green-400">❯</span>
                <span className="flex-1 font-kode font-bold">
                  {post.value.title}
                </span>
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  {date}
                </time>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
