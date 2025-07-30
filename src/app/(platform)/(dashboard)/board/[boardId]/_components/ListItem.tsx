"use client";

import { ComponentRef, useRef, useState } from "react";
import { ListWithCards } from "@/types/type";
import ListHeader from "./ListHeader";
import CardForm from "./CardForm";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}

const ListItem = ({ data, index }: ListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const textareaRef = useRef<ComponentRef<"textarea">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    textareaRef.current?.focus();
  };
  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader onAddCard={enableEditing} data={data} />

        <CardForm
          ref={textareaRef}
          listId={data.id}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  );
};

export default ListItem;
