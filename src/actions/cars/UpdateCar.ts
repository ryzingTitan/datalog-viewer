"use server";

import Track from "@/interfaces/Track";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";
import DatalogSession from "@/interfaces/DatalogSession";
import Car from "@/interfaces/Car";

const datalogApiUrl = process.env.DATALOG_API_URL;

export default async function UpdateCar(car: Car) {
  const session = (await getServerSession(authOptions)) as DatalogSession;

  const response = await fetch(`${datalogApiUrl}/api/cars/${car.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.idToken}`,
    },
    body: JSON.stringify(car),
  });

  if (!response.ok) {
    console.error(
      `Request failed with status code ${response.status}. Unable to update car.`,
    );
    throw new Error("Failed to update car");
  }
}
