import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {

  try {

    const userId = await getCurrentUserId();

    const registration = await prisma.eventRegistration.findFirst({

      where: {

        eventId: Number(params.id),
        userId

      }

    });

    if (!registration) {

      throw new Error(
        "Inscription introuvable"
      );

    }

    await prisma.eventRegistration.delete({

      where: {

        id: registration.id

      }

    });

    return NextResponse.json({

      success: true

    });

  }

  catch (err: any) {

    return NextResponse.json(

      {

        error: err.message

      },

      {

        status: 400

      }

    );

  }

}
