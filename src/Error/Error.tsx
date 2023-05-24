import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";

export default function Error(): ReactElement {
  return (
    <Box sx={{ paddingTop: 2 }}>
      <Typography>Error Page</Typography>
    </Box>
  );
}
