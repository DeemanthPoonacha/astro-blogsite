import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { RiResetLeftFill, RiSave3Fill } from "react-icons/ri";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const platforms = [
  {
    value: "linkedin",
    label: "LinkedIn",
    link: "https://www.linkedin.com/",
  },
  {
    value: "github",
    label: "GitHub",
    link: "https://github.com/",
  },
  {
    value: "x",
    label: "X",
    link: "https://www.x.com/",
  },
  {
    value: "instagram",
    label: "Instagram",
    link: "https://instagram.com/",
  },
  {
    value: "other",
    label: "Other",
  },
];

const AboutEditor = () => {
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
      displayName: "",
      subtitle: "",
      content: "",
      socials: [
        {
          platform: "linkedin",
          link: "https://www.linkedin.com/",
        },
        { platform: "x", link: "https://www.x.com/" },
        {
          platform: "instagram",
          link: "https://instagram.com/",
        },
      ],
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
          <Label>Display Name</Label>
          <Controller
            name="displayName"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter your display name" />
            )}
          />
        </div>

        <div>
          <Label>Subtitle</Label>
          <Controller
            name="subtitle"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter a brief subtitle" />
            )}
          />
        </div>

        <div>
          <Label>Profile Image</Label>
          <Input type="file" accept="image/*" />
        </div>

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
                      const selectedPlatform = platforms.find(
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
                        {platforms.map(({ value, label }) => (
                          <SelectItem key={value} value={value}>
                            {label}
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
          <Label>About Me Content</Label>
          <Controller
            name="content"
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
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Changes</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reset all changes? This will revert
              everything back to the last saved state.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset}>Reset</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
};

export default AboutEditor;
