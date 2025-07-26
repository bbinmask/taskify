import { Input } from "@/components/ui/input";
import React from "react";
import { useFormStatus } from "react-dom";

const FormInput = ({
  errors,
}: {
  errors?: {
    title?: string[];
  };
}) => {
  const { pending } = useFormStatus();

  return (
    <div>
      <div className="flex flex-col space-y-2">
        <Input
          type="text"
          id="title"
          name="title"
          required
          placeholder="Title"
          disabled={pending}
        />
        {errors?.title ? (
          <div className="">
            {errors.title.map((err) => (
              <p className="text-rose-500" key={err}>
                {err}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FormInput;
