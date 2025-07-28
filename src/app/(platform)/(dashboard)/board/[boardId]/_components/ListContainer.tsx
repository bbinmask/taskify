"use client";

import { List } from "@/generated/prisma";
import { ListWithCards } from "@/types/type";
import ListForm from "./ListForm";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {
  return (
    <ol className="">
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};

export default ListContainer;
