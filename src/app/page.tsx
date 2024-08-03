import { ReactElement } from "react";
import Header from "@/components/Header/Header";
import { Stack, Typography } from "@mui/material";
import { QueryStats } from "@mui/icons-material";

export default function Home(): ReactElement {
  return (
    <>
      <Header />
      <Stack alignItems={"center"}>
        <Typography variant="h2">Welcome to the Datalog Viewer!</Typography>
        <QueryStats sx={{ fontSize: 300 }} />
      </Stack>
    </>
  );
}
