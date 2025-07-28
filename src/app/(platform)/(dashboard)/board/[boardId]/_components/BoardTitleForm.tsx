"use client";

import { ComponentRef, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Board } from "@/generated/prisma";
import FormInput from "@/components/forms/form-input";

interface BoardTitleFormProps {
  data: Board;
}
const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ComponentRef<"form">>(null);
  const inputRef = useRef<ComponentRef<"input">>(null);

  const disableEditing = () => {
    setIsEditing(false);
  };
  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title");
    console.log("I'm submitting: ", title);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        ref={formRef}
        action={onSubmit}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={data.title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant={"transparent"}
      className="font-bold text-lg h-auto w-auto py-1 px-2"
    >
      {data.title}
    </Button>
  );
};

export default BoardTitleForm;
