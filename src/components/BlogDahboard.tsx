import { useState } from "react";
import { FileText, User, Settings, Plus, Edit, Trash2 } from "lucide-react";
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

  const navItems = [
    { id: "posts", label: "My Posts", icon: FileText },
    { id: "about", label: "About Me", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white">
            {user?.firstName + " " + user?.lastName}
          </h2>
        </div>
        <nav>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg mb-2 ${
                activeSection === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        {activeSection === "posts" ? (
          !showCreateEdit ? (
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
                  <Plus size={20} />
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
                            post.status === "published"
                              ? "default"
                              : "secondary"
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
                      <span className="text-sm text-gray-500">{post.date}</span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingPost(post);
                            setShowCreateEdit(true);
                          }}
                        >
                          <Edit size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowDeleteDialog(true)}
                        >
                          <Trash2 size={18} />
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
          )
        ) : activeSection === "about" ? (
          <AboutEditor />
        ) : null}

        {/* Delete Confirmation Dialog */}
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
      </div>
    </div>
  );
};

export default DashboardLayout;
