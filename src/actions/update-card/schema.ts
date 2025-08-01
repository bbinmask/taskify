import { z } from "zod";

export const UpdateCard = z.object({
  title: z.string().min(3, {
    message: "Title is too short",
  }),
  boardId: z.string(),
  description: z.optional(
    z.string().min(3, { message: "Description is too short" })
  ),
  id: z.string(),
});
