"use client";

import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import Input from "./input";
import { useFormState } from "react-dom";
import FormButton from "../form-button";

const Form = () => {
  const initialState = { message: "", errors: {} as { title?: string[] } };

  const [state, dispatch] = useFormState(createBoard, initialState);

  return (
    <form action={dispatch}>
      <Input errors={state.errors} />

      <FormButton />
    </form>
  );
};

export default Form;
