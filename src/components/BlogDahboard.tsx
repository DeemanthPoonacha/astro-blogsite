import { useState } from "react";
import {
  RiAddFill,
  RiDeleteBinFill,
  RiEditFill,
  RiFileTextFill,
  RiSettings3Fill,
  RiUser3Fill,
} from "react-icons/ri";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import PostEditor from "./PostEditor";
import AboutEditor from "./AboutEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample blog posts data
const allPosts = [
  {
    id: 1,
    title: "Getting Started with Astro",
    description: "Learn how to build modern websites with Astro",
    status: "published",
    tags: ["astro", "webdev", "tutorial"],
    date: "2025-01-17",
    content: "",
  },
  {
    id: 2,
    title: "React Best Practices",
    description: "Essential tips for React development",
    status: "draft",
    tags: ["react", "javascript", "frontend"],
    date: "2025-01-16",
    content: "",
  },
];
export type Post = {
  id: number;
  title: string;
  description: string;
  status: string;
  tags: string[];
  date: string;
  content: string;
};

const DashboardLayout = ({
  posts = allPosts,
  user,
}: {
  posts?: Post[];
  user: any;
}) => {
  const [activeSection, setActiveSection] = useState("posts");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showCreateEdit, setShowCreateEdit] = useState(false);

  const [editingPost, setEditingPost] = useState<Post | null>(null);

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
          <RiAddFill size={20} />
          Create New Post
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <Badge
                  variant={
                    post.status === "published" ? "default" : "secondary"
                  }
                >
                  {post.status}
                </Badge>
              </div>
              <CardDescription>{post.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-sm text-zinc-500 dark:text-zinc-500">
                {post.date}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingPost(post);
                    setShowCreateEdit(true);
                  }}
                >
                  <RiEditFill size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <RiDeleteBinFill size={18} />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  ) : (
    <PostEditor
      post={editingPost as Post}
      onClose={() => setShowCreateEdit(false)}
    />
  );
  const navItems = [
    {
      id: "posts",
      label: "My Posts",
      icon: RiFileTextFill,
      content: postsContent,
    },
    {
      id: "about",
      label: "About Me",
      icon: RiUser3Fill,
      content: <AboutEditor />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: RiSettings3Fill,
      content: <div>Settings</div>,
    },
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
          {user?.firstName + " " + user?.lastName}
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

  const deleteConfirmationDialog = (
    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Post</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 hover:bg-red-700">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <>
      <Tabs
        defaultValue="posts"
        className="lg:hidden"
        onValueChange={setActiveSection}
      >
        <TabsList className="rounded-b-none">
          {navItems.map((item) => (
            <>
              <TabsTrigger key={item.id} value={item.id}>
                {item.label}
              </TabsTrigger>
            </>
          ))}
        </TabsList>

        <TabsContent
          className="bg-zinc-100 dark:bg-zinc-900 rounded-b-lg mt-0"
          value={activeSection}
        >
          {mainContent}
        </TabsContent>
      </Tabs>
      <div className="hidden lg:flex h-screen bg-zinc-100 dark:bg-zinc-900 prose dark:prose-invert w-full max-w-full rounded-lg">
        {sideBar}
        {mainContent}

        {deleteConfirmationDialog}
      </div>
    </>
  );
};

export default DashboardLayout;
