import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUserId } from "@/lib/auth";

export async function GET() {

  try {

    const userId = await getCurrentUserId();

    const registrations =

      await prisma.eventRegistration.findMany({

        where: {

          userId

        },

        include: {

          event: true

        },

        orderBy: {

          createdAt: "desc"

        }

      });

    return NextResponse.json(

      registrations

    );

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
