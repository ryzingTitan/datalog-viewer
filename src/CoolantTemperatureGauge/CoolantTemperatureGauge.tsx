import { ReactElement } from "react";
import DashboardProps from "../Dashboard/DashboardProps";
import Typography from "@mui/material/Typography";

export default function CoolantTemperatureGauge(
  dashboardProps: DashboardProps,
): ReactElement {
  const coolantTemperature =
    dashboardProps.datalogs[dashboardProps.currentIndex].data
      .coolantTemperature;

  return (
    <>
      <Typography variant="h4">Coolant Temperature</Typography>
      <Typography variant="h5">{coolantTemperature} &deg;F</Typography>
    </>
  );
}
