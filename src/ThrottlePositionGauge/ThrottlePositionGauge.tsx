import { ReactElement } from "react";
import DashboardProps from "../Dashboard/DashboardProps";
import Typography from "@mui/material/Typography";
import { LinearProgress, linearProgressClasses, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const VerticalLinearProgress = styled(LinearProgress)(() => ({
  width: "16px",
  height: "100px",
}));

export default function ThrottlePositionGauge(
  dashboardProps: DashboardProps,
): ReactElement {
  const throttlePosition =
    dashboardProps.datalogs[dashboardProps.currentIndex].data.throttlePosition;

  return (
    <Stack alignItems="center">
      <Typography variant="h4">Throttle Position</Typography>
      <VerticalLinearProgress
        variant="determinate"
        value={throttlePosition}
        sx={{
          [`& .${linearProgressClasses.bar}`]: {
            transform: `translateY(${100 - throttlePosition}%)!important`,
          },
        }}
      />
      <Typography variant="h5">{throttlePosition}%</Typography>
    </Stack>
  );
}
