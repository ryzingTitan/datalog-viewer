import {
  ReactElement,
  SyntheticEvent,
  useEffect,
  useState,
  useTransition,
} from "react";
import DatalogProps from "@/interfaces/DatalogProps";
import { Box, Tab, Tabs } from "@mui/material";
import Summary from "@/components/Datalogs/Summary";
import TemperatureGraphs from "@/components/Datalogs/Graphs/TemperatureGraphs";
import GetDatalogs from "@/actions/datalogs/GetDatalogs";
import { enqueueSnackbar } from "notistack";
import Datalog from "@/interfaces/Datalog";
import BoostPressureGraphs from "@/components/Datalogs/Graphs/BoostPressureGraphs";
import CustomTabPanel from "@/components/Datalogs/CustomTabPanel";
import ThrottleGraphs from "@/components/Datalogs/Graphs/ThrottleGraphs";
import SpeedGraphs from "@/components/Datalogs/Graphs/SpeedGraphs";
import TrackMap from "@/components/Datalogs/TrackMap/TrackMap";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DatalogTabs(datalogProps: DatalogProps): ReactElement {
  const [value, setValue] = useState(0);
  const [datalogs, setDatalogs] = useState(Array<Datalog>);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        if (datalogProps.session?.id !== undefined) {
          setDatalogs(await GetDatalogs(datalogProps.session?.id!));
        }
      } catch (error: any) {
        setDatalogs(Array());
        enqueueSnackbar("Failed to retrieve datalogs", { variant: "error" });
      }
    });
  }, [datalogProps.session]);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const isDisabled = (): boolean => {
    return datalogs.length == 0;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Summary" {...a11yProps(0)} />
          <Tab label="Temperature" {...a11yProps(1)} disabled={isDisabled()} />
          <Tab label="Boost" {...a11yProps(2)} disabled={isDisabled()} />
          <Tab label="Throttle" {...a11yProps(3)} disabled={isDisabled()} />
          <Tab label="Speed" {...a11yProps(4)} disabled={isDisabled()} />
          <Tab label="Map" {...a11yProps(5)} disabled={isDisabled()} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Summary isPending={isPending} datalogs={datalogs} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TemperatureGraphs isPending={isPending} datalogs={datalogs} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <BoostPressureGraphs isPending={isPending} datalogs={datalogs} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <ThrottleGraphs isPending={isPending} datalogs={datalogs} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <SpeedGraphs isPending={isPending} datalogs={datalogs} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <TrackMap session={datalogProps.session} datalogs={datalogs} />
      </CustomTabPanel>
    </Box>
  );
}
