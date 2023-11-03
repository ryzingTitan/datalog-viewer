import { ReactElement } from "react";
import DashboardProps from "../Dashboard/DashboardProps";
import { LinearProgress } from "@mui/material";
import Typography from "@mui/material/Typography";

const MIN = 0;
const MAX = 7000;
const normalise = (value: number) => ((value - MIN) * 100) / (MAX - MIN);

export default function Tachometer(
  dashboardProps: DashboardProps,
): ReactElement {
  const engineRpm =
    dashboardProps.datalogs[dashboardProps.currentIndex].data.engineRpm;

  return (
    <>
      <Typography variant="h4" textAlign="center" margin={1}>
        Tachometer
      </Typography>
      <LinearProgress
        sx={{ height: 40, margin: 1 }}
        variant="determinate"
        value={normalise(engineRpm)}
      />
      <Typography variant="h5" textAlign="center">
        {engineRpm} RPM
      </Typography>
    </>
  );
}
