import DashboardProps from "@/interfaces/DashboardProps";
import { ReactElement } from "react";
import { Typography } from "@mui/material";

export default function IntakeAirTemperature(
  dashboardProps: DashboardProps,
): ReactElement {
  const intakeAirTemperature =
    dashboardProps.datalogs[dashboardProps.currentIndex].intakeAirTemperature;

  return (
    <>
      <Typography variant="h4">Intake Air Temperature</Typography>
      <Typography variant="h5">{intakeAirTemperature} &deg;F</Typography>
    </>
  );
}
