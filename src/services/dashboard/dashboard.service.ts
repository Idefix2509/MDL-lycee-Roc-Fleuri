import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {

  const totalGames = await prisma.game.count();

  const activeLoans = await prisma.loan.count({

    where: {

      returnedAt: null

    }

  });

  const totalMembers = await prisma.user.count();

  const totalEvents = await prisma.event.count();

  return {

    totalGames,

    activeLoans,

    totalMembers,

    totalEvents

  };

}
