import { NextResponse } from "next/server";
import { registerToEvent } from "@/services/events/event.service";

/**
 * POST /api/events/:id/register
 */
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const userId = body.userId;

    const registration = await registerToEvent(
      Number(params.id),
      userId
    );

    return NextResponse.json(registration);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}
