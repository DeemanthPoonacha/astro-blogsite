export type SocialLink = {
  platform: string;
  link: string;
};

export type DBPost = {
  title: string;
  image: string | null;
  id: string;
  slug: string;
  createdAt: Date;
  description: string;
  content: string;
  status: string;
  featured: boolean | null;
  tags: string[];
  authorId: string;
  publishedAt: Date | null;
  updatedAt: Date;
};

export type PostType = {
  id: string;
  title: string;
  slug: string;
  description: string;
  featured?: boolean;
  content: string;
  status: string;
  image?: string;
  tags: string[];
  authorId?: string;
  author?: {
    id: string;
    username: string;
    name: string;
  };
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type PostUpdate = {
  title: string;
  description: string;
  content: string;
  tags: string[];
  status: string;
  image?: string;
  authorId: string;
};

export type DBAuthor = {
  id: string;
  username: string;
  name: string;
  penName: string | null;
  title: string;
  email: string;
  image: string | null;
  bio: string;
  socialLinks: SocialLink[];
  createdAt: Date;
};
export type AuthorType = {
  id: string;
  username: string;
  name: string;
  title: string;
  email: string;
  image?: string;
  bio: string;
  socialLinks: SocialLink[];
  createdAt: Date;
};

export type AuthorUpdate = {
  penName: string;
  title: string;
  bio: string;
  socialLinks: SocialLink[];
};

export interface AuthorWithPosts extends DBAuthor {
  posts: DBPost[];
}
