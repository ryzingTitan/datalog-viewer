import { Typography } from "@mui/material";
import { ReactElement } from "react";

export default function Error(): ReactElement {
  return (
    <>
      <Typography variant="h2" gutterBottom textAlign="center">
        An unexpected error has occurred.
      </Typography>
      <Typography variant="h4" textAlign="center">
        Please ensure a valid session has been selected and reload the page.
      </Typography>
    </>
  );
}
