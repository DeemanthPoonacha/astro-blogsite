import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ChevronRight, Eye, Save } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { MultiSelect } from "./ui/multi-select";
import type { Post } from "./BlogDahboard";

const tagList = [
  { value: "lifestyle", label: "Lifestyle" },
  { value: "food", label: "Food" },
  { value: "travel", label: "Travel" },
  { value: "health", label: "Health" },
  { value: "fitness", label: "Fitness" },
  { value: "music", label: "Music" },
  { value: "books", label: "Books" },
  { value: "movies", label: "Movies" },
  { value: "tv-shows", label: "TV Shows" },
  { value: "news", label: "News" },
  { value: "sports", label: "Sports" },
  { value: "gaming", label: "Gaming" },
  { value: "art", label: "Art" },
  { value: "science", label: "Science" },
  { value: "technology", label: "Technology" },
  { value: "history", label: "History" },
  { value: "culture", label: "Culture" },
  { value: "automobile", label: "Automobile" },
  { value: "career", label: "Career" },
  { value: "guide", label: "Guide" },
  { value: "fashion", label: "Fashion" },
];

const PostEditor = ({
  post,
  onClose = () => {},
}: {
  post: Post;
  onClose?: () => void;
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: post || {
      title: "",
      description: "",
      content: "",
      tags: [],
      status: "draft",
    },
  });

  const [isPreview, setIsPreview] = useState(false);

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };

  const handleSaveToDraft = (data: any) => {
    console.log("Draft Saved:", data);
  };

  return (
    <div className="h-full">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-gray-400">
        <button onClick={onClose}>My Posts</button>
        <ChevronRight size={16} />
        <span className="text-white">
          {watch("title") || "Create New Post"}
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4">
          {/* Title */}
          <div>
            <Label>Title</Label>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter post title"
                  className={errors.title && "border-red-500"}
                />
              )}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Enter post description"
                  rows={3}
                  className={errors.description && "border-red-500"}
                />
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image */}
          <div>
            <Label>Image</Label>
            <Input type="file" accept="image/*" />
          </div>

          {/* Tags */}
          <div>
            <Label>Tags</Label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  options={tagList}
                  onValueChange={(selectedTags) => field.onChange(selectedTags)}
                  defaultValue={field.value}
                  placeholder="Select tags"
                  maxCount={4}
                />
              )}
            />
          </div>

          {/* Content */}
          <div>
            <Label>Content</Label>
            <Controller
              name="content"
              control={control}
              rules={{ required: "Content is required" }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Write your post content in Markdown..."
                  rows={15}
                  className={`font-mono ${errors.content && "border-red-500"}`}
                />
              )}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          {/* Left Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsPreview((prev) => !prev)}
            >
              <Eye className="mr-2" size={18} />
              {isPreview ? "Close Preview" : "Preview"}
            </Button>
            <Button
              variant="secondary"
              onClick={handleSubmit(handleSaveToDraft)}
            >
              <Save className="mr-2" size={18} />
              Save to Draft
            </Button>
          </div>

          {/* Publish Button */}
          <Button type="submit">Save & Publish</Button>
        </div>
      </form>
    </div>
  );
};

export default PostEditor;
