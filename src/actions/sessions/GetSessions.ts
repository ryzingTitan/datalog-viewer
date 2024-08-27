"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";
import DatalogViewerSession from "@/interfaces/DatalogViewerSession";
import { Session } from "@/interfaces/Session";
import { redirect } from "next/navigation";

const datalogApiUrl = process.env.DATALOG_API_URL;

export default async function GetSessions(): Promise<Array<Session>> {
  const session = (await getServerSession(authOptions)) as DatalogViewerSession;

  if (session === null) {
    redirect("/");
  }

  const response = await fetch(
    `${datalogApiUrl}/api/sessions?userEmail=${session.user?.email}`,
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
      `Request failed with status code ${response.status}. Unable to retrieve sessions.`,
    );
    throw new Error("Failed to retrieve sessions");
  }

  return response.json();
}
