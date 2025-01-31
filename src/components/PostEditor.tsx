import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  RiArrowRightSLine,
  RiEyeLine,
  RiEyeOffLine,
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
import { marked } from "marked";
import { getDateString } from "@/utils/helpers";

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
    getValues,
    setValue,
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

  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast({
        fbType: "error",
        title: "Invalid file type",
        description: "Please upload a JPEG, PNG, or WebP image",
      });
      return;
    }

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      toast({
        fbType: "error",
        title: "File too large",
        description: "Image must be less than 10MB",
      });
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const { url, thumbnail, hero } = await response.json();

      // Store all URLs in your form
      setValue("image", {
        url,
        thumbnail,
        hero,
      });

      toast({
        fbType: "success",
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        fbType: "error",
        title: "Error",
        description: "Failed to upload image. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };
  const errorTextClass = "absolute text-red-500 text-sm mt-0";
  const errorborderClass = "border-red-500";
  return (
    <div className="h-full">
      <div className="mb-6 flex gap-2 justify-between items-center">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-400">
          <button onClick={onClose}>My Posts</button>
          <RiArrowRightSLine size={16} />
          <span className="primaryColor">
            {watch("title") || "Create New Post"}
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => {
            return setShowPreview((prev) => !prev);
          }}
        >
          {showPreview ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
          <span className="hidden sm:block">
            {showPreview ? "Close Preview" : "Preview"}
          </span>
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {showPreview ? (
          <>
            <h1>{getValues("title")}</h1>
            {getValues("image") && (
              <img
                src={getValues("image")?.hero}
                width={1024}
                height={683}
                alt={"Post image"}
                className="w-full rounded-2xl shadow-xl mb-6 object-top"
              />
            )}
            <p>{getValues("description")}</p>
            <span className="flex justify-between max-w-full prose dark:prose-invert">
              <span>Last updated: {getDateString(new Date())}</span>
              <span>Published: {getDateString(new Date())}</span>
            </span>
            <hr />
            <article
              dangerouslySetInnerHTML={{
                __html: marked.parse(getValues("content") || ""),
              }}
            />
          </>
        ) : (
          <div className="grid gap-4">
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
            {/* Image Upload Section */}
            <div>
              <Label>Cover Image</Label>
              <div className="space-y-2">
                <Controller
                  name="image"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <Input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          // Validate file type and size
                          const validTypes = [
                            "image/jpeg",
                            "image/png",
                            "image/webp",
                          ];
                          if (!validTypes.includes(file.type)) {
                            toast({
                              fbType: "error",
                              title: "Invalid file type",
                              description:
                                "Please upload a JPEG, PNG, or WebP image",
                            });
                            return;
                          }

                          const MAX_SIZE = 10 * 1024 * 1024; // 10MB
                          if (file.size > MAX_SIZE) {
                            toast({
                              fbType: "error",
                              title: "File too large",
                              description: "Image must be less than 10MB",
                            });
                            return;
                          }

                          try {
                            setIsUploading(true);
                            const formData = new FormData();
                            formData.append("image", file);

                            const response = await fetch("/api/upload", {
                              method: "POST",
                              body: formData,
                            });

                            if (!response.ok) {
                              throw new Error("Failed to upload image");
                            }

                            const { url, thumbnail, hero } =
                              await response.json();
                            onChange({ url, thumbnail, hero }); // Use RHF's onChange

                            toast({
                              fbType: "success",
                              title: "Success",
                              description: "Image uploaded successfully",
                            });
                          } catch (error) {
                            console.error("Error uploading image:", error);
                            toast({
                              fbType: "error",
                              title: "Error",
                              description:
                                "Failed to upload image. Please try again.",
                            });
                          } finally {
                            setIsUploading(false);
                          }
                        }}
                        disabled={isUploading}
                      />
                      {isUploading && (
                        <p className="text-sm text-gray-500">
                          Uploading image...
                        </p>
                      )}
                      {value?.hero && (
                        <div className="relative w-full h-40">
                          <img
                            src={value.hero}
                            alt="Preview"
                            className="rounded-md object-cover w-full h-full"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => onChange(null)} // Use RHF's onChange
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                />
              </div>
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
                    onValueChange={(selectedTags) =>
                      field.onChange(selectedTags)
                    }
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
        )}

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowResetDialog(true)}
            >
              <RiResetLeftFill size={18} />
              Reset
            </Button>
            <Button variant="default" onClick={handleSubmit(handleSaveToDraft)}>
              <RiSave3Fill size={18} />
              <span className="flex items-center gap-1">
                <span className="hidden sm:block">Save to</span>Draft
              </span>
            </Button>
          </div>
          <Button
            type="submit"
            onClick={() => {
              return setShowPreview((prev) => !prev);
            }}
          >
            <RiSendPlaneFill size={18} />
            <span className="hidden sm:block">Submit</span>
          </Button>
        </div>
      </form>
      <ResetDialog {...{ showResetDialog, setShowResetDialog, handleReset }} />
    </div>
  );
};

export default PostEditor;
