import HeroParallax from "./ui/HeroParallax";
import type { Post } from "../content/config";

export default function Home({ posts }: { posts: Post[] }) {
  const blogs = posts.map((post) => ({
    title: post.data.title,
    link: `/blog/${post.id}`,
    thumbnail: post.data.image.src,
  }));
  return <HeroParallax items={[...blogs, ...blogs, ...blogs, ...blogs]} />;
}
