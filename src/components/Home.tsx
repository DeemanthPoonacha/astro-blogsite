import { HeroParallax } from "./ui/hero-parallax";
import type { Post } from "../content/config";

export default function Home({ posts }: { posts: Post[] }) {
  const blogs = posts.map((post) => ({
    title: post.data.title,
    link: `/blog/${post.slug}`,
    thumbnail: post.data.image.src,
  }));
  return <HeroParallax products={[...blogs, ...blogs, ...blogs, ...blogs]} />;
}
