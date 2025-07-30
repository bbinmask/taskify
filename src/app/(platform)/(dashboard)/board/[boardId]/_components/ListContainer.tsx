"use client";

import { useEffect, useState } from "react";
import { debounce, cloneDeep } from "lodash";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { ListWithCards } from "@/types/type";
import ListForm from "./ListForm";
import ListItem from "./ListItem";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update-card-order";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export function reorder<T>(list: T[], start: number, end: number) {
  const result = Array.from(list);
  const [removed] = result.splice(start, 1);

  result.splice(end, 0, removed);

  return result;
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const { execute: executeUpdateOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List reordered");
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const { execute: executeCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card reordered");
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;

    // Checking if dropped in the same position

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Checking if the list is moving

    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderedData(items);

      executeUpdateOrder({ items, boardId });
    }

    // Checking if the card is moving

    if (type === "card") {
      const newOrderedData: typeof orderedData = cloneDeep(orderedData);

      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );

      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) return;

      // Checking if the cards exist on the sourceList

      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // Checking if the cards exist on the destList

      if (!destList.cards) {
        destList.cards = [];
      }

      // Checking if the card is moving in the same list

      if (source.droppableId === destination.droppableId) {
        const reordered = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reordered.forEach((card, index) => {
          card.order = index;
        });
        sourceList.cards = reordered;
        setOrderedData(newOrderedData);

        executeCardOrder({ boardId, items: reordered });
      }

      // Checking if the card is moving to the different list
      else {
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        movedCard.listId = destination.droppableId;

        destList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });

        // Updating the order of cards in the dest list.

        destList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedData(newOrderedData);
        executeCardOrder({ boardId, items: destList.cards });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, i) => (
              <ListItem key={list.id} index={i} data={list} />
            ))}

            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
