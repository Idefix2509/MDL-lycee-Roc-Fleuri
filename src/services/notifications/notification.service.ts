import { prisma } from "@/lib/prisma";

export async function createNotification(

  title: string,

  message: string,

  userId?: number

) {

  return prisma.notification.create({

    data: {

      title,

      message,

      userId,

      type: "INFO"

    }

  });

}
