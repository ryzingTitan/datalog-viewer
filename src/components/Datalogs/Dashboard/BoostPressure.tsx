import { Typography } from "@mui/material";
import { ReactElement } from "react";
import DashboardProps from "@/interfaces/DashboardProps";

export default function BoostPressure(
  dashboardProps: DashboardProps,
): ReactElement {
  const boostPressure =
    dashboardProps.datalogs[dashboardProps.currentIndex].boostPressure;

  return (
    <>
      <Typography variant="h4">Boost Pressure</Typography>
      <Typography variant="h5">{boostPressure} PSI</Typography>
    </>
  );
}
