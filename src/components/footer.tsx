import { siBluesky as BlueskyIcon, siGithub as GithubIcon } from "simple-icons";

import { DID } from "@/lib/client";

export function Footer() {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href={`https://bsky.app/profile/${DID}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          className="fill-black dark:fill-white"
        >
          <path d={BlueskyIcon.path} />
        </svg>
        Bluesky
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://github.com/austinlparker"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          className="fill-black dark:fill-white"
        >
          <path d={GithubIcon.path} />
        </svg>
        GitHub
      </a>
    </footer>
  );
}