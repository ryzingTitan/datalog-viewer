import DashboardProps from "@/interfaces/DashboardProps";
import { ReactElement } from "react";
import {
  LinearProgress,
  linearProgressClasses,
  Stack,
  styled,
  Typography,
} from "@mui/material";

const VerticalLinearProgress = styled(LinearProgress)(() => ({
  width: "16px",
  height: "100px",
}));

export default function ThrottlePosition(
  dashboardProps: DashboardProps,
): ReactElement {
  const throttlePosition =
    dashboardProps.datalogs[dashboardProps.currentIndex].throttlePosition;

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
