import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import NavigationDrawer from "../NavigationDrawer/NavigationDrawer";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Home(): ReactElement {
  const [open, setOpen] = useState(false);

  const [selectedSessionId, setSelectedSessionId] = useState("");

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        selectedSessionId={selectedSessionId}
        setSelectedSessionId={setSelectedSessionId}
        open={open}
        setOpen={setOpen}
      ></Header>
      <NavigationDrawer
        selectedSessionId={selectedSessionId}
        open={open}
        setOpen={setOpen}
      ></NavigationDrawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
