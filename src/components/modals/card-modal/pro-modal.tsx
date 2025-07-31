"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-card-modal";
import Image from "next/image";

const ProModal = () => {
  const { isOpen, onClose } = useProModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image src="/hero.svg" alt="Hero" className="object-cover" fill />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
