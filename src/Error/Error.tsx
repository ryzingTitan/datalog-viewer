import { Stack, Typography } from "@mui/material";
import { ReactElement } from "react";

export default function Error(): ReactElement {
  return (
    <Stack alignItems={"center"}>
      <Typography variant="h2" gutterBottom>
        An unexpected error has occurred.
      </Typography>
      <Typography variant="h4">
        Please ensure a valid session has been selected and reload the page.
      </Typography>
    </Stack>
  );
}
