"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import Header from "./header";

const CardModal = () => {
  const { id, isOpen, onClose } = useCardModal();

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/cards/${id}`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <Header data={cardData}></Header>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
