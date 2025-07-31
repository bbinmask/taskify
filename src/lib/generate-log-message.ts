import { ACTION, AuditLog } from "@/generated/prisma";

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType } = log;

  switch (action) {
    case ACTION.CREATE:
      return `created ${entityType.toLowerCase()} "${entityTitle}"`;

    case ACTION.UPDATE:
      return `updated ${entityTitle.toLowerCase()} "${entityTitle}"`;

    case ACTION.DELETE:
      return `deleted ${entityTitle.toLowerCase()} "${entityTitle}"`;

    default:
      return `unknow action ${entityTitle.toLowerCase()} "${entityTitle}"`;
  }
};
