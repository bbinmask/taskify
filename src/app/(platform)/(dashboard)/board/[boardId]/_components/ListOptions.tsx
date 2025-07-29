"use client";

import FormSubmit from "@/components/forms/form-submit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";

import { List } from "@/generated/prisma";
import { MoreHorizontal, X } from "lucide-react";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant={"ghost"}>
          <MoreHorizontal />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb4">
          List Actions
        </div>

        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant={"ghost"}
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start text-sm"
          variant="ghost"
        >
          Add a card...
        </Button>

        <form action="" className="">
          <input
            type="text"
            hidden
            readOnly
            value={data.id}
            id="id"
            name="id"
          />
          <input
            type="text"
            hidden
            readOnly
            value={data.boardId}
            id="boardId"
            name="boardId"
          />

          <FormSubmit
            className="rounded-none w-full h-auto p-2 px-5 justify-start text-sm"
            variant="ghost"
          >
            Copy list...
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
