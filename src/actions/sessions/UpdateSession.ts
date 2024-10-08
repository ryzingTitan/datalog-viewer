"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";
import DatalogViewerSession from "@/interfaces/DatalogViewerSession";
import { redirect } from "next/navigation";

const datalogApiUrl = process.env.DATALOG_API_URL;

export default async function UpdateSession(
  formData: FormData,
  sessionId: number,
) {
  const session = (await getServerSession(authOptions)) as DatalogViewerSession;

  if (session === null) {
    redirect("/");
  }

  formData.append("userEmail", session.user?.email ?? "");
  formData.append("userFirstName", session.user?.name?.split(" ")[0] ?? "");
  formData.append("userLastName", session.user?.name?.split(" ")[1] ?? "");

  const response = await fetch(`${datalogApiUrl}/api/sessions/${sessionId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session.idToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    console.error(
      `Request failed with status code ${response.status}. Unable to create session.`,
    );

    if (response.status == 410) {
      throw new Error("Session does not exist");
    } else {
      throw new Error("Failed to update session");
    }
  }
}
