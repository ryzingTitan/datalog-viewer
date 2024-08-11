import { Typography } from "@mui/material";
import { ReactElement } from "react";
import DashboardProps from "@/interfaces/DashboardProps";

export default function Speedometer(
  dashboardProps: DashboardProps,
): ReactElement {
  const speed = dashboardProps.datalogs[dashboardProps.currentIndex].speed;

  return (
    <>
      <Typography variant="h4">Speedometer</Typography>
      <Typography variant="h5">{speed} MPH</Typography>
    </>
  );
}
