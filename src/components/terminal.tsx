import {
  siBluesky as BlueskyIcon,
  siGithub as GithubIcon,
  siRss as RssIcon,
} from "simple-icons";
import { ThemeToggle } from "./theme-toggle";
import { DID } from "@/lib/client";

interface TerminalProps {
  children: React.ReactNode;
  title?: string;
}

function SocialLinks() {
  return (
    <>
      <a
        href={`https://bsky.app/profile/${DID}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg
                   hover:bg-purple-50 dark:hover:bg-purple-900/10
                   transition-colors duration-200"
        aria-label="Bluesky Profile"
      >
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          className="fill-gray-600 dark:fill-gray-400
                     hover:fill-purple-700 dark:hover:fill-purple-300
                     transition-colors duration-200"
        >
          <path d={BlueskyIcon.path} />
        </svg>
      </a>
      <a
        href={`https://github.com/austinlparker`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg
                   hover:bg-purple-50 dark:hover:bg-purple-900/10
                   transition-colors duration-200"
        aria-label="GitHub Profile"
      >
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          className="fill-gray-600 dark:fill-gray-400
                     hover:fill-purple-700 dark:hover:fill-purple-300
                     transition-colors duration-200"
        >
          <path d={GithubIcon.path} />
        </svg>
      </a>
      <a
        href="/rss"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg
                   hover:bg-purple-50 dark:hover:bg-purple-900/10
                   transition-colors duration-200"
        aria-label="RSS Feed"
      >
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          className="fill-gray-600 dark:fill-gray-400
                     hover:fill-purple-700 dark:hover:fill-purple-300
                     transition-colors duration-200"
        >
          <path d={RssIcon.path} />
        </svg>
      </a>
    </>
  );
}

export function Terminal({ children, title = "terminal" }: TerminalProps) {
  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg">
      {/* Title bar */}
      <div className="relative flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800/50">
        <div className="flex items-center gap-2">
          {/* Window controls */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/90 dark:bg-red-600/90" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/90 dark:bg-yellow-600/90" />
            <div className="w-3 h-3 rounded-full bg-green-500/90 dark:bg-green-600/90" />
          </div>

          {/* Title */}
          <span className="font-mono text-sm text-gray-600 dark:text-gray-400 select-none">
            {title}
          </span>
        </div>

        {/* Social links and theme toggle - hidden on mobile */}
        <div className="hidden md:flex items-center gap-2">
          <SocialLinks />
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
          <ThemeToggle />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-white dark:bg-gray-900 min-h-[200px]">
        {children}
      </div>

      {/* Mobile social links and theme toggle - shown at bottom on mobile */}
      <div className="md:hidden flex items-center justify-center gap-2 p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <SocialLinks />
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
        <ThemeToggle />
      </div>
    </div>
  );
}
