import { ReactElement } from "react";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

export default function Page(): ReactElement {
  return (
    <Stack alignItems={"center"}>
      <Typography variant="h2">Welcome to the Datalog Viewer!</Typography>
      <QueryStatsIcon sx={{ fontSize: 300 }} titleAccess="Query Stats Icon" />
    </Stack>
  );
}
