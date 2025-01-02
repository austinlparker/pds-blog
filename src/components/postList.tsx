import Link from "next/link";
import { getPosts } from "@/lib/api";

export async function PostList() {
  const { posts } = await getPosts({ limit: 100 });

  // Sort posts by createdAt date in descending order
  const sortedPosts = [...posts].sort((a, b) => {
    return (
      new Date(b.value.createdAt!).getTime() -
      new Date(a.value.createdAt!).getTime()
    );
  });

  return (
    <ul className="space-y-4">
      {sortedPosts.map((post) => {
        const rkey = post.uri.split("/").pop()!;
        const date = new Date(post.value.createdAt!).toLocaleDateString();

        return (
          <li key={rkey} className="group">
            <Link
              href={`/post/${rkey}`}
              className="block -mx-2 p-2 rounded transition-colors hover:bg-purple-50 dark:hover:bg-purple-900/10"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-purple-700 dark:text-purple-300">❯</span>
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
