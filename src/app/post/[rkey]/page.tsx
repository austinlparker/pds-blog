import { ArrowLeft } from "lucide-react";
import Markdown from "react-markdown";
import { type Metadata } from "next";
import Link from "next/link";
import { Code } from "bright";
import readingTime from "reading-time";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

import { Terminal } from "@/components/terminal";
import { BlueskyPostEmbed } from "@/components/bluesky-embed";
import { getPost, getPosts } from "@/lib/api";
import { DID } from "@/lib/client";

export const dynamic = "force-static";
export const revalidate = 3600;

Code.theme = {
  dark: "github-dark",
  light: "github-light",
  lightSelector: 'html[class="light"]',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ rkey: string }>;
}): Promise<Metadata> {
  const { rkey } = await params;
  const post = await getPost(rkey);

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
    ),
    title: `${post.value.title}`,
    authors: [{ name: "Austin", url: `https://bsky.app/profile/${DID}` }],
    description: post.value.content.slice(0, 160),
    openGraph: {
      title: post.value.title,
      description: post.value.content.slice(0, 160),
      type: "article",
      images: [
        {
          url: `/post/${rkey}/opengraph-image`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.value.title,
      description: post.value.content.slice(0, 160),
      images: [`/post/${rkey}/opengraph-image`],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ rkey: string }>;
}) {
  const { rkey } = await params;
  const post = await getPost(rkey);
  const stats = readingTime(post.value.content);

  return (
    <main className="min-h-screen p-4 md:p-8">
      <Terminal title={`~/posts/${rkey}`}>
        <div className="space-y-6">
          <header className="space-y-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>cd ..</span>
            </Link>

            <div className="space-y-1">
              <h1 className="text-2xl font-kode font-bold">
                {post.value.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={post.value.createdAt}>
                  {new Date(post.value.createdAt!).toLocaleDateString()}
                </time>
                <span>{stats.text}</span>
              </div>
            </div>
          </header>

          {/* Content */}
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            className="markdown-content"
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const code = String(children).replace(/\n$/, "");

                if (inline) {
                  return (
                    <code
                      className="font-mono text-green-600 dark:text-green-400"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }

                return match ? (
                  <Code
                    lang={match[1]}
                    {...props}
                    className="!mt-4 !text-sm !rounded-lg !border !border-gray-200 !dark:border-gray-700"
                  >
                    {code}
                  </Code>
                ) : (
                  <code
                    className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              h1: (props) => <h1 {...props} />,
              h2: (props) => <h2 {...props} />,
              h3: (props) => <h3 {...props} />,
              a: ({ href, ...props }) => (
                <a
                  href={href}
                  className="text-green-600 dark:text-green-400 border-b border-green-200 dark:border-green-800 hover:border-green-600 dark:hover:border-green-400 transition-colors"
                  {...props}
                />
              ),
              blockquote: (props) =>
                "data-bluesky-uri" in props ? (
                  <BlueskyPostEmbed uri={props["data-bluesky-uri"] as string} />
                ) : (
                  <blockquote
                    {...props}
                    className="border-l-4 border-green-200 dark:border-green-800 pl-4 italic text-gray-600 dark:text-gray-300"
                  />
                ),
              sup: ({ children }) => (
                <sup className="text-xs text-green-600 dark:text-green-400">
                  {children}
                </sup>
              ),
              // Style the footnotes section
              section: ({ children, className }) => {
                if (className === "footnotes") {
                  return (
                    <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                      <h2 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">
                        Footnotes
                      </h2>
                      {children}
                    </section>
                  );
                }
                return <section>{children}</section>;
              },
            }}
          >
            {post.value.content}
          </Markdown>

          <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center justify-between">
              <Link
                href={`https://bsky.app/profile/${DID}`}
                className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                @{DID.split(":").pop()}
              </Link>
              <span>
                Last modified:{" "}
                {new Date(post.value.createdAt!).toLocaleDateString()}
              </span>
            </div>
          </footer>
        </div>
      </Terminal>
    </main>
  );
}

export async function generateStaticParams() {
  const { posts } = await getPosts();
  return posts.map((post) => ({
    rkey: post.uri.split("/").pop()!,
  }));
}
