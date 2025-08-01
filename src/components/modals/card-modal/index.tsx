"use client";

import { AuditLog } from "@/generated/prisma";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import Header from "./header";
import { DialogTitle } from "@radix-ui/react-dialog";
import Description from "./description";
import Actions from "./actions";
import Activity from "./activity";

const CardModal = () => {
  const { id, isOpen, onClose } = useCardModal();

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/cards/${id}`),
  });

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/cards/${id}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle />
        {!cardData ? <Header.Skeleton /> : <Header data={cardData}></Header>}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description data={cardData} />
              )}
            </div>
          </div>
          {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
          {!auditLogsData ? (
            <Activity.Skeleton />
          ) : (
            <Activity items={auditLogsData} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
