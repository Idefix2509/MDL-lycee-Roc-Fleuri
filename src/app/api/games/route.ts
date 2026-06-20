import { NextResponse } from "next/server";
import { getAllGames } from "@/services/games/game.service";

export async function GET() {

  try {

    const games = await getAllGames();

    return NextResponse.json(games);

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
