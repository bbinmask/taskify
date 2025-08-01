import { z } from "zod";
import { Card } from "@/generated/prisma";

import { ActionState } from "@/lib/create-safe-action";
import { CopyCard } from "./schema";

export type InputType = z.infer<typeof CopyCard>;
export type ReturnType = ActionState<InputType, Card>;
