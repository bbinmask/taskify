"use client";
import { format } from "date-fns";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AuditLog } from "@/generated/prisma";
import { generateLogMessage } from "@/lib/generate-log-message";

interface ActivityItemsProps {
  data: AuditLog;
}

const ActivityItems = ({ data }: ActivityItemsProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.userImage} />
      </Avatar>

      <div className="flex flex-col space-y-0.5">
        {/* <div className="flex"> */}{" "}
        <p className="flex gap-2 text-nowrap text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700">
            {data.userName}
          </span>{" "}
          {generateLogMessage(data)}
        </p>
        {/* </div> */}
        <p className="text-xs text-muted-foreground">
          {format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
};

export default ActivityItems;
