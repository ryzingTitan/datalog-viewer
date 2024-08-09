import { ReactElement, ReactNode, SyntheticEvent, useState } from "react";
import DatalogProps from "@/interfaces/DatalogProps";
import { Box, Tab, Tabs } from "@mui/material";
import Summary from "@/components/Datalogs/Summary";
import TemperatureGraph from "@/components/Datalogs/TemperatureGraph";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box margin={2}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DatalogTabs(datalogProps: DatalogProps): ReactElement {
  const [value, setValue] = useState(0);

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
        <Summary sessionId={datalogProps.sessionId} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TemperatureGraph sessionId={datalogProps.sessionId} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Boost
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
