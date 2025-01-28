import type { PostType } from "@/types";
import HeroParallax from "./ui/HeroParallax";

export default function Home({ posts }: { posts: PostType[] }) {
  const blogs = posts.map((post) => ({
    title: post.title,
    link: `/blog/${post.slug}`,
    thumbnail: post.image as string,
  }));
  return <HeroParallax items={[...blogs, ...blogs, ...blogs, ...blogs]} />;
}
