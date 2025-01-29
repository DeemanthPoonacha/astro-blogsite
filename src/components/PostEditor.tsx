import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  RiArrowRightSLine,
  RiEyeLine,
  RiResetLeftFill,
  RiSave3Fill,
  RiSendPlaneFill,
} from "react-icons/ri";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { MultiSelect } from "./ui/multi-select";
import { ResetDialog } from "./ui/ResetDialog";
import type { DBPost } from "@/types";

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
  post: DBPost;
  onClose?: () => void;
}) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
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

  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const handleReset = () => reset();

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };

  const handleSaveToDraft = (data: any) => {
    console.log("Draft Saved:", data);
  };

  const errorTextClass = "absolute text-red-500 text-sm mt-0";
  const errorborderClass = "border-red-500";
  return (
    <div className="h-full">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-gray-400">
        <button onClick={onClose}>My Posts</button>
        <RiArrowRightSLine size={16} />
        <span className="primaryColor">
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
                  className={errors.title && errorborderClass}
                />
              )}
            />
            {errors.title && (
              <p className={errorTextClass}>{errors.title.message}</p>
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
                  className={errors.description && errorborderClass}
                />
              )}
            />
            {errors.description && (
              <p className={errorTextClass}>{errors.description.message}</p>
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
                  className={`font-mono ${errors.content && errorborderClass}`}
                />
              )}
            />
            {errors.content && (
              <p className={errorTextClass}>{errors.content.message}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          {/* Left Buttons */}
          <div className="flex gap-2">
            {/* Publish Button */}
            {/* <Button type="submit">
              <RiSendPlaneFill size={18} />
              Submit
            </Button> */}

            <Button variant="outline" onClick={() => setShowResetDialog(true)}>
              <RiResetLeftFill size={18} />
              Reset
            </Button>
            <Button
              variant="secondary"
              onClick={handleSubmit(handleSaveToDraft)}
            >
              <RiSave3Fill size={18} />
              <span className="flex items-center gap-1">
                <span className="hidden sm:block">Save to</span>Draft
              </span>
            </Button>
          </div>

          <Button
            // variant="outline"
            onClick={() => {
              return setShowPreview((prev) => !prev);
            }}
          >
            <a
              href={`?previewId=${post?.slug}`}
              className="text-primary-foreground"
            >
              <RiEyeLine size={18} />
            </a>
            <span className="hidden sm:block">Preview</span>
          </Button>
        </div>
      </form>
      <ResetDialog {...{ showResetDialog, setShowResetDialog, handleReset }} />
    </div>
  );
};

export default PostEditor;
