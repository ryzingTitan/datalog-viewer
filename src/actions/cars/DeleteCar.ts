"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";
import DatalogViewerSession from "@/interfaces/DatalogViewerSession";

const datalogApiUrl = process.env.DATALOG_API_URL;

export default async function DeleteCar(carId: number) {
  const session = (await getServerSession(authOptions)) as DatalogViewerSession;

  const response = await fetch(`${datalogApiUrl}/api/cars/${carId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.idToken}`,
    },
  });

  if (!response.ok) {
    console.error(
      `Request failed with status code ${response.status}. Unable to delete car.`,
    );
    throw new Error("Failed to delete car");
  }
}
