// Define and export types
export type PostType = {
  id: string;
  title: string;
  slug: string;
  description: string;
  featured?: boolean;
  content: string;
  status: string;
  image?: string; // Adjust type as needed (e.g., `string | null`)
  tags: string[]; // Adjust type if your JSON array has a specific shape
  author?: {
    id: string;
    username: string;
    name: string;
  };
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthorType = {
  id: string;
  username: string;
  name: string;
  title: string;
  email: string;
  image?: string; // Adjust type as needed (e.g., `string | null`)
  bio: string;
  socialLinks: SocialLink[]; // Adjust type if your JSON array has a specific shape
  createdAt: Date;
};

export type SocialLink = {
  platform: string;
  link: string;
};
