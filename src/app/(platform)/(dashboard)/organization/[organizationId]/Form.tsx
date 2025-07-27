"use client";

import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/forms/form-input";
import { useFormState } from "react-dom";
import { useAction } from "@/hooks/use-action";
import FormSubmit from "@/components/forms/form-submit";

const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, " Success");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <FormInput label="Board Title" id="title" errors={fieldErrors} />

      <FormSubmit>Save</FormSubmit>
    </form>
  );
};

export default Form;
