import { NextResponse } from "next/server";
import { exportBackup } from "@/services/backup/backup.service";

export async function GET() {

  const backup = await exportBackup();

  return NextResponse.json(

    backup

  );

}
