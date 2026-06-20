import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

export async function GET() {

  try {

    const userId = await getCurrentUserId();

    const loans = await prisma.loan.findMany({

      where: {

        userId,

        returnedAt: null

      },

      include: {

        game: true

      },

      orderBy: {

        borrowedAt: "desc"

      }

    });

    return NextResponse.json(loans);

  }

  catch (err: any) {

    return NextResponse.json(

      {

        error: err.message

      },

      {

        status: 500

      }

    );

  }

}
