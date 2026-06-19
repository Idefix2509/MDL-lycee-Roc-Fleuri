import { NextResponse } from "next/server";
import {
  createEvent,
  getAllEvents,
} from "@/services/events/event.service";

/**
 * GET /api/events
 */
export async function GET() {
  try {
    const events = await getAllEvents();
    return NextResponse.json(events);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/events
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const event = await createEvent({
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      price: body.price,
      maxParticipants: body.maxParticipants,
      eventDate: new Date(body.eventDate),
      registrationOpensAt: new Date(body.registrationOpensAt),
      registrationClosesAt: new Date(body.registrationClosesAt),
      createdByUserId: body.createdByUserId,
    });

    return NextResponse.json(event);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
