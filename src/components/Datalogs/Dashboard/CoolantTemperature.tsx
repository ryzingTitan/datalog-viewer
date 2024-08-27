import DashboardProps from "@/interfaces/DashboardProps";
import { ReactElement } from "react";
import { Typography } from "@mui/material";

export default function CoolantTemperature(
  dashboardProps: DashboardProps,
): ReactElement {
  const coolantTemperature =
    dashboardProps.datalogs[dashboardProps.currentIndex].coolantTemperature;

  return (
    <>
      <Typography variant="h4">Coolant Temperature</Typography>
      <Typography variant="h5">{coolantTemperature} &deg;F</Typography>
    </>
  );
}
