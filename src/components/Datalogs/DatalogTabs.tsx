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
import TemperatureGraph from "@/components/Datalogs/TemperatureGraph";
import GetDatalogs from "@/actions/datalogs/GetDatalogs";
import { enqueueSnackbar } from "notistack";
import Datalog from "@/interfaces/Datalog";
import BoostPressureGraph from "@/components/Datalogs/BoostPressureGraph";
import CustomTabPanel from "@/components/Datalogs/CustomTabPanel";

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
        if (datalogProps.sessionId !== null) {
          setDatalogs(await GetDatalogs(datalogProps.sessionId));
        }
      } catch (error: any) {
        setDatalogs(Array());
        enqueueSnackbar(error.message, { variant: "error" });
      }
    });
  }, [datalogProps.sessionId]);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Summary" {...a11yProps(0)} />
          <Tab label="Temperature" {...a11yProps(1)} />
          <Tab label="Boost" {...a11yProps(2)} />
          <Tab label="Throttle" {...a11yProps(3)} />
          <Tab label="Speed" {...a11yProps(4)} />
          <Tab label="Map" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Summary isPending={isPending} datalogs={datalogs} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TemperatureGraph isPending={isPending} datalogs={datalogs} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <BoostPressureGraph isPending={isPending} datalogs={datalogs} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Throttle
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Speed
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        Map
      </CustomTabPanel>
    </Box>
  );
}
