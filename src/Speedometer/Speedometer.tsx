import { ReactElement } from "react";
import DashboardProps from "../Dashboard/DashboardProps";
import Typography from "@mui/material/Typography";

export default function Speedometer(
  dashboardProps: DashboardProps,
): ReactElement {
  const speed = dashboardProps.datalogs[dashboardProps.currentIndex].data.speed;

  return (
    <>
      <Typography variant="h4">Speedometer</Typography>
      <Typography variant="h5">{speed} MPH</Typography>
    </>
  );
}
