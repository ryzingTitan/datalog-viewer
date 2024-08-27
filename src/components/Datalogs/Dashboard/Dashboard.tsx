import { ReactElement } from "react";
import { Grid, Typography } from "@mui/material";
import DashboardProps from "@/interfaces/DashboardProps";
import Tachometer from "@/components/Datalogs/Dashboard/Tachometer";
import ThrottlePosition from "@/components/Datalogs/Dashboard/ThrottlePosition";
import Speedometer from "@/components/Datalogs/Dashboard/Speedometer";
import BoostPressure from "@/components/Datalogs/Dashboard/BoostPressure";
import CoolantTemperature from "@/components/Datalogs/Dashboard/CoolantTemperature";
import IntakeAirTemperature from "@/components/Datalogs/Dashboard/IntakeAirTemperature";

export default function Dashboard(
  dashboardProps: DashboardProps,
): ReactElement {
  return (
    <Grid container spacing={2} textAlign="center" alignItems="center">
      <Grid item xs={12}>
        <Tachometer
          datalogs={dashboardProps.datalogs}
          currentIndex={dashboardProps.currentIndex}
        />
      </Grid>
      <Grid item xs={4}>
        <ThrottlePosition
          datalogs={dashboardProps.datalogs}
          currentIndex={dashboardProps.currentIndex}
        />
      </Grid>
      <Grid item xs={4}>
        <Speedometer
          datalogs={dashboardProps.datalogs}
          currentIndex={dashboardProps.currentIndex}
        />
      </Grid>
      <Grid item xs={4}>
        <BoostPressure
          datalogs={dashboardProps.datalogs}
          currentIndex={dashboardProps.currentIndex}
        />
      </Grid>
      <Grid item xs={4}>
        <IntakeAirTemperature
          datalogs={dashboardProps.datalogs}
          currentIndex={dashboardProps.currentIndex}
        />
      </Grid>
      <Grid item xs={4}>
        <CoolantTemperature
          datalogs={dashboardProps.datalogs}
          currentIndex={dashboardProps.currentIndex}
        />
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h4">AFR</Typography>
        <Typography variant="h5">
          {dashboardProps.datalogs[dashboardProps.currentIndex].airFuelRatio}
        </Typography>
      </Grid>
    </Grid>
  );
}
