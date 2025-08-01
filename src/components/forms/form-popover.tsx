"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import FormInput from "./form-input";
import FormSubmit from "./form-submit";
import { PopoverClose } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";
import FormPicker from "./form-picker";
import { ComponentRef, useRef } from "react";
import { redirect } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";

interface FormPopoverProps {
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
}

const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset,
}: FormPopoverProps) => {
  const proModal = useProModal();

  const closeRef = useRef<ComponentRef<"button">>(null);

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success(`${data.title} board is created`);
      closeRef.current?.click();
      redirect(`/board/${data.id}`);
    },
    onError: (err) => {
      toast.error(err);
      proModal.onOpen();
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    execute({ title, image });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create Board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant={"ghost"}
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput id="title" label="Board title" errors={fieldErrors} />
          </div>

          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
