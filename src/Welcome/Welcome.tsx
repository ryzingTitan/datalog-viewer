import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactElement } from "react";

export default function Welcome(): ReactElement {
  return (
    <Box sx={{ paddingTop: 2 }}>
      <Typography>Welcome to the datalog viewer</Typography>
    </Box>
  );
}
