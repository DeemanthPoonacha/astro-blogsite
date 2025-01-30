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
import type { DBPost, PostUpdate } from "@/types";
import { ALL_TAGS } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

const PostEditor = ({
  authorId,
  post,
  onClose = () => {},
}: {
  authorId: string;
  post: DBPost | null;
  onClose?: () => void;
}) => {
  const defaultValues: PostUpdate = {
    authorId,
    title: post?.title ?? "",
    description: post?.description ?? "",
    content: post?.content ?? "",
    tags: post?.tags ?? [],
    status: post?.status ?? "draft",
  };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const handleReset = () => reset();

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const savePost = async (data: any, status: "draft" | "published") => {
    try {
      setIsSubmitting(true);
      const url = post?.id ? `/api/posts/${post.id}` : `/api/posts`;
      const method = post?.id ? "PATCH" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          status,
        }),
      });

      if (!response.ok) throw new Error("Failed to save post");

      toast({
        fbType: "success",
        title: "Success",
        description:
          status === "published"
            ? "Post published successfully"
            : "Draft saved successfully",
      });

      if (status === "published") onClose();
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        fbType: "error",
        title: "Error",
        description: "Failed to save post. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSaveToDraft = (data: any) => savePost(data, "draft");
  const onSubmit = (data: any) => savePost(data, "published");

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
                  options={ALL_TAGS}
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

            <Button
              type="button"
              variant="outline"
              onClick={() => setShowResetDialog(true)}
            >
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
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                return setShowPreview((prev) => !prev);
              }}
            >
              <RiEyeLine size={18} />
              <span className="hidden sm:block">Preview</span>
            </Button>

            <Button
              type="submit"
              // variant="outline"
              onClick={() => {
                return setShowPreview((prev) => !prev);
              }}
            >
              <RiSendPlaneFill size={18} />
              <span className="hidden sm:block">Submit</span>
            </Button>
          </div>
        </div>
      </form>
      <ResetDialog {...{ showResetDialog, setShowResetDialog, handleReset }} />
    </div>
  );
};

export default PostEditor;
