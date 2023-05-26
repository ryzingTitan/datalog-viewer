import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ReactElement } from "react";

export default function Welcome(): ReactElement {
  return (
    <Stack alignItems={"center"}>
      <Typography variant="h2">Welcome to the Datalog Viewer!</Typography>
      <QueryStatsIcon sx={{ fontSize: 300 }} />
    </Stack>
  );
}
