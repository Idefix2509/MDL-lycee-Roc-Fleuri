import { NextResponse } from "next/server";
import {
  getEventById,
} from "@/services/events/event.service";

/**
 * GET /api/events/:id
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await getEventById(
      Number(params.id)
    );

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
