"use client";

import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import FormInput from "./input";
import { useFormState } from "react-dom";
import FormButton from "../form-button";
import { useAction } from "@/hooks/use-action";

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
      <FormInput errors={fieldErrors} />

      <FormButton />
    </form>
  );
};

export default Form;
