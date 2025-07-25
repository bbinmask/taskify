"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { InputType, ReturnType } from "./types";
import {} from "@clerk/nextjs/server";
import { useAuth } from "@clerk/nextjs";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = useAuth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  const { title } = data;

  let board;

  try {
    board = await db.board.create({
      data: { title },
    });
  } catch (error: any) {
    return {
      error: error.message || "Failed to create",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
