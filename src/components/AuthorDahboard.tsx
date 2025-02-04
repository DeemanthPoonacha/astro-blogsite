import { useState } from "react";
import {
  FaPlus,
  FaPenToSquare,
  FaArrowUpRightFromSquare,
  FaGripVertical,
  FaGear,
  FaUserPen,
} from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import PostEditor from "./PostEditor";
import AboutEditor from "./AboutEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AuthorWithPosts, DBPost } from "@/types";
import { getDateString } from "@/utils/helpers";
import { Toaster } from "@/components/ui/toaster";

const AuthorDahboard = ({
  author,
  defaultEditingId,
  editingUser,
}: {
  author: AuthorWithPosts;
  defaultEditingId: string | null;
  editingUser?: boolean;
}) => {
  const posts = author.posts;
  const [activeSection, setActiveSection] = useState(
    editingUser ? "about" : "posts",
  );
  const [showCreateEdit, setShowCreateEdit] = useState(!!defaultEditingId);

  const [editingPost, setEditingPost] = useState<DBPost | null>(
    defaultEditingId
      ? posts?.find((post) => post.id === defaultEditingId) || null
      : null,
  );

  const postList = (
    <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1 mb-24">
      {posts.map((post) => (
        <Card
          className="@container relative flex flex-col overflow-hidden rounded-lg bg-white dark:bg-zinc-900 shadow shadow-cyan-500 hover:shadow-xl hover:shadow-cyan-500 dark:shadow hover:dark:shadow-xl hover:dark:shadow-cyan-500 dark:shadow-cyan-300"
          key={post.id}
        >
          <Badge
            className="absolute z-10 m-4 p-1.5"
            variant={post.status === "published" ? "default" : "secondary"}
          >
            {post.status.toUpperCase()}
          </Badge>
          <a
            className="absolute right-0 z-10 m-4 text-primary-foreground bg-primary p-1.5 rounded-md"
            href={`/blog/${post.slug}`}
            target="_blank"
            aria-label={`Read more about ${post.title}`}
          >
            <FaArrowUpRightFromSquare className="duration-300 hover:scale-150" />
          </a>
          <img
            loading={"lazy"}
            src={post.image?.thumbnail || "/images/logo.png"}
            alt={post.title || "Post image"}
            width={600}
            height={350}
            className="aspect-[600/350] rounded-t-rounded-lg m-0"
          />
          <CardHeader className="flex flex-col justify-between p-4 gap-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{post.title}</CardTitle>
            </div>
            <CardDescription className=" line-clamp-2">
              {post.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-between px-4 pb-4 gap-2">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline3">
                  {tag.toUpperCase()}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center mt-auto gap-2 p-4 pt-0">
            <span className="text-sm text-zinc-500 dark:text-zinc-500">
              {getDateString(post.createdAt)}
            </span>
            <div className="flex gap-2 justify-between">
              {/* <Button
                variant="destructive2"
                className="@max-[23rem]:h-9 @max-[23rem]:w-9"
                onClick={() => setPostToDelete(post.id)}
              >
                <RiDeleteBinFill size={18} />
                <span className="hidden @[23rem]:block">Delete</span>
              </Button> */}
              <Button
                className="@max-[23rem]:h-9 @max-[23rem]:w-9"
                onClick={() => {
                  setEditingPost(post);
                  setShowCreateEdit(true);
                }}
              >
                <FaPenToSquare size={18} />
                <span className="hidden @[23rem]:block">Edit</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
  const postsContent = !showCreateEdit ? (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Posts</h1>
        <Button
          onClick={() => {
            setEditingPost(null);
            setShowCreateEdit(true);
          }}
          className="flex items-center gap-2"
        >
          <FaPlus size={20} />
          Create New Post
        </Button>
      </div>
      {postList}
    </>
  ) : (
    <PostEditor
      authorId={author.id}
      post={editingPost}
      onClose={() => {
        setShowCreateEdit(false);
        window.location.replace("/dashboard");
      }}
    />
  );
  const navItems = [
    {
      id: "posts",
      label: "My Posts",
      icon: FaGripVertical,
      content: postsContent,
    },
    {
      id: "about",
      label: "About Me",
      icon: FaUserPen,
      content: <AboutEditor author={author} />,
    },
    // {
    //   id: "settings",
    //   label: "Settings",
    //   icon: FaGear,
    //   content: <div>Settings</div>,
    // },
  ];

  const mainContent = (
    <div className="flex-1 overflow-auto p-4 lg:p-8">
      {navItems.find((item) => item.id === activeSection)?.content}
    </div>
  );

  const sideBar = (
    <div className="xl:w-64 bg-zinc-200 dark:bg-zinc-800 p-4 rounded-lg rounded-r-none">
      <div className="mb-8">
        <h1 className="hidden xl:block text-xl font-bold text-zinc-800 dark:text-zinc-200">
          {author.name}
        </h1>
      </div>
      <nav>
        {navItems.map((item) => (
          <button
            key={item.id}
            title={item.label}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg mb-2 ${
              activeSection === item.id
                ? "bg-cyan-500 dark:bg-cyan-600 text-white"
                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:bg-zinc-700"
            }`}
          >
            <item.icon size={20} />
            <span className="hidden xl:block">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      <Tabs
        defaultValue="posts"
        className="lg:hidden prose dark:prose-invert w-full max-w-full rounded-lg"
        onValueChange={setActiveSection}
      >
        <TabsList className="rounded-b-none">
          {navItems.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className="flex gap-1 items-center"
            >
              <item.icon />
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent
          className="bg-zinc-100 dark:bg-zinc-900 rounded-b-lg mt-0"
          value={activeSection}
        >
          {mainContent}
        </TabsContent>
      </Tabs>
      <div className="hidden lg:flex min-h-[900px] bg-zinc-100 dark:bg-zinc-900 prose dark:prose-invert w-full max-w-full rounded-lg">
        {sideBar}
        {mainContent}
      </div>
      <Toaster />
    </>
  );
};

export default AuthorDahboard;
