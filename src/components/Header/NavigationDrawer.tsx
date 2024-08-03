"use client";
import { ReactElement, useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { DirectionsCar, EditRoad, Home, Menu } from "@mui/icons-material";
import HeaderProps from "@/interfaces/HeaderProps";
import Link from "next/link";

export default function NavigationDrawer(
  headerProps: HeaderProps,
): ReactElement {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  let DrawerList: ReactElement = (
    <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
      <List>
        <Link href="/" style={{ textDecoration: "none" }}>
          <ListItem key="Home" disablePadding>
            <ListItemButton sx={{ color: "#fff" }}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  if (headerProps.session) {
    DrawerList = (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <List>
          <Link href="/" style={{ textDecoration: "none" }}>
            <ListItem key="Home" disablePadding>
              <ListItemButton sx={{ color: "#fff" }}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/tracks" style={{ textDecoration: "none" }}>
            <ListItem key="TrackEditor" disablePadding>
              <ListItemButton sx={{ color: "#fff" }}>
                <ListItemIcon>
                  <EditRoad />
                </ListItemIcon>
                <ListItemText primary="Track Editor" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/cars" style={{ textDecoration: "none" }}>
            <ListItem key="CarEditor" disablePadding>
              <ListItemButton sx={{ color: "#fff" }}>
                <ListItemIcon>
                  <DirectionsCar />
                </ListItemIcon>
                <ListItemText primary="Car Editor" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Box>
    );
  }

  return (
    <>
      <IconButton onClick={toggleDrawer(true)}>
        <Menu />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}
