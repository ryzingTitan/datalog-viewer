"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";
import DatalogViewerSession from "@/interfaces/DatalogViewerSession";

const datalogApiUrl = process.env.DATALOG_API_URL;

export default async function CreateSession(formData: FormData) {
  const session = (await getServerSession(authOptions)) as DatalogViewerSession;

  formData.append("userEmail", session.user?.email ?? "");
  formData.append("userFirstName", session.user?.name?.split(" ")[0] ?? "");
  formData.append("userLastName", session.user?.name?.split(" ")[1] ?? "");

  const response = await fetch(`${datalogApiUrl}/api/sessions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.idToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    console.error(
      `Request failed with status code ${response.status}. Unable to create session.`,
    );

    if (response.status == 409) {
      throw new Error("Session already exists");
    } else {
      throw new Error("Failed to create session");
    }
  }
}
