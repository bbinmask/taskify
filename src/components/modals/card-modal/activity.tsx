"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { AuditLog } from "@/generated/prisma";

interface ActivityProps {
  items: AuditLog[];
}

const Activity = ({ items }: ActivityProps) => {
  return <div>Activity</div>;
};

Activity.Skeleton = function () {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="bg-neutral-200 h-6 w-6" />
      <div className="w-full">
        <Skeleton className="bg-neutral-200 h-6 w-24 mb-2 " />
        <Skeleton className="bg-neutral-200 h-10 w-full " />
      </div>
    </div>
  );
};

export default Activity;
