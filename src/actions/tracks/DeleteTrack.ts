"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";
import DatalogViewerSession from "@/interfaces/DatalogViewerSession";
import { redirect } from "next/navigation";

const datalogApiUrl = process.env.DATALOG_API_URL;

export default async function DeleteTrack(trackId: number) {
  const session = (await getServerSession(authOptions)) as DatalogViewerSession;

  if (session === null) {
    redirect("/");
  }

  const response = await fetch(`${datalogApiUrl}/api/tracks/${trackId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.idToken}`,
    },
  });

  if (!response.ok) {
    console.error(
      `Request failed with status code ${response.status}. Unable to delete track.`,
    );
    throw new Error("Failed to delete track");
  }
}
