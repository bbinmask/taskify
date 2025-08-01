"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
  const { onOpen, onClose, isOpen } = useMobileSidebar((state) => state);

  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) return null;

  return (
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden mr-2"
        variant={"ghost"}
        size={"sm"}
      >
        <Menu className="h-4 w-4 " />
      </Button>

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent title="Taskify" side="left" className="p-2 pt-10">
          <Sidebar storageKey="t-sidebar-mobile-state"></Sidebar>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
