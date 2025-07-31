"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";

const ProModal = () => {
  const { isOpen, onClose } = useProModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle />
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image src="/hero.png" alt="Hero" className="object-cover" fill />
        </div>

        <div className="text-neutral-700 mx-auto space-y-6 py-6">
          <h2 className="font-semibold text-xl">
            Upgrade to Taskify Pro today
          </h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of Taskify
          </p>

          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li className="">Unlimited boards</li>
              <li className="">Advanced checklists</li>
              <li className="">Admin and security features</li>
              <li className="">And more!</li>
            </ul>
          </div>
          <Button className="w-full" variant={"primary"}>
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
