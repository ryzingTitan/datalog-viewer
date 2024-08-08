"use server";

import Track from "@/interfaces/Track";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";
import DatalogViewerSession from "@/interfaces/DatalogViewerSession";

const datalogApiUrl = process.env.DATALOG_API_URL;

export default async function CreateTrack(track: Track): Promise<number> {
  const session = (await getServerSession(authOptions)) as DatalogViewerSession;

  const response = await fetch(`${datalogApiUrl}/api/tracks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.idToken}`,
    },
    body: JSON.stringify(track),
  });

  if (!response.ok) {
    console.error(
      `Request failed with status code ${response.status}. Unable to create track.`,
    );
    throw new Error("Failed to create track");
  }

  let urlElements = response.headers.get("Location")?.split("/") ?? Array();

  return urlElements[urlElements.length - 1];
}
