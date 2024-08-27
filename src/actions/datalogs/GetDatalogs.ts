"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";
import DatalogViewerSession from "@/interfaces/DatalogViewerSession";
import Datalog from "@/interfaces/Datalog";
import { redirect } from "next/navigation";

const datalogApiUrl = process.env.DATALOG_API_URL;

export default async function GetDatalogs(
  sessionId: number,
): Promise<Array<Datalog>> {
  const session = (await getServerSession(authOptions)) as DatalogViewerSession;

  if (session === null) {
    redirect("/");
  }

  const response = await fetch(
    `${datalogApiUrl}/api/sessions/${sessionId}/datalogs`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.idToken}`,
      },
    },
  );

  if (!response.ok) {
    console.error(
      `Request failed with status code ${response.status}. Unable to retrieve datalogs.`,
    );
    throw new Error("Failed to retrieve datalogs");
  }

  return response.json();
}
