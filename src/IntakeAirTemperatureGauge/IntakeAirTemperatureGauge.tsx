import { Fragment, ReactElement } from "react";
import DashboardProps from "../Dashboard/DashboardProps";
import Typography from "@mui/material/Typography";

export default function IntakeAirTemperatureGauge(
  dashboardProps: DashboardProps,
): ReactElement {
  const intakeAirTemperature =
    dashboardProps.datalogs[dashboardProps.currentIndex].data
      .intakeAirTemperature;

  return (
    <>
      <Typography variant="h4">Intake Air Temperature</Typography>
      <Typography variant="h5">{intakeAirTemperature} &deg;F</Typography>
    </>
  );
}
