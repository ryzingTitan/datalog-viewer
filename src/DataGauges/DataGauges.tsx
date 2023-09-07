import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ReactElement } from "react";
import DataGaugesProps from "./DataGaugesProps";
import IntakeAirTemperatureGauge from "../IntakeAirTemperatureGauge/IntakeAirTemperatureGauge";
import BoostPressureGauge from "../BoostPressureGauge/BoostPressureGauge";
import CoolantTemperatureGauge from "../CoolantTemperatureGauge/CoolantTemperatureGauge";
import Speedometer from "../Speedometer/Speedometer";
import Tachometer from "../Tachometer/Tachometer";
import ThrottlePositionGauge from "../ThrottlePositionGauge/ThrottlePositionGauge";

export default function DataGauges(
  dataGaugesProps: DataGaugesProps,
): ReactElement {
  return (
    <Box sx={{ paddingTop: 2 }}>
      <Grid container>
        <Grid xs={4}>
          <IntakeAirTemperatureGauge
            datalogs={dataGaugesProps.datalogs}
            currentIndex={dataGaugesProps.currentIndex}
          />
        </Grid>
        <Grid xs={4}>
          <BoostPressureGauge
            datalogs={dataGaugesProps.datalogs}
            currentIndex={dataGaugesProps.currentIndex}
          />
        </Grid>
        <Grid xs={4}>
          <CoolantTemperatureGauge
            datalogs={dataGaugesProps.datalogs}
            currentIndex={dataGaugesProps.currentIndex}
          />
        </Grid>
        <Grid xs={4}>
          <Speedometer
            datalogs={dataGaugesProps.datalogs}
            currentIndex={dataGaugesProps.currentIndex}
          />
        </Grid>
        <Grid xs={4}>
          <ThrottlePositionGauge
            datalogs={dataGaugesProps.datalogs}
            currentIndex={dataGaugesProps.currentIndex}
          />
        </Grid>
        <Grid xs={4}>
          <Tachometer
            datalogs={dataGaugesProps.datalogs}
            currentIndex={dataGaugesProps.currentIndex}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
