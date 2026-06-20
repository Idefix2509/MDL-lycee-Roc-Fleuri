import { prisma } from "@/lib/prisma";

export async function getAllGames() {

  return prisma.game.findMany({

    orderBy: {

      name: "asc"

    }

  });

}

export async function getGameById(

  id: number

) {

  return prisma.game.findUnique({

    where: {

      id

    }

  });

}

export async function createGame(data: {

  name: string;

  description: string;

  imageUrl?: string;

  barcode: string;

}) {

  return prisma.game.create({

    data

  });

}
