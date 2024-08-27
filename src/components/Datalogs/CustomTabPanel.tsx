import TabPanelProps from "@/interfaces/TabPanelProps";
import { Box } from "@mui/material";
import { ReactElement } from "react";

export default function CustomTabPanel(props: TabPanelProps): ReactElement {
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
