import Drawer from "@mui/material/Drawer";
import { ReactElement } from "react";
import NavigationDrawerProps from "./NavigationDrawerProps";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import { Link, NavLink } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SpeedIcon from "@mui/icons-material/Speed";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MapIcon from "@mui/icons-material/Map";
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function NavigationDrawer(
  navigationDrawerProps: NavigationDrawerProps
): ReactElement {
  function handleDrawerClose() {
    navigationDrawerProps.setOpen(false);
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={navigationDrawerProps.open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem key="Home" disablePadding>
          <NavLink
            to={`/`}
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : ""
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </NavLink>
        </ListItem>
        <ListItem key="Summary" disablePadding>
          <Link
            to={`/sessions/${navigationDrawerProps.selectedSessionId}/summary`}
          >
            <ListItemButton>
              <ListItemIcon>
                <AnalyticsIcon />
              </ListItemIcon>
              <ListItemText primary="Summary" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="Temperature" disablePadding>
          <Link
            to={`/sessions/${navigationDrawerProps.selectedSessionId}/temperatures`}
          >
            <ListItemButton>
              <ListItemIcon>
                <ThermostatIcon />
              </ListItemIcon>
              <ListItemText primary="Temperature" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="Boost" disablePadding>
          <Link
            to={`/sessions/${navigationDrawerProps.selectedSessionId}/boost`}
          >
            <ListItemButton>
              <ListItemText primary="Boost" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="Throttle" disablePadding>
          <Link
            to={`/sessions/${navigationDrawerProps.selectedSessionId}/throttle`}
          >
            <ListItemButton>
              <ListItemText primary="Throttle" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="Speed" disablePadding>
          <Link
            to={`/sessions/${navigationDrawerProps.selectedSessionId}/speed`}
          >
            <ListItemButton>
              <ListItemIcon>
                <SpeedIcon />
              </ListItemIcon>
              <ListItemText primary="Speed" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="Map" disablePadding>
          <Link to={`/sessions/${navigationDrawerProps.selectedSessionId}/map`}>
            <ListItemButton>
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
              <ListItemText primary="Map" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Drawer>
  );
}
