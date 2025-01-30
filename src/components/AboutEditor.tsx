import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { RiResetLeftFill, RiSave3Fill } from "react-icons/ri";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { useToast } from "@/hooks/use-toast";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { ResetDialog } from "./ui/ResetDialog";
import type { AuthorUpdate, DBAuthor, SocialLink } from "@/types";
import { SOCIAL_LINKS } from "./SocialIcon";

const AboutEditor = ({ author }: { author: DBAuthor }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      penName: author.penName ?? author.name,
      title: author.title,
      bio: author.bio,
      socialLinks: author.socialLinks,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const handleReset = () => reset();

  const onSubmit = async (data: AuthorUpdate) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    try {
      setIsSubmitting(true);

      const response = await fetch(`/api/authors/${author.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update profile");
      }

      toast({
        fbType: "success",
        title: "Success",
        description: "Your profile has been updated.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        fbType: "error",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-2xl font-bold">About Me</h1>

      <div className="space-y-4">
        <div>
          <Label>Pen Name</Label>
          <Controller
            name="penName"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter your pen name" />
            )}
          />
        </div>

        <div>
          <Label>Title</Label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter a brief title" />
            )}
          />
        </div>

        <div>
          <Label>Social Links</Label>
          {fields.map((field, index) => (
            <div key={field.id} className="mb-2 flex gap-2 items-center">
              <Controller
                name={`socialLinks.${index}.platform`}
                control={control}
                render={({ field: selectField }) => (
                  <Select
                    {...selectField}
                    onValueChange={(value) => {
                      const selectedPlatform = SOCIAL_LINKS.find(
                        (platform) => platform.value === value,
                      );
                      selectField.onChange(value);
                      setValue(
                        `socialLinks.${index}.link`,
                        selectedPlatform?.link || "",
                      );
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {SOCIAL_LINKS.map(({ value, label, icon }) => (
                          <SelectItem key={value} value={value}>
                            <span className="flex items-center gap-2">
                              {icon}
                              {label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <Controller
                name={`socialLinks.${index}.link`}
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Link" className="flex-1" />
                )}
              />
              <Button
                variant="outline"
                onClick={() => remove(index)}
                className="px-3"
                type="button"
              >
                Delete
              </Button>
            </div>
          ))}
          {fields.length < 5 && (
            <Button
              variant="outline"
              onClick={() => append({ platform: "", link: "" })}
              className="mt-2"
              type="button"
            >
              Add Social Link
            </Button>
          )}
        </div>

        <div>
          <Label>My Bio</Label>
          <Controller
            name="bio"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder="Write about yourself in Markdown..."
                rows={10}
                className="font-mono"
              />
            )}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          type="button"
          onClick={() => setShowResetDialog(true)}
          disabled={isSubmitting}
        >
          <RiResetLeftFill size={18} className="mr-2" />
          Reset
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          <RiSave3Fill size={18} className="mr-2" />
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <ResetDialog {...{ showResetDialog, setShowResetDialog, handleReset }} />
    </form>
  );
};

export default AboutEditor;
