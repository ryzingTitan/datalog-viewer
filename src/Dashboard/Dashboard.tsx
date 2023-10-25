import { ReactElement } from "react";
import DashboardProps from "./DashboardProps";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tachometer from "../Tachometer/Tachometer";
import BoostPressureGauge from "../BoostPressureGauge/BoostPressureGauge";
import ThrottlePositionGauge from "../ThrottlePositionGauge/ThrottlePositionGauge";
import Speedometer from "../Speedometer/Speedometer";
import CoolantTemperatureGauge from "../CoolantTemperatureGauge/CoolantTemperatureGauge";
import IntakeAirTemperatureGauge from "../IntakeAirTemperatureGauge/IntakeAirTemperatureGauge";

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
        <ThrottlePositionGauge
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
        <BoostPressureGauge
          datalogs={dashboardProps.datalogs}
          currentIndex={dashboardProps.currentIndex}
        />
      </Grid>
      <Grid item xs={4}>
        <IntakeAirTemperatureGauge
          datalogs={dashboardProps.datalogs}
          currentIndex={dashboardProps.currentIndex}
        />
      </Grid>
      <Grid item xs={4}>
        <CoolantTemperatureGauge
          datalogs={dashboardProps.datalogs}
          currentIndex={dashboardProps.currentIndex}
        />
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h4">AFR</Typography>
        <Typography variant="h5">
          {
            dashboardProps.datalogs[dashboardProps.currentIndex].data
              .airFuelRatio
          }
        </Typography>
      </Grid>
    </Grid>
  );
}
