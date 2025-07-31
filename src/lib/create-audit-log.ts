import { ACTION, ENTITY_TYPE } from "@/generated/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async (props: Props) => {
  try {
    const { orgId } = await auth();
    const user = await currentUser();

    if (!orgId || !user) {
      throw new Error("User not found");
    }

    const { entityId, entityTitle, entityType, action } = props;

    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityTitle,
        entityType,
        action,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
      },
    });
  } catch (error: any) {
    console.log("AUDIT LOG ERROR: ", error?.message);
  }
};
