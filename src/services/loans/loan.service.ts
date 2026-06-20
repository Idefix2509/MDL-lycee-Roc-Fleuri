import { prisma } from "@/lib/prisma";

export async function createLoan(

  gameId: number,

  userId: number,

  returnDate: Date

) {

  return prisma.loan.create({

    data: {

      gameId,

      userId,

      borrowedAt: new Date(),

      returnDate

    }

  });

}

export async function returnLoan(

  loanId: number

) {

  return prisma.loan.update({

    where: {

      id: loanId

    },

    data: {

      returnedAt: new Date()

    }

  });

}
