import { prisma } from "@/lib/prisma";

export async function archiveYear(

  year: number

) {

  return prisma.document.updateMany({

    where: {

      year

    },

    data: {

      archived: true

    }

  });

}
