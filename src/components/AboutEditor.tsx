import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { RiResetLeftFill, RiSave3Fill } from "react-icons/ri";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { ResetDialog } from "./ui/ResetDialog";
import type { DBAuthor } from "@/types";
import { SOCIAL_LINKS } from "./SocialIcon";

const AboutEditor = ({ author }: { author: DBAuthor }) => {
  const [showResetDialog, setShowResetDialog] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      penName: author.penName ?? author.name,
      title: author.title,
      bio: author.bio,
      socials: author.socialLinks,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socials",
  });

  const handleReset = () => reset();

  const onSubmit = (data: any) => {
    console.log("Saved Data:", data);
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

        {/* <div>
          <Label>Profile Image</Label>
          <Input type="file" accept="image/*" />
        </div> */}

        <div>
          <Label>Social Links</Label>
          {fields.map((field, index) => (
            <div key={field.id} className="mb-2 flex gap-2 items-center">
              <Controller
                name={`socials.${index}.platform`}
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
                        `socials.${index}.link`,
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
                name={`socials.${index}.link`}
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Link" className="flex-1" />
                )}
              />
              <Button
                variant="outline"
                onClick={() => remove(index)}
                className="px-3"
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
        >
          <RiResetLeftFill size={18} />
          Reset
        </Button>
        <Button type="submit">
          <RiSave3Fill size={18} />
          Save Changes
        </Button>
      </div>

      {/* Reset Confirmation Dialog */}
      <ResetDialog {...{ showResetDialog, setShowResetDialog, handleReset }} />
    </form>
  );
};

export default AboutEditor;
