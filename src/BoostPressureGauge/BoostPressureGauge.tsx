import { ReactElement } from "react";
import DashboardProps from "../Dashboard/DashboardProps";
import Typography from "@mui/material/Typography";

export default function BoostPressureGauge(
  dashboardProps: DashboardProps,
): ReactElement {
  const boostPressure =
    dashboardProps.datalogs[dashboardProps.currentIndex].data.boostPressure;

  return (
    <>
      <Typography variant="h4">Boost Pressure</Typography>
      <Typography variant="h5">{boostPressure} PSI</Typography>
    </>
  );
}
