"use server";

import Track from "@/interfaces/Track";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";
import DatalogSession from "@/interfaces/DatalogSession";

const datalogApiUrl = process.env.DATALOG_API_URL;

export default async function GetTracks(): Promise<Array<Track>> {
  const session = (await getServerSession(authOptions)) as DatalogSession;

  const response = await fetch(`${datalogApiUrl}/api/tracks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.idToken}`,
    },
  });

  if (!response.ok) {
    console.error(
      `Request failed with status code ${response.status}. Unable to retrieve tracks.`,
    );
    throw new Error("Failed to retrieve tracks");
  }

  return response.json();
}
