"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";
import DatalogSession from "@/interfaces/DatalogSession";
import Car from "@/interfaces/Car";

const datalogApiUrl = process.env.DATALOG_API_URL;

export default async function CreateCar(car: Car): Promise<number> {
  const session = (await getServerSession(authOptions)) as DatalogSession;

  const response = await fetch(`${datalogApiUrl}/api/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.idToken}`,
    },
    body: JSON.stringify(car),
  });

  if (!response.ok) {
    console.error(
      `Request failed with status code ${response.status}. Unable to create car.`,
    );
    throw new Error("Failed to create car");
  }

  let urlElements = response.headers.get("Location")?.split("/") ?? Array();

  return urlElements[urlElements.length - 1];
}
