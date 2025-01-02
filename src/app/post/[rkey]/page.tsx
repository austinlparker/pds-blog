import { ArrowLeft } from "lucide-react";
import React from "react";
import Markdown, { Components } from "react-markdown";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Code } from "bright";
import readingTime from "reading-time";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkGfm from "remark-gfm";

import { Terminal } from "@/components/terminal";
import { BlueskyPostEmbed } from "@/components/bluesky-embed";
import { getPost, getPosts } from "@/lib/api";
import { DID } from "@/lib/client";

export const dynamic = "force-static";
export const revalidate = 3600;

const CODE_THEME_CONFIG = {
  dark: "github-dark",
  light: "github-light",
  lightSelector: 'html[class="light"]',
} as const;

Code.theme = CODE_THEME_CONFIG;

const SANITIZE_SCHEMA = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    img: [
      ...(defaultSchema.attributes?.img ?? []),
      "src",
      "alt",
      "title",
      "width",
      "height",
    ],
    blockquote: [
      ...(defaultSchema.attributes?.blockquote ?? []),
      "dataBlueskyUri",
      "dataBlueskyCid",
    ],
  },
} satisfies typeof defaultSchema;

const MARKDOWN_COMPONENTS: Components = {
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");

    if (match) {
      return (
        <Code
          lang={match[1]}
          {...props}
          className="mt-6 rounded-lg border border-purple-200 dark:border-purple-800
                             hover:border-purple-300 dark:hover:border-purple-700
                             transition-colors duration-200"
        >
          {String(children).replace(/\n$/, "")}
        </Code>
      );
    }

    return (
      <code
        className="bg-purple-50 dark:bg-purple-900/20
                         hover:bg-purple-100 dark:hover:bg-purple-900/30
                         px-1.5 py-0.5 rounded text-purple-700 dark:text-purple-300
                         transition-colors duration-200"
        {...props}
      >
        {children}
      </code>
    );
  },
  p: ({ children, ...props }) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props}>
      {children}
    </p>
  ),

  h1: ({ children }) => <h1 className="scroll-mt-20">{children}</h1>,
  h2: ({ children }) => <h2 className="scroll-mt-20">{children}</h2>,
  h3: ({ children }) => <h3 className="scroll-mt-20">{children}</h3>,
  h4: ({ children }) => <h4 className="scroll-mt-20">{children}</h4>,
  h5: ({ children }) => <h5 className="scroll-mt-20">{children}</h5>,
  h6: ({ children }) => <h6 className="scroll-mt-20">{children}</h6>,
  a: ({ href, children }) => <a href={href}>{children}</a>,
  blockquote: (props) =>
    "data-bluesky-uri" in props ? (
      <BlueskyPostEmbed uri={props["data-bluesky-uri"] as string} />
    ) : (
      <blockquote {...props} />
    ),

  sup: ({ children }) => <sup>{children}</sup>,

  section: ({ children, className }) => {
    if (className === "footnotes") {
      return (
        <section className="prose dark:prose-invert mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h2 className="mb-4">Footnotes</h2>
          {children}
        </section>
      );
    }
    return <section>{children}</section>;
  },

  img: ({ src, alt, ...props }) => {
    if (!src) return null;
    return (
      <span className="block my-6">
        <Image
          src={src}
          alt={alt || ""}
          width={1200}
          height={630}
          className="w-full h-auto max-h-[600px] rounded-lg object-contain mx-auto"
          quality={90}
          unoptimized
          {...props}
        />
      </span>
    );
  },
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ rkey: string }>;
}): Promise<Metadata> {
  const { rkey } = await params;
  const post = await getPost(rkey);

  return {
    title: `${post.value.title} — aparker.io`,
    authors: [{ name: "Austin", url: `https://bsky.app/profile/${DID}` }],
    description: `${formatDate(post.value.createdAt!)} · ${
      readingTime(post.value.content).text
    }`,
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
        <article className="prose dark:prose-invert max-w-none">
          <header className="space-y-4 pb-4 border-b border-gray-200 dark:border-gray-700 not-prose">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-purple-700 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>cd ..</span>
            </Link>

            <div className="space-y-1">
              <h1 className="text-4xl font-kode font-[700] text-purple-700 dark:text-purple-300">
                {post.value.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={post.value.createdAt}>
                  {formatDate(post.value.createdAt!)}
                </time>
                <span>{stats.text}</span>
              </div>
            </div>
          </header>

          <Markdown
            remarkPlugins={[remarkGfm]}
            remarkRehypeOptions={{ allowDangerousHtml: true }}
            rehypePlugins={[rehypeRaw, [rehypeSanitize, SANITIZE_SCHEMA]]}
            className="max-w-none"
            components={MARKDOWN_COMPONENTS}
          >
            {post.value.content}
          </Markdown>

          <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 not-prose">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-purple-700 dark:text-purple-300">$</span>
                <Link
                  href={`https://bsky.app/profile/${DID}`}
                  className="hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  whoami
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-700 dark:text-purple-300">$</span>
                <span className="font-mono">
                  date -r {formatDate(post.value.createdAt!)}
                </span>
              </div>
            </div>
          </footer>
        </article>
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
