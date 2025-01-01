import { PostList } from "@/components/postList";
import { Terminal } from "@/components/terminal";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <Terminal title="~/posts">
        <PostList />
      </Terminal>
    </main>
  );
}
