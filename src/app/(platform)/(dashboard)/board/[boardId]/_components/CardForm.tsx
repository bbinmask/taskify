"use client";

import { createCard } from "@/actions/create-card";
import FormSubmit from "@/components/forms/form-submit";
import FormTextArea from "@/components/forms/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Plus, X } from "lucide-react";
import { forwardRef } from "react";

interface CardFormProps {
  listId: string;
  enableEditing: (val: boolean) => void;
  disableEditing: (val: boolean) => void;
  isEditing: boolean;
}
const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const {} = useAction(createCard, {});

    if (isEditing) {
      return (
        <form action="" className="m-1 py-0.5 px-1 space-y-4">
          <FormTextArea
            id="title"
            onKeyDown={() => {}}
            ref={ref}
            placeholder="Enter a title for this card"
          />
          <input type="text" readOnly hidden name="listId" value={listId} />

          <div className="flex items-center gap-x-1">
            <FormSubmit>Add card</FormSubmit>
            <Button
              onClick={() => disableEditing(false)}
              variant={"ghost"}
              size={"sm"}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2">
        <Button
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          onClick={() => enableEditing(true)}
          variant={"ghost"}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a card
        </Button>
      </div>
    );
  }
);

export default CardForm;
