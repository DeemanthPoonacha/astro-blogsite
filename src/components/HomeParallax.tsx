import type { PostType } from "@/types";
import HeroParallax from "./ui/HeroParallax";

export default function Home({
  posts,
  isAuthenticated,
}: {
  posts: PostType[];
  isAuthenticated: boolean;
}) {
  const blogs = posts.map((post) => ({
    title: post.title,
    link: `/blog/${post.slug}`,
    thumbnail: post.image?.thumbnail || "/images/logo.png",
  }));
  return (
    <HeroParallax
      isAuthenticated={isAuthenticated}
      items={[...blogs, ...blogs, ...blogs, ...blogs]}
    />
  );
}
