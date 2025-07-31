"use client";

import { ComponentRef, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { CardWithList } from "@/types/type";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import FormTextArea from "@/components/forms/form-textarea";
import FormSubmit from "@/components/forms/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { toast } from "sonner";

interface DescriptionProps {
  data: CardWithList;
}

const Description = ({ data }: DescriptionProps) => {
  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      toast.success(`Card ${data.title} updated`);
      disableEditing();
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const queryClient = useQueryClient();

  const params = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<ComponentRef<"textarea">>(null);
  const formRef = useRef<ComponentRef<"form">>(null);

  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;

    if (description === data.description) {
      disableEditing();
      return;
    }
    execute({
      title: data.title,
      description,
      boardId,
      id: data.id,
    });
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef as any, disableEditing);

  return (
    <div className="flex flex-col items-center gap-x-3 w-full">
      <p className="font-semibold text-neutral-700 flex w-full items-start mb-2">
        <AlignLeft className="h-5 w-5 pt-0.5 text-neutral-700 mr-2" />
        Description
      </p>

      <div className="w-full">
        {isEditing ? (
          <form className="space-y-2" action={onSubmit} ref={formRef}>
            <FormTextArea
              errors={fieldErrors}
              id="description"
              className="w-full mt-2"
              placeholder={
                data.description || "Add a more detailed description"
              }
              ref={textareaRef}
              defaultValue={data.description || undefined}
            />

            <div className="flex items-center gap-x-2">
              <FormSubmit>Save</FormSubmit>
              <Button
                type="button"
                onClick={disableEditing}
                size={"sm"}
                variant={"ghost"}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            role="button"
            className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
            onClick={enableEditing}
          >
            {data?.description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-[78px] w-full bg-neutral-200" />
      </div>
    </div>
  );
};

export default Description;
