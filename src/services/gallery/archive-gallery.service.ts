import { prisma } from "@/lib/prisma";

export async function archiveAlbums(

  year: number

) {

  return prisma.album.updateMany({

    where: {

      year

    },

    data: {

      archived: true

    }

  });

}
